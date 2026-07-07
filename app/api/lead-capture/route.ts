import { NextResponse } from 'next/server';

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

    // STUB: Here you would integrate with your CRM, Mailchimp, ConvertKit, etc.
    console.log(`Lead captured: ${email} downloaded resource ${resourceId}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
