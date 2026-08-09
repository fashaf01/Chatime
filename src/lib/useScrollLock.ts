'use client';

import { useEffect } from 'react';

/**
 * Locks the page behind an open drawer.
 *
 * `overflow: hidden` on <body> does not hold on iOS Safari — the page keeps
 * scrolling under your finger while the drawer's own list refuses to move,
 * which is exactly the "background scrolls, front doesn't" bug. Pinning the
 * body with `position: fixed` at its current offset is the technique that
 * actually works there; the scroll position is restored on unlock so closing a
 * drawer doesn't jump you back to the top.
 */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const y = window.scrollY;
    const body = document.body;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = 'fixed';
    body.style.top = `-${y}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;
      // `auto` so restoring never animates back down the page.
      window.scrollTo({ top: y, behavior: 'auto' });
    };
  }, [active]);
}
