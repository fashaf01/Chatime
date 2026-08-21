"use client";

import DrinkArt from "./DrinkArt";
import { drinks, type Drink } from "@/lib/drinks";
import { useScrollSteps } from "@/lib/motion";

/**
 * How a cup gets made, pinned to the scroll.
 *
 * The section is four viewports tall with a sticky inner frame, so scrolling
 * advances the step rather than moving the panel. The cup on the right is the
 * same art engine used everywhere else, fed a different `art` block per step —
 * so the drink visibly builds as you read, with no extra assets.
 */

const base = (id: string) => drinks.find((d) => d.id === id)!;

const STEPS: { n: string; title: string; body: string; cup: Drink }[] = [
  {
    n: "01",
    title: "Brew",
    body: "Single-estate Ceylon leaf, brewed in small batches every two hours. Anything older than that goes down the sink, not into a cup.",
    cup: base("jasmine-green"),
  },
  {
    n: "02",
    title: "Shake",
    body: "Tea, milk and your sugar level go into the shaker cold and come out aerated. This is the step that makes it taste like Chatime and not like iced tea.",
    cup: { ...base("chatime-milk-tea"), art: { ...base("chatime-milk-tea").art, topping: "none" } },
  },
  {
    n: "03",
    title: "Pearls",
    body: "Tapioca is cooked every four hours and spooned in warm, so the pearls are still soft when they hit cold tea. Four hours is the whole window.",
    cup: base("chatime-milk-tea"),
  },
  {
    n: "04",
    title: "Seal",
    body: "Machine-sealed, never a snap-on lid, then the straw goes through. About ninety seconds from the till to your hand.",
    cup: base("brown-sugar-milk-tea"),
  },
];

export default function Process() {
  const { ref, step } = useScrollSteps<HTMLDivElement>(STEPS.length);

  return (
    <section
      id="process"
      aria-label="How a cup is made"
      className="scroll-mt-28 bg-plum"
    >
      {/* Four viewports of travel, one sticky frame. */}
      <div ref={ref} className="relative h-[280vh] lg:h-[400vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="gradient-pan absolute inset-0 bg-[linear-gradient(135deg,#2A0F3D_0%,#4A1F72_45%,#7B2E86_100%)]" />
            <div
              className="absolute right-[8%] top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full opacity-40 blur-[90px] transition-colors duration-700"
              style={{ backgroundColor: STEPS[step].cup.art.liquidTop }}
            />
          </div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="eyebrow text-punch">How it is made</p>
              <h2 className="h-lg mt-3 text-[clamp(2rem,4.4vw,3.2rem)] text-white text-balance">
                Ninety seconds,
                <br />
                <span className="editorial italic">four steps.</span>
              </h2>

              {/* All four stay mounted and crossfade, so the height never jumps
                  as the copy changes length. */}
              <div className="relative mt-9 h-[188px] sm:h-[164px]">
                {STEPS.map((s, i) => (
                  <div
                    key={s.n}
                    aria-hidden={i !== step}
                    className="absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      opacity: i === step ? 1 : 0,
                      transform: i === step ? "none" : "translateY(14px)",
                    }}
                  >
                    <p className="h-md text-[clamp(1.6rem,3vw,2.1rem)] text-punch">
                      {s.n} — {s.title}
                    </p>
                    <p className="mt-3 max-w-lg text-[16px] font-medium leading-relaxed text-white/65 text-pretty">
                      {s.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Step rail. The fill is driven by the CSS variable the hook
                  writes, so it tracks the scroll without a re-render. */}
              <ol className="mt-8 flex gap-2.5">
                {STEPS.map((s, i) => (
                  <li key={s.n} className="flex-1">
                    <span className="block h-[3px] overflow-hidden rounded-full bg-white/15">
                      <span
                        className="block h-full rounded-full bg-punch transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        style={{
                          transformOrigin: "left",
                          transform: `scaleX(${i <= step ? 1 : 0})`,
                        }}
                      />
                    </span>
                    <span
                      className={`mt-2 block text-[11px] font-extrabold uppercase tracking-[0.14em] transition-colors duration-300 ${
                        i <= step ? "text-white/70" : "text-white/25"
                      }`}
                    >
                      {s.title}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative mx-auto hidden aspect-[4/4.6] w-full max-w-[430px] lg:block">
              {STEPS.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={i !== step}
                  className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    opacity: i === step ? 1 : 0,
                    transform: i === step ? "none" : "translateY(22px) scale(0.94)",
                  }}
                >
                  <DrinkArt
                    drink={s.cup}
                    detail="hero"
                    className="float-y h-full w-full drop-shadow-[0_30px_50px_rgba(10,3,16,0.5)]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
