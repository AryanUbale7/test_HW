import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  lastName: z.string().trim().optional(),
  email: z.string().trim().email('A valid email address is required.'),
  phone: z.string().trim().optional(),
  inquiryType: z.string().trim().optional(),
  message: z.string().trim().min(1, 'Message content is required.'),
  consent: z.literal(true, {
    message: 'Consent is required to submit.'
  }),
  website: z.string().trim().optional(), // honeypot
});

export type ContactInput = z.infer<typeof contactSchema>;

/**
 * Validates a contact form submission payload using Zod.
 * @returns An error string if invalid, or null if valid.
 */
export function validateContactSubmission(body: any): string | null {
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
}
