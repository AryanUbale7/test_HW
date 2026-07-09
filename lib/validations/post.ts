import { AdminPost } from '@/types/post';

/**
 * Validates a post's inputs before creating or updating.
 * @returns A dictionary of errors, empty if valid.
 */
export function validatePost(data: Partial<AdminPost>): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.title?.trim()) {
    errors.title = 'Title is required';
  }
  if (!data.slug?.trim()) {
    errors.slug = 'Slug is required';
  }
  if (!data.arm) {
    errors.arm = 'Please select an arm';
  }
  if (!data.type) {
    errors.type = 'Please select a type';
  }

  if (data.status === 'published') {
    if (!data.excerpt?.trim()) {
      errors.excerpt = 'Excerpt is required to publish';
    }
    if (!data.body?.trim()) {
      errors.body = 'Body content is required to publish';
    }
    if (data.type === 'News' && !data.cover_image_url?.trim() && !data.source_url?.trim()) {
      errors.source_url = 'Source URL is required for News posts';
    }
  }

  return errors;
}
