import type { WHtRResult } from "./whtr";

export const HISTORY_KEY = "army-whtr-history-v1";
export const INPUTS_KEY = "army-whtr-inputs-v2";
const INPUTS_KEY_V1 = "army-whtr-inputs-v1";
const MAX_ENTRIES = 20;

export type HistoryEntry = {
  id: string;
  at: string;
  heightIn: number;
  waistIn: number;
  waist1?: number;
  waist2?: number;
  waist3?: number;
  recorded: number;
  passes: boolean;
};

export type SavedInputs = {
  units: "in" | "cm";
  heightFt: string;
  heightInPart: string;
  heightCm: string;
  waist1: string;
  waist2: string;
  waist3: string;
  waist1Cm: string;
  waist2Cm: string;
  waist3Cm: string;
};

const DEFAULTS: SavedInputs = {
  units: "in",
  heightFt: "5",
  heightInPart: "10",
  heightCm: "178",
  waist1: "36.9",
  waist2: "37.2",
  waist3: "36.8",
  waist1Cm: "93.7",
  waist2Cm: "94.5",
  waist3Cm: "93.5",
};

function expandLegacy(raw: Record<string, unknown>): SavedInputs {
  const w = String(raw.waist1 ?? raw.waistIn ?? DEFAULTS.waist1);
  const wcm = String(raw.waist1Cm ?? raw.waistCm ?? DEFAULTS.waist1Cm);
  return {
    units: raw.units === "cm" ? "cm" : "in",
    heightFt: String(raw.heightFt ?? DEFAULTS.heightFt),
    heightInPart: String(raw.heightInPart ?? DEFAULTS.heightInPart),
    heightCm: String(raw.heightCm ?? DEFAULTS.heightCm),
    waist1: String(raw.waist1 ?? w),
    waist2: String(raw.waist2 ?? w),
    waist3: String(raw.waist3 ?? w),
    waist1Cm: String(raw.waist1Cm ?? wcm),
    waist2Cm: String(raw.waist2Cm ?? wcm),
    waist3Cm: String(raw.waist3Cm ?? wcm),
  };
}

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as HistoryEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveHistory(entries: HistoryEntry[]): void {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}

export function pushHistory(
  result: WHtRResult,
  tapes?: [number, number, number],
): HistoryEntry[] {
  const next: HistoryEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    at: new Date().toISOString(),
    heightIn: result.heightIn,
    waistIn: result.waistIn,
    waist1: tapes?.[0],
    waist2: tapes?.[1],
    waist3: tapes?.[2],
    recorded: result.recorded,
    passes: result.passes,
  };
  const list = [next, ...loadHistory()].slice(0, MAX_ENTRIES);
  saveHistory(list);
  return list;
}

export function deleteHistory(id: string): HistoryEntry[] {
  const list = loadHistory().filter((e) => e.id !== id);
  saveHistory(list);
  return list;
}

export function clearHistory(): HistoryEntry[] {
  saveHistory([]);
  return [];
}

export function loadInputs(): SavedInputs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(INPUTS_KEY) ?? localStorage.getItem(INPUTS_KEY_V1);
    if (!raw) return null;
    return expandLegacy(JSON.parse(raw) as Record<string, unknown>);
  } catch {
    return null;
  }
}

export function saveInputs(inputs: SavedInputs): void {
  localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs));
}

export { DEFAULTS as DEFAULT_INPUTS };
