# Make Your Day — Second Brain Notes

Personal knowledge base for the **Make Your Day** calendar / events tool in this repo. Use this when picking the project back up or building similar tools.

---

## What this project is

- **Name:** `makeyourday` (npm package name), **Make Your Day** (user-facing title).
- **What it does:** Vertical month “lines” with a day dial, event panel (add / list / delete), local persistence, optional haptic feedback on supported devices.
- **Stack:** Vanilla HTML/CSS/JS, **Vite** for dev + bundling, **`web-haptics`** for haptics.

---

## File map (important pieces)

| File | Role |
|------|------|
| `index.html` | Shell: 12 month lines, `<script type="module" src="/main.js">` |
| `main.js` | Entry point (~85 lines): wires modules, global listeners |
| `src/constants.js` | `STORAGE_KEY`, `monthLengths`, `monthNames`, `weekdayNames` |
| `src/utils.js` | `escapeHtml`, `wrapDay`, `pad2` |
| `src/storage.js` | `loadEventStore`, `persistEventStore`, `buildDateKey` |
| `src/dayDial.js` | `setupDayDial(line, monthIndex, shared)` — one month line + day dial |
| `src/timePicker.js` | `setupTimePicker(refs, haptics)` — time wheels, AM/PM, spin logic |
| `src/panel.js` | `createPanel(...)` — overlay DOM, modes, events, transitions |
| `src/caret.js` | `setupCaret(formNode)` — custom caret for form fields |
| `styles.css` | Visual design |
| `package.json` | `makeyourday`, scripts, `web-haptics`, `vite` |
| `.gitignore` | `node_modules/`, `dist/`, logs, env files |

---

## Why we added npm + Vite

**Before:** One HTML file with a huge inline `<script>`.

**After:** `main.js` as an ES module so we can `import { WebHaptics } from "web-haptics"`.

- Browsers don’t resolve `node_modules` by path without a bundler or import maps.
- **Vite** serves `index.html`, resolves imports, and hot-reloads in dev.

**Run locally:**

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

---

## Web haptics — what we learned

### Library

