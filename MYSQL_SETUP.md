# Hostinger internal database copy

Hostinger uses hPanel. Its MySQL service can store the application records and attachments independently of Supabase. The Vercel deployment keeps its existing Supabase configuration. This is a one-time copy: subsequent edits in one deployment are not synchronized to the other.

## Safe cutover

1. Create a dedicated, empty database and database user in Hostinger. Save its password privately as `MYSQL_PASSWORD`; never put it in Git or browser build variables. Use the host's database host, username and database name as `MYSQL_HOST`, `MYSQL_USER` and `MYSQL_DATABASE`. The expected Hostinger prefix is `u487454957_`. Use localhost/127.0.0.1 for an internal connection. Remote connections require verified TLS and `MYSQL_SSL=true`.
2. Keep `DATA_BACKEND=supabase` during preparation. The additive release supports both providers; the default remains Supabase. Vercel cannot enable this standalone MySQL backend.
3. Take a consistent, read-only PostgreSQL snapshot in one SQL statement. Include every application table/view, linked account password hashes and the storage object inventory. Keep the JSON outside the source tree/public directories. Existing application accounts are preserved; authoritative linked password hashes are copied for local sign-in. Supabase-managed sessions are not valid local application sessions: sign in again after cutover.
4. Run `node deploy/mysql/prepare-copy.mjs PRIVATE-SNAPSHOT.json PRIVATE-COPY.sql` privately. If attachments exist, supply the existing `SUPABASE_URL` and service key only in the private process environment. The converter downloads and hashes them and rewrites copied attachment links to internal `/uploads/` URLs. It never writes to Supabase. The SQL contains sensitive operational data and password hashes. Do not include it in a source ZIP, Git, public_html or a public download.
5. Import the private SQL into the new, empty Hostinger database through phpMyAdmin. Do not select an existing application database. Inserts intentionally fail on existing identifiers rather than overwrite them. An interrupted/failed import must be investigated before proceeding; do not mark it verified manually.
6. With the private MySQL settings available on the server, run `node deploy/mysql/verify-copy.mjs`. It compares every table's record count and canonical field checksum with the source snapshot and verifies attachment count/content hashes. Only successful verification marks the copy usable. The server refuses MySQL activation until verification succeeds.
7. Enable `DATA_BACKEND=mysql` and `VITE_DATA_BACKEND=mysql` only in Hostinger, then rebuild and redeploy using `app.cjs`. Remove the unused `SUPABASE_*` and `VITE_SUPABASE_*` settings from Hostinger after verification. Keep all Vercel settings unchanged.
8. Verify HTTPS, readiness, a fresh administrator sign-in, workplaces, attendance eligibility, collaboration and Excel download. Run staff write checks against isolated test fixtures, and validate physical GPS on an assigned staff device.

## Persistence and scheduled work

The adapter uses InnoDB transactions, prepared values and validated schema identifiers. A connection-scoped application lock coordinates transactions across app workers and cron processes. Nested operations share one transaction; failed operations roll back. Integer IDs stay `INT`; arrays and structured records use JSON. Timestamps retain microseconds. Password hashes remain server-side.

Attachments are stored in the internal database, so deployment folders can be replaced without losing them. Include `edgewforce_files` and the copy manifest in normal Hostinger database backups. Test a restore into a separate database before relying on a backup. The conversion schema is versioned with the code; future application schema changes must also update the MySQL schema metadata.

The existing minute `reminders` cron also processes ten-minute app inactivity reviews for MySQL. The daily `hr-reports` cron uses the same private backend settings and closes its pool on completion. After cutover, make Hostinger the sole sender for the live organization to avoid two independent databases sending duplicate daily emails. A copied delivery history prevents duplicates only for report dates already copied; it does not coordinate future sends across the separate databases.

## Rollback

Keep the private snapshot and existing Supabase deployment available. Returning Hostinger to Supabase requires switching its backend/build settings and redeploying. First preserve any records created in MySQL after cutover: they are not automatically copied back to Supabase. Never drop or clear either database as a rollback step.
