import { createFileRoute } from "@tanstack/react-router";
import { AppChrome } from "@/components/app-chrome";
import { Calculator } from "@/components/calculator";
import { Guide } from "@/components/guide";
import { SiteFooter } from "@/components/site-header";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <AppChrome footer={<SiteFooter />}>
      <div className="mb-8">
        <p className="text-kicker text-accent">U.S. Army · AD 2026-13 · AR 600-9</p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Height & waist calculator
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted sm:text-base">
          Three navel tapes, then waist ÷ height. Pass is under 0.550,
          truncated — not rounded. Stamp the official DA Form 5500 when you
          are done.
        </p>
      </div>
      <div className="flex flex-col gap-10">
        <Calculator />
        <Guide />
      </div>
    </AppChrome>
  );
}
