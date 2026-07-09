import { z } from 'zod';

export const newsletterSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address.'),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

/**
 * Validates a newsletter email address using Zod.
 * @returns An error string if invalid, or null if valid.
 */
export function validateNewsletterSignup(email?: string): string | null {
  const result = newsletterSchema.safeParse({ email });
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
}
