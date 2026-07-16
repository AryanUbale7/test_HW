import { query } from '@/lib/mysql';
import { GlossaryTerm } from '@/types/glossary';

function parseGlossaryTerm(row: any): GlossaryTerm {
  if (!row) return row;
  let related_term_slugs: string[] = [];
  if (row.related_term_slugs) {
    try {
      related_term_slugs = typeof row.related_term_slugs === 'string' 
        ? JSON.parse(row.related_term_slugs) 
        : row.related_term_slugs;
    } catch {
      related_term_slugs = [];
    }
  }
  return {
    id: row.id,
    term: row.term,
    slug: row.slug,
    short_definition: row.short_definition,
    full_explanation: row.full_explanation,
    arm: row.arm,
    related_term_slugs,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/**
 * Fetches all glossary terms sorted alphabetically.
 */
export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  try {
    const rows = await query<any[]>('SELECT id, term, slug, short_definition, arm, related_term_slugs FROM glossary_terms ORDER BY term ASC');
    return rows.map(parseGlossaryTerm);
  } catch (error) {
    console.error('Error fetching glossary terms:', error);
    return [];
  }
}

/**
 * Fetches a single glossary term by its slug.
 */
export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  try {
    const rows = await query<any[]>('SELECT * FROM glossary_terms WHERE slug = ? LIMIT 1', [slug]);
    if (rows.length === 0) return null;
    return parseGlossaryTerm(rows[0]);
  } catch (error) {
    console.error('Error fetching glossary term by slug:', error);
    return null;
  }
}

/**
 * Fetches all glossary slugs for static site generation.
 */
export async function getAllGlossarySlugs(): Promise<{ slug: string; updated_at: string }[]> {
  try {
    const rows = await query<any[]>('SELECT slug, updated_at FROM glossary_terms ORDER BY term ASC');
    return rows.map(r => ({
      slug: r.slug,
      updated_at: r.updated_at,
    }));
  } catch (error) {
    console.error('Error fetching glossary slugs:', error);
    return [];
  }
}

/**
 * Fetches the count of glossary terms.
 */
export async function getGlossaryTermsCount(): Promise<number> {
  try {
    const rows = await query<any[]>('SELECT COUNT(*) as count FROM glossary_terms');
    return rows[0]?.count || 0;
  } catch (error) {
    console.error('Error fetching glossary terms count:', error);
    return 0;
  }
}

/**
 * Fetches only the term and slug of all glossary terms for lightweight link matching.
 */
export async function getGlossaryTermsList(): Promise<{ term: string; slug: string }[]> {
  try {
    const rows = await query<any[]>('SELECT term, slug FROM glossary_terms ORDER BY term ASC');
    return rows;
  } catch (error) {
    console.error('Error fetching glossary terms list:', error);
    return [];
  }
}

/**
 * Fetches glossary terms by arm, sorted alphabetically, capped at a limit.
 */
export async function getGlossaryTermsByArm(arm: string, limit = 3): Promise<any[]> {
  try {
    const rows = await query<any[]>(
      'SELECT * FROM glossary_terms WHERE arm = ? ORDER BY term ASC LIMIT ?',
      [arm, limit]
    );
    return rows.map(parseGlossaryTerm);
  } catch (error) {
    console.error(`Error fetching glossary terms for arm ${arm}:`, error);
    return [];
  }
}

/**
 * Fetches glossary terms with pagination for the admin view.
 */
export async function getAdminGlossaryTerms({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
} = {}) {
  try {
    const offset = (page - 1) * limit;

    const rows = await query<any[]>(
      'SELECT * FROM glossary_terms ORDER BY term ASC LIMIT ? OFFSET ?',
      [limit, offset]
    );

    const countRows = await query<any[]>('SELECT COUNT(*) as count FROM glossary_terms');
    const total = countRows[0]?.count || 0;

    return { 
      terms: rows.map(parseGlossaryTerm) as any[], 
      total 
    };
  } catch (error) {
    console.error('Error fetching admin glossary terms:', error);
    return { terms: [], total: 0 };
  }
}
