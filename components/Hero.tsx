"use client";

import { useMemo, useState } from "react";
import DrinkArt from "./DrinkArt";
import { drinks, formatLKR } from "@/lib/drinks";
import { useAutoAdvance, useCountUp, useParallax } from "@/lib/motion";

/**
 * Hero showcase.
 *
 * A dark stage was the single biggest change here: the cup art is pale PET and
 * bright liquid, so it reads as lit product against plum and merely as a
 * drawing against white. Four drinks rotate through the stage on a timer that
 * pauses on hover and restarts whenever someone picks one themselves.
 */

const FEATURED = [
  { id: "brown-sugar-milk-tea", tag: "Most ordered", glow: "#C9752B" },
  { id: "chatime-milk-tea", tag: "The original", glow: "#B98A63" },
  { id: "king-coconut", tag: "Sri Lanka only", glow: "#8FBF5A" },
  { id: "mango-green-tea", tag: "Cold-shaken", glow: "#F2A63B" },
].map((f) => ({ ...f, drink: drinks.find((d) => d.id === f.id)! }));

const SLIDE_MS = 6000;

/** Deterministic bubble field — no Math.random, so SSR and client agree. */
const BUBBLES = Array.from({ length: 14 }, (_, i) => {
  const t = (i * 2654435761) % 1000;
  return {
    left: 4 + ((t * 7) % 92),
    size: 8 + ((t * 13) % 26),
    duration: 16 + ((t * 3) % 14),
    delay: -((t * 11) % 20),
    drift: ((t * 17) % 80) - 40,
    opacity: 0.12 + ((t * 5) % 22) / 100,
  };
});

