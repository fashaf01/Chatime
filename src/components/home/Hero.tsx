'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RevealWords } from '@/components/motion/Reveal';
import { openState, outlets } from '@/lib/outlets';
import { drinks, formatLKR, type Drink } from '@/lib/menu';

const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD = 4200;

/** Deterministic so the server and client render the same pearls. */
const PEARLS = [
  { left: '6%', size: 10, delay: 0, dur: 12 },
  { left: '15%', size: 16, delay: 3.2, dur: 15 },
  { left: '26%', size: 7, delay: 6.1, dur: 11 },
  { left: '38%', size: 13, delay: 1.4, dur: 13.5 },
  { left: '52%', size: 9, delay: 4.8, dur: 12.5 },
  { left: '64%', size: 18, delay: 2.1, dur: 16 },
  { left: '75%', size: 11, delay: 7.3, dur: 12 },
  { left: '86%', size: 8, delay: 5.2, dur: 14 },
  { left: '94%', size: 14, delay: 0.9, dur: 13 },
];

/**
 * Mobile-first hero. The drink is the hero on every screen — the previous
 * version hid it below `lg`, which left phones looking at a wall of purple.
 * It cycles through the bestsellers; the glow behind the cup and the blobs
 * take their colour from whichever drink is on screen.
 */
export function Hero({ onOrder }: { onOrder?: () => void }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);

  const rotation = drinks.filter((d) => d.bestseller).slice(0, 4);
  const drink: Drink = rotation[i] ?? drinks[0];

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const artY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -45]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const next = useCallback(() => setI((v) => (v + 1) % rotation.length), [rotation.length]);

  useEffect(() => {
    if (reduced || rotation.length < 2) return;
    const id = setTimeout(next, HOLD);
    return () => clearTimeout(id);
  }, [i, next, reduced, rotation.length]);

  const outlet = outlets[0];
  const state = openState(outlet);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-purple-800 pt-[78px]"
    >
      {/* Colour field — recoloured by the drink on screen */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(90% 60% at 50% 42%, ${drink.colour[1]}55 0%, transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute -left-[22%] top-[4%] h-[62vw] w-[62vw] rounded-full bg-purple-600/55 blur-[110px]"
          animate={reduced ? undefined : { x: [0, 30, 0], y: [0, -24, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-[18%] bottom-[2%] h-[56vw] w-[56vw] rounded-full bg-magenta/35 blur-[120px]"
          animate={reduced ? undefined : { x: [0, -26, 0], y: [0, 20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 animate-swirl bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(178,150,200,0.16),transparent_45%)]" />
      </div>

      {/* Rising pearls */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {PEARLS.map((p, n) => (
          <span
            key={n}
            className="absolute bottom-0 animate-rise rounded-full bg-white/25"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative flex flex-1 flex-col justify-center py-4 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10 lg:py-0">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <motion.div style={{ y: textY, opacity: fade }} className="order-2 lg:order-1">
          {/* Live open/closed pill */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          >
            <span className="relative flex h-1.5 w-1.5">
              {state.isOpen && !reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-75" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  state.isOpen ? 'bg-leaf' : 'bg-white/60'
                }`}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
              {state.isOpen ? 'Open now' : 'Closed'} · Havelock City Mall
            </span>
          </motion.div>

          <h1 className="display-xl mt-3 text-white">
            <RevealWords text="Cups of" delay={0.35} immediate />{' '}
            <span className="relative inline-block">
              <RevealWords text="Joy" delay={0.5} immediate />
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-leaf sm:h-[8px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 1, ease: EASE }}
              />
            </span>
          </h1>

          <motion.p
            className="mt-4 max-w-md text-balance text-[14.5px] leading-[1.55] text-white/80 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
          >
            Taiwan’s original bubble tea, brewed fresh in Colombo. Real leaf tea, pearls
            cooked through the day, and a cup built exactly the way you want it.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: EASE }}
          >
            <button type="button" onClick={onOrder} className="btn-invert w-full sm:w-auto">
              Start an order
            </button>
            <a href="#menu" className="btn-invert-outline w-full sm:w-auto">
              See the menu
            </a>
          </motion.div>
        </motion.div>

        {/* ── The drink ────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: artY, opacity: fade }}
          className="relative order-1 mx-auto mb-1 flex w-full max-w-[420px] flex-col items-center lg:order-2 lg:mb-0"
        >
          <div className="relative aspect-square w-[56vw] max-w-[250px] sm:w-[340px] sm:max-w-[340px]">
            {/* Glow keyed to the drink */}
            <motion.div
              aria-hidden
              className="absolute inset-[12%] rounded-full opacity-65 blur-[52px]"
              animate={{ backgroundColor: drink.colour[0] }}
              transition={{ duration: 0.9 }}
            />

            {/* Halo ring */}
            <motion.div
              aria-hidden
              className="absolute inset-[4%] rounded-full border border-white/20"
              animate={reduced ? undefined : { scale: [1, 1.05, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <AnimatePresence mode="wait">
              <motion.button
                key={drink.slug}
                type="button"
                onClick={onOrder}
                aria-label={`${drink.name}, from ${formatLKR(drink.prices.regular)}. Start an order.`}
                className="absolute inset-0 cursor-pointer"
                initial={{ opacity: 0, y: 40, scale: 0.88, rotate: -5 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.9, rotate: 4 }}
                transition={{ duration: 0.8, ease: EASE }}
              >
                <div className={reduced ? 'relative h-full w-full' : 'animate-float relative h-full w-full'}>
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    sizes="(max-width: 640px) 56vw, 340px"
                    priority
                    className="object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </motion.button>
            </AnimatePresence>
          </div>

          {/* Name + price + progress dots */}
          <div className="mt-2 flex w-full flex-col items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={drink.slug}
                className="flex items-baseline gap-2.5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-display text-sm font-extrabold text-white sm:text-base">
                  {drink.name}
                </span>
                <span className="text-sm font-bold text-leaf">
                  {formatLKR(drink.prices.regular)}
                </span>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-1.5">
              {rotation.map((d, n) => (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Show ${d.name}`}
                  aria-current={n === i}
                  className="h-1.5 overflow-hidden rounded-full bg-white/25 transition-all"
                  style={{ width: n === i ? 26 : 10 }}
                >
                  {n === i && (
                    <motion.span
                      key={`p-${i}`}
                      className="block h-full rounded-full bg-white"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: reduced ? 0.3 : HOLD / 1000, ease: 'linear' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ticker along the bottom edge */}
      <div
        aria-hidden
        className="relative border-t border-white/12 bg-purple-900/40 py-2.5 backdrop-blur-sm"
      >
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-8">
            {[...Array(2)].map((_, dup) =>
              [
                'Brewed fresh every 4 hours',
                'Pearls cooked today',
                '5 sugar levels',
                '10 toppings',
                'Pick up or dine in',
                'Havelock City Mall · Level 2',
              ].map((s) => (
                <span key={`${dup}-${s}`} className="flex items-center gap-8 whitespace-nowrap">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                    {s}
                  </span>
                  <span className="text-leaf">✦</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
