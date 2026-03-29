/**
 * Formatea un número como moneda peruana.
 * @example formatCurrency(2) → "S/ 2.00"
 * @example formatCurrency(148.5) → "S/ 148.50"
 */
export function formatCurrency(amount: number): string {
  return `S/ ${amount.toFixed(2)}`;
}

/**
 * Formatea como moneda compacta (sin decimales si es entero).
 * @example formatCurrencyCompact(2) → "S/2"
 * @example formatCurrencyCompact(148.5) → "S/148.50"
 */
export function formatCurrencyCompact(amount: number): string {
  if (amount % 1 === 0) return `S/${amount}`;
  return `S/${amount.toFixed(2)}`;
}

/**
 * Parsea un string "S/ 2.00" a número.
 */
export function parseCurrency(value: string): number {
  return parseFloat(value.replace('S/', '').replace('S/ ', '').trim()) || 0;
}