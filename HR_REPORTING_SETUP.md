# Daily HR and operations Excel reports

Open the HR overview or administrator command centre and find **HR reporting**.
Administrators and superadministrators can enable daily delivery and save up to 20 recipient addresses. The requested initial recipient is `hr@experiential-edge.com`. HR and executives can download reports. Each recipient receives a separate email, without exposing the other addresses.

## Sender setup

The receiving HR mailbox is not automatically a sending account. Use an SMTP account authorized to send mail for your business. No paid provider account is provisioned by this application.

### Gmail or Google Workspace

1. Sign in to the Google account that will send reports. Turn on **2-Step Verification** under [Google Account security](https://myaccount.google.com/security).
2. Open [App passwords](https://myaccount.google.com/apppasswords) and create one named **EdgeWForce**. If this option is unavailable, your Google Workspace administrator or account security policy may prohibit it; use an administrator-approved SMTP provider instead. Use the generated app password, not your normal Gmail password.
3. In **Vercel → edgeforce-server → Settings → Environment Variables**, add these to **Production**:

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `465` (TLS), or `587` (STARTTLS) |
| `SMTP_USER` | The full Gmail/Workspace sending email address |
| `SMTP_PASS` | The private 16-character Google app password |
| `EMAIL_FROM` | The same Gmail address, or an alias Google has authorized for this account |

4. Redeploy. In the administrator's **HR reporting** panel, choose **Verify sender connection**. This authenticates to SMTP without emailing anyone. It does not prove inbox delivery or authorize an arbitrary From alias.
5. Choose yesterday's date to test a report before 18:00 Lagos. Send to the saved authorized recipients, inspect per-recipient delivery history and check the receiving inbox/spam folder.

The Gmail address is the **sender**; the configured recipients may include `hr@experiential-edge.com` and other addresses. Gmail applies its own sending limits and account policies. Do not put app passwords in `.env.production.example`, GitHub, client `VITE_` variables, or chat. Gmail passwords containing Google's visual grouping spaces are normalized on the server. Changing your Google account password may revoke app passwords.

Official instructions: [Google app passwords](https://support.google.com/mail/answer/185833?hl=en), [Google SMTP settings](https://support.google.com/mail/answer/7104828?hl=en).

### Resend

1. Create/sign in to your Resend account. Add a domain you control and complete its DNS verification. Your domain administrator may need to add the records.
2. Create a sending API key restricted to the verified domain where possible.
3. In **Vercel → edgeforce-server → Settings → Environment Variables**, set these for **Production**:

| Variable | Value |
| --- | --- |
| `SMTP_HOST` | `smtp.resend.com` |
| `SMTP_PORT` | `465` |
| `SMTP_USER` | `resend` |
| `SMTP_PASS` | Your private Resend API key |
| `EMAIL_FROM` | A sender on your verified domain, for example `reports@experiential-edge.com` |

4. Redeploy the application so the new environment variables are loaded.
5. Save recipients in HR reporting, leave daily delivery enabled, and choose **Send to saved recipients**. Before 18:00 Lagos, choose yesterday to test sending; today's email is available only after clock-out closes. Live Excel previews can be downloaded anytime. Check delivery history and the receiving mailbox, including spam. An accepted SMTP message is not proof of inbox delivery.

Official instructions: [Resend SMTP](https://resend.com/changelog/smtp-service), [domain verification](https://resend.com/docs/dashboard/domains/introduction).

### Existing business mailbox

Ask your email administrator for the SMTP host, TLS port, username and an SMTP/app password. Use port 465 for TLS, or port 587 with STARTTLS. Put them in the same Vercel variables. `EMAIL_FROM` must be authorized by that provider. Store passwords only in Vercel, never in Git or chat.

## Scheduler

The deployed `vercel.json` registers `/api/cron/hr-daily-report` at `0 17 * * *` (UTC). This is daily after **18:00 Lagos time**. Vercel Hobby can invoke it anywhere within the 18:00–18:59 hour; exact timing requires a plan with finer scheduling precision. It runs on the server even when nobody has the app open.

Set a randomly generated `CRON_SECRET` of at least 32 characters in Production. Vercel sends it as a bearer authorization header. The endpoint rejects missing/incorrect secrets. Do not publish it. Verify the job in Vercel Settings → Cron Jobs after deployment.

[Vercel cron scheduling limits](https://vercel.com/docs/cron-jobs/usage-and-pricing) and [cron authentication](https://vercel.com/docs/cron-jobs/manage-cron-jobs).

## Workbook contents

- Overview: distinct staff/task counts and booked order value in NGN. Booked orders are not cash collections; cancelled/rejected orders are excluded from the overview.
- Attendance: employee name/code, assigned work locations, recorded sign-in location, morning and midday clock-ins, clock-out, status and hours. Times use Africa/Lagos. Missing records do not prove absence.
- Sales: dated orders, salesperson names, value, order/payment status.
- Incomplete tasks: every open shared task with project and person names, due time and overdue status. A shared task appears once per assignee but counts once in the overview. Unassigned tasks remain visible.
- Projects: owner and task completion totals.
- Leave requests: pending reviews and leave overlapping the report date. Private leave reasons are excluded.
- HR alerts: confirmed departures, application inactivity and unconfirmed connection gaps, with staff names and review status.
- Staff directives: open tasks from the existing HR assignment system, alongside collaboration tasks.

Attendance and sales are selected by report date. Open tasks, project status, leave reviews and assignments reflect records when the report is generated. Historical downloads do not reconstruct past task states. The first emailed snapshot for each company/date is retained for delivery consistency; downloads always use current records.

## Delivery controls and operations

The application fails visibly if SMTP is missing. It does not simulate a successful report email. View per-recipient status in the dashboard:

- **Accepted by email provider**: SMTP accepted the recipient/message. Check provider logs for delivery/bounces.
- **Failed**: definitive provider rejection. Correct the sender configuration and retry after five minutes.
- **Delivery unconfirmed**: a timeout or interrupted send may have occurred after acceptance. Check provider logs; automatic resending is suppressed to avoid duplicates. A database administrator can resolve an uncertain delivery only after checking the provider record.
- **Sending**: delivery is in progress. A send still pending after five minutes displays as unconfirmed.

Already accepted recipients are not sent another copy for the same company/date. New recipients can receive the saved snapshot. Concurrent jobs use database claims to prevent duplicate sends. Report attachments are limited to 15 MB; export reads are paginated and fail visibly above 50,000 source records per category. Reports and settings are restricted to authorized company users; service tables have RLS with no browser access. No public attachment URLs are created.

Install `supabase/migrations/015_hr_excel_delivery.sql` on an existing upgraded database before deploying. It only adds report storage/functions and an atomic, company-scoped leave review. Existing staff, auth accounts, projects and inventory remain intact. Annual/sick/casual approvals require an existing sufficient balance and cannot deduct twice.

Before launch verify: production readiness, a real admin login, download Excel, recipient settings, provider acceptance, inbox arrival, and Vercel scheduler logs. Private NEXUS AI explanations separately require a configured model host; factual reporting does not depend on that host.
