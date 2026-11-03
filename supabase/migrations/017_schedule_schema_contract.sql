-- Additive repair for deployments whose schedules table predates the review UI.
-- Existing records, review timestamps, tasks and staff are preserved.
BEGIN;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS employee_name text;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS employee_code text;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS department text;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS position text;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS title text;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS submitted_at timestamptz;
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS supervisor_status text DEFAULT 'PENDING';
ALTER TABLE public.schedules ADD COLUMN IF NOT EXISTS hr_status text DEFAULT 'PENDING';
UPDATE public.schedules s SET
 employee_name=COALESCE(s.employee_name, concat_ws(' ', e.first_name, e.last_name)),
 employee_code=COALESCE(s.employee_code, e.employee_code),
 department=COALESCE(s.department, e.department),
 position=COALESCE(s.position, e.position)
FROM public.employees e WHERE e.id=s.employee_id AND e.company_id=s.company_id;
UPDATE public.schedules SET title=COALESCE(title, 'Daily Schedule - ' || date::text),
 supervisor_status=CASE WHEN supervisor_reviewed_at IS NOT NULL THEN COALESCE(upper(supervisor_approval_status), supervisor_status) ELSE supervisor_status END,
 hr_status=CASE WHEN hr_reviewed_at IS NOT NULL AND hr_status='PENDING' THEN 'ACKNOWLEDGED' ELSE hr_status END;
NOTIFY pgrst, 'reload schema';
COMMIT;
