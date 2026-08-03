'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { RevealWords } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { CupVisual } from '@/components/menu/CupVisual';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { drinkBySlug } from '@/lib/menu';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Pearls drifting up through the hero. Fixed values so SSR and client agree. */
const BUBBLES = [
  { left: '8%', size: 14, delay: 0, duration: 11 },
  { left: '17%', size: 8, delay: 2.4, duration: 9 },
  { left: '29%', size: 18, delay: 5.1, duration: 13 },
  { left: '41%', size: 10, delay: 1.2, duration: 10 },
  { left: '58%', size: 16, delay: 3.7, duration: 12 },
  { left: '69%', size: 9, delay: 6.3, duration: 9.5 },
  { left: '78%', size: 20, delay: 0.8, duration: 14 },
  { left: '89%', size: 12, delay: 4.5, duration: 10.5 },
];

export function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const cupY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 170]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heroDrink = drinkBySlug('brown-sugar-pearl-milk') ?? undefined;

  return (
    <section
      ref={ref}
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-[74px]"
    >
      {/* Layered aurora behind everything */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[15%] top-[8%] h-[55vw] w-[55vw] rounded-full bg-grape-600/35 blur-[130px]" />
        <div className="absolute -right-[12%] top-[26%] h-[46vw] w-[46vw] rounded-full bg-gold-500/12 blur-[140px]" />
        <div className="absolute bottom-[-18%] left-[28%] h-[42vw] w-[42vw] rounded-full bg-grape-400/22 blur-[150px]" />
        <div className="absolute inset-0 animate-swirl bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(155,111,212,0.09),transparent_45%)]" />
      </div>

      {/* Rising pearls */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((bubble, i) => (
          <span
            key={i}
            className="absolute bottom-0 animate-rise rounded-full bg-gradient-to-b from-boba to-[#1a0f08]"
            style={{
              left: bubble.left,
              width: bubble.size,
              height: bubble.size,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-0">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="display-xl mt-5">
            <RevealWords text={t.hero.titleLead} delay={0.45} immediate />{' '}
            <span className="relative inline-block">
              <RevealWords
                text={t.hero.titleAccent}
                delay={0.6}
                immediate
                wordClassName="bg-gradient-to-br from-gold-300 via-gold-400 to-gold-600 bg-clip-text text-transparent"
              />
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full
                           bg-gradient-to-r from-gold-400 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 1.15, ease: EASE }}
              />
            </span>
          </h1>

          <motion.p
            className="body-lg mt-7 max-w-xl text-balance"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.95, ease: EASE }}
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
          >
            <MagneticButton>
              <Link href="/menu" className="btn-primary">
                {t.hero.ctaMenu}
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/locations" className="btn-ghost">
                {t.hero.ctaFind}
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Hero cup */}
        <motion.div
          style={{ y: cupY, opacity: fade }}
          className="relative mx-auto hidden h-[520px] w-[340px] lg:block"
          initial={reduced ? false : { opacity: 0, scale: 0.86, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        >
          <div
            aria-hidden
            className="absolute inset-0 rounded-full bg-gold-400/10 blur-[90px]"
          />
          {heroDrink && (
            <div className="animate-float">
              <CupVisual
                drink={heroDrink}
                size="large"
                sugar={100}
                ice="regular"
                toppings={['brown-sugar-pearls']}
                className="relative h-[520px] w-full"
              />
            </div>
          )}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/35">
          {t.hero.scroll}
        </span>
        <motion.span
          className="h-9 w-px bg-gradient-to-b from-gold-400 to-transparent"
          animate={reduced ? undefined : { scaleY: [0.35, 1, 0.35], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
