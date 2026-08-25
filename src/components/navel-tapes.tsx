import { Input } from "@/components/ui/input";
import { formatInches } from "@/lib/whtr";

export const NAVEL_COLS = [
  { key: 0 as const, label: "First", aria: "First measurement waist at navel" },
  { key: 1 as const, label: "Second", aria: "Second measurement waist at navel" },
  { key: 2 as const, label: "Third", aria: "Third measurement waist at navel" },
];

export function NavelTapeGrid({
  values,
  onChange,
  recorded,
  average,
  idPrefix,
  caption = "Waist at navel (inches)",
}: {
  values: [string, string, string];
  onChange: (index: 0 | 1 | 2, value: string) => void;
  recorded: [number | null, number | null, number | null];
  average: string | null;
  idPrefix: string;
  caption?: string;
}) {
  return (
    <div>
      <p className="text-kicker text-muted">{caption}</p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {NAVEL_COLS.map((col) => {
          const rec = recorded[col.key];
          return (
            <label key={col.key} className="block min-w-0">
              <span className="mb-2 block text-kicker text-muted">{col.label}</span>
              <Input
                id={`${idPrefix}-${col.key + 1}`}
                inputMode="decimal"
                className="text-center font-display text-lg font-semibold tabular-nums"
                value={values[col.key]}
                onChange={(e) => onChange(col.key, e.target.value)}
                aria-label={col.aria}
              />
              <span className="mt-1 block font-mono text-xs text-subtle">
                {rec != null ? `↓ ${formatInches(rec, 1)}` : "round down 0.50"}
              </span>
            </label>
          );
        })}
        <div className="block min-w-0">
          <span className="mb-2 block text-kicker text-muted">Average</span>
          <div
            className="flex h-12 items-center justify-center rounded-md bg-surface-2 font-display text-lg font-semibold tabular-nums shadow-border"
            aria-live="polite"
          >
            {average ?? "—"}
          </div>
          <span className="mt-1 block text-xs text-subtle">3 decimal places</span>
        </div>
      </div>
    </div>
  );
}


