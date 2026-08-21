"use client";

import DrinkArt from "./DrinkArt";
import Reveal from "./Reveal";
import { drinks } from "@/lib/drinks";
import { useParallax } from "@/lib/motion";

const CUP = drinks.find((d) => d.id === "ceylon-highland")!;

const PILLARS = [
  {
    n: "01",
    title: "Ceylon leaf, not imported dust",
    body: "Our black tea base is single-estate Dimbula, bought at the Colombo auction. The only Chatime on earth brewing on home-grown leaf.",
    accent: "text-lime",
  },
  {
    n: "02",
    title: "Pearls cooked every 4 hours",
    body: "Tapioca has a four-hour window before it turns. We bin what is past it — which is why the counter sometimes makes you wait.",
    accent: "text-mango",
  },
  {
    n: "03",
    title: "1,600 combinations",
    body: "Five sugar levels, four ice levels, seven toppings, three milks. Zero sugar is a real option, not an afterthought.",
    accent: "text-sky",
  },
];

export default function Story() {
  const cup = useParallax<HTMLDivElement>(0.22);

  return (
    <section id="story" className="relative isolate scroll-mt-28 overflow-hidden bg-cream py-20 sm:py-28">
      {/* A cup drifting behind the copy at a different rate to the page. */}
      <div
        ref={cup}
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-6 -z-10 hidden opacity-[0.13] lg:block"
      >
        <DrinkArt drink={CUP} className="h-[520px] w-auto" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12">
          <Reveal dir="left" className="max-w-2xl">
            <p className="eyebrow text-magenta">Why us</p>
            <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
              A global brand, brewed on{" "}
              <span className="editorial italic">Sri Lankan leaf.</span>
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-relaxed text-ink/55 text-pretty">
              Chatime has poured over a billion cups across 60 countries since
              2005. When it came to Colombo we did what no other market could:
              we swapped the base.
            </p>

            <p className="editorial mt-8 border-l-2 border-magenta pl-5 text-[clamp(1.2rem,2vw,1.5rem)] leading-snug text-grape">
              &ldquo;Same recipe, different leaf. It turns out the leaf was
              always the interesting part.&rdquo;
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-3 lg:gap-5">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 90} dir="scale">
                <div className="h-full rounded-[26px] bg-white p-6 shadow-card transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift sm:p-7">
                  <span className={`h-md text-3xl ${p.accent}`}>{p.n}</span>
                  <h3 className="h-md mt-3 text-[17px] text-grape">{p.title}</h3>
                  <p className="mt-2.5 text-[13.5px] font-medium leading-relaxed text-ink/55 text-pretty">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
