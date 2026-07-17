import { NextResponse } from 'next/server';
import { getLaunchSettings } from '@/lib/queries/site-settings';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await getLaunchSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return NextResponse.json({ siteMode: 'live', launchDate: null });
  }
}
