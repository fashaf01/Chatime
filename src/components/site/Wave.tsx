/**
 * The soft curved edge chatime.com puts between every colour block. Straight
 * section boundaries are what made this page read as a template; a single
 * shallow curve is most of what makes theirs read as the brand.
 *
 * It is one path rather than a stack of blurred divs, so it costs a single
 * paint and scales to any width without banding. `flip` turns it upside down
 * for the top edge of a block; `colour` is whatever sits on the far side.
 */
export function Wave({
  colour,
  from,
  flip = false,
  className = '',
  height = 64,
}: {
  /** The colour the wave is filled with — i.e. the section below it. */
  colour: string;
  /**
   * The colour above the curve. Required whenever the wave sits between two
   * sections rather than inside one: the area above the path is transparent, so
   * without this it shows the body's white and leaves a sliver.
   */
  from?: string;
  flip?: boolean;
  className?: string;
  height?: number;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative w-full overflow-hidden leading-[0] ${className}`}
      style={{ height, background: from }}
    >
      {/*
       * One pixel taller than the box, with the overflow above clipping it back.
       *
       * The path already fills to the exact bottom of the viewBox, but these
       * dividers rarely land on a whole device pixel — measured bottoms here
       * include 1443.01 and 7108.66. At a fractional edge the browser
       * anti-aliases the last row, blending the fill with whatever sits behind
       * the wrapper, and on the purple sections that showed as a faint dark
       * hairline running the full width. Overshooting by a pixel means the fill
       * covers the whole box however it rounds.
       */}
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="w-full"
        style={{
          height: 'calc(100% + 1px)',
          transform: flip ? 'rotate(180deg)' : undefined,
        }}
      >
        <path
          d="M0,30 C240,64 420,64 720,40 C1020,16 1200,16 1440,44 L1440,64 L0,64 Z"
          fill={colour}
        />
      </svg>
    </div>
  );
}
