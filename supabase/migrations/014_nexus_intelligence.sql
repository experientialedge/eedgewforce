-- Private NEXUS analytics and evidence snapshots; no staff records are removed.
BEGIN;
ALTER TABLE users ADD COLUMN IF NOT EXISTS session_invalid_before TIMESTAMPTZ;
CREATE TABLE IF NOT EXISTS nexus_intelligence_runs (
 id SERIAL PRIMARY KEY,company_id INTEGER NOT NULL REFERENCES companies(id),user_id INTEGER NOT NULL REFERENCES users(id),
 period_days INTEGER NOT NULL CHECK(period_days IN(7,30)),question_hash TEXT NOT NULL,evidence_hash TEXT NOT NULL,
 result JSONB NOT NULL,evidence JSONB NOT NULL,created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS nexus_runs_company_time ON nexus_intelligence_runs(company_id,created_at DESC);
CREATE TABLE IF NOT EXISTS nexus_generation_leases(company_id INTEGER PRIMARY KEY REFERENCES companies(id),last_attempt_at TIMESTAMPTZ NOT NULL);
ALTER TABLE nexus_intelligence_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE nexus_generation_leases ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON nexus_intelligence_runs,nexus_generation_leases FROM anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON nexus_intelligence_runs,nexus_generation_leases TO service_role;
GRANT USAGE,SELECT ON SEQUENCE nexus_intelligence_runs_id_seq TO service_role;
CREATE INDEX IF NOT EXISTS nexus_attendance_day ON attendance(company_id,date);
CREATE INDEX IF NOT EXISTS nexus_orders_day ON orders(company_id,order_date);
CREATE INDEX IF NOT EXISTS nexus_visits_day ON visits(company_id,planned_date);

CREATE OR REPLACE FUNCTION nexus_claim_generation(p_company_id INTEGER) RETURNS BOOLEAN LANGUAGE sql SET search_path=public AS $$
 WITH claimed AS(INSERT INTO nexus_generation_leases(company_id,last_attempt_at) VALUES(p_company_id,clock_timestamp())
 ON CONFLICT(company_id) DO UPDATE SET last_attempt_at=excluded.last_attempt_at WHERE nexus_generation_leases.last_attempt_at<clock_timestamp()-interval '60 seconds' RETURNING company_id)
 SELECT EXISTS(SELECT 1 FROM claimed);
$$;
CREATE OR REPLACE FUNCTION nexus_operational_snapshot(p_company_id INTEGER,p_period INTEGER DEFAULT 7) RETURNS JSONB LANGUAGE plpgsql SET search_path=public AS $$
DECLARE ending DATE:=(now() AT TIME ZONE 'Africa/Lagos')::date;days JSONB;
BEGIN
 IF p_period NOT IN(7,30) THEN RAISE EXCEPTION 'NEXUS supports 7 or 30 day periods'; END IF;
 SELECT jsonb_agg(jsonb_build_object('date',d.day,
 'clocked_in',(SELECT count(DISTINCT employee_id)::integer FROM attendance WHERE company_id=p_company_id AND date=d.day AND clock_in IS NOT NULL),
 'late_arrivals',(SELECT count(*)::integer FROM attendance WHERE company_id=p_company_id AND date=d.day AND lower(status)='late'),
 'departures',(SELECT count(*)::integer FROM workforce_movement_events WHERE company_id=p_company_id AND kind='workplace_departure' AND (observed_at AT TIME ZONE 'Africa/Lagos')::date=d.day),
 'inactivity',(SELECT count(*)::integer FROM workforce_activity_events WHERE company_id=p_company_id AND kind='app_inactive' AND (detected_at AT TIME ZONE 'Africa/Lagos')::date=d.day),
 'connection_gaps',(SELECT count(*)::integer FROM workforce_activity_events WHERE company_id=p_company_id AND kind='connection_lost' AND (detected_at AT TIME ZONE 'Africa/Lagos')::date=d.day),
 'completed_tasks',(SELECT count(*)::integer FROM collaboration_tasks WHERE company_id=p_company_id AND status='done' AND (completed_at AT TIME ZONE 'Africa/Lagos')::date=d.day),
 'planned_visits',(SELECT count(*)::integer FROM visits WHERE company_id=p_company_id AND planned_date=d.day),
 'completed_visits',(SELECT count(*)::integer FROM visits WHERE company_id=p_company_id AND planned_date=d.day AND lower(status)='completed'),
 'order_count',(SELECT count(*)::integer FROM orders WHERE company_id=p_company_id AND order_date=d.day AND lower(status) NOT IN('cancelled','canceled','rejected')),
 'order_value',(SELECT coalesce(sum(total_amount),0) FROM orders WHERE company_id=p_company_id AND order_date=d.day AND lower(status) NOT IN('cancelled','canceled','rejected'))
 ) ORDER BY d.day) INTO days FROM (SELECT ending-i AS day FROM generate_series(0,p_period*2-1) i) d;
 RETURN jsonb_build_object('active_staff',(SELECT count(*)::integer FROM employees WHERE company_id=p_company_id AND status='active'),'days',days);
END; $$;
REVOKE ALL ON FUNCTION nexus_claim_generation(INTEGER),nexus_operational_snapshot(INTEGER,INTEGER) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION nexus_claim_generation(INTEGER),nexus_operational_snapshot(INTEGER,INTEGER) TO service_role;
CREATE OR REPLACE FUNCTION application_release_readiness() RETURNS JSONB LANGUAGE sql SET search_path=public AS $$
 SELECT jsonb_build_object('release','2026-10-15','integer_ids',
 (SELECT bool_and(data_type='integer') AND count(*)=3 FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('users','employees','attendance') AND column_name='id'),
 'collaboration',to_regprocedure('public.collaboration_commit(integer,integer,integer,text,jsonb)') IS NOT NULL,
 'activity_monitoring',to_regprocedure('public.workforce_activity_heartbeat(integer,integer,uuid,integer,boolean)') IS NOT NULL,
 'workplace_access',to_regprocedure('public.workforce_access_commit(integer,integer,integer,text,jsonb)') IS NOT NULL,
 'executive_reports',to_regprocedure('public.workforce_executive_rollup(integer,date,boolean)') IS NOT NULL,'nexus',to_regprocedure('public.nexus_operational_snapshot(integer,integer)') IS NOT NULL);
$$;
REVOKE ALL ON FUNCTION application_release_readiness() FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION application_release_readiness() TO service_role;
NOTIFY pgrst,'reload schema';
COMMIT;
