import { createFileRoute } from "@tanstack/react-router";
import { Download, Smartphone, WifiOff } from "lucide-react";
import { AppChrome } from "@/components/app-chrome";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-header";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/install")({ component: InstallPage });

function InstallPage() {
  const [deferred, setDeferred] = useState<null | (Event & { prompt: () => Promise<void> })>(null);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    setStandalone(
      window.matchMedia("(display-mode: standalone)").matches ||
        Boolean((navigator as { standalone?: boolean }).standalone),
    );
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as Event & { prompt: () => Promise<void> });
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  return (
    <AppChrome footer={<SiteFooter />}>
      <div className="mx-auto flex max-w-xl flex-col gap-6">
        <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
          <p className="text-kicker text-muted">Offline · Android · Web app</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Install this calculator
          </h1>
          <p className="mt-2 text-sm text-muted">
            After install, it opens like a phone app, works without a signal,
            and keeps DA 5500 drafts on this device only.
          </p>

          {standalone ? (
            <p className="mt-5 rounded-md bg-pass/15 px-3 py-3 text-sm text-pass">
              Running as an installed app. You can tape and fill DA 5500 offline.
            </p>
          ) : (
            <div className="mt-5 flex flex-wrap gap-2">
              <Button
                type="button"
                disabled={!deferred}
                onClick={() => void deferred?.prompt()}
              >
                <Download />
                {deferred ? "Install Android app" : "Install prompt not ready"}
              </Button>
            </div>
          )}

          {!deferred && !standalone ? (
            <ol className="mt-5 space-y-3 text-sm text-muted">
              <li className="flex gap-3">
                <Smartphone className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  <strong className="text-foreground">Android Chrome:</strong> tap
                  the menu (three dots) → <em>Install app</em> or{" "}
                  <em>Add to Home screen</em>. That installs a WebAPK in the
                  app drawer. It is the Android package for this calculator.
                </span>
              </li>
              <li className="flex gap-3">
                <Download className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  <strong className="text-foreground">Samsung / Firefox:</strong>{" "}
                  Home screen shortcut from the browser menu. Same offline app
                  once the first load has cached.
                </span>
              </li>
              <li className="flex gap-3">
                <WifiOff className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>
                  Open the calculator once while online so the service worker
                  can cache it. After that, height, waist, and DA 5500 PDFs work
                  with airplane mode on.
                </span>
              </li>
            </ol>
          ) : null}
        </section>

        <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Official DA Form 5500
          </h2>
          <p className="mt-2 text-sm text-muted">
            The DA 5500 page stamps your tapes onto the JUL 2026 form. Download
            the filled PDF, print for wet-ink signatures, or copy the ATIS
            block. Signature lines stay blank. The form image caches for offline
            use.
          </p>
        </section>
      </div>
    </AppChrome>
  );
}
