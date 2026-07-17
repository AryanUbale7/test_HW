import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uploadsDir = '/home/u321533764/domains/honworth.in/nodejs/public/uploads';
  let files: string[] = [];
  let dirExists = false;
  let dirError = '';

  try {
    if (fs.existsSync(uploadsDir)) {
      dirExists = true;
      files = fs.readdirSync(uploadsDir);
    }
  } catch (e: any) {
    dirError = e.message;
  }

  const diagnostics: any = {
    uploadsDir,
    dirExists,
    files,
    dirError,
  };

  try {
    const result = await query('SELECT 1 + 1 AS result');
    diagnostics.testConnection = 'SUCCESS';
  } catch (err: any) {
    diagnostics.testConnection = 'FAILED';
    diagnostics.error = err.message;
  }

  return NextResponse.json(diagnostics);
}
