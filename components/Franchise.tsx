import Reveal from "./Reveal";

export default function Franchise() {
  return (
    <section id="franchise" className="scroll-mt-24 bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="grain relative overflow-hidden rounded-3xl bg-leaf px-7 py-14 sm:px-14 sm:py-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 90% at 85% 15%, #6b8f52 0%, transparent 60%)",
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-cream/70">
                  Franchise
                </p>
                <h2 className="mt-4 max-w-xl font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-[1.1] text-cream text-balance">
                  Bring Chatime to your city.
                </h2>
                <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-cream/75 text-pretty">
                  We are opening territories across Sri Lanka — Kandy, Galle,
                  Negombo and Jaffna. Full training, supply chain and store
                  design come with it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:franchise@chatime.lk?subject=Franchise%20enquiry"
                  className="rounded-full bg-cream px-7 py-4 text-center text-sm font-semibold text-leaf transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-xl hover:shadow-black/20"
                >
                  Request the pack
                </a>
                <a
                  href="mailto:careers@chatime.lk?subject=Careers"
                  className="rounded-full border border-cream/35 px-7 py-4 text-center text-sm font-semibold text-cream transition-all hover:-translate-y-0.5 hover:border-cream/70 hover:bg-cream/10"
                >
                  We&apos;re hiring
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
