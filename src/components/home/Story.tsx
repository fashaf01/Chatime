'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
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
  // Leaf art drifts in the opposite direction to the copy as you scroll past.
  const leafY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 80, reduced ? 0 : -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -12, reduced ? 0 : 12]);

  return (
    <section id="about" ref={ref} className="defer-paint scroll-mt-24 relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(45% 45% at 92% 30%, rgba(178,150,200,0.30) 0%, transparent 70%)' }} />
      </div>

      <div className="container-page relative grid gap-14 lg:grid-cols-2 lg:items-center">
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

        {/* Concentric brew rings with a drifting tea leaf */}
        <motion.div style={{ y: leafY }} className="relative mx-auto h-[380px] w-full max-w-[420px]">
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute left-1/2 top-1/2 rounded-full border border-purple-100"
              style={{
                width: `${55 + ring * 22}%`,
                height: `${55 + ring * 22}%`,
                x: '-50%',
                y: '-50%',
              }}
              animate={
                reduced
                  ? undefined
                  : { scale: [1, 1.045, 1], opacity: [0.35, 0.7, 0.35] }
              }
              transition={{
                duration: 6 + ring * 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: ring * 0.5,
              }}
            />
          ))}

          <motion.svg
            viewBox="0 0 200 200"
            className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2"
            style={{ rotate }}
          >
            <defs>
              <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F2D48A" />
                <stop offset="100%" stopColor="#B57F1E" />
              </linearGradient>
            </defs>
            <path
              d="M100 18 C 152 48 168 108 138 154 C 120 180 82 184 60 162 C 30 132 40 62 100 18 Z"
              fill="url(#leaf)"
              opacity="0.9"
            />
            <path
              d="M100 26 C 96 78 92 126 78 168"
              stroke="#150720"
              strokeWidth="3"
              fill="none"
              opacity="0.35"
              strokeLinecap="round"
            />
            {[52, 80, 108, 136].map((y, i) => (
              <path
                key={y}
                d={`M ${96 - i * 2} ${y} L ${132 - i * 5} ${y - 16}`}
                stroke="#150720"
                strokeWidth="2.4"
                opacity="0.28"
                strokeLinecap="round"
              />
            ))}
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
