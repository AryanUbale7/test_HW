import { createClient } from '@/lib/supabase/server';

/**
 * Fetches the count of active newsletter subscribers.
 */
export async function getSubscribersCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching subscribers count:', error);
    return 0;
  }
  return count || 0;
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
  const supabase = await createClient();
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact' })
    .order('subscribed_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching all newsletter subscribers:', error);
    return { subscribers: [], total: 0 };
  }
  return { subscribers: data || [], total: count || 0 };
}

/**
 * Fetches the count of active newsletter subscribers joined in the last 7 days.
 */
export async function getRecentSubscribersCount(): Promise<number> {
  const supabase = await createClient();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { count, error } = await supabase
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true })
    .gte('subscribed_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching recent subscribers count:', error);
    return 0;
  }
  return count || 0;
}

