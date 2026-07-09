/**
 * Formats a date string or Date object into a readable US-style date format: e.g. "Jul 9, 2026".
 * @param date The date string or Date object.
 * @param options Optional custom DateTimeFormatOptions.
 * @returns The formatted date string.
 */
export function formatDate(
  date: string | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
