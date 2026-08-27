#!/usr/bin/env node
/**
 * Flatten the native SPA (TanStack Start writes dist/native/client) into
 * dist/native-www with an index.html shell for Tauri and Capacitor.
 * Also regenerates Tauri icons from public/icon-512.png (no extra binaries in git).
 */
import { cpSync, existsSync, mkdirSync, readdirSync, copyFileSync, rmSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL(".", import.meta.url)));
const dest = join(root, "dist", "native-www");
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";

const icon = spawnSync(
  npxBin,
  ["tauri", "icon", "public/icon-512.png", "-o", "src-tauri/icons"],
  { cwd: root, stdio: "inherit", shell: process.platform === "win32" },
);
if (icon.status !== 0) {
  console.warn("[prepare-native-web] tauri icon generation skipped or failed");
}

const candidates = [
  join(root, "dist", "native", "client"),
  join(root, "dist", "native"),
  join(root, "dist", "native-nitro", "public"),
  join(root, ".output", "public"),
];

function isDir(p) {
  try {
    return statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function hasHtml(dir) {
  if (!isDir(dir)) return false;
  try {
    const names = readdirSync(dir);
    if (names.some((name) => name.endsWith(".html"))) return true;
    const nested = join(dir, "client");
    return isDir(nested) && readdirSync(nested).some((name) => name.endsWith(".html"));
  } catch {
    return false;
  }
}

let source = candidates.find(hasHtml);
if (source && !readdirSync(source).some((name) => name.endsWith(".html")) && isDir(join(source, "client"))) {
  source = join(source, "client");
}

if (!source) {
  console.error(
    "[prepare-native-web] No HTML found. Looked in:\n" +
      candidates.map((c) => `  ${c}`).join("\n"),
  );
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
cpSync(source, dest, { recursive: true });

const indexHtml = join(dest, "index.html");
const shellHtml = join(dest, "_shell.html");
if (!existsSync(indexHtml) && existsSync(shellHtml)) {
  copyFileSync(shellHtml, indexHtml);
}

if (!existsSync(indexHtml)) {
  console.error("[prepare-native-web] dist/native-www/index.html is missing after copy.");
  process.exit(1);
}

console.log(`[prepare-native-web] ready: ${dest} (from ${source})`);
