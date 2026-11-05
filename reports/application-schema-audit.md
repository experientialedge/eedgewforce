# EdgeWForce complete application function and schema inventory

{"files":205,"functions":3378,"routes":241,"databaseOperations":717,"pendingMigrations":0,"mismatches":0,"dynamic":22}

Observed schema captured at 2026-11-04T09:07:33.841Z. Static matches verify referenced tables and literal fields against the observed Supabase schema. MIGRATION REQUIRED means referenced columns exist only in the committed target, so the observed database still needs an upgrade. They do not prove end-to-end behavior. Dynamic payloads require runtime verification. The no-direct-DAL category includes UI functions, delegates and SQL adapters; it does not assert that a function has no database effects. Tests and generated code are excluded.

## Every application function

| File:line | Function | Schema status | Direct operations |
|---|---|---|---|
| server/src/config/database.js:78 | loadPersistedStore | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:99 | savePersistedStoreSync | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:108 | cloudResult | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:115 | fetchWithTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:117 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:118 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:120 | callback:finally | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:124 | resolveCanonicalTable | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:135 | cloudTable | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:139 | ready | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:140 | close | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:141 | storeFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:142 | getFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:143 | deleteFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:144 | rpc | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:145 | resetToSeed | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:152 | find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:166 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:170 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:171 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:171 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:171 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:172 | callback:every | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:182 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:200 | findOne | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:206 | findAll | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:217 | findById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:221 | insert | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:248 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:261 | update | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:289 | callback:findIndex | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:309 | delete | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:318 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:327 | transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:328 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:331 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:331 | callback:run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/database.js:343 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:7 | mysqlConfiguration | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:16 | createMysqlDatabase | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:19 | query | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:22 | column | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:25 | ready | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:27 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:28 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:35 | find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:41 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:49 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:51 | findOne | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:52 | findById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:53 | insert | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:54 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:57 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:61 | update | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:62 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:68 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:72 | delete | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:73 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:77 | transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:84 | callback:run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:86 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:88 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:92 | storeFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:97 | getFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:98 | deleteFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlDatabase.js:99 | close | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:6 | sqlIdentifier | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:10 | tableDefinition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:15 | columnDefinition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:20 | isJson | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:21 | encodeMysqlValue | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:43 | decodeMysqlRow | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:59 | mysqlRecord | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:76 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:76 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:81 | mysqlForeignKeys | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:82 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:85 | mysqlCreateTable | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:87 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:88 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlSchema.js:93 | callback:every | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlUpgrades.js:5 | upgradeMysqlSchedules | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlUpgrades.js:14 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlUpgrades.js:23 | upgradeMysqlOperationalIndexes | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlUpgrades.js:33 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlUpgrades.js:43 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/config/mysqlUpgrades.js:44 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:12 | getOverview | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:21 | getPayslips | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:30 | reviewSettlement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:40 | generatePayroll | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:49 | generateSinglePayslip | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:69 | uploadPayslip | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:87 | getDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:98 | askCopilot | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:113 | getNotifications | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:123 | markRead | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:133 | markAllRead | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:143 | subscribePush | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/accountingController.js:154 | unsubscribePush | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:9 | onboardCompany | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:19 | getCompanies | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:28 | getCompanyById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:38 | getSettings | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:48 | updateSettings | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:58 | resetStaffPassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:69 | getStructure | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/adminController.js:79 | getAuditLogs | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:9 | login | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:20 | locationLogin | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:28 | me | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:37 | logout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:44 | changePassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:54 | register | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:63 | forgotPassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/authController.js:74 | resetPassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:9 | getCustomers | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:19 | getCustomerById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:30 | getCustomer360 | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:40 | createCustomer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:49 | updateCustomer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:58 | updateLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/customerController.js:71 | geocode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/deliveryController.js:10 | getDeliveries | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/deliveryController.js:20 | getDeliveryById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/deliveryController.js:31 | dispatchOrder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/deliveryController.js:40 | confirmProofOfDelivery | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/deliveryController.js:54 | failDelivery | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/deliveryController.js:63 | getDeliveryMetrics | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:9 | getDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:19 | getProfile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:28 | getAttendance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:38 | clockAttendance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:49 | verifyFaceBiometric | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:59 | getLeaveBalances | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:69 | applyLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:79 | getLeaveRequests | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:89 | getLatestPayslip | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:99 | getPayslips | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:109 | getOKRs | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:119 | updateOKR | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:130 | getTasks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:140 | updateTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:151 | logIdleEvent | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:161 | getAnnouncements | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/employeeController.js:170 | getUpcomingBirthdays | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:12 | getRouteManifest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:22 | toggleShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:33 | getShiftWindowStatus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:45 | getGeoLocationReport | SCHEMA MATCH (STATIC) | find:employees |
| server/src/controllers/fieldController.js:54 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:54 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:67 | getCurrentShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:77 | getPersonalAlerts | SCHEMA MATCH (STATIC) | find:location_alerts |
| server/src/controllers/fieldController.js:86 | checkIn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:108 | checkOut | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:127 | recordLocationPing | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:147 | getLocationHistory | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:169 | getStores | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:178 | submitStoreRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:188 | getStoreRequests | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:197 | approveStoreRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:208 | rejectStoreRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:220 | startStoreVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:239 | logFieldActivity | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:250 | logSalesActivity | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:261 | checkInVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:272 | completeVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:283 | triggerSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:295 | getSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:301 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:310 | getSupervisorDashboardMetrics | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:321 | getSupervisorTeamTable | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:332 | getSupervisorEmployeeProfile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:344 | getEmployeeTimeline | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:356 | getSupervisorAlerts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:367 | resolveSupervisorAlert | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:381 | overrideAttendance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:401 | generateDailyTeamSummary | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/fieldController.js:412 | getReports | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:10 | getDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:19 | getEmployees | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:28 | registerStaff | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:42 | updateEmployee | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:51 | updateStaffStatus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:61 | resendInvitation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:70 | getAuditLogs | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:79 | getAttendance | SCHEMA MATCH (STATIC) | findAll:attendance, findAll:employees |
| server/src/controllers/hrController.js:83 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:85 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:93 | getIdleEvents | SCHEMA MATCH (STATIC) | find:idle_alerts, find:employees |
| server/src/controllers/hrController.js:97 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:99 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:107 | getLeave | SCHEMA MATCH (STATIC) | findAll:leave_requests, findAll:employees |
| server/src/controllers/hrController.js:111 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:113 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:121 | approveLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:130 | rejectLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:139 | getTasks | SCHEMA MATCH (STATIC) | findAll:tasks, findAll:employees |
| server/src/controllers/hrController.js:143 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:145 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:153 | assignTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:162 | getSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:171 | acknowledgeSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:180 | resolveSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:189 | getRanks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:198 | createRank | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:207 | updateRank | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:216 | getOrganization | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:225 | reassignOrganizationNode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:234 | deleteOrganizationNode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:243 | getAnnouncements | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:252 | createAnnouncement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:261 | updateAnnouncement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:270 | deleteAnnouncement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:279 | getBirthdays | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:288 | updateBirthday | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/hrController.js:297 | broadcastBirthday | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:9 | getProducts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:19 | getProductById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:30 | createProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:39 | updateProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:48 | deleteProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:57 | recordStockMovement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:66 | getMovements | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:76 | getWarehouses | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/inventoryController.js:86 | getInventorySummary | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:8 | getLocations | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:18 | getLocationById | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:28 | createLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:46 | updateLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:64 | deleteLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:74 | getEmployeeLocations | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:85 | assignEmployeeLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:105 | removeEmployeeLocationAssignment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:121 | getLocationStatusSummary | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/locationController.js:131 | getEmployeeLocationHistory | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:10 | getMyReport | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:20 | getCustomers | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:30 | createCustomer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:40 | getProducts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:50 | createProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:59 | deleteProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:68 | createOrder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:78 | getOrders | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:93 | recordPayment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:103 | getPayments | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:118 | createCompetitorIntel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:128 | getCompetitorIntel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:137 | createSettlement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:147 | approveOrder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:157 | rejectOrder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:167 | requestOrderChanges | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:177 | getSalesFunnel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:187 | getSettlements | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/salesController.js:199 | processPaystackPayment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:9 | resolveEmployeeId | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:13 | resolveReviewerId | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:21 | getMySchedules | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:34 | getTodaySchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:47 | submitSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:64 | updateTaskStatus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:77 | deleteSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:90 | getSupervisorSchedules | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:103 | reviewSupervisorSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:120 | getHRSchedules | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/scheduleController.js:132 | reviewHRSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/staffImportController.js:5 | staffImportUpload | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/staffImportController.js:6 | callback:uploadFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/staffImportController.js:9 | template | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/staffImportController.js:12 | preview | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/staffImportController.js:16 | commit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:12 | getEmployees | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:20 | createTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:29 | getTasks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:43 | acknowledgeTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:52 | completeTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:61 | updateDeliveryStages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:70 | scheduleReminder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:84 | getDeliveryLogs | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:93 | getAnalytics | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:105 | runWorkerCycle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:115 | logIdle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:124 | explainIdle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/controllers/taskController.js:133 | getIdleReports | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:81 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:83 | origin | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:96 | callback:get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:128 | callback:get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:136 | callback:get | SCHEMA MATCH (STATIC) | rpc:application_release_readiness, rpc:hr_reporting_readiness, find:users |
| server/src/index.js:180 | callback:get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:184 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:184 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:189 | callback:post | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:203 | callback:use | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:214 | callback:use | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:225 | callback:use | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/index.js:238 | callback:listen | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/auditLogger.js:11 | recordAudit | SCHEMA MATCH (STATIC) | insert:audit_logs |
| server/src/middleware/auth.js:12 | requireAuth | SCHEMA MATCH (STATIC) | findOne:users, findOne:users, findById:users, findById:users, findOne:users, update:users, find:employees, findById:users, update:users, findOne:employees, findOne:employees, findOne:ranks, findById:departments |
| server/src/middleware/auth.js:79 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/auth.js:86 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/auth.js:94 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/auth.js:145 | signUserToken | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:37 | isManagementUser | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:63 | validateHierarchyAssignment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:75 | hasRole | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:76 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:114 | hasPermission | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:115 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:148 | verifyResourceOwnership | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/middleware/rbac.js:149 | anonymous | DYNAMIC REVIEW | findById:(dynamic) |
| server/src/middleware/upload.js:9 | fileFilter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:7 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:8 | handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:8 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:9 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:10 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:11 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/activityRoutes.js:12 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/adminRoutes.js:28 | callback:get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/adminRoutes.js:29 | callback:post | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:10 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:15 | handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:15 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:24 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:28 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:32 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:36 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:40 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:47 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/collaborationRoutes.js:51 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/employeeRoutes.js:33 | callback:post | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/executiveReportRoutes.js:6 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/executiveReportRoutes.js:7 | handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/executiveReportRoutes.js:7 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/executiveReportRoutes.js:8 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/executiveReportRoutes.js:9 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:8 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:9 | callback:use | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:10 | handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:11 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:12 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:13 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:13 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:14 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:14 | callback:handle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/hrDailyReportRoutes.js:15 | callback:get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/inventoryRoutes.js:15 | requireInventoryAccess | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/nexusRoutes.js:6 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/nexusRoutes.js:7 | callback:get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/nexusRoutes.js:8 | callback:post | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/salesRoutes.js:16 | callback:use | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/workforceRoutes.js:32 | callback:get | SCHEMA MATCH (STATIC) | find:ranks |
| server/src/routes/workforceRoutes.js:41 | callback:get | SCHEMA MATCH (STATIC) | find:announcements |
| server/src/routes/workforceRoutes.js:50 | callback:get | SCHEMA MATCH (STATIC) | find:holidays |
| server/src/routes/workforceRoutes.js:59 | callback:get | SCHEMA MATCH (STATIC) | find:notifications |
| server/src/routes/workplaceAccessRoutes.js:7 | keyGenerator | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/routes/workplaceAccessRoutes.js:8 | callback:post | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:10 | storedPayslipBreakdown | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:22 | getFinancialOverview | SCHEMA MATCH (STATIC) | find:orders, find:collections, find:customers, find:settlements, find:payslips |
| server/src/services/accountingService.js:29 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:30 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:31 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:32 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:47 | getAllPayslips | SCHEMA MATCH (STATIC) | find:payslips, find:employees |
| server/src/services/accountingService.js:52 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:53 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/accountingService.js:71 | reviewSettlement | SCHEMA MATCH (STATIC) | findById:settlements, update:settlements |
| server/src/services/accountingService.js:89 | generateSinglePayslip | SCHEMA MATCH (STATIC) | findById:employees, findOne:payslips, update:payslips, insert:payslips |
| server/src/services/accountingService.js:128 | uploadCustomPayslip | SCHEMA MATCH (STATIC) | findById:employees, findOne:payslips, update:payslips, insert:payslips |
| server/src/services/accountingService.js:164 | generatePayrollBatch | SCHEMA MATCH (STATIC) | find:employees, findOne:payslips, update:payslips, insert:payslips |
| server/src/services/activityService.js:5 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:6 | iso | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:7 | newest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:7 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:10 | identity | SCHEMA MATCH (STATIC) | findById:users, findOne:employees |
| server/src/services/activityService.js:17 | canReview | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:18 | heartbeat | SCHEMA MATCH (STATIC) | rpc:workforce_activity_heartbeat |
| server/src/services/activityService.js:24 | callback:transaction | SCHEMA MATCH (STATIC) | findOne:workforce_activity_presence, insert:workforce_activity_presence, update:workforce_activity_presence, find:workforce_activity_presence, update:workforce_activity_presence, find:workforce_activity_events |
| server/src/services/activityService.js:34 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:38 | processUser | SCHEMA MATCH (STATIC) | findOne:employees, find:workforce_activity_presence, find:workforce_activity_events, update:workforce_activity_events, insert:workforce_activity_events |
| server/src/services/activityService.js:41 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:43 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:53 | deliver | SCHEMA MATCH (STATIC) | find:users, findOne:workforce_activity_notices, insert:workforce_activity_notices |
| server/src/services/activityService.js:55 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:57 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:63 | processDue | SCHEMA MATCH (STATIC) | rpc:workforce_activity_process_due |
| server/src/services/activityService.js:65 | callback:transaction | SCHEMA MATCH (STATIC) | find:users, find:workforce_activity_events |
| server/src/services/activityService.js:70 | reports | SCHEMA MATCH (STATIC) | find:workforce_activity_events, find:employees |
| server/src/services/activityService.js:78 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:78 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/activityService.js:80 | updateEvent | SCHEMA MATCH (STATIC) | findById:workforce_activity_events, update:workforce_activity_events, update:workforce_activity_events |
| server/src/services/activityService.js:91 | notices | SCHEMA MATCH (STATIC) | find:workforce_activity_notices |
| server/src/services/activityService.js:94 | markRead | SCHEMA MATCH (STATIC) | findById:workforce_activity_notices, update:workforce_activity_notices |
| server/src/services/adminService.js:17 | onboardCompany | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/adminService.js:26 | callback:transaction | SCHEMA MATCH (STATIC) | insert:companies, insert:company_settings, insert:regions, insert:territories, insert:users, insert:employees, insert:audit_logs |
| server/src/services/adminService.js:134 | getCompanies | SCHEMA MATCH (STATIC) | find:companies |
| server/src/services/adminService.js:138 | getCompanyById | SCHEMA MATCH (STATIC) | findById:companies, findOne:company_settings |
| server/src/services/adminService.js:145 | updateCompanySettings | DYNAMIC REVIEW | findOne:company_settings, update:company_settings, insert:company_settings, insert:audit_logs |
| server/src/services/adminService.js:169 | getSettings | SCHEMA MATCH (STATIC) | findOne:company_settings, insert:company_settings |
| server/src/services/adminService.js:186 | passwordAdministrator | SCHEMA MATCH (STATIC) | findById:users |
| server/src/services/adminService.js:191 | listAccessAccounts | SCHEMA MATCH (STATIC) | find:users |
| server/src/services/adminService.js:193 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/adminService.js:195 | resetAccountPassword | SCHEMA MATCH (STATIC) | findById:users, update:users, find:workforce_access_sessions, update:workforce_access_sessions, insert:audit_logs |
| server/src/services/adminService.js:210 | resetStaffPassword | SCHEMA MATCH (STATIC) | findById:employees |
| server/src/services/adminService.js:217 | getStructure | SCHEMA MATCH (STATIC) | find:regions, find:territories, find:teams, find:branches, find:warehouses |
| server/src/services/adminService.js:227 | getAuditLogs | SCHEMA MATCH (STATIC) | find:audit_logs |
| server/src/services/aiService.js:14 | generateSalesGuidance | SCHEMA MATCH (STATIC) | find:products, findById:customers |
| server/src/services/aiService.js:45 | generateInternalRulesResponse | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/aiService.js:80 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/aiService.js:97 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/aiService.js:104 | callOpenAI | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:20 | findUserByIdentifier | SCHEMA MATCH (STATIC) | findOne:users, findOne:users, findOne:users, find:employees, findById:users, findOne:users, find:employees, findById:users, find:employees, findById:users |
| server/src/services/authService.js:34 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:51 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:64 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:65 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:66 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:70 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:93 | login | SCHEMA MATCH (STATIC) | update:users, update:users, findOne:employees, findOne:employees, findOne:ranks, findById:departments |
| server/src/services/authService.js:185 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:222 | me | SCHEMA MATCH (STATIC) | findById:users, findOne:users, findOne:users, findOne:employees, findOne:employees, findOne:ranks, findById:departments |
| server/src/services/authService.js:258 | changePassword | SCHEMA MATCH (STATIC) | findById:users, findOne:users, findOne:users, update:users |
| server/src/services/authService.js:298 | registerEmployee | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:306 | forgotPassword | SCHEMA MATCH (STATIC) | update:users |
| server/src/services/authService.js:334 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/authService.js:364 | resetPassword | SCHEMA MATCH (STATIC) | findOne:users, update:users |
| server/src/services/authService.js:394 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:4 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:7 | text | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:13 | ids | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:17 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:21 | date | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:30 | safePerson | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:38 | people | SCHEMA MATCH (STATIC) | find:users |
| server/src/services/collaborationService.js:46 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:48 | access | SCHEMA MATCH (STATIC) | findById:collaboration_projects, find:collaboration_members |
| server/src/services/collaborationService.js:58 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:66 | create | SCHEMA MATCH (STATIC) | rpc:collaboration_create_project |
| server/src/services/collaborationService.js:76 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:76 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:84 | callback:transaction | SCHEMA MATCH (STATIC) | insert:collaboration_projects, insert:collaboration_members, insert:collaboration_channels |
| server/src/services/collaborationService.js:110 | overview | SCHEMA MATCH (STATIC) | find:collaboration_members, find:collaboration_projects, find:collaboration_notices |
| server/src/services/collaborationService.js:119 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:120 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:129 | detail | SCHEMA MATCH (STATIC) | find:collaboration_channels, find:collaboration_tasks, find:collaboration_events |
| server/src/services/collaborationService.js:146 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:148 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:158 | messages | SCHEMA MATCH (STATIC) | findById:collaboration_channels, find:collaboration_messages |
| server/src/services/collaborationService.js:187 | write | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:190 | callback:transaction | DYNAMIC REVIEW | find:collaboration_channels, findById:collaboration_channels, findById:collaboration_messages, findById:collaboration_tasks, rpc:collaboration_commit, insert:collaboration_members, update:collaboration_members, insert:collaboration_channels, findOne:collaboration_messages, insert:collaboration_messages, insert:collaboration_tasks, update:collaboration_tasks, findOne:collaboration_tasks, insert:collaboration_tasks, insert:collaboration_events |
| server/src/services/collaborationService.js:214 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:214 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:230 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:254 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:257 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:257 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:276 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:276 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:345 | shift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:371 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:397 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:448 | notice | DYNAMIC REVIEW | findOne:collaboration_notices, insert:collaboration_notices |
| server/src/services/collaborationService.js:457 | processDue | SCHEMA MATCH (STATIC) | rpc:collaboration_process_due |
| server/src/services/collaborationService.js:463 | callback:transaction | SCHEMA MATCH (STATIC) | find:collaboration_tasks, find:collaboration_members |
| server/src/services/collaborationService.js:482 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/collaborationService.js:498 | markRead | SCHEMA MATCH (STATIC) | findById:collaboration_notices, update:collaboration_notices |
| server/src/services/customerService.js:10 | getCustomers | SCHEMA MATCH (STATIC) | find:customers |
| server/src/services/customerService.js:17 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/customerService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/customerService.js:26 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/customerService.js:37 | getCustomerById | SCHEMA MATCH (STATIC) | findById:customers |
| server/src/services/customerService.js:44 | getCustomer360 | SCHEMA MATCH (STATIC) | findById:customers, find:orders, find:visits, find:collections, findById:employees, findById:employees |
| server/src/services/customerService.js:76 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/customerService.js:77 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/customerService.js:78 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/customerService.js:99 | createCustomer | SCHEMA MATCH (STATIC) | insert:customers, insert:audit_logs |
| server/src/services/customerService.js:139 | updateCustomer | DYNAMIC REVIEW | findById:customers, update:customers, insert:audit_logs |
| server/src/services/customerService.js:163 | updateLocation | SCHEMA MATCH (STATIC) | findById:customers, update:customers, insert:audit_logs |
| server/src/services/deliveryService.js:9 | getDeliveries | SCHEMA MATCH (STATIC) | find:deliveries, find:customers, find:orders |
| server/src/services/deliveryService.js:16 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:20 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:23 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:25 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:32 | getDeliveryById | SCHEMA MATCH (STATIC) | findById:deliveries, findById:customers, findById:orders, find:order_items |
| server/src/services/deliveryService.js:49 | dispatchOrder | SCHEMA MATCH (STATIC) | findById:orders, findOne:deliveries, update:deliveries, insert:deliveries, update:orders |
| server/src/services/deliveryService.js:86 | confirmProofOfDelivery | SCHEMA MATCH (STATIC) | findById:deliveries, update:deliveries, update:orders |
| server/src/services/deliveryService.js:107 | failDelivery | SCHEMA MATCH (STATIC) | findById:deliveries, update:deliveries, update:orders |
| server/src/services/deliveryService.js:123 | getDeliveryMetrics | SCHEMA MATCH (STATIC) | find:deliveries |
| server/src/services/deliveryService.js:128 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:129 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:130 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/deliveryService.js:131 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:7 | getTransporter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:33 | reportConfiguration | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:37 | verifyReportSender | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:43 | sendDailyWorkbook | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:54 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:64 | sendPasswordResetEmail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:103 | sendTaskReminderEmail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:145 | sendEscalationEmail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:174 | sendIdleAlertEmail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/emailService.js:203 | dispatchMail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:21 | getProfile | SCHEMA MATCH (STATIC) | findById:users, findOne:employees, findOne:ranks |
| server/src/services/employeeService.js:38 | getDashboard | SCHEMA MATCH (STATIC) | findById:employees, find:attendance, find:tasks, find:okrs, find:announcements, find:holidays, find:employees, find:customers |
| server/src/services/employeeService.js:46 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:51 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:55 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:61 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:61 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:66 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:66 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:88 | getAttendance | SCHEMA MATCH (STATIC) | find:attendance |
| server/src/services/employeeService.js:91 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:92 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:93 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:94 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:111 | clockAttendance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:120 | verifyFaceBiometric | SCHEMA MATCH (STATIC) | findById:employees, insert:face_events, update:employees |
| server/src/services/employeeService.js:158 | getLeaveBalances | SCHEMA MATCH (STATIC) | findById:employees |
| server/src/services/employeeService.js:168 | applyLeave | SCHEMA MATCH (STATIC) | findById:employees, insert:leave_requests |
| server/src/services/employeeService.js:205 | getLeaveRequests | SCHEMA MATCH (STATIC) | find:leave_requests |
| server/src/services/employeeService.js:212 | getLatestPayslip | SCHEMA MATCH (STATIC) | findById:employees, find:payslips |
| server/src/services/employeeService.js:236 | getPayslips | SCHEMA MATCH (STATIC) | find:payslips |
| server/src/services/employeeService.js:240 | getOKRs | SCHEMA MATCH (STATIC) | find:okrs |
| server/src/services/employeeService.js:244 | updateOKR | SCHEMA MATCH (STATIC) | findById:okrs, update:okrs |
| server/src/services/employeeService.js:262 | getTasks | SCHEMA MATCH (STATIC) | find:tasks |
| server/src/services/employeeService.js:266 | updateTaskStatus | SCHEMA MATCH (STATIC) | findById:tasks, update:tasks |
| server/src/services/employeeService.js:291 | logIdleEvent | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/employeeService.js:308 | getAnnouncements | SCHEMA MATCH (STATIC) | find:announcements |
| server/src/services/employeeService.js:316 | getUpcomingBirthdays | SCHEMA MATCH (STATIC) | find:employees |
| server/src/services/employeeService.js:351 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:7 | hash | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:8 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:10 | enabled | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:11 | aiConfiguration | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:12 | authorize | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:13 | facts | SCHEMA MATCH (STATIC) | rpc:workforce_executive_rollup |
| server/src/services/executiveReportService.js:15 | callback:transaction | SCHEMA MATCH (STATIC) | find:employees, find:attendance, find:workforce_movement_events, find:workforce_activity_events, find:collaboration_tasks, findOne:workforce_executive_reports, update:workforce_executive_reports, insert:workforce_executive_reports |
| server/src/services/executiveReportService.js:17 | onDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:27 | factualSummary | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:28 | today | SCHEMA MATCH (STATIC) | find:workforce_movement_events, find:employees |
| server/src/services/executiveReportService.js:33 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:33 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:33 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:33 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:35 | generate | SCHEMA MATCH (STATIC) | rpc:workforce_report_claim_ai, update:workforce_executive_reports, update:workforce_executive_reports |
| server/src/services/executiveReportService.js:40 | callback:transaction | SCHEMA MATCH (STATIC) | findById:workforce_executive_reports, update:workforce_executive_reports |
| server/src/services/executiveReportService.js:52 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:52 | callback:flatMap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:52 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:52 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:55 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:55 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:55 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveReportService.js:55 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:14 | getCEODashboardMetrics | SCHEMA MATCH (STATIC) | find:orders, find:collections, find:customers, find:employees, find:attendance, find:tasks |
| server/src/services/executiveService.js:22 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:23 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:24 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:27 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:30 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:34 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:34 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:37 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:40 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:48 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:53 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/executiveService.js:74 | getDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:16 | validateAttendanceActor | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:26 | monitoringDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:31 | observationDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:32 | attendanceTimes | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:33 | workplaceRadius | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:39 | getRouteManifest | SCHEMA MATCH (STATIC) | find:visits, find:customers, find:stores, find:work_locations |
| server/src/services/fieldService.js:45 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:46 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:47 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:47 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:61 | getCurrentShift | SCHEMA MATCH (STATIC) | findOne:attendance, findById:work_locations, findById:stores, findById:customers |
| server/src/services/fieldService.js:82 | getShiftWindowStatus | SCHEMA MATCH (STATIC) | findById:employees, findOne:attendance |
| server/src/services/fieldService.js:132 | verifyAttendanceLocation | SCHEMA MATCH (STATIC) | findById:employees |
| server/src/services/fieldService.js:142 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:146 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:147 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:154 | toggleShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:190 | checkIn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:190 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:192 | performCheckIn | SCHEMA MATCH (STATIC) | findById:employees, findOne:attendance, insert:location_logs, find:stores, insert:location_logs, rpc:save_employee_attendance, update:attendance, rpc:save_employee_attendance, insert:attendance, insert:location_logs, insert:location_alerts, insert:location_alerts |
| server/src/services/fieldService.js:294 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:301 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:339 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:383 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:574 | checkOut | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:574 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:576 | performCheckOut | SCHEMA MATCH (STATIC) | findById:employees, findOne:attendance, rpc:save_employee_attendance, update:attendance, insert:location_logs |
| server/src/services/fieldService.js:590 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:678 | recordLocationPing | SCHEMA MATCH (STATIC) | findOne:attendance, findById:employees, findById:stores, insert:location_logs, insert:location_alerts |
| server/src/services/fieldService.js:740 | getLocationHistory | SCHEMA MATCH (STATIC) | find:location_logs, find:stores |
| server/src/services/fieldService.js:746 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:747 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:749 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:756 | getStores | SCHEMA MATCH (STATIC) | find:stores, find:employees |
| server/src/services/fieldService.js:760 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:769 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:770 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:771 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:771 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:772 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:772 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:786 | submitStoreRequest | SCHEMA MATCH (STATIC) | findById:employees, insert:store_requests |
| server/src/services/fieldService.js:835 | getStoreRequests | SCHEMA MATCH (STATIC) | find:store_requests, find:employees |
| server/src/services/fieldService.js:839 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:844 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:846 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:847 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:854 | approveStoreRequest | SCHEMA MATCH (STATIC) | findById:store_requests, insert:stores, insert:customers, update:store_requests |
| server/src/services/fieldService.js:927 | rejectStoreRequest | SCHEMA MATCH (STATIC) | findById:store_requests, update:store_requests |
| server/src/services/fieldService.js:953 | startStoreVisit | SCHEMA MATCH (STATIC) | findById:stores, findById:customers, findById:employees, insert:visits |
| server/src/services/fieldService.js:1007 | logFieldActivity | SCHEMA MATCH (STATIC) | findById:employees, insert:field_activities |
| server/src/services/fieldService.js:1043 | logSalesActivity | SCHEMA MATCH (STATIC) | insert:sales_activities |
| server/src/services/fieldService.js:1079 | checkInVisit | SCHEMA MATCH (STATIC) | findById:visits, findById:stores, findById:customers, update:visits |
| server/src/services/fieldService.js:1126 | completeVisit | SCHEMA MATCH (STATIC) | findById:visits, update:visits |
| server/src/services/fieldService.js:1167 | triggerSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1171 | getSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1178 | getSupervisorDashboardMetrics | SCHEMA MATCH (STATIC) | find:employees, find:attendance, find:visits, find:location_alerts |
| server/src/services/fieldService.js:1187 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1195 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1196 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1198 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1208 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1224 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1226 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1233 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1233 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1249 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1256 | getSupervisorTeamTable | SCHEMA MATCH (STATIC) | find:employees, find:attendance, find:stores, find:work_locations, find:employee_location_assignments, find:location_logs, find:visits, find:orders |
| server/src/services/fieldService.js:1269 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1288 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1289 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1294 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1295 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1298 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1303 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1303 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1305 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1307 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1315 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1357 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1358 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1361 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1362 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1407 | getSupervisorEmployeeProfile | SCHEMA MATCH (STATIC) | findById:employees, findById:employees, find:attendance, find:location_logs, find:visits, find:field_activities, find:tasks, find:orders |
| server/src/services/fieldService.js:1414 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1424 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1430 | validOrder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1431 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1432 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1433 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1470 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1471 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1472 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1473 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1473 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1480 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1494 | getEmployeeTimeline | SCHEMA MATCH (STATIC) | findById:employees, find:attendance, find:location_logs, find:visits, find:orders |
| server/src/services/fieldService.js:1502 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1517 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1531 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1557 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1582 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1589 | getSupervisorAlerts | SCHEMA MATCH (STATIC) | find:location_alerts, find:employees |
| server/src/services/fieldService.js:1593 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1597 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1599 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1606 | resolveSupervisorAlert | SCHEMA MATCH (STATIC) | findById:location_alerts, update:location_alerts |
| server/src/services/fieldService.js:1632 | overrideAttendance | SCHEMA MATCH (STATIC) | findById:attendance, update:attendance |
| server/src/services/fieldService.js:1672 | generateDailyTeamSummary | SCHEMA MATCH (STATIC) | find:orders, find:visits, find:tasks, find:field_activities, find:daily_summaries, update:daily_summaries, insert:daily_summaries |
| server/src/services/fieldService.js:1677 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1678 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1679 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1680 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1682 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1683 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1685 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1686 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1688 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1689 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1689 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1709 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1719 | getReports | SCHEMA MATCH (STATIC) | find:employees, find:stores, find:attendance, find:location_logs, find:visits, find:orders, find:customers |
| server/src/services/fieldService.js:1726 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1727 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1728 | during | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1732 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1733 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1738 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1739 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1740 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1761 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1762 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1767 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1768 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1769 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1787 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1790 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1791 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1792 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1809 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1812 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1813 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1814 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1834 | getGeoLocationReport | SCHEMA MATCH (STATIC) | find:location_logs, find:employees, find:work_locations, find:stores |
| server/src/services/fieldService.js:1840 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1841 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1842 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1844 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1844 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1917 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1920 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1923 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1926 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1929 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1932 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1935 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1938 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1941 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/fieldService.js:1945 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:9 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:10 | name | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:11 | dayOf | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:12 | stamp | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:13 | onDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:14 | reportDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:18 | reportRecipients | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:20 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:21 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:26 | projectReport | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:28 | employee | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:28 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:29 | person | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:29 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:30 | location | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:30 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:31 | assigned | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:31 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:31 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:32 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:33 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:34 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:34 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:34 | callback:flatMap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:35 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:36 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:38 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:38 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:39 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:43 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:44 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:45 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:47 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:50 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:54 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:55 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:55 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:57 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:57 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:58 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:58 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:58 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:58 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:59 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:59 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:60 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:63 | reportWorkbook | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:66 | add | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:73 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:74 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:74 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:76 | callback:eachRow | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:76 | callback:eachCell | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:84 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:87 | callback:eachRow | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:101 | authorize | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:102 | settings | SCHEMA MATCH (STATIC) | findOne:hr_report_settings, find:hr_report_deliveries, find:hr_report_runs |
| server/src/services/hrDailyReportService.js:106 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:106 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:108 | save | SCHEMA MATCH (STATIC) | findOne:hr_report_settings, update:hr_report_settings, insert:hr_report_settings |
| server/src/services/hrDailyReportService.js:115 | snapshot | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:119 | callback:map | DYNAMIC REVIEW | findAll:(dynamic) |
| server/src/services/hrDailyReportService.js:122 | download | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:123 | prepare | SCHEMA MATCH (STATIC) | findOne:hr_report_runs, rpc:hr_report_prepare |
| server/src/services/hrDailyReportService.js:127 | callback:transaction | SCHEMA MATCH (STATIC) | findOne:hr_report_runs, insert:hr_report_runs |
| server/src/services/hrDailyReportService.js:129 | claim | SCHEMA MATCH (STATIC) | rpc:hr_report_claim |
| server/src/services/hrDailyReportService.js:131 | callback:transaction | SCHEMA MATCH (STATIC) | findOne:hr_report_deliveries, update:hr_report_deliveries, insert:hr_report_deliveries |
| server/src/services/hrDailyReportService.js:133 | deliver | SCHEMA MATCH (STATIC) | findOne:hr_report_settings |
| server/src/services/hrDailyReportService.js:138 | sendOne | DYNAMIC REVIEW | update:hr_report_deliveries |
| server/src/services/hrDailyReportService.js:149 | send | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrDailyReportService.js:150 | daily | SCHEMA MATCH (STATIC) | findAll:hr_report_settings |
| server/src/services/hrService.js:28 | getDashboardStats | SCHEMA MATCH (STATIC) | find:employees, find:attendance, find:idle_alerts, find:workforce_activity_events, find:leave_requests, find:tasks |
| server/src/services/hrService.js:32 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:32 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:34 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:34 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:35 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:35 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:37 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:39 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:40 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:41 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:45 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:46 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:52 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:53 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:64 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:65 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:79 | getEmployees | SCHEMA MATCH (STATIC) | find:employees, find:ranks, find:departments, find:users |
| server/src/services/hrService.js:99 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:100 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:101 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:102 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:167 | updateEmployee | SCHEMA MATCH (STATIC) | findById:employees, update:employees, update:users |
| server/src/services/hrService.js:239 | updateStaffStatus | SCHEMA MATCH (STATIC) | findById:employees, update:employees, update:users |
| server/src/services/hrService.js:265 | resendInvitation | SCHEMA MATCH (STATIC) | findById:employees, update:employees, update:users |
| server/src/services/hrService.js:288 | getAuditLogs | SCHEMA MATCH (STATIC) | find:audit_logs |
| server/src/services/hrService.js:295 | approveLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:298 | rejectLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:302 | assignTask | SCHEMA MATCH (STATIC) | findById:employees, find:ranks, insert:tasks, insert:notifications |
| server/src/services/hrService.js:314 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:315 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:350 | acknowledgeSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:354 | resolveSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:361 | getRanks | SCHEMA MATCH (STATIC) | find:ranks |
| server/src/services/hrService.js:365 | createRank | SCHEMA MATCH (STATIC) | findOne:ranks, insert:ranks |
| server/src/services/hrService.js:381 | updateRank | DYNAMIC REVIEW | update:ranks |
| server/src/services/hrService.js:391 | getOrganizationTree | SCHEMA MATCH (STATIC) | find:ranks, find:departments, find:users |
| server/src/services/hrService.js:397 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:398 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:399 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:400 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:401 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:409 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:413 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:416 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:417 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:418 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:419 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:420 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:439 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:448 | reassignOrganizationNode | SCHEMA MATCH (STATIC) | findById:employees, update:employees |
| server/src/services/hrService.js:481 | deleteOrganizationNode | SCHEMA MATCH (STATIC) | findById:employees, find:employees, update:employees, update:employees, update:users |
| server/src/services/hrService.js:504 | registerStaff | SCHEMA MATCH (STATIC) | findOne:users, findOne:users, findOne:employees, findOne:employees, find:leave_balances, delete:leave_balances, delete:employees, delete:users |
| server/src/services/hrService.js:534 | callback:transaction | SCHEMA MATCH (STATIC) | insert:users, insert:employees, findById:employees |
| server/src/services/hrService.js:568 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:568 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:569 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:571 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:582 | getAnnouncements | SCHEMA MATCH (STATIC) | find:announcements |
| server/src/services/hrService.js:590 | createAnnouncement | SCHEMA MATCH (STATIC) | insert:announcements |
| server/src/services/hrService.js:615 | updateAnnouncement | SCHEMA MATCH (STATIC) | findById:announcements, update:announcements |
| server/src/services/hrService.js:635 | deleteAnnouncement | SCHEMA MATCH (STATIC) | findById:announcements, delete:announcements |
| server/src/services/hrService.js:647 | getStaffBirthdays | SCHEMA MATCH (STATIC) | find:employees |
| server/src/services/hrService.js:653 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:695 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:697 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:698 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/hrService.js:710 | updateStaffBirthday | SCHEMA MATCH (STATIC) | findById:employees, update:employees |
| server/src/services/hrService.js:726 | broadcastBirthday | SCHEMA MATCH (STATIC) | findById:employees, insert:announcements, insert:notifications |
| server/src/services/idleService.js:18 | startIdleSession | SCHEMA MATCH (STATIC) | insert:employee_idle_sessions, insert:idle_alerts, find:users, findOne:employees, findOne:employees |
| server/src/services/idleService.js:66 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:80 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:85 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:113 | explainIdleSession | SCHEMA MATCH (STATIC) | findById:employee_idle_sessions, findOne:employees, update:employee_idle_sessions, findOne:idle_alerts, update:idle_alerts |
| server/src/services/idleService.js:147 | getIdleSessions | SCHEMA MATCH (STATIC) | findOne:employees, find:employee_idle_sessions, find:employees, find:idle_alerts |
| server/src/services/idleService.js:154 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:155 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:156 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:170 | getIdleAnalytics | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:173 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:174 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:177 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/idleService.js:182 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:9 | getProducts | SCHEMA MATCH (STATIC) | find:products |
| server/src/services/inventoryService.js:16 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:22 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:31 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:44 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:47 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:56 | getProductById | SCHEMA MATCH (STATIC) | findById:products |
| server/src/services/inventoryService.js:71 | createProduct | SCHEMA MATCH (STATIC) | insert:products, insert:inventory_movements |
| server/src/services/inventoryService.js:108 | updateProduct | DYNAMIC REVIEW | findById:products, update:products |
| server/src/services/inventoryService.js:124 | deleteProduct | SCHEMA MATCH (STATIC) | findById:products, delete:products, insert:audit_logs |
| server/src/services/inventoryService.js:147 | recordStockMovement | SCHEMA MATCH (STATIC) | findById:products, update:products, insert:inventory_movements, insert:inventory_alerts |
| server/src/services/inventoryService.js:200 | getMovements | SCHEMA MATCH (STATIC) | find:inventory_movements, find:products |
| server/src/services/inventoryService.js:208 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:210 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:216 | getWarehouses | SCHEMA MATCH (STATIC) | find:warehouses |
| server/src/services/inventoryService.js:221 | getInventorySummary | SCHEMA MATCH (STATIC) | find:products |
| server/src/services/inventoryService.js:225 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:226 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/inventoryService.js:227 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:3 | ensureLeaveBalances | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:4 | callback:transaction | SCHEMA MATCH (STATIC) | find:leave_balances, insert:leave_balances |
| server/src/services/leaveBalanceService.js:6 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:7 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:11 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:18 | deductLeaveBalance | DYNAMIC REVIEW | find:leave_balances, update:leave_balances, update:leave_balances |
| server/src/services/leaveBalanceService.js:19 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:20 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveBalanceService.js:20 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveReviewService.js:4 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/leaveReviewService.js:5 | reviewLeave | SCHEMA MATCH (STATIC) | findById:users, rpc:hr_review_leave |
| server/src/services/leaveReviewService.js:11 | callback:transaction | SCHEMA MATCH (STATIC) | findOne:leave_requests, update:leave_requests, insert:notifications |
| server/src/services/locationService.js:15 | getLocations | SCHEMA MATCH (STATIC) | find:work_locations |
| server/src/services/locationService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:23 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:26 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:30 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:45 | getLocationById | SCHEMA MATCH (STATIC) | findById:work_locations |
| server/src/services/locationService.js:56 | createLocation | SCHEMA MATCH (STATIC) | insert:work_locations |
| server/src/services/locationService.js:118 | updateLocation | SCHEMA MATCH (STATIC) | update:work_locations |
| server/src/services/locationService.js:162 | deleteLocation | SCHEMA MATCH (STATIC) | find:employee_location_assignments, update:work_locations |
| server/src/services/locationService.js:180 | assignEmployeeLocation | SCHEMA MATCH (STATIC) | findById:employees, rpc:assign_employee_workplace |
| server/src/services/locationService.js:218 | dateBound | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:232 | callback:transaction | SCHEMA MATCH (STATIC) | findOne:employee_location_assignments, findOne:employee_location_assignments, findById:work_locations, find:employee_location_assignments, update:employee_location_assignments, update:employee_location_assignments, insert:employee_location_assignments, update:employees, insert:location_assignment_history |
| server/src/services/locationService.js:326 | removeEmployeeLocationAssignment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:327 | callback:transaction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:330 | performRemoveEmployeeLocationAssignment | SCHEMA MATCH (STATIC) | findById:employee_location_assignments, findById:work_locations, findById:employees, rpc:remove_employee_workplace, update:employee_location_assignments, update:employees, insert:location_assignment_history |
| server/src/services/locationService.js:376 | getEmployeeLocations | SCHEMA MATCH (STATIC) | find:employee_location_assignments, find:work_locations, find:location_assignment_history |
| server/src/services/locationService.js:389 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:390 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:410 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:412 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:413 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:414 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:424 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:427 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:428 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:435 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:435 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:443 | getActivePermittedLocations | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:445 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:445 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:451 | getEmployeeLocationStatusSummary | SCHEMA MATCH (STATIC) | find:employees, find:employee_location_assignments, find:work_locations, find:users |
| server/src/services/locationService.js:460 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:461 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:461 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:462 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:464 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:465 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:476 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:479 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/locationService.js:482 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:14 | rounded | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:15 | analyseNexus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:17 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:18 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:18 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:21 | get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:21 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:26 | add | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:34 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:34 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:34 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusAnalytics.js:34 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:7 | hash | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:8 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:10 | authorize | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:11 | enabled | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:12 | snapshot | SCHEMA MATCH (STATIC) | rpc:nexus_operational_snapshot |
| server/src/services/nexusIntelligenceService.js:15 | callback:map | DYNAMIC REVIEW | find:(dynamic) |
| server/src/services/nexusIntelligenceService.js:16 | dayOf | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:17 | callback:from | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:19 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:19 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:19 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:20 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:21 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:23 | overview | SCHEMA MATCH (STATIC) | find:nexus_intelligence_runs |
| server/src/services/nexusIntelligenceService.js:29 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusIntelligenceService.js:32 | investigate | SCHEMA MATCH (STATIC) | rpc:nexus_claim_generation, insert:nexus_intelligence_runs |
| server/src/services/nexusIntelligenceService.js:40 | callback:transaction | SCHEMA MATCH (STATIC) | findOne:nexus_generation_leases, update:nexus_generation_leases, insert:nexus_generation_leases |
| server/src/services/nexusModelService.js:3 | configuration | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:12 | reason | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:14 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:17 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:26 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:27 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:28 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/nexusModelService.js:29 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationRepository.js:4 | presentNotification | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationRepository.js:8 | createNotification | SCHEMA MATCH (STATIC) | findById:employees, insert:notifications |
| server/src/services/notificationService.js:16 | notify | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:23 | getNotifications | SCHEMA MATCH (STATIC) | find:notifications, find:collaboration_notices |
| server/src/services/notificationService.js:28 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:31 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:33 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:33 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:35 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:45 | markRead | SCHEMA MATCH (STATIC) | find:notifications, update:notifications, find:collaboration_notices, findById:notifications, update:notifications |
| server/src/services/notificationService.js:64 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/notificationService.js:77 | subscribePush | SCHEMA MATCH (STATIC) | findOne:push_subscriptions, update:push_subscriptions, insert:push_subscriptions |
| server/src/services/operationalReportService.js:5 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:6 | day | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:7 | number | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:8 | table | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:9 | employeeName | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:10 | date | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:16 | overview | SCHEMA MATCH (STATIC) | find:employees, find:attendance, find:orders, find:visits, find:customers, find:collections, find:products, find:deliveries, find:location_alerts, find:location_logs |
| server/src/services/operationalReportService.js:25 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:26 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:27 | visible | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:28 | during | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:29 | staff | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:29 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:30 | customer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:30 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:31 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:32 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:33 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:34 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:35 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:36 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:37 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:38 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:39 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:40 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:41 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:42 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:43 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:45 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:45 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:46 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:47 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:47 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:47 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:47 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:47 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:47 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:48 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:50 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:51 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:52 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:53 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:53 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:54 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:55 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:59 | workbook | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:66 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:67 | callback:eachCell | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/operationalReportService.js:69 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:14 | scheduleReminder | SCHEMA MATCH (STATIC) | findOne:task_reminders, insert:task_reminders |
| server/src/services/reminderService.js:52 | getDueReminders | SCHEMA MATCH (STATIC) | find:task_reminders |
| server/src/services/reminderService.js:55 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:61 | cancelTaskReminders | SCHEMA MATCH (STATIC) | find:task_reminders, update:task_reminders |
| server/src/services/reminderService.js:75 | logDelivery | SCHEMA MATCH (STATIC) | insert:reminder_delivery_logs |
| server/src/services/reminderService.js:104 | getDeliveryLogs | SCHEMA MATCH (STATIC) | find:reminder_delivery_logs, find:reminder_delivery_logs |
| server/src/services/reminderService.js:114 | getReminderAnalytics | SCHEMA MATCH (STATIC) | find:reminder_delivery_logs, find:tasks, find:task_reminders |
| server/src/services/reminderService.js:120 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:121 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:124 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:124 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:125 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:125 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:126 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:126 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:127 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:127 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:130 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:131 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderService.js:141 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:22 | start | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:27 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:29 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:30 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:37 | stop | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:48 | processDueReminders | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:76 | processSingleReminder | SCHEMA MATCH (STATIC) | update:task_reminders, findById:tasks, update:task_reminders, update:task_reminders, findById:employees, findById:users, findById:users, update:tasks, find:reminder_delivery_logs, update:task_reminders |
| server/src/services/reminderWorker.js:233 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/reminderWorker.js:244 | triggerSupervisorEscalation | SCHEMA MATCH (STATIC) | findById:employees, findById:users, find:users, findOne:employees |
| server/src/services/salesService.js:12 | presentSettlement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:20 | getSettlements | SCHEMA MATCH (STATIC) | find:settlements, find:audit_logs |
| server/src/services/salesService.js:29 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:29 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:32 | createSettlement | SCHEMA MATCH (STATIC) | findById:employees, insert:settlements |
| server/src/services/salesService.js:52 | getMyReport | SCHEMA MATCH (STATIC) | find:orders, find:customers, find:visits |
| server/src/services/salesService.js:58 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:61 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:62 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:66 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:67 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:71 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:72 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:78 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:79 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:82 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:86 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:87 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:91 | callback:map | SCHEMA MATCH (STATIC) | findById:customers |
| server/src/services/salesService.js:115 | getCustomers | SCHEMA MATCH (STATIC) | find:customers |
| server/src/services/salesService.js:117 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:132 | createCustomer | SCHEMA MATCH (STATIC) | findById:employees, findOne:customers, insert:customers |
| server/src/services/salesService.js:173 | getProducts | SCHEMA MATCH (STATIC) | find:products |
| server/src/services/salesService.js:175 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:180 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:190 | createOrder | SCHEMA MATCH (STATIC) | findOne:orders |
| server/src/services/salesService.js:208 | callback:transaction | SCHEMA MATCH (STATIC) | findById:customers, findById:products, insert:orders, insert:order_items, update:products, insert:inventory_transactions, update:customers |
| server/src/services/salesService.js:313 | getOrders | SCHEMA MATCH (STATIC) | find:orders, find:customers, find:order_items, find:products |
| server/src/services/salesService.js:319 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:325 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:326 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:327 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:327 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:328 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:338 | recordPayment | SCHEMA MATCH (STATIC) | findOne:collections |
| server/src/services/salesService.js:351 | callback:transaction | SCHEMA MATCH (STATIC) | findById:customers, update:customers, insert:collections |
| server/src/services/salesService.js:386 | getPayments | SCHEMA MATCH (STATIC) | find:collections, find:customers, find:employees |
| server/src/services/salesService.js:391 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:395 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:397 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:398 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:405 | createCompetitorIntel | SCHEMA MATCH (STATIC) | insert:competitor_intel |
| server/src/services/salesService.js:436 | getCompetitorIntel | SCHEMA MATCH (STATIC) | find:competitor_intel, find:customers |
| server/src/services/salesService.js:439 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:441 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:448 | approveOrder | SCHEMA MATCH (STATIC) | findById:orders, update:orders, insert:order_approvals, findOne:deliveries, insert:deliveries |
| server/src/services/salesService.js:486 | rejectOrder | SCHEMA MATCH (STATIC) | findById:orders, update:orders, insert:order_approvals |
| server/src/services/salesService.js:512 | requestOrderChanges | SCHEMA MATCH (STATIC) | findById:orders, update:orders, insert:order_approvals |
| server/src/services/salesService.js:536 | getSalesFunnel | SCHEMA MATCH (STATIC) | find:visits, find:orders, find:collections |
| server/src/services/salesService.js:543 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:545 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:546 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:547 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:548 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/salesService.js:569 | processPaystackCollection | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:12 | companyFilter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:21 | calculateHours | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:38 | getEmployeeSchedules | SCHEMA MATCH (STATIC) | find:schedules |
| server/src/services/scheduleService.js:42 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:45 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:48 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:57 | getTodaySchedule | SCHEMA MATCH (STATIC) | find:schedules |
| server/src/services/scheduleService.js:60 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:67 | createOrUpdateSchedule | SCHEMA MATCH (STATIC) | findById:employees, findOne:schedules, findById:employees, findOne:employees, update:schedules, insert:schedules, find:employees |
| server/src/services/scheduleService.js:95 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:165 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:196 | updateTaskItemStatus | SCHEMA MATCH (STATIC) | findById:schedules, update:schedules |
| server/src/services/scheduleService.js:201 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:203 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:216 | getSupervisorSchedules | SCHEMA MATCH (STATIC) | find:employees, find:schedules |
| server/src/services/scheduleService.js:226 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:227 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:230 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:233 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:237 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:240 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:243 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:247 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:256 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:257 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:258 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:259 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:260 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:272 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:279 | reviewSupervisorSchedule | SCHEMA MATCH (STATIC) | findById:schedules, findById:employees, update:schedules |
| server/src/services/scheduleService.js:329 | getHRSchedules | SCHEMA MATCH (STATIC) | find:schedules, find:employees |
| server/src/services/scheduleService.js:337 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:340 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:343 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:347 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:357 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:358 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:360 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:361 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:362 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/scheduleService.js:379 | reviewHRSchedule | SCHEMA MATCH (STATIC) | findById:schedules, update:schedules |
| server/src/services/scheduleService.js:406 | deleteSchedule | SCHEMA MATCH (STATIC) | findById:schedules, delete:schedules |
| server/src/services/sosService.js:8 | failure | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:9 | present | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:15 | dispatch | SCHEMA MATCH (STATIC) | findById:employees, insert:sos_events, find:users |
| server/src/services/sosService.js:27 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:27 | callback:map | SCHEMA MATCH (STATIC) | findOne:employees |
| server/src/services/sosService.js:32 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:41 | list | SCHEMA MATCH (STATIC) | findAll:sos_events, findAll:sos, find:employees |
| server/src/services/sosService.js:44 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:44 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:45 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:46 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:46 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:47 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/sosService.js:49 | review | DYNAMIC REVIEW | findById:(dynamic), update:(dynamic), update:(dynamic) |
| server/src/services/staffFileImportService.js:20 | clean | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:22 | validateWorkbookSize | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:36 | parseStaffFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:50 | callback:eachRow | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:64 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:69 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:69 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:69 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:71 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:76 | previewStaffImport | SCHEMA MATCH (STATIC) | find:employees, find:users, find:work_locations, find:departments |
| server/src/services/staffFileImportService.js:83 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:94 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:100 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:101 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:102 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:105 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:106 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:106 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:107 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:108 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:112 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:116 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:120 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:129 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:129 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:129 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:132 | importStaffFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffFileImportService.js:136 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:13 | deriveRoleCode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:28 | deriveRankCode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:41 | splitFullName | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:55 | importAuthoritativeStaff | SCHEMA MATCH (STATIC) | find:users, find:employees, find:departments, update:users, insert:users, update:employees, insert:employees |
| server/src/services/staffImportService.js:114 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:117 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:120 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:123 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:126 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:133 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:137 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:138 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:139 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:140 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/staffImportService.js:148 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/storageService.js:28 | uploadFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/storageService.js:105 | deleteFile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/supabaseAuthService.js:17 | provisionUser | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/supabaseAuthService.js:29 | signIn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/supabaseAuthService.js:46 | requestPasswordReset | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/supabaseAuthService.js:61 | updatePassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/supabaseAuthService.js:79 | getUserFromToken | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:13 | assertTaskAccess | SCHEMA MATCH (STATIC) | findById:employees |
| server/src/services/taskService.js:24 | createTask | SCHEMA MATCH (STATIC) | findById:employees, find:ranks, insert:tasks |
| server/src/services/taskService.js:51 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:52 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:123 | getTasks | SCHEMA MATCH (STATIC) | find:tasks, findOne:employees, find:employees |
| server/src/services/taskService.js:127 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:132 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:133 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:148 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:151 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:155 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/taskService.js:164 | acknowledgeTask | SCHEMA MATCH (STATIC) | findById:tasks, update:tasks |
| server/src/services/taskService.js:182 | completeTask | SCHEMA MATCH (STATIC) | findById:tasks, update:tasks |
| server/src/services/taskService.js:228 | updateDeliveryStages | SCHEMA MATCH (STATIC) | findById:tasks, update:tasks |
| server/src/services/whatsappService.js:14 | sendMessage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/whatsappService.js:92 | formatTaskReminder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workforceNoticeService.js:4 | list | DYNAMIC REVIEW | find:(dynamic) |
| server/src/services/workforceNoticeService.js:10 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workforceNoticeService.js:14 | markRead | DYNAMIC REVIEW | findById:(dynamic), update:(dynamic) |
| server/src/services/workplaceAccessService.js:7 | secret | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:8 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:9 | workplaceRadius | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:11 | enabled | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:12 | applies | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:13 | challenge | SCHEMA MATCH (STATIC) | insert:workforce_access_sessions |
| server/src/services/workplaceAccessService.js:23 | observation | SCHEMA MATCH (STATIC) | find:work_locations |
| server/src/services/workplaceAccessService.js:27 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:29 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:30 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:31 | callback:every | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:32 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:33 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:33 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:33 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:36 | complete | SCHEMA MATCH (STATIC) | findById:workforce_access_sessions, findById:users, findById:employees |
| server/src/services/workplaceAccessService.js:47 | validate | SCHEMA MATCH (STATIC) | findById:workforce_access_sessions |
| server/src/services/workplaceAccessService.js:58 | ping | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:65 | commit | SCHEMA MATCH (STATIC) | rpc:workforce_access_commit |
| server/src/services/workplaceAccessService.js:67 | callback:transaction | SCHEMA MATCH (STATIC) | findById:workforce_access_sessions, update:workforce_access_sessions, insert:workforce_movement_events, update:workforce_access_sessions, update:workforce_access_sessions, update:workforce_access_sessions, insert:workforce_movement_events, find:workforce_access_sessions, update:workforce_access_sessions, find:users, insert:workforce_movement_notices, findById:workforce_access_sessions |
| server/src/services/workplaceAccessService.js:82 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/services/workplaceAccessService.js:86 | logout | SCHEMA MATCH (STATIC) | rpc:workforce_access_commit, findById:workforce_access_sessions, update:workforce_access_sessions |
| server/src/utils/calculations.js:13 | formatTime | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/calculations.js:32 | calculateOrderTotals | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/calculations.js:33 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/calculations.js:60 | calculateCommission | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/calculations.js:84 | calculateMonthlyPAYETax | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/calculations.js:129 | calculatePayslipBreakdown | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/calculations.js:163 | calculateWorkingDays | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/geocoder.js:12 | reverseGeocode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/geocoder.js:48 | getLocalAddressFallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/geocoder.js:69 | getGoogleMapsNavigationUrl | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/haversine.js:13 | validateCoordinates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/haversine.js:37 | formatDistance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/haversine.js:58 | calculateHaversineDistance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/haversine.js:77 | toRadians | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/haversine.js:103 | verifyGeofence | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/hostingConfiguration.js:1 | proxyHops | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/hostingConfiguration.js:7 | clientCacheHeaders | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/logger.js:6 | info | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/logger.js:9 | warn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/logger.js:12 | error | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/logger.js:15 | audit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaLocations.js:230 | getNigerianStates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaLocations.js:231 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaLocations.js:234 | getCitiesByState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaLocations.js:237 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaTime.js:26 | getLagosTime | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaTime.js:92 | isShiftEligibleRole | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/nigeriaTime.js:130 | determineShiftAttendanceWindow | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/phoneNormalizer.js:11 | normalizePhone | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/phoneNormalizer.js:46 | isEmail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/phoneNormalizer.js:55 | normalizeEmail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/schemaPatch.js:4 | schemaPatch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/schemaPatch.js:9 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/smtpConfiguration.js:1 | smtpConfiguration | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/staffIdentity.js:3 | activeEmployeeId | SCHEMA MATCH (STATIC) | findOne:employees |
| server/src/utils/supervisorAccess.js:2 | fail | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/supervisorAccess.js:3 | identifier | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| server/src/utils/supervisorAccess.js:5 | supervisorScope | SCHEMA MATCH (STATIC) | findById:employees |
| server/src/utils/supervisorAccess.js:14 | supervisorEmployee | SCHEMA MATCH (STATIC) | findById:employees |
| server/src/utils/supervisorAccess.js:20 | supervisorRecord | DYNAMIC REVIEW | findById:(dynamic) |
| client/src/App.jsx:8 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:9 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:10 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:11 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:12 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:13 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:14 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:15 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:16 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:17 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:18 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:19 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:20 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:21 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:22 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:23 | callback:lazy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:33 | getDerivedStateFromError | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:34 | render | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:34 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:37 | App | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:38 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:47 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:53 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:56 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:63 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:65 | handleToggleTheme | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:76 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:84 | getDefaultTabForUser | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:101 | handleSelectTab | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:109 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:110 | handleUnauthorized | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:111 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:116 | checkSessionAndFetchMe | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:133 | callback:setCurrentTab | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:139 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:148 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:160 | callback:onAuthStateChange | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:165 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:172 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:177 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:183 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:186 | handleLoginSuccess | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:199 | handleLogout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:222 | renderDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:319 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/App.jsx:325 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:5 | AccountAccessPanel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:7 | load | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:7 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:8 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:9 | reset | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:10 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:10 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/AccountAccessPanel.jsx:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:21 | CompanyOnboardingWizard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:78 | handleAddRegion | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:85 | handleRemoveRegion | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:86 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:89 | handleAddTerritory | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:98 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:122 | renderStepContent | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:140 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:151 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:161 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:171 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:183 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:194 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:205 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:215 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:215 | callback:setCompanyInfo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:216 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:216 | callback:setCompanyInfo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:246 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:253 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:264 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:276 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:290 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:296 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:301 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:312 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:339 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:354 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:378 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:389 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:400 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:411 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:434 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:444 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:454 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:500 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:544 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/CompanyOnboardingWizard.jsx:553 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:44 | LocationManagerModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:74 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:108 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:161 | callback:on | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:163 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:171 | callback:on | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:175 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:194 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:200 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:209 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:209 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:211 | handleUseCurrentLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:219 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:238 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:276 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:343 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:354 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:357 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:368 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:369 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:383 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:425 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:438 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:471 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:479 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/admin/LocationManagerModal.jsx:484 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/Badge.jsx:3 | Badge | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:19 | CommandPalette | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:46 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:51 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:53 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:59 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:60 | handleKeyDown | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:72 | callback:setSelectedIndex | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:75 | callback:setSelectedIndex | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:85 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:88 | handleSelect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:109 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:118 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:137 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:143 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/CommandPalette.jsx:144 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/EmptyState.jsx:4 | EmptyState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:6 | LiveCameraModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:24 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:32 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:35 | startStream | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:63 | stopStream | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:65 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:71 | handleFlipCamera | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:72 | callback:setFacingMode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:75 | handleSnap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:78 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:101 | callback:toBlob | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:108 | handleRetake | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:114 | handleConfirm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:122 | handleFileUpload | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:126 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/LiveCameraModal.jsx:139 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/Modal.jsx:4 | Modal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/Modal.jsx:8 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/Modal.jsx:11 | focusable | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/Modal.jsx:13 | handleEsc | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/Modal.jsx:22 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StatCard.jsx:4 | StatCard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StateCitySelect.jsx:8 | StateCitySelect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StateCitySelect.jsx:21 | callback:useMemo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StateCitySelect.jsx:25 | handleStateSelect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StateCitySelect.jsx:37 | handleCitySelect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StateCitySelect.jsx:57 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/common/StateCitySelect.jsx:80 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:21 | Customer360Modal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:26 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:30 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:33 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:36 | callback:finally | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:123 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:126 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:180 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:211 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/customers/Customer360Modal.jsx:240 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:6 | AttendanceControl | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:16 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:27 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:31 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:33 | run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:61 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:67 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:68 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/AttendanceControl.jsx:70 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:25 | EmployeeProfileView | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:34 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:37 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:42 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:43 | callback:finally | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:46 | handleChangePassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:71 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:114 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:249 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:272 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:282 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:292 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/EmployeeProfileView.jsx:301 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/FaceVerificationModal.jsx:5 | FaceVerificationModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/FirstLoginPasswordModal.jsx:5 | FirstLoginPasswordModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/FirstLoginPasswordModal.jsx:19 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/FirstLoginPasswordModal.jsx:91 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/FirstLoginPasswordModal.jsx:108 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/FirstLoginPasswordModal.jsx:125 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:7 | LeaveApplyModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:19 | calculateWorkingDaysClient | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:38 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:83 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:90 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:115 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:128 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/LeaveApplyModal.jsx:151 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PayslipModal.jsx:6 | PayslipModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PayslipModal.jsx:15 | handlePrint | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:5 | PublicStaffDirectoryView | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:11 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:14 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:18 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:19 | callback:finally | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:22 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:24 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:62 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:69 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:72 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/employee/PublicStaffDirectoryView.jsx:87 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:23 | AgentSOSView | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:43 | loadSOSData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:49 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:58 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:61 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:64 | triggerSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:104 | startHold | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:112 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:124 | cancelHold | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:130 | handleShareLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:155 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/AgentSOSView.jsx:365 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:16 | LocationMapModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:21 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:139 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:233 | GeoLocationReportView | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:249 | loadReport | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:273 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:275 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:278 | handleExportCSV | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:287 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:308 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:320 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:321 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:322 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:323 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:324 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:403 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:404 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:414 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:414 | callback:setDateRange | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:424 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:424 | callback:setDateRange | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:433 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:449 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:502 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:578 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/GeoLocationReportView.jsx:598 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:26 | SenriVisitWorkflow | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:61 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:63 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:63 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:64 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:64 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:68 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:71 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:72 | callback:setElapsedSeconds | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:75 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:79 | handleSelectCustomer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:81 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:99 | handleFetchCurrentGps | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:108 | callback:getCurrentPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:136 | callback:getCurrentPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:145 | handleSaveCustomerLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:177 | handleStartVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:189 | handlePhotoSelect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:194 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:202 | startLiveCamera | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:218 | captureLiveSnapshot | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:242 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:248 | stopLiveCamera | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:250 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:256 | handleCompleteVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:289 | formatTimer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:332 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:356 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:360 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:377 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:389 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:399 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:489 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:512 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:566 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SenriVisitWorkflow.jsx:615 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SOSModal.jsx:9 | SOSModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SOSModal.jsx:15 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SOSModal.jsx:17 | handleTrigger | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SOSModal.jsx:21 | callback:dispatchEmergency | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/SOSModal.jsx:77 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:7 | StoreRequestModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:35 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:41 | captureLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:42 | callback:setLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:55 | callback:getCurrentPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:64 | callback:getCurrentPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:77 | handleAutoFetchCoordinates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:78 | callback:setLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:90 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:93 | callback:setLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:97 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:130 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:203 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:203 | callback:setLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:215 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:215 | callback:setLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:247 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:259 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:276 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:276 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:277 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:277 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:291 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:305 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:318 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:333 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:345 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreRequestModal.jsx:359 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:5 | StoreVisitModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:32 | startDrawing | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:42 | draw | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:54 | stopDrawing | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:57 | callback:toBlob | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:66 | clearSignature | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:75 | handleCompleteVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:104 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:116 | handleLogActivity | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:135 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:180 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:191 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:232 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:251 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:265 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:278 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:355 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:380 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:394 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/StoreVisitModal.jsx:406 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:7 | VisitAuditModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:24 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:28 | updateTimer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:35 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:39 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:48 | getPos | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:58 | startDraw | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:66 | draw | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:74 | stopDraw | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:77 | callback:toBlob | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:89 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:99 | handleClearSignature | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:107 | handleLivePhotoCaptured | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:113 | handleComplete | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:182 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:196 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:210 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:230 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:238 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:256 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/field/VisitAuditModal.jsx:312 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:5 | ActivityReviewPanel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:11 | load | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:15 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:15 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:16 | review | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:22 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:23 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:28 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:33 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ActivityReviewPanel.jsx:37 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:4 | today | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:5 | DailyReportPanel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:7 | load | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:8 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:8 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:9 | run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:10 | save | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:10 | callback:run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:11 | download | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:11 | callback:run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:11 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:12 | send | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:12 | callback:run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:12 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:12 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:13 | verifySender | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:13 | callback:run | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:16 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:24 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:24 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:25 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:27 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/DailyReportPanel.jsx:27 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:28 | EmployeeLocationAssignModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:50 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:81 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:93 | handleAssignSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:137 | handleRemoveAssignment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:151 | handleNewLocationCreated | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:155 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:191 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:203 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:215 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:262 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:280 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:298 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:316 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:326 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:331 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:374 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:384 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:401 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:458 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:469 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:487 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:496 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:514 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:536 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/EmployeeLocationAssignModal.jsx:568 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:6 | ExecutiveActivityBrief | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:8 | generate | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:9 | load | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:10 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:10 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:10 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:10 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:18 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:20 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:20 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:21 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/ExecutiveActivityBrief.jsx:24 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/IdleReviewModal.jsx:6 | IdleReviewModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:32 | LocationAssignmentDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:50 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:70 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:75 | callback:useMemo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:77 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:78 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:79 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:80 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:93 | callback:useMemo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:94 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:111 | callback:useMemo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:112 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:126 | handleDeleteLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:160 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:226 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:238 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:259 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:268 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:272 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:281 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:292 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:335 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:405 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:437 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:481 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:491 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:512 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:517 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:525 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/LocationAssignmentDashboard.jsx:527 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:41 | OrgChartTree | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:106 | handleOpenReassign | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:121 | handleOpenAdd | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:141 | handleCreateNode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:163 | handleSaveReassignment | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:182 | handleRankShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:207 | handleDeleteNode | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:224 | filterEmployee | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:242 | OrgCard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:246 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:250 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:322 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:332 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:339 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:346 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:353 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:374 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:385 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:400 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:404 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:419 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:426 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:442 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:452 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:504 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:520 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:536 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:552 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:563 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:564 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:581 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:582 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:593 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:627 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:666 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:670 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:671 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:680 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:690 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:721 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:745 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:756 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:770 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:780 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:794 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:801 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:819 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:836 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:840 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:856 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:865 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:875 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:883 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:918 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:937 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:942 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:943 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:955 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:971 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:990 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/OrgChartTree.jsx:997 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:5 | StaffEditModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:19 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:66 | handleChange | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:68 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:74 | handleSave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:315 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:482 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffEditModal.jsx:501 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:7 | downloadCsv | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:8 | escape | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:9 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:11 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:14 | StaffImportModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:22 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:23 | submit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:32 | close | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:41 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:44 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:46 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:47 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:50 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:55 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:56 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:59 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:64 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:65 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:65 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffImportModal.jsx:65 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:27 | StaffProfileDrawer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:42 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:45 | maskAccountNumber | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:89 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:126 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:129 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:340 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:424 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:433 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:441 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/StaffProfileDrawer.jsx:460 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:6 | TaskAssignModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:18 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:63 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:75 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:78 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:94 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:111 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/hr/TaskAssignModal.jsx:125 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/BottomNav.jsx:15 | BottomNav | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/BottomNav.jsx:48 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/BottomNav.jsx:55 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/GlobalAlertBanner.jsx:4 | GlobalAlertBanner | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/GlobalAlertBanner.jsx:26 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/GlobalAlertBanner.jsx:36 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:16 | NotificationCenter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:29 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:34 | getIcon | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:90 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:93 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:107 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/NotificationCenter.jsx:110 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:18 | Shell | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:47 | handleLogout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:48 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:53 | loadNotifications | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:60 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:61 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:80 | handleResolveSOSAlert | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:88 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:95 | runSync | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:105 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:115 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:118 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:122 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:123 | handleOnline | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:128 | handleOffline | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:134 | handleQueueUpdated | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:143 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:145 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:152 | handleSubmitIdleReason | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:160 | handleMarkNotificationRead | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:163 | callback:setNotifications | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:163 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:167 | handleMarkAllNotificationsRead | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:170 | callback:setNotifications | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:170 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:174 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:186 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:187 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:191 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:207 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:216 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:220 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:239 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:247 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:269 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:296 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:300 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:323 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:342 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:346 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:350 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:354 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:363 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:364 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Shell.jsx:375 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Sidebar.jsx:28 | Sidebar | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Sidebar.jsx:133 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Sidebar.jsx:138 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/Sidebar.jsx:151 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/TopHeader.jsx:21 | TopHeader | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/TopHeader.jsx:38 | handleMuteToggle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/TopHeader.jsx:148 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/layout/TopHeader.jsx:183 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:9 | createCustomIcon | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:62 | FieldMap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:68 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:87 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:90 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:107 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:158 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/FieldMap.jsx:168 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/MapTileStatus.jsx:2 | MapTileStatus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:18 | createAgentIcon | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:75 | createStoreIcon | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:100 | SupervisorLiveMap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:114 | callback:useMemo | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:122 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:142 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:152 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:162 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:225 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:236 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:298 | callback:on | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:301 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:311 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:311 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:318 | handleZoomIn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:319 | handleZoomOut | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:320 | handleRecenter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:342 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:356 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:370 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/maps/SupervisorLiveMap.jsx:384 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:8 | CompetitorModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:29 | handleLivePhotoCaptured | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:35 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:46 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:83 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:86 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:102 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:116 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:130 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:144 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:177 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:190 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:209 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:217 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:231 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CompetitorModal.jsx:254 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:5 | CopilotDrawer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:24 | handleSend | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:29 | callback:setMessages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:44 | callback:setMessages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:46 | callback:setMessages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:86 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:89 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:99 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:140 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:141 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/CopilotDrawer.jsx:144 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:8 | MerchantModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:31 | handleAutoFetchCoordinates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:38 | callback:setForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:52 | handleCaptureGPS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:58 | callback:setForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:71 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:121 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:134 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:147 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:160 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:174 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:182 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:182 | callback:setForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:183 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:183 | callback:setForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:197 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:259 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:274 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/MerchantModal.jsx:287 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/OrderApprovalModal.jsx:15 | OrderApprovalModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/OrderApprovalModal.jsx:23 | handleProcess | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/OrderApprovalModal.jsx:113 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/OrderApprovalModal.jsx:125 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/OrderApprovalModal.jsx:137 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/OrderApprovalModal.jsx:157 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/ReceiptModal.jsx:7 | ReceiptModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/ReceiptModal.jsx:10 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/ReceiptModal.jsx:13 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/ReceiptModal.jsx:14 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/ReceiptModal.jsx:20 | handlePrint | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/ReceiptModal.jsx:88 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:7 | SettlementModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:23 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:75 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:89 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:102 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:135 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/sales/SettlementModal.jsx:151 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:29 | DailyScheduleView | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:30 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:37 | loadSchedules | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:44 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:53 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:57 | handlePrevDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:63 | handleNextDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:69 | handleToday | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:73 | handleToggleTaskStatus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:78 | callback:setSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:80 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:87 | handleDeleteSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:100 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:134 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:154 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:166 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:255 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:334 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:341 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:378 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:427 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:439 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/DailyScheduleView.jsx:442 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:25 | HRScheduleCenter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:26 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:44 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:70 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:74 | handleAcknowledge | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:83 | callback:setSelectedSchedule | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:90 | handleExportCSV | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:96 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:111 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:160 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:205 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:212 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:214 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:222 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:239 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:260 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:323 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:330 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:356 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:388 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:428 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/HRScheduleCenter.jsx:437 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:203 | SchedulePlannerModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:211 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:226 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:272 | handleApplyTemplate | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:275 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:281 | handleAddTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:308 | handleUpdateTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:309 | callback:setTasks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:316 | handleRemoveTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:317 | callback:setTasks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:317 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:320 | handleMoveTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:322 | callback:setTasks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:332 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:398 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:402 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:426 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:439 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:446 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:460 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:474 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:497 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:512 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:519 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:528 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:530 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:544 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:556 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:565 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:575 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:591 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:600 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:611 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:629 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:647 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SchedulePlannerModal.jsx:657 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:28 | SupervisorScheduleReview | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:29 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:50 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:77 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:81 | handleReviewAction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:130 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:175 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:180 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:183 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:203 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:210 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:275 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:309 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:341 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:384 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:392 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:402 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/schedule/SupervisorScheduleReview.jsx:412 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:10 | DailyReminderPrompt | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:19 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:27 | handleDismiss | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:32 | handleQuickAdd | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:55 | handleCustomSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:96 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:105 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:114 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/DailyReminderPrompt.jsx:130 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:21 | TaskCreateModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:39 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:41 | fetchEmps | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:43 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:43 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:56 | handleSubmit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:83 | toggleChannel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:87 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:127 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:141 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:144 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:160 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:179 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:193 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:207 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:225 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:238 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:253 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:265 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:274 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:283 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TaskCreateModal.jsx:292 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:28 | TodayTaskCenter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:46 | loadTasks | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:59 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:62 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:65 | handleAcknowledge | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:70 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:76 | openCompleteModal | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:90 | handleConfirmComplete | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:110 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:119 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:175 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:178 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:181 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:188 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:195 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:198 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:211 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:343 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:353 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:387 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:413 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:423 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:434 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:444 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:462 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:476 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/components/tasks/TodayTaskCenter.jsx:483 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:24 | AccountingDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:60 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:63 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:64 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:65 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:66 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:67 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:79 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:83 | handleReviewSettlement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:94 | handleGeneratePayrollBatch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:110 | handleSelectEmployeeForSingle | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:111 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:134 | handleSubmitSinglePayslip | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:157 | handleSubmitUploadPayslip | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:217 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:225 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:288 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:300 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:312 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:351 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:391 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:437 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:462 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:465 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:500 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:521 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:533 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:536 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:553 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:566 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:578 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:590 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:602 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:615 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:640 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:652 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:663 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:666 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:683 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:696 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:709 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:717 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AccountingDashboard.jsx:734 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:20 | AlertCenterDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:34 | loadAlerts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:46 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:50 | handleResolveAlert | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:68 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:69 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:70 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:72 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:154 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:157 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:177 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:185 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:204 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:274 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:297 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:312 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:327 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/AlertCenterDashboard.jsx:336 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:43 | CommandCenterDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:52 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:77 | getGreeting | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:84 | loadCommandCenterData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:89 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:91 | callback:flatMap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:93 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:94 | list | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:98 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:99 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:100 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:113 | handleResolveSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:124 | handleApproveLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:134 | handleRejectLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:144 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:146 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:149 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:153 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:179 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:191 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:203 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:215 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:227 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:248 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:255 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:270 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:297 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:336 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:350 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:353 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:368 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:391 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:501 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:504 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:519 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:529 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:529 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:560 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:568 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:586 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:608 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:619 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:631 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:637 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:658 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:669 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:672 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:703 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:712 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:721 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:731 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CommandCenterDashboard.jsx:732 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:27 | CustomerDirectoryDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:56 | handleAutoFetchCoordinates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:62 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:76 | handleFetchDeviceGPS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:82 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:96 | loadCustomers | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:108 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:112 | handleCreateCustomer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:126 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:128 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:157 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:183 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:191 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:211 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:219 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:222 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:252 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:277 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:296 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:308 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:321 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:332 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:343 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:355 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:365 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:365 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:366 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:366 | callback:setFormData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:377 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:387 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:450 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:465 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/CustomerDirectoryDashboard.jsx:477 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:20 | DeliveryDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:48 | loadDeliveries | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:61 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:69 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:73 | handleDispatch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:88 | handleConfirmPOD | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:103 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:132 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:196 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:204 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:239 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:284 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:311 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:322 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:326 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:338 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:350 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:361 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:370 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:396 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:408 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/DeliveryDashboard.jsx:424 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:36 | EmployeeDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:39 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:66 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:71 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:72 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:73 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:74 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:75 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:76 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:77 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:78 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:97 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:101 | handleClockAttendance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:127 | handleToggleTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:137 | handleUpdateOKR | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:140 | callback:setOkrs | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:140 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:188 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:192 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:209 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:251 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:276 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:302 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:359 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:413 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:444 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:462 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:517 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:534 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:568 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:616 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:630 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:647 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:679 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:686 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:690 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:691 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/EmployeeDashboard.jsx:695 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:29 | ExecutiveDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:33 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:45 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:51 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:86 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:91 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:170 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:183 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ExecutiveDashboard.jsx:208 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:24 | FieldDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:77 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:92 | loadAllData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:105 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:114 | callback:watchPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:122 | callback:watchPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:126 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:137 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:146 | updateElapsed | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:153 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:156 | formatElapsed | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:163 | handleToggleShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:195 | handleStartStoreVisit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:200 | handleCreatePaymentCollection | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:233 | handleAcknowledgeTask | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:252 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:254 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:301 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:329 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:335 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:418 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:427 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:490 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:552 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:560 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:564 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:642 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:670 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:692 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:715 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:745 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:806 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:827 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:846 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:891 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:944 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:977 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1014 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1040 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1065 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1072 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1081 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1093 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1100 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1120 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1123 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1139 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1148 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1164 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/FieldDashboard.jsx:1171 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:57 | HRDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:63 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:154 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:158 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:160 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:161 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:162 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:163 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:164 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:165 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:166 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:167 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:168 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:169 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:170 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:191 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:195 | handleApproveLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:205 | handleRejectLeave | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:215 | handleResolveSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:225 | handleAcknowledgeSOS | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:235 | handleUpdateStaffStatus | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:241 | callback:setSelectedStaffForView | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:248 | handleResendInvitation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:258 | handleSaveEditedEmployee | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:266 | handleSaveAnnouncement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:297 | handleDeleteAnnouncement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:308 | handleSaveBirthday | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:328 | handleBroadcastBirthday | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:345 | handleRegisterStaff | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:408 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:415 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:425 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:435 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:447 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:456 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:456 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:465 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:468 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:472 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:489 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:492 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:492 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:528 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:572 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:583 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:586 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:605 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:608 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:640 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:651 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:661 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:667 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:674 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:682 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:697 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:705 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:709 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:709 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:717 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:728 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:737 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:746 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:773 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:804 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:886 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:891 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:893 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:923 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:935 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:959 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:969 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:997 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1009 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1039 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1090 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1139 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1160 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1163 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1180 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1204 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1216 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1219 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1219 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1264 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1271 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1282 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1309 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1334 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1369 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1383 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1397 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1410 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1425 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1429 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1450 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1461 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1482 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1493 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1509 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1509 | callback:setRegisterForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1510 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1510 | callback:setRegisterForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1527 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1530 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1551 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1563 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1575 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1587 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1599 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1607 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1629 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1642 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1654 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1671 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1686 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1705 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1714 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1725 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1746 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1757 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1760 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1777 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1789 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1796 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1817 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1829 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1836 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1857 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1865 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1873 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1874 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1884 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1885 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1891 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1893 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/HRDashboard.jsx:1895 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:39 | InventoryDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:110 | loadInventory | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:128 | callback:setCollectionForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:137 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:142 | handleCreateProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:188 | handleSaveShelfLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:212 | handleRecordCollection | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:220 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:254 | handleRecordMovement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:277 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:281 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:302 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:328 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:335 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:378 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:396 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:408 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:420 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:432 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:456 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:467 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:471 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:480 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:483 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:490 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:504 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:534 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:596 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:613 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:638 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:639 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:655 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:687 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:726 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:754 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:755 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:801 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:813 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:826 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:836 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:848 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:851 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:862 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:875 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:885 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:895 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:925 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:935 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:938 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:949 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:960 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:971 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:980 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1010 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1021 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1024 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1040 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1048 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1051 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1065 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1075 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1088 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1098 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1110 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1119 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1146 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1156 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1170 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1173 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1186 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1196 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/InventoryDashboard.jsx:1205 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:44 | ITAdminDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:134 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:137 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:138 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:139 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:140 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:141 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:142 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:143 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:174 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:179 | handleRegisterStaff | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:229 | handleChangePassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:253 | handleAddProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:282 | handleDeleteProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:294 | handleRecordMovement | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:321 | handleSaveReceiptSettings | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:351 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:364 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:371 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:405 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:407 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:419 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:431 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:443 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:455 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:467 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:502 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:507 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:532 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:543 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:574 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:582 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:622 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:630 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:663 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:697 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:745 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:758 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:772 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:786 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:798 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:812 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:980 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:995 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1009 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1022 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1035 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1053 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1057 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1073 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1094 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1105 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1121 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1121 | callback:setRegisterForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1122 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1122 | callback:setRegisterForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1139 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1142 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1158 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1171 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1182 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1211 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1229 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1245 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1258 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1272 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1282 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1303 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1314 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1328 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1338 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1358 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1369 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1385 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1398 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1409 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1413 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1428 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1446 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1460 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1472 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1487 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ITAdminDashboard.jsx:1499 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:4 | number | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:5 | short | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:6 | NexusDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:9 | load | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:10 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:10 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:11 | investigate | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:12 | get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:12 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:13 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:13 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:18 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:22 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:22 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:24 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:24 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:24 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:25 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:25 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:25 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:27 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:27 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:27 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:27 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:27 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:28 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:28 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:28 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:30 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:30 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:30 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/NexusDashboard.jsx:30 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:32 | initials | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:35 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:39 | stamp | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:49 | localISO | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:51 | Avatar | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:61 | MessageBody | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:66 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:82 | ProjectForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:89 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:142 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:150 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:151 | callback:setMembers | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:154 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:185 | TaskForm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:192 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:240 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:248 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:249 | callback:setAssignees | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:252 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:269 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:278 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:313 | ProjectsDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:335 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:340 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:343 | callback:then | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:346 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:349 | callback:finally | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:352 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:353 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:355 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:360 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:364 | callback:setChannelId | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:365 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:370 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:377 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:378 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:379 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:381 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:383 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:390 | load | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:402 | callback:setMessages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:404 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:404 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:406 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:408 | callback:requestAnimationFrame | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:413 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:414 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:415 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:417 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:422 | reload | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:434 | write | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:445 | send | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:464 | callback:setMessages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:465 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:467 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:469 | callback:setDrafts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:474 | callback:requestAnimationFrame | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:485 | person | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:486 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:489 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:490 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:495 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:496 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:497 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:499 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:520 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:533 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:568 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:571 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:597 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:613 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:619 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:622 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:638 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:643 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:662 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:669 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:683 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:685 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:715 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:718 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:764 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:787 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:821 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:859 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:862 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:875 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:892 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:922 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:939 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:944 | callback:setMessages | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:946 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:946 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:976 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:994 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:997 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1009 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1021 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1022 | callback:setDrafts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1034 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1046 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1048 | callback:setDrafts | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1057 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1086 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1097 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1101 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1102 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1130 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1148 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1160 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1168 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1194 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1199 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1216 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1223 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1238 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1263 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1266 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1267 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1281 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1285 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1297 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1301 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1348 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1351 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1368 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1387 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1389 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ProjectsDashboard.jsx:1392 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:12 | lagosDay | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:13 | display | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:21 | ReportsCenterDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:23 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:29 | query | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:30 | fetchReport | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:42 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:42 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:43 | exportExcel | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:49 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:58 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:61 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:61 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:62 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:63 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:67 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:69 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:69 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/ReportsCenterDashboard.jsx:69 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:49 | SalesDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:116 | loadData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:129 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:138 | callback:watchPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:145 | callback:watchPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:149 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:160 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:167 | updateElapsed | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:174 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:177 | formatElapsed | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:184 | handleToggleShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:219 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:225 | addToCart | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:226 | callback:setCart | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:227 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:229 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:249 | handleCreateOrder | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:256 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:281 | handlePostCollection | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:307 | handleAddProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:333 | handleDeleteProduct | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:343 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:365 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:372 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:379 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:400 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:403 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:583 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:626 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:642 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:680 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:684 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:689 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:701 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:714 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:717 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:749 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:794 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:809 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:810 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:815 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:857 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:865 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:865 | callback:setCart | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:865 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:872 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:872 | callback:setCart | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:872 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:896 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:905 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:967 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:993 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:994 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1013 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1041 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1043 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1063 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1064 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1125 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1134 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1140 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1185 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1188 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1188 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1204 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1213 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1247 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1270 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1276 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1307 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1325 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1354 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1358 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1364 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1369 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1374 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1382 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1395 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1409 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1419 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1440 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1451 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1465 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1475 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1497 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SalesDashboard.jsx:1508 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:14 | responseList | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:16 | SupervisorDashboard | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:49 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:75 | fetchDashboardData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:99 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:102 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:106 | openEmployeeProfile | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:121 | handleResolveAlert | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:133 | handleApproveStoreRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:147 | handleRejectStoreRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:162 | handleSubmitOverride | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:184 | handleGenerateEODSummary | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:196 | handleOpenReports | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:212 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:232 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:255 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:268 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:277 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:299 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:312 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:466 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:485 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:516 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:528 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:536 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:570 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:578 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:589 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:602 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:606 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:637 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:643 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:735 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:778 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:820 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:896 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:931 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:942 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:962 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:969 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:985 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:985 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:987 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:988 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:1000 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:1007 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:1011 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:1079 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/dashboards/SupervisorDashboard.jsx:1137 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:5 | useActivityMonitor | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:16 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:17 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:33 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:40 | input | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:46 | reconnect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:48 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:52 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:53 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:55 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:62 | explain | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:70 | dismiss | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useActivityMonitor.js:71 | stop | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useMapTiles.js:4 | useMapTiles | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useMapTiles.js:6 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useMapTiles.js:7 | callback:useCallback | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useShiftTelemetry.js:4 | useShiftTelemetry | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useShiftTelemetry.js:6 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useShiftTelemetry.js:8 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useShiftTelemetry.js:10 | getLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useShiftTelemetry.js:10 | send | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useShiftTelemetry.js:10 | onError | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useWorkplaceFence.js:5 | useWorkplaceFence | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useWorkplaceFence.js:7 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useWorkplaceFence.js:10 | exit | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useWorkplaceFence.js:15 | check | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useWorkplaceFence.js:29 | callback:setInterval | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/hooks/useWorkplaceFence.js:34 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:10 | getAuthToken | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:31 | request | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:65 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:134 | get | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:135 | post | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:140 | put | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:145 | patch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:150 | delete | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/api.js:153 | apiRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:1 | number | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:2 | recordedScore | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:6 | day | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:10 | salesPeriod | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:19 | inRegion | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:20 | commandCenterMetrics | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:22 | during | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:23 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:23 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:24 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:25 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:26 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:27 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:27 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:28 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:28 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:29 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:29 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:30 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:31 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:32 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:32 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:33 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:34 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:34 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/commandCenterMetrics.js:36 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/emergency.js:2 | dispatchEmergency | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:8 | formatMoney | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:13 | formatMoneyShort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:27 | formatNigerianPhone | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:36 | getWhatsAppDeepLink | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:46 | getGoogleMapsDirLink | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:51 | formatDate | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:61 | formatTime | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:71 | formatPercent | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/formatters.js:75 | formatDistance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:11 | validateCoordinates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:35 | formatDistance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:48 | getCurrentGPSLocation | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:49 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:56 | callback:getCurrentPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:67 | callback:getCurrentPosition | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:94 | calculateClientDistance | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:104 | toRad | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:194 | geocodeNigerianAddress | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:204 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:234 | callback:setTimeout | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/geo.js:288 | parseCoordinates | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:4 | mapPoint | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:5 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:9 | escapeMapText | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:9 | callback:replace | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:10 | mapRadius | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:18 | mapReferenceLocations | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:32 | tileConfiguration | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:34 | callback:every | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:42 | attachMapSupport | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:42 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:45 | publish | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:49 | clearTimer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:50 | callback:on | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:50 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:51 | callback:on | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:52 | callback:on | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:54 | resize | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:56 | callback:requestAnimationFrame | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:61 | retry | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/mapSupport.js:63 | dispose | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:8 | offlineOwner | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:33 | generateIdempotencyKey | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:40 | cacheApiResponse | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:56 | getCachedApiResponse | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:70 | enqueueOfflineAction | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:92 | getQueuedActions | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:96 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:104 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/offline.js:112 | flushOfflineQueue | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:1 | responseData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:4 | responseList | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:11 | responseShift | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:17 | paymentAttempt | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:17 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:31 | loadOperationsData | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:32 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/operationsData.js:34 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/sessionState.js:1 | syncSessionEvent | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/shiftTelemetry.js:2 | startShiftTelemetry | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/shiftTelemetry.js:2 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/shiftTelemetry.js:4 | ping | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/shiftTelemetry.js:12 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/sound.js:8 | toggleAudioMute | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/sound.js:14 | isAudioMuted | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/sound.js:21 | playNotificationChime | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/sound.js:62 | playSOSAlarm | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/supabase.js:28 | getSupabaseSession | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/supabase.js:38 | getSupabaseAccessToken | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/supabase.js:46 | signInWithSupabase | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/supabase.js:63 | requestSupabasePasswordReset | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/supabase.js:84 | updateSupabasePassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/lib/supabase.js:100 | signOutSupabase | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:7 | LoginPage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:13 | callback:useState | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:15 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:31 | callback:useEffect | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:44 | callback:onAuthStateChange | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:52 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:56 | handleSignIn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:93 | handleRequestResetToken | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:123 | handleConfirmResetPassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:215 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:216 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:217 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:218 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:263 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:274 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:291 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:296 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:298 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:298 | callback:setShowPassword | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:342 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:373 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:379 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:395 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:405 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:418 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:425 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/LoginPage.jsx:433 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:18 | PublicNavbar | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:21 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:30 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:31 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:32 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:33 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:34 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:38 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:48 | PublicFooter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:60 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:61 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:62 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:66 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:67 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:68 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:83 | LandingPage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:104 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:108 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:148 | FeaturesPage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:187 | AboutPage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:205 | PrivacyPage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/pages/PublicPages.jsx:228 | TermsPage | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| client/src/utils/api.js:3 | apiRequest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:3 | tree | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:5 | isFn | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:6 | key | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:7 | walk | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:7 | callback:forEach | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:8 | owner | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:9 | fnName | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:11 | callback:walk | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:12 | resolve | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:16 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:17 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:20 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:20 | callback:walk | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:20 | callback:flatMap | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:20 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:24 | callback:walk | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:28 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:32 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:32 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:34 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:35 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:36 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:38 | callback:every | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:40 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:43 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:43 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:43 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:44 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:44 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:44 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:45 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:46 | callback:stringify | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:48 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:51 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:51 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:51 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:51 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/audit-contracts.mjs:52 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/package.mjs:15 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/package.mjs:23 | add | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/package.mjs:24 | tree | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/package.mjs:43 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/preflight.mjs:8 | check | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/preflight.mjs:9 | origin | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/preflight.mjs:13 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/preflight.mjs:29 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/run-job.mjs:11 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/run-job.mjs:11 | anonymous | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/run-job.mjs:20 | callback:filter | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/run-job.mjs:21 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/cpanel/run-job.mjs:21 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/copyVerification.mjs:3 | stable | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/copyVerification.mjs:3 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/copyVerification.mjs:4 | copyDigest | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/copyVerification.mjs:5 | callback:sort | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/copyVerification.mjs:6 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/copyVerification.mjs:6 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:11 | prepareCopy | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:12 | callback:some | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:16 | callback:find | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:39 | rewrite | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:39 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:42 | sqlValue | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:47 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:48 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/prepare-copy.mjs:55 | callback:reduce | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/mysql/verify-copy.mjs:16 | callback:map | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/nexus/gateway.mjs:7 | callback:createServer | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| deploy/nexus/gateway.mjs:28 | callback:listen | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |
| app.cjs:5 | callback:catch | NO DIRECT DAL CALL (UI/DELEGATE/ADAPTER) |  |

