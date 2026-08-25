import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Height on record",
    body: "Use the Soldier’s official height. DA Form 5500 rounds height to the nearest 0.50 inch (70.2 → 70.0, 70.3 → 70.5). Do not re-measure unless your unit SOP says otherwise.",
  },
  {
    n: "02",
    title: "Three tapes at the navel",
    body: "Soldier stands upright, arms at the sides, relaxed. Place the tape horizontal at the navel (belly button), not at the narrowest waist. Pull snug, not compressing skin. Round each reading down to the nearest 0.50 inch, then average the three to three decimal places.",
  },
  {
    n: "03",
    title: "Divide and truncate",
    body: "Average waist ÷ recorded height. Record three decimal places. Do not round. .549 meets the standard. .550 does not. Stamp the official DA Form 5500 and sign in ink.",
  },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the standard?",
    a: "A waist-to-height ratio of less than, but not equal to, 0.55. Army Directive 2026-13 made WHtR the sole ABCP assessment under AR 600-9. Height/weight tables and the tape-test body-fat formulas are rescinded.",
  },
  {
    q: "Rounded or truncated?",
    a: "Truncated. The Army records three decimals and discards everything after that. .549 is a pass. .550 is a fail. This is the detail most calculators get wrong.",
  },
  {
    q: "What happens if I fail?",
    a: "A second measurement by a different team is required the same duty day before any administrative action. If that confirmation is also 0.550 or higher, the Soldier is enrolled in ABCP and flagged. The flag is non-transferable.",
  },
  {
    q: "Does a high AFT score exempt me?",
    a: "No. Army Directive 2025-17 (the 465 / 80-per-event exemption) is rescinded. No AFT score exempts a Soldier from WHtR.",
  },
  {
    q: "How often is screening?",
    a: "At least twice per calendar year. Commanders may direct a WHtR check at any time. Units must allow at least seven days between an AFT or CFT and a WHtR screening unless operations require otherwise.",
  },
  {
    q: "Pregnancy, postpartum, cadets?",
    a: "Existing medical exemptions remain in effect for pregnant and postpartum Soldiers. The standard applies to USMA and Senior ROTC cadets. WHtR is recorded on DA Form 5500 and in ATIS. DA Form 5501 is no longer used.",
  },
  {
    q: "Separations during the 180-day review?",
    a: "The Army is running a 180-day assessment of the WHtR standard (from the 7 July 2026 directive). No Soldier will be separated for WHtR failure until that review is complete and further guidance is issued. Soldiers already in ABCP stay enrolled until they meet WHtR.",
  },
];

export function Guide() {
  return (
    <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
      <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
        <p className="text-kicker text-muted">How to measure</p>
        <h2 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
          Navel, not the natural waist
        </h2>
        <MeasureFigure />
        <ol className="mt-5 space-y-4">
          {STEPS.map((step) => (
            <li key={step.n} className="flex gap-3">
              <span className="font-display text-sm font-semibold text-accent tabular-nums">
                {step.n}
              </span>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="mt-1 text-sm text-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
        <p className="text-kicker text-muted">AD 2026-13 · AR 600-9</p>
        <h2 className="mt-1 font-display text-xl font-semibold tracking-tight sm:text-2xl">
          Policy in brief
        </h2>
        <p className="mt-2 text-sm text-muted">
          Unofficial helper. Confirm against the directive, your unit SOP, and
          the DA 5500 your NCOIC records in ATIS.
        </p>
        <div className="mt-4 divide-y divide-border border-t border-border">
          {FAQS.map((item) => (
            <Faq key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 py-3.5 text-left"
      >
        <span className="text-sm font-medium">{q}</span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted transition-transform duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <p className="pb-3.5 text-sm text-muted">{a}</p>
      ) : null}
    </div>
  );
}

function MeasureFigure() {
  return (
    <div className="mt-5 overflow-hidden rounded-lg bg-surface-2 px-4 py-5 shadow-border">
      <svg
        viewBox="0 0 280 160"
        className="mx-auto h-auto w-full max-w-sm"
        role="img"
        aria-label="Tape placed horizontally at the navel"
      >
        <text
          x="140"
          y="18"
          textAnchor="middle"
          fill="#8d9484"
          fontSize="10"
          fontFamily="IBM Plex Sans, sans-serif"
          letterSpacing="1.4"
        >
          MEASURE AT THE NAVEL
        </text>
        <ellipse cx="140" cy="48" rx="16" ry="18" fill="none" stroke="#9aaa78" strokeWidth="2" />
        <path
          d="M124 64 C124 78 128 92 140 118 C152 92 156 78 156 64"
          fill="none"
          stroke="#9aaa78"
          strokeWidth="2"
        />
        <path d="M132 118 L140 152 L148 118" fill="none" stroke="#9aaa78" strokeWidth="2" />
        <line
          x1="48"
          y1="96"
          x2="232"
          y2="96"
          stroke="#e8ebe3"
          strokeWidth="1.5"
          strokeDasharray="5 4"
        />
        <circle cx="140" cy="96" r="3.5" fill="#e8ebe3" />
        <text
          x="236"
          y="100"
          fill="#e8ebe3"
          fontSize="11"
          fontFamily="IBM Plex Sans Condensed, sans-serif"
        >
          navel
        </text>
        <text
          x="48"
          y="88"
          fill="#8d9484"
          fontSize="10"
          fontFamily="IBM Plex Sans, sans-serif"
        >
          tape horizontal
        </text>
      </svg>
    </div>
  );
}
