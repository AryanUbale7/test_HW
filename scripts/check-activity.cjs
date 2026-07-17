const mysql = require('mysql2/promise');

async function checkLogs() {
  const host = 'srv1991.hstgr.io';
  const user = 'u321533764_honworth_user';
  const password = 'Honworth@rahulwins404';
  const database = 'u321533764_honworth_db';

  console.log('Fetching logs from Hostinger database...');
  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port: 3306,
    });

    const [rows] = await connection.execute('SELECT * FROM admin_activity_log ORDER BY created_at DESC LIMIT 20');
    console.log(`✅ SUCCESS: Total logs found: ${rows.length}`);
    rows.forEach((r, i) => {
      console.log(`${i+1}. Email: ${r.admin_email} | Action: ${r.action} | TargetID: ${r.target_id} | CreatedAt: ${r.created_at}`);
    });

    await connection.end();
  } catch (err) {
    console.error('❌ ERROR:', err);
  }
}

checkLogs();