## Every API route declaration

| Method | Declared path | File:line | Handler |
|---|---|---|---|
| GET | /uploads/:name | server/src/index.js:96 | ArrowFunctionExpression |
| GET | /api/health | server/src/index.js:128 | ArrowFunctionExpression |
| GET | /api/health/ready | server/src/index.js:136 | ArrowFunctionExpression |
| GET | /api/cron/hr-daily-report | server/src/index.js:180 | ArrowFunctionExpression |
| POST | /api/telemetry/idle | server/src/index.js:189 | requireAuth, ArrowFunctionExpression |
| GET | /overview | server/src/routes/accountingRoutes.js:16 | accountingController.getOverview |
| GET | /payslips | server/src/routes/accountingRoutes.js:17 | accountingController.getPayslips |
| PUT | /settlements/:id/review | server/src/routes/accountingRoutes.js:18 | accountingController.reviewSettlement |
| POST | /payroll/generate | server/src/routes/accountingRoutes.js:19 | accountingController.generatePayroll |
| POST | /payroll/generate-single | server/src/routes/accountingRoutes.js:20 | accountingController.generateSinglePayslip |
| POST | /payroll/upload | server/src/routes/accountingRoutes.js:21 | CallExpression, accountingController.uploadPayslip |
| POST | /heartbeat | server/src/routes/activityRoutes.js:9 | CallExpression |
| GET | /reports | server/src/routes/activityRoutes.js:10 | CallExpression |
| POST | /events/:id/explain | server/src/routes/activityRoutes.js:11 | CallExpression |
| POST | /events/:id/review | server/src/routes/activityRoutes.js:12 | CallExpression |
| POST | /onboard | server/src/routes/adminRoutes.js:16 | CallExpression, adminController.onboardCompany |
| GET | /companies | server/src/routes/adminRoutes.js:17 | CallExpression, adminController.getCompanies |
| GET | /companies/:id | server/src/routes/adminRoutes.js:18 | CallExpression, adminController.getCompanyById |
| GET | /settings | server/src/routes/adminRoutes.js:21 | CallExpression, adminController.getSettings |
| PUT | /settings | server/src/routes/adminRoutes.js:22 | CallExpression, adminController.updateSettings |
| PUT | /settings/:companyId | server/src/routes/adminRoutes.js:23 | CallExpression, adminController.updateSettings |
| POST | /employees/:id/reset-password | server/src/routes/adminRoutes.js:26 | CallExpression, adminController.resetStaffPassword |
| POST | /staff-password | server/src/routes/adminRoutes.js:27 | CallExpression, adminController.resetStaffPassword |
| GET | /access-accounts | server/src/routes/adminRoutes.js:28 | CallExpression, ArrowFunctionExpression |
| POST | /access-accounts/:id/reset-password | server/src/routes/adminRoutes.js:29 | CallExpression, ArrowFunctionExpression |
| GET | /structure | server/src/routes/adminRoutes.js:32 | CallExpression, adminController.getStructure |
| GET | /audit-logs | server/src/routes/adminRoutes.js:35 | CallExpression, adminController.getAuditLogs |
| POST | /copilot | server/src/routes/aiRoutes.js:12 | aiController.askCopilot |
| POST | /login | server/src/routes/authRoutes.js:15 | authController.login |
| POST | /location-login | server/src/routes/authRoutes.js:16 | authController.locationLogin |
| POST | /register | server/src/routes/authRoutes.js:17 | requireAuth, CallExpression, authController.register |
| POST | /forgot-password | server/src/routes/authRoutes.js:18 | authController.forgotPassword |
| POST | /reset-password | server/src/routes/authRoutes.js:19 | authController.resetPassword |
| GET | /me | server/src/routes/authRoutes.js:20 | requireAuth, authController.me |
| POST | /logout | server/src/routes/authRoutes.js:21 | requireAuth, authController.logout |
| POST | /change-password | server/src/routes/authRoutes.js:22 | requireAuth, authController.changePassword |
| GET | /people | server/src/routes/collaborationRoutes.js:22 | CallExpression |
| GET | /overview | server/src/routes/collaborationRoutes.js:26 | CallExpression |
| POST | /projects | server/src/routes/collaborationRoutes.js:30 | CallExpression |
| GET | /projects/:id | server/src/routes/collaborationRoutes.js:34 | CallExpression |
| GET | /projects/:id/channels/:channel/messages | server/src/routes/collaborationRoutes.js:38 | CallExpression |
| POST | /notices/:id/read | server/src/routes/collaborationRoutes.js:49 | CallExpression |
| GET | / | server/src/routes/customerRoutes.js:13 | customerController.getCustomers |
| GET | /geocode | server/src/routes/customerRoutes.js:14 | customerController.geocode |
| GET | /:id | server/src/routes/customerRoutes.js:15 | customerController.getCustomerById |
| GET | /:id/360 | server/src/routes/customerRoutes.js:16 | customerController.getCustomer360 |
| POST | / | server/src/routes/customerRoutes.js:17 | customerController.createCustomer |
| PUT | /:id | server/src/routes/customerRoutes.js:18 | customerController.updateCustomer |
| POST | /:id/update-location | server/src/routes/customerRoutes.js:19 | customerController.updateLocation |
| GET | / | server/src/routes/deliveryRoutes.js:15 | deliveryController.getDeliveries |
| GET | /metrics | server/src/routes/deliveryRoutes.js:16 | deliveryController.getDeliveryMetrics |
| GET | /:id | server/src/routes/deliveryRoutes.js:17 | deliveryController.getDeliveryById |
| POST | /dispatch | server/src/routes/deliveryRoutes.js:19 | CallExpression, deliveryController.dispatchOrder |
| POST | /:id/confirm | server/src/routes/deliveryRoutes.js:20 | CallExpression, deliveryController.confirmProofOfDelivery |
| POST | /:id/fail | server/src/routes/deliveryRoutes.js:21 | deliveryController.failDelivery |
| GET | /dashboard | server/src/routes/employeeRoutes.js:15 | employeeController.getDashboard |
| GET | /profile | server/src/routes/employeeRoutes.js:16 | employeeController.getProfile |
| GET | /directory | server/src/routes/employeeRoutes.js:17 | hrController.getEmployees |
| GET | /colleagues | server/src/routes/employeeRoutes.js:18 | hrController.getEmployees |
| GET | /attendance | server/src/routes/employeeRoutes.js:19 | employeeController.getAttendance |
| POST | /attendance/clock | server/src/routes/employeeRoutes.js:20 | employeeController.clockAttendance |
| POST | /face/verify | server/src/routes/employeeRoutes.js:21 | employeeController.verifyFaceBiometric |
| GET | /leave/balances | server/src/routes/employeeRoutes.js:22 | employeeController.getLeaveBalances |
| POST | /leave/request | server/src/routes/employeeRoutes.js:23 | employeeController.applyLeave |
| GET | /leave/requests | server/src/routes/employeeRoutes.js:24 | employeeController.getLeaveRequests |
| GET | /payslips/latest | server/src/routes/employeeRoutes.js:25 | employeeController.getLatestPayslip |
| GET | /payslips | server/src/routes/employeeRoutes.js:26 | employeeController.getPayslips |
| GET | /okrs | server/src/routes/employeeRoutes.js:27 | employeeController.getOKRs |
| PUT | /okrs/:id | server/src/routes/employeeRoutes.js:28 | employeeController.updateOKR |
| GET | /tasks | server/src/routes/employeeRoutes.js:29 | employeeController.getTasks |
| PUT | /tasks/:id | server/src/routes/employeeRoutes.js:30 | employeeController.updateTask |
| POST | /idle-events | server/src/routes/employeeRoutes.js:31 | employeeController.logIdleEvent |
| POST | /idle-event | server/src/routes/employeeRoutes.js:32 | employeeController.logIdleEvent |
| POST | /attendance/verify-location | server/src/routes/employeeRoutes.js:33 | ArrowFunctionExpression |
| GET | /announcements | server/src/routes/employeeRoutes.js:39 | employeeController.getAnnouncements |
| GET | /birthdays | server/src/routes/employeeRoutes.js:40 | employeeController.getUpcomingBirthdays |
| GET | /schedule | server/src/routes/employeeRoutes.js:43 | scheduleController.getMySchedules |
| GET | /schedule/today | server/src/routes/employeeRoutes.js:44 | scheduleController.getTodaySchedule |
| POST | /schedule | server/src/routes/employeeRoutes.js:45 | scheduleController.submitSchedule |
| PUT | /schedule/:id/tasks/:taskId | server/src/routes/employeeRoutes.js:46 | scheduleController.updateTaskStatus |
| DELETE | /schedule/:id | server/src/routes/employeeRoutes.js:47 | scheduleController.deleteSchedule |
| GET | /today | server/src/routes/executiveReportRoutes.js:8 | CallExpression |
| POST | /generate | server/src/routes/executiveReportRoutes.js:9 | CallExpression |
| GET | /dashboard | server/src/routes/executiveRoutes.js:15 | executiveController.getDashboard |
| GET | /route-manifest | server/src/routes/fieldRoutes.js:16 | fieldController.getRouteManifest |
| GET | /alerts | server/src/routes/fieldRoutes.js:17 | fieldController.getPersonalAlerts |
| POST | /shifts/toggle | server/src/routes/fieldRoutes.js:18 | fieldController.toggleShift |
| GET | /shifts/current | server/src/routes/fieldRoutes.js:19 | fieldController.getCurrentShift |
| GET | /shifts/window-status | server/src/routes/fieldRoutes.js:20 | fieldController.getShiftWindowStatus |
| POST | /check-in | server/src/routes/fieldRoutes.js:21 | fieldController.checkIn |
| POST | /check-out | server/src/routes/fieldRoutes.js:22 | fieldController.checkOut |
| GET | /geolocation-report | server/src/routes/fieldRoutes.js:25 | fieldController.getGeoLocationReport |
| POST | /location-ping | server/src/routes/fieldRoutes.js:26 | fieldController.recordLocationPing |
| GET | /location-history | server/src/routes/fieldRoutes.js:28 | fieldController.getLocationHistory |
| GET | /location-history/:employeeId | server/src/routes/fieldRoutes.js:29 | fieldController.getLocationHistory |
| GET | /stores | server/src/routes/fieldRoutes.js:32 | fieldController.getStores |
| POST | /store-requests | server/src/routes/fieldRoutes.js:33 | CallExpression, fieldController.submitStoreRequest |
| GET | /store-requests | server/src/routes/fieldRoutes.js:37 | fieldController.getStoreRequests |
| POST | /store-requests/:requestId/approve | server/src/routes/fieldRoutes.js:38 | CallExpression, fieldController.approveStoreRequest |
| POST | /store-requests/:requestId/reject | server/src/routes/fieldRoutes.js:39 | CallExpression, fieldController.rejectStoreRequest |
| POST | /visits/start | server/src/routes/fieldRoutes.js:42 | fieldController.startStoreVisit |
| POST | /visits/check-in | server/src/routes/fieldRoutes.js:43 | fieldController.checkInVisit |
| POST | /visits/complete | server/src/routes/fieldRoutes.js:44 | CallExpression, fieldController.completeVisit |
| POST | /activities/field | server/src/routes/fieldRoutes.js:49 | CallExpression, fieldController.logFieldActivity |
| POST | /activities/sales | server/src/routes/fieldRoutes.js:50 | CallExpression, fieldController.logSalesActivity |
| POST | /sos-beacon | server/src/routes/fieldRoutes.js:53 | fieldController.triggerSOS |
| GET | /sos | server/src/routes/fieldRoutes.js:54 | fieldController.getSOS |
| GET | /supervisor/metrics | server/src/routes/fieldRoutes.js:57 | CallExpression, fieldController.getSupervisorDashboardMetrics |
| GET | /supervisor/team | server/src/routes/fieldRoutes.js:58 | CallExpression, fieldController.getSupervisorTeamTable |
| GET | /supervisor/employee/:employeeId | server/src/routes/fieldRoutes.js:59 | CallExpression, fieldController.getSupervisorEmployeeProfile |
| GET | /supervisor/employee/:employeeId/timeline | server/src/routes/fieldRoutes.js:60 | CallExpression, fieldController.getEmployeeTimeline |
| GET | /supervisor/alerts | server/src/routes/fieldRoutes.js:61 | CallExpression, fieldController.getSupervisorAlerts |
| POST | /supervisor/alerts/:alertId/resolve | server/src/routes/fieldRoutes.js:62 | CallExpression, fieldController.resolveSupervisorAlert |
| POST | /supervisor/override-attendance | server/src/routes/fieldRoutes.js:63 | CallExpression, fieldController.overrideAttendance |
| POST | /supervisor/daily-summary | server/src/routes/fieldRoutes.js:64 | CallExpression, fieldController.generateDailyTeamSummary |
| GET | /reports | server/src/routes/fieldRoutes.js:67 | fieldController.getReports |
| GET | /settings | server/src/routes/hrDailyReportRoutes.js:11 | CallExpression |
| PUT | /settings | server/src/routes/hrDailyReportRoutes.js:12 | CallExpression |
| POST | /verify-sender | server/src/routes/hrDailyReportRoutes.js:13 | CallExpression, CallExpression |
| POST | /send | server/src/routes/hrDailyReportRoutes.js:14 | CallExpression, CallExpression |
| GET | /download | server/src/routes/hrDailyReportRoutes.js:15 | ArrowFunctionExpression |
| GET | /employees/import/template | server/src/routes/hrRoutes.js:17 | importAccess, staffImportController.template |
| POST | /employees/import/preview | server/src/routes/hrRoutes.js:18 | importAccess, staffImportUpload, staffImportController.preview |
| POST | /employees/import | server/src/routes/hrRoutes.js:19 | importAccess, staffImportUpload, staffImportController.commit |
| GET | /employees | server/src/routes/hrRoutes.js:22 | hrController.getEmployees |
| GET | /ranks | server/src/routes/hrRoutes.js:23 | hrController.getRanks |
| GET | /announcements | server/src/routes/hrRoutes.js:24 | hrController.getAnnouncements |
| GET | /birthdays | server/src/routes/hrRoutes.js:25 | hrController.getBirthdays |
| GET | /organization | server/src/routes/hrRoutes.js:26 | hrController.getOrganization |
| GET | /dashboard | server/src/routes/hrRoutes.js:29 | CallExpression, hrController.getDashboard |
| POST | /employees/register | server/src/routes/hrRoutes.js:30 | CallExpression, hrController.registerStaff |
| POST | /staff/register | server/src/routes/hrRoutes.js:31 | CallExpression, hrController.registerStaff |
| PUT | /employees/:id | server/src/routes/hrRoutes.js:32 | CallExpression, hrController.updateEmployee |
| PUT | /employees/:id/status | server/src/routes/hrRoutes.js:33 | CallExpression, hrController.updateStaffStatus |
| POST | /employees/:id/resend-invitation | server/src/routes/hrRoutes.js:34 | CallExpression, hrController.resendInvitation |
| GET | /audit-logs | server/src/routes/hrRoutes.js:35 | CallExpression, hrController.getAuditLogs |
| GET | /attendance | server/src/routes/hrRoutes.js:36 | CallExpression, hrController.getAttendance |
| GET | /idle-events | server/src/routes/hrRoutes.js:37 | CallExpression, hrController.getIdleEvents |
| GET | /leave | server/src/routes/hrRoutes.js:38 | CallExpression, hrController.getLeave |
| PUT | /leave/:id/approve | server/src/routes/hrRoutes.js:39 | CallExpression, hrController.approveLeave |
| PUT | /leave/:id/reject | server/src/routes/hrRoutes.js:40 | CallExpression, hrController.rejectLeave |
| GET | /tasks | server/src/routes/hrRoutes.js:41 | CallExpression, hrController.getTasks |
| POST | /tasks | server/src/routes/hrRoutes.js:42 | CallExpression, hrController.assignTask |
| GET | /sos | server/src/routes/hrRoutes.js:43 | CallExpression, hrController.getSOS |
| PUT | /sos/:id/acknowledge | server/src/routes/hrRoutes.js:44 | CallExpression, hrController.acknowledgeSOS |
| PUT | /sos/:id/resolve | server/src/routes/hrRoutes.js:45 | CallExpression, hrController.resolveSOS |
| POST | /ranks | server/src/routes/hrRoutes.js:46 | CallExpression, hrController.createRank |
| PUT | /ranks/:id | server/src/routes/hrRoutes.js:47 | CallExpression, hrController.updateRank |
| PUT | /organization/node/:id | server/src/routes/hrRoutes.js:48 | CallExpression, hrController.reassignOrganizationNode |
| DELETE | /organization/node/:id | server/src/routes/hrRoutes.js:49 | CallExpression, hrController.deleteOrganizationNode |
| POST | /announcements | server/src/routes/hrRoutes.js:52 | CallExpression, hrController.createAnnouncement |
| PUT | /announcements/:id | server/src/routes/hrRoutes.js:53 | CallExpression, hrController.updateAnnouncement |
| DELETE | /announcements/:id | server/src/routes/hrRoutes.js:54 | CallExpression, hrController.deleteAnnouncement |
| PUT | /employees/:id/birthday | server/src/routes/hrRoutes.js:57 | CallExpression, hrController.updateBirthday |
| POST | /birthdays/broadcast | server/src/routes/hrRoutes.js:58 | CallExpression, hrController.broadcastBirthday |
| GET | /schedules | server/src/routes/hrRoutes.js:61 | CallExpression, scheduleController.getHRSchedules |
| PUT | /schedules/:id/review | server/src/routes/hrRoutes.js:62 | CallExpression, scheduleController.reviewHRSchedule |
| GET | /products | server/src/routes/inventoryRoutes.js:35 | inventoryController.getProducts |
| GET | /products/:id | server/src/routes/inventoryRoutes.js:36 | inventoryController.getProductById |
| POST | /products | server/src/routes/inventoryRoutes.js:37 | CallExpression, inventoryController.createProduct |
| PUT | /products/:id | server/src/routes/inventoryRoutes.js:38 | CallExpression, inventoryController.updateProduct |
| DELETE | /products/:id | server/src/routes/inventoryRoutes.js:39 | CallExpression, inventoryController.deleteProduct |
| POST | /movements | server/src/routes/inventoryRoutes.js:42 | CallExpression, inventoryController.recordStockMovement |
| GET | /movements | server/src/routes/inventoryRoutes.js:43 | inventoryController.getMovements |
| GET | /warehouses | server/src/routes/inventoryRoutes.js:46 | inventoryController.getWarehouses |
| GET | /summary | server/src/routes/inventoryRoutes.js:47 | inventoryController.getInventorySummary |
| GET | / | server/src/routes/locationRoutes.js:15 | locationController.getLocations |
| POST | / | server/src/routes/locationRoutes.js:16 | CallExpression, locationController.createLocation |
| GET | /summary/status | server/src/routes/locationRoutes.js:17 | locationController.getLocationStatusSummary |
| GET | /:id | server/src/routes/locationRoutes.js:18 | locationController.getLocationById |
| PUT | /:id | server/src/routes/locationRoutes.js:19 | CallExpression, locationController.updateLocation |
| DELETE | /:id | server/src/routes/locationRoutes.js:20 | CallExpression, locationController.deleteLocation |
| GET | /employee/:employeeId | server/src/routes/locationRoutes.js:23 | locationController.getEmployeeLocations |
| GET | /employee/:employeeId/history | server/src/routes/locationRoutes.js:24 | locationController.getEmployeeLocationHistory |
| POST | /employee/:employeeId/assign | server/src/routes/locationRoutes.js:25 | CallExpression, locationController.assignEmployeeLocation |
| DELETE | /assignments/:assignmentId | server/src/routes/locationRoutes.js:26 | CallExpression, locationController.removeEmployeeLocationAssignment |
| GET | /overview | server/src/routes/nexusRoutes.js:7 | ArrowFunctionExpression |
| POST | /investigate | server/src/routes/nexusRoutes.js:8 | ArrowFunctionExpression |
| GET | / | server/src/routes/notificationRoutes.js:13 | notificationController.getNotifications |
| GET | /list | server/src/routes/notificationRoutes.js:14 | notificationController.getNotifications |
| GET | /notifications | server/src/routes/notificationRoutes.js:15 | notificationController.getNotifications |
| PUT | /:id/read | server/src/routes/notificationRoutes.js:16 | notificationController.markRead |
| PUT | /mark-all-read | server/src/routes/notificationRoutes.js:17 | notificationController.markAllRead |
| POST | /read | server/src/routes/notificationRoutes.js:18 | notificationController.markRead |
| POST | /notifications/read | server/src/routes/notificationRoutes.js:19 | notificationController.markRead |
| POST | /push/subscribe | server/src/routes/notificationRoutes.js:20 | notificationController.subscribePush |
| POST | /subscribe | server/src/routes/notificationRoutes.js:21 | notificationController.subscribePush |
| DELETE | /push/subscribe | server/src/routes/notificationRoutes.js:22 | notificationController.unsubscribePush |
| DELETE | /subscribe | server/src/routes/notificationRoutes.js:23 | notificationController.unsubscribePush |
| GET | /my-report | server/src/routes/salesRoutes.js:27 | salesController.getMyReport |
| GET | /customers | server/src/routes/salesRoutes.js:28 | salesController.getCustomers |
| POST | /customers | server/src/routes/salesRoutes.js:29 | salesController.createCustomer |
| GET | /products | server/src/routes/salesRoutes.js:30 | salesController.getProducts |
| POST | /products | server/src/routes/salesRoutes.js:33 | CallExpression, salesController.createProduct |
| DELETE | /products/:id | server/src/routes/salesRoutes.js:34 | CallExpression, salesController.deleteProduct |
| POST | /orders | server/src/routes/salesRoutes.js:36 | salesController.createOrder |
| GET | /orders | server/src/routes/salesRoutes.js:37 | salesController.getOrders |
| POST | /orders/:id/approve | server/src/routes/salesRoutes.js:40 | CallExpression, salesController.approveOrder |
| POST | /orders/:id/reject | server/src/routes/salesRoutes.js:41 | CallExpression, salesController.rejectOrder |
| POST | /orders/:id/request-changes | server/src/routes/salesRoutes.js:42 | CallExpression, salesController.requestOrderChanges |
| GET | /funnel | server/src/routes/salesRoutes.js:45 | salesController.getSalesFunnel |
| POST | /payments | server/src/routes/salesRoutes.js:46 | salesController.recordPayment |
| GET | /payments | server/src/routes/salesRoutes.js:47 | salesController.getPayments |
| POST | /payments/paystack | server/src/routes/salesRoutes.js:48 | salesController.processPaystackPayment |
| POST | /competitor-intel | server/src/routes/salesRoutes.js:51 | CallExpression, salesController.createCompetitorIntel |
| GET | /competitor-intel | server/src/routes/salesRoutes.js:52 | salesController.getCompetitorIntel |
| POST | /settlements | server/src/routes/salesRoutes.js:53 | CallExpression, salesController.createSettlement |
| GET | /settlements | server/src/routes/salesRoutes.js:54 | salesController.getSettlements |
| GET | / | server/src/routes/scheduleRoutes.js:15 | scheduleController.getMySchedules |
| GET | /mine | server/src/routes/scheduleRoutes.js:16 | scheduleController.getMySchedules |
| GET | /today | server/src/routes/scheduleRoutes.js:17 | scheduleController.getTodaySchedule |
| POST | / | server/src/routes/scheduleRoutes.js:18 | scheduleController.submitSchedule |
| PUT | /:id/tasks/:taskId | server/src/routes/scheduleRoutes.js:19 | scheduleController.updateTaskStatus |
| DELETE | /:id | server/src/routes/scheduleRoutes.js:20 | scheduleController.deleteSchedule |
| GET | /supervisor | server/src/routes/scheduleRoutes.js:23 | CallExpression, scheduleController.getSupervisorSchedules |
| PUT | /:id/supervisor-review | server/src/routes/scheduleRoutes.js:28 | CallExpression, scheduleController.reviewSupervisorSchedule |
| GET | /hr | server/src/routes/scheduleRoutes.js:35 | CallExpression, scheduleController.getHRSchedules |
| PUT | /:id/hr-review | server/src/routes/scheduleRoutes.js:40 | CallExpression, scheduleController.reviewHRSchedule |
| GET | /assignable-employees | server/src/routes/taskRoutes.js:14 | taskController.getEmployees |
| POST | / | server/src/routes/taskRoutes.js:15 | taskController.createTask |
| GET | / | server/src/routes/taskRoutes.js:16 | taskController.getTasks |
| GET | /analytics | server/src/routes/taskRoutes.js:17 | taskController.getAnalytics |
| POST | /worker/cycle | server/src/routes/taskRoutes.js:18 | taskController.runWorkerCycle |
| POST | /:id/acknowledge | server/src/routes/taskRoutes.js:20 | taskController.acknowledgeTask |
| POST | /:id/complete | server/src/routes/taskRoutes.js:21 | taskController.completeTask |
| PUT | /:id/delivery-stages | server/src/routes/taskRoutes.js:22 | taskController.updateDeliveryStages |
| POST | /:id/reminders | server/src/routes/taskRoutes.js:25 | taskController.scheduleReminder |
| GET | /:id/delivery-logs | server/src/routes/taskRoutes.js:26 | taskController.getDeliveryLogs |
| GET | /delivery-logs | server/src/routes/taskRoutes.js:27 | taskController.getDeliveryLogs |
| POST | /idle/start | server/src/routes/taskRoutes.js:30 | taskController.logIdle |
| POST | /idle/:id/explain | server/src/routes/taskRoutes.js:31 | taskController.explainIdle |
| GET | /idle/reports | server/src/routes/taskRoutes.js:32 | taskController.getIdleReports |
| GET | /employees | server/src/routes/workforceRoutes.js:15 | requireAuth, hrController.getEmployees |
| GET | /staff | server/src/routes/workforceRoutes.js:16 | requireAuth, hrController.getEmployees |
| GET | /schedules | server/src/routes/workforceRoutes.js:19 | requireAuth, CallExpression, scheduleController.getSupervisorSchedules |
| PUT | /schedules/:id/review | server/src/routes/workforceRoutes.js:25 | requireAuth, CallExpression, scheduleController.reviewSupervisorSchedule |
| GET | /ranks | server/src/routes/workforceRoutes.js:32 | ArrowFunctionExpression |
| GET | /announcements | server/src/routes/workforceRoutes.js:41 | ArrowFunctionExpression |
| GET | /holidays | server/src/routes/workforceRoutes.js:50 | ArrowFunctionExpression |
| GET | /notifications | server/src/routes/workforceRoutes.js:59 | requireAuth, ArrowFunctionExpression |
| POST | /ping | server/src/routes/workplaceAccessRoutes.js:8 | ArrowFunctionExpression |

