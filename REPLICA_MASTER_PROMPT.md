# EdgeWForce — complete replica master prompt

This is a reconstructed specification of the implemented EdgeWForce application, prepared on 6 November 2026. The app evolved through many requests and code changes; there was no single original prompt that produced it. This document is a reusable build prompt, not a verbatim record of hidden instructions or an assurance that a prompt alone recreates software exactly.

For an exact replica, give the next engineer/AI this prompt **and the source repository or replica source ZIP**. Include `reports/replica-inventory.md`, `reports/replica-inventory.json`, `reports/application-schema-audit.md`, the schema/migrations and tests. The inventory records every parsed JavaScript function, every route declaration, router mounts, UI screens, target table/column definitions, SQL routine declarations and source-file hashes. The accompanying source supplies their complete bodies. A prose list or function name alone is not an implementation contract.

Copy the following instructions into the new coding task, with the repository/ZIP attached.

---

You are the lead engineer rebuilding EdgeWForce, an enterprise workforce, HR, field operations, sales and collaboration web application. Produce a real, integrated, deployable application from the attached implementation. Preserve its functioning modules and data contracts. Do not replace it with a landing page, disconnected dashboard mockups, a chatbot or a smaller subset of features.

## 1. Authority, scope and deliverables

1. Inspect the attached source before editing. Treat `reports/replica-inventory.json` and the full source as the exhaustive technical reference. Read the tests as executable behaviour specifications. The inventories are static coverage records, not proof that every runtime workflow has passed.
2. If starting from the original code, make changes on a development branch. If rebuilding on another stack, maintain a traceability matrix mapping every source module, endpoint, function, database routine and UI action to the replacement and its verification. Explicitly explain any intentional security correction or incompatible change. No silent omissions.
3. Preserve existing records and relationships. Never run cleanup/purge/seed scripts against a populated database. Historical scripts are references, not deployment instructions. Use additive, repeatable migrations and verified backups.
4. Deliver complete source, reproducible dependency lockfile, database installation and upgrade scripts, environment examples, deployment packages, operator instructions, feature matrix and verification results. Separate implemented, configured, tested and externally dependent capabilities.
5. This is a responsive web/PWA application. Preserve installable manifest/service-worker support and mobile layouts. Do not claim a native iOS/Android application exists unless separately implemented and tested.
6. Do not put live employee records, credentials, temporary staff passwords, server keys, SMTP passwords or browser sessions in the replica or public repository. Use a separate empty development tenant/database and synthetic test fixtures. Provision owner access securely; never seed a shared default production password.

## 2. Architecture and runtime

- Preserve the current npm workspace structure: React 19/Vite client, Tailwind CSS, Lucide icons, Leaflet maps; Node.js 22/24 Express API, ESM modules, controller/service/data-access layers. Root `server.js` and `app.cjs` support standalone hosting; Vercel has its own routing configuration. Consult `package-lock.json` for exact resolved dependencies rather than guessing versions.
- Keep `client/src/App.jsx` role-aware navigation and lazy dashboards, shared Shell/Sidebar/TopHeader/BottomNav, modal infrastructure, session synchronization, global alerts, error boundaries, dark/light theme, loading/empty/error states, and consistent API error handling.
- Retain Supabase PostgreSQL/Auth integration, MySQL standalone adapter, and isolated local transactional test/development store. Production must fail closed on missing/invalid database or JWT configuration. Never silently switch production to an ephemeral local store. Vercel uses Supabase; standalone Hostinger can use a verified MySQL installation when explicitly configured and migrated.
- Retain same-origin `/api` support, configured CORS, Helmet/CSP, request-size limits, rate limiting, upload validation, static content/cache handling, serverless restrictions, liveness/readiness endpoints and structured errors. Do not disable security globally to make maps or sign-in work.
- Preserve integer relational primary/foreign keys. Canonical employee numbers are text business identifiers. Do not introduce BigInt employee IDs or convert existing integer relationships.
- Retain the canonical/legacy schema-layout adapter and aliases used by existing installations. Use `reports/observed-schema.json` as an observed schema contract snapshot and `server/src/config/mysqlSchema.json` as the MySQL target contract, not as exports of employee data. Respect defaults, nullability, checks, uniqueness, indices and all migration-defined SQL routines/RLS/grants.

