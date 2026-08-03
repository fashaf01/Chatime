'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { Customiser } from './Customiser';
import { DrinkCard } from './DrinkCard';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import {
  PRICES_ARE_PLACEHOLDER,
  categories,
  drinks,
  type CategoryId,
  type Drink,
} from '@/lib/menu';

type Filter = 'caffeineFree' | 'dairyFree';

export function MenuBrowser() {
  const { t } = useLocale();
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [filters, setFilters] = useState<Filter[]>([]);
  const [selected, setSelected] = useState<Drink | null>(null);

  const visible = useMemo(() => {
    return drinks.filter((drink) => {
      if (category !== 'all' && drink.category !== category) return false;
      if (filters.includes('caffeineFree') && !drink.caffeineFree) return false;
      if (filters.includes('dairyFree') && !drink.dairyFree) return false;
      return true;
    });
  }, [category, filters]);

  function toggleFilter(filter: Filter) {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    );
  }

  const activeCategory = categories.find((c) => c.id === category);

  return (
    <>
      <section className="relative pt-[130px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[10%] left-1/2 h-[45vw] w-[45vw] -translate-x-1/2 rounded-full bg-grape-600/28 blur-[130px]" />
        </div>

        <div className="container-page relative">
          <Reveal immediate>
            <p className="eyebrow">{t.menu.eyebrow}</p>
          </Reveal>
          <h1 className="display-lg mt-4 max-w-3xl">
            <RevealWords text={t.menu.title} immediate />
          </h1>
          <Reveal delay={0.15} immediate>
            <p className="body-lg mt-5 max-w-lg">{t.menu.body}</p>
          </Reveal>

          {PRICES_ARE_PLACEHOLDER && (
            <Reveal delay={0.2}>
              <p
                className="mt-6 inline-flex items-start gap-2 rounded-2xl border border-gold-400/30
                           bg-gold-400/[0.07] px-4 py-3 text-[13px] leading-relaxed text-gold-300"
              >
                <span aria-hidden>⚠</span>
                {t.menu.placeholderNotice}
              </p>
            </Reveal>
          )}

          {/* Category rail */}
          <Reveal delay={0.25}>
            <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1">
              <CategoryPill
                active={category === 'all'}
                onClick={() => setCategory('all')}
                label={t.menu.all}
              />
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  active={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                  label={t.categories[cat.id] ?? cat.name}
                />
              ))}
            </div>
          </Reveal>

          {/* Dietary filters */}
          <Reveal delay={0.3}>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-[11px] uppercase tracking-[0.2em] text-cream/35">
                {t.menu.filters}
              </span>
              <FilterChip
                active={filters.includes('caffeineFree')}
                onClick={() => toggleFilter('caffeineFree')}
                label={t.menu.caffeineFree}
              />
              <FilterChip
                active={filters.includes('dairyFree')}
                onClick={() => toggleFilter('dairyFree')}
                label={t.menu.dairyFree}
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
                className="mt-7 font-serif text-lg italic text-cream/45"
              >
                {activeCategory.tagline}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      <section className="container-page relative pb-28 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${filters.join('-')}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {visible.map((drink, i) => (
              <DrinkCard key={drink.slug} drink={drink} index={i} onSelect={setSelected} />
            ))}
          </motion.div>
        </AnimatePresence>

        {visible.length === 0 && (
          <p className="py-20 text-center text-cream/45">{t.menu.empty}</p>
        )}
      </section>

      <Customiser drink={selected} onClose={() => setSelected(null)} />
    </>
  );
}

function CategoryPill({
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
      className={`relative shrink-0 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium
                  transition-colors duration-300 ${
                    active ? 'text-grape-950' : 'text-cream/60 hover:text-cream'
                  }`}
    >
      {active && (
        <motion.span
          layoutId="category-pill"
          className="absolute inset-0 rounded-full bg-gold-400"
          transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        />
      )}
      <span className="relative z-10">{label}</span>
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
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors duration-300 ${
        active
          ? 'border-gold-400 bg-gold-400/12 text-gold-300'
          : 'border-white/12 text-cream/50 hover:border-white/30 hover:text-cream/80'
      }`}
    >
      {label}
    </button>
  );
}
