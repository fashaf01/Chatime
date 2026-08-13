export default function Logo({
  className = "",
  tone = "plum",
}: {
  className?: string;
  tone?: "plum" | "cream";
}) {
  const main = tone === "cream" ? "#FBF7F2" : "#4C1D51";
  const accent = tone === "cream" ? "#F4B6C8" : "#B5347F";

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="20" cy="20" r="19" fill={main} />
        {/* tea leaf */}
        <path
          d="M20 9c6.5 2.4 9.6 7 9.6 12.2 0 4.4-3.4 8.2-9.6 9.8-6.2-1.6-9.6-5.4-9.6-9.8C10.4 16 13.5 11.4 20 9Z"
          fill={accent}
          opacity="0.9"
        />
        <path
          d="M20 11.5v18"
          stroke={main}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* pearls */}
        <circle cx="15.4" cy="25.6" r="2.1" fill={main} />
        <circle cx="24.6" cy="25.6" r="2.1" fill={main} />
        <circle cx="20" cy="27.4" r="2.1" fill={main} />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display text-[19px] font-bold tracking-tight"
          style={{ color: main }}
        >
          Chatime
        </span>
        <span
          className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: accent }}
        >
          Sri Lanka
        </span>
      </span>
    </span>
  );
}
