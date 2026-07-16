import { query } from '@/lib/mysql';

/**
 * Fetches the count of unread/uncontacted leads.
 */
export async function getUnreadLeadsCount(): Promise<number> {
  try {
    const rows = await query<any[]>('SELECT COUNT(*) as count FROM contact_messages WHERE contacted = 0');
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching unread leads count:', error);
    return 0;
  }
}

/**
 * Fetches all contact messages for the admin view.
 */
export async function getAllContactMessages({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const messages = await query<any[]>(
      'SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const countRows = await query<any[]>('SELECT COUNT(*) as count FROM contact_messages');
    const total = countRows[0]?.count || 0;

    // Convert 0/1 to boolean
    const formattedMessages = messages.map(m => ({
      ...m,
      contacted: Boolean(m.contacted)
    }));

    return { messages: formattedMessages, total };
  } catch (error) {
    console.error('Error fetching all contact messages:', error);
    return { messages: [], total: 0 };
  }
}

/**
 * Fetches the count of new leads created in the last 7 days.
 */
export async function getRecentLeadsCount(): Promise<number> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const rows = await query<any[]>(
      'SELECT COUNT(*) as count FROM contact_messages WHERE created_at >= ?',
      [sevenDaysAgo]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching recent leads count:', error);
    return 0;
  }
}
