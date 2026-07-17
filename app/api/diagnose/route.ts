import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics: any = {
    env: {
      DB_HOST: process.env.DB_HOST ? 'SET (hidden)' : 'MISSING',
      DB_USER: process.env.DB_USER ? 'SET (hidden)' : 'MISSING',
      DB_NAME: process.env.DB_NAME ? 'SET (hidden)' : 'MISSING',
      DB_PORT: process.env.DB_PORT || '3306',
      DB_HOST_VALUE: process.env.DB_HOST || '127.0.0.1',
      NODE_ENV: process.env.NODE_ENV,
    },
    testConnection: null,
    error: null,
  };

  try {
    const result = await query('SELECT 1 + 1 AS result');
    diagnostics.testConnection = 'SUCCESS';
    diagnostics.result = result;
  } catch (err: any) {
    diagnostics.testConnection = 'FAILED';
    diagnostics.error = err.message;
  }

  return NextResponse.json(diagnostics);
}
