"use client";
/*
 * Visual hand-off between slides (continuity bridges).
 * The outgoing scene records the on-screen rectangle of its focal element
 * (frame-relative, so it survives the remount); the incoming scene reads it
 * once and animates its own element FROM that rectangle (FLIP).
 */
let pending = null;

export function frameRect(el) {
  const frame = document.querySelector('.presentation-viewport');
  if (!el || !frame) return null;
  const f = frame.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return { cx: r.left + r.width / 2 - f.left, cy: r.top + r.height / 2 - f.top, w: r.width, h: r.height };
}

export function setHandoff(key, el) {
  const rect = frameRect(el);
  pending = rect ? { key, rect, at: Date.now() } : null;
}

/**
 * Read a hand-off. Non-destructive so React StrictMode's double-invoked
 * effects both see it; it expires after 3s and is replaced by the next one.
 */
export function takeHandoff(key) {
  const h = pending;
  if (!h || h.key !== key || Date.now() - h.at > 3000) return null;
  return h.rect;
}

/**
 * FLIP transform that places `el` (at its natural layout) over `rect`.
 * Returns { x, y, scale } for gsap.fromTo(el, from, { x:0, y:0, scale:1 }).
 */
export function flipFrom(el, rect) {
  const now = frameRect(el);
  if (!now || !rect || !now.w) return null;
  return {
    x: rect.cx - now.cx,
    y: rect.cy - now.cy,
    scale: rect.w / now.w,
  };
}
