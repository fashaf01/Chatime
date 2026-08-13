"use client";

import DrinkArt from "./DrinkArt";
import Reveal from "./Reveal";
import { categories, drinks } from "@/lib/drinks";

/**
 * Category tiles — the browse-first entry point the Australian site leads with.
 * Each tile deep-links into the menu and pre-applies its filter, so the card is
 * a real shortcut rather than decoration.
 */
export default function Categories({
  onPick,
}: {
  onPick: (id: string) => void;
}) {
  return (
    <section id="drinks" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Our drinks</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            Pick your flavour.
          </h2>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {categories.map((c, i) => {
            const hero = drinks.find((d) => d.id === c.heroId)!;
            const count = drinks.filter((d) => d.category === c.id).length;
            return (
              <Reveal as="li" key={c.id} delay={i * 70}>
                <button
                  type="button"
                  onClick={() => onPick(c.id)}
                  className="group relative flex h-full w-full flex-col overflow-hidden rounded-3xl p-5 text-left transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:p-7"
                  style={{ backgroundColor: c.accent }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10"
                  />
                  <span className="relative text-[11px] font-extrabold uppercase tracking-[0.14em] text-white/60">
                    {count} drinks
                  </span>
                  <h3 className="relative mt-1 text-[clamp(1.1rem,2.4vw,1.6rem)] font-extrabold leading-tight tracking-tight text-white">
                    {c.label}
                  </h3>
                  <p className="relative mt-2 hidden text-[13px] font-medium leading-snug text-white/70 sm:block">
                    {c.tagline}
                  </p>

                  <span className="relative mt-auto flex items-end justify-between pt-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-2 text-[12px] font-extrabold text-white transition-colors group-hover:bg-white group-hover:text-ink">
                      View
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path
                          d="M3 8h10M9 4l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <DrinkArt
                      drink={hero}
                      className="h-24 w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110 sm:h-32"
                    />
                  </span>
                </button>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
