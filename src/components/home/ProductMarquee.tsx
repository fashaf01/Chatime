'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { drinks, type Drink } from '@/lib/menu';

/**
 * Two rows of real product photography sliding in opposite directions. Each row
 * is rendered twice and translated -50%, so the loop seam lands exactly where
 * the second copy starts and never visibly jumps.
 */
export function ProductMarquee({ onSelect }: { onSelect: (d: Drink) => void }) {
  const reduced = useReducedMotion();

  const rowA = drinks.slice(0, 13);
  const rowB = drinks.slice(13);

  return (
    <section className="relative overflow-hidden bg-purple-800 py-10 sm:py-14">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/25 blur-[120px]" />
      </div>

      <div className="container-page relative mb-6 text-center">
        <p className="eyebrow-on-purple">Twenty-six ways to make it yours</p>
        <h2 className="display-md mt-2 text-white">Pick one. Then change everything.</h2>
      </div>

      <Row items={rowA} reduced={reduced} onSelect={onSelect} duration={46} />
      <Row items={rowB} reduced={reduced} onSelect={onSelect} duration={38} reverse />
    </section>
  );
}

function Row({
  items,
  reduced,
  onSelect,
  duration,
  reverse = false,
}: {
  items: Drink[];
  reduced: boolean | null;
  onSelect: (d: Drink) => void;
  duration: number;
  reverse?: boolean;
}) {
  if (items.length === 0) return null;
  const doubled = [...items, ...items];

  return (
    <div className="mask-fade-x overflow-hidden py-2">
      <motion.div
        className="flex w-max gap-3 sm:gap-4"
        animate={reduced ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((d, i) => (
          <button
            key={`${d.slug}-${i}`}
            type="button"
            onClick={() => onSelect(d)}
            aria-label={`Build ${d.name}`}
            tabIndex={i < items.length ? 0 : -1}
            aria-hidden={i >= items.length}
            className="group relative h-[104px] w-[86px] shrink-0 overflow-hidden rounded-2xl
                       transition-transform duration-300 hover:scale-105 sm:h-[132px] sm:w-[110px]"
            style={{
              background: `linear-gradient(180deg, ${d.colour[1]} 0%, ${d.colour[0]} 100%)`,
            }}
          >
            <Image
              src={d.image}
              alt=""
              fill
              sizes="110px"
              className="object-contain object-bottom p-1.5 drop-shadow-[0_8px_10px_rgba(0,0,0,0.2)]"
            />
          </button>
        ))}
      </motion.div>
    </div>
  );
}
