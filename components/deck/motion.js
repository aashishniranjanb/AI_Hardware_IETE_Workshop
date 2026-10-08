"use client";
import gsap from 'gsap';

/*
 * Shared GSAP motion vocabulary.
 * These helpers never own React state: they animate the DOM/SVG elements a
 * scene passes in and return the tween/timeline so the scene's gsap.context
 * can revert it on cleanup.
 */

export const MOTION = {
  fast: 0.25,
  base: 0.45,
  slow: 0.7,
  ease: 'power3.out',
  easeInOut: 'power2.inOut',
  stagger: 0.06,
};

/*
 * Motion mode: the presenter can override the OS setting with the M key
 * (stored in localStorage as 'deck-motion' = 'full' | 'reduced').
 * Without an override, prefers-reduced-motion decides.
 */
export function getMotionOverride() {
  if (typeof document === 'undefined') return null;
  return document.documentElement.dataset.motion || null;
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  const override = getMotionOverride();
  if (override) return override === 'reduced';
  return !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
}

export function applyMotionMode(mode) {
  const root = document.documentElement;
  if (mode) root.dataset.motion = mode;
  else delete root.dataset.motion;
  try {
    if (mode) localStorage.setItem('deck-motion', mode);
    else localStorage.removeItem('deck-motion');
  } catch {}
}

export function restoreMotionMode() {
  try {
    const saved = localStorage.getItem('deck-motion');
    if (saved === 'full' || saved === 'reduced') document.documentElement.dataset.motion = saved;
  } catch {}
}

/** Toggle relative to what is currently in effect; returns the new mode. */
export function toggleMotionMode() {
  const next = prefersReducedMotion() ? 'full' : 'reduced';
  applyMotionMode(next);
  return next;
}

const rm = (full, reduced) => (prefersReducedMotion() ? reduced : full);

/** Default enter: fade up. */
export function fadeUp(targets, opts = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: rm(12, 0) },
    { opacity: 1, y: 0, duration: rm(MOTION.base, 0.15), ease: MOTION.ease, ...opts }
  );
}

/** Primary diagram enter: subtle scale-in. */
export function scaleIn(targets, opts = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, scale: rm(0.96, 1) },
    { opacity: 1, scale: 1, duration: rm(MOTION.slow, 0.15), ease: MOTION.ease, ...opts }
  );
}

/** Staggered reveal of a group (cards, tiers, nodes). */
export function staggerReveal(targets, opts = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, y: rm(14, 0) },
    { opacity: 1, y: 0, duration: rm(MOTION.base, 0.15), ease: MOTION.ease, stagger: rm(MOTION.stagger, 0), ...opts }
  );
}
export const reveal = staggerReveal;

/**
 * Stage transition contract: the stage root's direct children enter as a
 * primary diagram, with their own children staggered in afterwards.
 * Call inside the scene's gsap.context so cleanup reverts it.
 */
