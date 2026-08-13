const ITEMS = [
  "Brewed fresh every 2 hours",
  "Hand-cooked brown sugar pearls",
  "Ceylon leaf, grown here",
  "5 sugar levels",
  "Oat milk available",
  "Shaken, never stirred",
  "No powder, no shortcuts",
];

export default function Marquee() {
  return (
    <div
      className="relative flex overflow-hidden border-y border-clay/70 bg-sand py-4"
      role="presentation"
    >
      {/* The track holds the list twice and shifts by exactly -50%, so the loop
          is seamless. aria-hidden on the duplicate keeps it out of the a11y
          tree instead of reading every phrase to a screen reader twice. */}
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {ITEMS.map((t) => (
          <Item key={t} text={t} />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="marquee-track flex shrink-0 items-center gap-10 pr-10"
      >
        {ITEMS.map((t) => (
          <Item key={t} text={t} />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-sand to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-sand to-transparent"
      />
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <span className="flex shrink-0 items-center gap-10">
      <span className="whitespace-nowrap text-[13px] font-semibold uppercase tracking-[0.16em] text-plum/75">
        {text}
      </span>
      <svg viewBox="0 0 12 12" className="h-2 w-2 shrink-0" aria-hidden="true">
        <circle cx="6" cy="6" r="6" fill="#c2853c" />
      </svg>
    </span>
  );
}
