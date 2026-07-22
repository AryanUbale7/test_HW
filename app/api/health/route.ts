import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

export async function GET() {
  let dbStatus = 'disconnected';
  try {
    const result = await query('SELECT 1 as val');
    if (result && result.length > 0 && result[0].val === 1) {
      dbStatus = 'connected';
    }
  } catch (err) {
    dbStatus = `error: ${(err as Error).message}`;
  }

  const memory = process.memoryUsage();
  const memoryFormatted = {
    rss: `${Math.round(memory.rss / 1024 / 1024 * 100) / 100} MB`,
    heapTotal: `${Math.round(memory.heapTotal / 1024 / 1024 * 100) / 100} MB`,
    heapUsed: `${Math.round(memory.heapUsed / 1024 / 1024 * 100) / 100} MB`,
    external: `${Math.round(memory.external / 1024 / 1024 * 100) / 100} MB`,
  };

  return NextResponse.json(
    {
      status: 'ok',
      database: dbStatus,
      uptime: `${Math.round(process.uptime())}s`,
      memory: memoryFormatted,
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      env: process.env.NODE_ENV,
    },
    { status: 200 }
  );
}
