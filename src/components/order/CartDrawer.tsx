'use client';

import { AnimatePresence, motion, useDragControls } from 'framer-motion';
import { Minus, Plus, ShoppingBag, Store, Trash2, UtensilsCrossed, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  composeOrderMessage,
  orderWhatsappUrl,
  useCart,
  type OrderType,
} from '@/lib/cart';
import { describeSelection, formatLKR, priceOf } from '@/lib/menu';
import { useHistoryDismiss } from '@/lib/useHistoryDismiss';
import { useScrollLock } from '@/lib/useScrollLock';
import { outlets, openState } from '@/lib/outlets';

const EASE = [0.16, 1, 0.3, 1] as const;

export function CartDrawer() {
  const { lines, count, subtotal, setQty, remove, clear, open, setOpen } = useCart();

  const [step, setStep] = useState<'cart' | 'details'>('cart');
  const [orderType, setOrderType] = useState<OrderType>('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [touched, setTouched] = useState(false);

  const outlet = outlets[0];
  const state = openState(outlet);
  const drag = useDragControls();

  useScrollLock(open);
  useHistoryDismiss(open, () => setOpen(false));

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) setStep('cart');
  }, [open]);

  // Sri Lankan mobile numbers: 07XXXXXXXX locally, or +94 7XXXXXXXX.
  const phoneOk = /^(?:\+?94|0)?7\d{8}$/.test(phone.replace(/[\s-]/g, ''));
  const nameOk = name.trim().length >= 2;
  const canPlace = nameOk && phoneOk && lines.length > 0;

  const message = useMemo(
    () => composeOrderMessage(lines, subtotal, { name, phone, orderType, notes }),
    [lines, subtotal, name, phone, orderType, notes],
  );
  const waUrl = orderWhatsappUrl(message);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-purple-950/55"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(false)}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
            className="sheet z-[60] sm:w-[min(520px,100vw)]"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            /* Swipe down to dismiss — see the note in Customiser. */
            drag="y"
            dragControls={drag}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.5 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) setOpen(false);
            }}
          >
            <div
              onPointerDown={(e) => drag.start(e)}
              className="flex h-7 w-full shrink-0 cursor-grab touch-none items-center justify-center
                         bg-purple-800 pt-2 active:cursor-grabbing sm:hidden"
            >
              <span aria-hidden className="h-1.5 w-11 rounded-full bg-white/35" />
            </div>

            <header className="flex shrink-0 items-center justify-between bg-purple-800 px-6 pb-5 pt-3 sm:pt-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-purple-300">
                  {step === 'cart' ? 'Your order' : 'Almost there'}
                </p>
                <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tightest text-white">
                  {step === 'cart' ? `${count} ${count === 1 ? 'cup' : 'cups'}` : 'Your details'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/40 text-white transition hover:bg-white/15"
              >
                <X size={17} />
              </button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-5 [-webkit-overflow-scrolling:touch]">
              {lines.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <ShoppingBag size={38} className="text-purple-300" />
                  <p className="mt-4 font-display text-lg font-extrabold text-purple-900">
                    Nothing in your order yet
                  </p>
                  <p className="mt-1 text-sm text-ink/70">Pick a drink and build it your way.</p>
                  <button type="button" onClick={() => setOpen(false)} className="btn-primary mt-6">
                    Browse the menu
                  </button>
                </div>
              ) : step === 'cart' ? (
                <ul className="space-y-4">
                  {lines.map((line) => (
                    <motion.li
                      key={line.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      className="flex gap-3 rounded-2xl border border-purple-100 p-3"
                    >
                      <div
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl"
                        style={{ background: `linear-gradient(160deg, ${line.drink.colour[0]}, #fff)` }}
                      >
                        <Image
                          src={line.drink.image}
                          alt={line.drink.name}
                          fill
                          sizes="80px"
                          className="object-contain p-1"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-display text-sm font-extrabold leading-snug text-purple-900">
                            {line.drink.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => remove(line.id)}
                            aria-label={`Remove ${line.drink.name}`}
                            className="shrink-0 text-ink/65 transition hover:text-coral"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-ink/70">
                          {describeSelection(line)}
                        </p>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-purple-200">
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-7 w-7 place-items-center rounded-full text-purple-800 hover:bg-purple-100"
                            >
                              <Minus size={13} />
                            </button>
                            <span className="w-5 text-center text-sm font-bold text-purple-900">
                              {line.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(line.id, line.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid h-7 w-7 place-items-center rounded-full text-purple-800 hover:bg-purple-100"
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                          <span className="font-display text-base font-extrabold text-purple-800">
                            {formatLKR(priceOf(line) * line.qty)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}

                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs font-semibold text-ink/65 underline underline-offset-4 hover:text-coral"
                  >
                    Clear order
                  </button>
                </ul>
              ) : (
                <div className="space-y-6">
                  {/* Pickup or dine-in */}
                  <fieldset>
                    <legend className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-ink/65">
                      How are you having it?
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {(
                        [
                          { id: 'pickup', label: 'Pick up', sub: 'Collect at the counter', Icon: Store },
                          { id: 'dine-in', label: 'Dine in', sub: 'Drink it with us', Icon: UtensilsCrossed },
                        ] as const
                      ).map((opt) => {
                        const active = orderType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => setOrderType(opt.id)}
                            aria-pressed={active}
                            className={`flex flex-col items-start gap-1.5 rounded-2xl border-2 p-4 text-left transition-all ${
                              active
                                ? 'border-purple-800 bg-purple-800 text-white'
                                : 'border-purple-200 text-ink/70 hover:border-purple-800'
                            }`}
                          >
                            <opt.Icon size={20} className={active ? 'text-white' : 'text-purple-800'} />
                            <span className="font-display text-base font-extrabold leading-none">
                              {opt.label}
                            </span>
                            <span className={`text-[11px] ${active ? 'text-white/75' : 'text-ink/65'}`}>
                              {opt.sub}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  <Field
                    label="Your name"
                    value={name}
                    onChange={setName}
                    placeholder="Nimal Perera"
                    invalid={touched && !nameOk}
                    error="Please enter your name."
                  />
                  <Field
                    label="WhatsApp number"
                    value={phone}
                    onChange={setPhone}
                    placeholder="07X XXX XXXX"
                    type="tel"
                    invalid={touched && !phoneOk}
                    error="Enter a Sri Lankan mobile, e.g. 077 123 4567."
                  />
                  <Field
                    label="Notes for the store (optional)"
                    value={notes}
                    onChange={setNotes}
                    placeholder="Less sweet than usual, please"
                  />

                  <div className="rounded-2xl bg-purple-50 p-4 text-[13px] leading-relaxed text-ink/70">
                    <p className="font-bold text-purple-900">{outlet.name}</p>
                    <p>
                      {outlet.address} · {outlet.floor}
                    </p>
                    <p className={state.isOpen ? 'text-jade-deep' : 'text-coral'}>
                      {state.isOpen ? 'Open now' : 'Closed right now'}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="sheet-foot">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/65">
                    Total
                  </span>
                  <motion.span
                    key={subtotal}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-display text-3xl font-extrabold tracking-tightest text-purple-800"
                  >
                    {formatLKR(subtotal)}
                  </motion.span>
                </div>

                {step === 'cart' ? (
                  <button type="button" onClick={() => setStep('details')} className="btn-primary w-full">
                    Continue
                  </button>
                ) : (
                  <div className="space-y-2">
                    {waUrl ? (
                      <a
                        href={canPlace ? waUrl : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          setTouched(true);
                          if (!canPlace) e.preventDefault();
                        }}
                        aria-disabled={!canPlace}
                        className={`btn-primary w-full ${canPlace ? '' : 'pointer-events-auto opacity-50'}`}
                      >
                        Place order
                      </a>
                    ) : (
                      // No store WhatsApp number is configured yet, so there is
                      // nowhere to send the order. Say so rather than shipping a
                      // button that silently does nothing.
                      <p className="rounded-2xl border border-tangerine/40 bg-tangerine/10 p-3 text-[13px] leading-relaxed text-ink/70">
                        Online ordering is not switched on yet — the store’s WhatsApp
                        number still needs to be added. Call ahead or visit us on
                        Level 2 in the meantime.
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => setStep('cart')}
                      className="w-full py-2 text-sm font-semibold text-ink/70 hover:text-purple-800"
                    >
                      Back to order
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  invalid,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  invalid?: boolean;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.22em] text-ink/65">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={invalid || undefined}
        className={`w-full rounded-2xl border-2 px-4 py-3 text-[15px] outline-none transition-colors
                    placeholder:text-ink/40 ${
                      invalid
                        ? 'border-coral'
                        : 'border-purple-200 focus:border-purple-800'
                    }`}
      />
      {invalid && error && <span className="mt-1.5 block text-xs text-coral">{error}</span>}
    </label>
  );
}
