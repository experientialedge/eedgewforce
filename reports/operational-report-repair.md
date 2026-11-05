# Operational report-centre repair

The report centre sent `start_date` / `end_date` to a service expecting `dateFrom` / `dateTo`. It also expected a bundle while the API returned attendance rows. Most report choices rendered or exported visit rows; missing shelf-share data was replaced with an invented 50%. The navigation advertised 15 reports while the page defined 12.

Provide a management-only report bundle with the existing trusted company/supervisor scope. Match all 12 existing choices to their actual records: operations summary, attendance, agent activity, visits, sales, orders, customer balances, collections, inventory, deliveries, geofence exceptions and GPS history. Preserve missing values and recorded zero/false values. Customer balances and inventory are explicitly current snapshots; dated operational records use Lagos calendar boundaries.

Display the same columns used by a real Excel workbook export. Workbook timestamps use Lagos wall time with a WAT number format. Validate the period and selected report; reject staff access to the management bundle. Retain the original four supervisor report API modes. Loading and request errors are visible, and export stays disabled until a complete report is loaded. Ignore outdated responses after a date change.

Regression tests check data-source selection for all 12 choices, company and supervisor boundaries, date validation, excluded rejected revenue, absent shelf-share values, zero/false preservation and actual Excel parsing for every report type. The report uses whitelisted business fields and contains no staff passwords, bank details or salary fields. GPS exports retain the existing management-only access context.
