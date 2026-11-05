BEGIN;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS numbering_department_code text;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS numbering_hire_year integer;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS employee_number_assigned_at timestamptz;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS deleted_by integer;
ALTER TABLE public.employees ADD COLUMN IF NOT EXISTS deletion_reason text;
CREATE TABLE IF NOT EXISTS public.employee_number_counters(
 id text PRIMARY KEY,department_code text NOT NULL CHECK(department_code IN ('FIN','HR','IT','SM','OPS','STG','CRE','CMP','PUR','EXE')),
 hiring_year integer NOT NULL CHECK(hiring_year BETWEEN 1900 AND 9999),last_value integer NOT NULL CHECK(last_value BETWEEN 0 AND 9999),
 UNIQUE(department_code,hiring_year)
);
CREATE TABLE IF NOT EXISTS public.employee_number_registry(
 id text PRIMARY KEY CHECK(id ~ '^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)[0-9]{8}$'),company_id integer NOT NULL,
 employee_id integer UNIQUE REFERENCES public.employees(id) ON DELETE SET NULL DEFERRABLE INITIALLY DEFERRED,
 department_code text NOT NULL CHECK(department_code IN ('FIN','HR','IT','SM','OPS','STG','CRE','CMP','PUR','EXE')),
 hiring_year integer NOT NULL CHECK(hiring_year BETWEEN 1900 AND 9999),sequence integer NOT NULL CHECK(sequence BETWEEN 1 AND 9999),
 legacy_employee_code text,legacy_staff_id text,issued_at timestamptz NOT NULL DEFAULT now(),issued_by integer,
 UNIQUE(department_code,hiring_year,sequence),CHECK(id=department_code||hiring_year::text||lpad(sequence::text,4,'0'))
);
ALTER TABLE public.employee_number_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_number_registry ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.employee_number_counters,public.employee_number_registry FROM PUBLIC,anon,authenticated,service_role;
GRANT SELECT ON public.employee_number_counters,public.employee_number_registry TO service_role;

CREATE OR REPLACE FUNCTION public.employee_number_department(p_name text,p_code text DEFAULT NULL) RETURNS text
LANGUAGE plpgsql IMMUTABLE SET search_path=public,pg_temp AS $$
DECLARE k text:=regexp_replace(lower(coalesce(p_name,'')),'[^a-z0-9]','','g');c text:=upper(nullif(p_code,''));
BEGIN
 IF c IS NOT NULL THEN IF c NOT IN ('FIN','HR','IT','SM','OPS','STG','CRE','CMP','PUR','EXE') THEN RAISE EXCEPTION 'Choose an approved department code for the employee number.';END IF;RETURN c;END IF;
 RETURN CASE WHEN k IN ('fin','finance','financeaccounts','financeandaccounts','financedepartment','accounts','accounting') THEN 'FIN'
 WHEN k IN ('hr','humanresources','humanresourcedepartment','humanresourcesdepartment') THEN 'HR'
 WHEN k IN ('it','informationtechnology','technologyit','technologyandit','informationtechnologydepartment') THEN 'IT'
 WHEN k IN ('sm','sales','salesmarketing','salesandmarketing','commercialsales') THEN 'SM'
 WHEN k IN ('ops','operations','operation','opration','corporateoperations','fieldoperations','warehouseoperations','admin','administration','driving','househelp','supplychaindistribution','operationandaccountdepartment') THEN 'OPS'
 WHEN k IN ('stg','strategy','strategyandcommunication','strategyaccounts') THEN 'STG'
 WHEN k IN ('cre','creative','design') THEN 'CRE'
 WHEN k IN ('cmp','compliance','compliancedepartment','complainceoerations') THEN 'CMP'
 WHEN k IN ('pur','procurement') THEN 'PUR'
 WHEN k IN ('exe','executive','executivemanagement','executivegovernance') THEN 'EXE'
 WHEN k='accountsstrategy' THEN 'FIN' WHEN k IN ('regionalsalesmanager','sales4') THEN 'SM' ELSE NULL END;
END $$;

