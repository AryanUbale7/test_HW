import { NextResponse } from 'next/server';
import { getMoneyConversationsMapping } from '@/lib/queries/posts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const mapping = await getMoneyConversationsMapping();
    return NextResponse.json(mapping, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('API Error fetching mapping:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
