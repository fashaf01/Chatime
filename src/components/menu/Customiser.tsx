'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CupVisual } from './CupVisual';
import { copy as t } from '@/lib/copy';
import { outlets, WHATSAPP_NUMBER } from '@/lib/outlets';
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

  const [size, setSize] = useState<'regular' | 'large'>('regular');
  const [sugar, setSugar] = useState<SugarLevel>(100);
  const [ice, setIce] = useState<IceLevelId>('regular');
  const [milk, setMilk] = useState('dairy');
  const [chosen, setChosen] = useState<string[]>([]);

  // Reset to the drink's own defaults each time a new one is opened.
  useEffect(() => {
    if (!drink) return;
    setSize('regular');
    setSugar(100);
    setIce(drink.servedHot ? 'none' : 'regular');
    setMilk('dairy');
    setChosen(drink.defaultToppings ?? []);
  }, [drink]);

  // Escape to close, and lock the page behind the drawer.
  useEffect(() => {
    if (!drink) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [drink, onClose]);

  const total = useMemo(() => {
    if (!drink) return 0;
    return priceOf({ drink, size, sugar, ice, milk, toppings: chosen });
  }, [drink, size, sugar, ice, milk, chosen]);

  function toggleTopping(id: string) {
    setChosen((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  const orderSummary = useMemo(() => {
    if (!drink) return '';
    const parts = [
      `${drink.name} (${size === 'large' ? t.build.large : t.build.regular})`,
      `${t.build.sugar}: ${sugar}%`,
      `${t.build.ice}: ${iceLevels.find((i) => i.id === ice)?.name}`,
      `${t.build.milk}: ${milkOptions.find((m) => m.id === milk)?.name}`,
    ];
    if (chosen.length) {
      parts.push(
        `${t.build.toppings}: ${chosen
          .map((id) => allToppings.find((x) => x.id === id)?.name)
          .filter(Boolean)
          .join(', ')}`,
      );
    }
    parts.push(`${t.build.total}: ${formatLKR(total)}`);
    return parts.join('\n');
  }, [drink, size, sugar, ice, milk, chosen, total, t]);

  const whatsappHref = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Hi Chatime! I'd like to order:\n\n${orderSummary}`,
      )}`
    : null;

  const deliveryHref = outlets.find((o) => o.deliveryUrl)?.deliveryUrl;

  const showDairyOptions = !drink?.dairyFree && drink?.category !== 'fresh-tea';

  return (
    <AnimatePresence>
      {drink && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-purple-900/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`Customise ${drink.name}`}
            className="fixed inset-x-0 bottom-0 z-50 flex max-h-[92vh] flex-col overflow-hidden
                       rounded-t-[28px] border-t border-purple-100 bg-white
                       sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-[min(560px,100vw)]
                       sm:rounded-l-[32px] sm:rounded-tr-none sm:border-l sm:border-t-0"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Cup panel */}
            <div className="relative shrink-0 overflow-hidden bg-purple-800 px-6 pb-4 pt-5">
              <button
                type="button"
                onClick={onClose}
                aria-label={t.build.close}
                className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full
                           border border-white/30 text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-4">
                <CupVisual
                  drink={drink}
                  size={size}
                  sugar={sugar}
                  ice={ice}
                  toppings={chosen}
                  onPurple
                  className="h-[210px] w-[140px] shrink-0"
                />
                <div className="min-w-0 pb-4">
                  <p className="eyebrow-on-purple">{t.build.eyebrow}</p>
                  <h2 className="mt-2 font-display text-[26px] font-extrabold leading-[1.05] tracking-tightest text-white">
                    {drink.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {drink.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Options */}
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
              <Group label={t.build.size}>
                <Choice
                  active={size === 'regular'}
                  onClick={() => setSize('regular')}
                  label={t.build.regular}
                />
                <Choice
                  active={size === 'large'}
                  onClick={() => setSize('large')}
                  label={t.build.large}
                />
              </Group>

              <Group label={t.build.sugar}>
                {sugarLevels.map((level) => (
                  <Choice
                    key={level}
                    active={sugar === level}
                    onClick={() => setSugar(level)}
                    label={`${level}%`}
                  />
                ))}
              </Group>

              {!drink.servedHot && (
                <Group label={t.build.ice}>
                  {iceLevels.map((level) => (
                    <Choice
                      key={level.id}
                      active={ice === level.id}
                      onClick={() => setIce(level.id)}
                      label={level.name}
                    />
                  ))}
                </Group>
              )}

              {showDairyOptions && (
                <Group label={t.build.milk}>
                  {milkOptions.map((option) => (
                    <Choice
                      key={option.id}
                      active={milk === option.id}
                      onClick={() => setMilk(option.id)}
                      label={option.name}
                      suffix={option.price ? `+${option.price}` : undefined}
                    />
                  ))}
                </Group>
              )}

              <Group label={t.build.toppings}>
                {allToppings.map((topping) => (
                  <Choice
                    key={topping.id}
                    active={chosen.includes(topping.id)}
                    onClick={() => toggleTopping(topping.id)}
                    label={topping.name}
                    suffix={`+${topping.price}`}
                    dot={topping.colour}
                  />
                ))}
              </Group>
            </div>

            {/* Total + handoff */}
            <div className="shrink-0 border-t border-purple-100 bg-white/95 px-6 py-4 backdrop-blur-xl">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink/65">
                  {t.build.total}
                </span>
                <motion.span
                  key={total}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="font-display text-3xl font-extrabold tracking-tightest text-purple-800"
                >
                  {formatLKR(total)}
                </motion.span>
              </div>

              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1"
                  >
                    {t.build.orderWhatsapp}
                  </a>
                ) : (
                  // No WhatsApp number is configured yet, so the delivery link
                  // is promoted to primary rather than showing a dead button.
                  deliveryHref && (
                    <a
                      href={deliveryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1"
                    >
                      {t.build.orderDelivery}
                    </a>
                  )
                )}
                {whatsappHref && deliveryHref && (
                  <a
                    href={deliveryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex-1"
                  >
                    {t.build.orderDelivery}
                  </a>
                )}
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
      className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm
                  transition-colors duration-200 ${
                    active
                      ? 'border-purple-800 text-white'
                      : 'border-purple-200 text-ink/70 hover:border-purple-800 hover:text-purple-800'
                  }`}
    >
      {active && (
        <motion.span
          layoutId={undefined}
          className="absolute inset-0 rounded-full bg-purple-800"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: EASE }}
        />
      )}
      {dot && (
        <span
          className="relative z-10 h-2.5 w-2.5 rounded-full ring-1 ring-black/20"
          style={{ background: dot }}
        />
      )}
      <span className="relative z-10">{label}</span>
      {suffix && (
        <span className={`relative z-10 text-xs ${active ? 'text-white/70' : 'text-ink/65'}`}>
          {suffix}
        </span>
      )}
    </button>
  );
}
