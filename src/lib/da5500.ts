import {
  computeWHtR,
  da5500WaistAverage,
  formatFtIn,
  formatInches,
  formatRatio,
  roundNearestHalfInch,
  truncateRatio,
} from "./whtr";

export const SOLDIER_KEY = "army-whtr-soldier-v1";
export const DA_DRAFT_KEY = "army-whtr-da5500-draft-v2";
export const TRANSFER_KEY = "army-whtr-transfer-v1";
export const SESSION_KEY = "army-whtr-session-v1";
export const MEASURER_KEY = "army-whtr-measurer-v1";

export type Sex = "" | "M" | "F";

export type SoldierIdentity = {
  name: string;
  rank: string;
  dodId: string;
  unit: string;
  sex: Sex;
  age: string;
  note: string;
};

export type Measurer = {
  name: string;
  rank: string;
};

export type TransferPrefill = {
  heightIn: number;
  waist1: number;
  waist2: number;
  waist3: number;
};

export type Da5500Draft = {
  identity: SoldierIdentity;
  date: string;
  supervisorDate: string;
  heightIn: string;
  waist1: string;
  waist2: string;
  waist3: string;
  measurer: Measurer;
  supervisor: Measurer;
  confirm: {
    enabled: boolean;
    waist1: string;
    waist2: string;
    waist3: string;
    measurer: Measurer;
  };
  remarks: string;
};

export type ScreeningBlock = {
  waist1: number;
  waist2: number;
  waist3: number;
  waistExactAvg: number;
  waistRecorded: number;
  heightIn: number;
  raw: number;
  recorded: number;
  meets: boolean;
};

export type Da5500Record = {
  identity: SoldierIdentity;
  date: string;
  supervisorDate: string;
  heightIn: number;
  heightRecorded: number;
  initial: ScreeningBlock;
  confirmation: ScreeningBlock | null;
  measurer: Measurer;
  confirmMeasurer: Measurer | null;
  supervisor: Measurer;
  remarks: string;
  meets: boolean;
};

export type SessionEntry = {
  id: string;
  savedAt: number;
  name: string;
  rank: string;
  heightIn: number;
  recorded: number;
  meets: boolean;
  draft: Da5500Draft;
};

export const emptyIdentity = (): SoldierIdentity => ({
  name: "",
  rank: "",
  dodId: "",
  unit: "",
  sex: "",
  age: "",
  note: "",
});

export const emptyMeasurer = (): Measurer => ({ name: "", rank: "" });

