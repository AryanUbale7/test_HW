import { query } from '@/lib/mysql';

/**
 * Fetches the count of active newsletter subscribers.
 */
export async function getSubscribersCount(): Promise<number> {
  try {
    const rows = await query<any[]>('SELECT COUNT(*) as count FROM newsletter_subscribers');
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching subscribers count:', error);
    return 0;
  }
}

/**
 * Fetches all newsletter subscribers for the admin view.
 */
export async function getAllSubscribers({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const subscribers = await query<any[]>(
      'SELECT id, email, source, created_at as subscribed_at FROM newsletter_subscribers ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const countRows = await query<any[]>('SELECT COUNT(*) as count FROM newsletter_subscribers');
    const total = countRows[0]?.count || 0;

    return { subscribers, total };
  } catch (error) {
    console.error('Error fetching all newsletter subscribers:', error);
    return { subscribers: [], total: 0 };
  }
}

/**
 * Fetches the count of active newsletter subscribers joined in the last 7 days.
 */
export async function getRecentSubscribersCount(): Promise<number> {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const rows = await query<any[]>(
      'SELECT COUNT(*) as count FROM newsletter_subscribers WHERE created_at >= ?',
      [sevenDaysAgo]
    );
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching recent subscribers count:', error);
    return 0;
  }
}
