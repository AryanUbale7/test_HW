import { createClient, createReadOnlyClient } from '@/lib/supabase/server';
import { GlossaryTerm } from '@/types/glossary';

/**
 * Fetches all glossary terms sorted alphabetically.
 */
export async function getAllGlossaryTerms(): Promise<GlossaryTerm[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .order('term', { ascending: true });

  if (error) {
    console.error('Error fetching glossary terms:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetches a single glossary term by its slug.
 */
export async function getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !data) return null;
  return data;
}

/**
 * Fetches all glossary slugs for static site generation.
 */
export async function getAllGlossarySlugs(): Promise<{ slug: string; updated_at: string }[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('slug, updated_at')
    .order('term', { ascending: true });

  if (error) {
    console.error('Error fetching glossary slugs:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetches the count of glossary terms.
 */
export async function getGlossaryTermsCount(): Promise<number> {
  const supabase = createReadOnlyClient();
  const { count, error } = await supabase
    .from('glossary_terms')
    .select('*', { count: 'exact', head: true });

  if (error) {
    console.error('Error fetching glossary terms count:', error);
    return 0;
  }
  return count || 0;
}

/**
 * Fetches only the term and slug of all glossary terms for lightweight link matching.
 */
export async function getGlossaryTermsList(): Promise<{ term: string; slug: string }[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('term, slug')
    .order('term', { ascending: true });

  if (error) {
    console.error('Error fetching glossary terms list:', error);
    return [];
  }
  return data || [];
}

/**
 * Fetches glossary terms by arm, sorted alphabetically, capped at a limit.
 */
export async function getGlossaryTermsByArm(arm: string, limit = 3): Promise<any[]> {
  const supabase = createReadOnlyClient();
  const { data, error } = await supabase
    .from('glossary_terms')
    .select('*')
    .eq('arm', arm)
    .order('term', { ascending: true })
    .limit(limit);

  if (error) {
    console.error(`Error fetching glossary terms for arm ${arm}:`, error);
    return [];
  }
  return data || [];
}
