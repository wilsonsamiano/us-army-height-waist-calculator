import { PDFDocument, StandardFonts, TextAlignment, type PDFFont, type PDFForm } from "pdf-lib";
import {
  type Da5500Draft,
  type Da5500Record,
  armyDate,
  compileRecord,
  fileStem,
  remarksForForm,
} from "./da5500";
import { F, FORM_PDF, type FormPaint } from "./da5500-layout";
import { formatInches, formatRatio } from "./whtr";

export function paintFromRecord(record: Da5500Record): FormPaint {
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
    supDate: armyDate(record.supervisorDate),
  };
}

export function paintFromDraft(draft: Da5500Draft): FormPaint {
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
    supDate: armyDate(draft.supervisorDate),
  };
}

let templateBytes: ArrayBuffer | null = null;

async function loadTemplate(): Promise<ArrayBuffer> {
  if (templateBytes) return templateBytes;
  const res = await fetch(FORM_PDF);
  if (!res.ok) throw new Error("Could not load DA Form 5500");
  templateBytes = await res.arrayBuffer();
  return templateBytes;
}

function fillText(
  form: PDFForm,
  font: PDFFont,
  name: string,
  value: string,
  opts?: { size?: number; center?: boolean },
) {
  if (!value) return;
  let field;
  try {
    field = form.getTextField(name);
  } catch {
    return;
  }
  try {
    if (field.isReadOnly()) field.disableReadOnly();
  } catch {
    /* keep going */
  }
  if (opts?.center) field.setAlignment(TextAlignment.Center);
  field.setFontSize(opts?.size ?? 9);
  field.setText(value);
  try {
    field.updateAppearances(font);
  } catch {
    /* appearance optional */
  }
}

function selectRadio(form: PDFForm, name: string, values: string[]) {
  let group;
  try {
    group = form.getRadioGroup(name);
  } catch {
    return;
  }
  for (const value of values) {
    try {
      group.select(value);
      return;
    } catch {
      /* try next export value */
    }
  }
}

function stamp(form: PDFForm, font: PDFFont, paint: FormPaint) {
  fillText(form, font, F.name, paint.name, { size: 9 });
  fillText(form, font, F.rank, paint.rank, { size: 8, center: true });
  fillText(form, font, F.height, paint.height, { size: 9, center: true });
  fillText(form, font, F.age, paint.age, { size: 9, center: true });
  fillText(form, font, F.w1, paint.w1, { size: 9, center: true });
  fillText(form, font, F.w2, paint.w2, { size: 9, center: true });
  fillText(form, font, F.w3, paint.w3, { size: 9, center: true });
  fillText(form, font, F.wavg, paint.wavg, { size: 8, center: true });
  fillText(form, font, F.whtr, paint.whtr, { size: 9, center: true });

  if (paint.confirm) {
    fillText(form, font, F.cw1, paint.cw1, { size: 9, center: true });
    fillText(form, font, F.cw2, paint.cw2, { size: 9, center: true });
    fillText(form, font, F.cw3, paint.cw3, { size: 9, center: true });
    fillText(form, font, F.cwavg, paint.cwavg, { size: 8, center: true });
    fillText(form, font, F.cwhtr, paint.cwhtr, { size: 9, center: true });
  }

  fillText(form, font, F.remarks, paint.remarks, { size: 8 });
  fillText(form, font, F.prepName, paint.prepName, { size: 8 });
  fillText(form, font, F.prepRank, paint.prepRank, { size: 8, center: true });
  fillText(form, font, F.prepDate, paint.prepDate, { size: 8 });
  fillText(form, font, F.supName, paint.supName, { size: 8 });
  fillText(form, font, F.supRank, paint.supRank, { size: 8, center: true });
  fillText(form, font, F.supDate, paint.supDate, { size: 8 });

  // Opt order on this APD e-file: "1" is FEMALE, "2" is MALE.
  if (paint.sex === "M") selectRadio(form, F.sex, ["2"]);
  if (paint.sex === "F") selectRadio(form, F.sex, ["1"]);
  // Compliance: "1" is MEETS STANDARD (left), "2" is DOES NOT MEET (right).
  if (paint.meets === true) selectRadio(form, F.compliance, ["1"]);
  if (paint.meets === false) selectRadio(form, F.compliance, ["2"]);
}

export async function buildDa5500Pdf(record: Da5500Record): Promise<Uint8Array> {
  const bytes = await loadTemplate();
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.TimesRoman);
  stamp(pdf.getForm(), font, paintFromRecord(record));
  return pdf.save({ updateFieldAppearances: true });
}

export async function downloadDa5500Pdf(record: Da5500Record): Promise<File> {
  const bytes = await buildDa5500Pdf(record);
  const blob = new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
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

export async function shareDa5500(record: Da5500Record, file: File): Promise<boolean> {
  const payload = { files: [file], title: file.name, text: "DA Form 5500, JUL 2026" };
  if (typeof navigator.share === "function" && navigator.canShare?.(payload)) {
    try {
      await navigator.share(payload);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
