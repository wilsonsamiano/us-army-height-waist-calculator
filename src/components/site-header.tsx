import { Coffee } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="text-kicker text-accent">U.S. Army · AD 2026-13 · AR 600-9</p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Height & waist calculator
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
            Waist-to-height ratio is now the only ABCP screen. Pass is under
            0.550, truncated — not rounded.
          </p>
        </div>
        <p className="font-mono text-xs text-subtle sm:text-right">
          WHtR = waist ÷ height
          <br />
          Recorded to 3 decimals
        </p>
      </div>
    </header>
  );
}

const BMC_URL = "https://buymeacoffee.com/wilsonsamiano";

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <p className="max-w-3xl text-xs text-subtle">
          Unofficial calculator for the Army Body Composition Program after Army
          Directive 2026-13 (7 July 2026). Not a substitute for the DA Form 5500
          recorded in ATIS. Confirm measurements with your unit. Existing
          pregnancy and postpartum medical exemptions still apply. No AFT score
          exempts a Soldier from WHtR.
        </p>
        <a
          href={BMC_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-md bg-surface-2 px-3 text-sm text-foreground shadow-border transition-[background-color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:bg-surface-3 hover:shadow-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <Coffee className="size-4 text-accent" />
          Buy me a coffee
        </a>
      </div>
    </footer>
  );
}
