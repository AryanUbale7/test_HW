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

    const candidatePaths: string[] = [
      // 1. Explicit PERSISTENT_STORAGE_DIR environment variable
      process.env.PERSISTENT_STORAGE_DIR ? path.join(process.env.PERSISTENT_STORAGE_DIR, 'resources', sanitizedFilename) : null,
      // 2. Direct 1-level parent (standard local / standard hosting)
      path.join(process.cwd(), '..', 'honworth-storage', 'resources', sanitizedFilename),
      // 3. 2-level parent (Hostinger domains/domain.com/public_html layout)
      path.join(process.cwd(), '..', '..', 'honworth-storage', 'resources', sanitizedFilename),
      // 4. 3-level parent (deep nested layout)
      path.join(process.cwd(), '..', '..', '..', 'honworth-storage', 'resources', sanitizedFilename),
      // 5. Explicit Hostinger user root path
      path.join('/home/u321533764/honworth-storage/resources', sanitizedFilename),
      // 6. Historical public/resources in current working directory
      path.join(process.cwd(), 'public', 'resources', sanitizedFilename),
      // 7. Historical public/resources in parent directory
      path.join(process.cwd(), '..', 'public', 'resources', sanitizedFilename),
    ].filter((p): p is string => Boolean(p));

    let validFilePath: string | null = null;
    for (const candidate of candidatePaths) {
      try {
        await fs.access(candidate);
        validFilePath = candidate;
        break;
      } catch {
        // Continue to next candidate
      }
    }

    if (!validFilePath) {
      return new NextResponse('File wasn\'t available on site', { status: 404 });
    }

    const fileBuffer = await fs.readFile(validFilePath);
    const fileStats = await fs.stat(validFilePath);

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
