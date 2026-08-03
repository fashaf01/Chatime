'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Wordmark } from './Wordmark';
import { copy as t } from '@/lib/copy';
import { outlets } from '@/lib/outlets';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
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
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? 'border-b border-purple-100 bg-white/90 shadow-[0_2px_20px_-12px_rgba(80,7,120,0.4)] backdrop-blur-xl'
              : 'border-b border-transparent bg-white'
          }`}
        >
          <div className="container-page flex h-[78px] items-center justify-between gap-4">
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
                    className={`relative rounded-full px-4 py-2 text-[13px] font-bold uppercase
                                tracking-[0.12em] transition-colors ${
                                  active ? 'text-purple-800' : 'text-ink/70 hover:text-purple-800'
                                }`}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-4 bottom-0 h-[3px] rounded-full bg-purple-800"
                        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={orderUrl}
                target={orderUrl.startsWith('http') ? '_blank' : undefined}
                rel={orderUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-primary hidden !px-6 !py-2.5 !text-[12px] !uppercase !tracking-[0.12em] md:inline-flex"
              >
                {t.nav.order}
              </a>
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-purple-800
                           text-purple-800 transition hover:bg-purple-800 hover:text-white lg:hidden"
              >
                <Menu size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet — full-bleed purple, the way the brand treats panels */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col bg-purple-800 px-6 pb-10 pt-6"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <Wordmark variant="white" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/50 text-white"
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
                    className="block border-b border-white/20 py-5 font-display text-4xl
                               font-extrabold tracking-tightest text-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <a
                href={orderUrl}
                target={orderUrl.startsWith('http') ? '_blank' : undefined}
                rel={orderUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="btn-invert w-full"
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
