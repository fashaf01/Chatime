import Reveal from "./Reveal";

const STORES = [
  {
    name: "Havelock City Mall",
    status: "open" as const,
    address: "Level 2, Havelock City Mall, 40 Lauries Road, Colombo 05",
    hours: "10:00 — 22:00, every day",
    phone: "+94 76 000 0000",
    maps: "https://www.google.com/maps/search/?api=1&query=Havelock+City+Mall+Colombo",
    note: "Flagship store. Full menu including the Ceylon series.",
  },
  {
    name: "One Galle Face",
    status: "soon" as const,
    address: "Colombo 02",
    hours: "Opening 2026",
    note: "Second store, currently fitting out.",
  },
  {
    name: "Kandy City Centre",
    status: "soon" as const,
    address: "Kandy",
    hours: "In planning",
    note: "Hill country store, closest to the estates.",
  },
];

export default function Locations() {
  return (
    <section id="find-us" className="scroll-mt-28 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Stores</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            One open. Two on the way.
          </h2>
        </header>

        <ul className="mt-10 grid gap-4 lg:grid-cols-3">
          {STORES.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 90}>
              <article
                className={`flex h-full flex-col rounded-[26px] p-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 sm:p-8 ${
                  s.status === "open"
                    ? "bg-white shadow-lift ring-1 ring-lilac"
                    : "bg-mist"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="h-md text-[22px] text-grape">
                    {s.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider ${
                      s.status === "open" ? "bg-lime text-white" : "bg-lilac text-ink/45"
                    }`}
                  >
                    {s.status === "open" ? "Open now" : "Coming soon"}
                  </span>
                </div>

                <p className="mt-3 text-[14.5px] font-medium leading-relaxed text-ink/55">
                  {s.address}
                </p>

                <dl className="mt-5 space-y-1 border-t border-lilac pt-4 text-[14px]">
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 font-bold text-ink/35">Hours</dt>
                    <dd className="font-semibold text-ink/70">{s.hours}</dd>
                  </div>
                  {s.phone && (
                    <div className="flex items-center gap-3">
                      <dt className="w-16 shrink-0 font-bold text-ink/35">Phone</dt>
                      <dd>
                        <a
                          href={`tel:${s.phone.replace(/\s/g, "")}`}
                          className="-my-1 inline-block py-2 font-bold text-magenta hover:underline"
                        >
                          {s.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <p className="mt-4 flex-1 text-[13px] font-medium leading-relaxed text-ink/45">
                  {s.note}
                </p>

                {s.maps && (
                  <a
                    href={s.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-grape px-6 py-3.5 text-[14px] font-extrabold text-white transition-all hover:bg-violet"
                  >
                    Get directions
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
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
