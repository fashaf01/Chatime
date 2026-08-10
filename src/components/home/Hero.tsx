'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { openState, outlets } from '@/lib/outlets';
import { drinks, formatLKR, type Drink } from '@/lib/menu';

const EASE = [0.16, 1, 0.3, 1] as const;
const HOLD = 4600;

/**
 * Luxury gradient hero.
 *
 * Every soft edge here is a CSS gradient, not a `blur()` filter. The previous
 * version stacked three 110–120px blur layers plus an animating conic gradient,
 * and a mobile GPU has to re-rasterise all of that every frame — that was the
 * single biggest cause of the scroll jank. Gradients cost nothing to composite
 * and look identical at this scale.
 *
 * The header sits transparent on top of this, so the section runs to the top of
 * the screen with no white bar breaking it.
 */
export function Hero({ onOrder }: { onOrder?: () => void }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  const rotation = drinks.filter((d) => d.bestseller).slice(0, 4);
  const drink: Drink = rotation[i] ?? drinks[0];

  const next = useCallback(() => setI((v) => (v + 1) % rotation.length), [rotation.length]);

  useEffect(() => {
    if (reduced || rotation.length < 2) return;
    const id = setTimeout(next, HOLD);
    return () => clearTimeout(id);
  }, [i, next, reduced, rotation.length]);

  const state = openState(outlets[0]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[78px]">
      {/* Base gradient — deep aubergine through brand purple into lilac */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(168deg, #25033A 0%, #3A0557 22%, #500778 52%, #6E1785 78%, #8C3A9E 100%)',
        }}
      />
      {/* Soft light pools, keyed to the drink. Gradients, not blur filters. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 transition-[background] duration-1000 ease-out"
        style={{
          background: `
            radial-gradient(70% 45% at 78% 26%, ${drink.colour[1]}4D 0%, transparent 62%),
            radial-gradient(55% 38% at 12% 74%, rgba(129,41,144,0.42) 0%, transparent 66%),
            radial-gradient(90% 55% at 50% 108%, rgba(178,150,200,0.35) 0%, transparent 70%)
          `,
        }}
      />
      {/* Fine sheen across the top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-56"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.10), transparent)' }}
      />

      <div className="container-page relative flex flex-1 flex-col justify-center py-5 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-12 lg:py-0">
        {/* ── The drink ────────────────────────────────────────────────── */}
        <div className="order-1 mx-auto flex w-full max-w-[440px] flex-col items-center lg:order-2">
          <div className="relative aspect-square w-[74vw] max-w-[330px] sm:w-[360px] sm:max-w-[380px]">
            {/* Halo: layered gradients, zero filter cost */}
            <div
              aria-hidden
              className="absolute inset-0 rounded-full transition-[background] duration-1000"
              style={{
                background: `radial-gradient(circle at 50% 46%, ${drink.colour[0]}66 0%, ${drink.colour[0]}22 42%, transparent 66%)`,
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-[6%] rounded-full border border-white/20"
              animate={reduced ? undefined : { scale: [1, 1.045, 1], opacity: [0.45, 0.8, 0.45] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={drink.slug}
                type="button"
                onClick={onOrder}
                aria-label={`${drink.name}, from ${formatLKR(drink.prices.regular)}. Start an order.`}
                className="absolute inset-0"
                initial={{ opacity: 0, y: 34, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -26, scale: 0.94 }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <div className={reduced ? 'relative h-full w-full' : 'animate-float relative h-full w-full'}>
                  <Image
                    src={drink.image}
                    alt={drink.name}
                    fill
                    sizes="(max-width: 640px) 74vw, 380px"
                    priority
                    className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.42)]"
                  />
                </div>
              </motion.button>
            </AnimatePresence>
          </div>

          {/* Name, price, progress */}
          <div className="mt-1 flex w-full flex-col items-center gap-2">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={drink.slug}
                className="flex items-baseline gap-2.5"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                <span className="font-display text-[15px] font-extrabold text-white sm:text-base">
                  {drink.name}
                </span>
                <span className="text-[15px] font-extrabold text-leaf">
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
                  className="h-1.5 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                  style={{ width: n === i ? 28 : 10 }}
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
        </div>

        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="order-2 mt-5 lg:order-1 lg:mt-0">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
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

          <motion.h1
            className="display-xl mt-3 text-white"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: EASE }}
          >
            Cups of{' '}
            <span className="relative inline-block">
              <span
                style={{
                  background: 'linear-gradient(100deg, #FFFFFF 0%, #E9D6F5 45%, #B296C8 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Joy
              </span>
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-leaf sm:h-[8px]"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.75, ease: EASE }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-md text-balance text-[15px] leading-[1.6] text-white/80 sm:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          >
            Taiwan’s original bubble tea, brewed fresh in Colombo — built exactly the way
            you want it.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          >
            <button type="button" onClick={onOrder} className="btn-invert w-full sm:w-auto">
              Start an order
            </button>
            <a href="#menu" className="btn-invert-outline w-full sm:w-auto">
              See the menu
            </a>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div aria-hidden className="relative border-t border-white/12 bg-black/15 py-2.5">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-8">
            {[0, 1].map((dup) =>
              [
                'Brewed fresh every 4 hours',
                'Pearls cooked today',
                '5 sugar levels',
                '10 toppings',
                'Pick up or dine in',
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
