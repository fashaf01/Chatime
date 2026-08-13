"use client";

import { useDeferredValue, useMemo, useState } from "react";
import DrinkArt from "./DrinkArt";
import {
  categories,
  drinks,
  formatLKR,
  type CategoryId,
  type Drink,
} from "@/lib/drinks";

export type Filter = CategoryId | "all" | "bestsellers";

const BADGE_STYLE: Record<string, string> = {
  signature: "bg-grape text-white",
  bestseller: "bg-magenta text-white",
  new: "bg-mango text-ink",
  ceylon: "bg-lime text-white",
};

const BADGE_LABEL: Record<string, string> = {
  signature: "Signature",
  bestseller: "Best seller",
  new: "New",
  ceylon: "Sri Lanka only",
};

export default function Menu({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (f: Filter) => void;
}) {
  const [query, setQuery] = useState("");
  // Keeps typing responsive: the input updates every keystroke, the 31-card
  // grid re-filters at React's convenience.
  const deferredQuery = useDeferredValue(query);

  const shown = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return drinks.filter((d) => {
      if (filter === "bestsellers" && d.badge !== "bestseller") return false;
      if (filter !== "all" && filter !== "bestsellers" && d.category !== filter)
        return false;
      if (!q) return true;
      return (
        d.name.toLowerCase().includes(q) || d.blurb.toLowerCase().includes(q)
      );
    });
  }, [filter, deferredQuery]);

  const bestsellerCount = drinks.filter((d) => d.badge === "bestseller").length;

  return (
    <section id="menu" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-magenta">The full menu</p>
            <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape">
              All {drinks.length} drinks.
            </h2>
          </div>

          {/* Search — the AU site has none, which its own UX teardown called out. */}
          <div className="relative w-full sm:w-80">
            <label htmlFor="drink-search" className="sr-only">
              Search drinks
            </label>
            <svg
              viewBox="0 0 20 20"
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
              <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              id="drink-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search taro, mango, oat…"
              className="w-full rounded-full border-2 border-transparent bg-white py-3.5 pl-11 pr-4 text-[15px] font-semibold text-ink shadow-sm outline-none transition-colors placeholder:font-medium placeholder:text-ink/35 focus:border-magenta"
            />
          </div>
        </div>

        {/* filters */}
        <div
          className="mt-8 -mx-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0"
          role="group"
          aria-label="Filter drinks"
        >
          <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
            <Chip active={filter === "all"} onClick={() => setFilter("all")}>
              All {drinks.length}
            </Chip>
            <Chip
              active={filter === "bestsellers"}
              onClick={() => setFilter("bestsellers")}
            >
              ★ Best sellers {bestsellerCount}
            </Chip>
            {categories.map((c) => (
              <Chip
                key={c.id}
                active={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* grid */}
        {shown.length > 0 ? (
          <ul
            className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
            aria-live="polite"
          >
            {shown.map((d) => (
              <DrinkCard key={d.id} drink={d} />
            ))}
          </ul>
        ) : (
          <div className="mt-8 rounded-3xl bg-white py-16 text-center">
            <p className="text-lg font-extrabold text-grape">
              Nothing matches &ldquo;{query}&rdquo;
            </p>
            <p className="mt-2 text-[15px] font-medium text-ink/50">
              Try &ldquo;pearl&rdquo;, &ldquo;mango&rdquo; or &ldquo;oat&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
              className="mt-6 rounded-full bg-grape px-6 py-3 text-sm font-extrabold text-white transition-colors hover:bg-violet"
            >
              Clear search
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[13px] font-medium text-ink/45">
          Milk, soy and tapioca are present in most drinks. Full allergen sheet
          at the till.
        </p>
      </div>
    </section>
  );
}

function Chip({
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
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-[13.5px] font-extrabold transition-all duration-200 ${
        active
          ? "bg-grape text-white shadow-md shadow-grape/25"
          : "bg-white text-ink/60 hover:text-grape hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
}

function DrinkCard({ drink }: { drink: Drink }) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-3xl bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-grape/10">
      {drink.badge && (
        <span
          className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-wider sm:left-4 sm:top-4 sm:text-[10px] ${
            BADGE_STYLE[drink.badge]
          }`}
        >
          {BADGE_LABEL[drink.badge]}
        </span>
      )}

      <div className="relative flex h-40 items-center justify-center bg-lilac/45 sm:h-48">
        <DrinkArt
          drink={drink}
          className="h-full w-auto py-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-[15px] font-extrabold leading-tight tracking-tight text-grape sm:text-[17px]">
          {drink.name}
        </h3>
        <p className="mt-1.5 hidden flex-1 text-[13px] font-medium leading-relaxed text-ink/50 sm:block text-pretty">
          {drink.blurb}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {!drink.dairy && <Tag>Dairy-free</Tag>}
          {drink.caffeine === "none" && <Tag>No caffeine</Tag>}
          {drink.caffeine === "high" && <Tag>Strong</Tag>}
        </div>

        <div className="mt-3 flex items-baseline gap-2 border-t border-lilac pt-3">
          <p className="text-lg font-extrabold text-grape">
            {formatLKR(drink.price)}
          </p>
          <p className="text-[11px] font-bold text-ink/35">
            L {formatLKR(drink.priceLarge)}
          </p>
        </div>
      </div>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ink/50">
      {children}
    </span>
  );
}
