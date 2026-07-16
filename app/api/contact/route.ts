import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';
import { checkRateLimit, contactFormLimiter } from '@/lib/rate-limit';
import { query } from '@/lib/mysql';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    const rateLimitResult = await checkRateLimit(ip, contactFormLimiter);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, email, phone, inquiryType, message, website } = body;

    // 2. Honeypot check
    if (website) {
      // Return silent 200 success to trick bots
      return NextResponse.json({ success: true, bot: true }, { status: 200 });
    }

    // 3. Zod Schema Validation
    const { contactSchema } = await import('@/lib/validations/contact');
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const id = crypto.randomUUID();

    // Insert into MySQL contact_messages table
    await query(
      'INSERT INTO contact_messages (id, name, email, phone, message, contacted) VALUES (?, ?, ?, ?, ?, ?)',
      [id, fullName, email, phone || null, message, 0]
    );

    // Send email notification to business owner via SMTP
    const recipient = process.env.CONTACT_EMAIL || process.env.SMTP_USER || 'contact@honworth.com';
    const emailSubject = `New Inquiry: ${inquiryType || 'Contact'} from ${fullName}`;
    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-md;">
        <h2 style="color: #1e3e30; border-b: 1px solid #e2e8f0; pb: 10px;">New Contact Inquiry</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType || 'General Inquiry'}</p>
        <p style="margin-top: 20px;"><strong>Message:</strong></p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 4px; border: 1px solid #e2e8f0; white-space: pre-wrap;">${message}</div>
      </div>
    `;

    try {
      await sendEmail({
        to: recipient,
        subject: emailSubject,
        html: emailHtml,
      });
    } catch (mailError) {
      console.error('Failed to send contact notification email:', mailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