-- Adopt existing valid numbers before allocating any new ones. Conflicting
-- legacy numbers cause the transaction to fail for review rather than being lost.
INSERT INTO public.employee_number_registry(id,company_id,employee_id,department_code,hiring_year,sequence,legacy_employee_code,legacy_staff_id)
 SELECT code,e.company_id,e.id,parts[1],parts[2]::integer,parts[3]::integer,e.employee_code,e.staff_id
 FROM public.employees e
 CROSS JOIN LATERAL (SELECT CASE WHEN e.employee_code ~ '^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)[0-9]{8}$' THEN e.employee_code ELSE e.staff_id END AS code) c
 CROSS JOIN LATERAL regexp_match(code,'^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)([0-9]{4})([0-9]{4})$') AS m(parts)
 WHERE code ~ '^(FIN|HR|IT|SM|OPS|STG|CRE|CMP|PUR|EXE)[0-9]{8}$' AND parts[2]::integer>=1900 AND parts[3]::integer>0
 AND NOT EXISTS(SELECT 1 FROM public.employee_number_registry r WHERE r.employee_id=e.id);
INSERT INTO public.employee_number_counters(id,department_code,hiring_year,last_value)
 SELECT department_code||':'||hiring_year,department_code,hiring_year,max(sequence) FROM public.employee_number_registry GROUP BY department_code,hiring_year
 ON CONFLICT(id) DO UPDATE SET last_value=greatest(employee_number_counters.last_value,excluded.last_value);
UPDATE public.employees e SET employee_code=r.id,staff_id=r.id,numbering_department_code=r.department_code,numbering_hire_year=r.hiring_year,employee_number_assigned_at=r.issued_at
 FROM public.employee_number_registry r WHERE r.employee_id=e.id AND e.employee_number_assigned_at IS NULL;

CREATE OR REPLACE FUNCTION public.enforce_employee_number() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE c text;y integer;n integer;number text;existing public.employee_number_registry;hired date;
BEGIN
 IF TG_OP='UPDATE' THEN
  SELECT * INTO existing FROM employee_number_registry WHERE employee_id=OLD.id;
  IF FOUND THEN
   IF NEW.employee_code IS DISTINCT FROM OLD.employee_code OR NEW.staff_id IS DISTINCT FROM OLD.staff_id OR NEW.company_id IS DISTINCT FROM OLD.company_id
    OR NEW.numbering_department_code IS DISTINCT FROM OLD.numbering_department_code OR NEW.numbering_hire_year IS DISTINCT FROM OLD.numbering_hire_year OR NEW.employee_number_assigned_at IS DISTINCT FROM OLD.employee_number_assigned_at
   THEN RAISE EXCEPTION 'Issued employee numbers are permanent and cannot be edited or recycled.';END IF;
   RETURN NEW;
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
DROP TRIGGER IF EXISTS edgewforce_employee_number ON public.employees;
CREATE TRIGGER edgewforce_employee_number BEFORE INSERT OR UPDATE ON public.employees FOR EACH ROW EXECUTE FUNCTION public.enforce_employee_number();

CREATE OR REPLACE FUNCTION public.issue_employee_number(p_employee_id integer,p_company_id integer,p_actor_id integer,p_department_code text DEFAULT NULL) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE e public.employees;c text;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM users WHERE id=p_actor_id AND company_id=p_company_id AND status='active' AND role_code IN ('HR','HR_MANAGER','CEO','CTO','IT_ADMIN','SUPER_ADMIN','ADMIN')) THEN RAISE EXCEPTION 'Not authorised to issue employee numbers.';END IF;
 SELECT * INTO e FROM employees WHERE id=p_employee_id AND company_id=p_company_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Employee not found.';END IF;
 IF e.employee_number_assigned_at IS NOT NULL THEN RETURN to_jsonb(e);END IF;
 IF e.deleted_at IS NOT NULL THEN RAISE EXCEPTION 'Restore this staff record before issuing a number.';END IF;
 c:=employee_number_department(e.department,p_department_code);
 IF c IS NULL THEN RAISE EXCEPTION 'This department needs an HR-approved numbering code (FIN, HR, IT, SM, OPS, STG, CRE, CMP, PUR or EXE).';END IF;
 UPDATE employees SET numbering_department_code=c,numbering_hire_year=extract(year FROM coalesce(nullif(date_of_joining::text,'')::date,nullif(hire_date::text,'')::date))::integer WHERE id=e.id RETURNING * INTO e;
 IF e.employee_number_assigned_at IS NULL THEN RAISE EXCEPTION 'A valid hiring date is required before assigning an employee number.';END IF;
 INSERT INTO audit_logs(company_id,actor_id,action,entity,entity_id,metadata) VALUES(p_company_id,p_actor_id,'EMPLOYEE_NUMBER_ISSUED','employees',e.id::text,jsonb_build_object('employee_number',e.employee_code));
 RETURN to_jsonb(e);
