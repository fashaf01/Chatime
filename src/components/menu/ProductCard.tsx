'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ProductImage } from '@/components/motion/Skeleton';
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
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-4%' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        type="button"
        onClick={() => onSelect(drink)}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 400, damping: 26 }}
        aria-label={`${drink.name}, from ${formatLKR(drink.prices.regular)}. Customise and add to order.`}
        className="group flex w-full flex-col rounded-[22px] p-2 text-center transition-colors duration-500
                   hover:bg-[#FBF3E6] focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-purple-800 sm:rounded-[26px] sm:p-3"
      >
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

          {/* Sheen that sweeps across on hover/press */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-10 -translate-x-full opacity-0
                       transition-all duration-700 ease-out group-hover:translate-x-full group-hover:opacity-100"
            style={{
              background:
                'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.35) 50%, transparent 65%)',
            }}
          />

          {/*
           * The photos are squares; the panel is 3:4 portrait. object-contain
           * fits a square to the panel's *width*, which leaves a band of empty
           * gradient above and below. Sizing the image box as a square off the
           * panel's height instead — centred, with the excess width clipped —
           * fills it top to bottom with the cup dead centre.
           */}
          <div className="absolute inset-y-0 left-1/2 aspect-square -translate-x-1/2">
            <div
              className={reduced ? 'relative h-full w-full' : 'animate-float-soft relative h-full w-full'}
              style={{ animationDelay: `${(index % 6) * 0.45}s` }}
            >
              <ProductImage
                src={drink.image}
                alt={drink.name}
                fill
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 38vw, 300px"
                priority={priority}
                skeletonTone="dark"
                skeletonRounded="rounded-[18px]"
                className="object-contain object-center drop-shadow-[0_12px_16px_rgba(0,0,0,0.2)]
                           transition-transform duration-500 group-hover:scale-[1.06]"
              />
            </div>
          </div>
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
      </motion.button>
    </motion.div>
  );
}
