'use server'

import { revalidatePath } from 'next/cache';
import { verifyAdminSession } from '@/lib/auth-check';
import { writeAuditLog } from '@/lib/audit';
import { query } from '@/lib/mysql';

async function upsertSetting(key: string, value: string) {
  await query(
    `INSERT INTO site_settings (id, setting_key, setting_value) 
     VALUES (UUID(), ?, ?) 
     ON DUPLICATE KEY UPDATE setting_value = ?, updated_at = CURRENT_TIMESTAMP`,
    [key, value, value]
  );
}

export async function updateLaunchSettings(formData: FormData) {
  const adminUser = await verifyAdminSession();
  const siteMode = formData.get('site_mode') as string;
  const launchDate = formData.get('launch_date') as string;

  if (!siteMode || !['live', 'coming_soon'].includes(siteMode)) {
    return { error: 'Invalid site mode.' };
  }

  try {
    await upsertSetting('site_mode', siteMode);
    if (launchDate) {
      await upsertSetting('launch_date', launchDate);
    }

    await writeAuditLog({
      adminEmail: adminUser.email,
      action: 'UPDATE_SITE_MODE',
      targetId: 'site_settings',
      details: { mode: siteMode, launchDate: launchDate || null },
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error updating launch settings:', error);
    return { error: 'Failed to update launch settings.' };
  }
}

export async function launchNow() {
  const adminUser = await verifyAdminSession();

  try {
    await upsertSetting('site_mode', 'live');

    await writeAuditLog({
      adminEmail: adminUser.email,
      action: 'LAUNCH_NOW',
      targetId: 'site_settings',
      details: { mode: 'live', launchedAt: new Date().toISOString() },
    });

    revalidatePath('/admin/dashboard');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error launching site:', error);
    return { error: 'Failed to launch site.' };
  }
}
