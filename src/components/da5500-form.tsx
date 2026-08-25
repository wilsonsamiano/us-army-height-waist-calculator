import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Check,
  Copy,
  Download,
  Plus,
  Printer,
  Share2,
  Trash2,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OfficialForm } from "@/components/da5500-official";
import { NavelTapeGrid } from "@/components/navel-tapes";
import { cn } from "@/lib/utils";
import {
  type Da5500Draft,
  type SessionEntry,
  type Sex,
  atisBlock,
  compileRecord,
  consumeTransfer,
  fileStem,
  loadDraft,
  loadSession,
  nextSoldier,
  parseNum,
  removeSession,
  saveDraft,
  upsertSession,
} from "@/lib/da5500";
import { downloadDa5500Pdf, paintFromDraft, shareDa5500 } from "@/lib/da5500-pdf";
import {
  formatFtIn,
  formatInches,
  formatRatio,
  roundDownHalfInch,
  roundNearestHalfInch,
} from "@/lib/whtr";

function parsePrefill(
  h?: number,
  w?: number,
  w1?: number,
  w2?: number,
  w3?: number,
) {
  if (h == null || !Number.isFinite(h) || h <= 0) return null;
  if (
    w1 != null &&
    w2 != null &&
    w3 != null &&
    w1 > 0 &&
    w2 > 0 &&
    w3 > 0
  ) {
    return { heightIn: h, waist1: w1, waist2: w2, waist3: w3 };
  }
  if (w != null && Number.isFinite(w) && w > 0) {
    return { heightIn: h, waist1: w, waist2: w, waist3: w };
  }
  return null;
}

