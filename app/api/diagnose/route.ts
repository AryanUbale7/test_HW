import { NextResponse } from 'next/server';
import { query } from '@/lib/mysql';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

function getLogFiles(dir: string, fileList: string[] = []): string[] {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        // Skip node_modules and .next to avoid infinite recursion/perf issues
        if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
          getLogFiles(filePath, fileList);
        }
      } else if (file.endsWith('.log')) {
        fileList.push(filePath);
      }
    }
  } catch (e) {}
  return fileList;
}

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
    logFiles: [],
    pm2Logs: [],
  };

  // Test Database Connection
  try {
    const result = await query('SELECT 1 + 1 AS result');
    diagnostics.testConnection = 'SUCCESS';
  } catch (err: any) {
    diagnostics.testConnection = 'FAILED';
    diagnostics.error = err.message;
  }

  // Scan for log files in current directory and parent directories
  try {
    const cwd = process.cwd();
    diagnostics.cwd = cwd;
    diagnostics.logFiles = getLogFiles(cwd);
    
    // Check typical PM2 log locations
    // PM2 logs are usually in ~/.pm2/logs
    const home = process.env.HOME || process.env.USERPROFILE || '';
    if (home) {
      const pm2Dir = path.join(home, '.pm2', 'logs');
      if (fs.existsSync(pm2Dir)) {
        const pm2Files = fs.readdirSync(pm2Dir);
        diagnostics.pm2Logs = pm2Files.map(f => {
          const p = path.join(pm2Dir, f);
          const stats = fs.statSync(p);
          // Read last 2KB of each log file
          const fd = fs.openSync(p, 'r');
          const bufferSize = Math.min(2048, stats.size);
          const buffer = Buffer.alloc(bufferSize);
          fs.readSync(fd, buffer, 0, bufferSize, stats.size - bufferSize);
          fs.closeSync(fd);
          return {
            name: f,
            size: stats.size,
            mtime: stats.mtime,
            content: buffer.toString('utf8'),
          };
        });
      }
    }
  } catch (e: any) {
    diagnostics.logScanError = e.message;
  }

  return NextResponse.json(diagnostics);
}
