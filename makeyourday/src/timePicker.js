import { pad2 } from "./utils.js";

/**
 * Set up the time picker (hour/minute wheels, AM/PM).
 * @param {Object} refs - DOM refs: formNode, timeHourTrackNode, timeMinuteTrackNode, ampmButtons, timeWheelButtons
 * @param {Object} haptics - WebHaptics instance
 * @returns {Object} - { timeWheelState, timeMeridiem, setTimeFromString, syncTimeValue }
 */
export function setupTimePicker(refs, haptics) {
  const { formNode, timeHourTrackNode, timeMinuteTrackNode, ampmButtons, timeWheelButtons } = refs;

  const timeWheelState = {
    hour: { value: 9, count: 12, base: 12, index: 12 + 8, track: timeHourTrackNode },
    minute: { value: 0, count: 60, base: 60, index: 60, track: timeMinuteTrackNode },
  };
  let timeMeridiem = "AM";

  function buildTimeWheelTrack(trackNode, count, formatter) {
    trackNode.innerHTML = "";
    for (let i = 0; i < count * 3; i += 1) {
      const slot = document.createElement("span");
      slot.textContent = formatter(i % count);
      trackNode.append(slot);
    }
  }

  function syncTimeWheel(part, animate = true) {
    const wheel = timeWheelState[part];
    const previousTransition = wheel.track.style.transition;
    if (!animate) wheel.track.style.transition = "none";
    wheel.track.style.transform = `translateY(${-wheel.index * 24}px)`;
    if (!animate) {
      void wheel.track.offsetHeight;
      wheel.track.style.transition = previousTransition;
    }
  }

  function syncTimeValue() {
    const value = `${pad2(timeWheelState.hour.value)}:${pad2(timeWheelState.minute.value)} ${timeMeridiem}`;
    formNode.elements.time.value = value;
  }

  function spinTime(part, delta) {
    const wheel = timeWheelState[part];
    if (!delta) return;
    const minValue = part === "hour" ? 1 : 0;
    const maxValue = part === "hour" ? 12 : wheel.count - 1;
    if (delta > 0 && wheel.value === maxValue) {
      wheel.index = wheel.base + (wheel.count - 1);
      syncTimeWheel(part, false);
    } else if (delta < 0 && wheel.value === minValue) {
      wheel.index = wheel.base;
      syncTimeWheel(part, false);
    }
    if (part === "hour") {
      wheel.value = ((wheel.value - 1 + delta + 12) % 12) + 1;
    } else {
      wheel.value = (wheel.value + delta + wheel.count) % wheel.count;
    }
    wheel.index += delta;
    syncTimeWheel(part, true);
    syncTimeValue();
    haptics.trigger(25);
  }

  function setTimeFromString(value) {
    const match = /^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/.exec((value || "").trim());
    let hour = match ? Number(match[1]) : 9;
    const minute = match ? Number(match[2]) : 0;
    const explicitMeridiem = match && match[3] ? match[3].toUpperCase() : null;
    if (explicitMeridiem) {
      timeMeridiem = explicitMeridiem;
      hour = Number.isFinite(hour) ? Math.max(1, Math.min(12, hour)) : 9;
    } else {
      const normalized = Number.isFinite(hour) ? Math.max(0, Math.min(23, hour)) : 9;
      timeMeridiem = normalized >= 12 ? "PM" : "AM";
      hour = normalized % 12;
      hour = hour === 0 ? 12 : hour;
    }
    timeWheelState.hour.value = hour;
    timeWheelState.minute.value = Number.isFinite(minute) ? Math.max(0, Math.min(59, minute)) : 0;
    timeWheelState.hour.index = timeWheelState.hour.base + (timeWheelState.hour.value - 1);
    timeWheelState.minute.index = timeWheelState.minute.base + timeWheelState.minute.value;
    syncTimeWheel("hour", false);
    syncTimeWheel("minute", false);
    for (const btn of ampmButtons) {
      btn.classList.toggle("is-active", btn.dataset.ampm === timeMeridiem);
    }
    syncTimeValue();
  }

  buildTimeWheelTrack(timeHourTrackNode, timeWheelState.hour.count, (v) => pad2(v + 1));
  buildTimeWheelTrack(timeMinuteTrackNode, timeWheelState.minute.count, (v) => pad2(v));
  setTimeFromString("09:00");

  for (const button of ampmButtons) {
    button.addEventListener("click", () => {
      haptics.trigger();
      timeMeridiem = button.dataset.ampm === "PM" ? "PM" : "AM";
      for (const item of ampmButtons) item.classList.toggle("is-active", item === button);
      syncTimeValue();
    });
  }

  for (const button of timeWheelButtons) {
    const part = button.dataset.timeWheel;
    if (!part || !(part in timeWheelState)) continue;
    button.addEventListener("wheel", (e) => {
      e.preventDefault();
      if (e.deltaY === 0) return;
      spinTime(part, e.deltaY > 0 ? 1 : -1);
    }, { passive: false });
    button.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); spinTime(part, 1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); spinTime(part, -1); }
    });
    let dragPointerId = null, dragLastY = 0, dragAccumulator = 0;
    const dragStepPx = 10;
    const stopDrag = () => {
      dragPointerId = null;
      dragAccumulator = 0;
      button.classList.remove("is-dragging");
    };
    button.addEventListener("pointerdown", (e) => {
      if (e.button !== 0 && e.pointerType !== "touch") return;
      e.preventDefault();
      dragPointerId = e.pointerId;
      dragLastY = e.clientY;
      dragAccumulator = 0;
      button.classList.add("is-dragging");
      button.setPointerCapture(e.pointerId);
    });
    button.addEventListener("pointermove", (e) => {
      if (dragPointerId !== e.pointerId) return;
      e.preventDefault();
      const deltaY = e.clientY - dragLastY;
      dragLastY = e.clientY;
      dragAccumulator += deltaY;
      while (dragAccumulator >= dragStepPx) { spinTime(part, 1); dragAccumulator -= dragStepPx; }
      while (dragAccumulator <= -dragStepPx) { spinTime(part, -1); dragAccumulator += dragStepPx; }
    });
    button.addEventListener("pointerup", (e) => {
      if (dragPointerId !== e.pointerId) return;
      e.preventDefault();
      stopDrag();
    });
    button.addEventListener("pointercancel", stopDrag);
    button.addEventListener("lostpointercapture", stopDrag);
  }

  return { timeWheelState, timeMeridiem, setTimeFromString, syncTimeValue };
}
