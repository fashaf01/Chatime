'use client';

import { Instagram, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { copy as t } from '@/lib/copy';
import { INSTAGRAM_URL, hoursSummary, outlets } from '@/lib/outlets';

export function Footer() {
  const flagship = outlets[0];

  return (
    <footer className="relative overflow-hidden border-t border-purple-100">
      {/* Oversized watermark bleeding off the bottom */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center
                   font-display font-bold leading-none tracking-tightest text-purple-50"
        style={{ fontSize: 'clamp(5rem, 20vw, 17rem)' }}
      >
        Chatime
      </span>

      <div className="container-page relative py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Wordmark />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink/70">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-purple-800">
              {t.footer.explore}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { href: '#menu', label: t.nav.menu },
                { href: '#locations', label: t.nav.locations },
                { href: '#about', label: t.nav.about },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink/70 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.24em] text-purple-800">
              {t.footer.visit}
            </h3>
            <address className="mt-4 space-y-2.5 text-sm not-italic text-ink/70">
              <p>
                {flagship.address}
                <br />
                {flagship.floor}
              </p>
              <p>{hoursSummary(flagship)}</p>
              <a
                href={flagship.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink/70 transition-colors hover:text-purple-800"
              >
                <MapPin size={14} />
                {t.locations.directions}
              </a>
            </address>

            <h3 className="mt-7 text-[11px] font-medium uppercase tracking-[0.24em] text-purple-800">
              {t.footer.follow}
            </h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-ink/70 transition-colors hover:text-ink"
            >
              <Instagram size={15} />
              @chatimesrilanka
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-purple-100 pt-6 text-xs text-ink/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Chatime Sri Lanka. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
