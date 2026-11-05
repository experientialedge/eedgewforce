# Live website verification — 5 November 2026

Custom domain: https://edgewforce.com.ng. This report contains endpoint status and configuration evidence, not workforce records or secrets.

## Deployment and connectivity

- Hostinger release uploaded 4 November at 12:50 is marked Completed / Current in hPanel. Vercel release d962819 is also live.
- The apex and www now resolve through Hostinger. HTTPS returns the application. The separate administrator successfully signed in through the custom-domain browser.
- Initial API network failures were retried successfully. Of 98 distinct GET routes, 91 returned successful JSON and seven correctly denied personal staff operations because this administrator has no linked employee profile. No checked endpoint returned a server error.
- Settlement listing, activity analytics, idle reports, HR schedules, supervisor schedules and database readiness all return successful responses.

## Additional provider safeguards

- The old Paystack endpoint trusted a reference and amount supplied by a browser and could mark an unpaid order paid. Reject online reconciliation with 503 and no database writes until server verification, order binding, webhook verification and atomic replay protection are installed. A secret key alone does not enable this endpoint. Existing reviewed cash/bank collection workflows remain available.
- Simulated reminder email is logged as not_configured. A reminder is marked sent only when a channel accepted it. Total delivery failure is visible as failed, with no sent timestamp.
- The facial-verification screen explains the missing provider without opening the camera or inventing a score. It returns staff to GPS attendance. The production API already rejects unconfigured facial recognition.

## Automated verification and limits

262 local tests pass, one real-MySQL test is skipped locally and covered by CI. Provider regression tests verify no fake payment/debt changes, honest simulated-email status and working provider/in-app acceptance. Previous workstation integration tests cover linked sign-in, live assignment, GPS preflight, duplicate clock prevention, midday attendance, evening clock-out and inactive staff rejection. These use isolated fixture data; physical GPS accuracy and real staff movement still require on-site acceptance.

The private NEXUS model server, WhatsApp, browser push, biometric recognition and online Paystack reconciliation are not certified as configured. Factual intelligence and in-app collaboration are separate supported paths. Hostinger still uses the configured Supabase backend; the MySQL data copy has not been activated. A copied database is not continuous synchronization.

## Every checked GET route

