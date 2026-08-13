import Reveal from "./Reveal";

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
  return (
    <section id="story" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow text-magenta">Why us</p>
            <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
              A global brand, brewed on Sri Lankan leaf.
            </h2>
            <p className="mt-5 text-[16px] font-medium leading-relaxed text-ink/60 text-pretty">
              Chatime has poured over a billion cups across 60 countries since
              2005. When it came to Colombo we did what no other market could:
              we swapped the base.
            </p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 90}>
                <div className="h-full rounded-3xl bg-mist p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-lilac sm:p-7">
                  <span className={`text-3xl font-extrabold ${p.accent}`}>{p.n}</span>
                  <h3 className="mt-3 text-[17px] font-extrabold leading-tight tracking-tight text-grape">
                    {p.title}
                  </h3>
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
