import { query } from '@/lib/mysql';

export interface SiteSettings {
  id: string;
  setting_key: string;
  setting_value: string;
  updated_at: string;
}

export async function getSiteSetting(key: string): Promise<string | null> {
  try {
    const rows = await query<SiteSettings[]>(
      'SELECT setting_value FROM site_settings WHERE setting_key = ? LIMIT 1',
      [key]
    );
    return rows.length > 0 ? rows[0].setting_value : null;
  } catch (error) {
    console.error(`Error fetching site setting "${key}":`, error);
    return null;
  }
}

export async function getLaunchSettings(): Promise<{
  siteMode: 'live' | 'coming_soon';
  launchDate: string | null;
}> {
  try {
    const rows = await query<SiteSettings[]>(
      'SELECT setting_key, setting_value FROM site_settings WHERE setting_key IN (?, ?)',
      ['site_mode', 'launch_date']
    );
    const map = new Map(rows.map(r => [r.setting_key, r.setting_value]));
    return {
      siteMode: (map.get('site_mode') as 'live' | 'coming_soon') || 'live',
      launchDate: map.get('launch_date') || null,
    };
  } catch (error) {
    console.error('Error fetching launch settings:', error);
    return { siteMode: 'live', launchDate: null };
  }
}
