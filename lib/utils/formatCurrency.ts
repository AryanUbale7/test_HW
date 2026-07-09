/**
 * Formats a numeric value into Indian Rupee (INR) currency format with custom shorthand (L, Cr) for larger values.
 * @param val The numeric value to format.
 * @returns The formatted currency string.
 */
export function formatCurrency(val: number): string {
  if (val >= 10_000_000) {
    return `₹${(val / 10_000_000).toFixed(2)} Cr`;
  }
  if (val >= 100_000) {
    return `₹${(val / 100_000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
}
