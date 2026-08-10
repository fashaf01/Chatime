'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Minus, Plus, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { CupVisual } from './CupVisual';
import { useCart } from '@/lib/cart';
import { useScrollLock } from '@/lib/useScrollLock';
import {
  formatLKR,
  iceLevels,
  milkOptions,
  priceOf,
  sugarLevels,
  toppings as allToppings,
  type Drink,
  type IceLevelId,
  type SugarLevel,
} from '@/lib/menu';

type Props = {
  drink: Drink | null;
  onClose: () => void;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Customiser({ drink, onClose }: Props) {
  const { add, setOpen } = useCart();

  const [size, setSize] = useState<'regular' | 'large'>('regular');
  const [sugar, setSugar] = useState<SugarLevel>(100);
  const [ice, setIce] = useState<IceLevelId>('regular');
  const [milk, setMilk] = useState('dairy');
  const [chosen, setChosen] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  /** Toggles the preview between the real photo and the live drawn cup. */
  const [preview, setPreview] = useState<'photo' | 'live'>('photo');

  useEffect(() => {
    if (!drink) return;
    setSize('regular');
    setSugar(100);
    setIce(drink.servedHot ? 'none' : 'regular');
    setMilk('dairy');
    setChosen(drink.defaultToppings ?? []);
    setQty(1);
    setPreview('photo');
  }, [drink]);

  useScrollLock(!!drink);

  useEffect(() => {
    if (!drink) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drink, onClose]);

  const unit = useMemo(() => {
    if (!drink) return 0;
    return priceOf({ drink, size, sugar, ice, milk, toppings: chosen });
  }, [drink, size, sugar, ice, milk, chosen]);

  function toggleTopping(id: string) {
    setChosen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function addToOrder() {
    if (!drink) return;
    add({ drink, size, sugar, ice, milk, toppings: chosen }, qty);
    onClose();
    setOpen(true);
  }

  const showMilk = !drink?.dairyFree && drink?.category !== 'fresh-tea';

  return (
    <AnimatePresence>
      {drink && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-purple-950/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`Customise ${drink.name}`}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[93vh] flex-col overflow-hidden
                       rounded-t-[28px] bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none
                       sm:w-[min(560px,100vw)] sm:rounded-l-[32px] sm:rounded-tr-none"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            {/* Preview header */}
            <div
              className="relative shrink-0 px-6 pb-5 pt-5"
              style={{ background: `linear-gradient(160deg, ${drink.colour[0]}, #FFFFFF 85%)` }}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full
                           bg-white/80 text-purple-800 shadow-card transition hover:bg-white"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-4">
                <div className="relative h-[188px] w-[150px] shrink-0 sm:h-[200px] sm:w-[165px]">
                  {preview === 'photo' ? (
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      fill
                      sizes="165px"
                      className="scale-[1.18] object-contain drop-shadow-[0_16px_20px_rgba(80,7,120,0.2)]"
                    />
                  ) : (
                    <CupVisual
                      drink={drink}
                      size={size}
                      sugar={sugar}
                      ice={ice}
                      toppings={chosen}
                      className="h-full w-full"
                    />
                  )}
                </div>

                <div className="min-w-0 pb-2 pr-10">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-800">
                    Build your cup
                  </p>
                  <h2 className="mt-2 font-display text-[24px] font-extrabold leading-[1.05] tracking-tightest text-purple-900">
                    {drink.name}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/70">
                    {drink.description}
                  </p>

                  {/* Photo ↔ live preview */}
                  <div className="mt-3 inline-flex rounded-full border border-purple-200 bg-white/70 p-0.5">
                    {(['photo', 'live'] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setPreview(mode)}
                        className={`rounded-full px-3 py-1 text-[11px] font-bold transition-colors ${
                          preview === mode ? 'bg-purple-800 text-white' : 'text-ink/70'
                        }`}
                      >
                        {mode === 'photo' ? 'Photo' : 'Your cup'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-6 [-webkit-overflow-scrolling:touch]">
              <Group label="Size">
                <Choice active={size === 'regular'} onClick={() => setSize('regular')} label="Regular" />
                <Choice active={size === 'large'} onClick={() => setSize('large')} label="Large" />
              </Group>

              <Group label="Sugar">
                {sugarLevels.map((l) => (
                  <Choice key={l} active={sugar === l} onClick={() => setSugar(l)} label={`${l}%`} />
                ))}
              </Group>

              {!drink.servedHot && (
                <Group label="Ice">
                  {iceLevels.map((l) => (
                    <Choice key={l.id} active={ice === l.id} onClick={() => setIce(l.id)} label={l.name} />
                  ))}
                </Group>
              )}

              {showMilk && (
                <Group label="Milk">
                  {milkOptions.map((o) => (
                    <Choice
                      key={o.id}
                      active={milk === o.id}
                      onClick={() => setMilk(o.id)}
                      label={o.name}
                      suffix={o.price ? `+${o.price}` : undefined}
                    />
                  ))}
                </Group>
              )}

              <Group label="Toppings">
                {allToppings.map((tp) => (
                  <Choice
                    key={tp.id}
                    active={chosen.includes(tp.id)}
                    onClick={() => toggleTopping(tp.id)}
                    label={tp.name}
                    suffix={`+${tp.price}`}
                    dot={tp.colour}
                  />
                ))}
              </Group>
            </div>

            {/* Quantity + add */}
            <div className="shrink-0 border-t border-purple-100 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full border-2 border-purple-200 p-1">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-8 w-8 place-items-center rounded-full text-purple-800 transition hover:bg-purple-100"
                  >
                    <Minus size={15} />
                  </button>
                  <span className="w-7 text-center font-display text-base font-extrabold text-purple-900">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.min(20, q + 1))}
                    aria-label="Increase quantity"
                    className="grid h-8 w-8 place-items-center rounded-full text-purple-800 transition hover:bg-purple-100"
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button type="button" onClick={addToOrder} className="btn-primary flex-1">
                  Add to order ·{' '}
                  <motion.span
                    key={unit * qty}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {formatLKR(unit * qty)}
                  </motion.span>
                </button>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-purple-100 py-5 last:border-b-0">
      <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink/65">
        {label}
      </h3>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

function Choice({
  active,
  onClick,
  label,
  suffix,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  suffix?: string;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`relative inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-sm
                  font-medium transition-colors duration-200 ${
                    active
                      ? 'border-purple-800 bg-purple-800 text-white'
                      : 'border-purple-200 text-ink/70 hover:border-purple-800 hover:text-purple-800'
                  }`}
    >
      {dot && (
        <span
          className="h-2.5 w-2.5 rounded-full ring-1 ring-black/15"
          style={{ background: dot }}
        />
      )}
      <span>{label}</span>
      {suffix && (
        <span className={`text-xs ${active ? 'text-white/75' : 'text-ink/65'}`}>{suffix}</span>
      )}
    </button>
  );
}
