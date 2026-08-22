'use client';

import { useReducedMotion } from 'framer-motion';
import { useId } from 'react';

/** Radius of the text ring inside the 100-unit viewBox. */
const R = 40;
const RING_LENGTH = 2 * Math.PI * R; // ≈ 251.3

/**
 * Rough advance width of one character as a multiple of the font size, for this
 * weight plus the tracking below. Only used to pick how many times the label
 * repeats — `textLength` does the exact fitting, so being a little out here
 * costs a touch of letter-spacing, never an overlap.
 */
const CHAR_ADVANCE = 0.7;

/**
 * The rotating seal chatime.com straddles across its hero wave: a flat disc
 * with the label set around the rim, turning slowly, a cup drawn in the middle.
 *
 * The text is pinned to the ring with `textLength`, so it wraps the circle
 * exactly once no matter what label it is given. Letting it run at its natural
 * width is what produced the first version's bug — "Brewed fresh in Colombo"
 * twice over measured 295 units against a 251-unit ring, so the tail lapped the
 * head and the two collided into nonsense.
 *
 * Only the text ring rotates; the disc and the cup stay put, which is what makes
 * it read as a stamp rather than a spinner. Being transform-only it stays on the
 * compositor and costs the main thread nothing as the page scrolls past.
 */
export function RotatingBadge({
  label = 'Brewed fresh in Colombo',
  size = 132,
  className = '',
  colour = '#19BECF',
  textColour = '#FFFFFF',
  fontSize = 8,
}: {
  label?: string;
  size?: number;
  className?: string;
  colour?: string;
  textColour?: string;
  fontSize?: number;
}) {
  const reduced = useReducedMotion();
  // useId keeps the <path> reference unique when two badges share a page.
  const ringId = `badge-ring-${useId().replace(/:/g, '')}`;

  const unit = `${label.toUpperCase()}  ·  `;
  // How many whole passes come closest to filling the ring.
  const repeats = Math.max(
    1,
    Math.round(RING_LENGTH / (unit.length * fontSize * CHAR_ADVANCE)),
  );
  const text = unit.repeat(repeats).trimEnd();

  return (
    /*
     * No `relative` here on purpose. Tailwind emits `.relative` after
     * `.absolute`, so a base `relative` silently wins over an `absolute` passed
     * in by the caller and the badge drops back into the flow. Callers that
     * need a positioning context pass one in.
     */
    <div
      className={`pointer-events-none grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute inset-0 rounded-full" style={{ background: colour }} />

      <svg
        viewBox="0 0 100 100"
        className={`absolute inset-0 h-full w-full ${reduced ? '' : 'animate-swirl'}`}
      >
        <defs>
          {/* Two arcs so the text follows the rim the whole way round. */}
          <path id={ringId} d={`M 50,50 m -${R},0 a ${R},${R} 0 1,1 ${R * 2},0 a ${R},${R} 0 1,1 -${R * 2},0`} fill="none" />
        </defs>
        <text fill={textColour} style={{ fontSize, fontWeight: 800 }}>
          <textPath
            href={`#${ringId}`}
            startOffset="0"
            textLength={RING_LENGTH}
            lengthAdjust="spacing"
          >
            {text}
          </textPath>
        </text>
      </svg>

      {/* Boba cup: tapered tumbler, domed lid, straw, three pearls. */}
      <svg
        viewBox="0 0 40 40"
        className="relative"
        style={{ width: size * 0.34, height: size * 0.34 }}
        fill="none"
        stroke={textColour}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Cup wall, narrower at the base */}
        <path d="M12.4 15h15.2l-1.7 18.4a2.6 2.6 0 0 1-2.6 2.4h-6.6a2.6 2.6 0 0 1-2.6-2.4L12.4 15Z" />
        {/* Domed lid sitting proud of the rim */}
        <path d="M11 15c0-2.8 4-5 9-5s9 2.2 9 5" />
        <path d="M10.6 15h18.8" />
        {/* Straw */}
        <path d="M23.4 10.4 25.8 4" />
        {/* Pearls */}
        <circle cx="17.4" cy="29.6" r="1.7" fill={textColour} stroke="none" />
        <circle cx="22.6" cy="30.6" r="1.7" fill={textColour} stroke="none" />
        <circle cx="20" cy="25.6" r="1.7" fill={textColour} stroke="none" />
      </svg>
    </div>
  );
}
