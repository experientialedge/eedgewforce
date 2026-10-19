-- Additive staff location access policy. Existing records and administrator access are preserved.
BEGIN;
CREATE TABLE IF NOT EXISTS workforce_access_sessions (
 id SERIAL PRIMARY KEY, company_id INTEGER NOT NULL REFERENCES companies(id),user_id INTEGER NOT NULL REFERENCES users(id),employee_id INTEGER NOT NULL REFERENCES employees(id),
 token_id UUID UNIQUE NOT NULL,state TEXT NOT NULL CHECK(state IN ('pending','active','revoked')),location_id INTEGER REFERENCES work_locations(id),
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),expires_at TIMESTAMPTZ NOT NULL,last_verified_at TIMESTAMPTZ,last_seen_at TIMESTAMPTZ,outside_since TIMESTAMPTZ,revoked_at TIMESTAMPTZ,revoke_reason TEXT
);
CREATE INDEX IF NOT EXISTS workforce_access_user_state ON workforce_access_sessions(company_id,user_id,state);
CREATE TABLE IF NOT EXISTS workforce_movement_events (
 id SERIAL PRIMARY KEY,company_id INTEGER NOT NULL REFERENCES companies(id),user_id INTEGER NOT NULL REFERENCES users(id),employee_id INTEGER NOT NULL REFERENCES employees(id),
 session_id INTEGER NOT NULL REFERENCES workforce_access_sessions(id),kind TEXT NOT NULL CHECK(kind IN ('location_login','workplace_departure')),
 location_id INTEGER REFERENCES work_locations(id),observed_at TIMESTAMPTZ NOT NULL DEFAULT now(),details JSONB NOT NULL DEFAULT '{}',UNIQUE(session_id,kind)
);
CREATE INDEX IF NOT EXISTS workforce_movement_company_time ON workforce_movement_events(company_id,observed_at DESC);
CREATE TABLE IF NOT EXISTS workforce_movement_notices (
 id SERIAL PRIMARY KEY,company_id INTEGER NOT NULL REFERENCES companies(id),user_id INTEGER NOT NULL REFERENCES users(id),event_id INTEGER NOT NULL REFERENCES workforce_movement_events(id),
 title TEXT NOT NULL,body TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now(),read_at TIMESTAMPTZ,UNIQUE(user_id,event_id)
);
CREATE TABLE IF NOT EXISTS workforce_executive_reports (
 id SERIAL PRIMARY KEY,company_id INTEGER NOT NULL REFERENCES companies(id),report_date DATE NOT NULL,facts JSONB NOT NULL,
 narrative TEXT,source TEXT NOT NULL DEFAULT 'verified_facts',model TEXT,generated_at TIMESTAMPTZ NOT NULL DEFAULT now(),ai_generated_at TIMESTAMPTZ,
 ai_facts_hash TEXT,ai_claimed_until TIMESTAMPTZ,ai_last_attempt_at TIMESTAMPTZ,UNIQUE(company_id,report_date)
);
CREATE TABLE IF NOT EXISTS workforce_report_notices (
 id SERIAL PRIMARY KEY,company_id INTEGER NOT NULL REFERENCES companies(id),user_id INTEGER NOT NULL REFERENCES users(id),report_id INTEGER NOT NULL REFERENCES workforce_executive_reports(id),
 title TEXT NOT NULL,body TEXT NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now(),read_at TIMESTAMPTZ,UNIQUE(user_id,report_id)
);