## 3. Identity, roles and account administration

- Implement email, normalized registered phone and exact case-insensitive staff-ID login. Canonical IDs must never match by numeric suffix. Ambiguous legacy matches must fail safely and suggest email/phone. A retired corrected ID must not resolve to an account.
- Preserve Supabase Auth identity linking, local/MySQL bcrypt authentication, JWT validation, token refresh synchronization, `/auth/me`, explicit logout, first-login password change, password recovery/reset, authenticated password changes and logout/session invalidation behaviour. Keep user IDs and employee IDs distinct.
- Preserve server-side company/resource ownership and least-privilege checks. Dashboard visibility alone is insufficient authorization. Route-level RBAC and service/database-level checks must agree.
- Preserve role/rank vocabulary and source permission rules: SUPER_ADMIN, ADMIN, IT_ADMIN, CEO, CTO, HR, HR_MANAGER, MANAGER, SUPERVISOR, ACCOUNTANT, SENIOR_ACCOUNTANT, SALES_AGENT, FIELD_AGENT, BRAND_AMBASSADOR, PROMOTER, STAFF_MEMBER, EMPLOYEE and any persisted ranks. Do not grant every role administrator privileges.
- Admin/IT account-access tools list authorized company accounts, reset staff/account passwords through the intended protected API, preserve unrelated accounts, record audit entries and require first-login changes where applicable. Provision separate administrators instead of replacing an existing owner.
- Preserve company onboarding, company settings/modules, branch/region/territory/team/warehouse structure, ranks, hierarchy reassignment, organizational tree and audit-log visibility. Never hardcode an email address as the only security boundary.

## 4. Staff master data and imports

- HR directory: search, department/status/review filters, headcount/active/onboarding/review statistics, profile drawer, privileged profile editing, sensitive field redaction for ordinary colleagues, attendance/leave/task/payroll history, status changes and invitation resend.
- Preserve personal/contact fields, work/personal email, phone, birth date, marital/nationality/address/state/LGA information, employment dates, department/job title/rank, supervisor, work-location assignments, emergency contacts, blood group, bank/account details, salary/allowances and review flags. Use the source schema for the exact field set and authorized edit rules.
- Excel/CSV staff import must provide a downloadable template, validate/preview rows, normalize dates and phones, match existing records without guessing identity, update authorized matches, add new profiles when requested, preserve original references privately, handle duplicates/orphaned auth identities, produce clear per-row failures and allow a private one-time first-login credential download. Never publish a staff credential workbook.
- Registration must initialize normalized leave balances with their real column names. Do not insert obsolete `annual`/`sick` convenience fields into a normalized balance table. All API payloads must match the deployed schema cache.
- No invented hiring dates, department assignments, workplace coordinates, attendance or employee records. Flag contradictions for HR. A source hiring date earlier than birth date blocks number issuance until corrected.

## 5. Employee numbering, corrections and removal