export function stageEnter(rootSelectorOrEl, { stagger = true } = {}) {
  const tl = gsap.timeline();
  const root = typeof rootSelectorOrEl === 'string' ? gsap.utils.toArray(rootSelectorOrEl) : [rootSelectorOrEl];
  const kids = root.flatMap((r) => (r ? Array.from(r.children) : []));
  if (!kids.length) return tl;
  tl.add(scaleIn(kids, { duration: rm(0.5, 0.15) }));
  if (stagger && !prefersReducedMotion()) {
    const inner = kids.flatMap((k) => Array.from(k.children)).slice(0, 24);
    if (inner.length > 1) {
      tl.fromTo(inner, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: MOTION.ease, stagger: 0.04, clearProps: 'transform' }, 0.08);
    }
    // Connections draw in after their nodes appear (data-flow language).
    const lines = root
      .flatMap((r) => (r ? Array.from(r.querySelectorAll('path, line, polyline')) : []))
      .filter((p) => {
        const cs = getComputedStyle(p);
        return cs.stroke !== 'none' && (cs.fill === 'none' || cs.fill === 'transparent' || p.tagName !== 'path')
          && (cs.strokeDasharray === 'none' || cs.strokeDasharray === '') && typeof p.getTotalLength === 'function';
      })
      .slice(0, 40);
    if (lines.length) {
      lines.forEach((p) => {
        let len = 0;
        try { len = p.getTotalLength(); } catch { len = 0; }
        if (len > 4) gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      tl.to(lines, { strokeDashoffset: 0, duration: 0.7, ease: MOTION.easeInOut, stagger: 0.03, clearProps: 'strokeDasharray,strokeDashoffset' }, 0.25);
    }
  }
  return tl;
}

export function stageExit(targets, opts = {}) {
  return gsap.to(targets, { opacity: 0, y: rm(-8, 0), duration: MOTION.fast, ease: 'power2.in', ...opts });
}

/** Draw an SVG path / line by its length. */
export function drawPath(paths, opts = {}) {
  const els = gsap.utils.toArray(paths);
  els.forEach((p) => {
    const len = typeof p.getTotalLength === 'function' ? p.getTotalLength() : 400;
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });
  return gsap.to(els, { strokeDashoffset: 0, duration: rm(0.9, 0.01), ease: MOTION.easeInOut, stagger: rm(0.08, 0), ...opts });
}

/** Node activation: glow rises then settles. */
export function pulse(targets, { color = 'rgba(39, 215, 255, 0.6)', ...opts } = {}) {
  if (prefersReducedMotion()) return gsap.set(targets, {});
  return gsap.fromTo(
    targets,
    { boxShadow: `0 0 0px ${color}` },
    { boxShadow: `0 0 26px ${color}`, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut', ...opts }
  );
}
export const nodeActivate = pulse;

/** Count a number up inside an element: from → to with formatting. */
export function countUp(el, to, { from = 0, decimals = 0, suffix = '', duration = 1, ...opts } = {}) {
  const obj = { v: from };
  const fmt = (v) => Number(v).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
  if (!el) return null;
  if (prefersReducedMotion()) {
    el.textContent = fmt(to);
    return null;
  }
  return gsap.to(obj, { v: to, duration, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(obj.v); }, ...opts });
}

/** Assemble: parts fly in from slight offsets into place. */
export function assemble(targets, opts = {}) {
  return gsap.fromTo(
    targets,
    { opacity: 0, x: () => rm(gsap.utils.random(-24, 24), 0), y: () => rm(gsap.utils.random(-18, 18), 0) },
    { opacity: 1, x: 0, y: 0, duration: rm(0.6, 0.15), ease: MOTION.ease, stagger: rm(0.05, 0), ...opts }
  );
}

/** Collapse / recede everything except the focus element. */
export function collapse(others, focus, opts = {}) {
  const tl = gsap.timeline(opts);
  tl.to(others, { opacity: 0.12, duration: rm(0.5, 0.15), ease: MOTION.easeInOut }, 0);
  if (focus) tl.to(focus, { scale: rm(1.12, 1), duration: rm(0.6, 0.15), ease: MOTION.easeInOut }, 0);
  return tl;
}

/** Zoom into an element (camera move toward its center). */
export function zoomInto(el, { scale = 1.6, ...opts } = {}) {
  return gsap.to(el, { scale: rm(scale, 1.05), duration: rm(0.6, 0.2), ease: 'power2.in', ...opts });
}

/** Completion: short accent burst on the final element. */
export function completionBurst(el, color = 'rgba(87, 230, 165, 0.7)') {
  return pulse(el, { color });
}

/* ---------------- Slide-level transitions (used by app/page.jsx) ------------- */

export function sceneExit(stageEl, onComplete) {
  if (!stageEl) return onComplete?.();
  return gsap.to(stageEl, {
    opacity: 0,
    scale: rm(0.985, 1),
    duration: rm(0.22, 0.08),
    ease: 'power2.in',
    onComplete,
  });
}

export function sceneEnter(stageEl, scanEl, { from = { scale: 1.015 }, duration = 0.42 } = {}) {
  if (!stageEl) return null;
  const tl = gsap.timeline();
  tl.fromTo(
    stageEl,
    { opacity: 0, scale: rm(from.scale ?? 1.015, 1) },
    { opacity: 1, scale: 1, duration: rm(duration, 0.12), ease: MOTION.ease, clearProps: 'transform,opacity' }
  );
  if (scanEl && !prefersReducedMotion()) {
    tl.fromTo(scanEl, { left: '0%', opacity: 0.9 }, { left: '100%', opacity: 0, duration: 0.5, ease: 'power1.inOut' }, 0);
  }
  return tl;
}
