import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as ChevronDown, a as Trash2, c as Save, d as Plus, f as Minus, h as Copy, p as FileSpreadsheet, v as Check } from "../_libs/lucide-react.mjs";
import { a as cn, i as Button } from "./router-DPvq52mF.mjs";
import { n as SiteFooter, t as AppChrome } from "./site-header-BXm-Quk7.mjs";
import { O as setTransfer, S as parsePositive, T as roundDownHalfInch, a as cmToInches, d as formatFtIn, f as formatInches, g as inchesToFtIn, h as inchesToCm, l as da5500WaistAverage, m as ftInToInches, n as NavelTapeGrid, p as formatRatio, s as computeWHtR, t as Input, y as maxWaistTable } from "./da5500-7fx8iAtO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BVuj5x1M.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MaxWaistTable({ units, highlightHeightIn }) {
	const rows = (0, import_react.useMemo)(() => maxWaistTable(58, 80), []);
	const highlight = highlightHeightIn != null ? Math.round(highlightHeightIn) : null;
	const scrollerRef = (0, import_react.useRef)(null);
	const rowRefs = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	(0, import_react.useEffect)(() => {
		if (highlight == null) return;
		const el = rowRefs.current.get(highlight);
		const scroller = scrollerRef.current;
		if (!el || !scroller) return;
		const elRect = el.getBoundingClientRect();
		const box = scroller.getBoundingClientRect();
		const delta = elRect.top - box.top - scroller.clientHeight / 2 + elRect.height / 2;
		scroller.scrollTop += delta;
	}, [highlight]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker text-muted",
				children: "Quick reference"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl",
				children: "Max waist by height"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-prose text-sm text-muted",
				children: "Waist must be strictly below height × 0.55. Hitting the number fails."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 overflow-hidden rounded-lg shadow-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: scrollerRef,
					className: "max-h-80 overflow-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "sticky top-0 bg-surface-3 font-display text-kicker text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5 font-semibold",
								children: "Height"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2.5 font-semibold",
								children: "Must be under"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row) => {
							const active = highlight === row.heightIn;
							const max = units === "cm" ? `${formatInches(row.maxWaistCm, 1)} cm` : `${formatInches(row.maxWaistIn, 2)} in`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								ref: (node) => {
									if (node) rowRefs.current.set(row.heightIn, node);
									else rowRefs.current.delete(row.heightIn);
								},
								className: cn("border-t border-border", active ? "bg-accent/15 text-foreground" : "text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-3 py-2 tabular-nums",
									children: [row.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ml-2 text-subtle",
										children: [row.heightIn, " in"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-3 py-2 font-medium tabular-nums",
									children: max
								})]
							}, row.heightIn);
						}) })]
					})
				})
			})
		]
	});
}
var HISTORY_KEY = "army-whtr-history-v1";
var INPUTS_KEY = "army-whtr-inputs-v2";
var INPUTS_KEY_V1 = "army-whtr-inputs-v1";
var MAX_ENTRIES = 20;
var DEFAULTS = {
	units: "in",
	heightFt: "5",
	heightInPart: "10",
	heightCm: "178",
	waist1: "36.9",
	waist2: "37.2",
	waist3: "36.8",
	waist1Cm: "93.7",
	waist2Cm: "94.5",
	waist3Cm: "93.5"
};
function expandLegacy(raw) {
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
		waist3Cm: String(raw.waist3Cm ?? wcm)
	};
}
function loadHistory() {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(HISTORY_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function saveHistory(entries) {
	localStorage.setItem(HISTORY_KEY, JSON.stringify(entries.slice(0, MAX_ENTRIES)));
}
function pushHistory(result, tapes) {
	const list = [{
		id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
		at: (/* @__PURE__ */ new Date()).toISOString(),
		heightIn: result.heightIn,
		waistIn: result.waistIn,
		waist1: tapes?.[0],
		waist2: tapes?.[1],
		waist3: tapes?.[2],
		recorded: result.recorded,
		passes: result.passes
	}, ...loadHistory()].slice(0, MAX_ENTRIES);
	saveHistory(list);
	return list;
}
function deleteHistory(id) {
	const list = loadHistory().filter((e) => e.id !== id);
	saveHistory(list);
	return list;
}
function clearHistory() {
	saveHistory([]);
	return [];
}
function loadInputs() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem("army-whtr-inputs-v2") ?? localStorage.getItem(INPUTS_KEY_V1);
		if (!raw) return null;
		return expandLegacy(JSON.parse(raw));
	} catch {
		return null;
	}
}
function saveInputs(inputs) {
	localStorage.setItem(INPUTS_KEY, JSON.stringify(inputs));
}
function clampNum(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function stepString(value, delta, min, max, digits) {
	const current = parsePositive(value) ?? min;
	const next = clampNum(Math.round((current + delta) * 10) / 10, min, max);
	return next.toFixed(digits).replace(/\.0$/, digits === 0 ? "" : next % 1 === 0 ? ".0" : "");
}
function Calculator() {
	const navigate = useNavigate();
	const [units, setUnits] = (0, import_react.useState)("in");
	const [heightFt, setHeightFt] = (0, import_react.useState)(DEFAULTS.heightFt);
	const [heightInPart, setHeightInPart] = (0, import_react.useState)(DEFAULTS.heightInPart);
	const [heightCm, setHeightCm] = (0, import_react.useState)(DEFAULTS.heightCm);
	const [waist1, setWaist1] = (0, import_react.useState)(DEFAULTS.waist1);
	const [waist2, setWaist2] = (0, import_react.useState)(DEFAULTS.waist2);
	const [waist3, setWaist3] = (0, import_react.useState)(DEFAULTS.waist3);
	const [waist1Cm, setWaist1Cm] = (0, import_react.useState)(DEFAULTS.waist1Cm);
	const [waist2Cm, setWaist2Cm] = (0, import_react.useState)(DEFAULTS.waist2Cm);
	const [waist3Cm, setWaist3Cm] = (0, import_react.useState)(DEFAULTS.waist3Cm);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [savedFlash, setSavedFlash] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const stored = loadInputs();
		if (stored) {
			setUnits(stored.units);
			setHeightFt(stored.heightFt);
			setHeightInPart(stored.heightInPart);
			setHeightCm(stored.heightCm);
			setWaist1(stored.waist1);
			setWaist2(stored.waist2);
			setWaist3(stored.waist3);
			setWaist1Cm(stored.waist1Cm);
			setWaist2Cm(stored.waist2Cm);
			setWaist3Cm(stored.waist3Cm);
		}
		setHistory(loadHistory());
		setReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		saveInputs({
			units,
			heightFt,
			heightInPart,
			heightCm,
			waist1,
			waist2,
			waist3,
			waist1Cm,
			waist2Cm,
			waist3Cm
		});
	}, [
		ready,
		units,
		heightFt,
		heightInPart,
		heightCm,
		waist1,
		waist2,
		waist3,
		waist1Cm,
		waist2Cm,
		waist3Cm
	]);
	const heightInches = (0, import_react.useMemo)(() => {
		if (units === "cm") {
			const cm = parsePositive(heightCm);
			return cm == null ? null : cmToInches(cm);
		}
		const ft = parsePositive(heightFt);
		const inch = heightInPart.trim() === "" ? 0 : parsePositive(heightInPart);
		if (ft == null || inch == null) return null;
		return ftInToInches(ft, inch);
	}, [
		units,
		heightFt,
		heightInPart,
		heightCm
	]);
	const tapeInches = (0, import_react.useMemo)(() => {
		return (units === "cm" ? [
			waist1Cm,
			waist2Cm,
			waist3Cm
		] : [
			waist1,
			waist2,
			waist3
		]).map((v) => {
			const n = parsePositive(v);
			if (n == null) return null;
			return units === "cm" ? cmToInches(n) : n;
		});
	}, [
		units,
		waist1,
		waist2,
		waist3,
		waist1Cm,
		waist2Cm,
		waist3Cm
	]);
	const tapeBlock = (0, import_react.useMemo)(() => {
		if (tapeInches.some((n) => n == null)) return null;
		return da5500WaistAverage(tapeInches);
	}, [tapeInches]);
	const recordedTapes = [
		tapeInches[0] != null ? roundDownHalfInch(tapeInches[0]) : null,
		tapeInches[1] != null ? roundDownHalfInch(tapeInches[1]) : null,
		tapeInches[2] != null ? roundDownHalfInch(tapeInches[2]) : null
	];
	const result = (0, import_react.useMemo)(() => {
		if (heightInches == null || tapeBlock == null) return null;
		return computeWHtR(tapeBlock.average, heightInches);
	}, [heightInches, tapeBlock]);
	function setTape(index, value) {
		if (units === "cm") {
			[
				setWaist1Cm,
				setWaist2Cm,
				setWaist3Cm
			][index](value);
			return;
		}
		[
			setWaist1,
			setWaist2,
			setWaist3
		][index](value);
	}
	function switchUnits(next) {
		if (next === units) return;
		if (next === "cm") {
			if (heightInches != null) setHeightCm(formatInches(inchesToCm(heightInches), 1));
			const conv = (n, fallback) => n != null ? formatInches(inchesToCm(n), 1) : fallback;
			setWaist1Cm(conv(tapeInches[0], waist1Cm));
			setWaist2Cm(conv(tapeInches[1], waist2Cm));
			setWaist3Cm(conv(tapeInches[2], waist3Cm));
		} else {
			if (heightInches != null) {
				const { ft, inches } = inchesToFtIn(heightInches);
				setHeightFt(String(ft));
				setHeightInPart(formatInches(inches, 1).replace(/\.0$/, ""));
			}
			const conv = (n, fallback) => n != null ? formatInches(n, 1) : fallback;
			setWaist1(conv(tapeInches[0], waist1));
			setWaist2(conv(tapeInches[1], waist2));
			setWaist3(conv(tapeInches[2], waist3));
		}
		setUnits(next);
	}
	function openDa5500() {
		if (!result || !tapeBlock || tapeInches.some((n) => n == null)) return;
		const [a, b, c] = tapeInches;
		setTransfer({
			heightIn: result.heightIn,
			waist1: a,
			waist2: b,
			waist3: c
		});
		navigate({
			to: "/da-5500",
			search: {
				h: result.heightIn,
				w: result.waistIn,
				w1: a,
				w2: b,
				w3: c
			}
		});
	}
	function copyResult() {
		if (!result || !tapeBlock) return;
		const max = formatInches(result.maxWaistIn, 2);
		const line = result.passes ? `PASS — ${formatInches(result.marginIn, 2)} in under the line` : `FAIL — ${formatInches(Math.abs(result.marginIn), 2)} in over the line`;
		const text = [
			`Army WHtR ${formatRatio(result.recorded)} ${line}`,
			`Height ${formatInches(result.heightIn, 1)} in (${formatFtIn(result.heightIn)})`,
			`Waist at navel FIRST / SECOND / THIRD: ${formatInches(tapeBlock.recorded[0], 1)} / ${formatInches(tapeBlock.recorded[1], 1)} / ${formatInches(tapeBlock.recorded[2], 1)} in`,
			`Waist AVERAGE: ${formatInches(tapeBlock.average, 3)} in`,
			`Must be strictly under ${max} in (0.550 × height)`,
			`AD 2026-13 / AR 600-9 — truncated, not rounded`
		].join("\n");
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		});
	}
	function saveCheck() {
		if (!result || !tapeBlock) return;
		setHistory(pushHistory(result, tapeBlock.recorded));
		setSavedFlash(true);
		window.setTimeout(() => setSavedFlash(false), 1600);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
				result,
				tapeAverage: tapeBlock?.average ?? null,
				units,
				copied,
				savedFlash,
				onCopy: copyResult,
				onSave: saveCheck,
				onDa5500: openDa5500
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2 lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl bg-surface p-4 shadow-border sm:p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-kicker text-muted",
								children: "Measurements"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold tracking-tight sm:text-2xl",
								children: "Height and three navel tapes"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex rounded-md bg-surface-2 p-1 shadow-border",
								role: "group",
								"aria-label": "Units",
								children: ["in", "cm"].map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => switchUnits(u),
									className: cn("h-9 min-w-11 rounded-sm px-3 text-sm font-medium uppercase tracking-wide transition-colors duration-[var(--motion-quick)]", units === u ? "bg-accent text-accent-foreground" : "text-muted hover:text-foreground"),
									children: u
								}, u))
							})]
						}),
						units === "in" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
							className: "mb-2 block text-kicker text-muted",
							children: "Height"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-xs font-medium text-muted",
								children: "Feet"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
								value: heightFt,
								onChange: setHeightFt,
								min: 4,
								max: 7,
								step: 1,
								digits: 0,
								ariaLabel: "Height feet"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-xs font-medium text-muted",
								children: "Inches"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
								value: heightInPart,
								onChange: setHeightInPart,
								min: 0,
								max: 11.5,
								step: .5,
								digits: 1,
								ariaLabel: "Height inches"
							})] })]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Height (cm)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, {
								value: heightCm,
								onChange: setHeightCm,
								min: 147,
								max: 213,
								step: 1,
								digits: 1,
								suffix: "cm",
								ariaLabel: "Height centimeters"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavelTapeGrid, {
								idPrefix: "calc-navel",
								caption: units === "cm" ? "Waist at navel (cm in, inches on the form)" : "Waist at navel (inches)",
								values: units === "cm" ? [
									waist1Cm,
									waist2Cm,
									waist3Cm
								] : [
									waist1,
									waist2,
									waist3
								],
								onChange: setTape,
								recorded: recordedTapes,
								average: tapeBlock ? formatInches(tapeBlock.average, 3) : null
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: "Same three boxes as DA Form 5500: first, second, and third measurement at the navel. Each reading rounds down to 0.50 in, then averages to three decimals. The Army records the ratio in inches."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RatioGauge, { result })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-2 lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaxWaistTable, {
					units,
					highlightHeightIn: heightInches
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryCard, {
					entries: history,
					units,
					onDelete: (id) => setHistory(deleteHistory(id)),
					onClear: () => setHistory(clearHistory())
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-2 block text-kicker text-muted",
			children: label
		}), children]
	});
}
function Stepper({ value, onChange, min, max, step, digits, suffix, ariaLabel }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				className: "size-10 shrink-0 sm:size-11",
				"aria-label": `Decrease ${ariaLabel}`,
				onClick: () => onChange(stepString(value, -step, min, max, digits)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				inputMode: "decimal",
				"aria-label": ariaLabel,
				value,
				onChange: (e) => onChange(e.target.value),
				className: "min-w-0 flex-1 px-1 text-center font-display text-lg font-semibold"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "secondary",
				size: "icon",
				className: "size-10 shrink-0 sm:size-11",
				"aria-label": `Increase ${ariaLabel}`,
				onClick: () => onChange(stepString(value, step, min, max, digits)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
			}),
			suffix ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-7 shrink-0 text-xs text-subtle",
				children: suffix
			}) : null
		]
	});
}
function ResultCard({ result, tapeAverage, units, copied, savedFlash, onCopy, onSave, onDa5500 }) {
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-6 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker text-muted",
				children: "Result"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-2xl font-semibold tracking-tight",
				children: "Enter height and three navel tapes"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "The recorded WHtR is truncated to three decimals. Equal to 0.550 fails."
			})
		]
	});
	const pass = result.passes;
	const maxDisplay = units === "cm" ? `${formatInches(inchesToCm(result.maxWaistIn), 1)} cm` : `${formatInches(result.maxWaistIn, 2)} in`;
	const marginAbs = units === "cm" ? `${formatInches(inchesToCm(Math.abs(result.marginIn)), 1)} cm` : `${formatInches(Math.abs(result.marginIn), 2)} in`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-2xl p-5 shadow-border sm:p-6", pass ? "bg-surface" : "bg-surface"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kicker text-muted",
					children: "Recorded WHtR"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("inline-flex h-8 items-center rounded-sm px-2.5 font-display text-sm font-semibold tracking-wide", pass ? "bg-pass text-pass-foreground" : "bg-fail text-fail-foreground"),
					children: pass ? "MEETS STANDARD" : "DOES NOT MEET"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-3 font-display font-semibold text-stat tabular-nums", pass ? "text-foreground" : "text-fail"),
				"aria-live": "polite",
				children: formatRatio(result.recorded)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-xs text-subtle",
				children: [
					"Truncated from ",
					result.raw.toFixed(6),
					" · DA Form 5500"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Avg navel",
						value: tapeAverage != null ? units === "cm" ? `${formatInches(inchesToCm(tapeAverage), 1)} cm` : `${formatInches(tapeAverage, 3)} in` : "—",
						hint: "3-tape average"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Max waist",
						value: `< ${maxDisplay}`,
						hint: "Strictly below"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: pass ? "Under the line" : "Over the line",
						value: marginAbs,
						hint: pass ? "Room remaining" : "To get under 0.550"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Height",
						value: units === "cm" ? `${formatInches(inchesToCm(result.heightIn), 1)} cm` : `${formatFtIn(result.heightIn)}`,
						hint: `${formatInches(result.heightIn, 1)} in`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: onDa5500,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSpreadsheet, {}), "Fill DA 5500"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						onClick: onCopy,
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "Copied" : "Copy result"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "secondary",
						onClick: onSave,
						children: [savedFlash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), savedFlash ? "Saved" : "Save check"]
					})
				]
			})
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg bg-surface-2 px-3 py-3 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
				className: "text-kicker text-subtle",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
				className: "mt-1 font-display text-lg font-semibold tabular-nums tracking-tight",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-subtle",
				children: hint
			})
		]
	});
}
function RatioGauge({ result }) {
	const min = .35;
	const max = .7;
	const span = .35;
	const linePct = .20000000000000007 / span * 100;
	const valuePct = ((result ? Math.min(max, Math.max(min, result.raw)) : min) - min) / span * 100;
	const pass = result?.passes ?? true;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker text-muted",
				children: "Standard line"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl font-semibold tracking-tight",
				children: "Pass is strictly below 0.550"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "The Army records three decimals and does not round. .549 passes. .550 fails."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-8 mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-3 overflow-hidden rounded-full bg-surface-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-pass/80",
							style: { width: `${linePct}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-1/2 h-5 w-px -translate-y-1/2 bg-foreground",
						style: { left: `${linePct}%` },
						"aria-hidden": true
					}),
					result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-border", pass ? "bg-accent" : "bg-fail"),
						style: { left: `${valuePct}%` },
						"aria-hidden": true
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-between font-mono text-xs text-subtle",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0.350" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "0.550 fail line"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "0.700" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-2 shrink-0 rounded-full bg-pass" }),
						"WHtR ",
						"<",
						" 0.550 — meets the ABCP standard."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-2 shrink-0 rounded-full bg-fail" }), "WHtR ≥ 0.550 — confirmation tape same day, then ABCP flag if it still fails."]
				})]
			})
		]
	});
}
function HistoryCard({ entries, units, onDelete, onClear }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-kicker text-muted",
				children: "This device"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl font-semibold tracking-tight",
				children: "Saved checks"
			})] }), entries.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: onClear,
				children: "Clear"
			}) : null]
		}), entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "Save a check to keep a running log on this device. Nothing is uploaded."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border",
			children: entries.map((entry) => {
				const waist = entry.waist1 != null && entry.waist2 != null && entry.waist3 != null ? units === "cm" ? `${formatInches(inchesToCm(entry.waist1), 1)}/${formatInches(inchesToCm(entry.waist2), 1)}/${formatInches(inchesToCm(entry.waist3), 1)} cm` : `${formatInches(entry.waist1, 1)}/${formatInches(entry.waist2, 1)}/${formatInches(entry.waist3, 1)} in` : units === "cm" ? `${formatInches(inchesToCm(entry.waistIn), 1)} cm` : `${formatInches(entry.waistIn, 1)} in`;
				const when = new Date(entry.at);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-base font-semibold tabular-nums",
							children: [formatRatio(entry.recorded), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("ml-2 text-sm font-medium", entry.passes ? "text-pass" : "text-fail"),
								children: entry.passes ? "Pass" : "Fail"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-subtle",
							children: [
								formatFtIn(entry.heightIn),
								" · navel ",
								waist,
								" ·",
								" ",
								when.toLocaleDateString(void 0, {
									month: "short",
									day: "numeric"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "icon-sm",
						"aria-label": "Delete check",
						onClick: () => onDelete(entry.id),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
					})]
				}, entry.id);
			})
		})]
	});
}
var STEPS = [
	{
		n: "01",
		title: "Height on record",
		body: "Use the Soldier’s official height. DA Form 5500 rounds height to the nearest 0.50 inch (70.2 → 70.0, 70.3 → 70.5). Do not re-measure unless your unit SOP says otherwise."
	},
	{
		n: "02",
		title: "Three tapes at the navel",
		body: "Soldier stands upright, arms at the sides, relaxed. Place the tape horizontal at the navel (belly button), not at the narrowest waist. Pull snug, not compressing skin. Round each reading down to the nearest 0.50 inch, then average the three to three decimal places."
	},
	{
		n: "03",
		title: "Divide and truncate",
		body: "Average waist ÷ recorded height. Record three decimal places. Do not round. .549 meets the standard. .550 does not. Stamp the official DA Form 5500 and sign in ink."
	}
];
var FAQS = [
	{
		q: "What is the standard?",
		a: "A waist-to-height ratio of less than, but not equal to, 0.55. Army Directive 2026-13 made WHtR the sole ABCP assessment under AR 600-9. Height/weight tables and the tape-test body-fat formulas are rescinded."
	},
	{
		q: "Rounded or truncated?",
		a: "Truncated. The Army records three decimals and discards everything after that. .549 is a pass. .550 is a fail. This is the detail most calculators get wrong."
	},
	{
		q: "What happens if I fail?",
		a: "A second measurement by a different team is required the same duty day before any administrative action. If that confirmation is also 0.550 or higher, the Soldier is enrolled in ABCP and flagged. The flag is non-transferable."
	},
	{
		q: "Does a high AFT score exempt me?",
		a: "No. Army Directive 2025-17 (the 465 / 80-per-event exemption) is rescinded. No AFT score exempts a Soldier from WHtR."
	},
	{
		q: "How often is screening?",
		a: "At least twice per calendar year. Commanders may direct a WHtR check at any time. Units must allow at least seven days between an AFT or CFT and a WHtR screening unless operations require otherwise."
	},
	{
		q: "Pregnancy, postpartum, cadets?",
		a: "Existing medical exemptions remain in effect for pregnant and postpartum Soldiers. The standard applies to USMA and Senior ROTC cadets. WHtR is recorded on DA Form 5500 and in ATIS. DA Form 5501 is no longer used."
	},
	{
		q: "Separations during the 180-day review?",
		a: "The Army is running a 180-day assessment of the WHtR standard (from the 7 July 2026 directive). No Soldier will be separated for WHtR failure until that review is complete and further guidance is issued. Soldiers already in ABCP stay enrolled until they meet WHtR."
	}
];
function Guide() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-2 lg:items-start",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kicker text-muted",
					children: "How to measure"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl",
					children: "Navel, not the natural waist"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MeasureFigure, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-5 space-y-4",
					children: STEPS.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-sm font-semibold text-accent tabular-nums",
							children: step.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: step.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: step.body
						})] })]
					}, step.n))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kicker text-muted",
					children: "AD 2026-13 · AR 600-9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl",
					children: "Policy in brief"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Unofficial helper. Confirm against the directive, your unit SOP, and the DA 5500 your NCOIC records in ATIS."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-border border-t border-border",
					children: FAQS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Faq, {
						q: item.q,
						a: item.a
					}, item.q))
				})
			]
		})]
	});
}
function Faq({ q, a }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-expanded": open,
		onClick: () => setOpen((v) => !v),
		className: "flex w-full items-center justify-between gap-3 py-3.5 text-left",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: q
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-4 shrink-0 text-muted transition-transform duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", open && "rotate-180") })]
	}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "pb-3.5 text-sm text-muted",
		children: a
	}) : null] });
}
function MeasureFigure() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-5 overflow-hidden rounded-lg bg-surface-2 px-4 py-5 shadow-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 280 160",
			className: "mx-auto h-auto w-full max-w-sm",
			role: "img",
			"aria-label": "Tape placed horizontally at the navel",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "140",
					y: "18",
					textAnchor: "middle",
					fill: "#8d9484",
					fontSize: "10",
					fontFamily: "IBM Plex Sans, sans-serif",
					letterSpacing: "1.4",
					children: "MEASURE AT THE NAVEL"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "140",
					cy: "48",
					rx: "16",
					ry: "18",
					fill: "none",
					stroke: "#9aaa78",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M124 64 C124 78 128 92 140 118 C152 92 156 78 156 64",
					fill: "none",
					stroke: "#9aaa78",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M132 118 L140 152 L148 118",
					fill: "none",
					stroke: "#9aaa78",
					strokeWidth: "2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "48",
					y1: "96",
					x2: "232",
					y2: "96",
					stroke: "#e8ebe3",
					strokeWidth: "1.5",
					strokeDasharray: "5 4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "140",
					cy: "96",
					r: "3.5",
					fill: "#e8ebe3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "236",
					y: "100",
					fill: "#e8ebe3",
					fontSize: "11",
					fontFamily: "IBM Plex Sans Condensed, sans-serif",
					children: "navel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "48",
					y: "88",
					fill: "#8d9484",
					fontSize: "10",
					fontFamily: "IBM Plex Sans, sans-serif",
					children: "tape horizontal"
				})
			]
		})
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppChrome, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-kicker text-accent",
					children: "U.S. Army · AD 2026-13 · AR 600-9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl",
					children: "Height & waist calculator"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-xl text-sm text-muted sm:text-base",
					children: "Three navel tapes, then waist ÷ height. Pass is under 0.550, truncated — not rounded. Stamp the official DA Form 5500 when you are done."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Guide, {})]
		})]
	});
}
//#endregion
export { Home as component };
