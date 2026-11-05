import { operationalIndexes } from './operationalIndexes.js';
import { columnDefinition, sqlIdentifier } from './mysqlSchema.js';

export async function upgradeMysqlStaffNumbering(pool,database){
 const connection=await pool.getConnection(),lock=`edgewforce:numbering-upgrade:${database}`.slice(0,64);let locked=false;
 try{
  const [r]=await connection.execute('SELECT GET_LOCK(?, 30) AS acquired',[lock]);if(Number(r[0]?.acquired)!==1)throw new Error('Employee numbering schema upgrade is busy.');locked=true;
  const [tables]=await connection.execute('SELECT table_name FROM information_schema.tables WHERE table_schema = ? AND table_name = ?',[database,'employees']);if(!tables.length)return;
  const [columns]=await connection.execute('SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?',[database,'employees']);const present=new Set(columns.map(c=>c.COLUMN_NAME||c.column_name));
  for(const [name,type] of Object.entries({numbering_department_code:'VARCHAR(3) NULL',numbering_hire_year:'INT NULL',employee_number_assigned_at:'DATETIME(6) NULL',deleted_at:'DATETIME(6) NULL',deleted_by:'INT NULL',deletion_reason:'TEXT NULL'}))if(!present.has(name))await connection.query(`ALTER TABLE employees ADD COLUMN ${sqlIdentifier(name)} ${type}`);
  await connection.query("CREATE TABLE IF NOT EXISTS employee_number_counters(id VARCHAR(32) PRIMARY KEY,department_code VARCHAR(3) NOT NULL,hiring_year INT NOT NULL,last_value INT NOT NULL,UNIQUE KEY employee_counter_department_year(department_code,hiring_year),CHECK(last_value BETWEEN 0 AND 9999))");
  await connection.query("CREATE TABLE IF NOT EXISTS employee_number_registry(id VARCHAR(11) PRIMARY KEY,company_id INT NOT NULL,employee_id INT NULL UNIQUE,department_code VARCHAR(3) NOT NULL,hiring_year INT NOT NULL,sequence INT NOT NULL,legacy_employee_code TEXT NULL,legacy_staff_id TEXT NULL,issued_at DATETIME(6) NOT NULL,issued_by INT NULL,UNIQUE KEY employee_number_department_year_sequence(department_code,hiring_year,sequence),CHECK(sequence BETWEEN 1 AND 9999))");
 }finally{try{if(locked)await connection.execute('SELECT RELEASE_LOCK(?)',[lock]);}finally{connection.release();}}
}

// The verified source copy remains intact. Apply only named application upgrades.
export async function upgradeMysqlSchedules(pool, database) {
  const connection = await pool.getConnection();
  let locked = false;
  const lock = `edgewforce:schedule-upgrade:${database}`.slice(0, 64);
  try {
    const [result] = await connection.execute('SELECT GET_LOCK(?, 30) AS acquired', [lock]);
    if (Number(result[0]?.acquired) !== 1) throw new Error('Schedule schema upgrade is busy. Retry startup.');
    locked = true;
    const [rows] = await connection.execute('SELECT column_name FROM information_schema.columns WHERE table_schema = ? AND table_name = ?', [database, 'schedules']);
    const existing = new Set(rows.map(r => r.COLUMN_NAME || r.column_name));
    const additions = { employee_name: 'LONGTEXT NULL', employee_code: 'LONGTEXT NULL', department: 'LONGTEXT NULL', position: 'LONGTEXT NULL', title: 'LONGTEXT NULL', submitted_at: 'DATETIME(6) NULL', supervisor_status: 'LONGTEXT NULL', hr_status: 'LONGTEXT NULL' };
    for (const [name, type] of Object.entries(additions)) if (!existing.has(name)) await connection.query(`ALTER TABLE schedules ADD COLUMN \`${name}\` ${type}`);
    await connection.query("UPDATE schedules s LEFT JOIN employees e ON e.id=s.employee_id AND e.company_id=s.company_id SET s.employee_name=COALESCE(s.employee_name, CONCAT_WS(' ',e.first_name,e.last_name)), s.employee_code=COALESCE(s.employee_code,e.employee_code), s.department=COALESCE(s.department,e.department), s.position=COALESCE(s.position,e.position), s.title=COALESCE(s.title,CONCAT('Daily Schedule - ',s.date)), s.supervisor_status=COALESCE(s.supervisor_status,UPPER(s.supervisor_approval_status),'PENDING'), s.hr_status=COALESCE(s.hr_status,IF(s.hr_reviewed_at IS NULL,'PENDING','ACKNOWLEDGED')) WHERE s.supervisor_status IS NULL OR s.hr_status IS NULL OR s.title IS NULL");
  } finally {
    try { if (locked) await connection.execute('SELECT RELEASE_LOCK(?)', [lock]); } finally { connection.release(); }
  }
}

export async function upgradeMysqlOperationalIndexes(pool, database) {
  const connection = await pool.getConnection();
  const lock = `edgewforce:operational-upgrade:${database}`.slice(0, 64);
  let locked = false;
  try {
    const [result] = await connection.execute('SELECT GET_LOCK(?, 30) AS acquired', [lock]);
    if (Number(result[0]?.acquired) !== 1) throw new Error('Operational schema upgrade is busy. Retry startup.');
    locked = true;
    const [indexes] = await connection.execute('SELECT TABLE_NAME AS table_name, INDEX_NAME AS index_name, NON_UNIQUE AS non_unique, GROUP_CONCAT(COLUMN_NAME ORDER BY SEQ_IN_INDEX) AS columns_list FROM information_schema.statistics WHERE TABLE_SCHEMA = ? GROUP BY TABLE_NAME,INDEX_NAME,NON_UNIQUE', [database]);
    const balanceColumns = 'company_id,employee_id,year,leave_type';
    if (!indexes.some(i => i.table_name === 'leave_balances' && Number(i.non_unique) === 0 && i.columns_list === balanceColumns)) {
      const [duplicates] = await connection.query('SELECT 1 FROM leave_balances GROUP BY company_id,employee_id,year,leave_type HAVING COUNT(*) > 1 LIMIT 1');
      if (duplicates.length) throw new Error('Duplicate leave balances require review. No records have been removed.');
      const [longTypes] = await connection.query('SELECT 1 FROM leave_balances WHERE CHAR_LENGTH(leave_type) > 255 LIMIT 1');
      if (longTypes.length) throw new Error('A leave type exceeds 255 characters. Review it before upgrading; no values were truncated.');
      await connection.query("SET SESSION sql_mode = CONCAT_WS(',', @@SESSION.sql_mode, 'STRICT_ALL_TABLES')");
      await connection.query('ALTER TABLE leave_balances MODIFY COLUMN leave_type VARCHAR(255) NULL');
      await connection.query('CREATE UNIQUE INDEX edgewforce_leave_balance_unique ON leave_balances(company_id,employee_id,year,leave_type)');
    }
    for (const [name, table, columns] of operationalIndexes) {
      if (indexes.some(i => i.table_name === table && i.index_name === name)) continue;
      const keys = columns.map(column => {
        const definition = columnDefinition(table, column);
        const prefix = definition.format === 'text' ? '(128)' : '';
        return sqlIdentifier(column) + prefix + (/_at$/.test(column) ? ' DESC' : '');
      });
      await connection.query(`CREATE INDEX ${sqlIdentifier(name)} ON ${sqlIdentifier(table)} (${keys.join(',')})`);
    }
  } finally {
    try { if (locked) await connection.execute('SELECT RELEASE_LOCK(?)', [lock]); } finally { connection.release(); }
  }
}
