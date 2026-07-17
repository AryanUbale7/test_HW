import { NextResponse } from 'next/server';
import { checkRateLimit, newsletterLimiter } from '@/lib/rate-limit';
import { query } from '@/lib/mysql';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // Rate Limiting check
    const rawIp = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const ip = rawIp.split(',')[0].trim();
    const rateLimitResult = await checkRateLimit(ip, newsletterLimiter);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, resourceId } = body;

    const { z } = await import('zod');
    const schema = z.object({
      email: z.string().trim().email('Please provide a valid email address.'),
      resourceId: z.string().trim().min(1, 'Resource ID is required.'),
    });

    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    // Insert lead into newsletter_subscribers table (for gated resource downloads)
    const existing = await query<any[]>(
      'SELECT id FROM newsletter_subscribers WHERE email = ? LIMIT 1',
      [email]
    );

    if (existing.length === 0) {
      const id = crypto.randomUUID();
      await query(
        'INSERT INTO newsletter_subscribers (id, email, source) VALUES (?, ?, ?)',
        [id, email, `resource_download:${resourceId}`]
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Lead Capture API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
