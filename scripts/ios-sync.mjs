#!/usr/bin/env node
/**
 * Build the native SPA and generate/sync the iOS Xcode project.
 * Compiling/signing the iOS app requires macOS + Xcode (CI or a Mac).
 * Writes a shared App scheme so xcodebuild works without opening Xcode.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(new URL(".", import.meta.url)));
const npxBin = process.platform === "win32" ? "npx.cmd" : "npx";
const winShell = process.platform === "win32";

function run(command, args, opts = {}) {
  const result = spawnSync(command, args, {
    cwd: root,
    stdio: "inherit",
    shell: winShell,
    ...opts,
  });
  if (result.status !== 0) {
    process.exit(result.status === null ? 1 : result.status);
  }
}

function capacitorAppTargetId() {
  const pbx = join(root, "ios", "App", "App.xcodeproj", "project.pbxproj");
  try {
    const text = readFileSync(pbx, "utf8");
    const m = text.match(/([A-F0-9]{24}) \/\* App \*\/ = \{\s*\n\s*isa = PBXNativeTarget;/);
    if (m) return m[1];
  } catch {
    // Capacitor pods template default native target id
  }
  return "504EC3031FED79650016851F";
}

function writeSharedScheme() {
  const id = capacitorAppTargetId();
  const schemeDir = join(root, "ios", "App", "App.xcodeproj", "xcshareddata", "xcschemes");
  mkdirSync(schemeDir, { recursive: true });
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Scheme
   LastUpgradeVersion = "1500"
   version = "1.7">
   <BuildAction
      parallelizeBuildables = "YES"
      buildImplicitDependencies = "YES">
      <BuildActionEntries>
         <BuildActionEntry
            buildForTesting = "YES"
            buildForRunning = "YES"
            buildForProfiling = "YES"
            buildForArchiving = "YES"
            buildForAnalyzing = "YES">
            <BuildableReference
               BuildableIdentifier = "primary"
               BlueprintIdentifier = "${id}"
               BuildableName = "App.app"
               BlueprintName = "App"
               ReferencedContainer = "container:App.xcodeproj">
            </BuildableReference>
         </BuildActionEntry>
      </BuildActionEntries>
   </BuildAction>
   <TestAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      shouldUseLaunchSchemeArgsEnv = "YES"
      shouldAutocreateTestPlan = "YES">
   </TestAction>
   <LaunchAction
      buildConfiguration = "Debug"
      selectedDebuggerIdentifier = "Xcode.DebuggerFoundation.Debugger.LLDB"
      selectedLauncherIdentifier = "Xcode.DebuggerFoundation.Launcher.LLDB"
      launchStyle = "0"
      useCustomWorkingDirectory = "NO"
      ignoresPersistentStateOnLaunch = "NO"
      debugDocumentVersioning = "YES"
      debugServiceExtension = "internal"
      allowLocationSimulation = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "${id}"
            BuildableName = "App.app"
            BlueprintName = "App"
            ReferencedContainer = "container:App.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </LaunchAction>
   <ProfileAction
      buildConfiguration = "Release"
      shouldUseLaunchSchemeArgsEnv = "YES"
      savedToolIdentifier = ""
      useCustomWorkingDirectory = "NO"
      debugDocumentVersioning = "YES">
      <BuildableProductRunnable
         runnableDebuggingMode = "0">
         <BuildableReference
            BuildableIdentifier = "primary"
            BlueprintIdentifier = "${id}"
            BuildableName = "App.app"
            BlueprintName = "App"
            ReferencedContainer = "container:App.xcodeproj">
         </BuildableReference>
      </BuildableProductRunnable>
   </ProfileAction>
   <AnalyzeAction
      buildConfiguration = "Debug">
   </AnalyzeAction>
   <ArchiveAction
      buildConfiguration = "Release"
      revealArchiveInOrganizer = "YES">
   </ArchiveAction>
</Scheme>
`;
  writeFileSync(join(schemeDir, "App.xcscheme"), xml);
}

function tryPodInstall() {
  const appDir = join(root, "ios", "App");
  if (!existsSync(join(appDir, "Podfile"))) return;
  const result = spawnSync("pod", ["install"], {
    cwd: appDir,
    stdio: "inherit",
  });
  if (result.error) {
    console.log("[ios-sync] CocoaPods not on PATH; macOS CI will run pod install.");
  } else if (result.status !== 0) {
    console.warn("[ios-sync] pod install exited", result.status);
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
writeSharedScheme();
tryPodInstall();
console.log("[ios-sync] Xcode project is in ios/App. Open it on macOS to archive.");
