"use client";
import { createContext, useContext, useEffect, useLayoutEffect, useRef } from 'react';

/*
 * Unified deck navigation.
 *
 * app/page.jsx owns the ONLY window keydown listener. The active scene
 * registers a stage controller through useStageNavigation(); the global
 * dispatcher asks that controller first and falls back to slide navigation
 * when the controller reports it is at a boundary.
 */

export const DeckNavContext = createContext(null);

// Slide-entry info for continuity bridges: { from, to, dir }.
export const DeckEntryContext = createContext({ from: -1, to: 0, dir: 1 });
export const useDeckEntry = () => useContext(DeckEntryContext);

/**
 * Let the active scene take over its own exit animation (e.g. a zoom into an
 * element). handler(dir, done) must call done() exactly once and return true;
 * return false to fall back to the default deck transition.
 */
export function useSceneExit(handler) {
  const registry = useContext(DeckNavContext);
  const ref = useRef(handler);
  useLayoutEffect(() => {
    ref.current = handler;
  });
  useEffect(() => {
    if (!registry?.registerExit) return;
    return registry.registerExit((dir, done) => (ref.current ? ref.current(dir, done) : false));
  }, [registry]);
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

/**
 * Register the current scene's stage navigation with the deck.
 *
 * stage / setStage : the scene's existing stage state
 * count            : number of stages
 * next / prev      : optional custom steppers (return true if consumed);
 *                    they receive the default stepper as a fallback
 * keys             : optional scene shortcuts, e.g. { e: fn, s: fn }
 */
export function useStageNavigation({ stage = 0, setStage, count = 1, next, prev, keys }) {
  const registry = useContext(DeckNavContext);

  // Synchronous mirror of the stage so rapid key presses never read stale state.
  const stageRef = useRef(stage);
  const optsRef = useRef(null);

  useLayoutEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useLayoutEffect(() => {
    optsRef.current = { setStage, count, next, prev, keys };
  });

  useEffect(() => {
    if (!registry) return;
    const goTo = (target) => {
      const { count: n, setStage: set } = optsRef.current;
      const clamped = clamp(target, 0, Math.max(n - 1, 0));
      if (!set || clamped === stageRef.current) return false;
      stageRef.current = clamped;
      set(clamped);
      return true;
    };
    const defaultNext = () => goTo(stageRef.current + 1);
    const defaultPrev = () => goTo(stageRef.current - 1);
    const controller = {
      next: () => (optsRef.current.next ? optsRef.current.next(defaultNext) : defaultNext()),
      prev: () => (optsRef.current.prev ? optsRef.current.prev(defaultPrev) : defaultPrev()),
      key: (k) => {
        const fn = optsRef.current.keys?.[k];
        if (!fn) return false;
        fn();
        return true;
      },
    };
    return registry.register(controller);
  }, [registry]);
}

export function useDeckNavigation({ index, slideCount, setIndex, onBlackout, onFullscreen, onMotionToggle }) {
  const controllerRef = useRef(null);
  // Transition lock: set when a slide change is requested, released after the
  // new slide has committed (parent effects run after the scene registered).
  const slideLockRef = useRef(false);
  useEffect(() => {
    slideLockRef.current = false;
  }, [index]);
  const exitRef = useRef(null);
  const registry = useRef({
    register(controller) {
      controllerRef.current = controller;
      return () => {
        if (controllerRef.current === controller) controllerRef.current = null;
      };
    },
    registerExit(fn) {
      exitRef.current = fn;
      return () => {
        if (exitRef.current === fn) exitRef.current = null;
      };
    },
  }).current;

  const handlersRef = useRef(null);
  useLayoutEffect(() => {
    handlersRef.current = { index, slideCount, setIndex, onBlackout, onFullscreen, onMotionToggle };
  });

  useEffect(() => {
    const nextSlide = () => {
      if (slideLockRef.current) return;
      const { index: i, setIndex: set, slideCount: n } = handlersRef.current;
      if (i >= n - 1) return;
      slideLockRef.current = true;
      set(i + 1);
    };
    const prevSlide = () => {
      if (slideLockRef.current) return;
      const { index: i, setIndex: set } = handlersRef.current;
      if (i <= 0) return;
      slideLockRef.current = true;
      set(i - 1);
    };

    const onKey = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      const key = e.key;
      const c = controllerRef.current;

      if (key === 'ArrowRight' || key === ' ' || key === 'PageDown') {
        e.preventDefault();
        if (slideLockRef.current) return;
        if (!(c && c.next())) nextSlide();
        return;
      }
      if (key === 'ArrowLeft' || key === 'PageUp') {
        e.preventDefault();
        if (slideLockRef.current) return;
        if (!(c && c.prev())) prevSlide();
        return;
      }

      const lower = key.length === 1 ? key.toLowerCase() : key;
      if (e.repeat) return;
      if (c && c.key(lower)) {
        e.preventDefault();
        return;
      }
      if (lower === 'b') handlersRef.current.onBlackout();
      else if (lower === 'f') handlersRef.current.onFullscreen();
      else if (lower === 'm') handlersRef.current.onMotionToggle?.();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return { registry, exitRef, nextSlide: () => handlersRef.current.setIndex((i) => Math.min(i + 1, slideCount - 1)), prevSlide: () => handlersRef.current.setIndex((i) => Math.max(i - 1, 0)) };
}
