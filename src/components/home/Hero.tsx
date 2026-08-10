'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { openState, outlets } from '@/lib/outlets';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Deterministic pearl positions so SSR and the client agree. Percentages are
 * relative to the art's square frame, not the section — loose pearls scattered
 * across a white page read as specks of dirt, but orbiting the cup they read as
 * the brand.
 */
const PEARLS = [
  { left: '2%', top: '18%', size: 11, delay: 0 },
  { left: '-4%', top: '62%', size: 8, delay: 1.1 },
  { left: '22%', top: '4%', size: 9, delay: 2.3 },
  { left: '84%', top: '12%', size: 13, delay: 0.6 },
  { left: '96%', top: '52%', size: 9, delay: 1.8 },
  { left: '70%', top: '92%', size: 12, delay: 2.9 },
];

/**
 * White-first hero, which is how Chatime's own sites are built: a white ground,
 * purple as the act, and the key art carrying all the colour. The earlier
 * version filled the fold with a deep purple gradient — striking, but it left
 * the whole page top-heavy and fought the white sections underneath it.
 *
 * Soft edges are CSS gradients rather than blur() filters: a stack of 100px+
 * blurs has to be re-rasterised by the phone GPU every frame and was the main
 * source of the scroll jank here.
 */
export function Hero({ onOrder }: { onOrder?: () => void }) {
  const reduced = useReducedMotion();
  const state = openState(outlets[0]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-white pt-[78px]">
      {/* Lilac wash behind the art, fading out well before the type */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(70% 46% at 82% 26%, #F0EAF4 0%, rgba(240,234,244,0) 68%),
            radial-gradient(50% 34% at 6% 88%, rgba(178,150,200,0.20) 0%, rgba(178,150,200,0) 70%)
          `,
        }}
      />

      <div className="container-page relative flex flex-1 flex-col justify-center gap-2 py-6 lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:py-0">
        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="order-2 lg:order-1">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-3 py-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            <span className="relative flex h-1.5 w-1.5">
              {state.isOpen && !reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-jade opacity-75" />
              )}
              <span
                className={`relative inline-flex h-1.5 w-1.5 rounded-full ${
                  state.isOpen ? 'bg-jade' : 'bg-ink/40'
                }`}
              />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-purple-800">
              {state.isOpen ? 'Open now' : 'Closed'} · Havelock City Mall
            </span>
          </motion.div>

          <motion.h1
            className="display-xl mt-4 text-purple-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Cups of{' '}
            <span className="relative inline-block">
              <span
                style={{
                  background: 'linear-gradient(100deg, #500778 0%, #812990 55%, #B296C8 100%)',
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
                transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
              />
            </span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-md text-balance text-[15px] leading-[1.6] text-ink/70 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            Taiwan’s original bubble tea, brewed fresh in Colombo — built exactly the way
            you want it.
          </motion.p>

          <motion.div
            className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            <button type="button" onClick={onOrder} className="btn-primary w-full sm:w-auto">
              Start an order
            </button>
            <a href="#menu" className="btn-outline w-full sm:w-auto">
              See the menu
            </a>
          </motion.div>
        </div>

        {/* ── Key art ──────────────────────────────────────────────────── */}
        <div className="order-1 mx-auto w-full max-w-[440px] lg:order-2 lg:max-w-none">
          <motion.div
            className="relative mx-auto aspect-square w-[74vw] max-w-[330px] sm:w-[380px] sm:max-w-[400px] lg:w-full lg:max-w-[500px]"
            initial={reduced ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            {/* Lilac disc the cup sits in — the colour block the white page needs */}
            <div
              aria-hidden
              className="absolute inset-[4%] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, #E8DCF2 0%, #F0EAF4 52%, rgba(240,234,244,0) 72%)',
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 rounded-full border border-purple-200"
              animate={reduced ? undefined : { scale: [1, 1.04, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Pearls orbiting the disc */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {PEARLS.map((p, n) => (
                <motion.span
                  key={n}
                  className="absolute rounded-full bg-purple-300"
                  style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
                  animate={reduced ? undefined : { y: [0, -16, 0], opacity: [0.45, 0.85, 0.45] }}
                  transition={{
                    duration: 7 + n,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: p.delay,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={onOrder}
              aria-label="Start an order"
              className="absolute inset-0 rounded-full focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-8 focus-visible:outline-purple-800"
            >
              <div className={reduced ? 'relative h-full w-full' : 'animate-float relative h-full w-full'}>
                <Image
                  src="/brand/splash.png"
                  alt="Chatime pearl milk tea mid-splash, tapioca pearls in the air"
                  fill
                  sizes="(max-width: 640px) 74vw, 500px"
                  priority
                  className="object-contain drop-shadow-[0_26px_34px_rgba(80,7,120,0.28)]"
                />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Ticker — one full-bleed purple band closing the fold */}
      <div aria-hidden className="relative bg-purple-800 py-2.5">
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
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
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
