import Image from 'next/image';

type Props = {
  /** `white` is the badge for purple backgrounds; `purple` for white ones. */
  variant?: 'purple' | 'white';
  className?: string;
  showCountry?: boolean;
};

/**
 * The official Chatime stacked mark, taken from the asset the global sites
 * serve (chatime.com and chatime.com.au ship the identical file). The purple
 * variant is the same artwork with the circle and lettering swapped so it reads
 * on a white background.
 */
export function Wordmark({
  variant = 'purple',
  className = '',
  showCountry = true,
}: Props) {
  const onPurple = variant === 'white';

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src={onPurple ? '/chatime-stacked-white.svg' : '/chatime-stacked-purple.svg'}
        alt="Chatime"
        width={101}
        height={92}
        priority
        className="h-11 w-auto"
      />
      {showCountry && (
        <span
          className={`font-display text-[11px] font-extrabold uppercase leading-none tracking-[0.2em]
                      ${onPurple ? 'text-white/80' : 'text-purple-800'}`}
        >
          Sri
          <br />
          Lanka
        </span>
      )}
    </span>
  );
}
