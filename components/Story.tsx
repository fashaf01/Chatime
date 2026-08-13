import Reveal from "./Reveal";

const PILLARS = [
  {
    k: "01",
    title: "Ceylon leaf, not imported dust",
    body: "Our black tea base is single-estate Dimbula, bought at the Colombo auction like everyone else in this country has done for 150 years. It is the only Chatime in the world brewing on home-grown leaf.",
  },
  {
    k: "02",
    title: "Pearls cooked every four hours",
    body: "Tapioca has a 4-hour window before it turns. We bin what is past it. That is why the counter sometimes makes you wait ninety seconds — the batch is still in the pot.",
  },
  {
    k: "03",
    title: "Your cup, your rules",
    body: "Five sugar levels, four ice levels, seven toppings, three milks. Roughly 1,600 combinations before you have even picked a tea. Zero sugar is a real option and it is not an afterthought.",
  },
];

export default function Story() {
  return (
    <section id="story" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-magenta">
              Our Story
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.08] text-plum text-balance">
              A global tea brand, brewed on Sri Lankan leaf.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ink/65 text-pretty">
              Chatime has poured more than a billion cups across 60 countries
              since 2005. When it came to Colombo we did something none of the
              other markets could: we swapped the base.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink/65 text-pretty">
              The tea in your cup was grown a few hours up the A5. That is not a
              marketing line — it is the reason our milk tea tastes brisker than
              the one you had in Melbourne or Singapore.
            </p>

            <div className="mt-10 rounded-2xl border border-clay bg-sand/60 p-6">
              <p className="font-display text-lg italic leading-snug text-plum">
                &ldquo;We are the only market allowed to run a local tea
                series. We did not waste it.&rdquo;
              </p>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-wider text-ink/45">
                Store Team · Havelock City
              </p>
            </div>
          </Reveal>

          <div className="space-y-5">
            {PILLARS.map((p, i) => (
              <Reveal key={p.k} delay={i * 110}>
                <article className="group rounded-2xl border border-clay bg-white/70 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-magenta/35 hover:shadow-xl hover:shadow-plum/8 sm:p-9">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-3xl font-bold text-clay transition-colors duration-300 group-hover:text-magenta">
                      {p.k}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold text-plum sm:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-ink/62 text-pretty">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
