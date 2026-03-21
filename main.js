import { WebHaptics } from "web-haptics";
import { loadEventStore } from "./src/storage.js";
import { createPanel } from "./src/panel.js";
import { setupTimePicker } from "./src/timePicker.js";
import { setupDayDial } from "./src/dayDial.js";
import { setupCaret } from "./src/caret.js";

const haptics = new WebHaptics({ debug: true });

const lines = [...document.querySelectorAll(".line")];
const dayState = new WeakMap();
let eventStore = loadEventStore();
let selectedLine = null;

const panelApi = createPanel(eventStore, dayState, haptics);

const { refs, panelState, overlay, panel, timers, setSetTimeFromString, updateCurrentDayFromLine, refreshPanelContent, resetPanelTransition, startPanelTransition } = panelApi;

const timePickerApi = setupTimePicker(
  {
    formNode: refs.formNode,
    timeHourTrackNode: refs.timeHourTrackNode,
    timeMinuteTrackNode: refs.timeMinuteTrackNode,
    ampmButtons: refs.ampmButtons,
    timeWheelButtons: refs.timeWheelButtons,
  },
  haptics
);

setSetTimeFromString(timePickerApi.setTimeFromString);

for (const [monthIndex, line] of lines.entries()) {
  setupDayDial(line, monthIndex, {
    dayState,
    panelState,
    transitionOverlay: overlay,
    updateCurrentDayFromLine,
    refreshPanelContent,
    startPanelTransition,
    haptics,
    timers,
  });
}

for (const line of lines) {
  const input = line.querySelector('input[type="radio"]');
  const state = dayState.get(line);
  if (!input || !state) continue;
  input.addEventListener("change", () => {
    haptics.trigger();
    selectedLine = input.checked ? line : selectedLine;
    for (const candidate of lines) {
      const ci = candidate.querySelector('input[type="radio"]');
      const cs = dayState.get(candidate);
      if (!ci || !cs) continue;
      cs.dial.tabIndex = ci.checked ? 0 : -1;
    }
    if (!input.checked) return;
    window.clearTimeout(state.delayTimeout);
    line.style.setProperty("--dial-spin-delay", `${state.revealDelayMs}ms`);
    state.delayTimeout = window.setTimeout(() => line.style.setProperty("--dial-spin-delay", "0ms"), state.revealDelayMs + 20);
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Tab" && overlay.classList.contains("is-active")) {
    const focusables = [...panel.querySelectorAll('button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])')].filter((n) => !n.hidden && n.offsetParent !== null);
    if (focusables.length > 0) {
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
  if (e.key === "Escape") resetPanelTransition();
});

window.addEventListener("resize", () => {
  if (!overlay.classList.contains("is-active")) return;
  const selected = document.querySelector(".line:has(> input:checked)");
  if (selected) startPanelTransition(selected);
});

setupCaret(refs.formNode);