- Format `[DEPT-CODE][YYYY][SEQUENCE]`, without separators. Codes: Finance FIN; Human Resources HR; IT IT; Sales & Marketing SM; Operations OPS; Strategy STG; Creative CRE; Compliance CMP; Procurement PUR; Executive EXE.
- The year is the actual saved hiring year. Prefer explicit date of joining to an automatically populated hire date. The sequence is four digits `0001`–`9999`, independently counted per department/year, carrying no rank, gender, pay, performance, phone or platform meaning. Empty-counter examples for 2026: IT20260001, IT20260002, IT20260003; FIN20260001, FIN20260002.
- Allocate atomically, retain a permanent global reservation registry and use unique constraints. Concurrent registrations/corrections cannot collide. Capacity overflow fails explicitly; do not wrap, extend digit count, reset counters or fill historical gaps. Both `employee_code` and `staff_id` show the canonical number while relational integer keys remain unchanged.
- Transfers, leavers and restores retain their number. Legacy imported/VERIFY/phone-shaped IDs are private reconciliation values, not new canonical identifiers.
- HR may preview pending profiles and issue numbers to valid profiles; unknown department labels require an approved explicit numbering code. Bad dates remain pending rather than being fabricated.
- **Super Admin correction:** only a persisted, active SUPER_ADMIN in the employee's company may use `PUT /api/hr/employees/:id/number`. Require a canonical unused new ID, matching saved hiring year, a 10–500 character correction reason and confirmation of the current ID. Reject stale confirmation, active/reserved/retired collisions and removed records. Update both display IDs and numbering metadata atomically; advance the counter; retain the old reservation; audit old/new numbers, reason and actor. Roll back all changes if audit or any write fails. Preserve account/password, employee integer key, attendance, tasks and payroll links. The new ID works for login; the retired ID does not. Ordinary profile updates must still reject ID changes.
- UI: HR staff directory → profile → Edit staff → Super Admin Staff ID correction. Keep ordinary ID fields read-only; show the correction action only to SUPER_ADMIN. Save source-date corrections before renumbering; do not silently discard unsaved edits.
- **Delete staff:** recoverable removal, with reason and exact current ID confirmation; disable login, invalidate sessions and revoke active workplace sessions. Retain attendance/payroll/project/task/history and permanent reservations. Removed staff view supports restore, preserving the number; account access remains inactive until explicitly reactivated. Block self-removal and removal of the last active administrator. Privileged administrator/CEO targets require Super Admin authority. Audit removal and restoration.

## 6. Workplace assignments, GPS and attendance

- Real work-location creation/editing requires an actual pin, GPS capture or explicit latitude/longitude; do not grant attendance from a display label alone. Support valid coordinates, radius, active status and workplace metadata.
- HR can assign any authorized employee to a primary workplace, replace the primary assignment, add secondary/temporary assignments, set their validity and inspect assignment history. Enforce active effective assignments at the time of attendance, not stale browser snapshots.
- Staff readiness/Check my workstation reads permitted assignments and GPS proximity without writing attendance. Refresh assignment status while signed in, on focus and reconnection so a newly assigned employee can proceed.
- Authoritative timezone is Africa/Lagos. Preserve source-defined boundary semantics and tests for morning 08:00–09:00; late 09:00–10:00; midday 12:00–13:00; evening clock-out 17:00–18:00. Reject closed windows. Record morning/late/midday/out appropriately, prevent duplicate writes and handle supervisors' audited exception overrides.
- Clock requests require an actual active employee profile, active linked account, an effective assigned location, usable GPS/accuracy and server-side distance/window verification. Do not trust client-supplied time, role, employee identity or a cached success. No workstation/GPS bypass to make a test pass.
- Preserve shift toggle/current-shift/window status, staff attendance history, HR attendance lists and supervisor attendance exceptions. Biometric verification UI/adapters must report provider-unavailable honestly; a fake/local image check is not certified identity verification.

## 7. Leaflet maps, field force and emergency operations

