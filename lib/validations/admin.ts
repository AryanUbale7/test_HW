import { z } from 'zod';

// Login Validation Schema
export const loginSchema = z.object({
  email: z.string().trim().email('A valid email address is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

// Resource Validation Schema
export const resourceSchema = z.object({
  title: z.string().trim().min(1, 'Title is required.'),
  description: z.string().trim().optional().nullable(),
  file_url: z.string().trim().optional().nullable(),
  gated_by_email: z.boolean().default(false),
});

// FAQ Validation Schema
export const faqSchema = z.object({
  question: z.string().trim().min(1, 'Question is required.'),
  answer: z.string().trim().min(1, 'Answer is required.'),
  arm: z.enum(['Creation', 'Protection', 'Legacy', 'General']),
  order_index: z.coerce.number().int().default(0),
});

// Glossary Validation Schema
export const glossarySchema = z.object({
  term: z.string().trim().min(1, 'Term is required.'),
  slug: z.string().trim().min(1, 'Slug is required.').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens only'),
  short_definition: z.string().trim().min(1, 'Short definition is required.').max(500, 'Keep definition concise (under 500 chars)'),
  full_explanation: z.string().trim().optional().nullable(),
  arm: z.enum(['Creation', 'Protection', 'Legacy', 'General']),
  related_term_slugs: z.array(z.string().trim()).optional().nullable(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ResourceInput = z.infer<typeof resourceSchema>;
export type FaqInput = z.infer<typeof faqSchema>;
export type GlossaryInput = z.infer<typeof glossarySchema>;
