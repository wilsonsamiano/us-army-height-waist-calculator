#!/usr/bin/env node
/**
 * Build the native SPA, add/sync the Android platform if needed, assemble a
 * debug APK. Signing keys are not used.
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

if (!existsSync(join(root, "android"))) {
  run(npxBin, ["cap", "add", "android"]);
}
run(npxBin, ["cap", "sync", "android"]);

const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
run(gradlew, ["assembleDebug"], { cwd: join(root, "android") });

console.log(
  "[android-apk] debug APK: android/app/build/outputs/apk/debug/app-debug.apk",
);
