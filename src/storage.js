import { STORAGE_KEY } from "./constants.js";

/**
 * Load event store from localStorage.
 * @returns {Record<string, Array>}
 */
export function loadEventStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    return parsed;
  } catch {
    return {};
  }
}

/**
 * Persist event store to localStorage.
 * @param {Record<string, Array>} store
 * @returns {boolean}
 */
export function persistEventStore(store) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch {
    return false;
  }
}

/**
 * Build a date key (YYYY-MM-DD) for the given month and day.
 * @param {number} monthIndex 0-based month
 * @param {number} day
 * @returns {string}
 */
export function buildDateKey(monthIndex, day) {
  const year = new Date().getFullYear();
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}
