#!/usr/bin/env node
/**
 * Build the native SPA and generate/sync the iOS Xcode project.
 * Compiling/signing the iOS app requires macOS + Xcode (CI or a Mac).
 */
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL(".", import.meta.url)));
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command, args, opts = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    ...opts,
  });
  if (result.status !== 0) {
    process.exit(result.status === null ? 1 : result.status);
  }
}

run(process.execPath, [
  join(root, "scripts", "with-app-env.mjs"),
  join(root, "node_modules", ".bin", "vite"),
  "build",
  "--config",
  "vite.native.config.ts",
]);
run(process.execPath, [join(root, "scripts", "prepare-native-web.mjs")]);

if (!existsSync(join(root, "ios"))) {
  run(npxBin, ["cap", "add", "ios"]);
}
run(npxBin, ["cap", "sync", "ios"]);
console.log("[ios-sync] Xcode project is in ios/App. Open it on macOS to archive.");
