'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Marquee } from '@/components/motion/Marquee';
import { useLocale } from '@/lib/i18n/LocaleProvider';

/** The seven stages a tea leaf goes through — the one good idea on the UAE site. */
const PROCESS = [
  'Plucking',
  'Withering',
  'Tossing',
  'Fermentation',
  'Fixation',
  'Rolling & Drying',
  'Refining',
];

export function AboutView() {
  const { t } = useLocale();

  return (
    <div>
      <section className="grain relative overflow-hidden pt-[130px]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[6%] left-[10%] h-[45vw] w-[45vw] rounded-full bg-grape-600/28 blur-[140px]" />
          <div className="absolute right-[2%] top-[30%] h-[32vw] w-[32vw] rounded-full bg-gold-500/10 blur-[130px]" />
        </div>

        <div className="container-page relative">
          <Reveal immediate>
            <p className="eyebrow">{t.about.eyebrow}</p>
          </Reveal>
          <h1 className="display-lg mt-4 max-w-3xl">
            <RevealWords text={t.about.title} immediate />
          </h1>
          <Reveal delay={0.2} immediate>
            <p className="mt-8 max-w-2xl text-balance font-serif text-xl italic leading-relaxed text-cream/70 sm:text-2xl">
              {t.about.lead}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page relative py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {t.about.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <article className="glass group relative h-full overflow-hidden rounded-[28px] p-8">
                <span
                  aria-hidden
                  className="absolute right-6 top-5 font-display text-6xl font-semibold
                             tracking-tightest text-white/[0.045]"
                >
                  0{i + 1}
                </span>
                <h2 className="relative font-display text-xl font-semibold leading-snug tracking-tight">
                  {pillar.title}
                </h2>
                <p className="relative mt-4 text-sm leading-relaxed text-cream/55">
                  {pillar.body}
                </p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-gradient-to-r
                             from-transparent via-gold-400 to-transparent transition-transform
                             duration-700 group-hover:scale-x-100"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Leaf-to-cup process rail */}
      <section className="relative border-y border-white/8 py-20">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow text-center">Leaf to cup</p>
          </Reveal>

          <div className="no-scrollbar mt-12 flex gap-4 overflow-x-auto pb-2">
            {PROCESS.map((stage, i) => (
              <motion.div
                key={stage}
                className="glass relative flex min-w-[168px] flex-1 flex-col gap-4 rounded-2xl px-5 py-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="font-display text-xs font-semibold tracking-[0.2em] text-gold-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-display text-base font-medium leading-snug tracking-tight">
                  {stage}
                </span>
                {i < PROCESS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute right-[-14px] top-1/2 hidden text-cream/20 lg:block"
                  >
                    →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <Marquee
          items={['Cups of Joy', 'Est. Taiwan 2005', 'Colombo 05', 'Freshly Brewed', 'No Powder']}
          reverse
        />
      </section>

      <section className="container-page pb-28">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-[32px] px-8 py-16 text-center sm:px-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(232,188,90,0.18),transparent_60%)]"
            />
            <h2 className="display-md relative mx-auto max-w-xl text-balance">
              {t.build.title}
            </h2>
            <p className="body-lg relative mx-auto mt-5 max-w-md">{t.build.body}</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
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
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
