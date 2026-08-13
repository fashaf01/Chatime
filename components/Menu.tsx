"use client";

import { useMemo, useState } from "react";
import DrinkArt from "./DrinkArt";
import { categories, drinks, formatLKR, type CategoryId, type Drink } from "@/lib/drinks";

type Filter = CategoryId | "all";

const BADGE_STYLE: Record<string, string> = {
  signature: "bg-plum text-cream",
  bestseller: "bg-magenta text-cream",
  new: "bg-caramel text-ink",
  ceylon: "bg-leaf text-cream",
};

const BADGE_LABEL: Record<string, string> = {
  signature: "Signature",
  bestseller: "Best seller",
  new: "New",
  ceylon: "Sri Lanka only",
};

export default function Menu() {
  const [filter, setFilter] = useState<Filter>("all");

  const shown = useMemo(
    () => (filter === "all" ? drinks : drinks.filter((d) => d.category === filter)),
    [filter]
  );

  const activeCategory = categories.find((c) => c.id === filter);

  return (
    <section id="menu" className="scroll-mt-24 bg-sand/45 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-magenta">
            The Menu
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.08] text-plum text-balance">
            {drinks.length} ways to get it right.
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/65 text-pretty">
            Every drink is made when you order it. Prices shown are regular size —
            large is available on all of them.
          </p>
        </header>

        {/* filters */}
        <div
          className="mt-10 -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter drinks by category"
        >
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            <FilterChip
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label={`All (${drinks.length})`}
            />
            {categories.map((c) => {
              const n = drinks.filter((d) => d.category === c.id).length;
              return (
                <FilterChip
                  key={c.id}
                  active={filter === c.id}
                  onClick={() => setFilter(c.id)}
                  label={`${c.label} (${n})`}
                />
              );
            })}
          </div>
        </div>

        {activeCategory && (
          <p className="mt-6 font-display text-lg italic text-plum/70">
            {activeCategory.tagline}
          </p>
        )}

        {/* grid */}
        <ul
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          aria-live="polite"
        >
          {shown.map((d) => (
            <DrinkCard key={d.id} drink={d} />
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-ink/50">
          Allergens: milk, soy and tapioca are present in most drinks. Ask the
          counter — we keep a full allergen sheet at the till.
        </p>
      </div>
    </section>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-[13px] font-semibold transition-all duration-200 ${
        active
          ? "border-plum bg-plum text-cream shadow-md shadow-plum/20"
          : "border-clay bg-white/70 text-ink/70 hover:border-plum/40 hover:text-plum"
      }`}
    >
      {label}
    </button>
  );
}

function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-clay bg-white/80 transition-all duration-300 hover:-translate-y-1.5 hover:border-magenta/35 hover:shadow-2xl hover:shadow-plum/10">
      {drink.badge && (
        <span
          className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
            BADGE_STYLE[drink.badge]
          }`}
        >
          {BADGE_LABEL[drink.badge]}
        </span>
      )}

      <div className="relative flex h-52 items-center justify-center bg-gradient-to-b from-sand/70 to-transparent pt-4">
        <DrinkArt
          drink={drink}
          className="h-full w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-3">
        <h3 className="font-display text-[19px] font-bold leading-tight text-plum">
          {drink.name}
        </h3>
        <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-ink/58 text-pretty">
          {drink.blurb}
        </p>

        <div className="mt-4 flex items-end justify-between border-t border-clay/70 pt-4">
          <div>
            <p className="font-display text-xl font-bold text-plum">
              {formatLKR(drink.price)}
            </p>
            <p className="text-[11px] uppercase tracking-wider text-ink/40">
              Large {formatLKR(drink.priceLarge)}
            </p>
          </div>
          <div className="flex gap-1.5">
            {!drink.dairy && <Tag>Dairy-free</Tag>}
            {drink.caffeine === "none" && <Tag>Caffeine-free</Tag>}
            {drink.caffeine === "high" && <Tag>Strong</Tag>}
          </div>
        </div>
      </div>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-sand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink/55">
      {children}
    </span>
  );
}
