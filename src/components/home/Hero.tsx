'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { RevealWords } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { copy as t } from '@/lib/copy';
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

export function Hero({ onOrder }: { onOrder?: () => void }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const cupY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -55]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heroDrink = drinkBySlug('brown-sugar-pearl-milk');

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-purple-800 pt-[78px]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-[12%] top-[6%] h-[52vw] w-[52vw] rounded-full bg-purple-600/50 blur-[130px]" />
        <div className="absolute -right-[10%] bottom-[-10%] h-[46vw] w-[46vw] rounded-full bg-magenta/25 blur-[140px]" />
        <div className="absolute inset-0 animate-swirl bg-[conic-gradient(from_0deg_at_50%_50%,transparent,rgba(178,150,200,0.14),transparent_45%)]" />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="absolute bottom-0 animate-rise rounded-full bg-white/25"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              animationDelay: `${b.delay}s`,
              animationDuration: `${b.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="container-page relative grid items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.p
            className="eyebrow-on-purple"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="display-xl mt-5 text-white">
            <RevealWords text={t.hero.titleLead} delay={0.4} immediate />{' '}
            <span className="relative inline-block">
              <RevealWords text={t.hero.titleAccent} delay={0.55} immediate />
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[6px] w-full origin-left rounded-full bg-leaf"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.05, ease: EASE }}
              />
            </span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-balance text-[17px] leading-[1.65] text-white/75 sm:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
          >
            {t.hero.body}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
          >
            <MagneticButton onClick={onOrder} className="btn-invert">
              Start an order
            </MagneticButton>
            <MagneticButton href="#menu" className="btn-invert-outline">
              See the menu
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* Real product photography, not a drawing */}
        <motion.div
          style={{ y: cupY, opacity: fade }}
          className="relative mx-auto hidden h-[520px] w-[440px] lg:block"
          initial={reduced ? false : { opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
        >
          <div aria-hidden className="absolute inset-0 rounded-full bg-white/10 blur-[90px]" />
          {heroDrink && (
            <div className="animate-float relative h-full w-full">
              <Image
                src={heroDrink.image}
                alt={heroDrink.name}
                fill
                sizes="440px"
                priority
                className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]"
              />
            </div>
          )}
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-2"
        style={{ opacity: fade }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.9 }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
          {t.hero.scroll}
        </span>
        <motion.span
          className="h-9 w-px bg-gradient-to-b from-white/70 to-transparent"
          animate={reduced ? undefined : { scaleY: [0.35, 1, 0.35], originY: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
