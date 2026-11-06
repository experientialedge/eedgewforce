BEGIN;
-- Only the correction RPC may replace registry ownership. API roles retain
-- SELECT-only registry access; a direct employee UPDATE cannot manufacture it.
CREATE OR REPLACE FUNCTION public.enforce_employee_number() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE c text;y integer;n integer;number text;existing public.employee_number_registry;hired date;
BEGIN
 IF TG_OP='UPDATE' THEN
  SELECT * INTO existing FROM employee_number_registry WHERE employee_id=OLD.id;
  IF FOUND THEN
   IF NEW.company_id IS NOT DISTINCT FROM OLD.company_id
    AND NEW.employee_code IS NOT DISTINCT FROM existing.id AND NEW.staff_id IS NOT DISTINCT FROM existing.id
    AND NEW.numbering_department_code IS NOT DISTINCT FROM existing.department_code
    AND NEW.numbering_hire_year IS NOT DISTINCT FROM existing.hiring_year
    AND NEW.employee_number_assigned_at IS NOT DISTINCT FROM existing.issued_at THEN RETURN NEW;END IF;
   RAISE EXCEPTION 'Issued employee numbers are permanent. Only the audited Super Admin correction flow can replace them.';
  END IF;
  IF NEW.numbering_department_code IS NULL OR NEW.numbering_hire_year IS NULL THEN RETURN NEW;END IF;
 END IF;
 c:=employee_number_department(NEW.department,NEW.numbering_department_code);
 IF c IS NULL THEN RAISE EXCEPTION 'This department needs an HR-approved numbering code (FIN, HR, IT, SM, OPS, STG, CRE, CMP, PUR or EXE).';END IF;
 hired:=coalesce(nullif(NEW.date_of_joining::text,'')::date,nullif(NEW.hire_date::text,'')::date);
 IF hired IS NULL THEN RAISE EXCEPTION 'A valid hiring date is required before assigning an employee number.';END IF;
 IF NEW.date_of_birth IS NOT NULL AND hired<nullif(NEW.date_of_birth::text,'')::date THEN RAISE EXCEPTION 'Hiring date precedes date of birth. Correct the hiring date first.';END IF;
 y:=extract(year FROM hired)::integer;
 IF y<1900 OR y>9999 THEN RAISE EXCEPTION 'Hiring year must contain four digits and be at least 1900.';END IF;
 INSERT INTO employee_number_counters(id,department_code,hiring_year,last_value) VALUES(c||':'||y,c,y,1)
 ON CONFLICT(id) DO UPDATE SET last_value=employee_number_counters.last_value+1 WHERE employee_number_counters.last_value<9999 RETURNING last_value INTO n;
 IF n IS NULL THEN RAISE EXCEPTION 'Employee number capacity exceeded. Maximum 9,999 hires per department/year.';END IF;
 number:=c||y::text||lpad(n::text,4,'0');
 INSERT INTO employee_number_registry(id,company_id,employee_id,department_code,hiring_year,sequence,legacy_employee_code,legacy_staff_id)
 VALUES(number,NEW.company_id,NEW.id,c,y,n,NEW.employee_code,NEW.staff_id);
 NEW.employee_code:=number;NEW.staff_id:=number;NEW.numbering_department_code:=c;NEW.numbering_hire_year:=y;NEW.employee_number_assigned_at:=now();
 RETURN NEW;
END $$;

