"use client";

import { useMemo, useState } from "react";
import DrinkArt from "./DrinkArt";
import {
  drinks,
  formatLKR,
  iceLevels,
  sugarLevels,
  toppingOptions,
  type Drink,
  type ToppingKind,
} from "@/lib/drinks";

/**
 * Live drink builder.
 *
 * Because DrinkArt is driven entirely by data, the preview is just a derived
 * Drink object — picking oat milk or swapping the topping re-renders the cup
 * with no extra assets and no network round trip.
 */

const BASES = [
  "chatime-milk-tea",
  "brown-sugar-milk-tea",
  "ceylon-highland",
  "taro-milk-tea",
  "matcha-crema",
  "mango-green-tea",
].map((id) => drinks.find((d) => d.id === id)!);

const SIZES = [
  { id: "regular", label: "Regular", note: "500ml", delta: 0 },
  { id: "large", label: "Large", note: "700ml", delta: 200 },
] as const;

const MILKS = [
  { id: "signature", label: "Signature", delta: 0 },
  { id: "fresh", label: "Fresh milk", delta: 80 },
  { id: "oat", label: "Oat milk", delta: 180 },
] as const;

export default function Customiser() {
  const [baseId, setBaseId] = useState(BASES[1].id);
  const [size, setSize] = useState<(typeof SIZES)[number]["id"]>("regular");
  const [milk, setMilk] = useState<(typeof MILKS)[number]["id"]>("signature");
  const [sugar, setSugar] = useState<string>("50%");
  const [ice, setIce] = useState<string>("Regular");
  const [topping, setTopping] = useState<ToppingKind>("brownSugarPearl");

  const base = useMemo(() => drinks.find((d) => d.id === baseId)!, [baseId]);

  const total = useMemo(() => {
    const sizeDelta = SIZES.find((s) => s.id === size)!.delta;
    const milkDelta = MILKS.find((m) => m.id === milk)!.delta;
    const topDelta = toppingOptions.find((t) => t.id === topping)?.price ?? 0;
    return base.price + sizeDelta + milkDelta + topDelta;
  }, [base, size, milk, topping]);

  // A synthetic Drink so the illustration reflects every choice live.
  const preview: Drink = useMemo(
    () => ({
      ...base,
      // A new id reseeds the topping scatter, so swapping toppings visibly
      // rearranges the cup instead of just recolouring the same dots.
      id: `${base.id}-${topping}-${ice}`,
      art: {
        ...base.art,
        topping,
        ice: ice !== "No Ice",
        liquidTop: milk === "oat" ? lighten(base.art.liquidTop) : base.art.liquidTop,
        liquidBottom:
          milk === "oat" ? lighten(base.art.liquidBottom) : base.art.liquidBottom,
      },
    }),
    [base, topping, ice, milk]
  );

  return (
    <section id="customise" className="scroll-mt-24 bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-magenta">
            Make It Yours
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.08] text-plum text-balance">
            Build it before you queue.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/65 text-pretty">
            Every combination below is one we actually make. Set it up here, then
            read the summary straight off your phone at the counter.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* preview */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="grain relative overflow-hidden rounded-3xl bg-plum p-8 text-center">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(80% 60% at 50% 10%, #8b3a9e 0%, transparent 60%)",
                }}
              />
              <div className="relative">
                <DrinkArt drink={preview} className="mx-auto h-64 w-auto" />
                <h3 className="mt-6 font-display text-2xl font-bold text-cream">
                  {base.name}
                </h3>
                <p className="mt-2 text-[13px] text-cream/65">
                  {SIZES.find((s) => s.id === size)!.label} ·{" "}
                  {MILKS.find((m) => m.id === milk)!.label} · {sugar} sugar · {ice}
                </p>
                <p className="mt-1 text-[13px] text-cream/65">
                  {toppingOptions.find((t) => t.id === topping)?.label ??
                    "No topping"}
                </p>

                <div className="mt-7 border-t border-cream/20 pt-6">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-cream/50">
                    Your total
                  </p>
                  <p className="mt-1 font-display text-4xl font-bold text-caramel">
                    {formatLKR(total)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="space-y-8">
            <Field label="Choose your base">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {BASES.map((d) => (
                  <Choice
                    key={d.id}
                    active={baseId === d.id}
                    onClick={() => setBaseId(d.id)}
                  >
                    {d.name}
                  </Choice>
                ))}
              </div>
            </Field>

            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Size">
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <Choice
                      key={s.id}
                      active={size === s.id}
                      onClick={() => setSize(s.id)}
                    >
                      {s.label}
                      <span className="mt-0.5 block text-[10px] font-normal opacity-60">
                        {s.note}
                      </span>
                    </Choice>
                  ))}
                </div>
              </Field>

              <Field label="Milk">
                <div className="flex flex-wrap gap-2">
                  {MILKS.map((m) => (
                    <Choice
                      key={m.id}
                      active={milk === m.id}
                      onClick={() => setMilk(m.id)}
                    >
                      {m.label}
                    </Choice>
                  ))}
                </div>
              </Field>
            </div>

            <Field label="Sugar level">
              <div className="flex flex-wrap gap-2">
                {sugarLevels.map((s) => (
                  <Choice key={s} active={sugar === s} onClick={() => setSugar(s)}>
                    {s}
                  </Choice>
                ))}
              </div>
            </Field>

            <Field label="Ice level">
              <div className="flex flex-wrap gap-2">
                {iceLevels.map((s) => (
                  <Choice key={s} active={ice === s} onClick={() => setIce(s)}>
                    {s}
                  </Choice>
                ))}
              </div>
            </Field>

            <Field label="Topping">
              <div className="flex flex-wrap gap-2">
                <Choice
                  active={topping === "none"}
                  onClick={() => setTopping("none")}
                >
                  None
                </Choice>
                {toppingOptions.map((t) => (
                  <Choice
                    key={t.id}
                    active={topping === t.id}
                    onClick={() => setTopping(t.id)}
                  >
                    {t.label}
                    <span className="mt-0.5 block text-[10px] font-normal opacity-60">
                      +{formatLKR(t.price)}
                    </span>
                  </Choice>
                ))}
              </div>
            </Field>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">
        {label}
      </legend>
      {children}
    </fieldset>
  );
}

function Choice({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex-1 rounded-xl border px-4 py-3 text-center text-[13px] font-semibold leading-tight transition-all duration-200 sm:flex-none ${
        active
          ? "border-plum bg-plum text-cream shadow-md shadow-plum/20"
          : "border-clay bg-white/70 text-ink/70 hover:border-plum/40 hover:text-plum"
      }`}
    >
      {children}
    </button>
  );
}

/** Nudge a hex colour toward cream to suggest a lighter, oat-based pour. */
function lighten(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (245 - c) * 0.22);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
