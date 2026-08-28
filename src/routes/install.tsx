import { createFileRoute } from "@tanstack/react-router";
import { Download, Smartphone, WifiOff } from "lucide-react";
import { AppChrome } from "@/components/app-chrome";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-header";
import { useEffect, useState } from "react";

const APK_URL = "/downloads/army-whtr.apk";
const APK_RELEASE =
  "https://github.com/wilsonsamiano/us-army-height-waist-calculator/releases/latest";

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
          <p className="text-kicker text-muted">Sideload · Android APK</p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Download the APK
          </h1>
          <p className="mt-2 text-sm text-muted">
            Signed package <span className="font-mono text-foreground">com.wilsonsamiano.armywhtr</span>
            {" "}v1.0.0. Allow install from this browser, then open Army WHtR from the
            app drawer. First launch needs a signal so it can cache; after that
            tapes and DA 5500 PDFs work offline.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <a href={APK_URL} download="army-whtr.apk">
                <Download />
                Download APK · 2.5 MB
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={APK_RELEASE} target="_blank" rel="noopener noreferrer">
                GitHub Releases
              </a>
            </Button>
          </div>
          <p className="mt-4 text-xs text-subtle">
            Android 7+. Settings → Apps → Special app access → Install unknown
            apps → this browser → Allow. Not on Play Store.
          </p>
        </section>

        <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
          <p className="text-kicker text-muted">Offline · Web app</p>
          <h2 className="mt-1 font-display text-xl font-semibold tracking-tight">
            Or install from Chrome
          </h2>
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
                {deferred ? "Install web app" : "Install prompt not ready"}
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
                  <em>Add to Home screen</em>.
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
      </div>
    </AppChrome>
  );
}
