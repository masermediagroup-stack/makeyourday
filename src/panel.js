import { monthNames, weekdayNames } from "./constants.js";
import { buildDateKey, persistEventStore } from "./storage.js";

const PANEL_HTML = `
  <div class="select-panel" role="dialog" aria-modal="true" aria-label="Make Your Day - Day details" aria-hidden="true">
    <section class="event-shell" aria-live="polite">
      <header class="event-head">
        <div class="event-date-number" data-date-number>01</div>
        <div class="event-date-meta">
          <p class="event-weekday" data-weekday>Monday</p>
          <p class="event-month" data-month>January</p>
        </div>
      </header>
      <div class="event-body">
        <div class="event-menu-view" data-menu-view>
          <button type="button" class="event-menu-card" data-menu-add>
            <span class="event-menu-title">Add events</span>
            <span class="event-menu-note">Create an event for this day.</span>
          </button>
          <button type="button" class="event-menu-card" data-menu-show>
            <span class="event-menu-title">Show events</span>
            <span class="event-menu-note">Browse saved events for this day.</span>
          </button>
          <button type="button" class="event-menu-card" data-menu-delete>
            <span class="event-menu-title">Delete an event</span>
            <span class="event-menu-note">Remove an event from this day.</span>
          </button>
        </div>
        <div class="event-list-view" data-list-view>
          <p class="event-description">What needs to be done today.</p>
          <ul class="event-list" data-event-list></ul>
          <p class="event-empty" data-empty-message>No events yet for this day.</p>
        </div>
        <article class="event-detail-view" data-detail-view hidden>
          <button class="event-back" type="button" data-back-list>&lt; Back to list</button>
          <h3 class="event-detail-title" data-detail-title></h3>
          <dl class="event-detail-grid">
            <div><dt>Time</dt><dd data-detail-time></dd></div>
            <div><dt>Location</dt><dd data-detail-location></dd></div>
            <div class="event-detail-block"><dt>Description</dt><dd data-detail-description></dd></div>
          </dl>
        </article>
        <button class="event-menu-back" type="button" data-back-menu aria-label="Back to options" hidden>&larr;</button>
      </div>
      <form class="event-form" data-event-form hidden>
        <div class="event-head event-form-head">
          <div class="event-date-number" data-form-date-number>01</div>
          <div class="event-date-meta">
            <p class="event-weekday" data-form-weekday>Monday</p>
            <p class="event-month" data-form-month>January</p>
          </div>
        </div>
        <label><span>Title</span><input name="title" maxlength="60" required /></label>
        <label class="time-field">
          <span>Time</span>
          <div class="time-picker" data-time-picker>
            <button type="button" class="time-wheel" data-time-wheel="hour" aria-label="Set hour">
              <span class="time-wheel-track" data-time-hour-track></span>
            </button>
            <span class="time-sep">:</span>
            <button type="button" class="time-wheel" data-time-wheel="minute" aria-label="Set minute">
              <span class="time-wheel-track" data-time-minute-track></span>
            </button>
            <div class="ampm-toggle" data-ampm-toggle>
              <button type="button" data-ampm="AM">AM</button>
              <button type="button" data-ampm="PM">PM</button>
            </div>
          </div>
          <input name="time" type="hidden" required />
        </label>
        <label><span>Location</span><input name="location" maxlength="64" required /></label>
        <label class="description-field"><span>Short description</span><textarea name="description" maxlength="180" required></textarea></label>
        <div class="event-form-actions">
          <button type="submit">Save</button>
          <button type="button" data-cancel-form>Cancel</button>
        </div>
      </form>
    </section>
  </div>`;

/**
 * Create and initialize the event panel overlay.
 * @param {Object} eventStore - Mutable event store
 * @param {WeakMap} dayState - Day state per line
 * @param {Object} haptics - WebHaptics instance
 * @returns {Object} - Refs, state, and API for main
 */
