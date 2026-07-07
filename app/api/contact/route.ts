import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabaseAdmin } from '@/lib/supabase/admin';

// Initialize Resend. Will gracefully fail if API key is not present.
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, inquiryType, message, consent } = body;

    // Basic validation
    if (!firstName || !email || !message || consent !== true) {
      return NextResponse.json(
        { error: 'Missing required fields or consent' },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('ContactMessage')
      .insert({
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone: phone || null,
        message,
        consentGiven: consent,
      });

    if (dbError) {
      console.error('Failed to insert contact message into DB:', dbError);
      // We log but continue, so they still get the email notification at least
    }

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Honworth Inquiries <onboarding@resend.dev>',
        to: process.env.CONTACT_EMAIL || 'contact@honworth.com',
        subject: `New Inquiry: ${inquiryType} from ${firstName} ${lastName}`,
        html: `
          <h3>New Contact Form Submission</h3>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Type:</strong> ${inquiryType}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <p><em>User explicitly consented to data processing.</em></p>
        `
      });
    } else {
      console.log('RESEND_API_KEY not found. Logging form submission:', body);
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
