/**
 * Generates a URL-safe slug from a string.
 * @param text The input text to slugify.
 * @returns A lowercased, trimmed, hyphenated string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-alphanumeric/non-space/non-hyphen characters
    .replace(/[\s_]+/g, '-')  // Replace spaces and underscores with a single hyphen
    .replace(/-+/g, '-')      // Replace multiple consecutive hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens
}