export default function Hero() {
  const [paused, setPaused] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [active, setActive] = useAutoAdvance(
    FEATURED.length,
    SLIDE_MS,
    paused,
    restartKey
  );

  const glowLayer = useParallax<HTMLDivElement>(-0.12);
  const current = FEATURED[active];

  const pick = (i: number) => {
    setActive(i);
    setRestartKey((k) => k + 1);
  };

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-plum pt-[calc(var(--bar-h)+var(--nav-h))]"
    >
      {/* ------------------------------------------------------------ ground */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="gradient-pan absolute inset-0 bg-[linear-gradient(125deg,#2A0F3D_0%,#4A1F72_38%,#7B2E86_66%,#2A0F3D_100%)]" />
        {/* A wash of the featured drink's own colour, so the stage changes
            temperature with the product standing on it. */}
        <div
          ref={glowLayer}
          className="absolute -right-40 top-0 h-[820px] w-[820px] rounded-full opacity-45 blur-[90px] transition-[background-color] duration-1000"
          style={{ backgroundColor: current.glow }}
        />
        <div className="absolute -left-32 bottom-0 h-[560px] w-[560px] rounded-full bg-magenta/25 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,255,255,0.14),transparent_60%)]" />
      </div>

      {/* Tapioca drifting up the stage. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="bubble absolute bottom-[-12%] rounded-full bg-white"
            style={
              {
                left: `${b.left}%`,
                width: b.size,
                height: b.size,
                "--bubble-duration": `${b.duration}s`,
                "--bubble-delay": `${b.delay}s`,
                "--bubble-drift": `${b.drift}px`,
                "--bubble-opacity": b.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-14 pt-8 sm:px-8 sm:pb-16 sm:pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-6 lg:pb-24 lg:pt-16">
        {/* ------------------------------------------------------------ copy */}
        <div className="relative z-10">
          <p className="enter inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 text-[11.5px] font-extrabold uppercase tracking-[0.16em] text-white ring-1 ring-white/15 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-lime" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Now open · Havelock City Mall
          </p>

          <h1 className="enter h-xl mt-5 text-[clamp(2.6rem,8.4vw,5.6rem)] text-white text-balance sm:mt-6"
            style={{ animationDelay: "90ms" }}>
            Bubble tea,
            <br />
            <span className="text-gradient">brewed fresh</span>
            <br />
            in Colombo.
          </h1>

          <p
            className="enter mt-5 max-w-md text-[16px] font-medium leading-relaxed text-white/65 text-pretty sm:mt-6 sm:text-[17px]"
            style={{ animationDelay: "180ms" }}
          >
            Every cup shaken the moment you order it — real leaf, hand-cooked
            pearls, and a Ceylon series you will not find in any other Chatime
            on earth.
          </p>

          <div
            className="enter mt-7 flex flex-wrap items-center gap-3 sm:mt-9"
            style={{ animationDelay: "270ms" }}
          >
            <a
              href="#order"
              className="group inline-flex items-center gap-2 rounded-full bg-magenta px-8 py-4 text-[15px] font-extrabold text-white shadow-glow transition-all duration-300 hover:-translate-y-1 hover:bg-punch"
            >
              Order now
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#drinks"
              className="rounded-full bg-white/10 px-8 py-4 text-[15px] font-extrabold text-white ring-1 ring-white/20 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/18"
            >
              See all drinks
            </a>
          </div>

          {/* Counters, so the range lands as a fact rather than a claim. */}
          <dl
            className="enter mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/12 pt-6 sm:mt-11 sm:pt-7"
            style={{ animationDelay: "360ms" }}
          >
            <Stat value={drinks.length} label="Drinks" />
            <Stat value={7} label="Toppings" />
            <Stat value={1600} label="Combinations" />
          </dl>
        </div>

        {/* --------------------------------------------------------- product */}
        <div
          className="relative z-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="enter relative mx-auto aspect-[4/4.9] w-full max-w-[460px]"
            style={{ animationDelay: "150ms" }}
          >
            {/* halo */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-[42%] h-[70%] w-[76%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[60px] transition-colors duration-1000"
              style={{ backgroundColor: current.glow }}
            />
            <div
              aria-hidden="true"
              className="spin-slow absolute left-1/2 top-[42%] h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20"
            />

            {/* Every slide stays mounted and crossfades, so switching drinks
                never costs a re-render of the whole cup. */}
            {FEATURED.map((f, i) => {
              const on = i === active;
              return (
                <div
                  key={f.id}
                  aria-hidden={!on}
                  className="absolute inset-x-0 top-0 bottom-[78px] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: on ? 1 : 0,
                    transform: on ? "none" : "translateY(26px) scale(0.92)",
                    pointerEvents: on ? "auto" : "none",
                  }}
                >
                  <div className="float-y h-full w-full">
                    <DrinkArt
                      drink={f.drink}
                      detail="hero"
                      priority={i === 0}
                      className="h-full w-full drop-shadow-[0_30px_50px_rgba(10,3,16,0.55)]"
                    />
                  </div>
                </div>
              );
            })}

            {/* Now showing. Sits along the foot of the stage so it crosses the
                base of the cup rather than the drink itself. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 rounded-2xl bg-white/95 px-5 py-3.5 shadow-lift backdrop-blur">
              <span className="min-w-0">
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-magenta">
                  {current.tag}
                </span>
                <span className="h-md mt-0.5 block truncate text-[16px] text-grape">
                  {current.drink.name}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-ink/35">
                  from
                </span>
                <span className="h-md block text-[17px] text-grape">
                  {formatLKR(current.drink.price)}
                </span>
              </span>
            </div>
          </div>

          {/* ------------------------------------------------------ selector */}
          <div className="mx-auto mt-6 flex max-w-[440px] gap-2.5">
            {FEATURED.map((f, i) => {
              const on = i === active;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => pick(i)}
                  aria-label={`Show ${f.drink.name}`}
                  aria-current={on}
                  className={`group relative flex-1 overflow-hidden rounded-2xl px-2 pb-3 pt-2 text-left transition-all duration-300 ${
                    on
                      ? "bg-white/16 ring-1 ring-white/30"
                      : "bg-white/6 hover:bg-white/12"
                  }`}
                >
                  <DrinkArt
                    drink={f.drink}
                    className={`mx-auto h-12 w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      on ? "scale-110" : "group-hover:scale-105"
                    }`}
                  />
                  {/* Progress doubles as the active indicator. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-2 bottom-1.5 h-[3px] overflow-hidden rounded-full bg-white/15"
                  >
                    {on && (
                      <span
                        key={`${restartKey}-${active}`}
                        className={`block h-full rounded-full bg-punch ${
                          paused ? "" : "bar-fill"
                        }`}
                        style={
                          {
                            "--bar-duration": `${SLIDE_MS}ms`,
                            ...(paused ? { transform: "scaleX(1)" } : null),
                          } as React.CSSProperties
                        }
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Curved cut into the section below, so the dark stage ends deliberately. */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="relative block h-[46px] w-full sm:h-[70px]"
      >
        <path d="M0 90V38c240 34 480 50 720 50s480-16 720-50v52Z" fill="#ffffff" />
      </svg>
    </section>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  const { ref, value: shown } = useCountUp(value);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="h-md block text-[clamp(1.6rem,3.4vw,2.2rem)] text-white">
          {shown.toLocaleString("en-LK")}
        </span>
        <span className="mt-1 block text-[11.5px] font-bold leading-tight text-white/45">
          {label}
        </span>
      </dd>
    </div>
  );
}