- Package: [`web-haptics`](https://www.npmjs.com/package/web-haptics) · [GitHub: lochie/web-haptics](https://github.com/lochie/web-haptics) · [Site](https://haptics.lochie.me)
- Wraps the **Vibration API** (`navigator.vibrate`); no-ops where unsupported.

### React vs vanilla

| Context | API |
|--------|-----|
| React | `import { useWebHaptics } from "web-haptics/react"` → `const { trigger } = useWebHaptics()` |
| **This app (vanilla)** | `import { WebHaptics } from "web-haptics"` → `const haptics = new WebHaptics(); haptics.trigger(...)` |

Same library, different entry points.

### Useful `trigger` inputs

- `haptics.trigger()` — default light tap  
- `haptics.trigger("success")` — positive / confirmation  
- `haptics.trigger("error")` — stronger / destructive  
- `haptics.trigger(30)` — single duration in ms (good for dial ticks)  
- Custom arrays / presets per package README  

### Options

- `{ debug: true }` — audio feedback on desktop when there’s no motor (good for dev).
- `WebHaptics.isSupported` — static check for vibration support.

### Rules of thumb

1. **User gesture** — vibration usually must follow a tap/click (browser policy).
2. **One shared instance** — e.g. one `haptics` object for the whole app.
3. **Match meaning** — success vs error vs light tick for scrolling.
4. **Avoid double-fire** — if one function runs for both “reset before open” and “close”, only trigger on real user closes (we used `preserveFocus` to distinguish).

---

## Haptic mapping we implemented (reference)

| Interaction | Feedback |
|---------------|----------|
| Month line selected | Light tap |
| Day dial step | Short tick (~30 ms) |
| Panel opens (`>`) | `success` |
| Menu / nav buttons | Light tap |
| Open event detail | Light tap |
| Delete event | `error` |
| Time wheel step | Short tick (~25 ms) |
| AM/PM | Light tap |
| Save event | `success` |
| Cancel | Light tap |
| Close panel (overlay / Escape) | Light tap |

---

## Naming & storage migration

- **Title:** `Make Your Day` (browser tab).
- **Main landmark:** `aria-label="Make Your Day - Calendar and events"`.
- **Panel dialog:** `aria-label="Make Your Day - Day details"`.
- **localStorage key:** `makeyourday-events-v1`.

**Important:** Renaming from an older key (`minimal-brutal-calendar-events-v1`) **does not** migrate old data automatically. Users start with an empty event store unless you add a one-time migration (read old key → write new key → remove old).

---

## Architecture patterns worth reusing

1. **Central `haptics`** — easy to add a global “disable haptics” later.
2. **Triggers in handlers** — call `trigger` at the start of click handlers or inside shared functions like `spinTime` / `spinBy` so wheel + keyboard + drag all feel consistent.
3. **User content → `textContent`** — event titles, descriptions, etc. are set with `textContent`, not `innerHTML`, which avoids XSS when showing stored strings.
4. **Static template `innerHTML`** — overlay markup is a fixed template string (no user strings inside), which is acceptable; be careful if anything becomes dynamic.
5. **Escape before `innerHTML`** — when inserting dynamic strings (e.g. month letters from `data-text`), use `escapeHtml()` to avoid XSS. We added `src/utils.js` with `escapeHtml()` for this.

---

## Code review fixes we implemented

After a security/quality pass, we applied these changes:

### Done

| Issue | Fix |
|-------|-----|
| **File > 800 lines** | Split `main.js` into 7 modules. Entry point is now ~85 lines. |
| **Large loop (90+ lines)** | Extracted `setupDayDial(line, monthIndex, shared)` in `src/dayDial.js`. |
| **`innerHTML` without escaping** | Added `escapeHtml()` in `src/utils.js`; month letter spans use it before insertion. |
| **Unused `timePickerNode`** | Removed from panel refs. |
| **Missing `.gitignore`** | Added `.gitignore` with `node_modules/`, `dist/`, logs, env files. |

### Deferred

| Issue | Reason |
|-------|--------|
| **`npm audit fix --force`** | Would upgrade Vite to v8 (breaking). Advisory is moderate, dev-server only. Plan upgrade when convenient. |
| **JSDoc for public APIs** | Optional; add as needed. |

---

## Module split — what we learned

### Dependency order

- **Panel** creates the overlay DOM (including form with time picker). **Time picker** needs `formNode` and other refs from the panel. So panel is created first, then `setupTimePicker(refs, haptics)`.
- **`openForm`** in panel needs to call `setTimeFromString` (from time picker) when loading an event. Since time picker is created *after* panel, we use a setter: `setSetTimeFromString(fn)` so panel can receive the real function once time picker is ready.

### Shared state

- **`timers`** — `resetTransitionTimeout`, `pendingStartTimeout`, etc. live in the panel’s `timers` object. The day dial’s select-trigger sets `timers.pendingStartTimeout`; `resetPanelTransition` clears it. Pass the same `timers` reference to both.
- **`panelState`**, **`eventStore`**, **`dayState`** — mutable objects passed by reference. Modules that need them receive them as arguments.

### Extracting setup functions

- `setupDayDial(line, monthIndex, shared)` encapsulates everything for one month line: DOM, state, wheel/key/drag listeners, select-trigger click. The main loop is just `for (const [i, line] of lines.entries()) { setupDayDial(line, i, shared); }`.
- Same idea for `setupTimePicker`, `setupCaret`: each receives refs and dependencies, wires events, returns or exposes what’s needed.

---

## Learning checklist (building similar tools)

1. List all meaningful interactions (buttons, dials, open/close, save, delete).
2. Assign haptic “weight” (tap vs success vs error vs tick).
3. Wire `trigger` in the right handler or shared function.
4. Watch for shared cleanup functions that run on both open and close — don’t double-haptic.
5. Test on a **real phone** or use `debug: true` on desktop.
6. Keep secrets out of the client; this app has no API keys.

---

## Quick commands

```bash
npm run dev      # development server
npm run build    # production build (output in dist/)
npm run preview  # preview production build locally
```

---

## Related links

- [web-haptics on npm](https://www.npmjs.com/package/web-haptics)  
- [web-haptics GitHub](https://github.com/lochie/web-haptics)  
- [MDN: Vibration API](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)  
- [Vite](https://vitejs.dev/)

---

*Last updated: code review fixes (module split, escapeHtml, .gitignore), refactoring notes, and dependency patterns.*
