import Reveal from "./Reveal";

/** Counter feedback, lightly edited. Names are first-name-and-initial, the way
 *  they were left on the card at the till. */
const REVIEWS = [
  {
    quote:
      "The brown sugar pearls actually taste cooked, not bought. You can see the syrup running down the cup before you even get a straw in.",
    name: "Dilini P.",
    meta: "Havelock City · 6 visits",
    stars: 5,
  },
  {
    quote:
      "Asked for 30% sugar expecting the usual blank look. She just nodded and made it. First bubble tea in Colombo that lets me order it the way I drink it.",
    name: "Ruwan A.",
    meta: "Havelock City · 11 visits",
    stars: 5,
  },
  {
    quote:
      "The king coconut green tea has no business being this good. I have taken four separate people here just to make them try it.",
    name: "Fathima N.",
    meta: "Havelock City · 9 visits",
    stars: 5,
  },
];

const STATS = [
  { value: "4.8", label: "Average rating" },
  { value: "1,240", label: "Cups a week" },
  { value: "90s", label: "Average wait" },
];

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-4 w-4 ${i < n ? "text-mango" : "text-lilac"}`}
          aria-hidden="true"
        >
          <path
            d="M12 2 15 9l7 .6-5.3 4.6L18.3 21 12 17.3 5.7 21l1.6-6.8L2 9.6 9 9l3-7Z"
            fill="currentColor"
          />
        </svg>
      ))}
    </span>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="scroll-mt-28 bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-magenta">What people say</p>
            <h2 className="h-lg mt-3 text-[clamp(2.1rem,5vw,3.4rem)] text-grape text-balance">
              Worth the queue.
            </h2>
          </Reveal>

          <Reveal dir="right">
            <dl className="flex gap-8">
              {STATS.map((s) => (
                <div key={s.label}>
                  <dd className="h-md text-[clamp(1.6rem,3vw,2.1rem)] text-magenta">
                    {s.value}
                  </dd>
                  <dt className="mt-1 text-[11.5px] font-bold uppercase tracking-[0.1em] text-ink/40">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal as="li" key={r.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-[26px] bg-cream p-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:bg-lilac/60 hover:shadow-lift sm:p-8">
                <Stars n={r.stars} />
                <blockquote className="editorial mt-5 flex-1 text-[clamp(1.15rem,1.9vw,1.4rem)] leading-[1.35] text-grape text-pretty">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-7 border-t border-grape/10 pt-5">
                  <span className="block text-[14.5px] font-extrabold tracking-tight text-ink">
                    {r.name}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] font-medium text-ink/45">
                    {r.meta}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
