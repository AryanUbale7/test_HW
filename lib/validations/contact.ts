/**
 * Validates a contact form submission payload.
 * @returns An error string if invalid, or null if valid.
 */
export function validateContactSubmission(body: {
  firstName?: string;
  email?: string;
  message?: string;
  consent?: boolean;
}): string | null {
  if (!body.firstName?.trim()) {
    return 'First name is required.';
  }
  if (!body.email?.trim() || !/^\S+@\S+\.\S+$/.test(body.email)) {
    return 'A valid email address is required.';
  }
  if (!body.message?.trim()) {
    return 'Message content is required.';
  }
  if (body.consent !== true) {
    return 'Consent is required to submit.';
  }
  return null;
}
