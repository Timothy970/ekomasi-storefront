/**
 * Calculates the new price after applying a discount.
 * @param price The original price
 * @param type The type of discount ('percentage' or 'fixed')
 * @param value The discount value (e.g. 20 for 20% or 100 for 100 KES off)
 * @returns The new price
 */
export function calculateDiscountedPrice(
  price: number,
  type?: string | null,
  value?: number | string | null
): number {
  if (!type || !value) return price;

  const discountValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(discountValue)) return price;

  if (type === "percentage" || type === "%") {
    return Math.max(0, price - (price * discountValue) / 100);
  } else if (type === "fixed") {
    return Math.max(0, price - discountValue);
  }

  return price;
}

/**
 * Formats a price with KES currency.
 */
export function formatPrice(price: number): string {
  return `KES ${price.toLocaleString()}`;
}
