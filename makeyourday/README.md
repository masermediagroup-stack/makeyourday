# Make Your Day

Minimal calendar app for planning your day. Pick a month, choose a date, and add events.

## What it does

- **Month selector** — 12 vertical lines, one per month
- **Day dial** — Spin to pick the day of the month
- **Events** — Add, view, and delete events for any date
- **Local storage** — Events are saved in your browser (or in the desktop app’s local profile)
- **Haptic feedback** — Optional vibration on supported devices (mobile)
- **Desktop shell** — Optional [Tauri](https://tauri.app/) build for Windows (`.exe` installer)

## UI notes

- **Fonts** — [Google Fonts](https://fonts.google.com/): Doto, Space Grotesk, Space Mono (loaded in [`index.html`](index.html))
- **Background** — Animated dot grid canvas (`#dot-grid-pulse`) behind the main UI
- **Layout** — `main.app-main` wraps `div.app-viewport` (header + month lines)

## Tech stack

- Vanilla HTML, CSS, JavaScript
- [Vite](https://vitejs.dev/) for dev and build ([`vite.config.js`](vite.config.js) pins dev server to port `5173` for Tauri)
- [web-haptics](https://github.com/lochie/web-haptics) for haptic feedback

## Web: develop and preview

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

## Desktop (Windows): Tauri

Prerequisites on the machine that builds the app:

1. **Rust** — Install [rustup](https://rustup.rs/) (stable).
2. **Windows** — [WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) is usually already installed. **MSVC** C++ build tools (Visual Studio Build Tools) are required to link the Rust binary.

Commands from this folder:

```bash
npm install
npm run tauri:dev
```

Runs Vite and opens the app in a native window. Data still uses `localStorage` inside the WebView (no cloud).

**Production installer:**

```bash
npm run tauri:build
```

Artifacts appear under `src-tauri/target/release/bundle/` — on Windows, the NSIS setup `.exe` is typically in the `nsis` subfolder. Install that file to add **Make Your Day** like any other Windows program.

`src-tauri/target/` is gitignored; commit the `src-tauri/` sources and `Cargo.lock` after a successful build so others can reproduce builds.
