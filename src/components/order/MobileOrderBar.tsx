'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { formatLKR } from '@/lib/menu';

/**
 * Sticky order bar for phones. Slides up once the hero is behind you, so it
 * never covers the hero CTAs, and stays out of the way on desktop where the
 * header already carries the cart.
 */
export function MobileOrderBar() {
  const { count, subtotal, setOpen } = useCart();
  const { scrollY } = useScroll();
  const [past, setPast] = useState(false);

  useMotionValueEvent(scrollY, 'change', (y) => setPast(y > 600));

  const show = past;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-3 lg:hidden"
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-full bg-purple-800 px-5 py-3.5
                       text-white shadow-[0_10px_30px_-8px_rgba(80,7,120,0.7)] active:scale-[0.99]"
          >
            <span className="flex items-center gap-2.5">
              <span className="relative">
                <ShoppingBag size={19} />
                {count > 0 && (
                  <span className="absolute -right-2 -top-2 grid h-4 min-w-[16px] place-items-center rounded-full bg-tangerine px-1 text-[10px] font-extrabold">
                    {count}
                  </span>
                )}
              </span>
              <span className="text-sm font-bold">
                {count > 0 ? 'View your order' : 'Start an order'}
              </span>
            </span>
            <span className="font-display text-base font-extrabold">
              {count > 0 ? formatLKR(subtotal) : 'Pick up · Dine in'}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
