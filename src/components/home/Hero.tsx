'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { drinks, type Drink } from '@/lib/menu';
import { openState, outlets } from '@/lib/outlets';

const EASE = [0.16, 1, 0.3, 1] as const;
/**
 * How long each shot holds before the hero moves on. With only two shots a long
 * hold means a long wait to see the second one at all, so this sits close to the
 * reference's own pace of roughly two and a half seconds a frame.
 */
const HOLD = 2600;
/** Length of the swap. Long enough to read as a dissolve, short enough to feel deliberate. */
const SWAP = 0.45;

/**
 * The two pieces of Chatime key art, alternating.
 *
 * These are the splash shots, not the flat cut-outs from the menu — both are
 * caught from the same overhead angle, so one dissolves into the other without
 * the eye having to re-find the cup. Each already carries its own colour blob
 * under the cup, which is why nothing draws a disc behind them; a second circle
 * in a similar colour just turned the pair to mud.
 *
 * `field` is the wash *behind* all of that. It is picked against the blob baked
 * into the shot rather than to match it: brand lilac behind the boba, so the
 * jade blob reads forward, and a warm amber behind the mango, where the cyan
 * blob sits opposite it on the wheel and snaps.
 */
const SHOWCASE = [
  {
    key: 'boba',
    src: '/brand/splash.png',
    alt: 'Chatime pearl milk tea mid-splash, tapioca pearls in the air',
    field: '#E2D6EF',
  },
  {
    key: 'mango',
    src: '/brand/mango-splash.png',
    alt: 'Chatime mango fruit tea mid-splash, mango and fresh fruit in the air',
    field: '#FBE0BB',
  },
];

/**
 * Deterministic pearl positions so SSR and the client agree. Percentages are
 * relative to the art's frame, not the section — loose pearls scattered across a
 * white page read as specks of dirt, but orbiting the cup they read as the brand.
 *
 * Half sit behind the art and half in front, at mixed sizes with a little blur
 * on the ones meant to read as far away. That split is what gives the frame
 * depth; pearls all pinned behind at one size just look like specks.
 *
 * `phone` marks the four that survive on a small screen — a lot of small moving
 * parts on a 360px display reads as dust.
 */
const PEARLS = [
  { left: '4%', top: '18%', size: 15, delay: 0, dur: 7, blur: 1.5, front: false, phone: true },
  { left: '30%', top: '6%', size: 11, delay: 2.3, dur: 6.4, blur: 2, front: false, phone: false },
  { left: '88%', top: '14%', size: 20, delay: 0.6, dur: 7.8, blur: 0, front: false, phone: true },
  { left: '94%', top: '56%', size: 13, delay: 1.8, dur: 6.9, blur: 2.5, front: false, phone: false },
  { left: '0%', top: '60%', size: 26, delay: 1.1, dur: 8.5, blur: 0, front: true, phone: true },
  { left: '72%', top: '88%', size: 22, delay: 2.9, dur: 8.2, blur: 1, front: true, phone: true },
  { left: '44%', top: '97%', size: 14, delay: 3.6, dur: 7.4, blur: 2, front: true, phone: false },
];

/**
 * One depth layer of drifting pearls.
 *
 * Split into a behind and an in-front pass so the art can sit between them in
 * the stacking order. Each pearl is a CSS keyframe rather than a framer loop:
 * framer drives infinite animations from rAF on the main thread, so seven
 * orbiting pearls would mean seven per-frame JS callbacks competing with
 * scrolling on a mid-range phone. Transform and opacity in a keyframe go to the
 * compositor and cost the main thread nothing.
 */
function Pearls({ reduced, front }: { reduced: boolean; front?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {PEARLS.filter((p) => !!p.front === !!front).map((p, n) => (
        <span
          key={n}
          className={`absolute rounded-full bg-purple-300 ${reduced ? '' : 'animate-drift'} ${
            p.phone ? '' : 'hidden sm:block'
          }`}
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            // Blur only ever applies to a 26px dot, so the raster cost is
            // trivial and it buys the sense of distance the flat version lacked.
            filter: p.blur ? `blur(${p.blur}px)` : undefined,
          }}
        />
      ))}
    </div>
  );
}

/**
 * White-first hero, which is how Chatime's own sites are built: a white ground,
 * purple as the act, and the key art carrying all the colour.
 *
 * Everything that moves is either `opacity` or `transform`, which the compositor
 * owns, so the whole sequence runs off the main thread and leaves scrolling
 * alone. Three things follow from that rule and are worth not undoing:
 *
 * - No `drop-shadow` on the art. It is a filter, and a filter over two
 *   cross-fading images has to be re-rasterised on every frame of the swap.
 *   Both shots already carry their own shadow in the file.
 * - No `will-change`. It would promote every layer permanently — GPU memory held
 *   all session to smooth a transition that lasts under half a second. Framer
 *   sets it for the duration of each animation and clears it after.
 * - Nothing in the art is clickable. It used to be one big button, so a tap or a
 *   swipe anywhere near the cup threw the order drawer open. Ordering belongs to
 *   the button that says so.
 *
 * The rotation stops whenever it cannot be seen: off-screen, on a hidden tab,
 * under the pointer, or when the reader has asked for reduced motion.
 */
