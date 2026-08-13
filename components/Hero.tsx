import DrinkArt from "./DrinkArt";
import { drinks } from "@/lib/drinks";

const featured = drinks.find((d) => d.id === "brown-sugar-milk-tea")!;

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-mist pt-[var(--nav-h)]">
      {/* colour blocking */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob absolute -right-24 -top-16 h-[560px] w-[560px] bg-violet/25" />
        <div className="blob spin-slow absolute -bottom-40 -left-32 h-[440px] w-[440px] bg-magenta/12" />
        <div className="absolute right-1/4 top-24 h-24 w-24 rounded-full bg-mango/30" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-lime/20 px-4 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-lime">
            <span className="h-2 w-2 rounded-full bg-lime" />
            Now open · Havelock City Mall
          </p>

          <h1 className="h-xl mt-6 text-[clamp(2.9rem,8.5vw,5.4rem)] text-grape text-balance">
            Bubble tea,
            <br />
            <span className="text-magenta">brewed fresh</span>
            <br />
            in Colombo.
          </h1>

          <p className="mt-6 max-w-md text-[17px] font-medium leading-relaxed text-ink/62 text-pretty">
            31 drinks, 7 toppings, 5 sugar levels — every cup shaken the moment
            you order it. Plus a Ceylon series you will not find in any other
            Chatime on earth.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#order"
              className="rounded-full bg-magenta px-8 py-4 text-[15px] font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-punch hover:shadow-xl hover:shadow-magenta/35"
            >
              Order now
            </a>
            <a
              href="#drinks"
              className="rounded-full border-2 border-grape/20 bg-white px-8 py-4 text-[15px] font-extrabold text-grape transition-all hover:-translate-y-0.5 hover:border-grape/40 hover:shadow-lg"
            >
              See all drinks
            </a>
          </div>

          <p className="mt-6 text-[13px] font-bold text-ink/40">
            Earn 10 Loyal-Tea points for every Rs 100 you spend.
          </p>
        </div>

        {/* Product. A square stage keeps the disc, the cup and the two chips
            in one composition instead of letting the disc bleed off-canvas. */}
        <div className="relative mx-auto aspect-square w-full max-w-[400px] sm:max-w-[440px]">
          <div
            aria-hidden="true"
            className="absolute inset-[6%] rounded-full bg-gradient-to-br from-violet to-magenta"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <DrinkArt
              drink={featured}
              priority
              className="bob h-[86%] w-auto drop-shadow-[0_24px_40px_rgba(27,16,34,0.3)]"
            />
          </div>

          <span className="pop-in absolute -left-1 top-[12%] rounded-2xl bg-white px-4 py-3 text-[13px] font-extrabold text-grape shadow-xl sm:left-0">
            50% off
            <span className="block text-[11px] font-bold text-ink/45">
              your first order
            </span>
          </span>
          <span
            className="pop-in absolute -right-1 bottom-[12%] rounded-2xl bg-white px-4 py-3 text-[13px] font-extrabold text-grape shadow-xl sm:right-0"
            style={{ animationDelay: "180ms" }}
          >
            Free tea
            <span className="block text-[11px] font-bold text-ink/45">
              on your birthday
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