| Route | HTTP | Result |
| --- | ---: | --- |
| /api/health | 200 | Successful JSON |
| /api/health/ready | 200 | Successful JSON |
| /api/auth/me | 200 | Successful JSON |
| /api/nexus/overview | 200 | Successful JSON |
| /api/sales/my-report | 200 | Successful JSON |
| /api/sales/customers | 200 | Successful JSON |
| /api/sales/products | 200 | Successful JSON |
| /api/sales/orders | 200 | Successful JSON |
| /api/sales/funnel | 200 | Successful JSON |
| /api/sales/payments | 200 | Successful JSON |
| /api/sales/competitor-intel | 200 | Successful JSON |
| /api/sales/settlements | 200 | Successful JSON |
| /api/field/route-manifest | 200 | Successful JSON |
| /api/field/alerts | 403 | A linked staff profile is required to view personal field alerts. |
| /api/field/shifts/current | 200 | Successful JSON |
| /api/field/shifts/window-status | 200 | Successful JSON |
| /api/field/geolocation-report | 200 | Successful JSON |
| /api/field/location-history | 200 | Successful JSON |
| /api/field/stores | 200 | Successful JSON |
| /api/field/store-requests | 200 | Successful JSON |
| /api/field/sos | 200 | Successful JSON |
| /api/field/supervisor/metrics | 200 | Successful JSON |
| /api/field/supervisor/team | 200 | Successful JSON |
| /api/field/supervisor/alerts | 200 | Successful JSON |
| /api/field/reports | 200 | Successful JSON |
| /api/employee/dashboard | 200 | Successful JSON |
| /api/employee/profile | 404 | Employee profile not found |
| /api/employee/directory | 200 | Successful JSON |
| /api/employee/colleagues | 200 | Successful JSON |
| /api/employee/attendance | 200 | Successful JSON |
| /api/employee/leave/balances | 200 | Successful JSON |
| /api/employee/leave/requests | 200 | Successful JSON |
| /api/employee/payslips/latest | 200 | Successful JSON |
| /api/employee/payslips | 200 | Successful JSON |
| /api/employee/okrs | 200 | Successful JSON |
| /api/employee/tasks | 200 | Successful JSON |
| /api/employee/announcements | 200 | Successful JSON |
| /api/employee/birthdays | 200 | Successful JSON |
| /api/employee/schedule | 400 | An active linked employee profile is required. |
| /api/employee/schedule/today | 400 | An active linked employee profile is required. |
| /api/hr/employees | 200 | Successful JSON |
| /api/hr/ranks | 200 | Successful JSON |
| /api/hr/announcements | 200 | Successful JSON |
| /api/hr/birthdays | 200 | Successful JSON |
| /api/hr/organization | 200 | Successful JSON |
| /api/hr/dashboard | 200 | Successful JSON |
| /api/hr/audit-logs | 200 | Successful JSON |
| /api/hr/attendance | 200 | Successful JSON |
| /api/hr/idle-events | 200 | Successful JSON |
| /api/hr/leave | 200 | Successful JSON |
| /api/hr/tasks | 200 | Successful JSON |
| /api/hr/sos | 200 | Successful JSON |
| /api/hr/schedules | 200 | Successful JSON |
| /api/accounting/overview | 200 | Successful JSON |
| /api/accounting/payslips | 200 | Successful JSON |
| /api/executive/dashboard | 200 | Successful JSON |
| /api/notifications | 200 | Successful JSON |
| /api/notifications/list | 200 | Successful JSON |
| /api/notifications/notifications | 200 | Successful JSON |
| /api/push | 200 | Successful JSON |
| /api/push/list | 200 | Successful JSON |
| /api/push/notifications | 200 | Successful JSON |
| /api/workforce/employees | 200 | Successful JSON |
| /api/workforce/staff | 200 | Successful JSON |
| /api/workforce/schedules | 200 | Successful JSON |
| /api/workforce/ranks | 200 | Successful JSON |
| /api/workforce/announcements | 200 | Successful JSON |
| /api/workforce/holidays | 200 | Successful JSON |
| /api/workforce/notifications | 200 | Successful JSON |
| /api/admin/companies | 200 | Successful JSON |
| /api/admin/settings | 200 | Successful JSON |
| /api/admin/access-accounts | 200 | Successful JSON |
| /api/admin/structure | 200 | Successful JSON |
| /api/admin/audit-logs | 200 | Successful JSON |
| /api/inventory/products | 200 | Successful JSON |
| /api/inventory/movements | 200 | Successful JSON |
| /api/inventory/warehouses | 200 | Successful JSON |
| /api/delivery | 200 | Successful JSON |
| /api/delivery/metrics | 200 | Successful JSON |
| /api/customers | 200 | Successful JSON |
| /api/customers/geocode | 200 | Successful JSON |
| /api/tasks/assignable-employees | 200 | Successful JSON |
| /api/tasks | 200 | Successful JSON |
| /api/tasks/analytics | 200 | Successful JSON |
| /api/tasks/delivery-logs | 200 | Successful JSON |
| /api/tasks/idle/reports | 200 | Successful JSON |
| /api/locations | 200 | Successful JSON |
| /api/work-locations | 200 | Successful JSON |
| /api/schedules | 400 | An active linked employee profile is required. |
| /api/schedules/mine | 400 | An active linked employee profile is required. |
| /api/schedules/today | 400 | An active linked employee profile is required. |
| /api/schedules/supervisor | 200 | Successful JSON |
| /api/schedules/hr | 200 | Successful JSON |
| /api/collaboration/people | 200 | Successful JSON |
| /api/collaboration/overview | 200 | Successful JSON |
| /api/activity/reports | 200 | Successful JSON |
| /api/executive-reports/today | 200 | Successful JSON |
| /api/hr-reports/settings | 200 | Successful JSON |

Successful GET requests do not certify mutations, record-specific endpoints, external delivery or the absence of bugs.