CREATE OR REPLACE FUNCTION public.correct_employee_number(p_employee_id integer,p_company_id integer,p_actor_id integer,p_employee_number text,p_reason text,p_confirmation text) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE e public.employees;a public.users;c text;y integer;n integer;parts text[];number text:=upper(trim(coalesce(p_employee_number,'')));hired date;issued timestamptz:=now();
BEGIN
 SELECT * INTO a FROM users WHERE id=p_actor_id AND company_id=p_company_id AND status='active' AND role_code='SUPER_ADMIN' FOR SHARE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Only an active Super Admin can correct a staff ID.';END IF;
 IF length(trim(coalesce(p_reason,'')))<10 OR length(p_reason)>500 THEN RAISE EXCEPTION 'Provide a correction reason of 10 to 500 characters.';END IF;
 parts:=regexp_match(number,'^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)([0-9]{4})([0-9]{4})$');
 IF parts IS NULL THEN RAISE EXCEPTION 'Use an approved department code, four-digit hiring year and four-digit sequence, for example IT20260001.';END IF;
 c:=parts[1];y:=parts[2]::integer;n:=parts[3]::integer;
 IF y<1900 OR n<1 THEN RAISE EXCEPTION 'Hiring year must be at least 1900 and sequence must be 0001 to 9999.';END IF;
 SELECT * INTO e FROM employees WHERE id=p_employee_id AND company_id=p_company_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Employee not found.';END IF;
 IF e.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'Restore this staff record before correcting its number.';END IF;
 IF trim(coalesce(p_confirmation,''))<>coalesce(e.employee_code,'') THEN RAISE EXCEPTION 'The staff ID changed since this profile was opened. Reload it and confirm the current ID.';END IF;
 IF number=e.employee_code THEN RAISE EXCEPTION 'The corrected ID is the same as the current ID.';END IF;
 hired:=coalesce(nullif(e.date_of_joining::text,'')::date,nullif(e.hire_date::text,'')::date);
 IF hired IS NULL THEN RAISE EXCEPTION 'A valid hiring date is required before assigning an employee number.';END IF;
 IF e.date_of_birth IS NOT NULL AND hired<nullif(e.date_of_birth::text,'')::date THEN RAISE EXCEPTION 'Hiring date precedes date of birth. Correct the hiring date first.';END IF;
 IF extract(year FROM hired)::integer<>y THEN RAISE EXCEPTION 'The ID year must match the saved hiring date. Correct the hiring date first.';END IF;
 IF EXISTS(SELECT 1 FROM employee_number_registry WHERE id=number) OR EXISTS(SELECT 1 FROM employees WHERE employee_code=number OR staff_id=number) THEN
  RAISE EXCEPTION 'This employee number is already reserved. Choose a number that has never been issued.';
 END IF;
 -- Retain the previous reservation forever; the new row and audit link back to it.
 UPDATE employee_number_registry SET employee_id=NULL WHERE employee_id=e.id;
 INSERT INTO employee_number_counters(id,department_code,hiring_year,last_value) VALUES(c||':'||y,c,y,n)
 ON CONFLICT(id) DO UPDATE SET last_value=greatest(employee_number_counters.last_value,excluded.last_value);
 BEGIN
  INSERT INTO employee_number_registry(id,company_id,employee_id,department_code,hiring_year,sequence,legacy_employee_code,legacy_staff_id,issued_at,issued_by)
  VALUES(number,p_company_id,e.id,c,y,n,e.employee_code,e.staff_id,issued,p_actor_id);
 EXCEPTION WHEN unique_violation THEN RAISE EXCEPTION 'This employee number is already reserved. Choose a number that has never been issued.';
 END;
 INSERT INTO audit_logs(company_id,actor_id,actor_email,action,entity,entity_id,metadata)
 VALUES(p_company_id,a.id,a.email,'EMPLOYEE_NUMBER_CORRECTED','employees',e.id::text,jsonb_build_object('previous_employee_number',e.employee_code,'employee_number',number,'reason',trim(p_reason),'previous_number_reserved',true));
 UPDATE employees SET employee_code=number,staff_id=number,numbering_department_code=c,numbering_hire_year=y,employee_number_assigned_at=issued WHERE id=e.id RETURNING * INTO e;
 RETURN to_jsonb(e);
END $$;
REVOKE ALL ON FUNCTION public.correct_employee_number(integer,integer,integer,text,text,text) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.correct_employee_number(integer,integer,integer,text,text,text) TO service_role;
NOTIFY pgrst,'reload schema';
COMMIT;
