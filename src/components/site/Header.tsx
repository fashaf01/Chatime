'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Wordmark } from './Wordmark';
import { useCart } from '@/lib/cart';

const EASE = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#locations', label: 'Visit' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { count, setOpen: setCartOpen } = useCart();

  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
      >
        <div
          className={`transition-colors duration-300 ${
            scrolled
              ? 'border-b border-purple-100 bg-white/90 shadow-[0_2px_20px_-12px_rgba(80,7,120,0.4)] backdrop-blur-md'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <div className="container-page flex h-[78px] items-center justify-between gap-4">
            <Link href="#top" aria-label="Chatime Sri Lanka, home">
              <Wordmark variant="purple" />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[13px] font-bold uppercase
                             tracking-[0.12em] text-ink/70 transition-colors hover:text-purple-800"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative grid h-11 w-11 place-items-center rounded-full border-2
                           border-purple-800 text-purple-800 transition hover:bg-purple-800 hover:text-white"
                aria-label={`Your order, ${count} ${count === 1 ? 'item' : 'items'}`}
              >
                <ShoppingBag size={18} />
                <AnimatePresence>
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                      className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center
                                 rounded-full bg-tangerine px-1 text-[11px] font-extrabold text-white"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              <a
                href="#menu"
                className="btn-primary hidden !px-6 !py-2.5 !text-[12px] !uppercase !tracking-[0.12em] md:inline-flex"
              >
                Order Now
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
              {LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/20 py-5 font-display text-4xl
                               font-extrabold tracking-tightest text-white"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setCartOpen(true);
                }}
                className="btn-invert w-full"
              >
                Your order{count > 0 ? ` · ${count}` : ''}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
