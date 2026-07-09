import { createClient, createReadOnlyClient } from '@/lib/supabase/server';
import { FAQ } from '@/types/faq';

/**
 * Fetches all FAQs ordered by creation date.
 */
export async function getFaqs(): Promise<FAQ[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('id, question, answer, arm')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }

  return (
    data?.map((f) => ({
      _id: f.id,
      question: f.question,
      answer: f.answer,
      arm: f.arm,
    })) || []
  );
}

/**
 * Fetches the count of FAQs.
 */
export async function getFaqsCount(): Promise<number> {
  const supabase = createReadOnlyClient();
  const { count, error } = await supabase
    .from('faqs')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching FAQs count:', error);
    return 0;
  }
  return count || 0;
}

/**
 * Fetches all FAQs for admin dashboard.
 */
export async function getAdminFaqs() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching admin FAQs:', error);
    return [];
  }
  return data || [];
}
