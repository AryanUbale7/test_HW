import { z } from 'zod';
import { AdminPost } from '@/types/post';

export const postSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  slug: z.string().trim().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric and hyphens only'),
  excerpt: z.string().trim().optional().nullable(),
  body: z.string().trim().optional().nullable(),
  cover_image_url: z.string().trim().optional().nullable(),
  arm: z.enum(['Creation', 'Protection', 'Legacy', 'General', 'Pers.Fin', 'Economy']),
  type: z.enum(['Guide', 'Money Conversation', 'Note']),
  source_url: z.string().trim().url('Invalid source URL').or(z.literal('')).optional().nullable(),
  author_id: z.string().uuid('Invalid author ID').optional().nullable(),
  seo_title: z.string().trim().optional().nullable(),
  seo_description: z.string().trim().optional().nullable(),
  status: z.enum(['draft', 'published']),
}).superRefine((data, ctx) => {
  if (data.status === 'published') {
    if (!data.body || data.body.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['body'],
        message: 'Body content is required to publish',
      });
    }
  }
});

export type PostInput = z.infer<typeof postSchema>;

/**
 * Validates a post's inputs before creating or updating using Zod.
 * @returns A dictionary of errors, empty if valid.
 */
export function validatePost(data: Partial<AdminPost>): Record<string, string> {
  const payload = {
    title: data.title ?? '',
    slug: data.slug ?? '',
    excerpt: data.excerpt ?? null,
    body: data.body ?? null,
    cover_image_url: data.cover_image_url ?? null,
    arm: data.arm ?? undefined,
    type: data.type ?? undefined,
    source_url: (data.source_url && data.source_url !== '') ? data.source_url : null,
    author_id: (data.author_id && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.author_id)) ? data.author_id : null,
    seo_title: data.seo_title ?? null,
    seo_description: data.seo_description ?? null,
    status: data.status ?? 'draft',
  };

  const result = postSchema.safeParse(payload);
  const errors: Record<string, string> = {};

  if (!result.success) {
    result.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      if (!errors[field]) {
        errors[field] = err.message;
      }
    });
  }

  return errors;
}
