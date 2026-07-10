export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  short_definition: string;
  full_explanation?: string | null;
  arm: string | null;
  related_term_slugs?: string[];
  created_at?: string;
  updated_at?: string;
}