CREATE OR REPLACE FUNCTION workforce_access_commit(p_session_id INTEGER,p_user_id INTEGER,p_company_id INTEGER,p_action TEXT,p_data JSONB)
RETURNS JSONB LANGUAGE plpgsql SET search_path=public AS $$
DECLARE s workforce_access_sessions; v_now TIMESTAMPTZ:=clock_timestamp();event_id INTEGER; destination TEXT;
BEGIN
 PERFORM pg_advisory_xact_lock(78922,p_user_id);
 SELECT * INTO s FROM workforce_access_sessions WHERE id=p_session_id AND user_id=p_user_id AND company_id=p_company_id FOR UPDATE;
 IF s.id IS NULL OR s.state='revoked' OR s.expires_at<=v_now OR NOT EXISTS(SELECT 1 FROM users WHERE id=p_user_id AND company_id=p_company_id AND status='active') THEN RAISE EXCEPTION 'Workplace session ended'; END IF;
 IF NOT EXISTS(SELECT 1 FROM employees WHERE id=s.employee_id AND user_id=p_user_id AND company_id=p_company_id AND status='active') THEN RAISE EXCEPTION 'Staff profile is no longer active'; END IF;
 IF p_action='activate' THEN
  IF s.state<>'pending' OR NOT coalesce((p_data->>'inside')::boolean,false) THEN RAISE EXCEPTION 'Invalid sign-in challenge'; END IF;
  IF NOT EXISTS(SELECT 1 FROM employee_location_assignments a JOIN work_locations l ON l.id=a.location_id WHERE a.employee_id=s.employee_id AND a.company_id=p_company_id AND a.is_active AND l.status='active' AND l.company_id=p_company_id AND l.id=(p_data->>'location_id')::integer AND (a.assignment_type<>'temporary' OR ((a.start_date IS NULL OR a.start_date<=v_now) AND (a.end_date IS NULL OR a.end_date>=v_now)))) THEN RAISE EXCEPTION 'Workstation assignment is no longer active'; END IF;
  UPDATE workforce_access_sessions SET state='active',location_id=(p_data->>'location_id')::integer,last_verified_at=v_now,last_seen_at=v_now,outside_since=NULL,expires_at=v_now+interval '12 hours' WHERE id=s.id RETURNING * INTO s;
  INSERT INTO workforce_movement_events(company_id,user_id,employee_id,session_id,kind,location_id,details,observed_at) VALUES(p_company_id,p_user_id,s.employee_id,s.id,'location_login',s.location_id,p_data,v_now);
 ELSIF p_action='logout' THEN
  UPDATE workforce_access_sessions SET state='revoked',revoked_at=v_now,revoke_reason='sign_out' WHERE id=s.id RETURNING * INTO s;
 ELSIF p_action='observe' THEN
  IF s.state<>'active' THEN RAISE EXCEPTION 'Session is not active'; END IF;
  IF coalesce((p_data->>'inside')::boolean,false) THEN
   UPDATE workforce_access_sessions SET last_verified_at=v_now,last_seen_at=v_now,outside_since=NULL WHERE id=s.id RETURNING * INTO s;
  ELSIF NOT coalesce((p_data->>'outside')::boolean,false) THEN
   UPDATE workforce_access_sessions SET last_seen_at=v_now,outside_since=NULL WHERE id=s.id RETURNING * INTO s;
  ELSIF s.outside_since IS NULL OR v_now-s.outside_since>interval '120 seconds' THEN
   UPDATE workforce_access_sessions SET outside_since=v_now,last_seen_at=v_now WHERE id=s.id RETURNING * INTO s;
  ELSIF v_now-s.outside_since>=interval '15 seconds' THEN
   INSERT INTO workforce_movement_events(company_id,user_id,employee_id,session_id,kind,location_id,details,observed_at) VALUES(p_company_id,p_user_id,s.employee_id,s.id,'workplace_departure',s.location_id,p_data,v_now) RETURNING id INTO event_id;
   UPDATE workforce_access_sessions SET state='revoked',revoked_at=v_now,revoke_reason='confirmed_departure' WHERE company_id=p_company_id AND user_id=p_user_id AND state IN ('pending','active');
   destination:=CASE WHEN nullif(p_data->>'detected_location_name','') IS NULL THEN 'Destination is unconfirmed.' ELSE 'Observed at '||(p_data->>'detected_location_name')||'.' END;
   INSERT INTO workforce_movement_notices(company_id,user_id,event_id,title,body)
   SELECT p_company_id,u.id,event_id,'Workplace departure confirmed',concat(e.first_name,' ',e.last_name,' left ',p_data->>'location_name','. ',destination,' Workplace sessions ended.')
   FROM users u JOIN employees e ON e.id=s.employee_id WHERE u.company_id=p_company_id AND u.status='active' AND upper(u.role_code) IN ('HR','HR_MANAGER','ADMIN','SUPER_ADMIN');
   SELECT * INTO s FROM workforce_access_sessions WHERE id=s.id;
  END IF;
 ELSE RAISE EXCEPTION 'Unsupported workplace action'; END IF;
 RETURN to_jsonb(s);
END; $$;

DO $$ DECLARE t TEXT; BEGIN
 FOREACH t IN ARRAY ARRAY['workforce_access_sessions','workforce_movement_events','workforce_movement_notices','workforce_executive_reports','workforce_report_notices'] LOOP
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',t);
  EXECUTE format('REVOKE ALL ON TABLE public.%I FROM anon,authenticated',t);
  EXECUTE format('GRANT SELECT,INSERT,UPDATE,DELETE ON TABLE public.%I TO service_role',t);
 END LOOP;
END; $$;
GRANT USAGE,SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;
REVOKE ALL ON FUNCTION workforce_access_commit(INTEGER,INTEGER,INTEGER,TEXT,JSONB) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION workforce_access_commit(INTEGER,INTEGER,INTEGER,TEXT,JSONB) TO service_role;

