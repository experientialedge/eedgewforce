# Additional operational database repairs — 4 November 2026

Applied to the active Supabase project `kfvtgqigidgazmbfsfuc` using the signed-in owner SQL editor. Migration: `supabase/migrations/018_operational_database_contracts.sql`.

## Findings and installed changes

| Area | Previous failure or missing structure | Installed repair |
|---|---|---|
| Schedule workflow | Legacy CHECK accepted title-case values and omitted drafts/revisions. | Case-compatible validation accepts the existing values and the app's DRAFT, SUBMITTED and REVISION_REQUESTED states. |
| Supervisor reviews | Legacy approval CHECK rejected uppercase review states and draft/revision values. | Compatible approval validation and a CHECK for supervisor_status. |
| HR schedule reviews | hr_status had no workflow CHECK. | Validation for draft, pending, acknowledged, approved and rejected. |
| Historical SOS | Old sos CHECK accepted uppercase values; the service updates lowercase values. | Accept valid SOS states regardless of case. Existing incidents are unchanged. |
| Inactivity explanations | idle_alerts CHECK rejected explained events. | Accept explained/resolved/dismissed while retaining pending/reviewed/pardoned/escalated. |
| Leave balances | No database uniqueness for employee/type/year within a company. | Unique company_id/employee_id/year/leave_type key, preceded by a duplicate preflight that refuses to remove or merge records. |
| Operational lookups | Missing composite lookup indexes for several app queries. | Twelve indexes for notification inboxes, SOS history/queues, idle queues/session lookup, company audit history, report deliveries, memberships, project lists/tasks/events. |

No additional tables or columns were necessary for these repairs. Existing company-settings, employee/month payslip and primary-workplace uniqueness safeguards were already installed and were preserved.

## Verification

- Inspected 82 tables and one view, 23 stored functions, 305 existing constraints and 166 existing indexes before the upgrade.
- All 47 identifiable INSERT/UPDATE target-column contracts in stored functions matched the observed schema (28 INSERTs, 19 UPDATEs). Three dynamic SQL statements remain explicitly marked for runtime validation in `database-routine-column-audit.json`; this is not proof of every SQL expression or branch.
- Live preflight: zero duplicate leave balances and zero incompatible values for the repaired workflow checks.
- New real PostgreSQL 17 CI verifies legacy-record preservation, valid workflow transitions, invalid-state rejection, duplicate protection, refusal to proceed when duplicate data exists, repeatable installation, all 13 indexes, and inbox query-plan eligibility.
- Real MySQL 8.4 CI verifies the standalone-hosting upgrade preserves existing balances and prevents duplicates. Node 22/24 application tests and browser builds also passed. [CI run](https://github.com/experientialedge/eedgewforce/actions/runs/41813574834).
- Owner SQL-editor live test cloned the actual four affected tables into temporary tables, tested drafts/revisions, HR acknowledgement, lower-case SOS resolution, inactivity explanation, invalid states and duplicate balances, and rolled back every test row.
- Live verification returned **13 operational indexes**, **6 validated workflow rules**, and **82 tables with row-level security enabled**. No RLS policies or execution grants were changed.

The full [application inventory](application-schema-audit.md) remains a separate column/RPC argument audit; matching columns alone does not establish valid business states or complete end-to-end behavior.

## Hostinger

The equivalent MySQL indexes and leave-balance uniqueness are included in the verified-copy startup upgrade. This is separate from the live Supabase installation. Hostinger's MySQL copy is not yet the app's active backend, and the previous source-upload service failure remains a separate deployment issue. Do not report a Hostinger activation as completed without its live checks.

The signed-in Hostinger phpMyAdmin launch was also checked: its database-console page returned “This site can’t be reached”. The separate MySQL copy was not modified through an unavailable connection. Its equivalent startup upgrade remains prepared and tested, pending Hostinger deployment/access recovery.
