import Reveal from "./Reveal";
import { formatLKR, toppingOptions } from "@/lib/drinks";

/**
 * A section the Australian site does not have — its own UX teardown noted that
 * toppings are buried inside "All Flavours" with no category of their own.
 *
 * The toppings are shaded the same way they are inside a cup, so a pearl on
 * this page and a pearl in the product art are recognisably the same thing.
 */

type Look = {
  light: string;
  base: string;
  dark: string;
  cube?: boolean;
  note: string;
};

const LOOK: Record<string, Look> = {
  pearl: {
    light: "#8A6040",
    base: "#3B2416",
    dark: "#150903",
    note: "Cooked every 4 hours. The default, and the right answer.",
  },
  brownSugarPearl: {
    light: "#A06B28",
    base: "#4C2A11",
    dark: "#1B0A02",
    note: "Simmered in muscovado for three hours.",
  },
  grassJelly: {
    light: "#5C5266",
    base: "#24202A",
    dark: "#0B0810",
    cube: true,
    note: "Herbal, barely sweet, silky. Try it with sencha.",
  },
  pudding: {
    light: "#FFF3CB",
    base: "#F3CE68",
    dark: "#B9861F",
    cube: true,
    note: "Soft egg custard. Best in Hokkaido milk tea.",
  },
  aloe: {
    light: "#FFFFFF",
    base: "#E4F0D2",
    dark: "#A9C486",
    cube: true,
    note: "Cold and crunchy. Made for the fruit teas.",
  },
  popping: {
    light: "#FFC4B3",
    base: "#F27059",
    dark: "#A8331F",
    note: "Bursts with juice. Mango, lychee or passionfruit.",
  },
  redBean: {
    light: "#B0644F",
    base: "#712C24",
    dark: "#340C08",
    note: "Slow-simmered azuki. Goes with matcha, always.",
  },
};

/** Five of them, piled, lit from the upper left like the ones in the cup. */
function ToppingArt({ id, look }: { id: string; look: Look }) {
  const gid = `top-${id}`;
  const pieces = [
    { cx: 16, cy: 30, r: 9 },
    { cx: 34, cy: 32, r: 10 },
    { cx: 52, cy: 30, r: 9 },
    { cx: 25, cy: 16, r: 9.5 },
    { cx: 44, cy: 15, r: 9 },
  ];

  return (
    <svg viewBox="0 0 68 44" className="h-14 w-20" aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="0.33" cy="0.28" r="0.78">
          <stop offset="0%" stopColor={look.light} />
          <stop offset="42%" stopColor={look.base} />
          <stop offset="100%" stopColor={look.dark} />
        </radialGradient>
      </defs>
      {pieces.map((p, i) => (
        <g key={i}>
          <ellipse
            cx={p.cx}
            cy={p.cy + p.r * 0.72}
            rx={p.r * 0.82}
            ry={p.r * 0.3}
            fill="#180C20"
            opacity="0.16"
          />
          {look.cube ? (
            <g transform={`rotate(${i * 17 - 20} ${p.cx} ${p.cy})`}>
              <rect
                x={p.cx - p.r}
                y={p.cy - p.r}
                width={p.r * 2}
                height={p.r * 2}
                rx={p.r * 0.3}
                fill={`url(#${gid})`}
              />
              <rect
                x={p.cx - p.r * 0.6}
                y={p.cy - p.r * 0.64}
                width={p.r * 0.64}
                height={p.r * 0.4}
                rx={p.r * 0.16}
                fill="#ffffff"
                opacity="0.42"
              />
            </g>
          ) : (
            <>
              <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#${gid})`} />
              <ellipse
                cx={p.cx - p.r * 0.34}
                cy={p.cy - p.r * 0.42}
                rx={p.r * 0.3}
                ry={p.r * 0.2}
                fill="#ffffff"
                opacity="0.6"
                transform={`rotate(-28 ${p.cx - p.r * 0.34} ${p.cy - p.r * 0.42})`}
              />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Toppings() {
  return (
    <section id="toppings" className="scroll-mt-28 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <header className="max-w-2xl">
          <p className="eyebrow text-magenta">Toppings</p>
          <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
            Add something to chew on.
          </h2>
          <p className="mt-4 text-[16px] font-medium leading-relaxed text-ink/55 text-pretty">
            Any topping goes in any drink. Add as many as you like — we will not
            stop you.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {toppingOptions.map((t, i) => {
            const look = LOOK[t.id];
            return (
              <Reveal as="li" key={t.id} delay={i * 55}>
                <div className="group h-full rounded-[26px] bg-white p-5 shadow-card transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift sm:p-6">
                  <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-110">
                    <ToppingArt id={t.id} look={look} />
                  </span>

                  <h3 className="h-md mt-4 text-[16px] text-grape">{t.label}</h3>
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
              className="sheen flex h-full flex-col justify-between rounded-[26px] bg-[linear-gradient(150deg,#7B3FBF,#5C2D91_55%,#3A1A5E)] p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-lift sm:p-6"
            >
              <span className="h-md text-[17px] text-white">
                Build your own cup
              </span>
              <span className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-extrabold text-white/75">
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
