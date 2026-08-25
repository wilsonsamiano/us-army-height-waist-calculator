import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Trash2, d as Plus, h as Copy, m as Download, r as UserPlus, s as Share2, u as Printer, v as Check } from "../_libs/lucide-react.mjs";
import { a as cn, i as Button, n as Route$1 } from "./router-DPvq52mF.mjs";
import { n as SiteFooter, t as AppChrome } from "./site-header-BXm-Quk7.mjs";
import { C as remarksForForm, D as saveDraft, E as roundNearestHalfInch, T as roundDownHalfInch, _ as loadDraft, b as nextSoldier, c as consumeTransfer, d as formatFtIn, f as formatInches, i as atisBlock, k as upsertSession, n as NavelTapeGrid, o as compileRecord, p as formatRatio, r as armyDate, t as Input, u as fileStem, v as loadSession, w as removeSession, x as parseNum } from "./da5500-7fx8iAtO.mjs";
import { n as StandardFonts, r as TextAlignment, t as PDFDocument } from "../_libs/pdf-lib.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/da-5500-sHNkJxSq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FORM_JPG = "/forms/da-form-5500-jul-2026.jpg";
var FORM_PDF = "/forms/da-form-5500-jul-2026.pdf";
/** Fully-qualified AcroForm names from the APD e-file. */
var F = {
	name: "form1[0].Page1[0].Name[0]",
	rank: "form1[0].Page1[0].Rank[0]",
	height: "form1[0].Page1[0].Height[0]",
	age: "form1[0].Page1[0].Age[0]",
	sex: "form1[0].Page1[0].Radio_Button_Group_Sex[0]",
	w1: "form1[0].Page1[0].Waist_1[0]",
	w2: "form1[0].Page1[0].Waist_2[0]",
	w3: "form1[0].Page1[0].Waist_3[0]",
	wavg: "form1[0].Page1[0].Waist_Average[0]",
	whtr: "form1[0].Page1[0].Waist_To_Height_Ratio[0]",
	cw1: "form1[0].Page1[0].Waist_1_Confirmation[0]",
	cw2: "form1[0].Page1[0].Waist_2_Confirmation[0]",
	cw3: "form1[0].Page1[0].Waist_3_Confirmation[0]",
	cwavg: "form1[0].Page1[0].Waist_Average_Confirmation[0]",
	cwhtr: "form1[0].Page1[0].Waist_To_Height_Confirmation[0]",
	remarks: "form1[0].Page1[0].Remarks[0]",
	compliance: "form1[0].Page1[0].Compliance_Group[0]",
	prepName: "form1[0].Page1[0].Name_Prepared_By[0]",
	prepRank: "form1[0].Page1[0].Rank_Prepared_By[0]",
	prepDate: "form1[0].Page1[0].Prepared_By_Date[0]",
	supName: "form1[0].Page1[0].Name_Approved_By[0]",
	supRank: "form1[0].Page1[0].Rank_Approved_By[0]",
	supDate: "form1[0].Page1[0].Approved_By_Date[0]"
};
function fieldKnockout(field) {
	if (!field.knockout) return null;
	const w = field.knockoutW ?? (field.align === "center" ? 40 : field.w ?? 72);
	const h = field.knockoutH ?? field.size + 3;
	return {
		x: field.align === "center" ? field.x - w / 2 : field.x - 1,
		y: field.y - field.size + 2,
		w,
		h
	};
}
/** Convert a PDF widget rect [llx, lly, urx, ury] (origin bottom-left) to SVG overlay coords. */
function widget(llx, lly, urx, ury, extra) {
	const align = extra?.align ?? "left";
	const h = ury - lly;
	const size = extra?.size ?? Math.min(9, Math.max(7, h - 1));
	return {
		x: align === "center" ? (llx + urx) / 2 : llx + 1,
		y: 792 - lly - 1.4,
		w: urx - llx - 2,
		size,
		align,
		...extra
	};
}
function check(llx, lly, urx, ury) {
	return {
		x: llx + .8,
		y: 792 - lly - .8,
		size: Math.min(11, ury - lly + 1)
	};
}
var T = {
	name: widget(40.003, 593.498, 410.004, 603.499, { size: 9 }),
	rank: widget(429.976, 593.498, 474.976, 603.499, {
		size: 8,
		align: "center"
	}),
	note: widget(490, 593.498, 570, 603.499, { size: 8 }),
	height: widget(109.151, 564.5, 154.151, 574.501, {
		size: 9,
		align: "center"
	}),
	age: widget(429.976, 564.5, 474.976, 574.501, {
		size: 9,
		align: "center"
	}),
	sexMale: check(268.798, 567.875, 280.798, 579.875),
	sexFemale: check(316.287, 567.831, 328.287, 579.831),
	w1: widget(275.777, 512.025, 315.777, 522.026, {
		size: 9,
		align: "center"
	}),
	w2: widget(354.124, 512.025, 394.124, 522.026, {
		size: 9,
		align: "center"
	}),
	w3: widget(432.474, 512.025, 472.474, 522.026, {
		size: 9,
		align: "center"
	}),
	wavg: widget(510.823, 512.025, 550.823, 522.026, {
		size: 8,
		align: "center"
	}),
	whtr: widget(510.823, 460.584, 550.823, 470.585, {
		size: 9,
		align: "center"
	}),
	cw1: widget(275.777, 365.853, 315.777, 375.854, {
		size: 9,
		align: "center"
	}),
	cw2: widget(354.124, 365.853, 394.124, 375.854, {
		size: 9,
		align: "center"
	}),
	cw3: widget(434.404, 365.853, 474.404, 375.854, {
		size: 9,
		align: "center"
	}),
	cwavg: widget(510.823, 365.853, 550.823, 375.854, {
		size: 8,
		align: "center"
	}),
	cwhtr: widget(510.823, 314.518, 550.823, 324.519, {
		size: 9,
		align: "center"
	}),
	remarks: {
		x: 41,
		y: 522,
		w: 528,
		size: 8
	},
	meetX: check(53.632, 119.842, 65.632, 131.842),
	failX: check(259.813, 119.842, 271.813, 131.842),
	prepName: widget(40.003, 83.342, 173.002, 103.343, { size: 8 }),
	prepRank: widget(178.821, 87.843, 223.821, 97.844, {
		size: 8,
		align: "center"
	}),
	prepDate: widget(238.686, 87.843, 293.687, 97.844, { size: 8 }),
	supName: widget(307.999, 83.342, 440.998, 103.343, { size: 8 }),
	supRank: widget(447.616, 87.843, 492.616, 97.844, {
		size: 8,
		align: "center"
	}),
	supDate: widget(505.352, 87.843, 560.353, 97.844, { size: 8 })
};
function SvgText({ field, value, bold }) {
	if (!value) return null;
	const anchor = field.align === "center" ? "middle" : "start";
	const ko = fieldKnockout(field);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [ko ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x: ko.x,
		y: ko.y,
		width: ko.w,
		height: ko.h,
		fill: "#ffffff"
	}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x: field.x,
		y: field.y,
		textAnchor: anchor,
		fontSize: field.size,
		fontWeight: bold ? 700 : 400,
		fontFamily: "Times New Roman, Times, ui-serif, serif",
		fill: "#121410",
		children: value
	})] });
}
function SvgCheck({ x, y, size }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
		x,
		y,
		fontSize: size,
		fontWeight: 700,
		fontFamily: "Helvetica, Arial, sans-serif",
		fill: "#121410",
		children: "X"
	});
}
function wrapRemarks(text, width, size) {
	if (!text) return [];
	const maxChars = Math.max(24, Math.floor(width / (size * .48)));
	const lines = [];
	for (const para of text.split("\n")) {
		let rest = para;
		if (!rest) {
			lines.push("");
			continue;
		}
		while (rest.length > maxChars) {
			let cut = rest.lastIndexOf(" ", maxChars);
			if (cut < 12) cut = maxChars;
			lines.push(rest.slice(0, cut));
			rest = rest.slice(cut).trimStart();
		}
		if (rest) lines.push(rest);
	}
	return lines.slice(0, 9);
}
function OfficialForm({ paint }) {
	const remarks = wrapRemarks(paint.remarks, T.remarks.w ?? 528, T.remarks.size);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		id: "da-sheet",
		className: "da-paper relative mx-auto w-full max-w-[8.5in] overflow-hidden bg-paper text-ink shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: FORM_JPG,
			alt: "DA Form 5500, JUL 2026",
			className: "block w-full select-none",
			draggable: false
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: `0 0 612 792`,
			className: "absolute inset-0 h-full w-full",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.name,
					value: paint.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.rank,
					value: paint.rank
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.note,
					value: paint.note
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.height,
					value: paint.height,
					bold: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.age,
					value: paint.age
				}),
				paint.sex === "M" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCheck, {
					x: T.sexMale.x,
					y: T.sexMale.y,
					size: T.sexMale.size
				}) : null,
				paint.sex === "F" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCheck, {
					x: T.sexFemale.x,
					y: T.sexFemale.y,
					size: T.sexFemale.size
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.w1,
					value: paint.w1,
					bold: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.w2,
					value: paint.w2,
					bold: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.w3,
					value: paint.w3,
					bold: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.wavg,
					value: paint.wavg,
					bold: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.whtr,
					value: paint.whtr,
					bold: true
				}),
				paint.confirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
						field: T.cw1,
						value: paint.cw1,
						bold: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
						field: T.cw2,
						value: paint.cw2,
						bold: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
						field: T.cw3,
						value: paint.cw3,
						bold: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
						field: T.cwavg,
						value: paint.cwavg,
						bold: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
						field: T.cwhtr,
						value: paint.cwhtr,
						bold: true
					})
				] }) : null,
				remarks.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: T.remarks.x,
					y: T.remarks.y + i * 11,
					fontSize: T.remarks.size,
					fontFamily: "Times New Roman, Times, ui-serif, serif",
					fill: "#121410",
					children: line
				}, i)),
				paint.meets === true ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCheck, {
					x: T.meetX.x,
					y: T.meetX.y,
					size: T.meetX.size
				}) : null,
				paint.meets === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgCheck, {
					x: T.failX.x,
					y: T.failX.y,
					size: T.failX.size
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.prepName,
					value: paint.prepName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.prepRank,
					value: paint.prepRank
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.prepDate,
					value: paint.prepDate
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.supName,
					value: paint.supName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.supRank,
					value: paint.supRank
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SvgText, {
					field: T.supDate,
					value: paint.supDate
				})
			]
		})]
	});
}
function paintFromRecord(record) {
	const init = record.initial;
	const conf = record.confirmation;
	return {
		name: record.identity.name,
		rank: record.identity.rank,
		note: record.identity.note,
		height: formatInches(record.heightRecorded, 1),
		age: record.identity.age,
		sex: record.identity.sex,
		w1: formatInches(init.waist1, 1),
		w2: formatInches(init.waist2, 1),
		w3: formatInches(init.waist3, 1),
		wavg: formatInches(init.waistRecorded, 3),
		whtr: formatRatio(init.recorded),
		confirm: Boolean(conf),
		cw1: conf ? formatInches(conf.waist1, 1) : "",
		cw2: conf ? formatInches(conf.waist2, 1) : "",
		cw3: conf ? formatInches(conf.waist3, 1) : "",
		cwavg: conf ? formatInches(conf.waistRecorded, 3) : "",
		cwhtr: conf ? formatRatio(conf.recorded) : "",
		remarks: remarksForForm(record),
		meets: record.meets,
		prepName: record.measurer.name,
		prepRank: record.measurer.rank,
		prepDate: armyDate(record.date),
		supName: record.supervisor.name,
		supRank: record.supervisor.rank,
		supDate: armyDate(record.supervisorDate)
	};
}
function paintFromDraft(draft) {
	const record = compileRecord(draft);
	if (record) return paintFromRecord(record);
	return {
		name: draft.identity.name,
		rank: draft.identity.rank,
		note: draft.identity.note,
		height: draft.heightIn,
		age: draft.identity.age,
		sex: draft.identity.sex,
		w1: draft.waist1,
		w2: draft.waist2,
		w3: draft.waist3,
		wavg: "",
		whtr: "",
		confirm: draft.confirm.enabled,
		cw1: draft.confirm.waist1,
		cw2: draft.confirm.waist2,
		cw3: draft.confirm.waist3,
		cwavg: "",
		cwhtr: "",
		remarks: draft.remarks,
		meets: null,
		prepName: draft.measurer.name,
		prepRank: draft.measurer.rank,
		prepDate: armyDate(draft.date),
		supName: draft.supervisor.name,
		supRank: draft.supervisor.rank,
		supDate: armyDate(draft.supervisorDate)
	};
}
var templateBytes = null;
async function loadTemplate() {
	if (templateBytes) return templateBytes;
	const res = await fetch(FORM_PDF);
	if (!res.ok) throw new Error("Could not load DA Form 5500");
	templateBytes = await res.arrayBuffer();
	return templateBytes;
}
function fillText(form, font, name, value, opts) {
	if (!value) return;
	let field;
	try {
		field = form.getTextField(name);
	} catch {
		return;
	}
	try {
		if (field.isReadOnly()) field.disableReadOnly();
	} catch {}
	if (opts?.center) field.setAlignment(TextAlignment.Center);
	field.setFontSize(opts?.size ?? 9);
	field.setText(value);
	try {
		field.updateAppearances(font);
	} catch {}
}
function selectRadio(form, name, values) {
	let group;
	try {
		group = form.getRadioGroup(name);
	} catch {
		return;
	}
	for (const value of values) try {
		group.select(value);
		return;
	} catch {}
}
function stamp(form, font, paint) {
	fillText(form, font, F.name, paint.name, { size: 9 });
	fillText(form, font, F.rank, paint.rank, {
		size: 8,
		center: true
	});
	fillText(form, font, F.height, paint.height, {
		size: 9,
		center: true
	});
	fillText(form, font, F.age, paint.age, {
		size: 9,
		center: true
	});
	fillText(form, font, F.w1, paint.w1, {
		size: 9,
		center: true
	});
	fillText(form, font, F.w2, paint.w2, {
		size: 9,
		center: true
	});
	fillText(form, font, F.w3, paint.w3, {
		size: 9,
		center: true
	});
	fillText(form, font, F.wavg, paint.wavg, {
		size: 8,
		center: true
	});
	fillText(form, font, F.whtr, paint.whtr, {
		size: 9,
		center: true
	});
	if (paint.confirm) {
		fillText(form, font, F.cw1, paint.cw1, {
			size: 9,
			center: true
		});
		fillText(form, font, F.cw2, paint.cw2, {
			size: 9,
			center: true
		});
		fillText(form, font, F.cw3, paint.cw3, {
			size: 9,
			center: true
		});
		fillText(form, font, F.cwavg, paint.cwavg, {
			size: 8,
			center: true
		});
		fillText(form, font, F.cwhtr, paint.cwhtr, {
			size: 9,
			center: true
		});
	}
	fillText(form, font, F.remarks, paint.remarks, { size: 8 });
	fillText(form, font, F.prepName, paint.prepName, { size: 8 });
	fillText(form, font, F.prepRank, paint.prepRank, {
		size: 8,
		center: true
	});
	fillText(form, font, F.prepDate, paint.prepDate, { size: 8 });
	fillText(form, font, F.supName, paint.supName, { size: 8 });
	fillText(form, font, F.supRank, paint.supRank, {
		size: 8,
		center: true
	});
	fillText(form, font, F.supDate, paint.supDate, { size: 8 });
	if (paint.sex === "M") selectRadio(form, F.sex, ["2"]);
	if (paint.sex === "F") selectRadio(form, F.sex, ["1"]);
	if (paint.meets === true) selectRadio(form, F.compliance, ["1"]);
	if (paint.meets === false) selectRadio(form, F.compliance, ["2"]);
}
async function buildDa5500Pdf(record) {
	const bytes = await loadTemplate();
	const pdf = await PDFDocument.load(bytes);
	const font = await pdf.embedFont(StandardFonts.TimesRoman);
	stamp(pdf.getForm(), font, paintFromRecord(record));
	return pdf.save({ updateFieldAppearances: true });
}
async function downloadDa5500Pdf(record) {
	const bytes = await buildDa5500Pdf(record);
	const blob = new Blob([bytes], { type: "application/pdf" });
	const file = new File([blob], `${fileStem(record)}.pdf`, { type: "application/pdf" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = file.name;
	a.rel = "noopener";
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.setTimeout(() => URL.revokeObjectURL(url), 1500);
	return file;
}
async function shareDa5500(record, file) {
	const payload = {
		files: [file],
		title: file.name,
		text: "DA Form 5500, JUL 2026"
	};
	if (typeof navigator.share === "function" && navigator.canShare?.(payload)) try {
		await navigator.share(payload);
		return true;
	} catch {
		return false;
	}
	return false;
}
function parsePrefill(h, w, w1, w2, w3) {
	if (h == null || !Number.isFinite(h) || h <= 0) return null;
	if (w1 != null && w2 != null && w3 != null && w1 > 0 && w2 > 0 && w3 > 0) return {
		heightIn: h,
		waist1: w1,
		waist2: w2,
		waist3: w3
	};
	if (w != null && Number.isFinite(w) && w > 0) return {
		heightIn: h,
		waist1: w,
		waist2: w,
		waist3: w
	};
	return null;
}
function Da5500Form({ prefillHeight, prefillWaist, prefillW1, prefillW2, prefillW3 }) {
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [session, setSession] = (0, import_react.useState)([]);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [savedFlash, setSavedFlash] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const loaded = loadDraft();
		const transfer = parsePrefill(prefillHeight, prefillWaist, prefillW1, prefillW2, prefillW3) ?? consumeTransfer();
		if (transfer) {
			loaded.heightIn = String(Math.round(transfer.heightIn * 10) / 10);
			loaded.waist1 = Number(transfer.waist1).toFixed(1);
			loaded.waist2 = Number(transfer.waist2).toFixed(1);
			loaded.waist3 = Number(transfer.waist3).toFixed(1);
		}
		setDraft(loaded);
		setSession(loadSession());
	}, [
		prefillHeight,
		prefillWaist,
		prefillW1,
		prefillW2,
		prefillW3
	]);
	(0, import_react.useEffect)(() => {
		if (!draft) return;
		saveDraft(draft);
	}, [draft]);
	const record = (0, import_react.useMemo)(() => draft ? compileRecord(draft) : null, [draft]);
	const paint = (0, import_react.useMemo)(() => draft ? paintFromDraft(draft) : null, [draft]);
	function patch(next) {
		setDraft((d) => d ? {
			...d,
			...next
		} : d);
	}
	if (!draft || !paint) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-96 rounded-2xl bg-surface shadow-border",
		"aria-hidden": true
	});
	async function onPdf() {
		if (!record) return;
		setBusy(true);
		try {
			const file = await downloadDa5500Pdf(record);
			await shareDa5500(record, file);
		} finally {
			setBusy(false);
		}
	}
	async function onShare() {
		if (!record) return;
		setBusy(true);
		try {
			const file = await downloadDa5500Pdf(record);
			if (!await shareDa5500(record, file)) {
				await navigator.clipboard.writeText(atisBlock(record));
				setCopied(true);
				window.setTimeout(() => setCopied(false), 1600);
			}
		} finally {
			setBusy(false);
		}
	}
	function onCopy() {
		if (!record) return;
		navigator.clipboard.writeText(atisBlock(record)).then(() => {
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		});
	}
	function onSaveLog() {
		if (!record || !draft) return;
		setSession(upsertSession(draft, record));
		setSavedFlash(true);
		window.setTimeout(() => setSavedFlash(false), 1400);
	}
	function onNewSoldier() {
		if (!draft) return;
		setDraft(nextSoldier(draft));
	}
	const heightRec = parseNum(draft.heightIn) != null ? roundNearestHalfInch(parseNum(draft.heightIn)) : null;
	const failNeedsConfirm = record && !record.initial.meets && !draft.confirm.enabled;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [
			session.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "no-print rounded-2xl bg-surface p-4 shadow-border sm:p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-end justify-between gap-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kicker text-muted",
						children: "Today’s log"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-1 font-display text-lg font-semibold tracking-tight",
						children: [
							session.length,
							" Soldier",
							session.length === 1 ? "" : "s",
							" screened"
						]
					})] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border",
					children: session.slice(0, 12).map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "min-w-0 flex-1 text-left",
								onClick: () => setDraft(row.draft),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-medium",
									children: [row.rank ? `${row.rank} ` : "", row.name]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-mono text-xs text-subtle",
									children: [
										formatFtIn(row.heightIn),
										" · WHtR ",
										formatRatio(row.recorded)
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("rounded-sm px-2 py-1 text-xs font-semibold", row.meets ? "bg-pass text-pass-foreground" : "bg-fail text-fail-foreground"),
								children: row.meets ? "MEETS" : "FAIL"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-foreground",
								"aria-label": `Remove ${row.name}`,
								onClick: () => setSession(removeSession(row.id)),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}, row.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "no-print rounded-2xl bg-surface p-4 shadow-border sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kicker text-muted",
						children: "DA Form 5500 · JUL 2026"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "Screening worksheet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted",
						children: "Values stamp onto the official form. Height rounds to the nearest 0.50 in. Each navel tape rounds down, then averages to three decimals. WHtR is truncated. Signatures stay blank for wet ink."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name (Last, First, MI)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoComplete: "name",
								value: draft.identity.name,
								onChange: (e) => patch({ identity: {
									...draft.identity,
									name: e.target.value
								} })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Rank",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.identity.rank,
								onChange: (e) => patch({ identity: {
									...draft.identity,
									rank: e.target.value
								} })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "mb-2 block text-kicker text-muted",
								children: "Sex"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [["M", "Male"], ["F", "Female"]].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => patch({ identity: {
										...draft.identity,
										sex: value
									} }),
									className: cn("h-12 rounded-md text-sm font-medium shadow-border transition-colors duration-[var(--motion-quick)]", draft.identity.sex === value ? "bg-accent text-accent-foreground" : "bg-surface-2 text-muted hover:text-foreground"),
									children: label
								}, value))
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Age",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "numeric",
									value: draft.identity.age,
									onChange: (e) => patch({ identity: {
										...draft.identity,
										age: e.target.value
									} })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Note",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.identity.note,
									onChange: (e) => patch({ identity: {
										...draft.identity,
										note: e.target.value
									} })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Height (inches)",
							hint: heightRec != null ? `Records as ${formatInches(heightRec, 1)} in (${formatFtIn(heightRec)})` : "Rounded to nearest 0.50 in",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: draft.heightIn,
								onChange: (e) => patch({ heightIn: e.target.value })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Date (prepared)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: draft.date,
								onChange: (e) => patch({ date: e.target.value })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavelTapeGrid, {
							idPrefix: "da-navel",
							values: [
								draft.waist1,
								draft.waist2,
								draft.waist3
							],
							onChange: (index, value) => {
								const key = [
									"waist1",
									"waist2",
									"waist3"
								][index];
								patch({ [key]: value });
							},
							recorded: [
								parseNum(draft.waist1) != null ? roundDownHalfInch(parseNum(draft.waist1)) : null,
								parseNum(draft.waist2) != null ? roundDownHalfInch(parseNum(draft.waist2)) : null,
								parseNum(draft.waist3) != null ? roundDownHalfInch(parseNum(draft.waist3)) : null
							],
							average: record ? formatInches(record.initial.waistRecorded, 3) : null
						})
					}),
					record ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("mt-5 rounded-xl px-4 py-4 shadow-border sm:px-5", record.meets ? "bg-pass/15" : "bg-fail/15"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-kicker text-muted",
								children: "Live DA 5500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap items-end justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-stat font-semibold tracking-tight",
									children: formatRatio((record.confirmation ?? record.initial).recorded)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("rounded-sm px-2 py-1 text-sm font-semibold", record.meets ? "bg-pass text-pass-foreground" : "bg-fail text-fail-foreground"),
									children: record.meets ? "MEETS STANDARD" : "DOES NOT MEET"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 font-mono text-xs text-muted",
								children: [
									"Avg ",
									formatInches(record.initial.waistRecorded, 3),
									" in ÷",
									" ",
									formatInches(record.heightRecorded, 1),
									" in · truncate, do not round"
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: "Enter height and the first, second, and third navel tapes to fill the form."
					}),
					failNeedsConfirm ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-md bg-fail/15 px-3 py-3 text-sm",
						children: "Initial WHtR is 0.550 or higher. A different team must re-tape the same duty day before any administrative action."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-5 flex items-start gap-3 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-4 accent-accent",
							checked: draft.confirm.enabled,
							onChange: (e) => patch({ confirm: {
								...draft.confirm,
								enabled: e.target.checked
							} })
						}), "Confirmation WHtR measurement (different team, same duty day)"]
					}),
					draft.confirm.enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavelTapeGrid, {
								idPrefix: "da-confirm",
								caption: "Confirmation waist at navel (inches)",
								values: [
									draft.confirm.waist1,
									draft.confirm.waist2,
									draft.confirm.waist3
								],
								onChange: (index, value) => {
									const key = [
										"waist1",
										"waist2",
										"waist3"
									][index];
									patch({ confirm: {
										...draft.confirm,
										[key]: value
									} });
								},
								recorded: [
									parseNum(draft.confirm.waist1) != null ? roundDownHalfInch(parseNum(draft.confirm.waist1)) : null,
									parseNum(draft.confirm.waist2) != null ? roundDownHalfInch(parseNum(draft.confirm.waist2)) : null,
									parseNum(draft.confirm.waist3) != null ? roundDownHalfInch(parseNum(draft.confirm.waist3)) : null
								],
								average: record?.confirmation ? formatInches(record.confirmation.waistRecorded, 3) : null
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Confirmation team (name)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.confirm.measurer.name,
									onChange: (e) => patch({ confirm: {
										...draft.confirm,
										measurer: {
											...draft.confirm.measurer,
											name: e.target.value
										}
									} })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Confirmation team (rank)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.confirm.measurer.rank,
									onChange: (e) => patch({ confirm: {
										...draft.confirm,
										measurer: {
											...draft.confirm.measurer,
											rank: e.target.value
										}
									} })
								})
							})]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid gap-4 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Prepared by (name)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.measurer.name,
									onChange: (e) => patch({ measurer: {
										...draft.measurer,
										name: e.target.value
									} })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Prepared by (rank)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.measurer.rank,
									onChange: (e) => patch({ measurer: {
										...draft.measurer,
										rank: e.target.value
									} })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Approved by supervisor (name)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.supervisor.name,
									onChange: (e) => patch({ supervisor: {
										...draft.supervisor,
										name: e.target.value
									} })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Supervisor rank",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: draft.supervisor.rank,
									onChange: (e) => patch({ supervisor: {
										...draft.supervisor,
										rank: e.target.value
									} })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Supervisor date",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "date",
									value: draft.supervisorDate,
									onChange: (e) => patch({ supervisorDate: e.target.value })
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "DoD ID (ATIS only — not on the form)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "numeric",
								autoComplete: "off",
								value: draft.identity.dodId,
								onChange: (e) => patch({ identity: {
									...draft.identity,
									dodId: e.target.value
								} })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Unit (ATIS only — not on the form)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: draft.identity.unit,
								onChange: (e) => patch({ identity: {
									...draft.identity,
									unit: e.target.value
								} })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Remarks",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "mt-2 min-h-24 w-full rounded-md bg-surface-2 px-3 py-2 text-sm text-foreground shadow-border outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
							value: draft.remarks,
							onChange: (e) => patch({ remarks: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								onClick: onPdf,
								disabled: !record || busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download official PDF"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								onClick: () => window.print(),
								disabled: !record,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Print form"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "secondary",
								onClick: onShare,
								disabled: !record || busy,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}), "Share"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: onCopy,
								disabled: !record,
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), copied ? "Copied" : "Copy for ATIS"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								onClick: onSaveLog,
								disabled: !record,
								children: [savedFlash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), savedFlash ? "Saved" : "Save to log"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								onClick: onNewSoldier,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {}), "Next Soldier"]
							})
						]
					}),
					record ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 font-mono text-xs text-subtle",
						children: [
							"File ",
							fileStem(record),
							".pdf · height ",
							formatInches(record.heightRecorded, 1),
							" in",
							" ",
							"(",
							formatFtIn(record.heightRecorded),
							")"
						]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfficialForm, { paint })
		]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mt-4 block first:mt-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-2 block text-kicker text-muted",
				children: label
			}),
			children,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block font-mono text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function Da5500Page() {
	const { h, w, w1, w2, w3 } = Route$1.useSearch();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "no-print",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Da5500Form, {
			prefillHeight: h,
			prefillWaist: w,
			prefillW1: w1,
			prefillW2: w2,
			prefillW3: w3
		})
	});
}
//#endregion
export { Da5500Page as component };
