import { createFileRoute } from "@tanstack/react-router";
import {
  Apple,
  Download,
  Globe,
  Monitor,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { AppChrome } from "@/components/app-chrome";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-header";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/install")({ component: InstallPage });

const PACKAGES_URL =
  "https://github.com/wilsonsamiano/us-army-height-waist-calculator/actions/workflows/native-packages.yml";

const PLATFORMS = [
  {
    icon: Smartphone,
    name: "Android",
    how: "Sideload the debug APK. Allow install from this source the first time. Not on Play Store yet.",
    file: "APK",
  },
  {
    icon: Monitor,
    name: "Windows",
    how: "Run the NSIS installer (.exe) from the download page.",
    file: "EXE",
  },
  {
    icon: Monitor,
    name: "Linux",
    how: "Install the .deb (Debian/Ubuntu) with your package manager. AppImage is there when that build succeeds.",
    file: "DEB",
  },
  {
    icon: Apple,
    name: "macOS",
    how: "Open the .dmg and drag the app in. It is unsigned, so right-click Open the first time.",
    file: "DMG",
  },
  {
    icon: Apple,
    name: "iPhone / iPad",
    how: "App Store build is not signed yet. Use Safari: Share, then Add to Home Screen. That is the working install today.",
    file: null,
  },
] as const;

function InstallPage() {
  const [deferred, setDeferred] = useState<null | (Event & { prompt: () => Promise<void> })>(
    null,
  );
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
          <p className="text-kicker text-muted">
            Android · Windows · Linux · Apple · Browser
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Install this calculator
          </h1>
          <p className="mt-2 text-sm text-muted">
            Pick the package for your device, or add it from this browser. After
            install it works offline and keeps DA 5500 drafts on this device
            only. Store listings (Play / App Store) come later.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild>
              <a href={PACKAGES_URL} target="_blank" rel="noopener noreferrer">
                <Download />
                Get packages
              </a>
            </Button>
            {deferred && !standalone ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => void deferred.prompt()}
              >
                <Globe />
                Install from this browser
              </Button>
            ) : null}
          </div>
          {standalone ? (
            <p className="mt-5 rounded-md bg-pass/15 px-3 py-3 text-sm text-pass">
              Running as an installed app. You can tape and fill DA 5500 offline.
            </p>
          ) : null}
        </section>

        <section className="rounded-2xl bg-surface p-5 shadow-border sm:p-6">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            Ways to install
          </h2>
          <ul className="mt-4 divide-y divide-border border-t border-border">
            {PLATFORMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.name} className="flex gap-3 py-4">
                  <Icon className="mt-0.5 size-4 shrink-0 text-accent" />
                  <div className="min-w-0">
                    <p className="font-medium">
                      {item.name}
                      {item.file ? (
                        <span className="ml-2 font-mono text-xs text-subtle">
                          {item.file}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 text-sm text-muted">{item.how}</p>
                  </div>
                </li>
              );
            })}
            <li className="flex gap-3 py-4">
              <WifiOff className="mt-0.5 size-4 shrink-0 text-accent" />
              <div>
                <p className="font-medium">This browser</p>
                <p className="mt-1 text-sm text-muted">
                  Chrome or Edge: Install app from the address bar or the
                  button above. Safari on iPhone: Share, then Add to Home
                  Screen. Open it once online so it caches.
                </p>
              </div>
            </li>
          </ul>
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
