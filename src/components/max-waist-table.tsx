import { useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { type Units, formatInches, maxWaistTable } from "@/lib/whtr";

export function MaxWaistTable({
  units,
  highlightHeightIn,
}: {
  units: Units;
  highlightHeightIn: number | null;
}) {
  const rows = useMemo(() => maxWaistTable(58, 80), []);
  const highlight = highlightHeightIn != null ? Math.round(highlightHeightIn) : null;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef(new Map<number, HTMLTableRowElement>());

  useEffect(() => {
    if (highlight == null) return;
    const el = rowRefs.current.get(highlight);
    const scroller = scrollerRef.current;
    if (!el || !scroller) return;
    const elRect = el.getBoundingClientRect();
    const box = scroller.getBoundingClientRect();
    const delta =
      elRect.top - box.top - scroller.clientHeight / 2 + elRect.height / 2;
    scroller.scrollTop += delta;
  }, [highlight]);

  return (
    <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
      <p className="text-kicker text-muted">Quick reference</p>
      <h2 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
        Max waist by height
      </h2>
      <p className="mt-2 max-w-prose text-sm text-muted">
        Waist must be strictly below height × 0.55. Hitting the number fails.
      </p>

      <div className="mt-5 overflow-hidden rounded-lg shadow-border">
        <div ref={scrollerRef} className="max-h-80 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-surface-3 font-display text-kicker text-muted">
              <tr>
                <th className="px-3 py-2.5 font-semibold">Height</th>
                <th className="px-3 py-2.5 font-semibold">Must be under</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const active = highlight === row.heightIn;
                const max =
                  units === "cm"
                    ? `${formatInches(row.maxWaistCm, 1)} cm`
                    : `${formatInches(row.maxWaistIn, 2)} in`;
                return (
                  <tr
                    key={row.heightIn}
                    ref={(node) => {
                      if (node) rowRefs.current.set(row.heightIn, node);
                      else rowRefs.current.delete(row.heightIn);
                    }}
                    className={cn(
                      "border-t border-border",
                      active ? "bg-accent/15 text-foreground" : "text-foreground",
                    )}
                  >
                    <td className="px-3 py-2 tabular-nums">
                      {row.label}
                      <span className="ml-2 text-subtle">{row.heightIn} in</span>
                    </td>
                    <td className="px-3 py-2 font-medium tabular-nums">{max}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
