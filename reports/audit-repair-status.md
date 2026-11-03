# EdgeWForce function and schema audit — 4 November 2026

This report accompanies the complete [function inventory](application-schema-audit.md), [machine-readable inventory](application-schema-audit.json) and [CSV function list](application-functions.csv). Each function has its source location and a schema status. The inventory covers the server, client, deployment tools and application entry points; dependencies, generated builds and test helpers are excluded. Route paths are declarations, before Express mount prefixes.

Status meanings:

- **SCHEMA MATCH (STATIC)**: directly referenced tables/RPCs and identifiable fields match the observed production schema. This is not an end-to-end test result.
- **SCHEMA CHANGE REQUIRED**: the schedule migration is present in the release but not installed in Supabase.
- **DYNAMIC REVIEW**: table names or payload keys depend on runtime values; see the review below.
- **NO DIRECT DATABASE ACCESS**: the function needs no independent table, or delegates to a service. It is not marked runtime-verified.

## Repairs and verification

| Area | Repair | Evidence | Live schema dependency |
|---|---|---|---|
| Emergency dispatch | Write `sos_events`, which already supports accuracy, message, company and employee; agent_id holds the user FK. Require actual GPS; preserve zero coordinates/accuracy. | Strict production-column tests; real MySQL integration coverage added. | Existing columns; no DDL required. |
| Emergency history/review | Combine new events and original `sos` records; prefix legacy IDs to prevent collisions; enforce company and responder access. | Strict tests cover both sources and reject cross-company review. | Existing columns. |
| Emergency visibility | HR, HR_MANAGER, ADMIN, SUPER_ADMIN and supervisors can see company emergency queue/banner. | Source/route review; role guards remain in place. | Existing tables. External emergency-service dispatch is not configured or claimed. |
| Notifications | Persist `is_read`; return UI-compatible `read` and type-derived navigation. Populate company from the recipient. | Strict tests for creation, read/unread and navigation. | Existing columns; no link/read migration required. |
| Inactivity | Persist start/end times and minute duration in `employee_idle_sessions`; explanation and exact seconds in linked `idle_alerts` using alert_type; retain telemetry snapshot in audit metadata. | Strict tests verify save, explanation, retrieval and ownership. | Existing columns. |
| Cash settlement reviews | Use reconciliation_status, audited_by and audited_at; preserve review notes in audit metadata. | Strict tests check persisted state and notes. | Existing columns. |
| Payroll | Convert calculation camelCase properties to the actual snake_case payslip columns. | Strict tests run calculated, uploaded and batch payslips. | Existing columns. |
| Login history | Use existing LOGIN audit records; remove silently failing last_login_at update. | Existing login suite and source review. | Existing audit schema. |
| Daily schedules | Add eight missing detail/review columns without deleting records; keep supervisor_approval_status synchronized. | Strict target-schema tests and MySQL additive-upgrade integration test. | **Supabase migration 017 must be applied.** MySQL performs the named additive upgrade after copy verification at startup. |
| Dynamic settings/customer/product/rank updates | Reject unsupported column names and ownership/ID changes before database mutation. | schemaPatch regression tests. | Existing columns. |

## Dynamic operation review

These remain explicitly dynamic in the generated inventory; a source review or targeted test does not convert them into proof of every runtime branch.

| Function/module | Bounds or representation | Verification/remaining limit |
|---|---|---|
| verifyResourceOwnership | Table comes from route middleware declarations. | Existing ownership tests; arbitrary database-wide behavior is not asserted. |
| updateCompanySettings | `company_settings`; payload guarded by schemaPatch. | Invalid-column/ownership guard tested; all settings combinations not exercised live. |
| updateCustomer | `customers`; payload guarded by schemaPatch. | Invalid-column/ownership guard tested; every CRM edit not exercised live. |
| updateProduct | `products`; payload guarded by schemaPatch plus explicit location aliases. | Guard and existing inventory tests; all product forms not exercised live. |
| updateRank | `ranks`; payload guarded by schemaPatch. | Guard and existing HR tests. |
| collaboration write: message/recurrence/notice | Server-normalized collaboration_messages, collaboration_tasks and collaboration_notices payloads. | Existing collaboration tests and MySQL task test. Every RPC branch is not re-executed against production. |
| HR Excel snapshot | Fixed specs list: employees, users, work_locations, employee_location_assignments, attendance, orders, collaboration_projects, collaboration_tasks, leave_requests, workforce_movement_events, workforce_activity_events, tasks. | Existing Excel tests and real MySQL workbook test; no real email sent by this audit. |
| NEXUS snapshot | Fixed seven-table list in nexusIntelligenceService.snapshot. | Existing analytics tests; model hosting/configuration is separate from schema validation. |
| Leave deduction compatibility branch | Normalized leave_type rows in current schema; computed key only for old wide records. | Normalized approval/debit tests; legacy branch is deliberately conditional, not marked a live-column match. |
| SOS review | Only sos_events or original sos, selected by validated legacy prefix. | Both sources and cross-company denial tested against column contracts. |
| Workforce notice list/read | Only workforce_movement_notices and workforce_report_notices. | Existing movement/report tests. Feature flags control availability. |
| supervisorRecord | Table is selected by server callers, company/team checks follow lookup. | Existing supervisor monitoring tests. |

## Deployment limits

The observed schema is a read-only Supabase OpenAPI snapshot. There are four schedule database call sites requiring migration 017; the other identifiable direct contracts match the observation. Target schema mismatches cause `npm run audit:schema` to fail in CI. A fresh snapshot is needed after database changes; CI intentionally does not contact production or store service keys.

The browser-control runtime fails before opening any tab (`failed to write kernel assets`). Consequently this audit cannot apply Supabase SQL, submit a Hostinger upload, or verify the Hostinger browser interface. A GitHub merge or Vercel release does not update the separate manually uploaded Hostinger installation. Do not label those pending steps complete.

Real emergency broadcasts and real report emails were not generated as test traffic. No production staff, historical incidents, inventory or passwords were removed or reset.
