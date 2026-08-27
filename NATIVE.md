# Native packages

Installable wrappers around the client-side Army height and waist calculator
(AD 2026-13 / AR 600-9). The Vercel web app is unchanged: `npm run build`
still uses `vite.config.ts` (port 8080, `grokPwaPlugin()`, vercel nitro).

Native wrappers use **`vite.native.config.ts`** — TanStack Start SPA mode,
no Grok PWA chrome, no Vercel preset. Auth/db stay off.

| Target | Wrapper | Built where |
| --- | --- | --- |
| Android APK (debug, unsigned) | Capacitor | Linux box with JDK/SDK + Ubuntu CI |
| Windows installer (NSIS) | Tauri 2 | GitHub Actions `windows-latest` |
| Linux AppImage + .deb | Tauri 2 | Linux box (.deb) + Ubuntu CI (both) |
| macOS .app / .dmg | Tauri 2 | GitHub Actions `macos-latest` (unsigned) |
| iOS Xcode app | Capacitor | GitHub Actions `macos-latest` (unsigned / simulator) |

No signing keys or store secrets are in this repo. Play Store and Apple
Developer signing are expected follow-up, not a packaging failure.

## One-time setup

```sh
npm install
```

Tauri Linux system packages:

```sh
sudo apt-get update
sudo apt-get install -y libwebkit2gtk-4.1-dev libgtk-3-dev libayatana-appindicator3-dev librsvg2-dev patchelf
```

Need a current Rust (1.88+). `rust-toolchain.toml` pins `stable`.

Android (debug APK): JDK 17+ and Android SDK. CI installs these via
`actions/setup-java` and `android-actions/setup-android`.

Apple: Xcode on macOS. Linux cannot compile or sign iOS/macOS.

## Commands

Web app (unchanged):

```sh
npm run dev
npm run build
```

Native web directory (`dist/native-www`, required by Tauri and Capacitor):

```sh
npm run build:native
```

Linux desktop (.deb always; AppImage when linuxdeploy/FUSE works):

```sh
npm run desktop:linux
```

Artifacts:

- `src-tauri/target/release/bundle/deb/*.deb`
- `src-tauri/target/release/bundle/appimage/*.AppImage`
- `src-tauri/target/release/army-whtr-calculator`

Windows installer (run on Windows or CI):

```sh
npm run desktop:windows
```

Artifact: `src-tauri/target/release/bundle/nsis/*.exe`

macOS (run on macOS or CI; unsigned without Apple certs):

```sh
npm run desktop:macos
```

Artifacts:

- `src-tauri/target/release/bundle/macos/*.app`
- `src-tauri/target/release/bundle/dmg/*.dmg`

Android debug APK:

```sh
npm run android:apk
```

Artifact: `android/app/build/outputs/apk/debug/app-debug.apk`

The script generates `android/` with `npx cap add android` when missing
(the folder is gitignored). Play signing is not applied.

iOS Xcode project:

```sh
npm run ios:sync
```

Then on macOS:

```sh
cd ios/App
xcodebuild -scheme App -destination 'generic/platform=iOS Simulator' -configuration Debug CODE_SIGNING_ALLOWED=NO build
```

Or open `ios/App/App.xcworkspace` in Xcode, pick a Team, and Archive.

## GitHub Actions / Releases

`.github/workflows/native-packages.yml` builds on pull requests, the
`native-packages` branch, manual dispatch, and tags matching `v*`.

Push a version tag to publish a GitHub Release with the artifacts:

```sh
git tag v1.0.0
git push origin v1.0.0
```

## Identifier

`com.wilsonsamiano.armywhtr`