CREATE OR REPLACE FUNCTION workforce_executive_rollup(p_company_id INTEGER,p_day DATE DEFAULT (now() AT TIME ZONE 'Africa/Lagos')::date,p_notify BOOLEAN DEFAULT false)
RETURNS JSONB LANGUAGE plpgsql SET search_path=public AS $$
DECLARE facts JSONB;report workforce_executive_reports;starts TIMESTAMPTZ:=p_day::timestamp AT TIME ZONE 'Africa/Lagos';ends TIMESTAMPTZ:=(p_day+1)::timestamp AT TIME ZONE 'Africa/Lagos';
BEGIN
 PERFORM pg_advisory_xact_lock(78923,p_company_id);
 facts:=jsonb_build_object(
 'active_staff',(SELECT count(*)::integer FROM employees WHERE company_id=p_company_id AND status='active'),
 'staff_clocked_in',(SELECT count(DISTINCT employee_id)::integer FROM attendance WHERE company_id=p_company_id AND date=p_day AND clock_in IS NOT NULL),
 'late_arrivals',(SELECT count(*)::integer FROM attendance WHERE company_id=p_company_id AND date=p_day AND lower(status)='late'),
 'clock_outs',(SELECT count(*)::integer FROM attendance WHERE company_id=p_company_id AND date=p_day AND clock_out IS NOT NULL),
 'location_sign_ins',(SELECT count(*)::integer FROM workforce_movement_events WHERE company_id=p_company_id AND kind='location_login' AND observed_at>=starts AND observed_at<ends),
 'confirmed_departures',(SELECT count(*)::integer FROM workforce_movement_events WHERE company_id=p_company_id AND kind='workplace_departure' AND observed_at>=starts AND observed_at<ends),
 'app_inactivity_flags',(SELECT count(*)::integer FROM workforce_activity_events WHERE company_id=p_company_id AND detected_at>=starts AND detected_at<ends AND kind='app_inactive'),
 'unconfirmed_connection_gaps',(SELECT count(*)::integer FROM workforce_activity_events WHERE company_id=p_company_id AND detected_at>=starts AND detected_at<ends AND kind='connection_lost'),
 'completed_project_tasks',(SELECT count(*)::integer FROM collaboration_tasks WHERE company_id=p_company_id AND completed_at>=starts AND completed_at<ends AND status='done'),
 'overdue_project_tasks',(SELECT count(*)::integer FROM collaboration_tasks WHERE company_id=p_company_id AND status<>'done' AND due_at<least(now(),ends)));
 INSERT INTO workforce_executive_reports(company_id,report_date,facts) VALUES(p_company_id,p_day,facts)
 ON CONFLICT(company_id,report_date) DO UPDATE SET facts=excluded.facts,generated_at=now() RETURNING * INTO report;
 IF p_notify THEN
  INSERT INTO workforce_report_notices(company_id,user_id,report_id,title,body)
  SELECT p_company_id,u.id,report.id,'Executive activity report is ready','The verified workforce and movement report for '||p_day||' is available on your dashboard.'
  FROM users u WHERE u.company_id=p_company_id AND u.status='active' AND upper(u.role_code) IN ('HR','HR_MANAGER','ADMIN','SUPER_ADMIN') ON CONFLICT(user_id,report_id) DO NOTHING;
 END IF;
 RETURN to_jsonb(report);
END; $$;
CREATE OR REPLACE FUNCTION workforce_daily_reports() RETURNS VOID LANGUAGE plpgsql SET search_path=public AS $$
DECLARE c RECORD;BEGIN FOR c IN SELECT id FROM companies WHERE status='active' LOOP PERFORM workforce_executive_rollup(c.id,(now() AT TIME ZONE 'Africa/Lagos')::date,true);END LOOP;END; $$;
CREATE OR REPLACE FUNCTION workforce_report_claim_ai(p_report_id INTEGER,p_company_id INTEGER) RETURNS JSONB LANGUAGE sql SET search_path=public AS $$
 WITH claimed AS(UPDATE workforce_executive_reports SET ai_claimed_until=now()+interval '30 seconds',ai_last_attempt_at=now()
 WHERE id=p_report_id AND company_id=p_company_id AND (ai_claimed_until IS NULL OR ai_claimed_until<now()) AND (ai_last_attempt_at IS NULL OR ai_last_attempt_at<now()-interval '15 minutes') RETURNING *) SELECT to_jsonb(claimed) FROM claimed;
$$;
REVOKE ALL ON FUNCTION workforce_executive_rollup(INTEGER,DATE,BOOLEAN),workforce_daily_reports(),workforce_report_claim_ai(INTEGER,INTEGER) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION workforce_executive_rollup(INTEGER,DATE,BOOLEAN),workforce_daily_reports(),workforce_report_claim_ai(INTEGER,INTEGER) TO service_role;
UPDATE work_locations SET geofence_radius=300,geofence_radius_meters=300 WHERE lower(location_type)='market';
CREATE OR REPLACE FUNCTION application_release_readiness() RETURNS JSONB LANGUAGE sql SET search_path=public AS $$
 SELECT jsonb_build_object('release','2026-10-15','integer_ids',
 (SELECT bool_and(data_type='integer') AND count(*)=3 FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('users','employees','attendance') AND column_name='id'),
 'collaboration',to_regprocedure('public.collaboration_commit(integer,integer,integer,text,jsonb)') IS NOT NULL,
 'activity_monitoring',to_regprocedure('public.workforce_activity_heartbeat(integer,integer,uuid,integer,boolean)') IS NOT NULL,
 'workplace_access',to_regprocedure('public.workforce_access_commit(integer,integer,integer,text,jsonb)') IS NOT NULL,
 'executive_reports',to_regprocedure('public.workforce_executive_rollup(integer,date,boolean)') IS NOT NULL);
$$;
REVOKE ALL ON FUNCTION application_release_readiness() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION application_release_readiness() TO service_role;
NOTIFY pgrst,'reload schema';
COMMIT;
