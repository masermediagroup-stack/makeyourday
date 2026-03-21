import { monthLengths } from "./constants.js";
import { wrapDay, escapeHtml } from "./utils.js";

/**
 * Set up the day dial and select trigger for a single month line.
 * @param {HTMLElement} line
 * @param {number} monthIndex
 * @param {Object} shared - Shared state and DOM refs
 */
export function setupDayDial(line, monthIndex, shared) {
  const {
    dayState,
    panelState,
    transitionOverlay,
    updateCurrentDayFromLine,
    refreshPanelContent,
    startPanelTransition,
    haptics,
    timers,
  } = shared;

  const input = line.querySelector('input[type="radio"]');
  const monthNodeEl = line.querySelector(".month");
  const text = monthNodeEl?.dataset.text || "";
  if (monthNodeEl) {
    monthNodeEl.innerHTML = [...text].map((ch, i) => {
      const escaped = ch === " " ? "&nbsp;" : escapeHtml(ch);
      return `<span style="--i:${i}">${escaped}</span>`;
    }).join("");
  }

  const daysInMonth = monthLengths[monthIndex] ?? 30;
  const fullCycles = 2;
  const totalItems = daysInMonth * (fullCycles + 1);
  const itemHeight = 24;
  const baseIndex = Math.floor((totalItems - daysInMonth) / 2);

  const dial = document.createElement("span");
  dial.className = "day-dial";
  dial.tabIndex = -1;
  dial.setAttribute("role", "spinbutton");

  const dialTrack = document.createElement("span");
  dialTrack.className = "dial-track";
  for (let i = 0; i < totalItems; i += 1) {
    const slot = document.createElement("span");
    slot.textContent = String((i % daysInMonth) + 1).padStart(2, "0");
    dialTrack.append(slot);
  }
  dial.append(dialTrack);
  if (monthNodeEl) monthNodeEl.append(dial);

  const selectTrigger = document.createElement("button");
  selectTrigger.type = "button";
  selectTrigger.className = "select-trigger";
  selectTrigger.setAttribute("aria-label", `Select ${text}`);
  selectTrigger.textContent = ">";
  if (monthNodeEl) monthNodeEl.append(selectTrigger);

  const revealDelayMs = 200 + Math.max(text.length - 1, 0) * 32 + 420 + 40;
  line.style.setProperty("--dial-delay", `${revealDelayMs}ms`);
  line.style.setProperty("--dial-spin-delay", `${revealDelayMs}ms`);

  const state = {
    monthIndex,
    daysInMonth,
    itemHeight,
    currentDay: 1,
    currentIndex: baseIndex,
    revealDelayMs,
    dial,
    input,
    line,
    spinTimeout: undefined,
    delayTimeout: undefined,
  };
  dayState.set(line, state);

  const syncDial = (animate = true) => {
    const prev = dialTrack.style.transition;
    if (!animate) dialTrack.style.transition = "none";
    line.style.setProperty("--dial-stop", `${-state.currentIndex * state.itemHeight}px`);
    dial.setAttribute("aria-valuemin", "1");
    dial.setAttribute("aria-valuemax", String(state.daysInMonth));
    dial.setAttribute("aria-valuenow", String(state.currentDay));
    dial.setAttribute("aria-valuetext", `Day ${state.currentDay}`);
    if (!animate) {
      void dialTrack.offsetHeight;
      dialTrack.style.transition = prev;
    }
  };
  syncDial();

  const markTurning = () => {
    dial.classList.add("is-turning");
    window.clearTimeout(state.spinTimeout);
    state.spinTimeout = window.setTimeout(() => dial.classList.remove("is-turning"), 120);
  };

  const spinBy = (delta) => {
    if (!delta) return;
    if (input && !input.checked) {
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    line.style.setProperty("--dial-spin-delay", "0ms");
    if (delta > 0 && state.currentDay === state.daysInMonth) {
      state.currentIndex = baseIndex + (state.daysInMonth - 1);
      syncDial(false);
    } else if (delta < 0 && state.currentDay === 1) {
      state.currentIndex = baseIndex;
      syncDial(false);
    }
    state.currentDay = wrapDay(state.currentDay + delta, state.daysInMonth);
    state.currentIndex += delta;
    syncDial(true);
    markTurning();
    haptics.trigger(30);
    if (panelState.line === line && transitionOverlay.classList.contains("is-active")) {
      updateCurrentDayFromLine(line);
      refreshPanelContent();
    }
  };

  const dragStepPx = 12;
  let dragPointerId = null;
  let dragLastY = 0;
  let dragAccumulator = 0;
  const stopDrag = () => {
    dragPointerId = null;
    dragAccumulator = 0;
    dial.classList.remove("is-dragging");
  };

  dial.addEventListener("wheel", (e) => {
    e.preventDefault();
    if (e.deltaY === 0) return;
    spinBy(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  dial.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); spinBy(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); spinBy(-1); }
  });

  dial.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 && e.pointerType !== "touch") return;
    e.preventDefault();
    if (input && !input.checked) {
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }
    dial.focus();
    dragPointerId = e.pointerId;
    dragLastY = e.clientY;
    dragAccumulator = 0;
    dial.classList.add("is-dragging");
    dial.setPointerCapture(e.pointerId);
  });

  dial.addEventListener("pointermove", (e) => {
    if (dragPointerId !== e.pointerId) return;
    e.preventDefault();
    const deltaY = e.clientY - dragLastY;
    dragLastY = e.clientY;
    dragAccumulator += deltaY;
    while (dragAccumulator >= dragStepPx) { spinBy(1); dragAccumulator -= dragStepPx; }
    while (dragAccumulator <= -dragStepPx) { spinBy(-1); dragAccumulator += dragStepPx; }
  });

  dial.addEventListener("pointerup", (e) => {
    if (dragPointerId !== e.pointerId) return;
    e.preventDefault();
    stopDrag();
  });
  dial.addEventListener("pointercancel", stopDrag);
  dial.addEventListener("lostpointercapture", stopDrag);

  selectTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.clearTimeout(timers.pendingStartTimeout);
    const triggerTransition = () => startPanelTransition(line);
    if (input && !input.checked) {
      input.checked = true;
      input.dispatchEvent(new Event("change", { bubbles: true }));
      timers.pendingStartTimeout = window.setTimeout(triggerTransition, 220);
    } else {
      triggerTransition();
    }
  });
}