## Every direct database operation

| File:line | Operation | Table/RPC | Fields | Missing | Status |
|---|---|---|---|---|---|
| server/src/controllers/fieldController.js:53 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/controllers/fieldController.js:81 | find | location_alerts | company_id, employee_id, created_at |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:81 | findAll | attendance | company_id, id |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:82 | findAll | employees | company_id |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:95 | find | idle_alerts | company_id, created_at |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:96 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:109 | findAll | leave_requests | company_id, id |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:110 | findAll | employees | company_id |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:141 | findAll | tasks | company_id, id |  | SCHEMA MATCH |
| server/src/controllers/hrController.js:142 | findAll | employees | company_id |  | SCHEMA MATCH |
| server/src/index.js:140 | rpc | application_release_readiness |  |  | SCHEMA MATCH |
| server/src/index.js:145 | rpc | hr_reporting_readiness |  |  | SCHEMA MATCH |
| server/src/index.js:146 | find | users |  |  | SCHEMA MATCH |
| server/src/middleware/auditLogger.js:29 | insert | audit_logs | company_id, actor_id, actor_email, action, entity, entity_id, metadata, ip_address, user_agent, created_at |  | SCHEMA MATCH |
| server/src/middleware/auth.js:68 | findOne | users | auth_user_id |  | SCHEMA MATCH |
| server/src/middleware/auth.js:69 | findOne | users | uuid |  | SCHEMA MATCH |
| server/src/middleware/auth.js:70 | findById | users |  |  | SCHEMA MATCH |
| server/src/middleware/auth.js:73 | findById | users |  |  | SCHEMA MATCH |
| server/src/middleware/auth.js:76 | findOne | users | email |  | SCHEMA MATCH |
| server/src/middleware/auth.js:79 | update | users | auth_user_id, uuid |  | SCHEMA MATCH |
| server/src/middleware/auth.js:85 | find | employees |  |  | SCHEMA MATCH |
| server/src/middleware/auth.js:92 | findById | users |  |  | SCHEMA MATCH |
| server/src/middleware/auth.js:94 | update | users | auth_user_id |  | SCHEMA MATCH |
| server/src/middleware/auth.js:109 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/middleware/auth.js:110 | findOne | employees | auth_user_id, company_id |  | SCHEMA MATCH |
| server/src/middleware/auth.js:116 | findOne | ranks | code |  | SCHEMA MATCH |
| server/src/middleware/auth.js:117 | findById | departments |  |  | SCHEMA MATCH |
| server/src/middleware/rbac.js:168 | findById | (dynamic) |  |  | DYNAMIC |
| server/src/routes/workforceRoutes.js:34 | find | ranks | level |  | SCHEMA MATCH |
| server/src/routes/workforceRoutes.js:43 | find | announcements | created_at |  | SCHEMA MATCH |
| server/src/routes/workforceRoutes.js:52 | find | holidays | date |  | SCHEMA MATCH |
| server/src/routes/workforceRoutes.js:62 | find | notifications | employee_id, created_at |  | SCHEMA MATCH |
| server/src/services/accountingService.js:23 | find | orders | status |  | SCHEMA MATCH |
| server/src/services/accountingService.js:24 | find | collections |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:25 | find | customers |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:26 | find | settlements |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:27 | find | payslips |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:49 | find | payslips | pay_month, id |  | SCHEMA MATCH |
| server/src/services/accountingService.js:50 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:72 | findById | settlements |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:76 | update | settlements | reconciliation_status, audited_by, audited_at |  | SCHEMA MATCH |
| server/src/services/accountingService.js:90 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:101 | findOne | payslips | employee_id, pay_month |  | SCHEMA MATCH |
| server/src/services/accountingService.js:104 | update | payslips | basic_salary, housing_allowance, transport_allowance, other_allowance, gross_pay, tax_paye, pension, other_deductions, total_deductions, net_pay, status, notes, updated_at |  | SCHEMA MATCH |
| server/src/services/accountingService.js:111 | insert | payslips | employee_id, pay_month, basic_salary, housing_allowance, transport_allowance, other_allowance, gross_pay, tax_paye, pension, other_deductions, total_deductions, net_pay, status, notes, generated_by |  | SCHEMA MATCH |
| server/src/services/accountingService.js:129 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/accountingService.js:135 | findOne | payslips | employee_id, pay_month |  | SCHEMA MATCH |
| server/src/services/accountingService.js:138 | update | payslips | basic_salary, housing_allowance, transport_allowance, other_allowance, gross_pay, tax_paye, pension, other_deductions, total_deductions, net_pay, pdf_url, notes, status, updated_at |  | SCHEMA MATCH |
| server/src/services/accountingService.js:146 | insert | payslips | employee_id, pay_month, basic_salary, housing_allowance, transport_allowance, other_allowance, gross_pay, tax_paye, pension, other_deductions, total_deductions, net_pay, pdf_url, notes, status, generated_by |  | SCHEMA MATCH |
| server/src/services/accountingService.js:166 | find | employees | status |  | SCHEMA MATCH |
| server/src/services/accountingService.js:170 | findOne | payslips | employee_id, pay_month |  | SCHEMA MATCH |
| server/src/services/accountingService.js:180 | update | payslips | basic_salary, housing_allowance, transport_allowance, other_allowance, gross_pay, tax_paye, pension, other_deductions, total_deductions, net_pay, status |  | SCHEMA MATCH |
| server/src/services/accountingService.js:185 | insert | payslips | employee_id, pay_month, basic_salary, housing_allowance, transport_allowance, other_allowance, gross_pay, tax_paye, pension, other_deductions, total_deductions, net_pay, status, generated_by |  | SCHEMA MATCH |
| server/src/services/activityService.js:12 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/activityService.js:14 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:23 | rpc | workforce_activity_heartbeat | p_user_id, p_company_id, p_client_id, p_sequence, p_stop |  | SCHEMA MATCH |
| server/src/services/activityService.js:26 | findOne | workforce_activity_presence | user_id, client_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:29 | insert | workforce_activity_presence | company_id, user_id, employee_id, client_id, sequence, last_activity_at, last_seen_at, stopped_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:30 | update | workforce_activity_presence | sequence, last_seen_at, last_activity_at, stopped_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:31 | find | workforce_activity_presence | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:31 | update | workforce_activity_presence | stopped_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:33 | find | workforce_activity_events | user_id, company_id, detected_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:39 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:40 | find | workforce_activity_presence | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:42 | find | workforce_activity_events | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:46 | update | workforce_activity_events | ended_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:50 | insert | workforce_activity_events | company_id, user_id, employee_id, last_activity_at, detected_at, last_seen_at, kind, ended_at, reason, reason_details, reviewed_at, created_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:54 | find | users | company_id, status |  | SCHEMA MATCH |
| server/src/services/activityService.js:59 | findOne | workforce_activity_notices | user_id, event_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:60 | insert | workforce_activity_notices | company_id, user_id, event_id, title, body, read_at, created_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:64 | rpc | workforce_activity_process_due | p_company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:66 | find | users | company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:67 | find | workforce_activity_events | company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:75 | find | workforce_activity_events | company_id, detected_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:76 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/activityService.js:83 | findById | workforce_activity_events |  |  | SCHEMA MATCH |
| server/src/services/activityService.js:86 | update | workforce_activity_events | reviewed_at, reviewed_by |  | SCHEMA MATCH |
| server/src/services/activityService.js:89 | update | workforce_activity_events | reason, reason_details, explained_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:92 | find | workforce_activity_notices | company_id, user_id, created_at |  | SCHEMA MATCH |
| server/src/services/activityService.js:95 | findById | workforce_activity_notices |  |  | SCHEMA MATCH |
| server/src/services/activityService.js:97 | update | workforce_activity_notices | read_at |  | SCHEMA MATCH |
| server/src/services/adminService.js:28 | insert | companies | name, business_type, industry, registration_number, email, phone, address, country, state, city, logo_url, status |  | SCHEMA MATCH |
| server/src/services/adminService.js:46 | insert | company_settings | company_id, working_days, working_hours_start, working_hours_end, geofence_radius, attendance_rules, visit_rules, sales_targets, currency, timezone, active_modules |  | SCHEMA MATCH |
| server/src/services/adminService.js:74 | insert | regions | company_id, name, code, description |  | SCHEMA MATCH |
| server/src/services/adminService.js:83 | insert | territories | company_id, region_id, name, code |  | SCHEMA MATCH |
| server/src/services/adminService.js:96 | insert | users | company_id, full_name, email, password_hash, phone, role_code, status |  | SCHEMA MATCH |
| server/src/services/adminService.js:106 | insert | employees | company_id, user_id, employee_code, first_name, last_name, phone, department, position, status |  | SCHEMA MATCH |
| server/src/services/adminService.js:120 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, new_value |  | SCHEMA MATCH |
| server/src/services/adminService.js:135 | find | companies |  |  | SCHEMA MATCH |
| server/src/services/adminService.js:139 | findById | companies |  |  | SCHEMA MATCH |
| server/src/services/adminService.js:141 | findOne | company_settings | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:147 | findOne | company_settings | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:150 | update | company_settings |  |  | DYNAMIC FIELDS |
| server/src/services/adminService.js:152 | insert | company_settings | company_id |  | DYNAMIC FIELDS |
| server/src/services/adminService.js:155 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, previous_value, new_value |  | SCHEMA MATCH |
| server/src/services/adminService.js:171 | findOne | company_settings | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:173 | insert | company_settings | company_id, receipt_company_name, receipt_tagline, receipt_title, receipt_address, receipt_phone, receipt_footer_note |  | SCHEMA MATCH |
| server/src/services/adminService.js:187 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/adminService.js:193 | find | users | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:196 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/adminService.js:205 | update | users | password_hash, requires_password_change, password_changed_at, session_invalid_before |  | SCHEMA MATCH |
| server/src/services/adminService.js:206 | find | workforce_access_sessions | company_id, user_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:206 | update | workforce_access_sessions | state, revoked_at, revoke_reason |  | SCHEMA MATCH |
| server/src/services/adminService.js:207 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, previous_value, new_value |  | SCHEMA MATCH |
| server/src/services/adminService.js:211 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/adminService.js:219 | find | regions | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:220 | find | territories | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:221 | find | teams | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:222 | find | branches | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:223 | find | warehouses | company_id |  | SCHEMA MATCH |
| server/src/services/adminService.js:229 | find | audit_logs | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/aiService.js:18 | find | products | status |  | SCHEMA MATCH |
| server/src/services/aiService.js:21 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/authService.js:28 | findOne | users | email |  | SCHEMA MATCH |
| server/src/services/authService.js:30 | findOne | users | email |  | SCHEMA MATCH |
| server/src/services/authService.js:30 | findOne | users | email |  | SCHEMA MATCH |
| server/src/services/authService.js:33 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/authService.js:40 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/authService.js:48 | findOne | users | phone |  | SCHEMA MATCH |
| server/src/services/authService.js:50 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/authService.js:53 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/authService.js:61 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/authService.js:82 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/authService.js:131 | update | users | auth_user_id, uuid |  | SCHEMA MATCH |
| server/src/services/authService.js:146 | update | users | auth_user_id, uuid |  | SCHEMA MATCH |
| server/src/services/authService.js:187 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:188 | findOne | employees | auth_user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:191 | findOne | ranks | code |  | SCHEMA MATCH |
| server/src/services/authService.js:192 | findById | departments |  |  | SCHEMA MATCH |
| server/src/services/authService.js:223 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/authService.js:224 | findOne | users | auth_user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:225 | findOne | users | uuid |  | SCHEMA MATCH |
| server/src/services/authService.js:229 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:230 | findOne | employees | auth_user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:233 | findOne | ranks | code |  | SCHEMA MATCH |
| server/src/services/authService.js:234 | findById | departments |  |  | SCHEMA MATCH |
| server/src/services/authService.js:263 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/authService.js:264 | findOne | users | auth_user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:265 | findOne | users | uuid |  | SCHEMA MATCH |
| server/src/services/authService.js:285 | update | users | password_hash, requires_password_change |  | SCHEMA MATCH |
| server/src/services/authService.js:330 | update | users | reset_token, reset_token_expires_at |  | SCHEMA MATCH |
| server/src/services/authService.js:374 | findOne | users | auth_user_id |  | SCHEMA MATCH |
| server/src/services/authService.js:388 | update | users | password_hash, reset_token, reset_token_expires_at, requires_password_change |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:40 | find | users | company_id, status |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:49 | findById | collaboration_projects |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:55 | find | collaboration_members | project_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:79 | rpc | collaboration_create_project | p_actor_id, p_company_id, p_data |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:85 | insert | collaboration_projects | company_id, owner_id, name, description, color, status |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:94 | insert | collaboration_members | company_id, project_id, user_id, role |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:100 | insert | collaboration_channels | company_id, project_id, name, description, created_by |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:112 | find | collaboration_members | company_id, user_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:116 | find | collaboration_projects | company_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:122 | find | collaboration_notices | company_id, user_id, created_at |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:137 | find | collaboration_channels | project_id, company_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:138 | find | collaboration_tasks | project_id, company_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:139 | find | collaboration_events | project_id, company_id, created_at |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:160 | findById | collaboration_channels |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:179 | find | collaboration_messages | project_id, channel_id, company_id, id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:229 | find | collaboration_channels | company_id, project_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:235 | findById | collaboration_channels |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:242 | findById | collaboration_messages |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:309 | findById | collaboration_tasks |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:362 | rpc | collaboration_commit | p_actor_id, p_company_id, p_project_id, p_action, p_data |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:373 | insert | collaboration_members | company_id, project_id, user_id, role |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:379 | update | collaboration_members | role |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:384 | insert | collaboration_channels | company_id, project_id |  | DYNAMIC FIELDS |
| server/src/services/collaborationService.js:386 | findOne | collaboration_messages | company_id, project_id, user_id, client_nonce |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:393 | insert | collaboration_messages | company_id, project_id |  | DYNAMIC FIELDS |
| server/src/services/collaborationService.js:408 | insert | collaboration_tasks | company_id, project_id |  | DYNAMIC FIELDS |
| server/src/services/collaborationService.js:424 | update | collaboration_tasks | status, version, completed_at, updated_at |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:433 | findOne | collaboration_tasks | origin_task_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:437 | insert | collaboration_tasks | company_id, project_id |  | DYNAMIC FIELDS |
| server/src/services/collaborationService.js:438 | insert | collaboration_events | company_id, project_id, user_id, body |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:449 | findOne | collaboration_notices | user_id, source_key |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:454 | insert | collaboration_notices | read_at |  | DYNAMIC FIELDS |
| server/src/services/collaborationService.js:459 | rpc | collaboration_process_due | p_user_id, p_now |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:464 | find | collaboration_tasks |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:472 | find | collaboration_members | project_id |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:499 | findById | collaboration_notices |  |  | SCHEMA MATCH |
| server/src/services/collaborationService.js:506 | update | collaboration_notices | read_at |  | SCHEMA MATCH |
| server/src/services/customerService.js:12 | find | customers | company_id, name |  | SCHEMA MATCH |
| server/src/services/customerService.js:38 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/customerService.js:45 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/customerService.js:51 | find | orders | customer_id, company_id, created_at |  | SCHEMA MATCH |
| server/src/services/customerService.js:56 | find | visits | customer_id, company_id, planned_date |  | SCHEMA MATCH |
| server/src/services/customerService.js:61 | find | collections | customer_id, company_id, payment_date |  | SCHEMA MATCH |
| server/src/services/customerService.js:69 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/customerService.js:72 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/customerService.js:101 | insert | customers | company_id, code, name, business_name, customer_type, tier, region_id, territory_id, territory, address, latitude, longitude, geofence_radius, contact_person, phone, email, credit_limit, balance, assigned_agent_id, assigned_supervisor_id, status, total_sales_ngn |  | SCHEMA MATCH |
| server/src/services/customerService.js:126 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, new_value |  | SCHEMA MATCH |
| server/src/services/customerService.js:140 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/customerService.js:144 | update | customers |  |  | DYNAMIC FIELDS |
| server/src/services/customerService.js:146 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, previous_value, new_value |  | SCHEMA MATCH |
| server/src/services/customerService.js:168 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/customerService.js:175 | update | customers | latitude, longitude, address, gps_accuracy, last_gps_updated_at, google_maps_directions_url |  | SCHEMA MATCH |
| server/src/services/customerService.js:184 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, new_value |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:11 | find | deliveries | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:19 | find | customers | company_id |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:22 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:33 | findById | deliveries |  |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:37 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:38 | findById | orders |  |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:39 | find | order_items | order_id |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:51 | findById | orders |  |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:55 | findOne | deliveries | order_id |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:57 | update | deliveries | driver_name, driver_phone, vehicle_number, dispatch_time, delivery_status |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:65 | insert | deliveries | company_id, order_id, customer_id, driver_name, driver_phone, vehicle_number, dispatch_time, delivery_status |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:78 | update | orders | status, delivery_status |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:87 | findById | deliveries |  |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:90 | update | deliveries | delivery_status, actual_delivery_time, recipient_name, recipient_signature, proof_of_delivery_photo |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:99 | update | orders | status, delivery_status |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:108 | findById | deliveries |  |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:111 | update | deliveries | delivery_status, failure_reason |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:116 | update | orders | delivery_status |  | SCHEMA MATCH |
| server/src/services/deliveryService.js:125 | find | deliveries | company_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:22 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:24 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:26 | findOne | ranks | code |  | SCHEMA MATCH |
| server/src/services/employeeService.js:41 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:45 | find | attendance | employee_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:50 | find | tasks | assigned_to |  | SCHEMA MATCH |
| server/src/services/employeeService.js:53 | find | okrs | employee_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:54 | find | announcements | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/employeeService.js:55 | find | holidays | date |  | SCHEMA MATCH |
| server/src/services/employeeService.js:58 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:59 | find | customers | company_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:89 | find | attendance | employee_id, date |  | SCHEMA MATCH |
| server/src/services/employeeService.js:124 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:131 | insert | face_events | employee_id, event_type, confidence, match_threshold, verified, provider |  | SCHEMA MATCH |
| server/src/services/employeeService.js:141 | update | employees | face_enrolled |  | SCHEMA MATCH |
| server/src/services/employeeService.js:160 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:188 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:189 | insert | leave_requests | company_id, employee_id, leave_type, start_date, end_date, days, reason, status |  | SCHEMA MATCH |
| server/src/services/employeeService.js:206 | find | leave_requests | employee_id, created_at |  | SCHEMA MATCH |
| server/src/services/employeeService.js:213 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:216 | find | payslips | employee_id, pay_month |  | SCHEMA MATCH |
| server/src/services/employeeService.js:237 | find | payslips | employee_id, pay_month |  | SCHEMA MATCH |
| server/src/services/employeeService.js:241 | find | okrs | employee_id |  | SCHEMA MATCH |
| server/src/services/employeeService.js:245 | findById | okrs |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:256 | update | okrs | progress, status |  | SCHEMA MATCH |
| server/src/services/employeeService.js:263 | find | tasks | assigned_to, created_at |  | SCHEMA MATCH |
| server/src/services/employeeService.js:267 | findById | tasks |  |  | SCHEMA MATCH |
| server/src/services/employeeService.js:281 | update | tasks | status, progress, completed_at |  | SCHEMA MATCH |
| server/src/services/employeeService.js:309 | find | announcements | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/employeeService.js:317 | find | employees | status, company_id |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:14 | rpc | workforce_executive_rollup | p_company_id, p_day, p_notify |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:19 | find | employees | company_id, status |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:19 | find | attendance | company_id, date |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:19 | find | workforce_movement_events | company_id |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:19 | find | workforce_activity_events | company_id |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:19 | find | collaboration_tasks | company_id |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:22 | findOne | workforce_executive_reports | company_id, report_date |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:24 | update | workforce_executive_reports | company_id, report_date, facts, generated_at |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:24 | insert | workforce_executive_reports | company_id, report_date, facts, generated_at, source |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:32 | find | workforce_movement_events | company_id, observed_at |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:32 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:39 | rpc | workforce_report_claim_ai | p_report_id, p_company_id |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:41 | findById | workforce_executive_reports |  |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:43 | update | workforce_executive_reports | ai_last_attempt_at |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:56 | update | workforce_executive_reports | narrative, source, model, ai_generated_at, ai_facts_hash, ai_claimed_until |  | SCHEMA MATCH |
| server/src/services/executiveReportService.js:59 | update | workforce_executive_reports | ai_claimed_until |  | SCHEMA MATCH |
| server/src/services/executiveService.js:21 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/executiveService.js:26 | find | collections | company_id |  | SCHEMA MATCH |
| server/src/services/executiveService.js:29 | find | customers | company_id |  | SCHEMA MATCH |
| server/src/services/executiveService.js:32 | find | employees | company_id, status |  | SCHEMA MATCH |
| server/src/services/executiveService.js:33 | find | attendance | company_id, date |  | SCHEMA MATCH |
| server/src/services/executiveService.js:39 | find | tasks | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:40 | find | visits | agent_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:41 | find | customers | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:42 | find | stores | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:43 | find | work_locations | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:63 | findOne | attendance | employee_id, company_id, date |  | SCHEMA MATCH |
| server/src/services/fieldService.js:69 | findById | work_locations |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:69 | findById | stores |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:69 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:96 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:100 | findOne | attendance | employee_id, date |  | SCHEMA MATCH |
| server/src/services/fieldService.js:133 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:193 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:224 | findOne | attendance | employee_id, date |  | SCHEMA MATCH |
| server/src/services/fieldService.js:237 | insert | location_logs | employee_id, employee_name, role, company_id, supervisor_id, timestamp, server_timestamp, local_time_lagos, latitude, longitude, accuracy, address, current_activity, activity, attendance_type, is_inside_geofence, geofence_status, status, notes |  | SCHEMA MATCH |
| server/src/services/fieldService.js:293 | find | stores | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:345 | insert | location_logs | employee_id, employee_name, role, company_id, supervisor_id, store_id, location_id, timestamp, server_timestamp, local_time_lagos, latitude, longitude, accuracy, address, current_activity, activity, attendance_type, is_inside_geofence, distance_from_store, geofence_status, status, notes |  | SCHEMA MATCH |
| server/src/services/fieldService.js:467 | rpc | save_employee_attendance | p_employee_id, p_company_id, p_record |  | SCHEMA MATCH |
| server/src/services/fieldService.js:467 | update | attendance | employee_id, company_id, supervisor_id, store_id, location_id, location_name, market, assigned_market, assigned_region, assigned_state, attendance_date, date, attendance_type, activity, clock_in, clock_in_time, clock_in_latitude, clock_in_lat, clock_in_longitude, clock_in_lng, clock_in_accuracy, clock_in_device, clock_in_address, clock_in_distance_from_store, status, notes, verification_mode, distance_meters, formatted_distance, geofence_radius, is_geofence_verified, geofence_status, is_override, override_reason, override_by, working_hours, working_duration_text, server_timestamp, local_time_lagos, updated_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:469 | rpc | save_employee_attendance | p_employee_id, p_company_id, p_record |  | SCHEMA MATCH |
| server/src/services/fieldService.js:469 | insert | attendance | employee_id, company_id, supervisor_id, store_id, location_id, location_name, market, assigned_market, assigned_region, assigned_state, attendance_date, date, attendance_type, activity, clock_in, clock_in_time, clock_in_latitude, clock_in_lat, clock_in_longitude, clock_in_lng, clock_in_accuracy, clock_in_device, clock_in_address, clock_in_distance_from_store, status, notes, verification_mode, distance_meters, formatted_distance, geofence_radius, is_geofence_verified, geofence_status, is_override, override_reason, override_by, working_hours, working_duration_text, server_timestamp, local_time_lagos, updated_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:473 | insert | location_logs | employee_id, employee_name, role, company_id, supervisor_id, store_id, location_id, assigned_market, assigned_region, assigned_state, timestamp, server_timestamp, local_time_lagos, latitude, longitude, accuracy, address, current_activity, activity, attendance_type, attendance_id, is_inside_geofence, distance_from_store, geofence_status, status, battery_level |  | SCHEMA MATCH |
| server/src/services/fieldService.js:503 | insert | location_alerts | employee_id, supervisor_id, company_id, alert_type, severity, message, details, status |  | SCHEMA MATCH |
| server/src/services/fieldService.js:516 | insert | location_alerts | employee_id, supervisor_id, company_id, alert_type, severity, message, details, status |  | SCHEMA MATCH |
| server/src/services/fieldService.js:581 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:593 | findOne | attendance | employee_id, date |  | SCHEMA MATCH |
| server/src/services/fieldService.js:628 | rpc | save_employee_attendance | p_employee_id, p_company_id, p_record |  | SCHEMA MATCH |
| server/src/services/fieldService.js:628 | update | attendance | clock_out, clock_out_time, evening_clock_out, clock_out_latitude, clock_out_lat, clock_out_longitude, clock_out_lng, clock_out_accuracy, clock_out_address, clock_out_device, working_hours, working_duration_text, attendance_type, activity, status, updated_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:631 | insert | location_logs | employee_id, employee_name, role, company_id, supervisor_id, store_id, location_id, timestamp, server_timestamp, local_time_lagos, latitude, longitude, accuracy, address, current_activity, activity, attendance_type, attendance_id, is_inside_geofence, geofence_status, status, battery_level |  | SCHEMA MATCH |
| server/src/services/fieldService.js:680 | findOne | attendance | employee_id, date |  | SCHEMA MATCH |
| server/src/services/fieldService.js:687 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:690 | findById | stores |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:702 | insert | location_logs | employee_id, role, company_id, supervisor_id, store_id, timestamp, latitude, longitude, accuracy, address, current_activity, attendance_id, is_inside_geofence, distance_from_store, battery_level |  | SCHEMA MATCH |
| server/src/services/fieldService.js:722 | insert | location_alerts | employee_id, supervisor_id, company_id, alert_type, severity, message, details, status |  | SCHEMA MATCH |
| server/src/services/fieldService.js:742 | find | location_logs | employee_id, timestamp |  | SCHEMA MATCH |
| server/src/services/fieldService.js:743 | find | stores |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:757 | find | stores |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:758 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:796 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:800 | insert | store_requests | store_name, address, store_type, contact_person, phone, latitude, longitude, accuracy, requested_by, supervisor_id, company_id, store_photo_url, storefront_photo_url, notes, status, geofence_radius, territory |  | SCHEMA MATCH |
| server/src/services/fieldService.js:836 | find | store_requests | created_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:837 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:855 | findById | store_requests |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:865 | insert | stores | code, name, store_type, contact_person, phone, email, address, territory, latitude, longitude, geofence_radius, supervisor_id, company_id, assigned_field_agents, assigned_sales_agents, status |  | SCHEMA MATCH |
| server/src/services/fieldService.js:885 | insert | customers | company_id, code, name, contact_person, phone, email, address, territory, latitude, longitude, balance, credit_limit, registered_by, status |  | SCHEMA MATCH |
| server/src/services/fieldService.js:903 | update | store_requests | status, reviewed_by, reviewed_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:928 | findById | store_requests |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:931 | update | store_requests | status, rejection_reason, reviewed_by, reviewed_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:954 | findById | stores |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:954 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:956 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:971 | insert | visits | company_id, agent_id, store_id, customer_id, status, planned_time, check_in_time, check_in_lat, check_in_lng, check_in_distance_meters, is_geofence_verified, visit_purpose, notes, shelf_share_percent |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1010 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1013 | insert | field_activities | employee_id, role, store_id, visit_id, activity_type, title, description, photo_url, latitude, longitude, timestamp, metadata |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1048 | insert | sales_activities | employee_id, store_id, customer_id, visit_id, order_id, activity_type, units_sold, amount, notes, photo_url, latitude, longitude, timestamp |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1080 | findById | visits |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1083 | findById | stores |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1083 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1097 | update | visits | status, check_in_time, check_in_lat, check_in_lng, check_in_distance_meters, is_geofence_verified |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1127 | findById | visits |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1140 | update | visits | status, check_out_time, duration_minutes, photo_evidence_url, signature_url, shelf_share_percent, out_of_stock_skus, competitor_notes, notes |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1181 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1182 | find | attendance | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1183 | find | visits | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1184 | find | location_alerts | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1259 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1260 | find | attendance | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1261 | find | stores | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1262 | find | work_locations | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1263 | find | employee_location_assignments | company_id, is_active |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1264 | find | location_logs | company_id, timestamp |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1265 | find | visits | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1266 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1409 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1412 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1413 | find | attendance | employee_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1419 | find | location_logs | employee_id, company_id, timestamp |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1423 | find | visits | agent_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1425 | find | field_activities | employee_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1426 | find | tasks | assigned_to, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1429 | find | orders | sales_agent_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1497 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1501 | find | attendance | employee_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1516 | find | location_logs | employee_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1530 | find | visits | agent_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1556 | find | orders | sales_agent_id, company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1590 | find | location_alerts | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1591 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1607 | findById | location_alerts |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1610 | update | location_alerts | status, resolved_by, resolved_at, resolution_notes |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1633 | findById | attendance |  |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1647 | update | attendance | clock_out_time, clock_out, working_hours, working_duration_text, status, is_override, override_reason |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1678 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1682 | find | visits | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1685 | find | tasks | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1688 | find | field_activities | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1709 | find | daily_summaries | company_id, date |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1711 | update | daily_summaries | date, supervisor_id, company_id, total_members, field_agents, sales_agents, present, absent, late, geofence_violations, missing_checkouts, store_visits, tasks_completed, photos_uploaded, sales_generated |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1713 | insert | daily_summaries | date, supervisor_id, company_id, total_members, field_agents, sales_agents, present, absent, late, geofence_violations, missing_checkouts, store_visits, tasks_completed, photos_uploaded, sales_generated |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1726 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1729 | find | stores | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1732 | find | attendance | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1761 | find | location_logs | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1787 | find | visits | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1809 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1810 | find | customers | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1835 | find | location_logs | company_id, timestamp |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1836 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1837 | find | work_locations | company_id |  | SCHEMA MATCH |
| server/src/services/fieldService.js:1838 | find | stores | company_id |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:103 | findOne | hr_report_settings | company_id |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:104 | find | hr_report_deliveries | company_id, updated_at |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:105 | find | hr_report_runs | company_id, id, report_date, created_at |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:110 | findOne | hr_report_settings | company_id |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:112 | update | hr_report_settings | company_id, enabled, recipients, updated_by, updated_at |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:112 | insert | hr_report_settings | company_id, enabled, recipients, updated_by, updated_at |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:119 | findAll | (dynamic) |  |  | DYNAMIC |
| server/src/services/hrDailyReportService.js:124 | findOne | hr_report_runs | company_id, report_date |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:126 | rpc | hr_report_prepare | p_company_id, p_day, p_snapshot |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:127 | findOne | hr_report_runs | company_id, report_date |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:127 | insert | hr_report_runs | company_id, report_date, snapshot |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:130 | rpc | hr_report_claim | p_company_id, p_run_id, p_recipient |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:131 | findOne | hr_report_deliveries | run_id, recipient |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:131 | update | hr_report_deliveries | company_id, run_id, recipient, state, attempts, updated_at |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:131 | insert | hr_report_deliveries | company_id, run_id, recipient, state, attempts, updated_at |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:134 | findOne | hr_report_settings | company_id |  | SCHEMA MATCH |
| server/src/services/hrDailyReportService.js:144 | update | hr_report_deliveries | updated_at |  | DYNAMIC FIELDS |
| server/src/services/hrDailyReportService.js:150 | findAll | hr_report_settings | enabled |  | SCHEMA MATCH |
| server/src/services/hrService.js:30 | find | employees | status, company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:31 | find | attendance | date, company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:32 | find | idle_alerts | company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:33 | find | workforce_activity_events | company_id, detected_at |  | SCHEMA MATCH |
| server/src/services/hrService.js:35 | find | leave_requests | status, company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:36 | find | tasks | company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:94 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:95 | find | ranks |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:96 | find | departments |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:97 | find | users |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:168 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:210 | update | employees | first_name, last_name, full_name, phone, personal_email, work_email, date_of_birth, marital_status, nationality, address, home_address, city_lga, state_of_origin, state_of_residence, landmark, staff_id, department, department_id, position, date_of_joining, work_location, supervisor_name, rank_code, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone, blood_group, bank_name, account_number, hobbies_interests, base_salary, housing_allowance, transport_allowance, status, flagged_for_review, review_reason |  | SCHEMA MATCH |
| server/src/services/hrService.js:220 | update | users |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:243 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:246 | update | employees | status, onboarding_status |  | SCHEMA MATCH |
| server/src/services/hrService.js:252 | update | users | status, onboarding_status |  | SCHEMA MATCH |
| server/src/services/hrService.js:266 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:269 | update | employees | onboarding_status, invitation_sent_at |  | SCHEMA MATCH |
| server/src/services/hrService.js:275 | update | users | onboarding_status, requires_password_change |  | SCHEMA MATCH |
| server/src/services/hrService.js:289 | find | audit_logs | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/hrService.js:309 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:313 | find | ranks |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:322 | insert | tasks | company_id, title, description, assigned_to, assigned_by, department, priority, due_date, progress, status |  | SCHEMA MATCH |
| server/src/services/hrService.js:336 | insert | notifications | employee_id, type, title, body |  | SCHEMA MATCH |
| server/src/services/hrService.js:362 | find | ranks | level |  | SCHEMA MATCH |
| server/src/services/hrService.js:367 | findOne | ranks | code |  | SCHEMA MATCH |
| server/src/services/hrService.js:370 | insert | ranks | code, name, level, description, active |  | SCHEMA MATCH |
| server/src/services/hrService.js:383 | update | ranks |  |  | DYNAMIC FIELDS |
| server/src/services/hrService.js:393 | find | ranks |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:394 | find | departments |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:395 | find | users |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:449 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:472 | update | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:482 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:486 | find | employees | reporting_manager_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:488 | update | employees | reporting_manager_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:491 | update | employees | status |  | SCHEMA MATCH |
| server/src/services/hrService.js:493 | update | users | status |  | SCHEMA MATCH |
| server/src/services/hrService.js:514 | findOne | users | email |  | SCHEMA MATCH |
| server/src/services/hrService.js:515 | findOne | users | phone |  | SCHEMA MATCH |
| server/src/services/hrService.js:515 | findOne | employees | phone |  | SCHEMA MATCH |
| server/src/services/hrService.js:516 | findOne | employees | company_id, staff_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:535 | insert | users | company_id, auth_user_id, full_name, email, phone, password_hash, role_code, status, requires_password_change |  | SCHEMA MATCH |
| server/src/services/hrService.js:547 | insert | employees | company_id, user_id, auth_user_id, employee_code, staff_id, first_name, last_name, full_name, email, work_email, phone, department_id, department, position, territory, work_location, state, lga, city, rank_code, date_of_birth, hire_date, address, status, onboarding_status |  | SCHEMA MATCH |
| server/src/services/hrService.js:563 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:568 | find | leave_balances | employee_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:568 | delete | leave_balances |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:569 | delete | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:571 | delete | users |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:583 | find | announcements | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/hrService.js:596 | insert | announcements | company_id, title, message, category, priority, target_audience, author_name, pinned, created_at |  | SCHEMA MATCH |
| server/src/services/hrService.js:616 | findById | announcements |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:619 | update | announcements | title, message, category, priority, target_audience, pinned |  | SCHEMA MATCH |
| server/src/services/hrService.js:636 | findById | announcements |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:639 | delete | announcements |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:648 | find | employees | status, company_id |  | SCHEMA MATCH |
| server/src/services/hrService.js:711 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:714 | update | employees | date_of_birth, hire_date |  | SCHEMA MATCH |
| server/src/services/hrService.js:727 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/hrService.js:732 | insert | announcements | company_id, title, message, category, priority, target_audience, author_name, pinned, created_at |  | SCHEMA MATCH |
| server/src/services/hrService.js:745 | insert | notifications | employee_id, type, title, body |  | SCHEMA MATCH |
| server/src/services/idleService.js:39 | insert | employee_idle_sessions | company_id, employee_id, start_time, end_time, idle_duration_minutes, reason, status, created_at |  | SCHEMA MATCH |
| server/src/services/idleService.js:54 | insert | idle_alerts | company_id, employee_id, alert_type, duration_seconds, reason, explanation, status |  | SCHEMA MATCH |
| server/src/services/idleService.js:65 | find | users | company_id, status |  | SCHEMA MATCH |
| server/src/services/idleService.js:68 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/idleService.js:87 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/idleService.js:116 | findById | employee_idle_sessions |  |  | SCHEMA MATCH |
| server/src/services/idleService.js:118 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/idleService.js:121 | update | employee_idle_sessions | reason, status |  | SCHEMA MATCH |
| server/src/services/idleService.js:127 | findOne | idle_alerts | company_id, employee_id, alert_type |  | SCHEMA MATCH |
| server/src/services/idleService.js:129 | update | idle_alerts | reason, explanation, status |  | SCHEMA MATCH |
| server/src/services/idleService.js:149 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/idleService.js:150 | find | employee_idle_sessions | company_id, employee_id, created_at |  | SCHEMA MATCH |
| server/src/services/idleService.js:151 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/idleService.js:153 | find | idle_alerts | company_id |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:12 | find | products | company_id |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:57 | findById | products |  |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:74 | insert | products | company_id, sku, name, category, unit, price, cost_price, stock_quantity, quantity_display, reorder_level, warehouse_name, location_of_item, condition, shelf_number, shelve_location, status |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:93 | insert | inventory_movements | company_id, product_id, movement_type, quantity, previous_quantity, new_quantity, reference_number, notes, recorded_by |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:109 | findById | products |  |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:113 | update | products | location_of_item, warehouse_name, shelf_number, shelve_location, condition |  | DYNAMIC FIELDS |
| server/src/services/inventoryService.js:125 | findById | products |  |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:128 | delete | products |  |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:130 | insert | audit_logs | company_id, user_id, user_email, action, entity, entity_id, previous_value, new_value |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:149 | findById | products |  |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:166 | update | products | stock_quantity, quantity_display |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:172 | insert | inventory_movements | company_id, product_id, warehouse_id, movement_type, quantity, previous_quantity, new_quantity, reference_number, notes, recorded_by |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:187 | insert | inventory_alerts | company_id, product_id, alert_type, severity, description, status |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:202 | find | inventory_movements | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:207 | find | products | company_id |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:218 | find | warehouses | company_id |  | SCHEMA MATCH |
| server/src/services/inventoryService.js:223 | find | products | company_id |  | SCHEMA MATCH |
| server/src/services/leaveBalanceService.js:6 | find | leave_balances | employee_id, year |  | SCHEMA MATCH |
| server/src/services/leaveBalanceService.js:12 | insert | leave_balances | employee_id, company_id, year, leave_type, allocated_days, used_days, remaining_days |  | SCHEMA MATCH |
| server/src/services/leaveBalanceService.js:19 | find | leave_balances | employee_id, year |  | SCHEMA MATCH |
| server/src/services/leaveBalanceService.js:23 | update | leave_balances | used_days, remaining_days |  | SCHEMA MATCH |
| server/src/services/leaveBalanceService.js:23 | update | leave_balances |  |  | DYNAMIC FIELDS |
| server/src/services/leaveReviewService.js:6 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/leaveReviewService.js:10 | rpc | hr_review_leave | p_company_id, p_actor_id, p_request_id, p_approve, p_reason |  | SCHEMA MATCH |
| server/src/services/leaveReviewService.js:12 | findOne | leave_requests | id, company_id |  | SCHEMA MATCH |
| server/src/services/leaveReviewService.js:18 | update | leave_requests | status, reviewed_by, reviewed_at, review_notes |  | SCHEMA MATCH |
| server/src/services/leaveReviewService.js:19 | insert | notifications | company_id, employee_id, type, title, body |  | SCHEMA MATCH |
| server/src/services/locationService.js:17 | find | work_locations | company_id |  | SCHEMA MATCH |
| server/src/services/locationService.js:46 | findById | work_locations |  |  | SCHEMA MATCH |
| server/src/services/locationService.js:93 | insert | work_locations | company_id, name, location_type, address, state, lga, city, latitude, longitude, geofence_radius, geofence_radius_meters, status, created_by, created_at, updated_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:154 | update | work_locations | updated_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:166 | find | employee_location_assignments | location_id |  | SCHEMA MATCH |
| server/src/services/locationService.js:171 | update | work_locations | status |  | SCHEMA MATCH |
| server/src/services/locationService.js:197 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/locationService.js:229 | rpc | assign_employee_workplace | p_company_id, p_employee_id, p_location_id, p_type, p_start, p_end, p_actor_id, p_actor_name, p_reason |  | SCHEMA MATCH |
| server/src/services/locationService.js:235 | findOne | employee_location_assignments | employee_id, location_id, company_id |  | SCHEMA MATCH |
| server/src/services/locationService.js:246 | findOne | employee_location_assignments | employee_id, company_id, is_primary, is_active |  | SCHEMA MATCH |
| server/src/services/locationService.js:252 | findById | work_locations |  |  | SCHEMA MATCH |
| server/src/services/locationService.js:257 | find | employee_location_assignments | employee_id, company_id, is_primary |  | SCHEMA MATCH |
| server/src/services/locationService.js:258 | update | employee_location_assignments | is_primary, is_active, updated_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:261 | update | employee_location_assignments | assignment_type, is_primary, is_active, start_date, end_date, assigned_by, updated_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:271 | insert | employee_location_assignments | company_id, employee_id, location_id, assignment_type, is_primary, is_active, start_date, end_date, assigned_by, created_at, updated_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:286 | update | employees | work_location |  | SCHEMA MATCH |
| server/src/services/locationService.js:289 | insert | location_assignment_history | company_id, employee_id, previous_location_id, previous_location_name, new_location_id, new_location_name, assignment_type, action, changed_by, changed_by_name, reason, created_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:331 | findById | employee_location_assignments |  |  | SCHEMA MATCH |
| server/src/services/locationService.js:336 | findById | work_locations |  |  | SCHEMA MATCH |
| server/src/services/locationService.js:337 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/locationService.js:340 | rpc | remove_employee_workplace | p_company_id, p_assignment_id, p_actor_id, p_actor_name, p_reason |  | SCHEMA MATCH |
| server/src/services/locationService.js:343 | update | employee_location_assignments | is_active, is_primary, updated_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:348 | update | employees | work_location |  | SCHEMA MATCH |
| server/src/services/locationService.js:349 | insert | location_assignment_history | company_id, employee_id, previous_location_id, previous_location_name, new_location_id, new_location_name, assignment_type, action, changed_by, changed_by_name, reason, created_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:380 | find | employee_location_assignments | employee_id, company_id, is_active |  | SCHEMA MATCH |
| server/src/services/locationService.js:386 | find | work_locations | company_id |  | SCHEMA MATCH |
| server/src/services/locationService.js:417 | find | location_assignment_history | employee_id, company_id, created_at |  | SCHEMA MATCH |
| server/src/services/locationService.js:453 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/locationService.js:454 | find | employee_location_assignments | company_id, is_active |  | SCHEMA MATCH |
| server/src/services/locationService.js:455 | find | work_locations | company_id |  | SCHEMA MATCH |
| server/src/services/locationService.js:456 | find | users | company_id |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:13 | rpc | nexus_operational_snapshot | p_company_id, p_period |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:15 | find | (dynamic) | company_id |  | DYNAMIC |
| server/src/services/nexusIntelligenceService.js:28 | find | nexus_intelligence_runs | company_id, period_days, created_at |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:39 | rpc | nexus_claim_generation | p_company_id |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:40 | findOne | nexus_generation_leases | company_id |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:40 | update | nexus_generation_leases | company_id, last_attempt_at |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:40 | insert | nexus_generation_leases | company_id, last_attempt_at |  | SCHEMA MATCH |
| server/src/services/nexusIntelligenceService.js:43 | insert | nexus_intelligence_runs | company_id, user_id, period_days, question_hash, evidence_hash, result, evidence, created_at |  | SCHEMA MATCH |
| server/src/services/notificationRepository.js:9 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/notificationRepository.js:11 | insert | notifications | employee_id, company_id, type, title, body, is_read |  | SCHEMA MATCH |
| server/src/services/notificationService.js:24 | find | notifications | employee_id, created_at |  | SCHEMA MATCH |
| server/src/services/notificationService.js:32 | find | collaboration_notices | user_id, company_id, created_at |  | SCHEMA MATCH |
| server/src/services/notificationService.js:56 | find | notifications | employee_id, is_read |  | SCHEMA MATCH |
| server/src/services/notificationService.js:58 | update | notifications | is_read |  | SCHEMA MATCH |
| server/src/services/notificationService.js:63 | find | collaboration_notices | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/notificationService.js:69 | findById | notifications |  |  | SCHEMA MATCH |
| server/src/services/notificationService.js:71 | update | notifications | is_read |  | SCHEMA MATCH |
| server/src/services/notificationService.js:78 | findOne | push_subscriptions | employee_id |  | SCHEMA MATCH |
| server/src/services/notificationService.js:80 | update | push_subscriptions | endpoint, subscription_json |  | SCHEMA MATCH |
| server/src/services/notificationService.js:86 | insert | push_subscriptions | employee_id, endpoint, subscription_json |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:22 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:22 | find | attendance | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:22 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:22 | find | visits | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:22 | find | customers | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:23 | find | collections | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:23 | find | products | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:23 | find | deliveries | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:23 | find | location_alerts | company_id |  | SCHEMA MATCH |
| server/src/services/operationalReportService.js:23 | find | location_logs | company_id |  | SCHEMA MATCH |
| server/src/services/reminderService.js:28 | findOne | task_reminders | idempotency_key |  | SCHEMA MATCH |
| server/src/services/reminderService.js:31 | insert | task_reminders | company_id, task_id, user_id, employee_id, reminder_at, reminder_level, channels, status, attempts, idempotency_key, created_at |  | SCHEMA MATCH |
| server/src/services/reminderService.js:53 | find | task_reminders | status |  | SCHEMA MATCH |
| server/src/services/reminderService.js:62 | find | task_reminders | task_id |  | SCHEMA MATCH |
| server/src/services/reminderService.js:65 | update | task_reminders | status |  | SCHEMA MATCH |
| server/src/services/reminderService.js:87 | insert | reminder_delivery_logs | company_id, reminder_id, task_id, user_id, channel, status, provider_message_id, error_message, sent_at, created_at |  | SCHEMA MATCH |
| server/src/services/reminderService.js:106 | find | reminder_delivery_logs | task_id, created_at |  | SCHEMA MATCH |
| server/src/services/reminderService.js:108 | find | reminder_delivery_logs | created_at |  | SCHEMA MATCH |
| server/src/services/reminderService.js:115 | find | reminder_delivery_logs |  |  | SCHEMA MATCH |
| server/src/services/reminderService.js:116 | find | tasks |  |  | SCHEMA MATCH |
| server/src/services/reminderService.js:117 | find | task_reminders |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:78 | update | task_reminders | status, attempts |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:80 | findById | tasks |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:82 | update | task_reminders | status, error_message |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:89 | update | task_reminders | status |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:102 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:103 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:103 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:113 | update | tasks | status |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:232 | find | reminder_delivery_logs | reminder_id |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:234 | update | task_reminders | status, sent_at, error_message |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:247 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:248 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:266 | find | users | role_code |  | SCHEMA MATCH |
| server/src/services/reminderWorker.js:268 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/salesService.js:27 | find | settlements | company_id, created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:28 | find | audit_logs | company_id, entity, action |  | SCHEMA MATCH |
| server/src/services/salesService.js:33 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:40 | insert | settlements | company_id, agent_id, settlement_date, total_collected, bank_transfer_amount, cash_in_hand, deposit_slip_url, reconciliation_status |  | SCHEMA MATCH |
| server/src/services/salesService.js:57 | find | orders | sales_agent_id |  | SCHEMA MATCH |
| server/src/services/salesService.js:77 | find | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:85 | find | visits | agent_id |  | SCHEMA MATCH |
| server/src/services/salesService.js:92 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:116 | find | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:134 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:144 | findOne | customers | code |  | SCHEMA MATCH |
| server/src/services/salesService.js:149 | insert | customers | company_id, code, name, contact_person, phone, email, address, territory, latitude, longitude, balance, credit_limit, registered_by, status |  | SCHEMA MATCH |
| server/src/services/salesService.js:174 | find | products |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:202 | findOne | orders | idempotency_key |  | SCHEMA MATCH |
| server/src/services/salesService.js:209 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:218 | findById | products |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:251 | insert | orders | company_id, order_number, customer_id, sales_agent_id, status, subtotal, discount_amount, vat_amount, total_amount, payment_method, payment_status, notes, idempotency_key, order_date |  | SCHEMA MATCH |
| server/src/services/salesService.js:270 | insert | order_items | company_id, order_id, product_id, quantity, unit_price, total_price |  | SCHEMA MATCH |
| server/src/services/salesService.js:281 | update | products | stock_quantity |  | SCHEMA MATCH |
| server/src/services/salesService.js:284 | insert | inventory_transactions | product_id, change_quantity, previous_quantity, new_quantity, type, reference_id, created_by |  | SCHEMA MATCH |
| server/src/services/salesService.js:297 | update | customers | balance |  | SCHEMA MATCH |
| server/src/services/salesService.js:314 | find | orders | created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:315 | find | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:316 | find | order_items |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:317 | find | products |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:347 | findOne | collections | idempotency_key |  | SCHEMA MATCH |
| server/src/services/salesService.js:352 | findById | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:359 | update | customers | balance |  | SCHEMA MATCH |
| server/src/services/salesService.js:361 | insert | collections | company_id, customer_id, agent_id, amount, payment_method, reference_number, notes, idempotency_key, payment_date |  | SCHEMA MATCH |
| server/src/services/salesService.js:387 | find | collections | payment_date |  | SCHEMA MATCH |
| server/src/services/salesService.js:388 | find | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:389 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:416 | insert | competitor_intel | agent_id, customer_id, competitor_brand, product_name, observed_price, our_price, price_difference, shelf_share_percent, promo_details, picture_url |  | SCHEMA MATCH |
| server/src/services/salesService.js:437 | find | competitor_intel | created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:438 | find | customers |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:449 | findById | orders |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:453 | update | orders | status, approved_by, approved_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:459 | insert | order_approvals | company_id, order_id, approver_id, action, comments, created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:469 | findOne | deliveries | order_id |  | SCHEMA MATCH |
| server/src/services/salesService.js:471 | insert | deliveries | company_id, order_id, customer_id, delivery_status, created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:487 | findById | orders |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:490 | update | orders | status, rejection_reason, approved_by, approved_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:497 | insert | order_approvals | company_id, order_id, approver_id, action, comments, created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:513 | findById | orders |  |  | SCHEMA MATCH |
| server/src/services/salesService.js:516 | update | orders | status, notes |  | SCHEMA MATCH |
| server/src/services/salesService.js:521 | insert | order_approvals | company_id, order_id, approver_id, action, comments, created_at |  | SCHEMA MATCH |
| server/src/services/salesService.js:538 | find | visits | company_id |  | SCHEMA MATCH |
| server/src/services/salesService.js:539 | find | orders | company_id |  | SCHEMA MATCH |
| server/src/services/salesService.js:540 | find | collections | company_id |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:39 | find | schedules | company_id, employee_id, date |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:59 | find | schedules | company_id, employee_id |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:68 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:72 | findOne | schedules | employee_id, date |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:79 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:83 | findOne | employees | rank_code, company_id |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:140 | update | schedules | company_id, employee_id, employee_name, employee_code, department, position, date, title, shift_start, shift_end, work_location, tasks, total_planned_hours, notes, status, submitted_at, supervisor_id, supervisor_name, supervisor_approval_status, supervisor_status, supervisor_reviewed_at, supervisor_notes, hr_status, hr_reviewed_at, hr_notes |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:142 | insert | schedules | company_id, employee_id, employee_name, employee_code, department, position, date, title, shift_start, shift_end, work_location, tasks, total_planned_hours, notes, status, submitted_at, supervisor_id, supervisor_name, supervisor_approval_status, supervisor_status, supervisor_reviewed_at, supervisor_notes, hr_status, hr_reviewed_at, hr_notes |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:164 | find | employees | company_id, status |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:197 | findById | schedules |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:210 | update | schedules | tasks |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:220 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:231 | find | schedules | company_id, date |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:280 | findById | schedules |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:289 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:292 | update | schedules | status, supervisor_approval_status, supervisor_status, supervisor_reviewed_at, supervisor_notes, supervisor_name |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:331 | find | schedules | company_id, date |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:332 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:380 | findById | schedules |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:386 | update | schedules | hr_status, hr_reviewed_at, hr_notes |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:407 | findById | schedules |  |  | SCHEMA MATCH |
| server/src/services/scheduleService.js:412 | delete | schedules |  |  | SCHEMA MATCH |
| server/src/services/sosService.js:18 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/sosService.js:20 | insert | sos_events | company_id, employee_id, agent_id, latitude, longitude, accuracy, message, status |  | SCHEMA MATCH |
| server/src/services/sosService.js:26 | find | users | company_id, status |  | SCHEMA MATCH |
| server/src/services/sosService.js:28 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/sosService.js:43 | findAll | sos_events | company_id |  | SCHEMA MATCH |
| server/src/services/sosService.js:43 | findAll | sos | company_id |  | SCHEMA MATCH |
| server/src/services/sosService.js:43 | find | employees | company_id |  | SCHEMA MATCH |
| server/src/services/sosService.js:54 | findById | (dynamic) |  |  | DYNAMIC |
| server/src/services/sosService.js:59 | update | (dynamic) | status, resolved_by, resolved_at, resolution_notes |  | DYNAMIC |
| server/src/services/sosService.js:60 | update | (dynamic) | status, acknowledged_by, acknowledged_at |  | DYNAMIC |
| server/src/services/staffFileImportService.js:80 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/staffFileImportService.js:80 | find | users |  |  | SCHEMA MATCH |
| server/src/services/staffFileImportService.js:80 | find | work_locations | company_id, status |  | SCHEMA MATCH |
| server/src/services/staffFileImportService.js:80 | find | departments |  |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:70 | find | users |  |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:71 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:72 | find | departments |  |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:158 | update | users | full_name, phone, raw_phone, onboarding_status |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:166 | insert | users | company_id, full_name, email, phone, raw_phone, password_hash, role_code, status, requires_password_change, onboarding_status, created_at, updated_at |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:230 | update | employees | company_id, user_id, employee_code, staff_id, first_name, last_name, full_name, personal_email, work_email, phone, date_of_birth, marital_status, nationality, address, home_address, city_lga, state_of_origin, state_of_residence, landmark, department_id, department, department_raw, position, date_of_joining, hire_date, work_location, supervisor_name, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone, blood_group, bank_name, account_number, hobbies_interests, rank_code, flagged_for_review, review_reason, onboarding_status, status, updated_at |  | SCHEMA MATCH |
| server/src/services/staffImportService.js:234 | insert | employees | company_id, user_id, employee_code, staff_id, first_name, last_name, full_name, personal_email, work_email, phone, date_of_birth, marital_status, nationality, address, home_address, city_lga, state_of_origin, state_of_residence, landmark, department_id, department, department_raw, position, date_of_joining, hire_date, work_location, supervisor_name, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone, blood_group, bank_name, account_number, hobbies_interests, rank_code, flagged_for_review, review_reason, onboarding_status, status, updated_at |  | SCHEMA MATCH |
| server/src/services/taskService.js:16 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:43 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:50 | find | ranks |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:61 | insert | tasks | company_id, assigned_to, assigned_by, supervisor_id, department_id, title, description, client_name, project_name, priority, task_type, status, delivery_stages, due_at, due_date, acknowledged_at, acknowledged_by, completed_at, created_at |  | SCHEMA MATCH |
| server/src/services/taskService.js:124 | find | tasks | company_id, due_at |  | SCHEMA MATCH |
| server/src/services/taskService.js:126 | findOne | employees | user_id |  | SCHEMA MATCH |
| server/src/services/taskService.js:129 | find | employees |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:165 | findById | tasks |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:169 | update | tasks | acknowledged_at, acknowledged_by |  | SCHEMA MATCH |
| server/src/services/taskService.js:183 | findById | tasks |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:202 | update | tasks | status, completed_at, completed_by, completion_notes, evidence_url, evidence_name, delivery_stages, progress |  | SCHEMA MATCH |
| server/src/services/taskService.js:229 | findById | tasks |  |  | SCHEMA MATCH |
| server/src/services/taskService.js:233 | update | tasks | delivery_stages |  | SCHEMA MATCH |
| server/src/services/workforceNoticeService.js:9 | find | (dynamic) | company_id, user_id, created_at |  | DYNAMIC |
| server/src/services/workforceNoticeService.js:16 | findById | (dynamic) |  |  | DYNAMIC |
| server/src/services/workforceNoticeService.js:18 | update | (dynamic) | read_at |  | DYNAMIC |
| server/src/services/workplaceAccessService.js:20 | insert | workforce_access_sessions | company_id, user_id, employee_id, token_id, state, expires_at, created_at |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:33 | find | work_locations | company_id, status |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:38 | findById | workforce_access_sessions |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:40 | findById | users |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:40 | findById | employees |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:50 | findById | workforce_access_sessions |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:66 | rpc | workforce_access_commit | p_session_id, p_user_id, p_company_id, p_action, p_data |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:68 | findById | workforce_access_sessions |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:72 | update | workforce_access_sessions | state, location_id, last_verified_at, last_seen_at, outside_since, expires_at |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:73 | insert | workforce_movement_events | company_id, user_id, employee_id, session_id, kind, location_id, observed_at, details |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:76 | update | workforce_access_sessions | last_verified_at, last_seen_at, outside_since |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:77 | update | workforce_access_sessions | last_seen_at, outside_since |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:78 | update | workforce_access_sessions | last_seen_at, outside_since |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:80 | insert | workforce_movement_events | company_id, user_id, employee_id, session_id, kind, location_id, observed_at, details |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:81 | find | workforce_access_sessions | user_id, company_id |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:81 | update | workforce_access_sessions | state, revoked_at, revoke_reason |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:82 | find | users | company_id, status |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:82 | insert | workforce_movement_notices | company_id, user_id, event_id, title, body, read_at, created_at |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:83 | findById | workforce_access_sessions |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:88 | rpc | workforce_access_commit | p_session_id, p_user_id, p_company_id, p_action, p_data |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:89 | findById | workforce_access_sessions |  |  | SCHEMA MATCH |
| server/src/services/workplaceAccessService.js:89 | update | workforce_access_sessions | state, revoked_at, revoke_reason |  | SCHEMA MATCH |
| server/src/utils/staffIdentity.js:5 | findOne | employees | user_id, company_id |  | SCHEMA MATCH |
| server/src/utils/supervisorAccess.js:11 | findById | employees |  |  | SCHEMA MATCH |
| server/src/utils/supervisorAccess.js:15 | findById | employees |  |  | SCHEMA MATCH |
| server/src/utils/supervisorAccess.js:21 | findById | (dynamic) |  |  | DYNAMIC |
| deploy/cpanel/run-job.mjs:20 | find | users | status |  | SCHEMA MATCH |
