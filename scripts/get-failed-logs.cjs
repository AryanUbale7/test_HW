const mysql = require('mysql2/promise');

async function getFailedLogs() {
  const host = 'srv1991.hstgr.io';
  const user = 'u321533764_honworth_user';
  const password = 'Honworth@rahulwins404';
  const database = 'u321533764_honworth_db';

  console.log('Fetching error logs from admin_activity_log...');
  try {
    const connection = await mysql.createConnection({
      host,
      user,
      password,
      database,
      port: 3306,
    });

    const [rows] = await connection.execute(
      `SELECT * FROM admin_activity_log 
       WHERE target_id IN ('VALIDATION_FAILED', 'DB_ERROR', 'SLUG_TAKEN') 
       ORDER BY created_at DESC LIMIT 5`
    );

    console.log(`✅ SUCCESS: Total error/failed logs found: ${rows.length}`);
    rows.forEach((r, i) => {
      console.log(`\n--- Log #${i+1} ---`);
      console.log(`Action: ${r.action}`);
      console.log(`Target: ${r.target_id}`);
      console.log(`Created At: ${r.created_at}`);
      console.log(`Details:`, JSON.parse(r.details));
    });

    await connection.end();
  } catch (err) {
    console.error('❌ ERROR:', err);
  }
}

getFailedLogs();
