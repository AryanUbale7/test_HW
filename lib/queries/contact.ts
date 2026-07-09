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
export async function getAllContactMessages() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all contact messages:', error);
    return [];
  }
  return data || [];
}
