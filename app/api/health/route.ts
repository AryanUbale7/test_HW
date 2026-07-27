import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import { verifyAdminSession } from '@/lib/auth-check';

/**
 * Public health check — returns only { status: "ok" }.
 * Detailed diagnostics (database, memory, node version) require admin authentication
 * and must be requested via ?detail=true.
 */
export async function GET(request: Request) {
  // Public health probe — no sensitive information
  const url = new URL(request.url);
  const wantsDetail = url.searchParams.get('detail') === 'true';

  if (!wantsDetail) {
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }

  // Detailed diagnostics require authenticated admin session
  try {
    await verifyAdminSession();
  } catch {
    return NextResponse.json({ status: 'ok' }, { status: 200 });
  }

  // Admin-authenticated: return full diagnostics
  let dbStatus = 'disconnected';
  try {
    const result = await query('SELECT 1 as val');
    if (result && result.length > 0 && result[0].val === 1) {
      dbStatus = 'connected';
    }
  } catch {
    dbStatus = 'error';
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
    },
    { status: 200 }
  );
}