- Preserve reported GPS locations, live/radar/team map views, store/workplace pins, configured workplace boundaries and 300-metre market circles. Keep Leaflet CSS/assets, valid marker coordinates, tile loading/error detection, allowed CSP tile/image origins, retry/help messages and map resizing inside tabs/modals. Credit the configured map provider. Do not label tile loading as live GPS health.
- Handle denied/missing GPS, poor accuracy, lost connection, empty datasets and stale positions visibly. Geocoding is a separate provider-backed operation and may fail; provide manual coordinates/pinning rather than false success.
- Field dashboard includes route manifest, own alerts, current shift, attendance, location ping/history/geolocation report, store directory, photographed store requests and authorized approve/reject review, visit start/check-in/completion, photo/signature evidence, field and sales activity logs, own SOS and reports.
- Supervisor command centre includes team metrics/table, employee profile/timeline, location history, live map, alerts and resolution, schedules/reviews, store requests, attendance override, exports and daily team/EOD summary. Apply team/company restrictions to drilldowns and direct IDs.
- SOS panic beacon captures actual emergency coordinates, accuracy and details, persists to the correct SOS schema and alerts authorized company supervisors/HR/operations managers. Staff can read their own SOS; acknowledgement/resolution requires management. Never trigger a real production emergency just to test the form.
- Preserve supervisor alert deduplication, locations and source timestamps. Browser GPS reports are not proof of a person's presence; show confidence/connection context.

## 8. Location-gated sessions and movement reporting

- Retain workplace-access sessions, assigned-location sign-in checks, market membership, confirmed-departure reports, HR/admin notices and server-side revocation. Use migration/activation flags intentionally and document their current state.
- A configured 300m market departure must create the source-defined movement evidence/report, notify the authorized managers, revoke server access and clear the staff client session. Re-entry requires returning to an effective permitted location and signing in again. Avoid a single inaccurate fix causing a false departure; preserve source accuracy/confirmation rules.
- Keep browser suspension, offline gaps, closed apps and GPS limitations explicit. A web page cannot guarantee continuous OS-level tracking in the background. Loss of telemetry is not a verified physical departure. Do not invent tracking when browsers stop reporting.

## 9. Staff self-service and HR management

- Employee dashboard/profile/directory, attendance and workstation checks, own tasks, schedules, OKRs, leave balances/requests, latest and historical payslips, announcements, birthdays and emergency access.
- Leave: normalized employee/year/type entitlements, used/remaining balance calculations, request date/type/day validation, authorized approval/rejection with notes, atomic single debit, safe repeat-request handling and audit. Never double-debit on concurrent reviews.
- Payroll/accounting: finance overview, payroll generation, single payslip generation, authorized PDF payslip upload, employee payslip access and settlements review; preserve salary/allowance and deduction calculations from the source. Treat pay records as sensitive. Do not invent statutory tax compliance beyond implemented rules.
- HR: ranks/hierarchy, staff profile and employment edits, join/birth milestones, birthday lists/wishes/company broadcasts, announcement create/edit/delete, leave/SOS/idle review queues, roster oversight, task assignment and audit logs. Match the source's permission and redaction rules.
- OKRs: employee objective/key-result views and authorized progress updates. Preserve data validation/ownership.

## 10. Scheduling and individual tasks

- Staff daily schedules: current/today/history, draft/submit/update/delete as permitted, nested task state updates, titles/employee/department details and recorded Lagos timestamps. Supervisor approval and HR acknowledgement are separate review states. Validate legal status transitions against both database checks and API rules.
- Individual task engine: authorized assignable colleagues/hierarchy, create/list/filter/analytics, assignment acknowledgement, completion, delivery-stage updates, scheduled reminders and delivery history/logs. Preserve Today Task Centre and daily reminder prompts.
- Reminders/worker: due selection, channels, retries/delivery states, duplicate prevention, protected worker cycle and appropriate standalone versus serverless scheduling. Email/WhatsApp/push adapters require actual provider configuration; failures must remain observable.

## 11. Projects and team collaboration

