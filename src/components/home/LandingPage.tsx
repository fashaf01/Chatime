'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ProductImage } from '@/components/motion/Skeleton';
import { useMemo, useState } from 'react';
import { Hero } from './Hero';
import { ProductMarquee } from './ProductMarquee';
import { SignatureCarousel } from './SignatureCarousel';
import { Stats } from './Stats';
import { Story } from './Story';
import { TrendingRail } from './TrendingRail';
import { LocationTeaser } from './LocationTeaser';
import { Wave } from '@/components/site/Wave';
import { Customiser } from '@/components/menu/Customiser';
import { CategoryIcon, type IconName } from '@/components/menu/CategoryIcon';
import { ProductCard } from '@/components/menu/ProductCard';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import {
  PRICES_ARE_PLACEHOLDER,
  categories,
  drinks,
  type CategoryId,
  type Drink,
} from '@/lib/menu';

type Filter = 'caffeineFree' | 'dairyFree';

/**
 * The whole site is one page. Everything that needs the customiser lives here
 * so a single drawer instance serves the carousel, the grid and the CTA band.
 */
export function LandingPage() {
  const [selected, setSelected] = useState<Drink | null>(null);
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [filters, setFilters] = useState<Filter[]>([]);

  const featured = useMemo(() => drinks.filter((d) => d.bestseller), []);

  const visible = useMemo(
    () =>
      drinks.filter((d) => {
        if (category !== 'all' && d.category !== category) return false;
        if (filters.includes('caffeineFree') && !d.caffeineFree) return false;
        if (filters.includes('dairyFree') && !d.dairyFree) return false;
        return true;
      }),
    [category, filters],
  );

  const activeCategory = categories.find((c) => c.id === category);

  function toggleFilter(f: Filter) {
    setFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));
  }

  return (
    <>
      {/* The hero hands back whichever cup it is showing, so "Start an order"
          opens that one rather than a fixed default. */}
      <Hero onOrder={(d) => setSelected(d)} />

      {/*
       * The colour rhythm below is chatime.com's: white, then a deep purple
       * block, then the lilac tint, waving from one to the next rather than
       * butting up against a hard edge. The page used to run white all the way
       * down with two purple strips in it, which is what made it read flat.
       */}
      <TrendingRail onSelect={setSelected} />
      <Stats />
      <SignatureCarousel drinks={featured} onSelect={setSelected} />
      <Wave colour="#FFFFFF" from="#F0EAF4" height={72} />
      <Story />
      <Wave colour="#F0EAF4" from="#FFFFFF" height={72} />

      {/* ── Menu ─────────────────────────────────────────────────────────── */}
      <section id="menu" className="relative scroll-mt-24 overflow-hidden bg-[#F0EAF4] pb-20 pt-6 sm:pb-28">
        {/*
         * Chatime's fruit-tea key art, floated beside the heading. Their
         * section headers always carry a cut-out; ours was type alone on a flat
         * tint, which is the moment the page stopped looking like theirs.
         */}
        <div
          aria-hidden
          /* top-24 clears the fixed header — at top-0 the art sits behind it. */
          className="pointer-events-none absolute right-[-3%] top-24 hidden aspect-square w-[260px]
                     lg:block xl:right-[1%] xl:w-[310px]"
        >
          <ProductImage
            src="/brand/mango-splash.png"
            alt=""
            fill
            sizes="330px"
            skeletonRounded="rounded-full"
            className="animate-float-soft object-contain"
          />
        </div>

        <div className="container-page relative">
          <Reveal>
            <p className="eyebrow">The menu</p>
          </Reveal>
          <h2 className="display-lg mt-4 max-w-3xl text-purple-900">
            <RevealWords text="Every cup we make" />
          </h2>
          <Reveal delay={0.12}>
            <p className="body-lg mt-4 max-w-lg">
              Tap any drink to build it your way — sugar, ice, milk and toppings — then add
              it straight to your order.
            </p>
          </Reveal>

          {PRICES_ARE_PLACEHOLDER && (
            <Reveal delay={0.16}>
              <p className="mt-6 inline-flex items-start gap-2 rounded-2xl border border-tangerine/40 bg-tangerine/10 px-4 py-3 text-[13px] leading-relaxed text-ink/70">
                <span aria-hidden>⚠</span>
                Prices shown are indicative and pending confirmation from the store.
              </p>
            </Reveal>
          )}

          {/* Category chips — each carries its own brand accent */}
          <Reveal delay={0.2}>
            <div className="no-scrollbar mt-9 flex gap-2 overflow-x-auto pb-1">
              <Chip
                active={category === 'all'}
                accent="#500778"
                icon="all"
                onClick={() => setCategory('all')}
                label="All drinks"
              />
              {categories.map((c) => (
                <Chip
                  key={c.id}
                  active={category === c.id}
                  accent={c.accent}
                  icon={c.icon}
                  onClick={() => setCategory(c.id)}
                  label={c.name}
                />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/65">
                Filter
              </span>
              <FilterChip
                active={filters.includes('caffeineFree')}
                onClick={() => toggleFilter('caffeineFree')}
                label="Caffeine free"
              />
              <FilterChip
                active={filters.includes('dairyFree')}
                onClick={() => toggleFilter('dairyFree')}
                label="Dairy free"
              />
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {activeCategory && (
              <motion.p
                key={activeCategory.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-6 text-sm font-bold uppercase tracking-[0.14em]"
                style={{ color: activeCategory.accent }}
              >
                {activeCategory.tagline}
              </motion.p>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${category}-${filters.join('-')}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4"
            >
              {visible.map((d, i) => (
                <ProductCard key={d.slug} drink={d} index={i} onSelect={setSelected} />
              ))}
            </motion.div>
          </AnimatePresence>

          {visible.length === 0 && (
            <p className="py-20 text-center text-ink/70">Nothing matches those filters yet.</p>
          )}
        </div>
      </section>

      <Wave colour="#500778" from="#F0EAF4" height={72} />
      <ProductMarquee onSelect={setSelected} />
      <LocationTeaser />

      <Customiser drink={selected} onClose={() => setSelected(null)} />
    </>
  );
}

/**
 * Chip fronted by Chatime's own category glyph — the same pairing their menu
 * filter uses. The icon inherits `currentColor`, so it flips white on the
 * accent fill without a second asset.
 */
function Chip({
  active,
  onClick,
  label,
  accent,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  accent: string;
  icon: IconName;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2
                  px-5 py-2.5 text-sm font-bold transition-colors duration-300 ${
                    active
                      ? 'text-white'
                      : 'border-purple-200 bg-white text-ink/70 hover:text-purple-800'
                  }`}
      style={active ? { background: accent, borderColor: accent } : undefined}
    >
      <CategoryIcon name={icon} size={19} className="shrink-0" />
      {label}
    </button>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors duration-300 ${
        active
          ? 'border-purple-800 bg-purple-100 text-purple-800'
          : 'border-purple-200 text-ink/70 hover:border-purple-800'
      }`}
    >
      {label}
    </button>
  );
}
