import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { FileSpreadsheet, Ruler, Smartphone, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { InstallBar } from "@/components/pwa-register";

const NAV = [
  { to: "/", label: "Calculator", icon: Ruler },
  { to: "/da-5500", label: "DA 5500", icon: FileSpreadsheet },
  { to: "/install", label: "Install", icon: Smartphone },
] as const;

export function AppChrome({
  children,
  footer,
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground"
      >
        Skip to content
      </a>
      <header className="no-print sticky top-0 z-30 border-b border-border bg-background/95">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="min-w-0 flex-1">
            <p className="text-kicker text-accent">Army WHtR</p>
            <p className="truncate font-display text-base font-semibold tracking-tight">
              Height & waist
            </p>
          </Link>
          <OfflineChip />
          <nav className="flex items-center gap-1" aria-label="Primary">
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "inline-flex h-11 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors duration-[var(--motion-quick)]",
                    active
                      ? "bg-accent text-accent-foreground"
                      : "text-muted hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <InstallBar />
      </header>
      <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {children}
      </main>
      {footer}
    </div>
  );
}

function OfflineChip() {
  const [offline, setOffline] = useState(false);
  useEffect(() => {
    const sync = () => setOffline(!navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);
  if (!offline) return null;
  return (
    <span className="inline-flex h-8 items-center gap-1.5 rounded-sm bg-surface-2 px-2 text-xs text-muted shadow-border">
      <WifiOff className="size-3.5" />
      Offline
    </span>
  );
}
