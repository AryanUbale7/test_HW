import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';
import { checkRateLimit, newsletterLimiter } from '@/lib/rate-limit';
import { query } from '@/lib/mysql';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // Rate Limiting check (max 10 signups per 10 mins)
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
    const { email, source } = body;

    // Zod Schema Validation
    const { newsletterSchema } = await import('@/lib/validations/newsletter');
    const validation = newsletterSchema.safeParse({ email });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    // Check if already subscribed in newsletter_subscribers
    const existing = await query<any[]>(
      'SELECT id FROM newsletter_subscribers WHERE email = ? LIMIT 1',
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json({ success: true, message: 'Already subscribed' }, { status: 200 });
    }

    const id = crypto.randomUUID();

    // Insert new subscriber into newsletter_subscribers
    await query(
      'INSERT INTO newsletter_subscribers (id, email, source) VALUES (?, ?, ?)',
      [id, email, source || 'website']
    );

    // Send Welcome Email to the Subscriber
    const welcomeSubject = 'Welcome to the Honworth Inner Circle';
    const welcomeHtml = `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; background-color: #fcfbf9; color: #1e3e30;">
        <h2 style="font-weight: normal; color: #1e3e30; border-bottom: 1px solid #e2e8f0; padding-bottom: 15px; margin-top: 0; font-size: 24px;">Welcome to the Honworth Inner Circle</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #2d3748; font-family: sans-serif;">
          Thank you for joining our community.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #2d3748; font-family: sans-serif;">
          You will now receive our exclusive insights on wealth architecture, risk mitigation, and generational transfer delivered directly to your inbox.
        </p>
        <div style="margin: 30px 0; padding: 20px; background-color: #eef1ef; border-radius: 4px; border-left: 4px solid #b89c5b;">
          <p style="margin: 0; font-family: sans-serif; font-size: 15px; color: #1e3e30; font-style: italic;">
            "Architecture is not just about what we build—it is about what we preserve."
          </p>
        </div>
        <p style="font-size: 14px; line-height: 1.6; color: #718096; font-family: sans-serif; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
          Best Regards,<br />
          <strong>The Honworth Team</strong>
        </p>
      </div>
    `;

    // Send Notification Email to Admin
    const adminNotificationSubject = `New Newsletter Subscriber: ${email}`;
    const adminNotificationHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 6px;">
        <h3 style="color: #1e3e30; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Newsletter Signup</h3>
        <p><strong>Email Address:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Source:</strong> ${escapeHtml(source || 'Website Sidebar/Footer')}</p>
        <p><strong>Signed Up At:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;

    // Execute mail send promises in background
    try {
      await Promise.all([
        // Send welcome email to subscriber
        sendEmail({
          to: email,
          subject: welcomeSubject,
          html: welcomeHtml,
        }),
        // Send notification email to admin
        sendEmail({
          to: process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'contact@honworth.com',
          subject: adminNotificationSubject,
          html: adminNotificationHtml,
        })
      ]);
    } catch (mailError) {
      console.error('Failed to send newsletter emails:', mailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Newsletter Signup API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
