'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { formatLKR, type Drink } from '@/lib/menu';

type Props = {
  drink: Drink;
  onSelect: (drink: Drink) => void;
  index?: number;
  priority?: boolean;
};

const BADGE = {
  new: 'bg-cyan text-purple-900',
  bestseller: 'bg-leaf text-purple-900',
  hot: 'bg-tangerine text-white',
} as const;

/**
 * Gong Cha's product row is the reference here: a tall rounded gradient panel
 * per drink with the cup standing in it, name underneath, and the whole tile
 * warming to cream on hover. The gradient is built from the drink's own two
 * colours so the grid is genuinely colourful without touching the photography.
 */
export function ProductCard({ drink, onSelect, index = 0, priority = false }: Props) {
  const reduced = useReducedMotion();

  const badge = drink.isNew
    ? { label: 'New', tone: BADGE.new }
    : drink.bestseller
      ? { label: 'Bestseller', tone: BADGE.bestseller }
      : drink.servedHot
        ? { label: 'Hot', tone: BADGE.hot }
        : null;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.65, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        type="button"
        onClick={() => onSelect(drink)}
        aria-label={`${drink.name}, from ${formatLKR(drink.prices.regular)}. Customise and add to order.`}
        className="group flex w-full flex-col rounded-[22px] p-2 text-center transition-colors duration-500
                   hover:bg-[#FBF3E6] focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-purple-800 sm:rounded-[26px] sm:p-3"
      >
        {/* Gradient panel with the cup standing in it */}
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px] sm:rounded-[22px]"
          style={{
            background: `linear-gradient(180deg, ${drink.colour[1]} 0%, ${drink.colour[0]} 100%)`,
          }}
        >
          {badge && (
            <span
              className={`absolute left-2.5 top-2.5 z-10 rounded-full px-2 py-0.5 text-[9px]
                          font-extrabold uppercase tracking-[0.12em] sm:left-3 sm:top-3 sm:text-[10px] ${badge.tone}`}
            >
              {badge.label}
            </span>
          )}

          <motion.div
            className="absolute inset-x-[10%] bottom-[-4%] top-[6%]"
            whileHover={reduced ? undefined : { y: -12, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          >
            <Image
              src={drink.image}
              alt={drink.name}
              fill
              sizes="(max-width: 640px) 44vw, (max-width: 1024px) 30vw, 240px"
              priority={priority}
              className="object-contain object-bottom drop-shadow-[0_14px_18px_rgba(0,0,0,0.22)]"
            />
          </motion.div>
        </div>

        <h3
          className="mt-3 font-display text-[13px] font-extrabold leading-snug tracking-tight
                     text-purple-900 transition-colors duration-300 group-hover:text-magenta sm:text-[15px]"
        >
          {drink.name}
        </h3>

        <div className="mt-1.5 flex items-center justify-center gap-2">
          <span className="font-display text-sm font-extrabold text-purple-800 sm:text-base">
            {formatLKR(drink.prices.regular)}
          </span>
          <span
            className="grid h-6 w-6 place-items-center rounded-full bg-purple-800 text-sm font-bold
                       leading-none text-white transition-transform duration-300 group-hover:scale-110"
            aria-hidden
          >
            +
          </span>
        </div>
      </button>
    </motion.div>
  );
}
