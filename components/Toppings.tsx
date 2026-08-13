import Reveal from "./Reveal";
import { formatLKR, toppingOptions } from "@/lib/drinks";

/**
 * A section the Australian site does not have — its own UX teardown noted that
 * toppings are buried inside "All Flavours" with no category of their own.
 */

const LOOK: Record<string, { fill: string; stroke: string; square?: boolean; note: string }> = {
  pearl: { fill: "#3A2418", stroke: "#241009", note: "Cooked every 4 hours. The default, and the right answer." },
  brownSugarPearl: { fill: "#4A2A12", stroke: "#2B1607", note: "Simmered in muscovado for three hours." },
  grassJelly: { fill: "#241F26", stroke: "#120F14", square: true, note: "Herbal, barely sweet, silky. Try it with sencha." },
  pudding: { fill: "#F2CE6B", stroke: "#D2A73F", square: true, note: "Soft egg custard. Best in Hokkaido milk tea." },
  aloe: { fill: "#E8F2D8", stroke: "#C3D9A6", square: true, note: "Cold and crunchy. Made for the fruit teas." },
  popping: { fill: "#F2725C", stroke: "#C9503C", note: "Bursts with juice. Mango, lychee or passionfruit." },
  redBean: { fill: "#6E2B24", stroke: "#471813", note: "Slow-simmered azuki. Goes with matcha, always." },
};

export default function Toppings() {
  return (
    <section id="toppings" className="scroll-mt-24 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Toppings</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            Add something to chew on.
          </h2>
          <p className="mt-4 text-[16px] font-medium leading-relaxed text-ink/60 text-pretty">
            Any topping goes in any drink. Add as many as you like — we will not
            stop you.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {toppingOptions.map((t, i) => {
            const look = LOOK[t.id];
            return (
              <Reveal as="li" key={t.id} delay={i * 55}>
                <div className="group h-full rounded-3xl bg-mist p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-lilac sm:p-6">
                  <svg
                    viewBox="0 0 60 40"
                    className="h-12 w-16 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    aria-hidden="true"
                  >
                    {[
                      [14, 26],
                      [30, 28],
                      [46, 26],
                      [22, 14],
                      [38, 14],
                    ].map(([cx, cy], n) =>
                      look.square ? (
                        <rect
                          key={n}
                          x={cx - 7}
                          y={cy - 7}
                          width="14"
                          height="14"
                          rx="3"
                          fill={look.fill}
                          stroke={look.stroke}
                          strokeWidth="1.4"
                          transform={`rotate(${n * 17} ${cx} ${cy})`}
                        />
                      ) : (
                        <circle
                          key={n}
                          cx={cx}
                          cy={cy}
                          r="7"
                          fill={look.fill}
                          stroke={look.stroke}
                          strokeWidth="1.4"
                        />
                      )
                    )}
                  </svg>

                  <h3 className="mt-4 text-[16px] font-extrabold leading-tight tracking-tight text-grape">
                    {t.label}
                  </h3>
                  <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-ink/50 text-pretty">
                    {look.note}
                  </p>
                  <p className="mt-3 text-[14px] font-extrabold text-magenta">
                    + {formatLKR(t.price)}
                  </p>
                </div>
              </Reveal>
            );
          })}

          <Reveal as="li" delay={toppingOptions.length * 55}>
            <a
              href="#customise"
              className="flex h-full flex-col justify-between rounded-3xl bg-grape p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-violet sm:p-6"
            >
              <span className="text-[16px] font-extrabold leading-tight tracking-tight text-white">
                Build your own cup
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-white/75">
                Open the builder
                <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden="true">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
