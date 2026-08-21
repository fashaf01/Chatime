"use client";

import { useDeferredValue, useMemo, useState } from "react";
import DrinkCard from "./DrinkCard";
import { categories, drinks, type CategoryId } from "@/lib/drinks";

export type Filter = CategoryId | "all" | "bestsellers";

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
    <section id="menu" className="scroll-mt-28 bg-mist pb-20 pt-16 sm:pb-28 sm:pt-20">
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
              className="w-full rounded-full border-2 border-transparent bg-white py-3.5 pl-11 pr-4 text-[15px] font-semibold text-ink shadow-card outline-none transition-colors placeholder:font-medium placeholder:text-ink/35 focus:border-magenta"
            />
          </div>
        </div>
      </div>

      {/* Filters stay reachable while you scroll a 31-card grid, which is the
          whole point of having them. */}
      <div className="sticky top-[var(--nav-h)] z-30 mt-8 bg-mist/85 py-3 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div
            className="no-bar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
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
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {shown.length > 0 ? (
          <ul
            className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4"
            aria-live="polite"
          >
            {shown.map((d) => (
              <DrinkCard key={d.id} drink={d} />
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-[26px] bg-white py-16 text-center shadow-card">
            <p className="h-md text-lg text-grape">
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

        <p className="mt-10 text-center text-[13px] font-medium text-ink/45">
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
          : "bg-white text-ink/55 shadow-card hover:text-grape"
      }`}
    >
      {children}
    </button>
  );
}
