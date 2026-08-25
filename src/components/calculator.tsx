import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Copy, FileSpreadsheet, Minus, Plus, Save, Trash2 } from "lucide-react";
import { MaxWaistTable } from "@/components/max-waist-table";
import { NavelTapeGrid } from "@/components/navel-tapes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { setTransfer } from "@/lib/da5500";
import {
  type HistoryEntry,
  DEFAULT_INPUTS,
  clearHistory,
  deleteHistory,
  loadHistory,
  loadInputs,
  pushHistory,
  saveInputs,
} from "@/lib/history";
import {
  type Units,
  computeWHtR,
  cmToInches,
  da5500WaistAverage,
  formatFtIn,
  formatInches,
  formatRatio,
  ftInToInches,
  inchesToCm,
  inchesToFtIn,
  parsePositive,
  roundDownHalfInch,
} from "@/lib/whtr";

function clampNum(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function stepString(value: string, delta: number, min: number, max: number, digits: number) {
  const current = parsePositive(value) ?? min;
  const next = clampNum(Math.round((current + delta) * 10) / 10, min, max);
  return next.toFixed(digits).replace(/\.0$/, digits === 0 ? "" : next % 1 === 0 ? ".0" : "");
}

export function Calculator() {
  const navigate = useNavigate();
  const [units, setUnits] = useState<Units>("in");
  const [heightFt, setHeightFt] = useState(DEFAULT_INPUTS.heightFt);
  const [heightInPart, setHeightInPart] = useState(DEFAULT_INPUTS.heightInPart);
  const [heightCm, setHeightCm] = useState(DEFAULT_INPUTS.heightCm);
  const [waist1, setWaist1] = useState(DEFAULT_INPUTS.waist1);
  const [waist2, setWaist2] = useState(DEFAULT_INPUTS.waist2);
  const [waist3, setWaist3] = useState(DEFAULT_INPUTS.waist3);
  const [waist1Cm, setWaist1Cm] = useState(DEFAULT_INPUTS.waist1Cm);
  const [waist2Cm, setWaist2Cm] = useState(DEFAULT_INPUTS.waist2Cm);
  const [waist3Cm, setWaist3Cm] = useState(DEFAULT_INPUTS.waist3Cm);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
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
      waist3Cm,
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
    waist3Cm,
  ]);

  const heightInches = useMemo(() => {
    if (units === "cm") {
      const cm = parsePositive(heightCm);
      return cm == null ? null : cmToInches(cm);
    }
    const ft = parsePositive(heightFt);
    const inch = heightInPart.trim() === "" ? 0 : parsePositive(heightInPart);
    if (ft == null || inch == null) return null;
    return ftInToInches(ft, inch);
  }, [units, heightFt, heightInPart, heightCm]);

  const tapeInches = useMemo(() => {
    const src =
      units === "cm" ? [waist1Cm, waist2Cm, waist3Cm] : [waist1, waist2, waist3];
    return src.map((v) => {
      const n = parsePositive(v);
      if (n == null) return null;
      return units === "cm" ? cmToInches(n) : n;
    }) as [number | null, number | null, number | null];
  }, [units, waist1, waist2, waist3, waist1Cm, waist2Cm, waist3Cm]);

  const tapeBlock = useMemo(() => {
    if (tapeInches.some((n) => n == null)) return null;
    return da5500WaistAverage(tapeInches as [number, number, number]);
  }, [tapeInches]);

  const recordedTapes: [number | null, number | null, number | null] = [
    tapeInches[0] != null ? roundDownHalfInch(tapeInches[0]) : null,
    tapeInches[1] != null ? roundDownHalfInch(tapeInches[1]) : null,
    tapeInches[2] != null ? roundDownHalfInch(tapeInches[2]) : null,
  ];

  const result = useMemo(() => {
    if (heightInches == null || tapeBlock == null) return null;
    return computeWHtR(tapeBlock.average, heightInches);
  }, [heightInches, tapeBlock]);

  function setTape(index: 0 | 1 | 2, value: string) {
    if (units === "cm") {
      [setWaist1Cm, setWaist2Cm, setWaist3Cm][index](value);
      return;
    }
    [setWaist1, setWaist2, setWaist3][index](value);
  }

  function switchUnits(next: Units) {
    if (next === units) return;
    if (next === "cm") {
      if (heightInches != null) setHeightCm(formatInches(inchesToCm(heightInches), 1));
      const conv = (n: number | null, fallback: string) =>
        n != null ? formatInches(inchesToCm(n), 1) : fallback;
      setWaist1Cm(conv(tapeInches[0], waist1Cm));
      setWaist2Cm(conv(tapeInches[1], waist2Cm));
      setWaist3Cm(conv(tapeInches[2], waist3Cm));
    } else {
      if (heightInches != null) {
        const { ft, inches } = inchesToFtIn(heightInches);
        setHeightFt(String(ft));
        setHeightInPart(formatInches(inches, 1).replace(/\.0$/, ""));
      }
      const conv = (n: number | null, fallback: string) =>
        n != null ? formatInches(n, 1) : fallback;
      setWaist1(conv(tapeInches[0], waist1));
      setWaist2(conv(tapeInches[1], waist2));
      setWaist3(conv(tapeInches[2], waist3));
    }
    setUnits(next);
  }

  function openDa5500() {
    if (!result || !tapeBlock || tapeInches.some((n) => n == null)) return;
    const [a, b, c] = tapeInches as [number, number, number];
    setTransfer({ heightIn: result.heightIn, waist1: a, waist2: b, waist3: c });
    void navigate({
      to: "/da-5500",
      search: {
        h: result.heightIn,
        w: result.waistIn,
        w1: a,
        w2: b,
        w3: c,
      },
    });
  }

  function copyResult() {
    if (!result || !tapeBlock) return;
    const max = formatInches(result.maxWaistIn, 2);
    const line = result.passes
      ? `PASS — ${formatInches(result.marginIn, 2)} in under the line`
      : `FAIL — ${formatInches(Math.abs(result.marginIn), 2)} in over the line`;
    const text = [
      `Army WHtR ${formatRatio(result.recorded)} ${line}`,
      `Height ${formatInches(result.heightIn, 1)} in (${formatFtIn(result.heightIn)})`,
      `Waist at navel FIRST / SECOND / THIRD: ${formatInches(tapeBlock.recorded[0], 1)} / ${formatInches(tapeBlock.recorded[1], 1)} / ${formatInches(tapeBlock.recorded[2], 1)} in`,
      `Waist AVERAGE: ${formatInches(tapeBlock.average, 3)} in`,
      `Must be strictly under ${max} in (0.550 × height)`,
      `AD 2026-13 / AR 600-9 — truncated, not rounded`,
    ].join("\n");
    void navigator.clipboard.writeText(text).then(() => {
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

  return (
    <div className="flex flex-col gap-6">
      <ResultCard
        result={result}
        tapeAverage={tapeBlock?.average ?? null}
        units={units}
        copied={copied}
        savedFlash={savedFlash}
        onCopy={copyResult}
        onSave={saveCheck}
        onDa5500={openDa5500}
      />

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <section className="rounded-2xl bg-surface p-4 shadow-border sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-kicker text-muted">Measurements</p>
              <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                Height and three navel tapes
              </h2>
            </div>
            <div
              className="flex rounded-md bg-surface-2 p-1 shadow-border"
              role="group"
              aria-label="Units"
            >
              {(["in", "cm"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => switchUnits(u)}
                  className={cn(
                    "h-9 min-w-11 rounded-sm px-3 text-sm font-medium uppercase tracking-wide transition-colors duration-[var(--motion-quick)]",
                    units === u
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {units === "in" ? (
            <fieldset>
              <legend className="mb-2 block text-kicker text-muted">Height</legend>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="mb-2 block text-xs font-medium text-muted">Feet</span>
                  <Stepper
                    value={heightFt}
                    onChange={setHeightFt}
                    min={4}
                    max={7}
                    step={1}
                    digits={0}
                    ariaLabel="Height feet"
                  />
                </div>
                <div>
                  <span className="mb-2 block text-xs font-medium text-muted">Inches</span>
                  <Stepper
                    value={heightInPart}
                    onChange={setHeightInPart}
                    min={0}
                    max={11.5}
                    step={0.5}
                    digits={1}
                    ariaLabel="Height inches"
                  />
                </div>
              </div>
            </fieldset>
          ) : (
            <Field label="Height (cm)">
              <Stepper
                value={heightCm}
                onChange={setHeightCm}
                min={147}
                max={213}
                step={1}
                digits={1}
                suffix="cm"
                ariaLabel="Height centimeters"
              />
            </Field>
          )}

          <div className="mt-5">
            <NavelTapeGrid
              idPrefix="calc-navel"
              caption={
                units === "cm"
                  ? "Waist at navel (cm in, inches on the form)"
                  : "Waist at navel (inches)"
              }
              values={
                units === "cm"
                  ? [waist1Cm, waist2Cm, waist3Cm]
                  : [waist1, waist2, waist3]
              }
              onChange={setTape}
              recorded={recordedTapes}
              average={tapeBlock ? formatInches(tapeBlock.average, 3) : null}
            />
          </div>

          <p className="mt-4 text-sm text-muted">
            Same three boxes as DA Form 5500: first, second, and third
            measurement at the navel. Each reading rounds down to 0.50 in, then
            averages to three decimals. The Army records the ratio in inches.
          </p>
        </section>

        <RatioGauge result={result} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <MaxWaistTable units={units} highlightHeightIn={heightInches} />
        <HistoryCard
          entries={history}
          units={units}
          onDelete={(id) => setHistory(deleteHistory(id))}
          onClear={() => setHistory(clearHistory())}
        />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-kicker text-muted">{label}</span>
      {children}
    </label>
  );
}

function Stepper({
  value,
  onChange,
  min,
  max,
  step,
  digits,
  suffix,
  ariaLabel,
}: {
  value: string;
  onChange: (next: string) => void;
  min: number;
  max: number;
  step: number;
  digits: number;
  suffix?: string;
  ariaLabel: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="size-10 shrink-0 sm:size-11"
        aria-label={`Decrease ${ariaLabel}`}
        onClick={() => onChange(stepString(value, -step, min, max, digits))}
      >
        <Minus />
      </Button>
      <Input
        inputMode="decimal"
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-0 flex-1 px-1 text-center font-display text-lg font-semibold"
      />
      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="size-10 shrink-0 sm:size-11"
        aria-label={`Increase ${ariaLabel}`}
        onClick={() => onChange(stepString(value, step, min, max, digits))}
      >
        <Plus />
      </Button>
      {suffix ? (
        <span className="w-7 shrink-0 text-xs text-subtle">{suffix}</span>
      ) : null}
    </div>
  );
}

function ResultCard({
  result,
  tapeAverage,
  units,
  copied,
  savedFlash,
  onCopy,
  onSave,
  onDa5500,
}: {
  result: ReturnType<typeof computeWHtR>;
  tapeAverage: number | null;
  units: Units;
  copied: boolean;
  savedFlash: boolean;
  onCopy: () => void;
  onSave: () => void;
  onDa5500: () => void;
}) {
  if (!result) {
    return (
      <section className="rounded-2xl bg-surface p-6 shadow-border">
        <p className="text-kicker text-muted">Result</p>
        <p className="mt-3 font-display text-2xl font-semibold tracking-tight">
          Enter height and three navel tapes
        </p>
        <p className="mt-2 text-sm text-muted">
          The recorded WHtR is truncated to three decimals. Equal to 0.550
          fails.
        </p>
      </section>
    );
  }

  const pass = result.passes;
  const maxDisplay =
    units === "cm"
      ? `${formatInches(inchesToCm(result.maxWaistIn), 1)} cm`
      : `${formatInches(result.maxWaistIn, 2)} in`;
  const marginAbs =
    units === "cm"
      ? `${formatInches(inchesToCm(Math.abs(result.marginIn)), 1)} cm`
      : `${formatInches(Math.abs(result.marginIn), 2)} in`;

  return (
    <section
      className={cn(
        "rounded-2xl p-5 shadow-border sm:p-6",
        pass ? "bg-surface" : "bg-surface",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-kicker text-muted">Recorded WHtR</p>
        <span
          className={cn(
            "inline-flex h-8 items-center rounded-sm px-2.5 font-display text-sm font-semibold tracking-wide",
            pass
              ? "bg-pass text-pass-foreground"
              : "bg-fail text-fail-foreground",
          )}
        >
          {pass ? "MEETS STANDARD" : "DOES NOT MEET"}
        </span>
      </div>

      <p
        className={cn(
          "mt-3 font-display font-semibold text-stat tabular-nums",
          pass ? "text-foreground" : "text-fail",
        )}
        aria-live="polite"
      >
        {formatRatio(result.recorded)}
      </p>
      <p className="mt-1 font-mono text-xs text-subtle">
        Truncated from {result.raw.toFixed(6)} · DA Form 5500
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat
          label="Avg navel"
          value={
            tapeAverage != null
              ? units === "cm"
                ? `${formatInches(inchesToCm(tapeAverage), 1)} cm`
                : `${formatInches(tapeAverage, 3)} in`
              : "—"
          }
          hint="3-tape average"
        />
        <Stat
          label="Max waist"
          value={`< ${maxDisplay}`}
          hint="Strictly below"
        />
        <Stat
          label={pass ? "Under the line" : "Over the line"}
          value={marginAbs}
          hint={pass ? "Room remaining" : "To get under 0.550"}
        />
        <Stat
          label="Height"
          value={
            units === "cm"
              ? `${formatInches(inchesToCm(result.heightIn), 1)} cm`
              : `${formatFtIn(result.heightIn)}`
          }
          hint={`${formatInches(result.heightIn, 1)} in`}
        />
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button type="button" onClick={onDa5500}>
          <FileSpreadsheet />
          Fill DA 5500
        </Button>
        <Button type="button" variant="secondary" onClick={onCopy}>
          {copied ? <Check /> : <Copy />}
          {copied ? "Copied" : "Copy result"}
        </Button>
        <Button type="button" variant="secondary" onClick={onSave}>
          {savedFlash ? <Check /> : <Save />}
          {savedFlash ? "Saved" : "Save check"}
        </Button>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-lg bg-surface-2 px-3 py-3 shadow-border">
      <dt className="text-kicker text-subtle">{label}</dt>
      <dd className="mt-1 font-display text-lg font-semibold tabular-nums tracking-tight">
        {value}
      </dd>
      <p className="mt-0.5 text-xs text-subtle">{hint}</p>
    </div>
  );
}

function RatioGauge({ result }: { result: ReturnType<typeof computeWHtR> }) {
  const min = 0.35;
  const max = 0.7;
  const span = max - min;
  const linePct = ((0.55 - min) / span) * 100;
  const value = result ? Math.min(max, Math.max(min, result.raw)) : min;
  const valuePct = ((value - min) / span) * 100;
  const pass = result?.passes ?? true;

  return (
    <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
      <p className="text-kicker text-muted">Standard line</p>
      <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">
        Pass is strictly below 0.550
      </h2>
      <p className="mt-2 text-sm text-muted">
        The Army records three decimals and does not round. .549 passes. .550
        fails.
      </p>

      <div className="relative mt-8 mb-6">
        <div className="h-3 overflow-hidden rounded-full bg-surface-3">
          <div
            className="h-full rounded-full bg-pass/80"
            style={{ width: `${linePct}%` }}
          />
        </div>
        <div
          className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-foreground"
          style={{ left: `${linePct}%` }}
          aria-hidden
        />
        {result ? (
          <div
            className={cn(
              "absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-border",
              pass ? "bg-accent" : "bg-fail",
            )}
            style={{ left: `${valuePct}%` }}
            aria-hidden
          />
        ) : null}
        <div className="mt-3 flex justify-between font-mono text-xs text-subtle">
          <span>0.350</span>
          <span className="text-foreground">0.550 fail line</span>
          <span>0.700</span>
        </div>
      </div>

      <ul className="space-y-2 text-sm text-muted">
        <li className="flex gap-2">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-pass" />
          WHtR {"<"} 0.550 — meets the ABCP standard.
        </li>
        <li className="flex gap-2">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-fail" />
          WHtR ≥ 0.550 — confirmation tape same day, then ABCP flag if it
          still fails.
        </li>
      </ul>
    </section>
  );
}

function HistoryCard({
  entries,
  units,
  onDelete,
  onClear,
}: {
  entries: HistoryEntry[];
  units: Units;
  onDelete: (id: string) => void;
  onClear: () => void;
}) {
  return (
    <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-kicker text-muted">This device</p>
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Saved checks
          </h2>
        </div>
        {entries.length > 0 ? (
          <Button type="button" variant="ghost" size="sm" onClick={onClear}>
            Clear
          </Button>
        ) : null}
      </div>

      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-muted">
          Save a check to keep a running log on this device. Nothing is
          uploaded.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-border">
          {entries.map((entry) => {
            const waist =
              entry.waist1 != null && entry.waist2 != null && entry.waist3 != null
                ? units === "cm"
                  ? `${formatInches(inchesToCm(entry.waist1), 1)}/${formatInches(inchesToCm(entry.waist2), 1)}/${formatInches(inchesToCm(entry.waist3), 1)} cm`
                  : `${formatInches(entry.waist1, 1)}/${formatInches(entry.waist2, 1)}/${formatInches(entry.waist3, 1)} in`
                : units === "cm"
                  ? `${formatInches(inchesToCm(entry.waistIn), 1)} cm`
                  : `${formatInches(entry.waistIn, 1)} in`;
            const when = new Date(entry.at);
            return (
              <li key={entry.id} className="flex items-center gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-semibold tabular-nums">
                    {formatRatio(entry.recorded)}
                    <span
                      className={cn(
                        "ml-2 text-sm font-medium",
                        entry.passes ? "text-pass" : "text-fail",
                      )}
                    >
                      {entry.passes ? "Pass" : "Fail"}
                    </span>
                  </p>
                  <p className="truncate text-xs text-subtle">
                    {formatFtIn(entry.heightIn)} · navel {waist} ·{" "}
                    {when.toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Delete check"
                  onClick={() => onDelete(entry.id)}
                >
                  <Trash2 />
                </Button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}


