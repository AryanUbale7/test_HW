import { query } from '@/lib/mysql';
import { FAQ } from '@/types/faq';

/**
 * Fetches all FAQs ordered by creation date.
 */
export async function getFaqs(): Promise<FAQ[]> {
  try {
    const data = await query<any[]>('SELECT id, question, answer, arm FROM faqs ORDER BY created_at DESC');

    return data.map((f) => ({
      _id: f.id,
      question: f.question,
      answer: f.answer,
      arm: f.arm,
    }));
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

/**
 * Fetches the count of FAQs.
 */
export async function getFaqsCount(): Promise<number> {
  try {
    const rows = await query<any[]>('SELECT COUNT(*) as count FROM faqs');
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching FAQs count:', error);
    return 0;
  }
}

/**
 * Fetches all FAQs for admin dashboard.
 */
export async function getAdminFaqs({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const faqs = await query<any[]>(
      'SELECT * FROM faqs ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const countRows = await query<any[]>('SELECT COUNT(*) as count FROM faqs');
    const total = countRows[0]?.count || 0;

    return { faqs, total };
  } catch (error) {
    console.error('Error fetching admin FAQs:', error);
    return { faqs: [], total: 0 };
  }
}
