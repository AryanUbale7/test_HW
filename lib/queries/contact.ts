import { createClient } from '@/lib/supabase/server';

/**
 * Fetches the count of unread/uncontacted leads.
 */
export async function getUnreadLeadsCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .eq('contacted', false);

  if (error) {
    console.error('Error fetching unread leads count:', error);
    return 0;
  }
  return count || 0;
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
  const supabase = await createClient();
  
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching all contact messages:', error);
    return { messages: [], total: 0 };
  }
  return { messages: data || [], total: count || 0 };
}

/**
 * Fetches the count of new leads created in the last 7 days.
 */
export async function getRecentLeadsCount(): Promise<number> {
  const supabase = await createClient();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { count, error } = await supabase
    .from('contact_messages')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  if (error) {
    console.error('Error fetching recent leads count:', error);
    return 0;
  }
  return count || 0;
}