- All existing roles may open Projects & team chat, but only authorized project members may read/write a project. Project creators own it; owners manage membership and appoint leads; leads have source-defined member/channel privileges. Prevent cross-company membership and access through guessed IDs.
- Shared projects: title/description/colour/status, active company-member picker, project membership/roles, authorized project updates and archive behaviour where implemented.
- Project channels and messages, threaded replies, mentions with private recipient notifications, pagination/load older messages, loaded-channel text search, per-tab drafts and polling/synchronization/error states. Render safe plain text; do not promise end-to-end encryption.
- Shared task board: To do, In progress, In review and Done; one or multiple assignees; priority; planned start, due time, reminders; task edit/status changes; project activity with actor/time. Ensure assignees are eligible project members.
- Daily/weekly recurring project tasks create exactly one next occurrence after completion, skip missed intervals, and remain safe under simultaneous completion requests. Preserve atomic SQL RPCs, reminder delivery deduplication and member visibility.
- Project inbox + global notification bell, personal read state, assignment/mention/reminder notices. Scheduler functions must run while users close the browser; do not rely solely on browser timers.

## 12. Sales, customers, inventory and logistics

- Commercial sales: product catalogue, authorized product creation/deletion, customer list/create, own sales reports, orders/list/detail workflow, supervisory approve/reject/request-changes, funnel, payments/collections, configured Paystack adapter, competitor-intelligence capture with photos, settlements with bank-slip upload and settlement history/review. Preserve role guards, including separation of FIELD_AGENT from commercial sales.
- Customer 360: list/search/detail/edit, geocoding/location update, visits/orders/payment/activity context and a usable map where valid locations exist. Never expose another company's customer through a direct ID.
- Inventory: products list/detail/create/edit/delete with source permissions, quantity/price/catalogue metadata, warehouse list, stock movement/restocking records, inventory summary and low-stock visibility. Preserve field/sales/promoter inventory restrictions and atomic quantity validation.
- Delivery/logistics: delivery list/detail and metrics, authorized order dispatch, proof of delivery photo/confirmation, failed-delivery recording and task/delivery-stage integration. Retain statuses, timestamps and actor ownership.
- Accounting/executive dashboards must reconcile underlying sales/settlement/payroll values and use actual records; empty data remains an honest empty state rather than fabricated performance.

## 13. Reporting, email, notifications and exports

- Preserve operational report catalogue, authorized filters and downloads in all implemented formats. Retain report-specific calculations, company/team scoping, personal versus privileged data redaction, filenames and errors. Reports include source-defined sales, attendance, staff, leave, payroll, tasks, projects, schedules, inventory, deliveries, SOS, movement and activity sections.
- Daily HR Excel workbook: sales, named attendance/clock records with assigned/reported location, incomplete/overdue tasks by person and collaboration project, plus all implemented report sheets. Follow `hrDailyReportService` and `operationalReportService` for exact fields/calculations. Generate a real `.xlsx` file through ExcelJS, not a renamed CSV.
- Administrator-configurable multiple recipient addresses, validation/deduplication, enabled state/schedule/settings, manual preview/download/send, delivery/run history, per-recipient delivery state and idempotent scheduled runs. The original requested default is `hr@experiential-edge.com`; configure it per tenant, not as an unchangeable code recipient.
- Preserve authenticated cron route with constant-time bearer validation, scheduler setup scripts, retry/uncertain-delivery handling and daily factual report generation. A scheduled SMTP attempt is not proof of recipient inbox delivery.
- Gmail SMTP is supported through private environment configuration: host/port/security, user, app password and sender. Never embed credentials or reuse a password pasted into a previous chat. Validate sender credentials privately and provide setup instructions when the account/provider is unavailable.
- Notification centre: lists, individual/all read state, personal recipient scoping, assignment/reminder/mention/HR/market/SOS notices; email, WhatsApp and browser-push integrations as implemented. Preserve aliases used by clients, push registration and provider configuration diagnostics.

## 14. App activity and executive factual reports

