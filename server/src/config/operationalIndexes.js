// Named lookup indexes shared by PostgreSQL migration 018 and standalone MySQL upgrades.
export const operationalIndexes = [
  ['edgewforce_notifications_inbox', 'notifications', ['employee_id', 'created_at']],
  ['edgewforce_sos_history', 'sos', ['company_id', 'created_at']],
  ['edgewforce_sos_events_queue', 'sos_events', ['company_id', 'status', 'created_at']],
  ['edgewforce_idle_sessions_queue', 'employee_idle_sessions', ['company_id', 'created_at']],
  ['edgewforce_idle_alert_session', 'idle_alerts', ['company_id', 'employee_id', 'alert_type']],
  ['edgewforce_idle_alert_queue', 'idle_alerts', ['company_id', 'created_at']],
  ['edgewforce_audit_company_time', 'audit_logs', ['company_id', 'created_at']],
  ['edgewforce_report_delivery_history', 'hr_report_deliveries', ['company_id', 'updated_at']],
  ['edgewforce_project_memberships', 'collaboration_members', ['company_id', 'user_id', 'project_id']],
  ['edgewforce_company_projects', 'collaboration_projects', ['company_id', 'created_at']],
  ['edgewforce_project_task_queue', 'collaboration_tasks', ['company_id', 'project_id', 'status', 'due_at']],
  ['edgewforce_project_event_history', 'collaboration_events', ['company_id', 'project_id', 'created_at']],
];
