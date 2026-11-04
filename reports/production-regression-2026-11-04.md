# Production regression review — 4 November 2026

## Scope and evidence

Authenticated administrator probes covered 98 distinct GET endpoints on both existing deployments. Responses were inspected for HTTP errors, JSON contracts and explicit application errors; workforce records, access tokens and passwords are excluded from this report. Mutating routes and endpoints requiring record IDs are not certified by these probes. Successful empty responses do not establish complete workflow correctness.

| Deployment before repair | Successful endpoints | Expected personal-profile denials | Actual failures |
| --- | ---: | ---: | ---: |
| Hostinger temporary app | 93 | 2 | 3 |
| Vercel | 95 | 2 | 1 |

The expected denials are `/api/field/alerts` (403) and `/api/employee/profile` (404): the administrative account has no linked employee profile.

## Repairs

- Sales settlement listing and creation called undefined service methods. Implement both against the actual `settlements` columns; retain submitted references and notes in the audit trail, expose compatible UI fields, validate money and employee identity, and restrict reads to the authenticated company.
- Hostinger's older activity endpoints query nonexistent `employee_idle_sessions.detected_at`. The existing current-source repair reads actual timestamp fields; Hostinger needs the new archive to receive it.
- Staff deactivation sends `deactivated`, rejected by the database CHECK. Normalize it to `inactive`, suspend the linked login, validate statuses and enforce company ownership.
- Scheduling used a user ID as an employee ID when no profile existed. Require an active, linked company employee for self-service actions; allow authorized administrators to view their company roster without an employee record.
- Scope HR and supervisor schedule reads and notifications by company; supervisors see explicitly assigned team members. Use trusted authentication context rather than tenant IDs in query parameters.
- Match numeric task JSON IDs to URL strings, reject unknown tasks and invalid statuses instead of returning silent success.
- Record schedule audits against the actual actor and company.
- Scope executive totals and emergency alerts by company, use the Lagos date and exclude rejected/draft/cancelled sales from revenue.

## Hosting findings

Public DNS points the domain's nameservers at Hostinger, but the apex has no A record and `www` returns NXDOMAIN. Hostinger's own guide confirms `@ A 82.198.229.163` and `www CNAME edgewforce.com.ng`, TTL 300. Saving that A record fails in hPanel with **Domain not found**. The nameserver verification flow has been restarted. The existing website and mail records are backed up privately; no other domain's DNS has been changed.

Hostinger's temporary address is `https://mediumslateblue-opossum-721128.hostingersite.com`. It is a separate deployment from Vercel and does not automatically receive GitHub merges.

## Validation and limits

Targeted tests cover cross-company reads and writes, missing/inactive staff identity, task updates, deactivation/reactivation, settlement persistence/variance and executive totals. The full local suite passes; real MySQL/PostgreSQL checks run separately in CI. Static column auditing has zero missing references. These checks do not prove there are no bugs. Physical GPS movement, actual staff attendance, real payment-provider processing and emergency/email dispatch require separate controlled operational checks.
