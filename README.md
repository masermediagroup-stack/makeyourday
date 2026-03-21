# Make Your Day

Minimal calendar app for planning your day. Pick a month, choose a date, and add events.

## What it does

- **Month selector** — 12 vertical lines, one per month
- **Day dial** — Spin to pick the day of the month
- **Events** — Add, view, and delete events for any date
- **Local storage** — Events are saved in your browser
- **Haptic feedback** — Optional vibration on supported devices (mobile)

## Tech stack

- Vanilla HTML, CSS, JavaScript
- [Vite](https://vitejs.dev/) for dev and build
- [web-haptics](https://github.com/lochie/web-haptics) for haptic feedback

## Run locally

```bash
npm install
npm run dev
```

Open the URL in your browser (e.g. `http://localhost:5173/`).

## Build

```bash
npm run build
```

Output is in `dist/`.
