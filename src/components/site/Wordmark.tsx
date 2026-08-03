export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400
                   font-display text-[11px] font-bold leading-[0.95] tracking-tight text-grape-950"
        aria-hidden
      >
        <span className="block text-center">
          Cha
          <br />
          time
        </span>
      </span>
      <span className="font-display text-lg font-semibold tracking-tightest">
        Chatime
        <span className="ml-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-gold-400">
          Sri Lanka
        </span>
      </span>
    </span>
  );
}
