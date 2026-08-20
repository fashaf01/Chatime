"use client";

import DrinkArt from "./DrinkArt";
import Reveal from "./Reveal";
import { darken, lighten } from "@/lib/color";
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
    <section id="drinks" className="scroll-mt-28 bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Our drinks</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            Six ranges. <span className="editorial italic">Pick your flavour.</span>
          </h2>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {categories.map((c, i) => {
            const hero = drinks.find((d) => d.id === c.heroId)!;
            const count = drinks.filter((d) => d.category === c.id).length;
            return (
              <Reveal as="li" key={c.id} delay={i * 70} dir="scale">
                <button
                  type="button"
                  onClick={() => onPick(c.id)}
                  className="group sheen relative flex h-full w-full flex-col overflow-hidden rounded-[26px] p-5 text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-lift sm:p-7"
                  style={{
                    background: `linear-gradient(150deg, ${lighten(c.accent, 0.14)} 0%, ${c.accent} 55%, ${darken(c.accent, 0.24)} 100%)`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-125"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(0,0,0,0.22),transparent)]"
                  />

                  <span className="relative text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-white/55">
                    {count} drinks
                  </span>
                  <h3 className="h-md relative mt-1.5 text-[clamp(1.1rem,2.4vw,1.6rem)] text-white">
                    {c.label}
                  </h3>
                  <p className="relative mt-2 hidden text-[13px] font-medium leading-snug text-white/70 sm:block">
                    {c.tagline}
                  </p>

                  <span className="relative mt-auto flex items-end justify-between pt-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-2.5 text-[12px] font-extrabold text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                      View range
                      <svg viewBox="0 0 16 16" className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" aria-hidden="true">
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
                      className="-mb-9 -mr-3 h-32 w-auto drop-shadow-[0_16px_22px_rgba(0,0,0,0.32)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:-rotate-[7deg] group-hover:scale-110 sm:h-44"
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
