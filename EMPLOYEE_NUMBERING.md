# EdgeWForce employee numbering rule

An employee number is a permanent business identifier stored as text. Existing relational record IDs remain INTEGER; no BigInt conversion is needed.

**Format:** `[DEPT-CODE][YYYY][SEQUENCE]`, with no spaces or separators. For example, `IT20260001`.

| Department | Code |
|---|---|
| Finance | FIN |
| Human Resources | HR |
| Information Technology | IT |
| Sales & Marketing | SM |
| Operations | OPS |
| Strategy | STG |
| Creative | CRE |
| Compliance | CMP |
| Procurement | PUR |
| Executive | EXE |

The final five codes were added by the owner. The year is the recorded hiring year, preferring the explicit date of joining over an automatically populated hire-date field. Missing, invalid or contradictory hiring dates require correction before issue. Imported timestamps, birth years and the current year are never substitutes for an existing employee's actual hiring year.

The counter contains exactly four digits: `0001` through `9999`. Each department/year pair has its own counter. The installation maintains one global number register, so the same displayed number cannot belong to employees in different companies either. A counter reaching `9999` stops with an explicit capacity error; it never wraps or silently expands to five digits.

## Current-year example: 2026

This example starts with empty IT/2026 and Finance/2026 counters. It does not create sample staff in production. A populated production counter continues from its existing last number.

| Hiring event | Assigned number |
|---|---|
| First new IT hire | IT20260001 |
| Second new IT hire | IT20260002 |
| Third new IT hire | IT20260003 |
| First new Finance hire | FIN20260001 |
| Second new Finance hire | FIN20260002 |

## Collision prevention and permanent ownership

1. The server determines an approved department code and validates the hiring date.
2. PostgreSQL allocates and records the number within the employee insert/update transaction. Its counter row is locked by an atomic upsert. MySQL and the local store use their existing serialised database transactions.
3. The permanent register and counter keys reject collisions. Registration retries and existing-profile issuance retain an already issued number.
4. The sequential digits have no meaning beyond allocation order. They do not encode rank, pay, gender, phone number, software platform, project or performance. Allocation order is not a seniority ranking.
5. An employee keeps their issued number through department transfers and restoration. Both `staff_id` and `employee_code` display the same canonical number. Authentication relations and existing INTEGER primary keys are retained.
6. A leaver's number is never recycled. The retained register remains even if a database owner later physically removes the employee row. Gaps are acceptable; do not renumber staff to close gaps or reset a counter.
7. Legacy imported references, including `EMP-XLSX-*`, `VERIFY-*` and phone-shaped IDs, are kept privately for reconciliation instead of being used as new employee numbers. Email and phone remain independent sign-in identifiers.

## Staff administration

- **HR → Staff directory → Employee numbering:** preview unnumbered profiles, review their departments/years, and assign numbers to ready profiles.
- **Edit staff:** the issued ID is read-only during ordinary profile editing. Before issuance, HR can correct the hiring date and choose an approved numbering code for an unusual department label.
- **Super Admin → Edit staff → Correct staff ID:** an active Super Admin can replace an incorrectly issued number. Save any corrected hiring date first, enter an unused valid number with the matching hiring year, record a 10–500 character reason and type the current ID. The API independently verifies the persisted administrator role and company. A transaction changes both displayed IDs and numbering metadata, advances the relevant counter and writes `EMPLOYEE_NUMBER_CORRECTED` with the old number, new number, actor and reason. The old reservation stays forever; it cannot be reused even for the same person. Account credentials and integer relationships remain unchanged. The new number is the staff-ID sign-in identifier; the retired number no longer signs in. Ordinary transfers still do not change numbers.
- **Delete staff:** an authorised HR manager, administrator, super administrator or CEO selects a staff member, enters a reason and types the current employee number. This removes the profile from the current directory, disables the account, invalidates old application sessions and retains attendance, payroll and collaboration history.
- **Removed staff → Restore:** restores the same record and number. Account access remains inactive until HR explicitly reactivates it.
- Self-deletion and removal of the last administrator are blocked. Only super administrators can remove privileged administrator/CEO accounts. Every deletion, restoration and legacy-number issuance is audited.

## Deployment

Apply `supabase/migrations/20261105_employee_numbering_and_archival.sql` followed by `supabase/migrations/20261106_super_admin_employee_number_corrections.sql` before deploying the new API/UI. They are additive and safe to rerun in that order; they do not bulk-renumber or delete employees. Back up profiles and use the preview/issuance operations to migrate current staff in a stable hiring-date/record-ID order. Resolve ambiguous departments and invalid dates rather than inventing them.

The approved application database function is `issue_employee_number(employee_id, company_id, actor_id, department_code)`. It is executable only by the server service role and rechecks the actor's authority and company. Ordinary browser/database users cannot directly invoke allocation or read the private legacy register.

MySQL installs/upgrades include equivalent INTEGER/text columns, the permanent register and counters. Keep those tables in backups and copies together with employee records. Never truncate them during an import or staff cleanup.
