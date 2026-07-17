import { query } from '@/lib/mysql';
import crypto from 'crypto';

export interface AuditLogPayload {
  adminEmail: string;
  action: 'CREATE_POST' | 'UPDATE_POST' | 'DELETE_POST' | 'CREATE_RESOURCE' | 'UPDATE_RESOURCE' | 'DELETE_RESOURCE' | 'CREATE_FAQ' | 'UPDATE_FAQ' | 'DELETE_FAQ' | 'CREATE_GLOSSARY' | 'UPDATE_GLOSSARY' | 'DELETE_GLOSSARY';
  targetId: string;
  details?: Record<string, any>;
}

/**
 * Inserts a log record into the admin_activity_log table.
 * Used to audit administrative actions, especially destructive operations.
 */
export async function writeAuditLog({
  adminEmail,
  action,
  targetId,
  details,
}: AuditLogPayload): Promise<void> {
  try {
    const id = crypto.randomUUID();
    const detailsStr = JSON.stringify(details || {});
    await query(
      'INSERT INTO admin_activity_log (id, admin_email, action, target_id, details) VALUES (?, ?, ?, ?, ?)',
      [id, adminEmail, action, targetId, detailsStr]
    );
  } catch (err) {
    console.error('Error in writeAuditLog utility:', err);
  }
}

/**
 * Fetches the most recent audit logs for dashboard view.
 */
export async function getRecentAuditLogs(limit = 10): Promise<any[]> {
  try {
    const rows = await query<any[]>(
      'SELECT * FROM admin_activity_log ORDER BY created_at DESC LIMIT ?',
      [limit]
    );
    return rows.map(r => {
      let details = {};
      if (r.details) {
        try {
          details = typeof r.details === 'string' ? JSON.parse(r.details) : r.details;
        } catch {
          details = {};
        }
      }
      return {
        ...r,
        details
      };
    });
  } catch (err) {
    console.error('Error in getRecentAuditLogs:', err);
    return [];
  }
}
