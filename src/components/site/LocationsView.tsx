'use client';

import { motion } from 'framer-motion';
import { Clock, ExternalLink, Instagram, MapPin, Phone, Star } from 'lucide-react';
import { Reveal, RevealWords } from '@/components/motion/Reveal';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { copy as t } from '@/lib/copy';
import {
  DAY_NAMES,
  INSTAGRAM_URL,
  formatOpenState,
  formatTime,
  openState,
  outlets,
  type Outlet,
} from '@/lib/outlets';

export function LocationsView() {

  return (
    <div>
      <section className="relative pt-[130px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[8%] right-[5%] h-[42vw] w-[42vw] rounded-full bg-purple-300/30 blur-[130px]" />
        </div>

        <div className="container-page relative">
          <Reveal immediate>
            <p className="eyebrow">{t.locations.eyebrow}</p>
          </Reveal>
          <h1 className="display-lg mt-4 max-w-2xl">
            <RevealWords text={t.locations.title} immediate />
          </h1>
          <Reveal delay={0.15} immediate>
            <p className="body-lg mt-5 max-w-md">{t.locations.body}</p>
          </Reveal>
        </div>
      </section>

      <section className="container-page relative py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {outlets.map((outlet, i) => (
            <OutletCard key={outlet.slug} outlet={outlet} index={i} />
          ))}

          {/* Open-call card — mirrors the campaign running on Instagram */}
          <Reveal delay={0.15}>
            <article
              className="card relative flex h-full flex-col justify-between overflow-hidden
                         rounded-[28px] border-dashed p-8"
            >
              <div>
                <span className="eyebrow">{t.locations.comingSoon}</span>
                <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tightest">
                  {t.locations.nextTitle}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-ink/70">
                  {t.locations.nextBody}
                </p>
              </div>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline mt-8 self-start !px-6 !py-3 !text-[13px]"
              >
                <Instagram size={15} />
                {t.locations.nextCta}
              </a>

              {/* Faint dotted pin trail */}
              <svg
                aria-hidden
                viewBox="0 0 200 120"
                className="pointer-events-none absolute -bottom-4 right-0 h-32 w-56 opacity-[0.12]"
              >
                <path
                  d="M10 100 Q 60 20 110 70 T 190 30"
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5 8"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </article>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function OutletCard({ outlet, index }: { outlet: Outlet; index: number }) {
  const state = openState(outlet);

  return (
    <Reveal delay={index * 0.08}>
      <article className="card relative h-full overflow-hidden rounded-[28px] p-8">
        <svg
          aria-hidden
          viewBox="0 0 400 300"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.1]"
        >
          {Array.from({ length: 11 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 30}
              x2="400"
              y2={i * 30 - 44}
              stroke="white"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 13 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 34}
              y1="0"
              x2={i * 34 + 46}
              y2="300"
              stroke="white"
              strokeWidth="1"
            />
          ))}
          <circle cx="260" cy="120" r="30" fill="none" stroke="white" strokeWidth="1.5" />
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
            <span className="text-xs text-ink/65">{formatOpenState(state)}</span>
          </div>

          <h2 className="mt-6 font-display text-[28px] font-bold leading-tight tracking-tightest">
            {outlet.name}
          </h2>

          {outlet.rating && (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink/70">
              <Star size={13} className="fill-tangerine text-purple-800" />
              {outlet.rating.score} · {outlet.rating.count} Google reviews
            </p>
          )}

          <dl className="mt-6 space-y-4 text-sm text-ink/65">
            <div className="flex gap-3">
              <MapPin size={16} className="mt-0.5 shrink-0 text-purple-800" />
              <dd>
                {outlet.address}
                {outlet.floor && (
                  <>
                    <br />
                    <span className="text-ink/65">{outlet.floor}</span>
                  </>
                )}
              </dd>
            </div>

            {outlet.phone && (
              <div className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-purple-800" />
                <dd>
                  <a href={`tel:${outlet.phone}`} className="hover:text-purple-800">
                    {outlet.phone}
                  </a>
                </dd>
              </div>
            )}

            <div className="flex gap-3">
              <Clock size={16} className="mt-0.5 shrink-0 text-purple-800" />
              <dd className="w-full">
                <span className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-ink/65">
                  {t.locations.hours}
                </span>
                <ul className="space-y-1">
                  {outlet.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6 text-[13px]">
                      <span className="text-ink/70">{DAY_NAMES[i]}</span>
                      <span className="tabular-nums">
                        {formatTime(h.open)} – {formatTime(h.close)}
                      </span>
                    </li>
                  ))}
                </ul>
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
            {outlet.deliveryUrl && (
              <a
                href={outlet.deliveryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline !px-6 !py-3 !text-[13px]"
              >
                {t.locations.delivery}
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
