import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { d as useRouterState, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as Coffee, l as Ruler, n as WifiOff, o as Smartphone, p as FileSpreadsheet } from "../_libs/lucide-react.mjs";
import { a as cn, r as InstallBar } from "./router-DPvq52mF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-BXm-Quk7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV = [
	{
		to: "/",
		label: "Calculator",
		icon: Ruler
	},
	{
		to: "/da-5500",
		label: "DA 5500",
		icon: FileSpreadsheet
	},
	{
		to: "/install",
		label: "Install",
		icon: Smartphone
	}
];
function AppChrome({ children, footer }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#main",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-3 focus:py-2 focus:text-accent-foreground",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "no-print sticky top-0 z-30 border-b border-border bg-background/95",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-kicker text-accent",
								children: "Army WHtR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-base font-semibold tracking-tight",
								children: "Height & waist"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineChip, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex items-center gap-1",
							"aria-label": "Primary",
							children: NAV.map((item) => {
								const active = pathname === item.to;
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									className: cn("inline-flex h-11 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors duration-[var(--motion-quick)]", active ? "bg-accent text-accent-foreground" : "text-muted hover:bg-surface-2 hover:text-foreground"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: item.label
									})]
								}, item.to);
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallBar, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "main",
				className: "mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10",
				children
			}),
			footer
		]
	});
}
function OfflineChip() {
	const [offline, setOffline] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex h-8 items-center gap-1.5 rounded-sm bg-surface-2 px-2 text-xs text-muted shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "size-3.5" }), "Offline"]
	});
}
var BMC_URL = "https://buymeacoffee.com/wilsonsamiano";
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "no-print border-t border-border",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-3xl text-xs text-subtle",
				children: "Unofficial calculator for the Army Body Composition Program after Army Directive 2026-13 (7 July 2026). Not a substitute for the DA Form 5500 recorded in ATIS. Confirm measurements with your unit. Existing pregnancy and postpartum medical exemptions still apply. No AFT score exempts a Soldier from WHtR."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: BMC_URL,
				target: "_blank",
				rel: "noopener noreferrer",
				className: "inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-md bg-surface-2 px-3 text-sm text-foreground shadow-border transition-[background-color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:bg-surface-3 hover:shadow-border-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coffee, { className: "size-4 text-accent" }), "Buy me a coffee"]
			})]
		})
	});
}
//#endregion
export { SiteFooter as n, AppChrome as t };
