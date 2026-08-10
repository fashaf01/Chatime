'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { openState, outlets } from '@/lib/outlets';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Deterministic pearl positions so SSR and the client agree. */
const PEARLS = [
  { left: '7%', top: '22%', size: 12, delay: 0 },
  { left: '18%', top: '68%', size: 8, delay: 1.1 },
  { left: '30%', top: '14%', size: 10, delay: 2.3 },
  { left: '62%', top: '78%', size: 14, delay: 0.6 },
  { left: '80%', top: '18%', size: 9, delay: 1.8 },
  { left: '92%', top: '58%', size: 12, delay: 2.9 },
];

/**
 * Hero built on Chatime's own key art — the splashing cup with pearls in flight
 * that their global sites lead with. A static product cut-out never read as
 * Chatime; this does immediately.
 *
 * Every soft edge is a CSS gradient rather than a blur() filter: the earlier
 * version stacked 110–120px blurs plus an animating conic gradient, which a
 * phone GPU has to re-rasterise every frame, and that was the main source of
 * the scroll jank. The header sits transparent on top so nothing breaks the
 * top edge.
 */
export function Hero({ onOrder }: { onOrder?: () => void }) {
  const reduced = useReducedMotion();
  const state = openState(outlets[0]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-[78px]">
      {/* Brand purple, deepened at the top so the white header contents read */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(168deg, #2A0442 0%, #3F0660 20%, #500778 48%, #6B1583 74%, #8A38A0 100%)',
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(65% 42% at 76% 30%, rgba(232,214,245,0.30) 0%, transparent 64%),
            radial-gradient(52% 36% at 10% 76%, rgba(129,41,144,0.45) 0%, transparent 66%),
            radial-gradient(95% 50% at 50% 106%, rgba(178,150,200,0.34) 0%, transparent 72%)
          `,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-48"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.09), transparent)' }}
      />

      {/* Loose pearls drifting behind the art */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {PEARLS.map((p, n) => (
          <motion.span
            key={n}
            className="absolute rounded-full bg-boba/70"
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={reduced ? undefined : { y: [0, -18, 0], opacity: [0.35, 0.7, 0.35] }}
            transition={{
              duration: 7 + n,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="container-page relative flex flex-1 flex-col justify-center py-6 lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10 lg:py-0">
        {/* ── Key art ──────────────────────────────────────────────────── */}
        <div className="order-1 mx-auto w-full max-w-[440px] lg:order-2">
          <motion.div
            className="relative aspect-square w-[80vw] max-w-[360px] sm:w-[400px] sm:max-w-[420px] lg:w-full lg:max-w-[460px]"
            initial={reduced ? false : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <div
              aria-hidden
              className="absolute inset-[8%] rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.06) 45%, transparent 68%)',
              }}
            />
            <motion.div
              aria-hidden
              className="absolute inset-[3%] rounded-full border border-white/15"
              animate={reduced ? undefined : { scale: [1, 1.04, 1], opacity: [0.4, 0.75, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />

            <button
              type="button"
              onClick={onOrder}
              aria-label="Start an order"
              className="absolute inset-0 rounded-full focus-visible:outline focus-visible:outline-2
                         focus-visible:outline-offset-8 focus-visible:outline-white"
            >
              <div className={reduced ? 'relative h-full w-full' : 'animate-float relative h-full w-full'}>
                <Image
                  src="/brand/splash.png"
                  alt="Chatime pearl milk tea mid-splash, tapioca pearls in the air"
                  fill
                  sizes="(max-width: 640px) 80vw, 460px"
                  priority
                  className="object-contain drop-shadow-[0_30px_38px_rgba(0,0,0,0.45)]"
                />
              </div>
            </button>
          </motion.div>
        </div>

        {/* ── Copy ─────────────────────────────────────────────────────── */}
        <div className="order-2 mt-4 lg:order-1 lg:mt-0">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Cups of{' '}
            <span className="relative inline-block">
              <span
                style={{
                  background: 'linear-gradient(100deg, #FFFFFF 0%, #EBD9F7 45%, #B296C8 100%)',
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
            className="mt-4 max-w-md text-balance text-[15px] leading-[1.6] text-white/80 sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            Taiwan’s original bubble tea, brewed fresh in Colombo — built exactly the way
            you want it.
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
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
