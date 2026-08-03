'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { localeNames, locales } from '@/lib/i18n/dictionaries';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-white/12 p-1 ${className}`}
      role="group"
      aria-label="Language"
    >
      {locales.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-300
                        ${active ? 'text-grape-950' : 'text-cream/55 hover:text-cream'}
                        ${code === 'si' ? 'font-sinhala' : code === 'ta' ? 'font-tamil' : ''}`}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-gold-400"
                transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {code === 'en' ? 'EN' : localeNames[code].native}
            </span>
          </button>
        );
      })}
    </div>
  );
}
