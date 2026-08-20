const ITEMS = [
  "Brewed fresh every 2 hours",
  "Hand-cooked brown sugar pearls",
  "Ceylon leaf, grown here",
  "5 sugar levels",
  "Oat milk available",
  "No powder, no shortcuts",
];

export default function Marquee() {
  return (
    <div
      className="marquee relative flex overflow-hidden bg-[linear-gradient(90deg,#E5187E,#FF4DA6_45%,#E5187E)] py-4"
      role="presentation"
    >
      {/* The list is rendered twice and the track shifts exactly -50%, so the
          loop is seamless. The duplicate is aria-hidden so a screen reader does
          not hear every phrase twice. */}
      <div className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {ITEMS.map((t) => (
          <Item key={t} text={t} />
        ))}
      </div>
      <div aria-hidden="true" className="marquee-track flex shrink-0 items-center gap-10 pr-10">
        {ITEMS.map((t) => (
          <Item key={t} text={t} />
        ))}
      </div>
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <span className="flex shrink-0 items-center gap-10">
      <span className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.16em] text-white">
        {text}
      </span>
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 shrink-0 text-white/60" aria-hidden="true">
        <path
          d="M10 0c.6 4.9 4.5 8.8 9.4 9.4v1.2C14.5 11.2 10.6 15.1 10 20c-.6-4.9-4.5-8.8-9.4-9.4V9.4C5.5 8.8 9.4 4.9 10 0Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
