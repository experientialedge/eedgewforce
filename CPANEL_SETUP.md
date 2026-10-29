# EdgeWForce on WhoGoHost / GO54 cPanel

EdgeWForce is a responsive browser website. Staff open an HTTPS address on a phone or computer; installing an app is optional. This package runs the existing React website and Express API on the same domain, using the existing Supabase database and storage. It does not convert the backend to PHP or MySQL.

## Confirm the plan before paying

Ask support this question:

> Does this exact plan include cPanel Setup Node.js App / Passenger, Node.js 22.16+ or 24, npm dependency installation, cron jobs every minute, HTTPS, outbound HTTPS to Supabase, and authenticated outbound SMTP on port 465 or 587? What memory, CPU, concurrent-process and request-duration limits apply? Can the application root be outside public_html?

GO54's current JavaScript hosting page advertises DirectAdmin, while its knowledge base also documents cPanel's Node.js selector. Confirm the panel and features of the specific product, rather than relying on the product name. A PHP-only plan cannot run this whole application. If cPanel is essential and the shared plan lacks Node.js, request a suitable managed VPS with cPanel and Node.js enabled. No hosting purchase is made by the deployment scripts.

Official references checked 29 October 2026:

- [WhoGoHost: Setup Node.js App in cPanel](https://www.whogohost.com/host/index.php?rp=%2Fknowledgebase%2F731%2FHow-to-setup-nodejs-app-in-the-cpanel.html)
- [GO54 JavaScript hosting](https://go54.com/javascript-hosting)
- [cPanel Node.js installation](https://docs.cpanel.net/knowledge-base/web-services/how-to-install-a-node.js-application/)

## Prepare the upload

From the source repository, use Node.js 22.16+ or 24 and run:

```sh
npm ci --include=dev --include=optional
npm test
npm run build
npm run package:cpanel
```

For this single-domain deployment, leave `VITE_API_URL` unset or set it to `/api` at build time. If using browser Supabase authentication, set the public `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` before building. Browser values are compiled into the assets; changing cPanel environment variables does not update them. Never put a service-role key, Gmail password or JWT secret in any `VITE_` variable.

The output is `release/edgewforce-cpanel.zip`. It includes the prebuilt website and server with a separate production-only package manifest and lockfile. It omits Windows node_modules, test users, operational data, real environment files and private credentials. The host installs the runtime dependencies; it does not need to compile the React website. The source remains in GitHub for future changes.

## Install on cPanel

1. Create a domain or subdomain such as `workforce.yourdomain.com` and enable its SSL certificate. Use the domain root `/`; this build is not configured for a subdirectory such as `/edgewforce/`.
2. Extract the ZIP inside a private application root such as `/home/CPANEL_USER/edgewforce`, outside `public_html`. Do not expose the repository or `.env` as the domain's static document root. Let the Node.js manager route the domain to the application.
3. Open **Software → Setup Node.js App → Create Application**. Select **Node.js 24** (or **22.16+**), **Production**, application root `edgewforce`, your domain, and startup file **`app.cjs`**. This CommonJS launcher loads the existing ES module server.
4. Run **NPM Install**. From a terminal with the panel's displayed virtual environment activated, `npm ci --omit=dev` installs the exact bundled lockfile. Do not upload your local node_modules or run Vite on each web request.
5. Store configuration in the Node.js app's environment fields, or copy the packaged `.env.example` to `.env` in the private application root. Use the current production Supabase URL, server key, signing secret, feature flags and Gmail app password. Set `CLIENT_URL` to the exact HTTPS website origin. Keep the existing `SUPABASE_SCHEMA_LAYOUT` value; do not change the database layout during this hosting move. Restrict `.env` to the account owner (`chmod 600 .env`).
6. Configure `TRUST_PROXY_HOPS` to match the host's reverse-proxy chain; ask support. The template uses one hop. Configure `REMINDER_WORKER_ENABLED=false` and install the reminder cron below so process sleeping or multiple Passenger workers cannot determine reminder timing.
7. Run `npm run preflight`. It reports configuration checks without printing credentials. These checks do not authenticate SMTP or prove network connectivity.
8. Restart the app from the Node.js manager. Keep Vercel available until this host passes the launch checks below.

The newer cPanel Meridian interface may call this feature **Websites & Apps**. Select a server app and use startup command `node app.cjs`; the ZIP already contains the browser build. DirectAdmin's Node.js selector can use the same private application root, startup file and production dependencies, but its screen names differ.

## Database, login and uploaded files

Keep Supabase project `kfvtgqigidgazmbfsfuc` and its existing records. Do not run seed, purge, initial-install or cleanup scripts against the live database for this migration. Add the new HTTPS domain to Supabase Authentication's Site URL / allowed redirect URLs as appropriate, retaining any Vercel callback URLs needed during the transition. Existing user accounts remain in Supabase; browsers may require a fresh sign-in on the new domain.

Photos, receipts and imports continue using the configured Supabase storage bucket. Back up the database separately from the website ZIP. A website ZIP does not back up live database contents.

## Scheduled work

Existing Supabase database jobs continue operating independently of the website host: collaboration reminders, activity monitoring, and the executive factual report. Inspect their latest results in Supabase; do not create duplicate named jobs. The private NEXUS model is still a separate server described in `NEXUS_SETUP.md`.

Add these two **cPanel Cron Jobs**. Replace the Node executable and application paths with the exact virtual-environment paths displayed by the panel. Log outside public_html. The examples assume cPanel's scheduler timezone is UTC; verify that with the host. `flock` prevents overlapping runs on the same hosting account.

```cron
* * * * * /usr/bin/flock -n /home/CPANEL_USER/edgewforce-reminders.lock /FULL/PATH/TO/node /home/CPANEL_USER/edgewforce/deploy/cpanel/run-job.mjs reminders >> /home/CPANEL_USER/edgewforce-reminders.log 2>&1
5 17 * * * /usr/bin/flock -n /home/CPANEL_USER/edgewforce-reports.lock /FULL/PATH/TO/node /home/CPANEL_USER/edgewforce/deploy/cpanel/run-job.mjs hr-reports >> /home/CPANEL_USER/edgewforce-reports.log 2>&1
```

17:05 UTC is **18:05 Africa/Lagos**, after the 17:00–18:00 clock-out window. If the scheduler is in Lagos time, use `5 18 * * *` for reports. Ask the host for an equivalent lock if `flock` is unavailable. Schedule each job once; select one host to own report delivery after cutover. The database's delivery claims prevent a recipient receiving the same day's report twice, but review uncertain deliveries before retrying.

The daily Excel report uses recipients saved by the administrator; the existing intended HR recipient is `hr@experiential-edge.com`. Confirm the list in the HR daily-report panel. Preserve the Gmail sender `experientialedge57@gmail.com` and its private app password, or configure a different verified sender. Merely buying hosting does not transfer the SMTP secret from Vercel. The job exits unsuccessfully for failed or uncertain report deliveries; inspect dashboard delivery history before retrying. Keep private logs rotated and access restricted.

## Verify before changing the main domain

- Open the HTTPS website and sign in using an existing authorized account. Test password reset on the new origin.
- `/api/health` must respond with JSON; `/api/health/ready` must return HTTP 200 with `ready: true`. `/api/unknown` must be a JSON 404. Missing JavaScript assets must return 404, not the login HTML.
- Check HR staff/workstation assignment, staff attendance and their agreed time windows, collaboration projects/tasks, sales collections, and a live Excel download with the appropriate roles. Use an authorized test account and review/delete only its test records.
- On a real staff phone, allow GPS, verify the assigned market boundary and sign-in at that location. Browser location requires HTTPS and permission. A closed or suspended browser cannot continuously track movement; connection gaps must not be presented as proven movement.
- Verify map tiles/attribution and the retry state on the host's network, and confirm SMTP authentication and an authorized report delivery. Check the next scheduled run and all Supabase job results.
- After a successful cutover, update domain DNS, keep backups, and remove duplicate hosting cron schedules. Do not cancel the old hosting until the new deployment and scheduled delivery are confirmed.

## Recovery

Before replacing files, keep the previous ZIP, record its checksum, take a cPanel account backup and a Supabase database backup, and export the current environment privately. If the new host fails, restore the previous website release or point DNS back to the verified Vercel deployment. Do not overwrite the database with a seed file. DNS changes may take time to propagate; restore DNS records using the values saved before cutover.
