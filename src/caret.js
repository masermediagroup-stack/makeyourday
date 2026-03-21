/**
 * Set up custom caret positioning for form fields.
 * @param {HTMLFormElement} formNode
 */
export function setupCaret(formNode) {
  const customCaret = document.createElement("span");
  customCaret.className = "custom-caret";
  document.body.append(customCaret);

  const caretMirror = document.createElement("span");
  caretMirror.style.cssText = "position:fixed;top:-9999px;left:-9999px;white-space:pre;visibility:hidden;pointer-events:none;";
  document.body.append(caretMirror);

  function syncMirrorStyle(field) {
    const cs = window.getComputedStyle(field);
    caretMirror.style.font = cs.font;
    caretMirror.style.letterSpacing = cs.letterSpacing;
    caretMirror.style.textTransform = cs.textTransform;
    caretMirror.style.padding = "0";
    if (field.tagName === "TEXTAREA") {
      caretMirror.style.whiteSpace = "pre-wrap";
      caretMirror.style.wordBreak = "break-word";
      caretMirror.style.width = cs.width;
    } else {
      caretMirror.style.whiteSpace = "pre";
      caretMirror.style.width = "auto";
    }
  }

  function getCaretCoords(field) {
    const pos = field.selectionStart ?? 0;
    syncMirrorStyle(field);
    if (field.tagName === "TEXTAREA") {
      const before = field.value.substring(0, pos);
      caretMirror.textContent = before;
      const probe = document.createElement("span");
      probe.textContent = "\u200b";
      caretMirror.append(probe);
      const rect = probe.getBoundingClientRect();
      probe.remove();
      const fieldRect = field.getBoundingClientRect();
      return {
        x: fieldRect.left + (rect.left - caretMirror.getBoundingClientRect().left),
        y: fieldRect.top + (rect.top - caretMirror.getBoundingClientRect().top) + rect.height * 0.5,
      };
    }
    const before = field.value.substring(0, pos);
    caretMirror.textContent = before || "\u200b";
    const mirrorRect = caretMirror.getBoundingClientRect();
    const fieldRect = field.getBoundingClientRect();
    const cs = window.getComputedStyle(field);
    const padLeft = parseFloat(cs.paddingLeft) || 0;
    return {
      x: fieldRect.left + padLeft + (before ? mirrorRect.width : 0) - field.scrollLeft,
      y: fieldRect.top + fieldRect.height * 0.5,
    };
  }

  function updateCaretPosition(field) {
    const coords = getCaretCoords(field);
    customCaret.style.left = `${coords.x + 6}px`;
    customCaret.style.top = `${coords.y}px`;
  }

  let caretRafId = null;
  function scheduleCaretUpdate(field) {
    if (caretRafId) cancelAnimationFrame(caretRafId);
    caretRafId = requestAnimationFrame(() => {
      caretRafId = null;
      updateCaretPosition(field);
    });
  }

  const caretFields = formNode.querySelectorAll('input:not([type="hidden"]), textarea');
  for (const field of caretFields) {
    field.addEventListener("focus", () => { customCaret.classList.add("is-visible"); scheduleCaretUpdate(field); });
    field.addEventListener("blur", () => customCaret.classList.remove("is-visible"));
    field.addEventListener("input", () => scheduleCaretUpdate(field));
    field.addEventListener("click", () => scheduleCaretUpdate(field));
    field.addEventListener("keyup", () => scheduleCaretUpdate(field));
    field.addEventListener("keydown", () => scheduleCaretUpdate(field));
  }

  document.addEventListener("selectionchange", () => {
    const active = document.activeElement;
    if (active?.closest?.("[data-event-form]")) scheduleCaretUpdate(active);
  });
}
