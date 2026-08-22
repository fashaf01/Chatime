'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ProductImage } from '@/components/motion/Skeleton';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { RotatingBadge } from '@/components/motion/RotatingBadge';
import { Wave } from '@/components/site/Wave';
import { drinks, formatLKR, type Drink } from '@/lib/menu';

/**
 * chatime.com opens on a deep purple band of numbered drinks you drag through
 * sideways, with a rotating seal sitting on the wave at the bottom edge. It is
 * the single most recognisable thing about their site, so it belongs here — the
 * ranking gives the menu a way in that a plain grid never does.
 *
 * Scrolling is native `overflow-x` rather than a JS carousel: it keeps the
 * trackpad, touch and keyboard behaviour the platform already gives us, and the
 * arrows just nudge `scrollLeft` for mouse users.
 */
export function TrendingRail({ onSelect }: { onSelect: (d: Drink) => void }) {
  const reduced = useReducedMotion();
  const rail = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ atStart: true, atEnd: false });

  /**
   * Track which end the rail is against so the arrows can go dead there.
   * Arrows that stay lit at the end of a list read as broken — you press and
   * nothing moves. Recomputed on scroll and on resize, since the reachable
   * distance changes with the viewport.
   */
  const syncEdges = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setEdges({
      atStart: el.scrollLeft <= 1,
      // 1px of slack: sub-pixel layout means scrollLeft rarely lands on `max`.
      atEnd: el.scrollLeft >= max - 1,
    });
  }, []);

  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    syncEdges();
    el.addEventListener('scroll', syncEdges, { passive: true });
    const ro = new ResizeObserver(syncEdges);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', syncEdges);
      ro.disconnect();
    };
  }, [syncEdges]);

  // Bestsellers first, then whatever else fills the row out to eight.
  const ranked = [
    ...drinks.filter((d) => d.bestseller),
    ...drinks.filter((d) => !d.bestseller && d.isNew),
    ...drinks.filter((d) => !d.bestseller && !d.isNew),
  ].slice(0, 8);

  function nudge(dir: 1 | -1) {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 640), behavior: 'smooth' });
  }

  return (
    /*
     * `z-10` is load-bearing. The seal hangs ~22px below this section, and the
     * section that follows is also `relative` with `z-index: auto` — so with
     * both at the same level the later one won on DOM order and painted its
     * tint straight over the overhang. Nothing was clipping it; it was being
     * covered. Lifting this section puts the seal back on top.
     */
    <section
      className="relative isolate z-10 bg-purple-800 pt-14 sm:pt-20"
      aria-label="Trending drinks"
    >
      {/* Berry glow, same trick their band uses to stop the purple going flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 60% at 22% 20%, rgba(129,41,144,0.55) 0%, transparent 70%), radial-gradient(50% 50% at 88% 70%, rgba(25,190,207,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="container-page flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow-on-purple">Trending this week</p>
          <h2 className="display-md mt-2 text-white">What Colombo is ordering</h2>
        </div>

        <div className="hidden gap-2 sm:flex">
          <RailArrow onClick={() => nudge(-1)} label="Scroll left" disabled={edges.atStart}>
            <ChevronLeft size={18} />
          </RailArrow>
          <RailArrow onClick={() => nudge(1)} label="Scroll right" disabled={edges.atEnd}>
            <ChevronRight size={18} />
          </RailArrow>
        </div>
      </div>

      {/* The rail. `pb-16` leaves the numbers room to hang below the cups. */}
      <div
        ref={rail}
        /*
         * Three things here are deliberate, and each was a bug first:
         *
         * - `scroll-pl-*`: without it the browser aligns the first snap child
         *   to the scrollport edge, swallowing the left padding and clipping
         *   card one against the viewport.
         * - `snap-proximity`, not `snap-mandatory`: mandatory forces a landing
         *   on every gesture, so a trackpad swipe that is mostly vertical gets
         *   captured by the rail and the page stops scrolling under your
         *   fingers. Proximity snaps a deliberate horizontal flick and ignores
         *   everything else.
         * - No `scroll-smooth` class: in CSS it applies to *native* wheel and
         *   touch scrolling too, so every notch of the wheel animates and the
         *   rail feels laggy and rubbery. The arrow buttons pass
         *   `behavior: 'smooth'` per call instead, which is the only place it
         *   is wanted.
         * - `overflow-y-hidden` is not decoration. `overflow-x: auto` on its own
         *   drags the other axis from `visible` to `auto`, so this row quietly
         *   became a *vertical* scroller as well. The cards enter from
         *   `y: 26` against 24px of bottom padding, which left 2px of vertical
         *   overflow — enough for the browser to hand the wheel to the rail, so
         *   the page stopped dead whenever the pointer was over the drinks.
         *   Pinning the axis shut sends the wheel back to the page; `pb-8` then
         *   gives the entry animation room so nothing is trimmed.
         */
        className="no-scrollbar mt-8 flex snap-x snap-proximity gap-4 overflow-x-auto overflow-y-hidden
                   overscroll-x-contain px-5 pb-8 scroll-pl-5 sm:gap-7 sm:px-8 sm:scroll-pl-8
                   lg:px-12 lg:scroll-pl-12"
      >
        {ranked.map((d, i) => (
          <motion.button
            key={d.slug}
            type="button"
            onClick={() => onSelect(d)}
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, delay: Math.min(i, 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
            aria-label={`Number ${i + 1}, ${d.name}, from ${formatLKR(d.prices.regular)}. Customise and add to order.`}
            className="group relative w-[150px] shrink-0 snap-start text-left focus-visible:outline
                       focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white
                       sm:w-[190px]"
          >
            <p className="min-h-[38px] text-[13px] font-bold leading-snug text-white sm:min-h-[42px] sm:text-[15px]">
              {d.name}
            </p>

            <div className="relative mt-3 aspect-square w-full">
              {/* Rank chip, half off the cup exactly as theirs sits */}
              <span
                aria-hidden
                className="absolute -left-1 top-4 z-10 grid h-9 w-9 place-items-center rounded-full
                           bg-cyan font-display text-base font-extrabold text-white shadow-lg
                           transition-transform duration-300 group-hover:scale-110 sm:h-11 sm:w-11 sm:text-lg"
              >
                {i + 1}
              </span>

              <div
                className={
                  reduced
                    ? 'relative h-full w-full'
                    : 'animate-float-soft relative h-full w-full'
                }
                style={{ animationDelay: `${(i % 5) * 0.5}s` }}
              >
                <ProductImage
                  src={d.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 150px, 190px"
                  skeletonTone="dark"
                  skeletonRounded="rounded-3xl"
                  className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.32)]
                             transition-transform duration-500 group-hover:scale-[1.07]"
                />
              </div>
            </div>

            <p className="mt-1 text-[13px] font-extrabold text-white/85 transition-colors group-hover:text-cyan">
              {formatLKR(d.prices.regular)}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Wave out to the tint below, with the seal straddling it */}
      <div className="relative">
        <Wave colour="#F0EAF4" height={72} />
        <RotatingBadge
          label="Brewed fresh in Colombo"
          size={116}
          className="absolute -top-[22px] right-4 sm:right-12 lg:right-24"
        />
      </div>
    </section>
  );
}

function RailArrow({
  onClick,
  label,
  children,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/50 text-white
                 transition hover:border-white hover:bg-white hover:text-purple-800
                 disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}
