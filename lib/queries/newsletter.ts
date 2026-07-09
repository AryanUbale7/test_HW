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
export async function getAllSubscribers() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('newsletter_subscribers')
    .select('*')
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('Error fetching all newsletter subscribers:', error);
    return [];
  }
  return data || [];
}
