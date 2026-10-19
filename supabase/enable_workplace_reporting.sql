-- Run after migration 013. These jobs do not call an external AI provider.
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
SELECT cron.schedule('edgewforce-activity-monitor','* * * * *','SELECT public.workforce_activity_process_due();');
-- 17:05 UTC = 18:05 Lagos, after the clock-out window closes.
SELECT cron.schedule('edgewforce-executive-daily-report','5 17 * * *','SELECT public.workforce_daily_reports();');
