'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { formatLKR, type Drink } from '@/lib/menu';

type Props = {
  drinks: Drink[];
  onSelect: (drink: Drink) => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 5200;

/**
 * Auto-advancing hero carousel. The photo, the copy and the background wash all
 * cross-fade together, and the progress bar reflects the real timer so the
 * advance never feels arbitrary. Pauses on hover and whenever the tab is
 * backgrounded, and stops entirely under prefers-reduced-motion.
 */
export function SignatureCarousel({ drinks, onSelect }: Props) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === drinks.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + drinks.length) % drinks.length);
    },
    [index, drinks.length],
  );

  useEffect(() => {
    if (paused || reduced || drinks.length < 2) return;
    const id = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(id);
  }, [index, paused, reduced, go, drinks.length]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (drinks.length === 0) return null;
  const drink = drinks[index];

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Signature drinks"
    >
      {/* Wash keyed to the drink on screen */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${drink.slug}`}
          aria-hidden
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          style={{
            background: `radial-gradient(120% 90% at 70% 40%, ${drink.colour[0]} 0%, #FFFFFF 70%)`,
          }}
        />
      </AnimatePresence>

      <div className="container-page relative">
        <p className="eyebrow">Most ordered</p>

        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={drink.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: EASE }}
              >
                <h2 className="display-lg max-w-lg text-purple-900">{drink.name}</h2>
                <p className="body-lg mt-4 max-w-md">{drink.description}</p>
                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <button type="button" onClick={() => onSelect(drink)} className="btn-primary">
                    Build this cup
                  </button>
                  <span className="font-display text-2xl font-extrabold text-purple-800">
                    {formatLKR(drink.prices.regular)}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-9 flex items-center gap-4">
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Previous drink"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-purple-800 text-purple-800 transition hover:bg-purple-800 hover:text-white"
              >
                <ArrowLeft size={17} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Next drink"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-purple-800 text-purple-800 transition hover:bg-purple-800 hover:text-white"
              >
                <ArrowRight size={17} />
              </button>

              <div className="flex flex-1 gap-1.5">
                {drinks.map((d, i) => (
                  <button
                    key={d.slug}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show ${d.name}`}
                    aria-current={i === index}
                    className="group relative h-1.5 flex-1 overflow-hidden rounded-full bg-purple-200"
                  >
                    {i === index && (
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full bg-purple-800"
                        initial={{ width: '0%' }}
                        animate={{ width: paused || reduced ? '100%' : '100%' }}
                        transition={{
                          duration: paused || reduced ? 0.3 : INTERVAL / 1000,
                          ease: 'linear',
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Photo — drag to advance on touch */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative h-[300px] w-[300px] sm:h-[380px] sm:w-[380px]">
              <AnimatePresence mode="popLayout" custom={dir}>
                <motion.div
                  key={drink.slug}
                  custom={dir}
                  className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  initial={{ opacity: 0, x: dir * 90, rotate: dir * 6, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, x: dir * -90, rotate: dir * -6, scale: 0.9 }}
                  transition={{ duration: 0.65, ease: EASE }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.18}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(index + 1);
                    else if (info.offset.x > 70) go(index - 1);
                  }}
                >
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    sizes="(max-width: 640px) 300px, 380px"
                    priority
                    className="select-none object-contain drop-shadow-[0_28px_36px_rgba(80,7,120,0.24)]"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
