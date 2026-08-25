import "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as cn } from "./router-DPvq52mF.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Input({ className, type = "text", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-12 w-full rounded-md bg-surface-2 px-3 text-base text-foreground tabular-nums shadow-border", "placeholder:text-subtle", "transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", "disabled:cursor-not-allowed disabled:opacity-40", className),
		...props
	});
}
/** Army Directive 2026-13 / AR 600-9 waist-to-height ratio. DA Form 5500, JUL 2026. */
var WHtR_STANDARD = .55;
/**
* Recorded WHtR is truncated, not rounded.
* .549 passes; .550 fails. Digits past the third decimal are discarded.
*/
function truncateRatio(raw, decimals = 3) {
	if (!Number.isFinite(raw) || raw < 0) return 0;
	const factor = 10 ** decimals;
	return Math.floor(raw * factor + 1e-8) / factor;
}
function roundToDecimals(n, decimals) {
	if (!Number.isFinite(n)) return 0;
	const factor = 10 ** decimals;
	return Math.round(n * factor + 1e-8) / factor;
}
function computeWHtR(waistIn, heightIn) {
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
		waistIn
	};
}
function cmToInches(cm) {
	return cm / 2.54;
}
function inchesToCm(inches) {
	return inches * 2.54;
}
function ftInToInches(ft, inches) {
	return ft * 12 + inches;
}
function inchesToFtIn(total) {
	const ft = Math.floor(total / 12);
	return {
		ft,
		inches: total - ft * 12
	};
}
function formatFtIn(totalInches) {
	const { ft, inches } = inchesToFtIn(totalInches);
	const whole = Math.round(inches);
	if (whole === 12) return `${ft + 1}'0"`;
	return `${ft}'${whole}"`;
}
function formatInches(n, digits = 1) {
	return n.toFixed(digits);
}
function formatRatio(n) {
	return n.toFixed(3);
}
function maxWaistTable(minH = 58, maxH = 80) {
	const rows = [];
	for (let h = minH; h <= maxH; h++) {
		const max = WHtR_STANDARD * h;
		rows.push({
			heightIn: h,
			label: formatFtIn(h),
			maxWaistIn: max,
			maxWaistCm: inchesToCm(max)
		});
	}
	return rows;
}
function parsePositive(value) {
	const trimmed = value.trim();
	if (trimmed === "") return null;
	const n = Number(trimmed);
	if (!Number.isFinite(n) || n <= 0) return null;
	return n;
}
/** DA 5500 waist: round DOWN to the nearest 0.50 inch. */
function roundDownHalfInch(n) {
	if (!Number.isFinite(n) || n < 0) return 0;
	return Math.floor(n * 2 + 1e-8) / 2;
}
/** DA 5500 height: round to the nearest 0.50 inch. */
function roundNearestHalfInch(n) {
	if (!Number.isFinite(n) || n < 0) return 0;
	return Math.round(n * 2 + 1e-8) / 2;
}
/**
* Official DA Form 5500 JUL 2026 tape block:
* round each navel measurement down to 0.50 in, then average to 3 decimal places.
*/
function da5500WaistAverage(tapes) {
	const recorded = [
		roundDownHalfInch(tapes[0]),
		roundDownHalfInch(tapes[1]),
		roundDownHalfInch(tapes[2])
	];
	return {
		recorded,
		average: roundToDecimals((recorded[0] + recorded[1] + recorded[2]) / 3, 3)
	};
}
var NAVEL_COLS = [
	{
		key: 0,
		label: "First",
		aria: "First measurement waist at navel"
	},
	{
		key: 1,
		label: "Second",
		aria: "Second measurement waist at navel"
	},
	{
		key: 2,
		label: "Third",
		aria: "Third measurement waist at navel"
	}
];
function NavelTapeGrid({ values, onChange, recorded, average, idPrefix, caption = "Waist at navel (inches)" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-kicker text-muted",
		children: caption
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3",
		children: [NAVEL_COLS.map((col) => {
			const rec = recorded[col.key];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "block min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-kicker text-muted",
						children: col.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: `${idPrefix}-${col.key + 1}`,
						inputMode: "decimal",
						className: "text-center font-display text-lg font-semibold tabular-nums",
						value: values[col.key],
						onChange: (e) => onChange(col.key, e.target.value),
						"aria-label": col.aria
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block font-mono text-xs text-subtle",
						children: rec != null ? `↓ ${formatInches(rec, 1)}` : "round down 0.50"
					})
				]
			}, col.key);
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "block min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-2 block text-kicker text-muted",
					children: "Average"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-12 items-center justify-center rounded-md bg-surface-2 font-display text-lg font-semibold tabular-nums shadow-border",
					"aria-live": "polite",
					children: average ?? "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-1 block text-xs text-subtle",
					children: "3 decimal places"
				})
			]
		})]
	})] });
}
var SOLDIER_KEY = "army-whtr-soldier-v1";
var DA_DRAFT_KEY = "army-whtr-da5500-draft-v2";
var TRANSFER_KEY = "army-whtr-transfer-v1";
var SESSION_KEY = "army-whtr-session-v1";
var MEASURER_KEY = "army-whtr-measurer-v1";
var emptyIdentity = () => ({
	name: "",
	rank: "",
	dodId: "",
	unit: "",
	sex: "",
	age: "",
	note: ""
});
var emptyMeasurer = () => ({
	name: "",
	rank: ""
});
function todayIsoDate() {
	const d = /* @__PURE__ */ new Date();
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function emptyDraft() {
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
			measurer: emptyMeasurer()
		},
		remarks: ""
	};
}
function readJson(key) {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(key);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function loadIdentity() {
	return {
		...emptyIdentity(),
		...readJson("army-whtr-soldier-v1") ?? {}
	};
}
function saveIdentity(identity) {
	localStorage.setItem(SOLDIER_KEY, JSON.stringify(identity));
}
function loadMeasurer() {
	return {
		...emptyMeasurer(),
		...readJson("army-whtr-measurer-v1") ?? {}
	};
}
function saveMeasurer(measurer) {
	localStorage.setItem(MEASURER_KEY, JSON.stringify(measurer));
}
function loadDraft() {
	const stored = readJson(DA_DRAFT_KEY);
	const identity = loadIdentity();
	const measurer = loadMeasurer();
	if (!stored) return {
		...emptyDraft(),
		identity,
		measurer
	};
	return {
		...emptyDraft(),
		...stored,
		identity: {
			...emptyIdentity(),
			...identity,
			...stored.identity
		},
		measurer: {
			...emptyMeasurer(),
			...measurer,
			...stored.measurer
		},
		supervisor: {
			...emptyMeasurer(),
			...stored.supervisor
		},
		confirm: {
			...emptyDraft().confirm,
			...stored.confirm,
			measurer: {
				...emptyMeasurer(),
				...stored.confirm?.measurer
			}
		}
	};
}
function saveDraft(draft) {
	localStorage.setItem(DA_DRAFT_KEY, JSON.stringify(draft));
	saveIdentity(draft.identity);
	saveMeasurer(draft.measurer);
}
function nextSoldier(prev) {
	return {
		...emptyDraft(),
		date: prev.date,
		measurer: prev.measurer,
		supervisor: prev.supervisor
	};
}
function setTransfer(prefill) {
	localStorage.setItem(TRANSFER_KEY, JSON.stringify(prefill));
}
function consumeTransfer() {
	const data = readJson(TRANSFER_KEY);
	if (data) localStorage.removeItem(TRANSFER_KEY);
	if (!data || !Number.isFinite(data.heightIn)) return null;
	if (Number.isFinite(data.waist1) && Number.isFinite(data.waist2) && Number.isFinite(data.waist3)) return {
		heightIn: data.heightIn,
		waist1: data.waist1,
		waist2: data.waist2,
		waist3: data.waist3
	};
	if (Number.isFinite(data.waistIn) && data.waistIn) return {
		heightIn: data.heightIn,
		waist1: data.waistIn,
		waist2: data.waistIn,
		waist3: data.waistIn
	};
	return null;
}
function parseNum(value) {
	const n = Number(value.trim());
	if (!Number.isFinite(n) || n <= 0) return null;
	return n;
}
function buildScreening(heightRecorded, waists) {
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
		meets: result.passes
	};
}
function compileRecord(draft) {
	const heightRaw = parseNum(draft.heightIn);
	const w1 = parseNum(draft.waist1);
	const w2 = parseNum(draft.waist2) ?? w1;
	const w3 = parseNum(draft.waist3) ?? w1;
	if (heightRaw == null || w1 == null || w2 == null || w3 == null) return null;
	const heightRecorded = roundNearestHalfInch(heightRaw);
	const initial = buildScreening(heightRecorded, [
		w1,
		w2,
		w3
	]);
	if (!initial) return null;
	let confirmation = null;
	let confirmMeasurer = null;
	if (draft.confirm.enabled) {
		const c1 = parseNum(draft.confirm.waist1);
		const c2 = parseNum(draft.confirm.waist2) ?? c1;
		const c3 = parseNum(draft.confirm.waist3) ?? c1;
		if (c1 != null && c2 != null && c3 != null) {
			confirmation = buildScreening(heightRecorded, [
				c1,
				c2,
				c3
			]);
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
		meets
	};
}
function armyDate(iso) {
	if (!iso) return "";
	const compact = iso.replaceAll("-", "");
	if (/^\d{8}$/.test(compact)) return compact;
	return iso;
}
function atisExtras(id) {
	const extra = [];
	if (id.dodId.trim()) extra.push(`DoD ID: ${id.dodId.trim()}`);
	if (id.unit.trim()) extra.push(`Unit: ${id.unit.trim()}`);
	return extra;
}
function remarksForForm(record) {
	const extras = atisExtras(record.identity);
	const user = record.remarks.trim();
	return [...extras, user].filter(Boolean).join("  ");
}
function atisBlock(record) {
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
		`Prepared by: ${record.measurer.rank} ${record.measurer.name}`.trim()
	];
	if (record.confirmation) {
		const c = record.confirmation;
		lines.push(`CONFIRMATION WHtR MEASUREMENT`, `Waist FIRST / SECOND / THIRD: ${formatInches(c.waist1, 1)} / ${formatInches(c.waist2, 1)} / ${formatInches(c.waist3, 1)} in`, `Waist AVERAGE: ${formatInches(c.waistRecorded, 3)} in`, `WHtR recorded: ${formatRatio(c.recorded)}`, `Confirmation team: ${record.confirmMeasurer?.rank ?? ""} ${record.confirmMeasurer?.name ?? ""}`.trim());
	}
	if (record.supervisor.name.trim()) lines.push(`Approved by supervisor: ${record.supervisor.rank} ${record.supervisor.name}`.trim());
	if (record.remarks.trim()) lines.push(`Remarks: ${record.remarks.trim()}`);
	lines.push(`Computer-filled working copy of DA Form 5500, JUL 2026. Verify, sign, and record in ATIS.`);
	return lines.join("\n");
}
function fileStem(record) {
	return `DA5500-${(record.identity.name || "soldier").toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 24) || "SOLDIER"}-${armyDate(record.date)}`;
}
function loadSession() {
	const rows = readJson("army-whtr-session-v1") ?? [];
	return Array.isArray(rows) ? rows : [];
}
function saveSession(rows) {
	localStorage.setItem(SESSION_KEY, JSON.stringify(rows.slice(0, 80)));
}
function upsertSession(draft, record) {
	const rows = loadSession();
	const entry = {
		id: `${record.identity.name}|${armyDate(record.date)}|${record.initial.recorded}`,
		savedAt: Date.now(),
		name: record.identity.name || "Unnamed Soldier",
		rank: record.identity.rank,
		heightIn: record.heightRecorded,
		recorded: (record.confirmation ?? record.initial).recorded,
		meets: record.meets,
		draft
	};
	const idx = rows.findIndex((r) => r.name === entry.name && r.draft.date === draft.date && r.rank === entry.rank);
	const next = idx >= 0 ? rows.map((r, i) => i === idx ? entry : r) : [entry, ...rows];
	saveSession(next);
	return next;
}
function removeSession(id) {
	const next = loadSession().filter((r) => r.id !== id);
	saveSession(next);
	return next;
}
//#endregion
export { remarksForForm as C, saveDraft as D, roundNearestHalfInch as E, setTransfer as O, parsePositive as S, roundDownHalfInch as T, loadDraft as _, cmToInches as a, nextSoldier as b, consumeTransfer as c, formatFtIn as d, formatInches as f, inchesToFtIn as g, inchesToCm as h, atisBlock as i, upsertSession as k, da5500WaistAverage as l, ftInToInches as m, NavelTapeGrid as n, compileRecord as o, formatRatio as p, armyDate as r, computeWHtR as s, Input as t, fileStem as u, loadSession as v, removeSession as w, parseNum as x, maxWaistTable as y };
