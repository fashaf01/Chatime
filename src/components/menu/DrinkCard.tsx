'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef, useState } from 'react';
import { CupVisual } from './CupVisual';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { formatLKR, type Drink } from '@/lib/menu';

type Props = {
  drink: Drink;
  onSelect: (drink: Drink) => void;
  index?: number;
};

/** Card with a 3D tilt that follows the cursor and a cup that lifts on hover. */
export function DrinkCard({ drink, onSelect, index = 0 }: Props) {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 9, ry: px * 11 });
  }

  const badge = drink.isNew
    ? t.menu.isNew
    : drink.bestseller
      ? t.menu.bestseller
      : drink.servedHot
        ? t.menu.hot
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
        className="glass group relative flex w-full flex-col items-center overflow-hidden
                   rounded-3xl px-5 pb-6 pt-7 text-center transition-colors duration-500
                   hover:border-white/25 focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-4 focus-visible:outline-gold-400"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Colour wash bleeding up from the drink itself */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-0
                     transition-opacity duration-700 group-hover:opacity-30"
          style={{
            background: `radial-gradient(ellipse at 50% 100%, ${drink.colour[0]}, transparent 70%)`,
          }}
        />

        {badge && (
          <span
            className="absolute left-4 top-4 rounded-full border border-gold-400/40 bg-gold-400/10
                       px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300"
          >
            {badge}
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
          className="relative mt-5 font-display text-lg font-semibold leading-tight tracking-tight"
          style={{ transform: 'translateZ(28px)' }}
        >
          {drink.name}
        </h3>

        <p className="relative mt-2 line-clamp-2 text-[13px] leading-relaxed text-cream/50">
          {drink.description}
        </p>

        <div className="relative mt-4 flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-cream/40">
            {t.menu.from}
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-gold-400">
            {formatLKR(drink.prices.regular)}
          </span>
        </div>

        <span
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2
                     text-xs font-medium tracking-wide text-cream/70 transition-all duration-300
                     group-hover:border-gold-400 group-hover:bg-gold-400 group-hover:text-grape-950"
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
