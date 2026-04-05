/** Escape HTML metacharacters for safe use in innerHTML. */
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const wrapDay = (value, max) => ((value - 1 + max) % max) + 1;
export const pad2 = (value) => String(value).padStart(2, "0");
