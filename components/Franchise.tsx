import Reveal from "./Reveal";

export default function Franchise() {
  return (
    <section id="franchise" className="scroll-mt-28 bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-[32px] px-7 py-12 sm:px-14 sm:py-16">
            <span
              aria-hidden="true"
              className="gradient-pan absolute inset-0 -z-10 bg-[linear-gradient(120deg,#B01560_0%,#E5187E_45%,#FF4DA6_100%)]"
            />
            <span
              aria-hidden="true"
              className="blob absolute -right-20 -top-24 h-72 w-72 bg-white/12"
            />
            <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="eyebrow text-white/65">Franchise</p>
                <h2 className="h-lg mt-3 max-w-xl text-[clamp(1.9rem,4.4vw,3rem)] text-white text-balance">
                  Bring Chatime to your city.
                </h2>
                <p className="mt-4 max-w-lg text-[16px] font-medium leading-relaxed text-white/80 text-pretty">
                  Territories are opening across Sri Lanka — Kandy, Galle,
                  Negombo and Jaffna. Training, supply chain and store design
                  come with it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href="mailto:franchise@chatime.lk?subject=Franchise%20enquiry"
                  className="rounded-full bg-white px-7 py-4 text-center text-[15px] font-extrabold text-magenta transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
                >
                  Request the pack
                </a>
                <a
                  href="mailto:careers@chatime.lk?subject=Careers"
                  className="rounded-full border-2 border-white/40 px-7 py-4 text-center text-[15px] font-extrabold text-white transition-all hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
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
