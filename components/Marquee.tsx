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
    <div className="relative flex overflow-hidden bg-magenta py-3.5" role="presentation">
      {/* The list is rendered twice and the track shifts exactly -50%, so the
          loop is seamless. The duplicate is aria-hidden so a screen reader does
          not hear every phrase twice. */}
      <div className="marquee-track flex shrink-0 items-center gap-8 pr-8">
        {ITEMS.map((t) => (
          <Item key={t} text={t} />
        ))}
      </div>
      <div aria-hidden="true" className="marquee-track flex shrink-0 items-center gap-8 pr-8">
        {ITEMS.map((t) => (
          <Item key={t} text={t} />
        ))}
      </div>
    </div>
  );
}

function Item({ text }: { text: string }) {
  return (
    <span className="flex shrink-0 items-center gap-8">
      <span className="whitespace-nowrap text-[13px] font-extrabold uppercase tracking-[0.12em] text-white">
        {text}
      </span>
      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-white/50" />
    </span>
  );
}
