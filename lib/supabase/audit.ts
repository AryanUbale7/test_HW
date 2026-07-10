import { createAdminClient } from '@/lib/supabase/server';

export interface AuditLogPayload {
  adminEmail: string;
  action: 'CREATE_POST' | 'UPDATE_POST' | 'DELETE_POST' | 'CREATE_RESOURCE' | 'UPDATE_RESOURCE' | 'DELETE_RESOURCE' | 'CREATE_FAQ' | 'UPDATE_FAQ' | 'DELETE_FAQ' | 'CREATE_GLOSSARY' | 'UPDATE_GLOSSARY' | 'DELETE_GLOSSARY';
  targetId: string;
  details?: Record<string, any>;
}

/**
 * Inserts a log record into the public.admin_activity_log table.
 * Used to audit administrative actions, especially destructive operations.
 */
export async function writeAuditLog({
  adminEmail,
  action,
  targetId,
  details,
}: AuditLogPayload): Promise<void> {
  try {
    const supabase = await createAdminClient();
    const { error } = await supabase.from('admin_activity_log').insert({
      admin_email: adminEmail,
      action,
      target_id: targetId,
      details: details || {},
    });

    if (error) {
      console.error('Failed to write admin audit log:', error.message);
    }
  } catch (err) {
    console.error('Error in writeAuditLog utility:', err);
  }
}

/**
 * Fetches the most recent audit logs for dashboard view.
 */
export async function getRecentAuditLogs(limit = 10): Promise<any[]> {
  try {
    const supabase = await createAdminClient();
    const { data, error } = await supabase
      .from('admin_activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch recent audit logs:', error.message);
      return [];
    }
    return data || [];
  } catch (err) {
    console.error('Error in getRecentAuditLogs:', err);
    return [];
  }
}

