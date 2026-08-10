'use client';

import { useEffect } from 'react';

/**
 * Page scroll lock for open drawers, reference-counted across every caller.
 *
 * Why a shared counter rather than each drawer saving and restoring the body
 * itself: adding a drink closes the customiser and opens the cart in the same
 * tick, so for one moment two locks are live. When each one snapshots
 * `body.style` on mount and writes it back on unmount, the second lock captures
 * the *locked* state as its "previous" value — and restores the body to
 * `position: fixed; top: -NNNpx` after the last drawer closes. The page is then
 * pinned at an offset for good: it looks frozen, and every click lands on
 * whatever has shifted under the cursor, which is the "buttons stop working
 * everywhere" bug.
 *
 * With a counter there is exactly one owner of the body style. The first lock
 * captures the real scroll position, the last unlock restores it, and anything
 * in between is a no-op.
 */
let depth = 0;
let savedY = 0;

function applyLock() {
  savedY = window.scrollY;
  const body = document.body;
  body.style.position = 'fixed';
  body.style.top = `-${savedY}px`;
  body.style.left = '0';
  body.style.right = '0';
  body.style.width = '100%';
  // iOS Safari ignores `overflow: hidden` on the body, which is why the page
  // used to keep scrolling under an open drawer. Pinning it is what holds.
  body.style.overflow = 'hidden';
}

function releaseLock() {
  const body = document.body;
  body.style.position = '';
  body.style.top = '';
  body.style.left = '';
  body.style.right = '';
  body.style.width = '';
  body.style.overflow = '';
  window.scrollTo({ top: savedY, behavior: 'auto' });
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    depth += 1;
    if (depth === 1) applyLock();

    return () => {
      depth = Math.max(0, depth - 1);
      if (depth === 0) releaseLock();
    };
  }, [active]);
}

/**
 * Belt and braces: if a render ever throws while a drawer is open, the cleanup
 * never runs and the body stays pinned. This clears a stuck lock so the page
 * can never end up permanently unclickable.
 */
export function forceReleaseScrollLock() {
  depth = 0;
  releaseLock();
}