- Authenticated active employees report app interaction counts at the source interval (approximately 30 seconds). Collect activity timestamps/counts, not typed content, screenshots, OS applications or keylogging.
- At 600 seconds without observed app interaction, record/deduplicate an inactivity period and notify same-company HR/HR_MANAGER; source-defined active admin fallback applies when no HR recipient exists. Supabase scheduler scans independently of browser timers.
- Distinguish observed app inactivity, resumed activity and an unconfirmed connection gap. Activity across tabs counts; explicit sign-out stops monitoring. A closed browser without logout can create a connection-gap flag. Flags require human review; they do not prove work stopped.
- Staff may explain their own events. HR/authorized managers can view, acknowledge/review and retain history, reasons and Lagos times. Preserve server authorization for telemetry, review and worker routes.
- Executive factual summaries aggregate attendance, lateness, movement, app activity and shared tasks with evidence links. Preserve the existing optional provider adapter separately from private NEXUS. If no AI provider is configured, show factual summaries honestly; no invented AI analysis.

## 15. NEXUS Intelligence Centre

- Embed NEXUS into the existing authenticated app, scoped to authorized company leadership/HR/IT roles. Keep overview and investigation endpoints protected and rate-limited.
- Data/analytics engine uses fixed, company-scoped source queries and deterministic calculations. Retain 7/30-day comparisons, daily trends, attendance/late rates, scheduled-visit cohorts, order values, shared-task completion, departures, connectivity gaps and review signals, using exact metric definitions in the source.
- Evidence must carry stable IDs, sources, date windows, calculations, counts/denominators and limitations. Empty denominators do not become zero percent. No demonstration KPIs, invented targets, causal certainty or automated employment decisions.
- Private model adapters support Ollama and vLLM; the attached Docker/gateway/Caddy setup is a separately hosted inference service. Preserve HTTPS, bearer authentication, model allowlist, request/body limits, timeouts and no prompt/evidence logging. Never expose a raw model port publicly.
- Send only the question and approved aggregate evidence to the configured private model. Exclude raw staff names/GPS/passwords/HR explanations. User-entered questions may contain data; communicate that boundary.
- Validate structured output, known evidence citations, output limits and uncertainty. Preserve numerical-prose/reference checks and fail back to deterministic analytics on invalid/timeout/provider-unavailable responses. These checks do not prove a hypothesis true.
- Keep question hashes rather than raw questions in stored investigations, evidence hashes/snapshots, model identifier, initiating user/company/timestamp, cache invalidation when evidence changes and cross-instance generation throttling (source default one attempt/company/minute, provider timeout 20 seconds).
- Private AI hosting is separately configured infrastructure with its own costs and evaluation needs. Analytics must remain useful without a model. Do not require an OpenAI account for NEXUS or claim an unconfigured model is deployed.

## 16. UX, resilience and deployment

- Retain the orange/dark brand, company logo/assets, readable type, clear visual hierarchy, modern responsive cards/tables/forms, consistent spacing, keyboard-accessible controls, labels/focus states and light-theme contrast. Appeal across age groups through clarity, not decorative animation. Test desktop and narrow mobile layouts, long names, scrollable tables, modals, errors and empty datasets.
- Every actionable UI control needs a real endpoint, authorization, validation, loading/disabled state, error feedback and refresh after success. No fake success toasts for blocked/offline writes. Preserve safe offline identity boundaries and do not replay work under a different account.
- Retain PWA installation, service-worker update/cache behaviour, uploaded proof files/storage adapters and public/private asset boundaries. A cached page must not conceal a failed API or outdated deployment.
- Preserve Hostinger Node deployment and Vercel serverless support. Use the correct source package/build command (`npm run build`) for Hostinger Node hosting; a cPanel runtime-only archive is a different artifact. cPanel needs an actual Node-capable runtime, not static HTML hosting for Express APIs.
- For MySQL adoption, copy records to a separate database, verify counts/keys/files/constraints and test before switching `DATA_BACKEND`. Preserve the Supabase source and Vercel configuration unless explicitly authorized otherwise. Configuration support is not evidence that the production cutover happened.
- Keep `.env.example`, `.env.production.example` and setup guides; inject private production values through the hosting provider. Only approved public `VITE_*` values go into browser builds. Scan release archives and compiled assets for private credentials.
- Install schema, grant/RLS policies, refresh PostgREST schema cache, enable required schedulers/flags and verify readiness before launch. The UI is not ready because it builds alone.

