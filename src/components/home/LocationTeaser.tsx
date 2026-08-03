'use client';

import { motion } from 'framer-motion';
import { Clock, Instagram, MapPin, Star } from 'lucide-react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { INSTAGRAM_URL, openState, outlets } from '@/lib/outlets';
import { formatHoursSummary, formatOpenState } from '@/lib/i18n/formatOutlet';

export function LocationTeaser() {
  const { t } = useLocale();
  const outlet = outlets[0];
  const state = openState(outlet);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Reveal>
              <p className="eyebrow">{t.locations.eyebrow}</p>
            </Reveal>
            <h2 className="display-lg mt-4">
              <RevealWords text={t.locations.title} />
            </h2>
            <Reveal delay={0.15}>
              <p className="body-lg mt-5 max-w-sm">{t.locations.body}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <article className="glass relative overflow-hidden rounded-[28px] p-7 sm:p-9">
              {/* Abstract street grid — a real map needs an API key, this doesn't */}
              <svg
                aria-hidden
                viewBox="0 0 400 240"
                className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.13]"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={i * 30}
                    x2="400"
                    y2={i * 30 - 40}
                    stroke="white"
                    strokeWidth="1"
                  />
                ))}
                {Array.from({ length: 13 }).map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 34}
                    y1="0"
                    x2={i * 34 + 40}
                    y2="240"
                    stroke="white"
                    strokeWidth="1"
                  />
                ))}
              </svg>

              <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px]
                                font-semibold uppercase tracking-[0.14em] ${
                                  state.isOpen
                                    ? 'bg-emerald-400/15 text-emerald-300'
                                    : 'bg-white/10 text-cream/60'
                                }`}
                  >
                    <motion.span
                      className={`h-1.5 w-1.5 rounded-full ${
                        state.isOpen ? 'bg-emerald-400' : 'bg-cream/50'
                      }`}
                      animate={state.isOpen ? { opacity: [1, 0.3, 1] } : undefined}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {state.isOpen ? t.locations.openNow : t.locations.closed}
                  </span>

                  {outlet.rating && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-cream/55">
                      <Star size={13} className="fill-gold-400 text-gold-400" />
                      {outlet.rating.score} · {outlet.rating.count} Google reviews
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-display text-3xl font-semibold tracking-tightest">
                  {outlet.name}
                </h3>

                <dl className="mt-6 space-y-3.5 text-sm text-cream/65">
                  <div className="flex gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-gold-400" />
                    <dd>
                      {outlet.address}
                      <br />
                      <span className="text-cream/45">{outlet.floor}</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={16} className="mt-0.5 shrink-0 text-gold-400" />
                    <dd>
                      {formatHoursSummary(outlet, t)}
                      <br />
                      <span className="text-cream/45">{formatOpenState(state, t)}</span>
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap gap-3">
                  <MagneticButton
                    href={outlet.mapsUrl}
                    className="btn-primary !px-6 !py-3 !text-[13px]"
                  >
                    {t.locations.directions}
                  </MagneticButton>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !px-6 !py-3 !text-[13px]"
                  >
                    <Instagram size={15} />
                    @chatimesrilanka
                  </a>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
