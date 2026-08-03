'use client';

type Props = {
  items: string[];
  className?: string;
  reverse?: boolean;
};

/**
 * Infinite ticker. The list is rendered twice and translated -50%, so the
 * seam lands exactly where the second copy begins.
 */
export function Marquee({ items, className, reverse = false }: Props) {
  const doubled = [...items, ...items];

  return (
    <div className={`mask-fade-x overflow-hidden ${className ?? ''}`}>
      <div
        className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl font-medium tracking-tight text-ink/65 sm:text-3xl">
              {item}
            </span>
            <span aria-hidden className="text-purple-800/70">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