## 17. Required verification and handover

1. Run `npm ci`, `npm run audit:schema`, `npm test`, `npm run build`, packaging checks and dependency security checks appropriate to the pinned runtime. Run existing Node 22/24 CI plus real PostgreSQL and MySQL integration jobs. Do not relabel a skipped/local/mock test as a live database check.
2. Test identity isolation, inactive/deleted user denial, exact staff ID login, unchanged password after correction, stale/collision/concurrent correction rejection, audit rollback, counter advancement, old-ID reservation and restoration.
3. Test actual workplace assignment visibility, valid and out-of-range GPS, denied/poor-accuracy GPS, every attendance window boundary, duplicate clock requests, movement revocation/re-entry and a suspended-browser connection gap. Do not falsify workplace coordinates or staff attendance for a passing result.
4. Test leave single-debit/concurrent review, import updates/new records, payroll ownership, schedule supervisor/HR review, two independent project members exchanging messages/tasks and a nonmember denial, recurring/reminder deduplication and recipient read state.
5. Generate and open a real Excel report; verify named staff/project/location rows and totals against its source; verify multiple-recipient settings and delivery history. Send a production email only when explicitly authorized for that recipient/purpose. Treat SMTP acceptance and inbox delivery separately.
6. Test map tiles/markers/boundaries/fallback messages, protected SOS persistence using disposable synthetic fixtures, customer/order/inventory/delivery state transitions and cross-company direct-ID denial.
7. Test NEXUS with missing provider, malformed provider output and a configured private host using evaluation fixtures. Verify numerical/evidence consistency and uncertainty. Never substitute a chatbot response for deterministic business calculations.
8. Run a source-to-replica traceability check: every inventory file/function/route/schema routine/table/UI screen is implemented, intentionally replaced with an explanation or explicitly incomplete. Report remaining provider/environment/data blockers; do not assert perfection or "all working" without corresponding evidence.
9. Deploy to a preview first, review the exact diff, then the authorized production targets. Verify the deployed build identifier/asset changes, readiness, login and the affected workflows. Keep a rollback artifact and backups; do not overwrite original records to make the replica look populated.

Start by reading the reference repository and inventories, then implement and verify the complete application. Continue through integration and the authorized deployment. Ask only for genuinely missing decisions, private configuration or required owner-only actions; never invent missing facts.

---

## Reference package and completeness boundary

- `reports/replica-inventory.md` and `.json`: generated complete source-function/module/route/schema/routine map and hashes. Router mounts are separate from declared relative paths; combine them to obtain public URLs. Preserve aliases.
- `reports/application-schema-audit.md`, `.json`, `.csv`: complete static application function/DAL cross-reference with explicit dynamic-review status. Static matches are not end-to-end certification.
- `server/src`, `client/src`, `client/public`, `supabase`, `deploy`, root runtime/configuration and `.github/workflows`: actual implementation, assets, migrations and tests. These are essential to exact behaviour beyond prose.
- `FEATURES.md`, `EMPLOYEE_NUMBERING.md`, `PRODUCTION_SETUP.md`, `CPANEL_SETUP.md`, `MYSQL_SETUP.md`, `HR_REPORTING_SETUP.md`, `MAPS_SETUP.md`, `NEXUS_SETUP.md`, `RELEASE_VERIFICATION.md`: operator and module detail. Historical verification documents describe their stated release; rerun checks for your replica.
- No live employee/customer/payroll database export or production secret is part of the replica kit. Do not infer that provider adapters, feature flags or a historical verification document certify current external-provider health.
- The separate `edgedirect2u.com` commerce/receipt application is another repository and is not represented as an EdgeWForce feature in this prompt.