export function Da5500Form({
  prefillHeight,
  prefillWaist,
  prefillW1,
  prefillW2,
  prefillW3,
}: {
  prefillHeight?: number;
  prefillWaist?: number;
  prefillW1?: number;
  prefillW2?: number;
  prefillW3?: number;
}) {
  const [draft, setDraft] = useState<Da5500Draft | null>(null);
  const [session, setSession] = useState<SessionEntry[]>([]);
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    const loaded = loadDraft();
    const fromQuery = parsePrefill(
      prefillHeight,
      prefillWaist,
      prefillW1,
      prefillW2,
      prefillW3,
    );
    const transfer = fromQuery ?? consumeTransfer();
    if (transfer) {
      loaded.heightIn = String(Math.round(transfer.heightIn * 10) / 10);
      loaded.waist1 = Number(transfer.waist1).toFixed(1);
      loaded.waist2 = Number(transfer.waist2).toFixed(1);
      loaded.waist3 = Number(transfer.waist3).toFixed(1);
    }
    setDraft(loaded);
    setSession(loadSession());
  }, [prefillHeight, prefillWaist, prefillW1, prefillW2, prefillW3]);

  useEffect(() => {
    if (!draft) return;
    saveDraft(draft);
  }, [draft]);

  const record = useMemo(() => (draft ? compileRecord(draft) : null), [draft]);
  const paint = useMemo(() => (draft ? paintFromDraft(draft) : null), [draft]);

  function patch(next: Partial<Da5500Draft>) {
    setDraft((d) => (d ? { ...d, ...next } : d));
  }

  if (!draft || !paint) {
    return <div className="h-96 rounded-2xl bg-surface shadow-border" aria-hidden />;
  }

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
      const shared = await shareDa5500(record, file);
      if (!shared) {
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
    void navigator.clipboard.writeText(atisBlock(record)).then(() => {
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

  const heightRec =
    parseNum(draft.heightIn) != null
      ? roundNearestHalfInch(parseNum(draft.heightIn)!)
      : null;
  const failNeedsConfirm = record && !record.initial.meets && !draft.confirm.enabled;

  return (
    <div className="flex flex-col gap-6">
      {session.length > 0 ? (
        <section className="no-print rounded-2xl bg-surface p-4 shadow-border sm:p-5">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-kicker text-muted">Today’s log</p>
              <h2 className="mt-1 font-display text-lg font-semibold tracking-tight">
                {session.length} Soldier{session.length === 1 ? "" : "s"} screened
              </h2>
            </div>
          </div>
          <ul className="mt-3 divide-y divide-border">
            {session.slice(0, 12).map((row) => (
              <li key={row.id} className="flex items-center gap-3 py-2.5">
                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={() => setDraft(row.draft)}
                >
                  <p className="truncate text-sm font-medium">
                    {row.rank ? `${row.rank} ` : ""}
                    {row.name}
                  </p>
                  <p className="font-mono text-xs text-subtle">
                    {formatFtIn(row.heightIn)} · WHtR {formatRatio(row.recorded)}
                  </p>
                </button>
                <span
                  className={cn(
                    "rounded-sm px-2 py-1 text-xs font-semibold",
                    row.meets
                      ? "bg-pass text-pass-foreground"
                      : "bg-fail text-fail-foreground",
                  )}
                >
                  {row.meets ? "MEETS" : "FAIL"}
                </span>
                <button
                  type="button"
                  className="inline-flex size-11 items-center justify-center rounded-md text-muted hover:bg-surface-2 hover:text-foreground"
                  aria-label={`Remove ${row.name}`}
                  onClick={() => setSession(removeSession(row.id))}
                >
                  <Trash2 className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="no-print rounded-2xl bg-surface p-4 shadow-border sm:p-6">
        <p className="text-kicker text-muted">DA Form 5500 · JUL 2026</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Screening worksheet
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Values stamp onto the official form. Height rounds to the nearest
          0.50 in. Each navel tape rounds down, then averages to three decimals.
          WHtR is truncated. Signatures stay blank for wet ink.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Name (Last, First, MI)">
            <Input
              autoComplete="name"
              value={draft.identity.name}
              onChange={(e) =>
                patch({ identity: { ...draft.identity, name: e.target.value } })
              }
            />
          </Field>
          <Field label="Rank">
            <Input
              value={draft.identity.rank}
              onChange={(e) =>
                patch({ identity: { ...draft.identity, rank: e.target.value } })
              }
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <fieldset>
            <legend className="mb-2 block text-kicker text-muted">Sex</legend>
            <div className="grid grid-cols-2 gap-2">
              {([
                ["M", "Male"],
                ["F", "Female"],
              ] as const).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    patch({ identity: { ...draft.identity, sex: value as Sex } })
                  }
                  className={cn(
                    "h-12 rounded-md text-sm font-medium shadow-border transition-colors duration-[var(--motion-quick)]",
                    draft.identity.sex === value
                      ? "bg-accent text-accent-foreground"
                      : "bg-surface-2 text-muted hover:text-foreground",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>
          <Field label="Age">
            <Input
              inputMode="numeric"
              value={draft.identity.age}
              onChange={(e) =>
                patch({ identity: { ...draft.identity, age: e.target.value } })
              }
            />
          </Field>
          <Field label="Note">
            <Input
              value={draft.identity.note}
              onChange={(e) =>
                patch({ identity: { ...draft.identity, note: e.target.value } })
              }
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            label="Height (inches)"
            hint={
              heightRec != null
                ? `Records as ${formatInches(heightRec, 1)} in (${formatFtIn(heightRec)})`
                : "Rounded to nearest 0.50 in"
            }
          >
            <Input
              inputMode="decimal"
              value={draft.heightIn}
              onChange={(e) => patch({ heightIn: e.target.value })}
            />
          </Field>
          <Field label="Date (prepared)">
            <Input
              type="date"
              value={draft.date}
              onChange={(e) => patch({ date: e.target.value })}
            />
          </Field>
        </div>

        <div className="mt-6">
          <NavelTapeGrid
            idPrefix="da-navel"
            values={[draft.waist1, draft.waist2, draft.waist3]}
            onChange={(index, value) => {
              const key = (["waist1", "waist2", "waist3"] as const)[index];
              patch({ [key]: value });
            }}
            recorded={[
              parseNum(draft.waist1) != null
                ? roundDownHalfInch(parseNum(draft.waist1)!)
                : null,
              parseNum(draft.waist2) != null
                ? roundDownHalfInch(parseNum(draft.waist2)!)
                : null,
              parseNum(draft.waist3) != null
                ? roundDownHalfInch(parseNum(draft.waist3)!)
                : null,
            ]}
            average={
              record ? formatInches(record.initial.waistRecorded, 3) : null
            }
          />
        </div>

        {record ? (
          <div
            className={cn(
              "mt-5 rounded-xl px-4 py-4 shadow-border sm:px-5",
              record.meets ? "bg-pass/15" : "bg-fail/15",
            )}
          >
            <p className="text-kicker text-muted">Live DA 5500</p>
            <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
              <p className="font-display text-stat font-semibold tracking-tight">
                {formatRatio((record.confirmation ?? record.initial).recorded)}
              </p>
              <p
                className={cn(
                  "rounded-sm px-2 py-1 text-sm font-semibold",
                  record.meets
                    ? "bg-pass text-pass-foreground"
                    : "bg-fail text-fail-foreground",
                )}
              >
                {record.meets ? "MEETS STANDARD" : "DOES NOT MEET"}
              </p>
            </div>
            <p className="mt-2 font-mono text-xs text-muted">
              Avg {formatInches(record.initial.waistRecorded, 3)} in ÷{" "}
              {formatInches(record.heightRecorded, 1)} in · truncate, do not round
            </p>
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted">
            Enter height and the first, second, and third navel tapes to fill
            the form.
          </p>
        )}

        {failNeedsConfirm ? (
          <p className="mt-4 rounded-md bg-fail/15 px-3 py-3 text-sm">
            Initial WHtR is 0.550 or higher. A different team must re-tape the
            same duty day before any administrative action.
          </p>
        ) : null}

        <label className="mt-5 flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            className="mt-1 size-4 accent-accent"
            checked={draft.confirm.enabled}
            onChange={(e) =>
              patch({ confirm: { ...draft.confirm, enabled: e.target.checked } })
            }
          />
          Confirmation WHtR measurement (different team, same duty day)
        </label>

        {draft.confirm.enabled ? (
          <div className="mt-4 grid gap-4">
            <div className="mt-4">
              <NavelTapeGrid
                idPrefix="da-confirm"
                caption="Confirmation waist at navel (inches)"
                values={[
                  draft.confirm.waist1,
                  draft.confirm.waist2,
                  draft.confirm.waist3,
                ]}
                onChange={(index, value) => {
                  const key = (["waist1", "waist2", "waist3"] as const)[index];
                  patch({
                    confirm: { ...draft.confirm, [key]: value },
                  });
                }}
                recorded={[
                  parseNum(draft.confirm.waist1) != null
                    ? roundDownHalfInch(parseNum(draft.confirm.waist1)!)
                    : null,
                  parseNum(draft.confirm.waist2) != null
                    ? roundDownHalfInch(parseNum(draft.confirm.waist2)!)
                    : null,
                  parseNum(draft.confirm.waist3) != null
                    ? roundDownHalfInch(parseNum(draft.confirm.waist3)!)
                    : null,
                ]}
                average={
                  record?.confirmation
                    ? formatInches(record.confirmation.waistRecorded, 3)
                    : null
                }
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Confirmation team (name)">
                <Input
                  value={draft.confirm.measurer.name}
                  onChange={(e) =>
                    patch({
                      confirm: {
                        ...draft.confirm,
                        measurer: { ...draft.confirm.measurer, name: e.target.value },
                      },
                    })
                  }
                />
              </Field>
              <Field label="Confirmation team (rank)">
                <Input
                  value={draft.confirm.measurer.rank}
                  onChange={(e) =>
                    patch({
                      confirm: {
                        ...draft.confirm,
                        measurer: { ...draft.confirm.measurer, rank: e.target.value },
                      },
                    })
                  }
                />
              </Field>
            </div>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label="Prepared by (name)">
            <Input
              value={draft.measurer.name}
              onChange={(e) =>
                patch({ measurer: { ...draft.measurer, name: e.target.value } })
              }
            />
          </Field>
          <Field label="Prepared by (rank)">
            <Input
              value={draft.measurer.rank}
              onChange={(e) =>
                patch({ measurer: { ...draft.measurer, rank: e.target.value } })
              }
            />
          </Field>
          <Field label="Approved by supervisor (name)">
            <Input
              value={draft.supervisor.name}
              onChange={(e) =>
                patch({ supervisor: { ...draft.supervisor, name: e.target.value } })
              }
            />
          </Field>
          <Field label="Supervisor rank">
            <Input
              value={draft.supervisor.rank}
              onChange={(e) =>
                patch({ supervisor: { ...draft.supervisor, rank: e.target.value } })
              }
            />
          </Field>
          <Field label="Supervisor date">
            <Input
              type="date"
              value={draft.supervisorDate}
              onChange={(e) => patch({ supervisorDate: e.target.value })}
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="DoD ID (ATIS only — not on the form)">
            <Input
              inputMode="numeric"
              autoComplete="off"
              value={draft.identity.dodId}
              onChange={(e) =>
                patch({ identity: { ...draft.identity, dodId: e.target.value } })
              }
            />
          </Field>
          <Field label="Unit (ATIS only — not on the form)">
            <Input
              value={draft.identity.unit}
              onChange={(e) =>
                patch({ identity: { ...draft.identity, unit: e.target.value } })
              }
            />
          </Field>
        </div>

        <Field label="Remarks">
          <textarea
            className="mt-2 min-h-24 w-full rounded-md bg-surface-2 px-3 py-2 text-sm text-foreground shadow-border outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            value={draft.remarks}
            onChange={(e) => patch({ remarks: e.target.value })}
          />
        </Field>

        <div className="mt-5 flex flex-wrap gap-2">
          <Button type="button" onClick={onPdf} disabled={!record || busy}>
            <Download />
            Download official PDF
          </Button>
          <Button type="button" variant="secondary" onClick={() => window.print()} disabled={!record}>
            <Printer />
            Print form
          </Button>
          <Button type="button" variant="secondary" onClick={onShare} disabled={!record || busy}>
            <Share2 />
            Share
          </Button>
          <Button type="button" variant="outline" onClick={onCopy} disabled={!record}>
            {copied ? <Check /> : <Copy />}
            {copied ? "Copied" : "Copy for ATIS"}
          </Button>
          <Button type="button" variant="outline" onClick={onSaveLog} disabled={!record}>
            {savedFlash ? <Check /> : <Plus />}
            {savedFlash ? "Saved" : "Save to log"}
          </Button>
          <Button type="button" variant="ghost" onClick={onNewSoldier}>
            <UserPlus />
            Next Soldier
          </Button>
        </div>
        {record ? (
          <p className="mt-3 font-mono text-xs text-subtle">
            File {fileStem(record)}.pdf · height {formatInches(record.heightRecorded, 1)} in
            {" "}({formatFtIn(record.heightRecorded)})
          </p>
        ) : null}
      </section>

      <OfficialForm paint={paint} />
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="mt-4 block first:mt-0">
      <span className="mb-2 block text-kicker text-muted">{label}</span>
      {children}
      {hint ? <span className="mt-1 block font-mono text-xs text-subtle">{hint}</span> : null}
    </label>
  );
}
