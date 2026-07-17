import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function readLastLines(filePath: string, lineCount = 50): string {
  try {
    if (!fs.existsSync(filePath)) return `File not found: ${filePath}`;
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    return lines.slice(-lineCount).join('\n');
  } catch (e: any) {
    return `Error reading file ${filePath}: ${e.message}`;
  }
}

export async function GET() {
  const consoleLogPath = '/home/u321533764/domains/honworth.in/nodejs/console.log';
  const stderrLogPath = '/home/u321533764/domains/honworth.in/nodejs/stderr.log';

  const diagnostics: any = {
    testConnection: null,
    error: null,
    consoleLog: readLastLines(consoleLogPath),
    stderrLog: readLastLines(stderrLogPath),
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
