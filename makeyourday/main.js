import { WebHaptics } from "web-haptics";
import { loadEventStore } from "./src/storage.js";
import { createPanel } from "./src/panel.js";
import { setupTimePicker } from "./src/timePicker.js";
import { setupDayDial } from "./src/dayDial.js";
import { setupCaret } from "./src/caret.js";
import { setupGridPulse } from "./src/gridPulse.js";

const haptics = new WebHaptics({ debug: true });

setupGridPulse(document.getElementById("dot-grid-pulse"));

const lines = [...document.querySelectorAll(".line")];
const dayState = new WeakMap();
let eventStore = loadEventStore();
let selectedLine = null;

const panelApi = createPanel(eventStore, dayState, haptics);

const {
  refs,
  panelState,
  overlay,
  panel,
  timers,
  setSetTimeFromString,
  updateCurrentDayFromLine,
  refreshPanelContent,
  resetPanelTransition,
  startPanelTransition,
  startGlobalEventsPanel,
} = panelApi;

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
  const stem = line.querySelector(".stem");
  const wave = line.querySelector(".wave");
  const collapseBar = (e) => {
    if (!input.checked) return;
    e.preventDefault();
    e.stopPropagation();
    const hadPanel = overlay.classList.contains("is-active") && panelState.line === line;
    input.checked = false;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    if (hadPanel) resetPanelTransition();
  };
  if (stem) stem.addEventListener("click", collapseBar, true);
  if (wave) wave.addEventListener("click", collapseBar, true);
  input.addEventListener("change", () => {
    haptics.trigger();
    if (input.checked) selectedLine = line;
    else if (selectedLine === line) selectedLine = null;
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

const showAllEventsBtn = document.querySelector("[data-show-all-events]");
if (showAllEventsBtn) {
  showAllEventsBtn.addEventListener("click", () => {
    haptics.trigger();
    startGlobalEventsPanel(showAllEventsBtn);
  });
}

window.addEventListener("resize", () => {
  if (!overlay.classList.contains("is-active")) return;
  if (panelState.entry === "global" && showAllEventsBtn) {
    startGlobalEventsPanel(showAllEventsBtn);
    return;
  }
  const selected = document.querySelector(".line:has(> input:checked)");
  if (selected) startPanelTransition(selected);
});

setupCaret(refs.formNode);
