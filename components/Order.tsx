import Reveal from "./Reveal";

const ROUTES = [
  {
    title: "Walk in",
    lead: "Havelock City Mall, Level 2",
    body: "Order at the counter. Roughly 90 seconds a cup, longer when a pearl batch is still cooking.",
    cta: "Get directions",
    href: "https://www.google.com/maps/search/?api=1&query=Havelock+City+Mall+Colombo",
    external: true,
    accent: "bg-grape",
    note: "Loyal-Tea points earned",
  },
  {
    title: "PickMe Food",
    lead: "Delivery across Colombo",
    body: "Usually 25–40 minutes. Ice melts on the way, so order Less Ice if you are further than Rajagiriya.",
    cta: "Order on PickMe",
    href: "https://pickme.lk/",
    external: true,
    accent: "bg-mango",
    note: "Platform fees apply",
  },
  {
    title: "Uber Eats",
    lead: "Delivery across Colombo",
    body: "Same menu, same prices. Toppings and sugar level carry through to the store screen.",
    cta: "Order on Uber Eats",
    href: "https://www.ubereats.com/lk",
    external: true,
    accent: "bg-lime",
    note: "Platform fees apply",
  },
];

export default function Order() {
  return (
    <section id="order" className="scroll-mt-28 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Order</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            Three ways to get one.
          </h2>
        </header>

        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {ROUTES.map((r, i) => (
            <Reveal as="li" key={r.title} delay={i * 90}>
              <div className="flex h-full flex-col rounded-[26px] bg-white p-6 shadow-card transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:shadow-lift sm:p-8">
                <span
                  className={`inline-flex w-fit rounded-full ${r.accent} px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white`}
                >
                  {r.note}
                </span>
                <h3 className="h-md mt-4 text-[22px] text-grape">
                  {r.title}
                </h3>
                <p className="mt-1 text-[13px] font-extrabold uppercase tracking-wider text-ink/40">
                  {r.lead}
                </p>
                <p className="mt-4 flex-1 text-[14.5px] font-medium leading-relaxed text-ink/55 text-pretty">
                  {r.body}
                </p>
                <a
                  href={r.href}
                  target={r.external ? "_blank" : undefined}
                  rel={r.external ? "noopener noreferrer" : undefined}
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-grape px-6 py-3.5 text-[14px] font-extrabold text-white transition-all hover:bg-violet"
                >
                  {r.cta}
                  {r.external && (
                    <>
                      <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                        <path
                          d="M4 12L12 4M12 4H6M12 4v6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                </a>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
