'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { CupVisual } from './CupVisual';
import { copy as t } from '@/lib/copy';
import { formatLKR, type Drink } from '@/lib/menu';

type Props = {
  drink: Drink;
  onSelect: (drink: Drink) => void;
  index?: number;
};

/** Badge colours come from the brand's bright accent set, one per meaning. */
const BADGE = {
  new: 'bg-cyan text-purple-900',
  bestseller: 'bg-leaf text-purple-900',
  hot: 'bg-tangerine text-white',
} as const;

/** Card with a 3D tilt that follows the cursor and a cup that lifts on hover. */
export function DrinkCard({ drink, onSelect, index = 0 }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  }

  const badge = drink.isNew
    ? { label: t.menu.isNew, tone: BADGE.new }
    : drink.bestseller
      ? { label: t.menu.bestseller, tone: BADGE.bestseller }
      : drink.servedHot
        ? { label: t.menu.hot, tone: BADGE.hot }
        : null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
    >
      <motion.button
        ref={ref}
        type="button"
        onClick={() => onSelect(drink)}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="card group relative flex w-full flex-col items-center overflow-hidden px-5 pb-6 pt-7
                   text-center transition-shadow duration-500 hover:shadow-lift
                   focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                   focus-visible:outline-purple-800"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Lilac wash rising behind the cup on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t
                     from-purple-100 to-transparent opacity-0 transition-opacity duration-700
                     group-hover:opacity-100"
        />

        {badge && (
          <span
            className={`absolute left-4 top-4 z-10 rounded-full px-2.5 py-1 text-[10px]
                        font-extrabold uppercase tracking-[0.14em] ${badge.tone}`}
          >
            {badge.label}
          </span>
        )}

        <motion.div
          className="relative h-[190px] w-[125px]"
          style={{ transform: 'translateZ(45px)' }}
          whileHover={reduced ? undefined : { y: -10 }}
          transition={{ type: 'spring', stiffness: 240, damping: 18 }}
        >
          <CupVisual
            drink={drink}
            size="regular"
            sugar={100}
            ice={drink.servedHot ? 'none' : 'regular'}
            toppings={drink.defaultToppings ?? []}
            className="h-full w-full"
          />
        </motion.div>

        <h3
          className="relative mt-5 font-display text-lg font-extrabold leading-tight tracking-tight text-purple-900"
          style={{ transform: 'translateZ(28px)' }}
        >
          {drink.name}
        </h3>

        <p className="relative mt-2 line-clamp-2 text-[13px] leading-relaxed text-ink/70">
          {drink.description}
        </p>

        <div className="relative mt-4 flex items-baseline gap-2">
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/65">
            {t.menu.from}
          </span>
          <span className="font-display text-xl font-extrabold tracking-tight text-purple-800">
            {formatLKR(drink.prices.regular)}
          </span>
        </div>

        <span
          className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border-2 border-purple-800
                     px-4 py-2 text-xs font-bold tracking-wide text-purple-800 transition-all duration-300
                     group-hover:bg-purple-800 group-hover:text-white"
        >
          {t.build.customise}
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </motion.button>
    </motion.div>
  );
}
