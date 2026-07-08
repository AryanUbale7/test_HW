import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, resourceId } = body;

    if (!email || !resourceId) {
      return NextResponse.json(
        { error: 'Email and resourceId are required' },
        { status: 400 }
      );
    }

    // Insert lead into newsletter_subscribers table (for gated resource downloads)
    const { data: existing } = await supabaseAdmin
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (!existing) {
      await supabaseAdmin
        .from('newsletter_subscribers')
        .insert({
          email,
          source: `resource_download:${resourceId}`,
        });
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
