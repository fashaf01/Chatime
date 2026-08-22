'use client';

import { useEffect, useState } from 'react';

/**
 * Matches a media query, kept in sync as the viewport changes.
 *
 * Starts `false` on the server and on the very first client render, then
 * corrects on mount — matching during render would hand React different markup
 * on the two passes and trip a hydration mismatch. Only use this for behaviour
 * that is invisible on the first frame (a closed drawer's slide direction, for
 * instance); anything that must be *painted* correctly before hydration belongs
 * in a CSS media query instead.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Tailwind's `sm` breakpoint — where both drawers stop being bottom sheets. */
export const SM_UP = '(min-width: 640px)';
