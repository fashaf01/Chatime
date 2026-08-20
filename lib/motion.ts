"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Motion primitives shared across the page.
 *
 * Every hook here reads `prefers-reduced-motion` and degrades to a static
 * result rather than a slower animation, and every scroll effect is driven by
 * rAF-throttled reads so a page full of parallax layers still scrolls at 60fps.
 */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

/**
 * Translates an element as it crosses the viewport.
 *
 * `speed` is the fraction of the scroll distance the layer lags behind by:
 * 0.15 is a subtle background drift, 0.4 is a strong foreground pop.
 */
export function useParallax<T extends HTMLElement>(speed = 0.2) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let frame = 0;
    let visible = false;

    const apply = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Progress runs -1 (element below the fold) to 1 (fully above it).
      const progress =
        (rect.top + rect.height / 2 - window.innerHeight / 2) /
        (window.innerHeight / 2 + rect.height / 2);
      el.style.transform = `translate3d(0, ${(progress * speed * 100).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      if (!visible || frame) return;
      frame = requestAnimationFrame(apply);
    };

    // Only listen while the layer is actually on screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) apply();
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
      el.style.transform = "";
    };
  }, [speed, reduced]);

  return ref;
}

/**
 * Pointer-driven 3D tilt. Returns props to spread onto the card; the transform
 * itself is applied through CSS custom properties so the class can stay static.
 */
export function useTilt(maxDeg = 7) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      // Coarse pointers have no hover state to speak of, and tilting under a
      // thumb just fights the scroll.
      if (!el || reduced || e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.classList.add("is-tilting");
      el.style.setProperty("--tilt-y", `${(px * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--tilt-x", `${(-py * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--tilt-lift", "-8px");
    },
    [maxDeg, reduced]
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.remove("is-tilting");
    el.style.setProperty("--tilt-y", "0deg");
    el.style.setProperty("--tilt-x", "0deg");
    el.style.setProperty("--tilt-lift", "0px");
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}

/**
 * Counts a number up the first time it scrolls into view. Returns the live
 * value and the ref to attach to whatever should trigger it.
 */
export function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setValue(target);
      return;
    }

    let frame = 0;
    let start = 0;

    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      // Ease-out cubic: fast off the mark, settles onto the final figure.
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [target, duration, reduced]);

  return { ref, value };
}

/**
 * Advances an index on a timer, pausing while the tab is hidden or the pointer
 * is over the component. `key` restarts the timer after a manual selection.
 */
export function useAutoAdvance(
  length: number,
  interval: number,
  paused: boolean,
  key: number
) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reduced || length < 2) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % length),
      interval
    );
    return () => window.clearInterval(id);
  }, [length, interval, paused, reduced, key]);

  return [index, setIndex] as const;
}
