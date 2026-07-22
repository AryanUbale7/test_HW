import { NextRequest, NextResponse } from 'next/server';
import { getPersistentStoragePath } from '@/lib/storage';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Sanitize filename to prevent directory traversal
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '');
    
    if (!sanitizedFilename || sanitizedFilename.includes('..')) {
      return new NextResponse('Invalid file name', { status: 400 });
    }

    const baseDir = getPersistentStoragePath('resources');
    const filePath = path.join(baseDir, sanitizedFilename);

    // Verify file exists and read its stats
    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse('File wasn\'t available on site', { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    const fileStats = await fs.stat(filePath);

    // Serve the file dynamically
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': fileStats.size.toString(),
        'Content-Disposition': `inline; filename="${sanitizedFilename}"`,
        'Cache-Control': 'public, max-age=3600, must-revalidate',
      },
    });
  } catch (err: any) {
    console.error('Error serving resource file:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