export function createPanel(eventStore, dayState, haptics) {
  let setTimeFromStringFn = () => {};
  const overlay = document.createElement("div");
  overlay.className = "select-panel-overlay";
  overlay.innerHTML = PANEL_HTML;
  document.body.append(overlay);

  const panel = overlay.querySelector(".select-panel");
  const eventShell = overlay.querySelector(".event-shell");

  const refs = {
    overlay,
    panel,
    eventShell,
    dateNumberNode: overlay.querySelector("[data-date-number]"),
    weekdayNode: overlay.querySelector("[data-weekday]"),
    monthNode: overlay.querySelector("[data-month]"),
    menuViewNode: overlay.querySelector("[data-menu-view]"),
    listViewNode: overlay.querySelector("[data-list-view]"),
    detailViewNode: overlay.querySelector("[data-detail-view]"),
    descriptionNode: overlay.querySelector(".event-description"),
    eventListNode: overlay.querySelector("[data-event-list]"),
    emptyNode: overlay.querySelector("[data-empty-message]"),
    menuAddBtn: overlay.querySelector("[data-menu-add]"),
    menuShowBtn: overlay.querySelector("[data-menu-show]"),
    menuDeleteBtn: overlay.querySelector("[data-menu-delete]"),
    backBtn: overlay.querySelector("[data-back-list]"),
    backMenuBtn: overlay.querySelector("[data-back-menu]"),
    formNode: overlay.querySelector("[data-event-form]"),
    formDateNumberNode: overlay.querySelector("[data-form-date-number]"),
    formWeekdayNode: overlay.querySelector("[data-form-weekday]"),
    formMonthNode: overlay.querySelector("[data-form-month]"),
    cancelFormBtn: overlay.querySelector("[data-cancel-form]"),
    detailTitleNode: overlay.querySelector("[data-detail-title]"),
    detailTimeNode: overlay.querySelector("[data-detail-time]"),
    detailLocationNode: overlay.querySelector("[data-detail-location]"),
    detailDescriptionNode: overlay.querySelector("[data-detail-description]"),
    timeHourTrackNode: overlay.querySelector("[data-time-hour-track]"),
    timeMinuteTrackNode: overlay.querySelector("[data-time-minute-track]"),
    timeWheelButtons: overlay.querySelectorAll("[data-time-wheel]"),
    ampmButtons: overlay.querySelectorAll("[data-ampm]"),
  };

  const panelState = {
    line: null,
    monthIndex: 0,
    day: 1,
    dateKey: "",
    mode: "menu",
    deleteMode: false,
    detailEventId: null,
    editEventId: null,
  };

  let modeTransitionMidTimeout;
  let modeTransitionEndTimeout;
  let lastFocusedElement = null;

  function getEventsForCurrentDay() {
    const raw = eventStore[panelState.dateKey];
    if (!Array.isArray(raw)) return [];
    return raw.filter((e) =>
      e && typeof e === "object" &&
      typeof e.id === "string" && typeof e.title === "string" &&
      typeof e.time === "string" && typeof e.description === "string" && typeof e.location === "string"
    ).map((e) => ({ ...e }));
  }

  function setMode(mode) {
    panelState.mode = mode;
    const formMode = mode === "form-add" || mode === "form-edit";
    const browseMode = mode === "list" || mode === "detail";
    eventShell.classList.toggle("is-form-mode", formMode);
    refs.menuViewNode.hidden = mode !== "menu";
    refs.listViewNode.hidden = mode !== "list";
    refs.detailViewNode.hidden = mode !== "detail";
    refs.formNode.hidden = !formMode;
    refs.backMenuBtn.hidden = !browseMode;
  }

  function transitionToMode(mode, { prepare, afterSet, onComplete } = {}) {
    window.clearTimeout(timers.modeTransitionMidTimeout);
    window.clearTimeout(timers.modeTransitionEndTimeout);
    eventShell.classList.remove("is-mode-transitioning");
    if (typeof prepare === "function") prepare();
    void eventShell.offsetHeight;
    eventShell.classList.add("is-mode-transitioning");
    timers.modeTransitionMidTimeout = window.setTimeout(() => {
      setMode(mode);
      if (typeof afterSet === "function") afterSet();
    }, 110);
    timers.modeTransitionEndTimeout = window.setTimeout(() => {
      eventShell.classList.remove("is-mode-transitioning");
      if (typeof onComplete === "function") onComplete();
    }, 230);
  }

  function updateCurrentDayFromLine(line) {
    const state = dayState.get(line);
    if (!state) return;
    const { monthIndex, currentDay } = state;
    const date = new Date(new Date().getFullYear(), monthIndex, currentDay);
    panelState.line = line;
    panelState.monthIndex = monthIndex;
    panelState.day = currentDay;
    panelState.dateKey = buildDateKey(monthIndex, currentDay);
    const paddedDay = String(currentDay).padStart(2, "0");
    const weekday = weekdayNames[date.getDay()];
    const month = monthNames[monthIndex];
    refs.dateNumberNode.textContent = paddedDay;
    refs.weekdayNode.textContent = weekday;
    refs.monthNode.textContent = month;
    refs.formDateNumberNode.textContent = paddedDay;
    refs.formWeekdayNode.textContent = weekday;
    refs.formMonthNode.textContent = month;
  }

  function renderEventList() {
    const events = getEventsForCurrentDay();
    eventShell.classList.toggle("is-delete-mode", panelState.deleteMode);
    refs.descriptionNode.textContent = panelState.deleteMode ? "Select an event to delete." : "What needs to be done today.";
    refs.emptyNode.textContent = panelState.deleteMode ? "No events to delete for this day." : "No events yet for this day.";
    refs.eventListNode.innerHTML = "";
    if (events.length === 0) {
      refs.emptyNode.hidden = false;
      if (panelState.mode === "detail") setMode("list");
      return;
    }
    refs.emptyNode.hidden = true;
    for (const eventItem of events) {
      const li = document.createElement("li");
      li.className = "event-item";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.eventId = eventItem.id;
      btn.append(
        Object.assign(document.createElement("span"), { className: "event-item-time", textContent: eventItem.time }),
        Object.assign(document.createElement("span"), { className: "event-item-title", textContent: eventItem.title }),
        Object.assign(document.createElement("span"), { className: "event-item-location", textContent: eventItem.location }),
      );
      li.append(btn);
      refs.eventListNode.append(li);
    }
  }

  function renderDetail() {
    const events = getEventsForCurrentDay();
    const eventItem = events.find((e) => e.id === panelState.detailEventId);
    if (!eventItem) {
      panelState.detailEventId = null;
      setMode("list");
      renderEventList();
      return;
    }
    refs.detailTitleNode.textContent = eventItem.title;
    refs.detailTimeNode.textContent = eventItem.time;
    refs.detailLocationNode.textContent = eventItem.location;
    refs.detailDescriptionNode.textContent = eventItem.description;
  }

  function removeCurrentEvent(eventId) {
    const events = getEventsForCurrentDay();
    const next = events.filter((e) => e.id !== eventId);
    eventStore[panelState.dateKey] = next;
    if (next.length === 0) delete eventStore[panelState.dateKey];
    return persistEventStore(eventStore);
  }

  function openForm(mode, eventItem, { animate = true } = {}) {
    panelState.editEventId = eventItem?.id || null;
    refs.formNode.elements.title.value = eventItem?.title || "";
    refs.formNode.elements.location.value = eventItem?.location || "";
    refs.formNode.elements.description.value = eventItem?.description || "";
    setTimeFromStringFn(eventItem?.time || "09:00");
    if (!animate) {
      setMode(mode);
      refs.formNode.elements.title.focus();
      return;
    }
    transitionToMode(mode, { onComplete: () => refs.formNode.elements.title.focus() });
  }

  function upsertCurrentEvent(payload) {
    const events = [...getEventsForCurrentDay()];
    if (panelState.editEventId) {
      const idx = events.findIndex((e) => e.id === panelState.editEventId);
      if (idx !== -1) events[idx] = { ...events[idx], ...payload };
    } else {
      events.push({
        id: `${Date.now().toString(36)}-${Math.random().toString(16).slice(2, 8)}`,
        ...payload,
      });
    }
    eventStore[panelState.dateKey] = events;
    return persistEventStore(eventStore);
  }

  function refreshPanelContent() {
    renderEventList();
    if (panelState.mode === "detail") renderDetail();
  }

  const timers = {
    resetTransitionTimeout: undefined,
    pendingStartTimeout: undefined,
    pendingActivationRaf: undefined,
    pendingFocusTimeout: undefined,
    modeTransitionMidTimeout: undefined,
    modeTransitionEndTimeout: undefined,
  };

  function resetPanelTransition({ preserveFocus = false } = {}) {
    window.clearTimeout(timers.resetTransitionTimeout);
    window.clearTimeout(timers.pendingStartTimeout);
    window.clearTimeout(timers.pendingFocusTimeout);
    window.clearTimeout(timers.modeTransitionMidTimeout);
    window.clearTimeout(timers.modeTransitionEndTimeout);
    window.cancelAnimationFrame(timers.pendingActivationRaf);
    eventShell.classList.remove("is-mode-transitioning");
    panel.classList.remove("is-settled");
    overlay.classList.remove("is-active");
    document.body.classList.remove("is-transitioning");
    panel.setAttribute("aria-hidden", "true");
    setMode("menu");
    if (!preserveFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") lastFocusedElement.focus();
    if (!preserveFocus) {
      lastFocusedElement = null;
      haptics.trigger([
        { duration: 40, intensity: 0.8 },
        { delay: 100, duration: 40, intensity: 0.6 },
      ]);
    }
  }

  function startPanelTransition(line) {
    const wave = line.querySelector(".wave");
    if (!wave) return;
    updateCurrentDayFromLine(line);
    panelState.deleteMode = false;
    setMode("menu");
    panelState.detailEventId = null;
    panelState.editEventId = null;
    refreshPanelContent();
    const barRect = wave.getBoundingClientRect();
    const panelSize = Math.max(420, Math.min(Math.round(Math.min(window.innerWidth, window.innerHeight) * 0.78), 760));
    panel.style.setProperty("--start-x", `${Math.round(barRect.right)}px`);
    panel.style.setProperty("--start-y", `${Math.round(barRect.bottom)}px`);
    panel.style.setProperty("--panel-size", `${panelSize}px`);
    lastFocusedElement = document.activeElement;
    resetPanelTransition({ preserveFocus: true });
    void panel.offsetHeight;
    timers.pendingActivationRaf = requestAnimationFrame(() => {
      panel.setAttribute("aria-hidden", "false");
      overlay.classList.add("is-active");
      document.body.classList.add("is-transitioning");
      haptics.trigger("success");
      timers.pendingFocusTimeout = window.setTimeout(() => {
        if (overlay.classList.contains("is-active")) refs.menuAddBtn.focus();
      }, 620);
    });
    timers.resetTransitionTimeout = window.setTimeout(() => panel.classList.add("is-settled"), 620);
  }

  refs.eventListNode.addEventListener("click", (e) => {
    const trigger = e.target.closest("button[data-event-id]");
    if (!trigger) return;
    if (panelState.deleteMode) {
      const deleted = removeCurrentEvent(trigger.dataset.eventId);
      if (!deleted) return;
      haptics.trigger("error");
      panelState.detailEventId = null;
      setMode("list");
      refreshPanelContent();
      return;
    }
    haptics.trigger();
    panelState.detailEventId = trigger.dataset.eventId;
    setMode("detail");
    renderDetail();
  });

  refs.backBtn.addEventListener("click", () => {
    haptics.trigger();
    transitionToMode("list", {
      prepare: () => { panelState.detailEventId = null; },
      afterSet: () => refreshPanelContent(),
    });
  });

  refs.backMenuBtn.addEventListener("click", () => {
    haptics.trigger();
    transitionToMode("menu", {
      prepare: () => {
        panelState.detailEventId = null;
        panelState.deleteMode = false;
      },
    });
  });

  refs.menuAddBtn.addEventListener("click", () => {
    haptics.trigger();
    panelState.deleteMode = false;
    openForm("form-add", undefined, { animate: true });
  });

  refs.menuShowBtn.addEventListener("click", () => {
    haptics.trigger();
    transitionToMode("list", {
      prepare: () => { panelState.deleteMode = false; panelState.detailEventId = null; },
      afterSet: () => refreshPanelContent(),
    });
  });

  refs.menuDeleteBtn.addEventListener("click", () => {
    haptics.trigger();
    transitionToMode("list", {
      prepare: () => { panelState.deleteMode = true; panelState.detailEventId = null; },
      afterSet: () => refreshPanelContent(),
    });
  });

  refs.cancelFormBtn.addEventListener("click", () => {
    haptics.trigger([
      { duration: 40, intensity: 0.8 },
      { delay: 100, duration: 40, intensity: 0.6 },
    ]);
    panelState.editEventId = null;
    transitionToMode("menu");
  });

  refs.formNode.addEventListener("submit", (e) => {
    e.preventDefault();
    const payload = {
      title: refs.formNode.elements.title.value.trim(),
      time: refs.formNode.elements.time.value.trim(),
      description: refs.formNode.elements.description.value.trim(),
      location: refs.formNode.elements.location.value.trim(),
    };
    if (!payload.title || !payload.time || !payload.description || !payload.location) return;
    const saved = upsertCurrentEvent(payload);
    if (!saved) return;
    haptics.trigger("success");
    panelState.deleteMode = false;
    panelState.editEventId = null;
    setMode("list");
    refreshPanelContent();
  });

  panel.addEventListener("click", (e) => e.stopPropagation());
  overlay.addEventListener("click", resetPanelTransition);

  return {
    refs,
    panelState,
    overlay,
    panel,
    timers,
    setSetTimeFromString: (fn) => { setTimeFromStringFn = fn; },
    setMode,
    transitionToMode,
    updateCurrentDayFromLine,
    refreshPanelContent,
    resetPanelTransition,
    startPanelTransition,
    getEventsForCurrentDay,
    removeCurrentEvent,
    openForm,
    upsertCurrentEvent,
    renderEventList,
  };
}