export function todayIsoDate(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function emptyDraft(): Da5500Draft {
  const date = todayIsoDate();
  return {
    identity: emptyIdentity(),
    date,
    supervisorDate: "",
    heightIn: "",
    waist1: "",
    waist2: "",
    waist3: "",
    measurer: emptyMeasurer(),
    supervisor: emptyMeasurer(),
    confirm: {
      enabled: false,
      waist1: "",
      waist2: "",
      waist3: "",
      measurer: emptyMeasurer(),
    },
    remarks: "",
  };
}

function readJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function loadIdentity(): SoldierIdentity {
  return { ...emptyIdentity(), ...(readJson<SoldierIdentity>(SOLDIER_KEY) ?? {}) };
}

export function saveIdentity(identity: SoldierIdentity): void {
  localStorage.setItem(SOLDIER_KEY, JSON.stringify(identity));
}

export function loadMeasurer(): Measurer {
  return { ...emptyMeasurer(), ...(readJson<Measurer>(MEASURER_KEY) ?? {}) };
}

export function saveMeasurer(measurer: Measurer): void {
  localStorage.setItem(MEASURER_KEY, JSON.stringify(measurer));
}

export function loadDraft(): Da5500Draft {
  const stored = readJson<Da5500Draft>(DA_DRAFT_KEY);
  const identity = loadIdentity();
  const measurer = loadMeasurer();
  if (!stored) return { ...emptyDraft(), identity, measurer };
  return {
    ...emptyDraft(),
    ...stored,
    identity: { ...emptyIdentity(), ...identity, ...stored.identity },
    measurer: { ...emptyMeasurer(), ...measurer, ...stored.measurer },
    supervisor: { ...emptyMeasurer(), ...stored.supervisor },
    confirm: {
      ...emptyDraft().confirm,
      ...stored.confirm,
      measurer: { ...emptyMeasurer(), ...stored.confirm?.measurer },
    },
  };
}

export function saveDraft(draft: Da5500Draft): void {
  localStorage.setItem(DA_DRAFT_KEY, JSON.stringify(draft));
  saveIdentity(draft.identity);
  saveMeasurer(draft.measurer);
}

export function nextSoldier(prev: Da5500Draft): Da5500Draft {
  return {
    ...emptyDraft(),
    date: prev.date,
    measurer: prev.measurer,
    supervisor: prev.supervisor,
  };
}

export function setTransfer(prefill: TransferPrefill): void {
  localStorage.setItem(TRANSFER_KEY, JSON.stringify(prefill));
}

export function consumeTransfer(): TransferPrefill | null {
  const data = readJson<TransferPrefill & { waistIn?: number }>(TRANSFER_KEY);
  if (data) localStorage.removeItem(TRANSFER_KEY);
  if (!data || !Number.isFinite(data.heightIn)) return null;
  if (
    Number.isFinite(data.waist1) &&
    Number.isFinite(data.waist2) &&
    Number.isFinite(data.waist3)
  ) {
    return {
      heightIn: data.heightIn,
      waist1: data.waist1,
      waist2: data.waist2,
      waist3: data.waist3,
    };
  }
  if (Number.isFinite(data.waistIn) && data.waistIn) {
    return {
      heightIn: data.heightIn,
      waist1: data.waistIn,
      waist2: data.waistIn,
      waist3: data.waistIn,
    };
  }
  return null;
}

export function parseNum(value: string): number | null {
  const n = Number(value.trim());
  if (!Number.isFinite(n) || n <= 0) return null;
  return n;
}

export function buildScreening(
  heightRecorded: number,
  waists: [number, number, number],
): ScreeningBlock | null {
  const { recorded, average } = da5500WaistAverage(waists);
  const result = computeWHtR(average, heightRecorded);
  if (!result) return null;
  return {
    waist1: recorded[0],
    waist2: recorded[1],
    waist3: recorded[2],
    waistExactAvg: average,
    waistRecorded: average,
    heightIn: heightRecorded,
    raw: result.raw,
    recorded: result.recorded,
    meets: result.passes,
  };
}

export function compileRecord(draft: Da5500Draft): Da5500Record | null {
  const heightRaw = parseNum(draft.heightIn);
  const w1 = parseNum(draft.waist1);
  const w2 = parseNum(draft.waist2) ?? w1;
  const w3 = parseNum(draft.waist3) ?? w1;
  if (heightRaw == null || w1 == null || w2 == null || w3 == null) return null;

  const heightRecorded = roundNearestHalfInch(heightRaw);
  const initial = buildScreening(heightRecorded, [w1, w2, w3]);
  if (!initial) return null;

  let confirmation: ScreeningBlock | null = null;
  let confirmMeasurer: Measurer | null = null;
  if (draft.confirm.enabled) {
    const c1 = parseNum(draft.confirm.waist1);
    const c2 = parseNum(draft.confirm.waist2) ?? c1;
    const c3 = parseNum(draft.confirm.waist3) ?? c1;
    if (c1 != null && c2 != null && c3 != null) {
      confirmation = buildScreening(heightRecorded, [c1, c2, c3]);
      confirmMeasurer = draft.confirm.measurer;
    }
  }

  const meets = confirmation ? confirmation.meets : initial.meets;

  return {
    identity: draft.identity,
    date: draft.date,
    supervisorDate: draft.supervisorDate,
    heightIn: heightRaw,
    heightRecorded,
    initial,
    confirmation,
    measurer: draft.measurer,
    confirmMeasurer,
    supervisor: draft.supervisor,
    remarks: draft.remarks,
    meets,
  };
}

export function armyDate(iso: string): string {
  if (!iso) return "";
  const compact = iso.replaceAll("-", "");
  if (/^\d{8}$/.test(compact)) return compact;
  return iso;
}

function atisExtras(id: SoldierIdentity): string[] {
  const extra: string[] = [];
  if (id.dodId.trim()) extra.push(`DoD ID: ${id.dodId.trim()}`);
  if (id.unit.trim()) extra.push(`Unit: ${id.unit.trim()}`);
  return extra;
}

export function remarksForForm(record: Da5500Record): string {
  const extras = atisExtras(record.identity);
  const user = record.remarks.trim();
  return [...extras, user].filter(Boolean).join("  ");
}

export function atisBlock(record: Da5500Record): string {
  const id = record.identity;
  const init = record.initial;
  const lines = [
    `DA FORM 5500, JUL 2026 — Body Composition Screening (AD 2026-13 / AR 600-9)`,
    `Name: ${id.name || "—"}`,
    `Rank: ${id.rank || "—"}`,
    `Sex: ${id.sex === "F" ? "FEMALE" : id.sex === "M" ? "MALE" : "—"}`,
    `Age: ${id.age || "—"}`,
    ...atisExtras(id),
    `Date: ${armyDate(record.date)}`,
    `Height (nearest 0.50 in): ${formatInches(record.heightRecorded, 1)} in (${formatFtIn(record.heightRecorded)})`,
    `Waist at navel FIRST / SECOND / THIRD: ${formatInches(init.waist1, 1)} / ${formatInches(init.waist2, 1)} / ${formatInches(init.waist3, 1)} in`,
    `Waist AVERAGE (3 decimals): ${formatInches(init.waistRecorded, 3)} in`,
    `WHtR raw: ${init.raw.toFixed(6)}`,
    `WHtR recorded (truncated 3 decimals): ${formatRatio(init.recorded)}`,
    `Standard: less than 0.550`,
    `Meets standard: ${record.meets ? "YES" : "NO"}`,
    `Prepared by: ${record.measurer.rank} ${record.measurer.name}`.trim(),
  ];
  if (record.confirmation) {
    const c = record.confirmation;
    lines.push(
      `CONFIRMATION WHtR MEASUREMENT`,
      `Waist FIRST / SECOND / THIRD: ${formatInches(c.waist1, 1)} / ${formatInches(c.waist2, 1)} / ${formatInches(c.waist3, 1)} in`,
      `Waist AVERAGE: ${formatInches(c.waistRecorded, 3)} in`,
      `WHtR recorded: ${formatRatio(c.recorded)}`,
      `Confirmation team: ${record.confirmMeasurer?.rank ?? ""} ${record.confirmMeasurer?.name ?? ""}`.trim(),
    );
  }
  if (record.supervisor.name.trim()) {
    lines.push(`Approved by supervisor: ${record.supervisor.rank} ${record.supervisor.name}`.trim());
  }
  if (record.remarks.trim()) lines.push(`Remarks: ${record.remarks.trim()}`);
  lines.push(`Computer-filled working copy of DA Form 5500, JUL 2026. Verify, sign, and record in ATIS.`);
  return lines.join("\n");
}

export function fileStem(record: Da5500Record): string {
  const name = (record.identity.name || "soldier")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
  return `DA5500-${name || "SOLDIER"}-${armyDate(record.date)}`;
}

export function loadSession(): SessionEntry[] {
  const rows = readJson<SessionEntry[]>(SESSION_KEY) ?? [];
  return Array.isArray(rows) ? rows : [];
}

export function saveSession(rows: SessionEntry[]): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(rows.slice(0, 80)));
}

export function upsertSession(draft: Da5500Draft, record: Da5500Record): SessionEntry[] {
  const rows = loadSession();
  const entry: SessionEntry = {
    id: `${record.identity.name}|${armyDate(record.date)}|${record.initial.recorded}`,
    savedAt: Date.now(),
    name: record.identity.name || "Unnamed Soldier",
    rank: record.identity.rank,
    heightIn: record.heightRecorded,
    recorded: (record.confirmation ?? record.initial).recorded,
    meets: record.meets,
    draft,
  };
  const idx = rows.findIndex(
    (r) => r.name === entry.name && r.draft.date === draft.date && r.rank === entry.rank,
  );
  const next = idx >= 0 ? rows.map((r, i) => (i === idx ? entry : r)) : [entry, ...rows];
  saveSession(next);
  return next;
}

export function removeSession(id: string): SessionEntry[] {
  const next = loadSession().filter((r) => r.id !== id);
  saveSession(next);
  return next;
}

export { truncateRatio, formatRatio, formatInches, formatFtIn };
