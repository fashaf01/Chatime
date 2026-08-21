import Reveal from "./Reveal";

/** Loyal-Tea — the loyalty scheme the Australian site is built around, with
 *  the points maths converted to rupees. */

const PERKS = [
  {
    icon: "M12 2 3 7v6c0 5 3.8 8.6 9 9.9 5.2-1.3 9-4.9 9-9.9V7l-9-5Z",
    title: "10 points per Rs 100",
    body: "Every 1,000 points is Rs 100 off. No cards to carry, no expiry games.",
    accent: "bg-grape",
  },
  {
    icon: "M12 21s-7.5-4.6-9.3-9.2C1.3 8.2 3.4 5 6.8 5c2 0 3.6 1.1 4.4 2.6h1.6C13.6 6.1 15.2 5 17.2 5c3.4 0 5.5 3.2 4.1 6.8C19.5 16.4 12 21 12 21Z",
    title: "Free tea on your birthday",
    body: "A voucher lands three days before. Any drink, any size, our shout.",
    accent: "bg-magenta",
  },
  {
    icon: "M12 2 15 9l7 .6-5.3 4.6L18.3 21 12 17.3 5.7 21l1.6-6.8L2 9.6 9 9l3-7Z",
    title: "50% off your first order",
    body: "Sign up, verify your number, and the discount applies at the counter.",
    accent: "bg-mango",
  },
  {
    icon: "M16 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-8 2a3 3 0 1 0-3-3 3 3 0 0 0 3 3Zm0 2c-2.7 0-8 1.3-8 4v3h9v-3c0-1.1.5-2.3 1.4-3.2A13 13 0 0 0 8 15Zm8 0c-3 0-9 1.5-9 4.5V22h18v-2.5c0-3-6-4.5-9-4.5Z",
    title: "Refer a friend, get 1,000",
    body: "They get their first drink half price. You get 1,000 points.",
    accent: "bg-lime",
  },
];

export default function Rewards() {
  return (
    <section
      id="rewards"
      className="relative isolate scroll-mt-28 overflow-hidden bg-grape py-20 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="gradient-pan absolute inset-0 bg-[linear-gradient(135deg,#3A1A5E_0%,#5C2D91_48%,#7B3FBF_100%)]" />
        <div className="blob spin-slow absolute -right-32 -top-32 h-[420px] w-[420px] bg-white/7" />
        <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-magenta/25 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow text-punch">Loyal-Tea Club</p>
            <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-white text-balance">
              Drink tea.
              <br />
              Get tea free.
            </h2>
            <p className="mt-5 max-w-md text-[16px] font-medium leading-relaxed text-white/70 text-pretty">
              Join at the counter in about thirty seconds. Points start counting
              from the same visit — including the one where you sign up.
            </p>

            <div className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-white/50">
                Worked example
              </p>
              <p className="mt-3 text-[15px] font-medium leading-relaxed text-white/80">
                A brown sugar pearl milk tea is{" "}
                <strong className="font-extrabold text-white">Rs 1,350</strong>,
                so it earns{" "}
                <strong className="font-extrabold text-punch">135 points</strong>.
                Eight of those and you have{" "}
                <strong className="font-extrabold text-punch">Rs 108</strong> off
                the next one.
              </p>
            </div>

            <a
              href="#find-us"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-[15px] font-extrabold text-grape transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/25"
            >
              Join in store
            </a>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {PERKS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 80}>
                <div className="h-full rounded-3xl bg-white/8 p-6 ring-1 ring-white/12 transition-colors duration-300 hover:bg-white/14">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${p.accent}`}
                  >
                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                      <path d={p.icon} fill="#fff" />
                    </svg>
                  </span>
                  <h3 className="h-md mt-4 text-[17px] text-white">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[13.5px] font-medium leading-relaxed text-white/60 text-pretty">
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
