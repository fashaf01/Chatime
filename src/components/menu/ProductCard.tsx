'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';
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
 * Product card. The photograph sits on a soft wash pulled from the drink's own
 * colour, so the grid reads as colourful without tinting the product shots
 * themselves — they are Chatime's official images and stay untouched.
 */
export function ProductCard({ drink, onSelect, index = 0, priority = false }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  function handleMove(e: React.MouseEvent) {
    if (reduced || !ref.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 7, ry: px * 9 });
  }

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
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
        className="group relative flex w-full flex-col overflow-hidden rounded-[26px] border
                   border-purple-100 bg-white text-left shadow-card transition-shadow duration-500
                   hover:shadow-lift focus-visible:outline focus-visible:outline-2
                   focus-visible:outline-offset-4 focus-visible:outline-purple-800"
        style={{ transformStyle: 'preserve-3d' }}
        aria-label={`${drink.name}, from ${formatLKR(drink.prices.regular)}. Customise and add to order.`}
      >
        {/* Colour wash behind the photo */}
        <div
          className="relative flex h-[230px] items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${drink.colour[0]} 0%, #FFFFFF 78%)`,
          }}
        >
          <span
            aria-hidden
            className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl transition-transform duration-700 group-hover:scale-125"
            style={{ background: drink.colour[1] }}
          />
          <motion.div
            className="relative h-[196px] w-[196px]"
            style={{ transform: 'translateZ(40px)' }}
            whileHover={reduced ? undefined : { y: -10, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 240, damping: 18 }}
          >
            <Image
              src={drink.image}
              alt={drink.name}
              fill
              sizes="(max-width: 640px) 45vw, 220px"
              priority={priority}
              className="object-contain drop-shadow-[0_18px_22px_rgba(80,7,120,0.18)]"
            />
          </motion.div>

          {badge && (
            <span
              className={`absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px]
                          font-extrabold uppercase tracking-[0.14em] ${badge.tone}`}
            >
              {badge.label}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-[17px] font-extrabold leading-tight tracking-tight text-purple-900">
            {drink.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-ink/70">
            {drink.description}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="font-display text-xl font-extrabold tracking-tight text-purple-800">
              {formatLKR(drink.prices.regular)}
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-purple-800 px-4 py-2
                         text-xs font-bold text-white transition-transform duration-300
                         group-hover:scale-[1.06]"
            >
              Add
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                +
              </span>
            </span>
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
