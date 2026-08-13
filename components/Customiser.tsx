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
 * DrinkArt is data-driven, so the preview is just a derived Drink — changing
 * milk or topping re-renders the cup with no extra assets and no round trip.
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

  const points = Math.floor(total / 100) * 10;

  const preview: Drink = useMemo(
    () => ({
      ...base,
      // A fresh id reseeds the topping scatter, so a topping swap visibly
      // rearranges the cup instead of only recolouring the same dots.
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
    <section id="customise" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Make it yours</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            Build it before you queue.
          </h2>
          <p className="mt-4 text-[16px] font-medium leading-relaxed text-ink/60 text-pretty">
            Every combination here is one we actually make. Set it up, then read
            it off your phone at the counter.
          </p>
        </header>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* preview */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[32px] bg-grape p-7 text-center">
              <span
                aria-hidden="true"
                className="blob absolute -right-16 -top-16 h-56 w-56 bg-white/10"
              />
              <div className="relative">
                <DrinkArt drink={preview} className="mx-auto h-60 w-auto" />
                <h3 className="mt-5 text-[22px] font-extrabold leading-tight tracking-tight text-white">
                  {base.name}
                </h3>
                <p className="mt-2 text-[13px] font-medium text-white/60">
                  {SIZES.find((s) => s.id === size)!.label} ·{" "}
                  {MILKS.find((m) => m.id === milk)!.label} · {sugar} sugar · {ice}
                </p>
                <p className="text-[13px] font-medium text-white/60">
                  {toppingOptions.find((t) => t.id === topping)?.label ?? "No topping"}
                </p>

                <div className="mt-6 rounded-2xl bg-white/10 p-5">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/50">
                    Your total
                  </p>
                  <p className="mt-1 text-4xl font-extrabold tracking-tight text-white">
                    {formatLKR(total)}
                  </p>
                  <p className="mt-2 text-[12px] font-bold text-punch">
                    Earns {points} Loyal-Tea points
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="space-y-7">
            <Field label="Choose your base">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {BASES.map((d) => (
                  <Choice key={d.id} active={baseId === d.id} onClick={() => setBaseId(d.id)}>
                    {d.name}
                  </Choice>
                ))}
              </div>
            </Field>

            <div className="grid gap-7 sm:grid-cols-2">
              <Field label="Size">
                <div className="flex gap-2">
                  {SIZES.map((s) => (
                    <Choice key={s.id} active={size === s.id} onClick={() => setSize(s.id)}>
                      {s.label}
                      <span className="mt-0.5 block text-[10px] font-bold opacity-55">
                        {s.note}
                      </span>
                    </Choice>
                  ))}
                </div>
              </Field>

              <Field label="Milk">
                <div className="flex flex-wrap gap-2">
                  {MILKS.map((m) => (
                    <Choice key={m.id} active={milk === m.id} onClick={() => setMilk(m.id)}>
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
                <Choice active={topping === "none"} onClick={() => setTopping("none")}>
                  None
                </Choice>
                {toppingOptions.map((t) => (
                  <Choice key={t.id} active={topping === t.id} onClick={() => setTopping(t.id)}>
                    {t.label}
                    <span className="mt-0.5 block text-[10px] font-bold opacity-55">
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-ink/40">
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
      className={`flex-1 rounded-2xl px-4 py-3 text-center text-[13px] font-extrabold leading-tight transition-all duration-200 sm:flex-none ${
        active
          ? "bg-grape text-white shadow-md shadow-grape/25"
          : "bg-white text-ink/60 hover:text-grape hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

/** Nudge a hex colour toward white to suggest a lighter, oat-based pour. */
function lighten(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (245 - c) * 0.22);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
