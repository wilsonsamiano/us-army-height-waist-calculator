import { FORM_JPG, PAGE_H, PAGE_W, T, fieldKnockout, type FormPaint, type TextField } from "@/lib/da5500-layout";

function SvgText({
  field,
  value,
  bold,
}: {
  field: TextField;
  value: string;
  bold?: boolean;
}) {
  if (!value) return null;
  const anchor = field.align === "center" ? "middle" : "start";
  const ko = fieldKnockout(field);
  return (
    <g>
      {ko ? (
        <rect x={ko.x} y={ko.y} width={ko.w} height={ko.h} fill="#ffffff" />
      ) : null}
      <text
        x={field.x}
        y={field.y}
        textAnchor={anchor}
        fontSize={field.size}
        fontWeight={bold ? 700 : 400}
        fontFamily="Times New Roman, Times, ui-serif, serif"
        fill="#121410"
      >
        {value}
      </text>
    </g>
  );
}

function SvgCheck({ x, y, size }: { x: number; y: number; size: number }) {
  return (
    <text
      x={x}
      y={y}
      fontSize={size}
      fontWeight={700}
      fontFamily="Helvetica, Arial, sans-serif"
      fill="#121410"
    >
      X
    </text>
  );
}

function wrapRemarks(text: string, width: number, size: number): string[] {
  if (!text) return [];
  const maxChars = Math.max(24, Math.floor(width / (size * 0.48)));
  const lines: string[] = [];
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

export function OfficialForm({ paint }: { paint: FormPaint }) {
  const remarks = wrapRemarks(paint.remarks, T.remarks.w ?? 528, T.remarks.size);
  return (
    <div
      id="da-sheet"
      className="da-paper relative mx-auto w-full max-w-[8.5in] overflow-hidden bg-paper text-ink shadow-border"
    >
      <img
        src={FORM_JPG}
        alt="DA Form 5500, JUL 2026"
        className="block w-full select-none"
        draggable={false}
      />
      <svg
        viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <SvgText field={T.name} value={paint.name} />
        <SvgText field={T.rank} value={paint.rank} />
        <SvgText field={T.note} value={paint.note} />
        <SvgText field={T.height} value={paint.height} bold />
        <SvgText field={T.age} value={paint.age} />
        {paint.sex === "M" ? (
          <SvgCheck x={T.sexMale.x} y={T.sexMale.y} size={T.sexMale.size} />
        ) : null}
        {paint.sex === "F" ? (
          <SvgCheck x={T.sexFemale.x} y={T.sexFemale.y} size={T.sexFemale.size} />
        ) : null}
        <SvgText field={T.w1} value={paint.w1} bold />
        <SvgText field={T.w2} value={paint.w2} bold />
        <SvgText field={T.w3} value={paint.w3} bold />
        <SvgText field={T.wavg} value={paint.wavg} bold />
        <SvgText field={T.whtr} value={paint.whtr} bold />
        {paint.confirm ? (
          <>
            <SvgText field={T.cw1} value={paint.cw1} bold />
            <SvgText field={T.cw2} value={paint.cw2} bold />
            <SvgText field={T.cw3} value={paint.cw3} bold />
            <SvgText field={T.cwavg} value={paint.cwavg} bold />
            <SvgText field={T.cwhtr} value={paint.cwhtr} bold />
          </>
        ) : null}
        {remarks.map((line, i) => (
          <text
            key={i}
            x={T.remarks.x}
            y={T.remarks.y + i * 11}
            fontSize={T.remarks.size}
            fontFamily="Times New Roman, Times, ui-serif, serif"
            fill="#121410"
          >
            {line}
          </text>
        ))}
        {paint.meets === true ? (
          <SvgCheck x={T.meetX.x} y={T.meetX.y} size={T.meetX.size} />
        ) : null}
        {paint.meets === false ? (
          <SvgCheck x={T.failX.x} y={T.failX.y} size={T.failX.size} />
        ) : null}
        <SvgText field={T.prepName} value={paint.prepName} />
        <SvgText field={T.prepRank} value={paint.prepRank} />
        <SvgText field={T.prepDate} value={paint.prepDate} />
        <SvgText field={T.supName} value={paint.supName} />
        <SvgText field={T.supRank} value={paint.supRank} />
        <SvgText field={T.supDate} value={paint.supDate} />
      </svg>
    </div>
  );
}
