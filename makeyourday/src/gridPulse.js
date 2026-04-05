/**
 * Click-triggered ripple on the dot grid: red → orange along wave intensity.
 */

const CELL = 16;
const SPEED_PX_PER_MS = 0.068;
const BAND = 72;
const RIPPLE_LIFETIME_MS = 20000;
const MAX_RIPPLES = 6;

/** Orange → red (matches app accent + warm orange) */
const C_ORANGE = { r: 212, g: 168, b: 67 };
const C_RED = { r: 215, g: 25, b: 33 };

function smoothRing(dist, waveFront) {
  const d = Math.abs(dist - waveFront);
  if (d > BAND) return 0;
  const t = 1 - d / BAND;
  return t * t * (3 - 2 * t);
}

function mixColor(t) {
  const u = Math.min(1, Math.max(0, t));
  return {
    r: Math.round(C_ORANGE.r + (C_RED.r - C_ORANGE.r) * u),
    g: Math.round(C_ORANGE.g + (C_RED.g - C_ORANGE.g) * u),
    b: Math.round(C_ORANGE.b + (C_RED.b - C_ORANGE.b) * u),
  };
}

/**
 * @param {HTMLCanvasElement | null} canvasEl
 * @returns {() => void} teardown
 */
export function setupGridPulse(canvasEl) {
  if (!canvasEl || !(canvasEl instanceof HTMLCanvasElement)) return () => {};

  const ctx = canvasEl.getContext("2d", { alpha: true });
  if (!ctx) return () => {};

  const mqReduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  let cols = 0;
  let rows = 0;
  let cssW = 0;
  let cssH = 0;
  let rafId = 0;
  /** @type {{ cx: number, cy: number, t0: number }[]} */
  const ripples = [];

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cssW = window.innerWidth;
    cssH = window.innerHeight;
    canvasEl.width = Math.floor(cssW * dpr);
    canvasEl.height = Math.floor(cssH * dpr);
    canvasEl.style.width = `${cssW}px`;
    canvasEl.style.height = `${cssH}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    cols = Math.ceil(cssW / CELL);
    rows = Math.ceil(cssH / CELL);
  }

  function pruneRipples(now) {
    while (ripples.length > MAX_RIPPLES) ripples.shift();
    for (let i = ripples.length - 1; i >= 0; i -= 1) {
      const elapsed = now - ripples[i].t0;
      const wave = elapsed * SPEED_PX_PER_MS;
      const maxD = Math.hypot(cssW, cssH) + BAND * 2;
      if (elapsed > RIPPLE_LIFETIME_MS || wave > maxD) ripples.splice(i, 1);
    }
  }

  function frame(now) {
    rafId = 0;
    if (mqReduce.matches) return;

    ctx.clearRect(0, 0, cssW, cssH);
    pruneRipples(now);
    if (ripples.length === 0) return;

    const dotCore = 1.4;
    const dotGlow = 3.4;

    for (let iy = 0; iy < rows; iy += 1) {
      for (let ix = 0; ix < cols; ix += 1) {
        const px = ix * CELL + CELL / 2;
        const py = iy * CELL + CELL / 2;
        let sum = 0;

        for (const r of ripples) {
          const elapsed = now - r.t0;
          const waveFront = elapsed * SPEED_PX_PER_MS;
          const dist = Math.hypot(px - r.cx, py - r.cy);
          const ring = smoothRing(dist, waveFront);
          const fade = 1 - Math.min(1, elapsed / RIPPLE_LIFETIME_MS);
          const v = ring * fade;
          if (v > 0.001) sum += v * v;
        }

        if (sum < 1e-6) continue;

        const intensity = Math.min(1, Math.sqrt(sum) * 0.85);
        const t = intensity;
        const { r, g, b } = mixColor(t);
        const aGlow = intensity * 0.22;
        const aCore = intensity * 0.92;

        ctx.fillStyle = `rgba(${r},${g},${b},${aGlow})`;
        ctx.beginPath();
        ctx.arc(px, py, dotGlow, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r},${g},${b},${aCore})`;
        ctx.beginPath();
        ctx.arc(px, py, dotCore, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    if (ripples.length > 0) {
      rafId = requestAnimationFrame(frame);
    }
  }

  function scheduleFrame() {
    if (mqReduce.matches || rafId) return;
    rafId = requestAnimationFrame(frame);
  }

  function addRipple(clientX, clientY) {
    if (mqReduce.matches) return;
    const rect = canvasEl.getBoundingClientRect();
    const cx = clientX - rect.left;
    const cy = clientY - rect.top;
    if (cx < 0 || cy < 0 || cx > cssW || cy > cssH) return;
    ripples.push({ cx, cy, t0: typeof performance !== "undefined" ? performance.now() : Date.now() });
    scheduleFrame();
  }

  function onPointerDown(e) {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    addRipple(e.clientX, e.clientY);
  }

  function onResize() {
    resize();
    if (ripples.length > 0) scheduleFrame();
  }

  function onMotionChange() {
    if (mqReduce.matches) {
      cancelAnimationFrame(rafId);
      rafId = 0;
      ripples.length = 0;
      ctx.clearRect(0, 0, cssW, cssH);
    }
  }

  resize();
  canvasEl.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("resize", onResize);
  mqReduce.addEventListener("change", onMotionChange);

  return () => {
    cancelAnimationFrame(rafId);
    canvasEl.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("resize", onResize);
    mqReduce.removeEventListener("change", onMotionChange);
    ripples.length = 0;
  };
}
