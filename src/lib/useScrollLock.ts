'use client';

import { useEffect } from 'react';

/**
 * Page scroll lock for open drawers, reference-counted across every caller.
 *
 * Reference counting, because adding a drink closes the customiser and opens
 * the cart in the same tick. If each drawer snapshotted `body.style` on mount
 * and wrote it back on unmount, the second lock would capture the *locked* body
 * as its "previous" state and restore the page to `position: fixed` with a
 * stale offset after the last drawer closed — pinning the page for good and
 * making every click land on whatever had shifted underneath. One counter, one
 * owner of the body style.
 *
 * `overflow: hidden` on <html> rather than pinning the body with
 * `position: fixed`. Pinning works, but it takes the body out of flow: the
 * document collapses from its real height to one viewport (measured: 13,266px
 * to 450px), every `content-visibility` section below loses its resolved size,
 * and the restored scroll position lands somewhere else entirely — which is the
 * "background jumps to the top" bug. Clipping the scroll container instead
 * leaves the document exactly as it is, so there is no position to save and
 * nothing to restore.
 *
 * iOS needs the belt and braces: `overflow: hidden` on <html> alone still lets
 * the page rubber-band, so the dimmer carries `touch-action: none` and each
 * drawer's scroller carries `overscroll-contain` to stop the gesture chaining
 * out to the page.
 */
let depth = 0;

function applyLock() {
  const root = document.documentElement;
  // Compensate for the scrollbar so the page does not shift sideways on
  // desktop when the scrollbar disappears.
  const gutter = window.innerWidth - root.clientWidth;
  root.style.overflow = 'hidden';
  if (gutter > 0) root.style.paddingRight = `${gutter}px`;
}

function releaseLock() {
  const root = document.documentElement;
  root.style.overflow = '';
  root.style.paddingRight = '';
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
 * If a render ever throws while a drawer is open its cleanup never runs and the
 * page stays locked. This clears a stuck lock outright.
 */
export function forceReleaseScrollLock() {
  depth = 0;
  releaseLock();
}
