'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { DrinkCard } from '@/components/menu/DrinkCard';
import { Customiser } from '@/components/menu/Customiser';
import { copy as t } from '@/lib/copy';
import { drinks, type Drink } from '@/lib/menu';

export function Featured() {
  const [selected, setSelected] = useState<Drink | null>(null);

  const featured = drinks.filter((d) => d.bestseller).slice(0, 4);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Reveal>
              <p className="eyebrow">{t.featured.eyebrow}</p>
            </Reveal>
            <h2 className="display-lg mt-4">
              <RevealWords text={t.featured.title} />
            </h2>
            <Reveal delay={0.15}>
              <p className="body-lg mt-4 max-w-md">{t.featured.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-sm font-medium text-ink/70
                         transition-colors hover:text-purple-800"
            >
              {t.featured.viewAll}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((drink, i) => (
            <DrinkCard key={drink.slug} drink={drink} index={i} onSelect={setSelected} />
          ))}
        </div>
      </div>

      <Customiser drink={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
