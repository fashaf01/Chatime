export default function Logo({
  className = "",
  tone = "grape",
}: {
  className?: string;
  tone?: "grape" | "paper";
}) {
  const text = tone === "paper" ? "#FFFFFF" : "#5C2D91";
  const badge = tone === "paper" ? "#FFFFFF" : "#5C2D91";
  const mark = tone === "paper" ? "#5C2D91" : "#FFFFFF";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 44 44"
        className="h-10 w-10 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0" y="0" width="44" height="44" rx="14" fill={badge} />
        {/* cup */}
        <path
          d="M13 14h18l-2.2 17.4A2.6 2.6 0 0 1 26.2 34h-8.4a2.6 2.6 0 0 1-2.6-2.6L13 14Z"
          fill={mark}
        />
        {/* lid */}
        <rect x="11" y="10.5" width="22" height="4.6" rx="2.3" fill={mark} />
        {/* straw */}
        <rect
          x="24.5"
          y="4"
          width="3.4"
          height="10"
          rx="1.7"
          fill={mark}
          transform="rotate(14 26 9)"
        />
        {/* pearls */}
        <circle cx="19" cy="29" r="2.05" fill={badge} />
        <circle cx="25" cy="29" r="2.05" fill={badge} />
        <circle cx="22" cy="25.4" r="2.05" fill={badge} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[22px] font-extrabold tracking-[-0.03em]"
          style={{ color: text }}
        >
          Chatime
        </span>
        <span
          className="mt-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.22em]"
          style={{ color: tone === "paper" ? "#FF4DA6" : "#E5187E" }}
        >
          Sri Lanka
        </span>
      </span>
    </span>
  );
}
