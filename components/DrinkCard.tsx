"use client";

import DrinkArt from "./DrinkArt";
import { stageTint } from "@/lib/color";
import { formatLKR, type Drink } from "@/lib/drinks";
import { useTilt } from "@/lib/motion";

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

/**
 * One product card.
 *
 * The stage behind each cup is tinted from that drink's own liquid colours, so
 * the grid reads as a palette instead of 31 identical grey wells, and the card
 * tilts a few degrees toward the pointer to give the flat vector art some
 * depth on hover.
 */
export default function DrinkCard({
  drink,
  size = "grid",
}: {
  drink: Drink;
  /** "rail" is the wider card used in the horizontal best-seller carousel. */
  size?: "grid" | "rail";
}) {
  const tilt = useTilt(6);
  const rail = size === "rail";

  return (
    <li
      className={`tilt-stage group ${
        rail ? "w-[248px] shrink-0 snap-start sm:w-[288px]" : ""
      }`}
    >
      <article
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        className="tilt sheen relative flex h-full flex-col overflow-hidden rounded-[26px] bg-white shadow-card transition-shadow duration-300 group-hover:shadow-lift"
      >
        {drink.badge && (
          <span
            className={`absolute left-3.5 top-3.5 z-10 rounded-full px-2.5 py-1 text-[9.5px] font-extrabold uppercase tracking-[0.1em] sm:text-[10px] ${
              BADGE_STYLE[drink.badge]
            }`}
          >
            {BADGE_LABEL[drink.badge]}
          </span>
        )}

        <div
          className={`relative flex items-center justify-center overflow-hidden ${
            rail ? "h-56" : "h-44 sm:h-52"
          }`}
          style={{ background: stageTint(drink.art.liquidTop, drink.art.liquidBottom) }}
        >
          {/* A pool of light under the cup, so it sits on the stage. */}
          <span
            aria-hidden="true"
            className="absolute bottom-4 h-6 w-3/5 rounded-[50%] bg-white/45 blur-md"
          />
          <DrinkArt
            drink={drink}
            className="relative h-full w-auto py-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 group-hover:scale-[1.07]"
          />
        </div>

        <div className={`flex flex-1 flex-col ${rail ? "p-5" : "p-4 sm:p-5"}`}>
          <h3 className="h-md text-[15.5px] text-grape sm:text-[17px]">
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

          <div className="mt-4 flex items-end justify-between gap-2 border-t border-lilac pt-3.5">
            <p>
              <span className="h-md block text-[19px] text-grape">
                {formatLKR(drink.price)}
              </span>
              <span className="mt-0.5 block text-[11px] font-bold text-ink/35">
                Large {formatLKR(drink.priceLarge)}
              </span>
            </p>
            <a
              href="#customise"
              aria-label={`Customise ${drink.name}`}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-grape transition-all duration-300 hover:bg-magenta hover:text-white"
            >
              <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </a>
          </div>
        </div>
      </article>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-mist px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-ink/45">
      {children}
    </span>
  );
}
