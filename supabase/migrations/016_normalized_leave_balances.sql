BEGIN;
CREATE OR REPLACE FUNCTION hr_review_leave(p_company_id INTEGER,p_actor_id INTEGER,p_request_id INTEGER,p_approve BOOLEAN,p_reason TEXT)
RETURNS JSONB LANGUAGE plpgsql SET search_path=public AS $$
DECLARE r leave_requests; k TEXT; result leave_requests; changed INTEGER;
BEGIN
 IF NOT EXISTS(SELECT 1 FROM users WHERE id=p_actor_id AND company_id=p_company_id AND status='active' AND role_code IN ('HR','HR_MANAGER','ADMIN','SUPER_ADMIN','CEO','CTO','IT_ADMIN','MANAGER')) THEN RAISE EXCEPTION 'Unauthorized leave reviewer'; END IF;
 SELECT * INTO r FROM leave_requests WHERE id=p_request_id AND company_id=p_company_id FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Leave request not found'; END IF;
 IF r.status<>'pending' THEN RAISE EXCEPTION 'Leave request has already been reviewed'; END IF;
 IF p_approve THEN
   k:=lower(r.leave_type);
   IF k IN ('annual','sick','casual') THEN
     IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='leave_balances' AND column_name='annual') THEN
       EXECUTE format('UPDATE leave_balances SET %I=%I-$1 WHERE employee_id=$2 AND year=$3 AND %I >= $1',k,k,k) USING r.days,r.employee_id,extract(year FROM r.start_date)::integer;
     ELSE
       UPDATE leave_balances SET used_days=coalesce(used_days,0)+r.days,remaining_days=remaining_days-r.days
       WHERE employee_id=r.employee_id AND company_id=p_company_id AND year=extract(year FROM r.start_date)::integer AND lower(leave_type)=k AND remaining_days>=r.days;
     END IF;
     GET DIAGNOSTICS changed=ROW_COUNT;
     IF changed<>1 THEN RAISE EXCEPTION 'Leave balance is missing or insufficient. Update the balance before approval'; END IF;
   END IF;
 END IF;
 UPDATE leave_requests SET status=CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END, reviewed_by=p_actor_id,reviewed_at=now(),review_notes=p_reason WHERE id=r.id RETURNING * INTO result;
 INSERT INTO notifications(company_id,employee_id,type,title,body) VALUES(p_company_id,r.employee_id,'Leave',CASE WHEN p_approve THEN 'Leave approved' ELSE 'Leave request update' END, r.leave_type||' leave ('||r.start_date||' to '||r.end_date||'): '||result.status||'. '||coalesce(p_reason,''));
 RETURN to_jsonb(result);
END; $$;
REVOKE ALL ON FUNCTION hr_review_leave(INTEGER,INTEGER,INTEGER,BOOLEAN,TEXT) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION hr_review_leave(INTEGER,INTEGER,INTEGER,BOOLEAN,TEXT) TO service_role;
NOTIFY pgrst,'reload schema';
COMMIT;
