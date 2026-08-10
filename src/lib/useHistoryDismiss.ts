'use client';

import { useEffect, useRef } from 'react';

/**
 * Makes the phone's Back gesture close an open overlay instead of leaving the
 * site — the thing everyone tries first once a full-height sheet is covering
 * the page.
 *
 * One history entry stands for "some overlay is open", however many are stacked
 * and however they hand off to each other. That matters because adding a cup
 * closes the customiser and opens the cart in the same React commit: React runs
 * the closing effect's cleanup before the opening effect, so a naive
 * push-on-open / back-on-close pair would fire `back()` *after* the cart pushed
 * its entry and immediately dismiss the cart. Reconciling on a microtask lets
 * both mutations land first, so the handoff is a no-op on history.
 */
let open: Array<() => void> = [];
let pushed = false;
let scheduled = false;

function reconcile() {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    const wanted = open.length > 0;
    if (wanted === pushed) return;
    pushed = wanted;
    if (wanted) window.history.pushState(null, '', window.location.href);
    else window.history.back();
  });
}

function onPopState() {
  // Back already consumed our entry; don't try to pop it again.
  pushed = false;
  open[open.length - 1]?.();
  // Anything still open needs an entry of its own back.
  reconcile();
}

export function useHistoryDismiss(active: boolean, onDismiss: () => void) {
  // Held in a ref so an inline arrow from the caller can't restart the effect
  // and churn the history stack on every render.
  const latest = useRef(onDismiss);
  latest.current = onDismiss;

  useEffect(() => {
    if (!active) return;

    const dismiss = () => latest.current();
    open = [...open, dismiss];
    if (open.length === 1) window.addEventListener('popstate', onPopState);
    reconcile();

    return () => {
      open = open.filter((fn) => fn !== dismiss);
      if (open.length === 0) window.removeEventListener('popstate', onPopState);
      reconcile();
    };
  }, [active]);
}
