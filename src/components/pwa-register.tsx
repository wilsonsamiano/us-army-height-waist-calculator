import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const onLoad = () => {
      void navigator.serviceWorker.register("/sw.js").catch(() => {
        /* offline registration can fail on first preview load */
      });
    };
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);
  return null;
}

export function InstallBar() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [hidden, setHidden] = useState(false);
  const [standalone, setStandalone] = useState(false);

  useEffect(() => {
    const standaloneNow =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator && Boolean((navigator as { standalone?: boolean }).standalone));
    setStandalone(standaloneNow);
    const dismissed = sessionStorage.getItem("whtr-install-dismissed") === "1";
    setHidden(dismissed);

    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", () => {
      setDeferred(null);
      setStandalone(true);
    });
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  if (standalone || hidden || !deferred) return null;

  return (
    <div className="border-t border-border bg-surface-2">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <p className="min-w-0 flex-1 text-sm text-muted">
          Install for offline use on this phone.
        </p>
        <Button
          type="button"
          size="sm"
          onClick={async () => {
            await deferred.prompt();
            setDeferred(null);
          }}
        >
          <Download />
          Install app
        </Button>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Dismiss install"
          onClick={() => {
            sessionStorage.setItem("whtr-install-dismissed", "1");
            setHidden(true);
          }}
        >
          <X />
        </Button>
      </div>
    </div>
  );
}
