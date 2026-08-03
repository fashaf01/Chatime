'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { CupVisual } from '@/components/menu/CupVisual';
import { Customiser } from '@/components/menu/Customiser';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { copy as t } from '@/lib/copy';
import {
  drinkBySlug,
  formatLKR,
  iceLevels,
  priceOf,
  type Drink,
  type IceLevelId,
  type SugarLevel,
} from '@/lib/menu';

/**
 * A self-playing demo of the customiser — it cycles through combinations so the
 * idea lands before anyone touches anything. Clicking opens the real thing.
 */
const SEQUENCE: { sugar: SugarLevel; ice: IceLevelId; toppings: string[] }[] = [
  { sugar: 100, ice: 'regular', toppings: ['pearls'] },
  { sugar: 50, ice: 'less', toppings: ['pearls', 'grass-jelly'] },
  { sugar: 25, ice: 'none', toppings: ['brown-sugar-pearls', 'mousse'] },
  { sugar: 75, ice: 'extra', toppings: ['rainbow-jelly', 'mango-popping'] },
];

export function BuildTeaser() {
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState<Drink | null>(null);

  const drink = drinkBySlug('taro-milk-tea');

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % SEQUENCE.length), 2600);
    return () => clearInterval(id);
  }, []);

  if (!drink) return null;

  const current = SEQUENCE[step];
  const price = priceOf({
    drink,
    size: 'regular',
    sugar: current.sugar,
    ice: current.ice,
    milk: 'dairy',
    toppings: current.toppings,
  });

  return (
    <section className="relative overflow-hidden border-y border-purple-100 py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[60vw] w-[60vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-300/30 blur-[140px]" />
      </div>

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <Reveal>
            <p className="eyebrow">{t.build.eyebrow}</p>
          </Reveal>
          <h2 className="display-lg mt-4">
            <RevealWords text={t.build.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="body-lg mt-6 max-w-md">{t.build.body}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-3">
              {[
                { label: t.build.sugar, value: `${current.sugar}%` },
                { label: t.build.ice, value: iceLevels.find((l) => l.id === current.ice)?.name ?? current.ice },
                { label: t.build.toppings, value: String(current.toppings.length) },
              ].map((item) => (
                <div key={item.label} className="card rounded-2xl px-4 py-3.5">
                  <dt className="text-[10px] uppercase tracking-[0.18em] text-ink/65">
                    {item.label}
                  </dt>
                  <motion.dd
                    key={String(item.value)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-1 font-display text-lg font-bold tracking-tight"
                  >
                    {item.value}
                  </motion.dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <MagneticButton onClick={() => setOpen(drink)} className="btn-primary">
                {t.build.cta}
              </MagneticButton>
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink/65">
                  {t.build.total}
                </span>
                <motion.span
                  key={price}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-2xl font-bold tracking-tight text-purple-800"
                >
                  {formatLKR(price)}
                </motion.span>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="order-1 flex justify-center lg:order-2">
          <button
            type="button"
            onClick={() => setOpen(drink)}
            aria-label={t.build.cta}
            className="relative rounded-3xl focus-visible:outline focus-visible:outline-2
                       focus-visible:outline-offset-8 focus-visible:outline-purple-800"
          >
            <div aria-hidden className="absolute inset-0 rounded-full bg-purple-100 blur-[80px]" />
            <CupVisual
              drink={drink}
              size="regular"
              sugar={current.sugar}
              ice={current.ice}
              toppings={current.toppings}
              className="relative h-[420px] w-[280px]"
            />
          </button>
        </div>
      </div>

      <Customiser drink={open} onClose={() => setOpen(null)} />
    </section>
  );
}
