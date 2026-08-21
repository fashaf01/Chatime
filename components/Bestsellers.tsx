"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import DrinkCard from "./DrinkCard";
import Reveal from "./Reveal";
import { drinks } from "@/lib/drinks";

/**
 * Horizontal best-seller rail.
 *
 * Scroll-snapped rather than a stepping carousel: a flick on a phone and a
 * drag on a trackpad both do the obvious thing, and the arrows are a desktop
 * convenience on top rather than the only way through.
 */

const PICKS = [
  "brown-sugar-pearl",
  "taro-milk-tea",
  "mango-green-tea",
  "grass-jelly-sencha",
  "chatime-milk-tea",
  "king-coconut",
  "matcha-crema",
  "wildberry",
].map((id) => drinks.find((d) => d.id === id)!);

export default function Bestsellers() {
  const rail = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    // Move by whole cards, so a nudge never leaves a sliver showing.
    const card = el.querySelector("li");
    const width = card ? card.getBoundingClientRect().width + 16 : 300;
    el.scrollBy({
      left: dir * width * 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  };

  return (
    <section className="overflow-hidden bg-cream pb-6 pt-20 sm:pt-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <Reveal>
            <p className="eyebrow text-magenta">Ordered most this month</p>
            <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
              The ones people come back for.
            </h2>
          </Reveal>

          <div className="hidden gap-2 md:flex">
            <Arrow dir={-1} onClick={() => step(-1)} disabled={atStart} />
            <Arrow dir={1} onClick={() => step(1)} disabled={atEnd} />
          </div>
        </div>
      </div>

      {/* The rail is padded to line the first card up with the container, then
          bleeds past both edges so cards can scroll off-screen. */}
      <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
        <ul
          ref={rail}
          className="no-bar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 sm:-mx-8 sm:px-8"
        >
          {PICKS.map((d) => (
            <DrinkCard key={d.id} drink={d} size="rail" />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Arrow({
  dir,
  onClick,
  disabled,
}: {
  dir: 1 | -1;
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? "Next drinks" : "Previous drinks"}
      className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-lilac text-grape transition-all duration-300 hover:border-grape hover:bg-grape hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
        <path
          d={dir === 1 ? "M3 8h10M9 4l4 4-4 4" : "M13 8H3M7 4L3 8l4 4"}
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
