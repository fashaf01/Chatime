'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { copy as t } from '@/lib/copy';

export function Story() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // The photograph drifts against the copy as you scroll past it.
  const artY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 60, reduced ? 0 : -60]);

  return (
    <section
      id="about"
      ref={ref}
      className="defer-paint relative scroll-mt-24 overflow-hidden py-24 sm:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(45% 45% at 92% 30%, rgba(178,150,200,0.30) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-page relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">{t.story.eyebrow}</p>
          </Reveal>
          <h2 className="display-lg mt-4">
            <RevealWords text={t.story.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="body-lg mt-7">{t.story.body1}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="body-lg mt-5">{t.story.body2}</p>
          </Reveal>
        </div>

        {/*
         * Chatime's own tea-garden photograph, already cut to the organic blob
         * their global About pages use. A drawn leaf was standing in for this
         * and looked exactly like what it was.
         */}
        <motion.div
          style={{ y: artY }}
          className="relative mx-auto w-full max-w-[460px] lg:order-last"
        >
          <div className="relative aspect-square w-full">
            <motion.div
              aria-hidden
              className="absolute inset-[2%] rounded-full border border-purple-200"
              animate={reduced ? undefined : { scale: [1, 1.03, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Image
              src="/brand/tea-picking.png"
              alt="Hands holding freshly picked tea leaves in a tea garden"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="object-contain drop-shadow-[0_20px_28px_rgba(80,7,120,0.18)]"
            />
          </div>

          <Reveal delay={0.2}>
            <p className="mt-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink/65">
              Loose leaf · brewed fresh · never powdered
            </p>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
