/** Field positions taken from the official DA Form 5500 JUL 2026 AcroForm widgets. Origin top-left, PDF points, page 612×792. */

export const PAGE_W = 612;
export const PAGE_H = 792;
export const FORM_JPG = "/forms/da-form-5500-jul-2026.jpg";
export const FORM_PDF = "/forms/da-form-5500-jul-2026.pdf";

/** Fully-qualified AcroForm names from the APD e-file. */
export const F = {
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
  supDate: "form1[0].Page1[0].Approved_By_Date[0]",
} as const;

export type TextField = {
  x: number;
  y: number;
  w?: number;
  size: number;
  align?: "left" | "center";
  knockout?: boolean;
  knockoutW?: number;
  knockoutH?: number;
};

export type CheckField = { x: number; y: number; size: number };

export function fieldKnockout(field: TextField): { x: number; y: number; w: number; h: number } | null {
  if (!field.knockout) return null;
  const w = field.knockoutW ?? (field.align === "center" ? 40 : (field.w ?? 72));
  const h = field.knockoutH ?? field.size + 3;
  const x = field.align === "center" ? field.x - w / 2 : field.x - 1;
  const y = field.y - field.size + 2;
  return { x, y, w, h };
}

/** Convert a PDF widget rect [llx, lly, urx, ury] (origin bottom-left) to SVG overlay coords. */
function widget(
  llx: number,
  lly: number,
  urx: number,
  ury: number,
  extra?: Partial<TextField>,
): TextField {
  const align = extra?.align ?? "left";
  const h = ury - lly;
  const size = extra?.size ?? Math.min(9, Math.max(7, h - 1));
  const x = align === "center" ? (llx + urx) / 2 : llx + 1;
  const y = PAGE_H - lly - 1.4;
  return { x, y, w: urx - llx - 2, size, align, ...extra };
}

function check(llx: number, lly: number, urx: number, ury: number): CheckField {
  return {
    x: llx + 0.8,
    y: PAGE_H - lly - 0.8,
    size: Math.min(11, ury - lly + 1),
  };
}

export const T = {
  name: widget(40.003, 593.498, 410.004, 603.499, { size: 9 }),
  rank: widget(429.976, 593.498, 474.976, 603.499, { size: 8, align: "center" }),
  note: widget(490, 593.498, 570, 603.499, { size: 8 }),
  height: widget(109.151, 564.5, 154.151, 574.501, { size: 9, align: "center" }),
  age: widget(429.976, 564.5, 474.976, 574.501, { size: 9, align: "center" }),
  sexMale: check(268.798, 567.875, 280.798, 579.875),
  sexFemale: check(316.287, 567.831, 328.287, 579.831),

  w1: widget(275.777, 512.025, 315.777, 522.026, { size: 9, align: "center" }),
  w2: widget(354.124, 512.025, 394.124, 522.026, { size: 9, align: "center" }),
  w3: widget(432.474, 512.025, 472.474, 522.026, { size: 9, align: "center" }),
  wavg: widget(510.823, 512.025, 550.823, 522.026, { size: 8, align: "center" }),
  whtr: widget(510.823, 460.584, 550.823, 470.585, { size: 9, align: "center" }),

  cw1: widget(275.777, 365.853, 315.777, 375.854, { size: 9, align: "center" }),
  cw2: widget(354.124, 365.853, 394.124, 375.854, { size: 9, align: "center" }),
  cw3: widget(434.404, 365.853, 474.404, 375.854, { size: 9, align: "center" }),
  cwavg: widget(510.823, 365.853, 550.823, 375.854, { size: 8, align: "center" }),
  cwhtr: widget(510.823, 314.518, 550.823, 324.519, { size: 9, align: "center" }),

  remarks: { x: 41, y: 522, w: 528, size: 8 } satisfies TextField,

  meetX: check(53.632, 119.842, 65.632, 131.842),
  failX: check(259.813, 119.842, 271.813, 131.842),

  prepName: widget(40.003, 83.342, 173.002, 103.343, { size: 8 }),
  prepRank: widget(178.821, 87.843, 223.821, 97.844, { size: 8, align: "center" }),
  prepDate: widget(238.686, 87.843, 293.687, 97.844, { size: 8 }),
  supName: widget(307.999, 83.342, 440.998, 103.343, { size: 8 }),
  supRank: widget(447.616, 87.843, 492.616, 97.844, { size: 8, align: "center" }),
  supDate: widget(505.352, 87.843, 560.353, 97.844, { size: 8 }),
};

export type FormPaint = {
  name: string;
  rank: string;
  note: string;
  height: string;
  age: string;
  sex: "" | "M" | "F";
  w1: string;
  w2: string;
  w3: string;
  wavg: string;
  whtr: string;
  confirm: boolean;
  cw1: string;
  cw2: string;
  cw3: string;
  cwavg: string;
  cwhtr: string;
  remarks: string;
  meets: boolean | null;
  prepName: string;
  prepRank: string;
  prepDate: string;
  supName: string;
  supRank: string;
  supDate: string;
};
