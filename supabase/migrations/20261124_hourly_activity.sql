BEGIN;
CREATE OR REPLACE FUNCTION workforce_activity_process_user(p_user_id INTEGER, p_now TIMESTAMPTZ DEFAULT now())
RETURNS VOID LANGUAGE plpgsql SET search_path=public AS $$
DECLARE u users; emp employees; last_active TIMESTAMPTZ; last_seen TIMESTAMPTZ;
BEGIN
 PERFORM pg_advisory_xact_lock(78921,p_user_id);
 SELECT * INTO u FROM users WHERE id=p_user_id;
 SELECT * INTO emp FROM employees WHERE user_id=u.id AND company_id=u.company_id AND status='active' LIMIT 1;
 SELECT max(last_activity_at),max(last_seen_at) INTO last_active,last_seen
 FROM workforce_activity_presence WHERE user_id=u.id AND company_id=u.company_id AND stopped_at IS NULL;
 IF u.status IS DISTINCT FROM 'active' OR emp.id IS NULL OR last_active IS NULL OR last_active>p_now-interval '60 minutes' THEN
  UPDATE workforce_activity_events SET ended_at=p_now WHERE user_id=u.id AND ended_at IS NULL;
 ELSE
  INSERT INTO workforce_activity_events(company_id,user_id,employee_id,last_activity_at,last_seen_at,detected_at,kind)
  VALUES(u.company_id,u.id,emp.id,last_active,last_seen,p_now,
   CASE WHEN last_seen<p_now-interval '90 seconds' THEN 'connection_lost' ELSE 'app_inactive' END)
  ON CONFLICT(user_id) WHERE ended_at IS NULL DO NOTHING;
 END IF;
END; $$;

CREATE OR REPLACE FUNCTION workforce_activity_deliver(p_company_id INTEGER DEFAULT NULL)
RETURNS VOID LANGUAGE sql SET search_path=public AS $$
 INSERT INTO workforce_activity_notices(company_id,user_id,event_id,title,body)
 SELECT ev.company_id,u.id,ev.id,'Staff activity needs review: '||emp.first_name||' '||emp.last_name,
 CASE WHEN ev.kind='connection_lost' THEN 'No app activity for 60 minutes; connection was lost. Confirm with the staff member.'
 ELSE 'No app interaction for 60 minutes. Review the staff member’s context.' END
 FROM workforce_activity_events ev JOIN employees emp ON emp.id=ev.employee_id
 JOIN users u ON u.company_id=ev.company_id AND u.status='active'
 WHERE ev.reviewed_at IS NULL AND (p_company_id IS NULL OR ev.company_id=p_company_id)
 AND (upper(u.role_code) IN ('HR','HR_MANAGER') OR
  (upper(u.role_code) IN ('SUPER_ADMIN','ADMIN') AND NOT EXISTS
    (SELECT 1 FROM users hr WHERE hr.company_id=ev.company_id AND hr.status='active' AND upper(hr.role_code) IN ('HR','HR_MANAGER'))))
 ON CONFLICT(user_id,event_id) DO NOTHING;
$$;

CREATE OR REPLACE FUNCTION workforce_activity_heartbeat(p_user_id INTEGER,p_company_id INTEGER,p_client_id UUID,p_sequence INTEGER,p_stop BOOLEAN DEFAULT false)
RETURNS JSONB LANGUAGE plpgsql SET search_path=public AS $$
DECLARE emp employees; existing workforce_activity_presence; current_event JSONB; time_now TIMESTAMPTZ:=clock_timestamp();
BEGIN
 PERFORM pg_advisory_xact_lock(78921,p_user_id);
 IF NOT EXISTS(SELECT 1 FROM users WHERE id=p_user_id AND company_id=p_company_id AND status='active') THEN RAISE EXCEPTION 'Account is not active'; END IF;
 SELECT * INTO emp FROM employees WHERE user_id=p_user_id AND company_id=p_company_id AND status='active' LIMIT 1;
 IF emp.id IS NULL THEN RETURN jsonb_build_object('enabled',false,'threshold_seconds',3600,'event',NULL); END IF;
 IF p_sequence IS NULL OR p_sequence<0 OR p_client_id IS NULL THEN RAISE EXCEPTION 'Invalid activity session'; END IF;
 PERFORM workforce_activity_process_user(p_user_id,time_now);
 SELECT * INTO existing FROM workforce_activity_presence WHERE user_id=p_user_id AND client_id=p_client_id;
 IF existing.id IS NOT NULL AND p_sequence<existing.sequence THEN RAISE EXCEPTION 'Activity sequence is out of order'; END IF;
 INSERT INTO workforce_activity_presence(company_id,user_id,employee_id,client_id,sequence,last_activity_at,last_seen_at,stopped_at)
 VALUES(p_company_id,p_user_id,emp.id,p_client_id,p_sequence,time_now,time_now,CASE WHEN p_stop THEN time_now END)
 ON CONFLICT(user_id,client_id) DO UPDATE SET sequence=p_sequence,last_seen_at=time_now,
 last_activity_at=CASE WHEN p_sequence>existing.sequence OR existing.stopped_at IS NOT NULL THEN time_now ELSE existing.last_activity_at END,
 stopped_at=CASE WHEN p_stop THEN time_now END;
 IF p_stop THEN UPDATE workforce_activity_presence SET stopped_at=time_now WHERE user_id=p_user_id AND company_id=p_company_id; END IF;
 PERFORM workforce_activity_process_user(p_user_id,time_now);
 PERFORM workforce_activity_deliver(p_company_id);
 SELECT to_jsonb(e) INTO current_event FROM workforce_activity_events e
 WHERE e.user_id=p_user_id AND e.company_id=p_company_id AND e.reason IS NULL ORDER BY e.detected_at DESC LIMIT 1;
 RETURN jsonb_build_object('enabled',true,'threshold_seconds',3600,'server_time',time_now,'event',current_event);
END; $$;
NOTIFY pgrst,'reload schema';
COMMIT;
