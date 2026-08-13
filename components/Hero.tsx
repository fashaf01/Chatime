import DrinkArt from "./DrinkArt";
import { drinks, toppingOptions } from "@/lib/drinks";

// Fixed values rather than Math.random(), so the server and client markup match.
const PEARLS = [
  { left: 6, size: 14, delay: 0, dur: 17 },
  { left: 14, size: 9, delay: 5.5, dur: 21 },
  { left: 23, size: 18, delay: 2.2, dur: 15 },
  { left: 33, size: 11, delay: 8.1, dur: 19 },
  { left: 44, size: 15, delay: 1.1, dur: 23 },
  { left: 55, size: 8, delay: 6.4, dur: 16 },
  { left: 64, size: 17, delay: 3.7, dur: 20 },
  { left: 74, size: 12, delay: 9.3, dur: 18 },
  { left: 83, size: 10, delay: 4.6, dur: 22 },
  { left: 92, size: 16, delay: 7.2, dur: 16 },
];

const featured = drinks.find((d) => d.id === "brown-sugar-milk-tea")!;

export default function Hero() {
  return (
    <section
      id="top"
      className="grain relative isolate overflow-hidden bg-plum pt-[var(--nav-h)]"
    >
      {/* depth wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 90% at 78% 8%, #8b3a9e 0%, transparent 55%), radial-gradient(90% 80% at 8% 95%, #7a2d8d 0%, transparent 58%), linear-gradient(165deg, #4c1d51 0%, #35143a 100%)",
        }}
      />

      {/* rising pearls */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {PEARLS.map((p, i) => (
          <span
            key={i}
            className="pearl-rise absolute bottom-0 rounded-full bg-caramel/45"
            style={{
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.dur}s`,
            }}
          />
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-28 lg:pt-20">
        {/* copy */}
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-caramel" />
            Now open · Havelock City Mall
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,7.5vw,4.9rem)] font-bold leading-[1.02] text-cream text-balance">
            Freshly brewed,
            <span className="block text-caramel">shaken to order.</span>
          </h1>

          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-cream/75 text-pretty">
            The world&apos;s bubble tea, finally in Colombo — and a Ceylon series
            you will not find in any other Chatime on earth. Tea leaf from up the
            hill, pearls cooked fresh every four hours.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#menu"
              className="rounded-full bg-cream px-7 py-3.5 text-sm font-semibold text-plum transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/25"
            >
              See the menu
            </a>
            <a
              href="#find-us"
              className="rounded-full border border-cream/35 px-7 py-3.5 text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:border-cream/70 hover:bg-cream/10"
            >
              Find the store
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-cream/15 pt-7">
            {[
              { n: String(drinks.length), l: "Drinks on menu" },
              { n: String(toppingOptions.length), l: "Fresh toppings" },
              { n: "4hr", l: "Pearl batches" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="font-display text-3xl font-bold text-caramel">
                  {s.n}
                </dt>
                <dd className="mt-1 text-[11px] uppercase tracking-wider text-cream/55">
                  {s.l}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* hero cup */}
        <div className="relative flex justify-center lg:justify-end">
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[min(78vw,420px)] w-[min(78vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-caramel/18 blur-3xl"
          />
          <DrinkArt
            drink={featured}
            priority
            className="float-soft relative w-[min(70vw,360px)] drop-shadow-2xl"
          />
        </div>
      </div>

      {/* curve into the next section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0">
        <svg viewBox="0 0 1440 80" className="block w-full" preserveAspectRatio="none">
          <path d="M0 80V34c240 32 480 46 720 40s480-26 720-56v62Z" fill="#fbf7f2" />
        </svg>
      </div>
    </section>
  );
}
