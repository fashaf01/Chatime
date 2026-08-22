'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ProductImage } from '@/components/motion/Skeleton';
import { useRef } from 'react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { copy as t } from '@/lib/copy';

/**
 * Laid out the way chatime.com sets its "Brewing up beverages" block: an
 * oversized purple headline on the left, and on the right a cut-out photograph
 * standing on a flat colour disc, with a second disc offset behind it.
 *
 * The discs are the point. Their whole site puts product cut-outs on solid
 * shapes rather than in boxes, and that one habit is most of why their pages
 * feel like a brand and a bordered card grid does not.
 */
export function Story() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // The art drifts against the copy as you scroll past it.
  const artY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : 56, reduced ? 0 : -56]);
  const discY = useTransform(scrollYProgress, [0, 1], [reduced ? 0 : -28, reduced ? 0 : 28]);

  return (
    <section
      id="about"
      ref={ref}
      /*
       * Deliberately not `defer-paint`. The parallax below is driven by
       * `useScroll({ target: ref })`, which has to measure this section's
       * position — but `content-visibility: auto` skips its layout while it is
       * off-screen, which is exactly when the measurement is set up. Framer
       * measured zero and warned on every load. A section that animates against
       * its own scroll offset has to stay laid out.
       */
      className="relative scroll-mt-24 overflow-hidden bg-white pb-24 pt-16 sm:pb-32 sm:pt-20"
    >
      <div className="container-page relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div>
          <Reveal>
            <p className="eyebrow">{t.story.eyebrow}</p>
          </Reveal>
          <h2 className="display-lg mt-4 text-purple-800">
            <RevealWords text={t.story.title} />
          </h2>
          <Reveal delay={0.15}>
            <p className="body-lg mt-7">{t.story.body1}</p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="body-lg mt-5">{t.story.body2}</p>
          </Reveal>
          <Reveal delay={0.32}>
            <a href="#menu" className="btn-leaf mt-9">
              Explore drinks
            </a>
          </Reveal>
        </div>

        {/* Cut-out on discs */}
        <div className="relative mx-auto w-full max-w-[480px] lg:order-last">
          <div className="relative aspect-square w-full">
            {/*
             * The photo is already a circular crop, so it gets the treatment
             * chatime.com gives its circular portraits — two flat accent dots
             * tucked behind opposite edges — rather than the solid disc they
             * put under square cut-outs.
             */}
            <motion.span
              aria-hidden
              style={{ y: discY }}
              className="absolute left-[-2%] top-[6%] h-[22%] w-[22%] rounded-full bg-coral"
            />
            <motion.span
              aria-hidden
              style={{ y: discY }}
              className="absolute bottom-[6%] right-[2%] h-[26%] w-[26%] rounded-full bg-tangerine"
            />

            <motion.div style={{ y: artY }} className="absolute inset-0">
              <ProductImage
                src="/brand/tea-picking.png"
                alt="Hands holding freshly picked tea leaves in a tea garden"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                skeletonRounded="rounded-full"
                className="object-contain drop-shadow-[0_22px_30px_rgba(80,7,120,0.22)]"
              />
            </motion.div>
          </div>

          <Reveal delay={0.2}>
            <p className="mt-2 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-ink/65">
              Loose leaf · brewed fresh · never powdered
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