export function Hero({ onOrder }: { onOrder?: (drink: Drink) => void }) {
  const reduced = useReducedMotion();
  const state = openState(outlets[0]);

  const [active, setActive] = useState(0);
  const [warm, setWarm] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [tabHidden, setTabHidden] = useState(false);
  const artRef = useRef<HTMLDivElement>(null);

  const running = !reduced && !hovering && onScreen && !tabHidden && SHOWCASE.length > 1;
  const headline = drinks.find((d) => d.bestseller) ?? drinks[0];

  /*
   * Warm the shot that is not showing yet — but only once the page itself has
   * finished loading.
   *
   * It cannot ship as `eager`: this version of next/image emits a
   * `<link rel=preload>` for every eager image, so both shots raced the LCP for
   * bandwidth on first paint. Leaving it lazy fixed that and broke something
   * worse — a lazy image that is merely transparent still counts as "not needed
   * yet", so the first swap arrived at a frame with no pixels behind it.
   * Dropping the lazy flag after `load` starts the fetch with the critical path
   * already clear.
   */
  useEffect(() => {
    if (document.readyState === 'complete') {
      setWarm(true);
      return;
    }
    const onLoad = () => setWarm(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  // Stop burning frames once the art has scrolled away.
  useEffect(() => {
    const el = artRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0.2,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SHOWCASE.length), HOLD);
    return () => clearTimeout(id);
  }, [active, running]);

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
            /*
             * Side by side even on the narrowest phone. Stacked full-width pills
             * pushed "See the menu" below the fold on a 360x640 screen; at this
             * width both labels still fit their pill comfortably.
             */
            className="mt-7 flex flex-row items-center gap-2.5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
          >
            <button
              type="button"
              onClick={() => onOrder?.(headline)}
              className="btn-primary flex-1 !px-4 sm:flex-none sm:!px-7"
            >
              Start an order
            </button>
            <a href="#menu" className="btn-outline flex-1 !px-4 sm:flex-none sm:!px-7">
              See the menu
            </a>
          </motion.div>
        </div>

        {/* ── Key art ──────────────────────────────────────────────────── */}
        <div className="order-1 w-full lg:order-2">
          <motion.div
            ref={artRef}
            /*
             * Deliberately taller than it is wide, and deliberately not clipped.
             * The wash is anchored off the right edge with the splash standing
             * through it, breaking the silhouette top and bottom — art tucked
             * politely inside a circle is the version that looks like a stock
             * template.
             */
            className="relative mx-auto aspect-square w-[86vw] max-w-[340px] sm:aspect-[4/5] sm:max-w-[440px] lg:mx-0 lg:w-full lg:max-w-[580px]"
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/*
             * The washes are stacked and cross-faded rather than one element
             * whose `background` animates. Animating a colour on a shape this
             * size repaints it every frame; swapping opacity between two already
             * painted layers does not.
             */}
            {SHOWCASE.map((s, i) => (
              <motion.span
                key={s.key}
                aria-hidden
                className="absolute left-[18%] top-[10%] aspect-square h-auto w-[104%] rounded-full"
                style={{ background: s.field }}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0 }}
                transition={{ duration: SWAP, ease: EASE }}
              />
            ))}

            <Pearls reduced={!!reduced} front={false} />

            {/*
             * The art box is a square sized off the container *height*, so the
             * splash fills the frame top to bottom instead of being scaled down
             * to fit the narrower width.
             *
             * Three nested spans, each owning exactly one transform, because they
             * cannot share the property: framer writes the whole `transform` when
             * it animates, so a Tailwind `-translate-x-1/2` on the same element
             * is silently wiped and the art lands half a frame to the right.
             * Outer centres, middle is framer's, inner carries the idle float.
             */}
            <div className="absolute inset-0">
              {SHOWCASE.map((s, i) => (
                <span
                  key={s.key}
                  className="absolute left-1/2 top-0 block aspect-square h-full -translate-x-1/2 sm:left-[48%]"
                >
                  <motion.span
                    className="block h-full w-full"
                    initial={false}
                    animate={
                      i === active
                        ? { opacity: 1, scale: 1, rotate: 0 }
                        : { opacity: 0, scale: reduced ? 1 : 0.92, rotate: reduced ? 0 : -4 }
                    }
                    transition={{ duration: SWAP, ease: EASE }}
                  >
                    <span
                      className={
                        reduced || i !== active
                          ? 'relative block h-full w-full'
                          : 'animate-float-soft relative block h-full w-full'
                      }
                    >
                      <Image
                        src={s.src}
                        alt={i === active ? s.alt : ''}
                        fill
                        /*
                         * Real display widths, not viewport fractions. The art is
                         * capped at 380/440/580px, so quoting a "vw" made the
                         * browser size for a box far larger than the one it ends
                         * up in and pull a heavier file than the phone can use.
                         */
                        sizes="(max-width: 640px) 340px, (max-width: 1024px) 550px, 725px"
                        priority={i === 0}
                        loading={i === 0 ? undefined : warm ? 'eager' : 'lazy'}
                        className="object-contain"
                      />
                    </span>
                  </motion.span>
                </span>
              ))}
            </div>

            <Pearls reduced={!!reduced} front />
          </motion.div>

          {/* Which shot is showing, and a way to pick */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {SHOWCASE.map((s, i) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show artwork ${i + 1} of ${SHOWCASE.length}`}
                aria-current={i === active}
                className="h-2 rounded-full transition-all duration-500 focus-visible:outline
                           focus-visible:outline-2 focus-visible:outline-offset-4
                           focus-visible:outline-purple-800"
                style={{
                  width: i === active ? 30 : 8,
                  background: i === active ? '#500778' : '#DCCEE8',
                }}
              />
            ))}
          </div>
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
