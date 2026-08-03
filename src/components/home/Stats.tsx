'use client';

import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Marquee } from '@/components/motion/Marquee';
import { useLocale } from '@/lib/i18n/LocaleProvider';

/** Counts up from zero once it scrolls into view. */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const reduced = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, reduced]);

  return (
    <span ref={ref}>
      {value.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export function Stats() {
  const { t } = useLocale();

  const items = [
    { value: 3000, suffix: '+', label: t.stats.stores },
    { value: 38, suffix: '', label: t.stats.countries },
    { value: 2005, suffix: '', label: t.stats.since },
    { value: 4000, suffix: '+', label: t.stats.drinks },
  ];

  return (
    <section className="relative border-y border-white/8 py-14">
      <div className="container-page">
        <div className="grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              className="text-center lg:border-r lg:border-white/8 lg:last:border-r-0"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.75, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-semibold leading-none tracking-tightest text-gold-400">
                <Counter to={item.value} suffix={item.suffix} />
              </p>
              <p className="mt-2.5 px-2 text-[11px] uppercase tracking-[0.2em] text-cream/45">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <Marquee
          items={[
            'Brown Sugar Pearls',
            'Taro Milk Tea',
            'Ceylon Black',
            'Mango Slush',
            'Grass Jelly',
            'Matcha Latte',
            'Wood Apple Cooler',
            'Chocolate Mousse',
          ]}
        />
      </div>
    </section>
  );
}
