#!/usr/bin/env node
/**
 * Generate Tauri icons from the existing PWA icon, then bundle Linux deb
 * (always) and AppImage (best-effort; linuxdeploy needs FUSE).
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL(".", import.meta.url)));
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";

function run(command, args, opts = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, ...opts.env },
    ...opts,
  });
  return result.status === null ? 1 : result.status;
}

function requireOk(status) {
  if (status !== 0) process.exit(status);
}

requireOk(run(npxBin, ["tauri", "icon", "public/icon-512.png", "-o", "src-tauri/icons"]));
requireOk(run(npxBin, ["tauri", "build", "--bundles", "deb"]));

const appimageEnv = {
  APPIMAGE_EXTRACT_AND_RUN: "1",
  NO_STRIP: "1",
};
const appimageStatus = run(npxBin, ["tauri", "build", "--bundles", "appimage"], {
  env: appimageEnv,
});
if (appimageStatus !== 0) {
  console.warn(
    "[desktop-linux] AppImage bundling failed (linuxdeploy/FUSE). The .deb is ready under src-tauri/target/release/bundle/deb/",
  );
}
