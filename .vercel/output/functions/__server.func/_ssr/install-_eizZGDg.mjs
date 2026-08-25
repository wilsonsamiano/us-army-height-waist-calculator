import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { m as Download, n as WifiOff, o as Smartphone } from "../_libs/lucide-react.mjs";
import { i as Button } from "./router-DPvq52mF.mjs";
import { n as SiteFooter, t as AppChrome } from "./site-header-BXm-Quk7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/install-_eizZGDg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InstallPage() {
	const [deferred, setDeferred] = (0, import_react.useState)(null);
	const [standalone, setStandalone] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setStandalone(window.matchMedia("(display-mode: standalone)").matches || Boolean(navigator.standalone));
		const onPrompt = (event) => {
			event.preventDefault();
			setDeferred(event);
		};
		window.addEventListener("beforeinstallprompt", onPrompt);
		return () => window.removeEventListener("beforeinstallprompt", onPrompt);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppChrome, {
		footer: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-xl flex-col gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-kicker text-muted",
						children: "Offline · Android · Web app"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl",
						children: "Install this calculator"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "After install, it opens like a phone app, works without a signal, and keeps DA 5500 drafts on this device only."
					}),
					standalone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 rounded-md bg-pass/15 px-3 py-3 text-sm text-pass",
						children: "Running as an installed app. You can tape and fill DA 5500 offline."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 flex flex-wrap gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							disabled: !deferred,
							onClick: () => void deferred?.prompt(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), deferred ? "Install Android app" : "Install prompt not ready"]
						})
					}),
					!deferred && !standalone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "mt-5 space-y-3 text-sm text-muted",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "Android Chrome:"
									}),
									" tap the menu (three dots) → ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Install app" }),
									" or",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "Add to Home screen" }),
									". That installs a WebAPK in the app drawer. It is the Android package for this calculator."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: "Samsung / Firefox:"
									}),
									" ",
									"Home screen shortcut from the browser menu. Same offline app once the first load has cached."
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WifiOff, { className: "mt-0.5 size-4 shrink-0 text-accent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Open the calculator once while online so the service worker can cache it. After that, height, waist, and DA 5500 PDFs work with airplane mode on." })]
							})
						]
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl bg-surface p-5 shadow-border sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-semibold tracking-tight",
					children: "Official DA Form 5500"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "The DA 5500 page stamps your tapes onto the JUL 2026 form. Download the filled PDF, print for wet-ink signatures, or copy the ATIS block. Signature lines stay blank. The form image caches for offline use."
				})]
			})]
		})
	});
}
//#endregion
export { InstallPage as component };
