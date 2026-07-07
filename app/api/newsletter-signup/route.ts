import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const { data: existing } = await supabaseAdmin
      .from('NewsletterSubscriber')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      // Return success but indicate already subscribed
      return NextResponse.json({ success: true, message: 'Already subscribed' }, { status: 200 });
    }

    // Insert new subscriber
    const { error: dbError } = await supabaseAdmin
      .from('NewsletterSubscriber')
      .insert({
        email,
        source: 'Website Footer',
      });

    if (dbError) {
      console.error('Failed to insert newsletter subscriber:', dbError);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
