'use client';

import { motion } from 'framer-motion';
import { Clock, Instagram, MapPin, Star } from 'lucide-react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { copy as t } from '@/lib/copy';
import {
  INSTAGRAM_URL,
  formatOpenState,
  hoursSummary,
  openState,
  outlets,
} from '@/lib/outlets';

export function LocationTeaser() {
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
            <article className="card relative overflow-hidden rounded-[28px] p-7 sm:p-9">
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
                                font-bold uppercase tracking-[0.14em] ${
                                  state.isOpen
                                    ? 'bg-jade/15 text-jade-deep'
                                    : 'bg-purple-100 text-ink/70'
                                }`}
                  >
                    <motion.span
                      className={`h-1.5 w-1.5 rounded-full ${
                        state.isOpen ? 'bg-jade' : 'bg-ink/40'
                      }`}
                      animate={state.isOpen ? { opacity: [1, 0.3, 1] } : undefined}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {state.isOpen ? t.locations.openNow : t.locations.closed}
                  </span>

                  {outlet.rating && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-ink/70">
                      <Star size={13} className="fill-tangerine text-purple-800" />
                      {outlet.rating.score} · {outlet.rating.count} Google reviews
                    </span>
                  )}
                </div>

                <h3 className="mt-6 font-display text-3xl font-bold tracking-tightest">
                  {outlet.name}
                </h3>

                <dl className="mt-6 space-y-3.5 text-sm text-ink/65">
                  <div className="flex gap-3">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-purple-800" />
                    <dd>
                      {outlet.address}
                      <br />
                      <span className="text-ink/65">{outlet.floor}</span>
                    </dd>
                  </div>
                  <div className="flex gap-3">
                    <Clock size={16} className="mt-0.5 shrink-0 text-purple-800" />
                    <dd>
                      {hoursSummary(outlet)}
                      <br />
                      <span className="text-ink/65">{formatOpenState(state)}</span>
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
                    className="btn-outline !px-6 !py-3 !text-[13px]"
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
