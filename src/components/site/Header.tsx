'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Wordmark } from './Wordmark';
import { useLocale } from '@/lib/i18n/LocaleProvider';
import { outlets } from '@/lib/outlets';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const { t } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  const links = [
    { href: '/menu', label: t.nav.menu },
    { href: '/locations', label: t.nav.locations },
    { href: '/about', label: t.nav.about },
  ];

  const orderUrl = outlets.find((o) => o.deliveryUrl)?.deliveryUrl ?? '/locations';

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-white/8 bg-grape-950/75 backdrop-blur-xl'
              : 'border-b border-transparent'
          }`}
        >
          <div className="container-page flex h-[74px] items-center justify-between gap-4">
            <Link href="/" aria-label="Chatime Sri Lanka, home">
              <Wordmark />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors
                                ${active ? 'text-cream' : 'text-cream/60 hover:text-cream'}`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gold-400"
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <LanguageSwitcher className="hidden sm:inline-flex" />
              <a
                href={orderUrl}
                target={orderUrl.startsWith('http') ? '_blank' : undefined}
                rel={orderUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary hidden !px-5 !py-2.5 !text-[13px] md:inline-flex"
              >
                {t.nav.order}
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15
                           text-cream/80 transition hover:bg-white/10 lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-grape-950 px-6 pb-10 pt-6"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-cream/80"
              >
                <X size={18} />
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/8 py-5 font-display text-4xl
                               font-semibold tracking-tightest text-cream"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-5">
              <LanguageSwitcher />
              <a
                href={orderUrl}
                target={orderUrl.startsWith('http') ? '_blank' : undefined}
                rel={orderUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary w-full"
              >
                {t.nav.order}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
