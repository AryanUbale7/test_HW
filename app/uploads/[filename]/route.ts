import { NextRequest, NextResponse } from 'next/server';
import { getPersistentStoragePath } from '@/lib/storage';
import path from 'path';
import { promises as fs } from 'fs';

const MIME_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  svg: 'image/svg+xml',
};

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
      process.env.PERSISTENT_STORAGE_DIR ? path.join(process.env.PERSISTENT_STORAGE_DIR, 'uploads', sanitizedFilename) : null,
      // 2. Direct 1-level parent (standard local / standard hosting)
      path.join(process.cwd(), '..', 'honworth-storage', 'uploads', sanitizedFilename),
      // 3. 2-level parent (Hostinger domains/domain.com/public_html layout)
      path.join(process.cwd(), '..', '..', 'honworth-storage', 'uploads', sanitizedFilename),
      // 4. 3-level parent (deep nested layout)
      path.join(process.cwd(), '..', '..', '..', 'honworth-storage', 'uploads', sanitizedFilename),
      // 5. Explicit Hostinger user root path
      path.join('/home/u321533764/honworth-storage/uploads', sanitizedFilename),
      // 6. Historical public/uploads in current working directory
      path.join(process.cwd(), 'public', 'uploads', sanitizedFilename),
      // 7. Historical public/uploads in parent directory
      path.join(process.cwd(), '..', 'public', 'uploads', sanitizedFilename),
    ].filter((p): p is string => Boolean(p));

    let validFilePath: string | null = null;
    for (const candidate of candidatePaths) {
      try {
        await fs.access(candidate);
        validFilePath = candidate;
        break;
      } catch {
        // Continue to fallback location
      }
    }

    if (!validFilePath) {
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = await fs.readFile(validFilePath);
    const fileStats = await fs.stat(validFilePath);

    // Resolve MIME type
    const ext = sanitizedFilename.split('.').pop()?.toLowerCase() || '';
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // Serve the image dynamically
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': fileStats.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (err: any) {
    console.error('Error serving upload file:', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