END $$;

CREATE OR REPLACE FUNCTION public.archive_employee(p_employee_id integer,p_company_id integer,p_actor_id integer,p_reason text,p_confirmation text,p_restore boolean DEFAULT false) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path=public,pg_temp AS $$
DECLARE e public.employees;a public.users;u public.users;
BEGIN
 -- Serialise lifecycle changes for a company, including last-admin checks.
 PERFORM 1 FROM companies WHERE id=p_company_id FOR UPDATE;
 SELECT * INTO a FROM users WHERE id=p_actor_id AND company_id=p_company_id AND status='active';
 IF NOT FOUND OR a.role_code NOT IN ('HR','HR_MANAGER','CEO','SUPER_ADMIN','ADMIN') THEN RAISE EXCEPTION 'Not authorised to delete or restore staff.';END IF;
 IF length(trim(coalesce(p_reason,'')))<10 OR length(p_reason)>500 THEN RAISE EXCEPTION 'Provide a reason of 10 to 500 characters.';END IF;
 SELECT * INTO e FROM employees WHERE id=p_employee_id AND company_id=p_company_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Employee not found.';END IF;
 IF trim(coalesce(p_confirmation,''))<>e.employee_code THEN RAISE EXCEPTION 'Confirm the exact current employee number.';END IF;
 IF e.user_id=p_actor_id THEN RAISE EXCEPTION 'You cannot delete or restore your own staff account.';END IF;
 SELECT * INTO u FROM users WHERE id=e.user_id AND company_id=p_company_id FOR UPDATE;
 IF u.role_code IN ('SUPER_ADMIN','ADMIN','CEO') AND a.role_code<>'SUPER_ADMIN' THEN RAISE EXCEPTION 'Only a super administrator can manage this privileged account.';END IF;
 IF NOT p_restore AND u.status='active' AND u.role_code IN ('SUPER_ADMIN','ADMIN') AND NOT EXISTS(SELECT 1 FROM users WHERE company_id=p_company_id AND id<>u.id AND status='active' AND role_code IN ('SUPER_ADMIN','ADMIN')) THEN RAISE EXCEPTION 'The last active administrator cannot be deleted.';END IF;
 IF p_restore THEN
  IF e.deleted_at IS NULL THEN RETURN to_jsonb(e);END IF;
  UPDATE employees SET deleted_at=NULL,deleted_by=NULL,deletion_reason=NULL,status='inactive' WHERE id=e.id RETURNING * INTO e;
  -- Restoration retains the same number and leaves access disabled until HR reactivates.
 ELSE
  IF e.deleted_at IS NOT NULL THEN RETURN to_jsonb(e);END IF;
  UPDATE employees SET deleted_at=now(),deleted_by=p_actor_id,deletion_reason=trim(p_reason),status='inactive' WHERE id=e.id RETURNING * INTO e;
 END IF;
 UPDATE users SET status='inactive',session_invalid_before=now() WHERE id=e.user_id AND company_id=p_company_id;
 UPDATE workforce_access_sessions SET state='revoked',revoked_at=now(),revoke_reason='staff_record_removed' WHERE user_id=e.user_id AND company_id=p_company_id AND state IN ('active','pending');
 INSERT INTO audit_logs(company_id,actor_id,actor_email,action,entity,entity_id,metadata)
 VALUES(p_company_id,a.id,a.email,CASE WHEN p_restore THEN 'STAFF_RESTORED' ELSE 'STAFF_DELETED' END,'employees',e.id::text,jsonb_build_object('employee_number',e.employee_code,'reason',trim(p_reason),'history_retained',true));
 RETURN to_jsonb(e);
END $$;
REVOKE ALL ON FUNCTION public.employee_number_department(text,text),public.enforce_employee_number(),public.issue_employee_number(integer,integer,integer,text),public.archive_employee(integer,integer,integer,text,text,boolean) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.issue_employee_number(integer,integer,integer,text),public.archive_employee(integer,integer,integer,text,text,boolean) TO service_role;
NOTIFY pgrst,'reload schema';
COMMIT;
