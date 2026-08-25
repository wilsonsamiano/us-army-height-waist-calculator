/** Army Directive 2026-13 / AR 600-9 waist-to-height ratio. DA Form 5500, JUL 2026. */

export const WHtR_STANDARD = 0.55;
export const HEIGHT_IN_MIN = 58;
export const HEIGHT_IN_MAX = 84;
export const WAIST_IN_MIN = 20;
export const WAIST_IN_MAX = 70;

export type Units = "in" | "cm";

export type WHtRResult = {
  raw: number;
  /** Truncated to 3 decimal places — the value recorded on DA Form 5500. */
  recorded: number;
  passes: boolean;
  /** Height × 0.55. Waist must be strictly below this to pass. */
  maxWaistIn: number;
  /** Positive = under the line (pass). Zero or negative = fail. */
  marginIn: number;
  heightIn: number;
  waistIn: number;
};

/**
 * Recorded WHtR is truncated, not rounded.
 * .549 passes; .550 fails. Digits past the third decimal are discarded.
 */
export function truncateRatio(raw: number, decimals = 3): number {
  if (!Number.isFinite(raw) || raw < 0) return 0;
  const factor = 10 ** decimals;
  // Tiny epsilon absorbs binary float noise on exact 0.55 cases (e.g. 38.5 / 70).
  return Math.floor(raw * factor + 1e-8) / factor;
}

export function roundToDecimals(n: number, decimals: number): number {
  if (!Number.isFinite(n)) return 0;
  const factor = 10 ** decimals;
  return Math.round(n * factor + 1e-8) / factor;
}

export function computeWHtR(waistIn: number, heightIn: number): WHtRResult | null {
  if (!Number.isFinite(waistIn) || !Number.isFinite(heightIn)) return null;
  if (heightIn <= 0 || waistIn <= 0) return null;

  const raw = waistIn / heightIn;
  const recorded = truncateRatio(raw, 3);
  const maxWaistIn = WHtR_STANDARD * heightIn;
  const marginIn = maxWaistIn - waistIn;

  return {
    raw,
    recorded,
    passes: recorded < WHtR_STANDARD,
    maxWaistIn,
    marginIn,
    heightIn,
    waistIn,
  };
}

export function cmToInches(cm: number): number {
  return cm / 2.54;
}

export function inchesToCm(inches: number): number {
  return inches * 2.54;
}

export function ftInToInches(ft: number, inches: number): number {
  return ft * 12 + inches;
}

export function inchesToFtIn(total: number): { ft: number; inches: number } {
  const ft = Math.floor(total / 12);
  return { ft, inches: total - ft * 12 };
}

export function formatFtIn(totalInches: number): string {
  const { ft, inches } = inchesToFtIn(totalInches);
  const whole = Math.round(inches);
  if (whole === 12) return `${ft + 1}'0"`;
  return `${ft}'${whole}"`;
}

export function formatInches(n: number, digits = 1): string {
  return n.toFixed(digits);
}

export function formatRatio(n: number): string {
  return n.toFixed(3);
}

export type MaxWaistRow = {
  heightIn: number;
  label: string;
  maxWaistIn: number;
  maxWaistCm: number;
};

export function maxWaistTable(minH = HEIGHT_IN_MIN, maxH = 80): MaxWaistRow[] {
  const rows: MaxWaistRow[] = [];
  for (let h = minH; h <= maxH; h++) {
    const max = WHtR_STANDARD * h;
    rows.push({
      heightIn: h,
      label: formatFtIn(h),
      maxWaistIn: max,
      maxWaistCm: inchesToCm(max),
    });
  }
  return rows;
}

export function parsePositive(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

/** DA 5500 waist: round DOWN to the nearest 0.50 inch. */
export function roundDownHalfInch(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.floor(n * 2 + 1e-8) / 2;
}

/** DA 5500 height: round to the nearest 0.50 inch. */
export function roundNearestHalfInch(n: number): number {
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.round(n * 2 + 1e-8) / 2;
}

export function averageMeasurements(values: number[]): number | null {
  const nums = values.filter((n) => Number.isFinite(n) && n > 0);
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/**
 * Official DA Form 5500 JUL 2026 tape block:
 * round each navel measurement down to 0.50 in, then average to 3 decimal places.
 */
export function da5500WaistAverage(tapes: [number, number, number]): {
  recorded: [number, number, number];
  average: number;
} {
  const recorded: [number, number, number] = [
    roundDownHalfInch(tapes[0]),
    roundDownHalfInch(tapes[1]),
    roundDownHalfInch(tapes[2]),
  ];
  const average = roundToDecimals((recorded[0] + recorded[1] + recorded[2]) / 3, 3);
  return { recorded, average };
}
