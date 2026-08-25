import { createFileRoute } from "@tanstack/react-router";
import { AppChrome } from "@/components/app-chrome";
import { Da5500Form } from "@/components/da5500-form";
import { SiteFooter } from "@/components/site-header";

function numParam(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value.replaceAll('"', ""));
    return Number.isFinite(n) ? n : undefined;
  }
  return undefined;
}

export const Route = createFileRoute("/da-5500")({
  validateSearch: (raw: Record<string, unknown>) => ({
    h: numParam(raw.h),
    w: numParam(raw.w),
    w1: numParam(raw.w1),
    w2: numParam(raw.w2),
    w3: numParam(raw.w3),
  }),
  component: Da5500Page,
});

function Da5500Page() {
  const { h, w, w1, w2, w3 } = Route.useSearch();
  return (
    <AppChrome footer={<div className="no-print"><SiteFooter /></div>}>
      <Da5500Form
        prefillHeight={h}
        prefillWaist={w}
        prefillW1={w1}
        prefillW2={w2}
        prefillW3={w3}
      />
    </AppChrome>
  );
}
