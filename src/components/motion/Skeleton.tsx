'use client';

import Image, { type ImageProps } from 'next/image';
import { useEffect, useRef, useState } from 'react';

/**
 * A shimmering placeholder block.
 *
 * The sweep is a single absolutely-positioned gradient translated across the
 * box, not an animated `background-position`. Background animation repaints the
 * whole element every frame; a transform on a child stays on the compositor,
 * which matters when two dozen of these sit in the menu grid at once.
 *
 * `tone` picks the pair of greys: `light` for placeholders on white or the
 * lilac tint, `dark` for the ones inside the purple bands, where a light grey
 * block would glare.
 */
export function Skeleton({
  className = '',
  rounded = 'rounded-2xl',
  tone = 'light',
}: {
  className?: string;
  rounded?: string;
  tone?: 'light' | 'dark';
}) {
  const base = tone === 'dark' ? 'bg-white/[0.13]' : 'bg-purple-100';
  const sweep =
    tone === 'dark'
      ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)'
      : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)';

  return (
    <span aria-hidden className={`block overflow-hidden ${base} ${rounded} ${className}`}>
      <span
        className="animate-shimmer absolute inset-0 -translate-x-full"
        style={{ background: sweep }}
      />
    </span>
  );
}

/**
 * A product photograph that holds a shimmering placeholder until the file has
 * actually decoded.
 *
 * Renders as a fragment — placeholder and image as siblings — rather than
 * wrapping them in a positioned span. The wrapper version looked tidier and was
 * broken: every caller here uses `fill`, so it passed its own `absolute
 * inset-0` down to the wrapper, and because Tailwind emits `.relative` after
 * `.absolute` the wrapper's own `relative` won. The wrapper collapsed to zero
 * height and Next warned about it on every image on the page. With no wrapper,
 * both siblings resolve against the caller's existing positioning context,
 * which is the one `fill` was already relying on.
 *
 * Two loading traps this also handles:
 *
 * 1. A cached image can finish before React attaches the handler, so `onLoad`
 *    never fires and the placeholder sits there for good. The ref check on
 *    mount reads `complete` and clears it.
 * 2. A broken file would otherwise shimmer forever, which looks like a hang.
 *    `onError` clears it too and lets the alt text stand.
 */
export function ProductImage({
  skeletonTone = 'light',
  skeletonRounded = 'rounded-2xl',
  skeletonClassName = 'absolute inset-0',
  className = '',
  ...props
}: ImageProps & {
  skeletonTone?: 'light' | 'dark';
  skeletonRounded?: string;
  skeletonClassName?: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && (
        <Skeleton tone={skeletonTone} rounded={skeletonRounded} className={skeletonClassName} />
      )}
      <Image
        {...props}
        ref={ref}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`${className} transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}
