import mysql from 'mysql2/promise';

let pool: mysql.Pool;

export function getDbPool() {
  if (!pool) {
    const host = process.env.DB_HOST || '127.0.0.1';
    const user = process.env.DB_USER;
    const password = process.env.DB_PASSWORD;
    const database = process.env.DB_NAME;
    const port = parseInt(process.env.DB_PORT || '3306', 10);

    if (!user || !database) {
      console.warn('Database environment variables (DB_USER, DB_NAME) are missing. MySQL connection might fail.');
    }

    pool = mysql.createPool({
      host,
      user,
      password,
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

/**
 * Helper to run a SQL query and return results.
 */
export async function query<T = any>(sql: string, params: any[] = []): Promise<T> {
  const db = getDbPool();
  const [results] = await db.execute(sql, params);
  return results as T;
}
