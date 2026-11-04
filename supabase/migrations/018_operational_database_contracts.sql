-- Preserve records and legacy state spellings while accepting the application's workflows.
BEGIN;
SET LOCAL lock_timeout = '5s';
SET LOCAL statement_timeout = '60s';

DO $$ BEGIN
 IF EXISTS (SELECT 1 FROM public.leave_balances GROUP BY company_id,employee_id,year,leave_type HAVING count(*) > 1) THEN
  RAISE EXCEPTION 'Duplicate leave balances require review. No records have been removed.';
 END IF;
END $$;

ALTER TABLE public.sos DROP CONSTRAINT IF EXISTS sos_status_check;
ALTER TABLE public.sos ADD CONSTRAINT sos_status_check
 CHECK (lower(status) IN ('active','acknowledged','resolved'));

ALTER TABLE public.schedules DROP CONSTRAINT IF EXISTS schedules_status_check;
ALTER TABLE public.schedules ADD CONSTRAINT schedules_status_check
 CHECK (lower(replace(status,' ','_')) IN ('planned','draft','submitted','in_progress','completed','approved','rejected','revision_requested'));
ALTER TABLE public.schedules DROP CONSTRAINT IF EXISTS schedules_supervisor_approval_status_check;
ALTER TABLE public.schedules ADD CONSTRAINT schedules_supervisor_approval_status_check
 CHECK (lower(replace(supervisor_approval_status,' ','_')) IN ('draft','pending','approved','rejected','revision_requested'));
ALTER TABLE public.schedules DROP CONSTRAINT IF EXISTS schedules_supervisor_status_check;
ALTER TABLE public.schedules ADD CONSTRAINT schedules_supervisor_status_check
 CHECK (lower(replace(supervisor_status,' ','_')) IN ('draft','pending','approved','rejected','revision_requested'));
ALTER TABLE public.schedules DROP CONSTRAINT IF EXISTS schedules_hr_status_check;
ALTER TABLE public.schedules ADD CONSTRAINT schedules_hr_status_check
 CHECK (lower(replace(hr_status,' ','_')) IN ('draft','pending','acknowledged','approved','rejected'));

ALTER TABLE public.idle_alerts DROP CONSTRAINT IF EXISTS idle_alerts_status_check;
ALTER TABLE public.idle_alerts ADD CONSTRAINT idle_alerts_status_check
 CHECK (lower(status) IN ('pending','explained','reviewed','pardoned','escalated','resolved','dismissed'));

CREATE UNIQUE INDEX IF NOT EXISTS edgewforce_leave_balance_unique ON public.leave_balances(company_id,employee_id,year,leave_type);
CREATE INDEX IF NOT EXISTS edgewforce_notifications_inbox ON public.notifications(employee_id,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_sos_history ON public.sos(company_id,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_sos_events_queue ON public.sos_events(company_id,status,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_idle_sessions_queue ON public.employee_idle_sessions(company_id,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_idle_alert_session ON public.idle_alerts(company_id,employee_id,alert_type);
CREATE INDEX IF NOT EXISTS edgewforce_idle_alert_queue ON public.idle_alerts(company_id,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_audit_company_time ON public.audit_logs(company_id,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_report_delivery_history ON public.hr_report_deliveries(company_id,updated_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_project_memberships ON public.collaboration_members(company_id,user_id,project_id);
CREATE INDEX IF NOT EXISTS edgewforce_company_projects ON public.collaboration_projects(company_id,created_at DESC);
CREATE INDEX IF NOT EXISTS edgewforce_project_task_queue ON public.collaboration_tasks(company_id,project_id,status,due_at);
CREATE INDEX IF NOT EXISTS edgewforce_project_event_history ON public.collaboration_events(company_id,project_id,created_at DESC);

NOTIFY pgrst, 'reload schema';
COMMIT;
