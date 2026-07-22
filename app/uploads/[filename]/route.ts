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

    const baseDir = getPersistentStoragePath('uploads');
    const filePath = path.join(baseDir, sanitizedFilename);

    // Verify file exists
    try {
      await fs.access(filePath);
    } catch {
      return new NextResponse('Image not found', { status: 404 });
    }

    const fileBuffer = await fs.readFile(filePath);
    const fileStats = await fs.stat(filePath);

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
