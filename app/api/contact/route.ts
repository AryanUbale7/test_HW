import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/mail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, inquiryType, message, consent } = body;

    if (!firstName || !email || !message || consent !== true) {
      return NextResponse.json(
        { error: 'Missing required fields or consent' },
        { status: 400 }
      );
    }

    const fullName = `${firstName} ${lastName}`.trim();

    // Insert into correct Supabase contact_messages table
    const { error: dbError } = await supabaseAdmin
      .from('contact_messages')
      .insert({
        name: fullName,
        email,
        phone: phone || null,
        message,
        contacted: false,
      });

    if (dbError) {
      console.error('Failed to insert contact message:', dbError);
    }

    // Send email notification to business owner via SMTP (without external paid tool APIs)
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
