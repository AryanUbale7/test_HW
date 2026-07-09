/**
 * Validates a newsletter email address.
 * @returns An error string if invalid, or null if valid.
 */
export function validateNewsletterSignup(email?: string): string | null {
  if (!email?.trim()) {
    return 'Email is required.';
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return 'Please provide a valid email address.';
  }
  return null;
}
