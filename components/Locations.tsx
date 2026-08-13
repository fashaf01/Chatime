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
    <section id="find-us" className="scroll-mt-24 bg-sand/45 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-magenta">
            Find Us
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-bold leading-[1.08] text-plum text-balance">
            One store open. Two on the way.
          </h2>
        </header>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {STORES.map((s, i) => (
            <Reveal key={s.name} delay={i * 110}>
              <article
                className={`flex h-full flex-col rounded-2xl border p-7 transition-all duration-300 sm:p-8 ${
                  s.status === "open"
                    ? "border-plum/25 bg-white shadow-xl shadow-plum/8"
                    : "border-clay bg-white/50"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-2xl font-bold text-plum">
                    {s.name}
                  </h3>
                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      s.status === "open"
                        ? "bg-leaf text-cream"
                        : "bg-clay text-ink/55"
                    }`}
                  >
                    {s.status === "open" ? "Open now" : "Coming soon"}
                  </span>
                </div>

                <p className="mt-4 text-[15px] leading-relaxed text-ink/65">
                  {s.address}
                </p>

                <dl className="mt-5 space-y-2 border-t border-clay/70 pt-5 text-[14px]">
                  <div className="flex gap-3">
                    <dt className="w-16 shrink-0 text-ink/40">Hours</dt>
                    <dd className="text-ink/75">{s.hours}</dd>
                  </div>
                  {s.phone && (
                    <div className="flex gap-3">
                      <dt className="w-16 shrink-0 text-ink/40">Phone</dt>
                      <dd>
                        <a
                          href={`tel:${s.phone.replace(/\s/g, "")}`}
                          className="-my-2 inline-block py-2 text-plum underline decoration-clay underline-offset-4 transition-colors hover:decoration-magenta"
                        >
                          {s.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <p className="mt-5 flex-1 text-[13.5px] italic leading-relaxed text-ink/50">
                  {s.note}
                </p>

                {s.maps && (
                  <a
                    href={s.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-plum px-5 py-3 text-sm font-semibold text-cream transition-all hover:bg-grape hover:shadow-lg hover:shadow-plum/25"
                  >
                    Get directions
                    <svg
                      viewBox="0 0 16 16"
                      className="h-3.5 w-3.5"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M4 12L12 4M12 4H6M12 4v6"
                        stroke="currentColor"
                        strokeWidth="1.8"
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
        </div>
      </div>
    </section>
  );
}
