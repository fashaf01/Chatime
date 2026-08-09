'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { formatLKR, type Drink } from '@/lib/menu';

type Props = {
  drinks: Drink[];
  onSelect: (drink: Drink) => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD = 5000;

/** Decorative background circles, fixed so SSR and client agree. */
const BLOBS = [
  { left: '4%', top: '12%', size: 120, colour: '#F0EAF4' },
  { left: '84%', top: '8%', size: 90, colour: '#FBE3D2' },
  { left: '12%', top: '68%', size: 64, colour: '#DCEBD2' },
  { left: '90%', top: '62%', size: 140, colour: '#F0EAF4' },
  { left: '48%', top: '4%', size: 46, colour: '#FCE3E6' },
];

/**
 * Coverflow carousel after the one on bingxueglobal: the active drink stands
 * large in the middle with its neighbours set back and dimmed either side.
 * Advances on a timer, pauses on hover and when the tab is hidden, and can be
 * dragged or swiped. Under prefers-reduced-motion it stops advancing on its own.
 */
export function SignatureCarousel({ drinks, onSelect }: Props) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = drinks.length;
  const go = useCallback((n: number) => setI((v) => (n + len) % len), [len]);

  useEffect(() => {
    if (paused || reduced || len < 2) return;
    const id = setTimeout(() => go(i + 1), HOLD);
    return () => clearTimeout(id);
  }, [i, paused, reduced, go, len]);

  useEffect(() => {
    const onVis = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  if (len === 0) return null;
  const active = drinks[i];

  /** -1, 0, 1 for the visible three; null for everything else. */
  function slot(n: number): -1 | 0 | 1 | null {
    const d = (n - i + len) % len;
    if (d === 0) return 0;
    if (d === 1) return 1;
    if (d === len - 1) return -1;
    return null;
  }

  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Signature drinks"
    >
      {/* Floating decorative circles */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {BLOBS.map((b, n) => (
          <motion.span
            key={n}
            className="absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              background: b.colour,
            }}
            animate={reduced ? undefined : { y: [0, -16, 0], x: [0, 8, 0] }}
            transition={{ duration: 9 + n * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="container-page relative">
        <div className="text-center">
          <p className="eyebrow">Most ordered</p>
          <h2 className="display-lg mt-3 text-purple-900">Signature cups</h2>
        </div>

        {/* Stage */}
        <div className="relative mt-10 h-[300px] select-none sm:mt-12 sm:h-[400px]">
          {drinks.map((d, n) => {
            const s = slot(n);
            if (s === null) return null;
            const isActive = s === 0;
            return (
              <motion.div
                key={d.slug}
                className="absolute left-1/2 top-0 h-full"
                style={{ width: 'min(62vw, 300px)', marginLeft: 'calc(min(62vw, 300px) / -2)' }}
                animate={{
                  x: s * (typeof window !== 'undefined' && window.innerWidth < 640 ? 150 : 250),
                  scale: isActive ? 1 : 0.62,
                  opacity: isActive ? 1 : 0.45,
                  filter: isActive ? 'blur(0px)' : 'blur(1.5px)',
                  zIndex: isActive ? 10 : 1,
                }}
                transition={{ duration: 0.7, ease: EASE }}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(i + 1);
                  else if (info.offset.x > 60) go(i - 1);
                }}
              >
                <button
                  type="button"
                  onClick={() => (isActive ? onSelect(d) : go(n))}
                  aria-label={isActive ? `Build ${d.name}` : `Show ${d.name}`}
                  aria-hidden={!isActive}
                  tabIndex={isActive ? 0 : -1}
                  className="relative h-full w-full cursor-pointer"
                >
                  {/* Soft halo behind the active cup */}
                  {isActive && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-[8%] rounded-full blur-[46px]"
                      style={{ background: d.colour[0] }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.75 }}
                      transition={{ duration: 0.8 }}
                    />
                  )}
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(max-width: 640px) 62vw, 300px"
                    className="pointer-events-none object-contain drop-shadow-[0_22px_28px_rgba(80,7,120,0.24)]"
                    draggable={false}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Name, price, CTA */}
        <div className="relative mt-6 text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <h3 className="font-display text-xl font-extrabold tracking-tight text-purple-900 sm:text-2xl">
                {active.name}
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink/70">
                {active.description}
              </p>
              <div className="mt-4 flex items-center justify-center gap-3">
                <button type="button" onClick={() => onSelect(active)} className="btn-primary">
                  Build this cup
                </button>
                <span className="font-display text-xl font-extrabold text-purple-800">
                  {formatLKR(active.prices.regular)}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Circular controls */}
        <div className="relative mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => go(i - 1)}
            aria-label="Previous drink"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-purple-800 text-purple-800 transition hover:bg-purple-800 hover:text-white"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-1.5">
            {drinks.map((d, n) => (
              <button
                key={d.slug}
                type="button"
                onClick={() => go(n)}
                aria-label={`Show ${d.name}`}
                aria-current={n === i}
                className="h-2 overflow-hidden rounded-full bg-purple-200 transition-all"
                style={{ width: n === i ? 28 : 8 }}
              >
                {n === i && (
                  <motion.span
                    key={`p-${i}-${paused}`}
                    className="block h-full rounded-full bg-purple-800"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: paused || reduced ? 0.3 : HOLD / 1000,
                      ease: 'linear',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(i + 1)}
            aria-label="Next drink"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-purple-800 text-purple-800 transition hover:bg-purple-800 hover:text-white"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
