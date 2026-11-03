// The verified source copy remains intact. Apply only the named additive application upgrade.
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
