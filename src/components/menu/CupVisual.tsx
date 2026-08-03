'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';
import { toppings as allToppings, type Drink, type IceLevelId } from '@/lib/menu';

type Props = {
  drink: Drink;
  size: 'regular' | 'large';
  sugar: number;
  ice: IceLevelId;
  toppings: string[];
  className?: string;
};

/**
 * Deterministic jitter. Math.random() here would produce different values on
 * the server and the client and blow up hydration, so positions are derived
 * from the index instead.
 */
function jitter(seed: number, spread: number): number {
  const n = Math.sin(seed * 127.1) * 43758.5453;
  return (n - Math.floor(n) - 0.5) * spread;
}

const ICE_COUNT: Record<IceLevelId, number> = {
  none: 0,
  less: 3,
  regular: 6,
  extra: 10,
};

/** Cup interior, in viewBox units. Everything else is positioned against these. */
const CUP = { top: 74, bottom: 286, leftTop: 36, rightTop: 164, leftBottom: 52, rightBottom: 148 };

/** Interior width at a given y — the cup tapers, so contents must too. */
function widthAt(y: number) {
  const ratio = (y - CUP.top) / (CUP.bottom - CUP.top);
  const left = CUP.leftTop + (CUP.leftBottom - CUP.leftTop) * ratio;
  const right = CUP.rightTop + (CUP.rightBottom - CUP.rightTop) * ratio;
  return { left, right, centre: (left + right) / 2 };
}

export function CupVisual({ drink, size, sugar, ice, toppings, className }: Props) {
  const reduced = useReducedMotion();

  const chosen = useMemo(
    () => toppings.map((id) => allToppings.find((t) => t.id === id)).filter(Boolean),
    [toppings],
  ) as (typeof allToppings)[number][];

  const spheres = chosen.filter((t) => t.visual === 'pearl');
  const jellies = chosen.filter((t) => t.visual === 'jelly');
  const puddings = chosen.filter((t) => t.visual === 'pudding');
  const foam = chosen.find((t) => t.visual === 'foam');

  // Sugar shows up as depth of colour: 0% is a pale, washed drink.
  const sugarMix = 0.45 + (sugar / 100) * 0.55;

  // A large cup is drawn taller, and the liquid rises to fill it.
  const scale = size === 'large' ? 1.06 : 1;
  const liquidTop = foam ? CUP.top + 34 : CUP.top + 12;

  const iceCubes = Array.from({ length: ICE_COUNT[ice] });

  const spring = reduced
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 180, damping: 16 };

  return (
    <div className={className}>
      <motion.svg
        viewBox="0 0 200 320"
        className="h-full w-full overflow-visible"
        animate={{ scale }}
        transition={spring}
        role="img"
        aria-label={`${drink.name}, ${size} size, ${sugar}% sugar, ${ice} ice${
          chosen.length ? `, with ${chosen.map((t) => t.name).join(', ')}` : ''
        }`}
      >
        <defs>
          <linearGradient id={`liquid-${drink.slug}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={drink.colour[0]} />
            <stop offset="100%" stopColor={drink.colour[1]} />
          </linearGradient>

          <clipPath id="cup-interior">
            <path
              d={`M ${CUP.leftTop} ${CUP.top}
                  L ${CUP.leftBottom} ${CUP.bottom - 8}
                  Q ${CUP.leftBottom + 2} ${CUP.bottom} ${CUP.leftBottom + 12} ${CUP.bottom}
                  L ${CUP.rightBottom - 12} ${CUP.bottom}
                  Q ${CUP.rightBottom - 2} ${CUP.bottom} ${CUP.rightBottom} ${CUP.bottom - 8}
                  L ${CUP.rightTop} ${CUP.top} Z`}
            />
          </clipPath>

          {/* Gloss running down the left of the cup wall */}
          <linearGradient id="gloss" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.30" />
            <stop offset="26%" stopColor="#fff" stopOpacity="0.05" />
            <stop offset="72%" stopColor="#fff" stopOpacity="0" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.14" />
          </linearGradient>

          <radialGradient id="shadow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#000" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="100" cy="298" rx="62" ry="11" fill="url(#shadow)" />

        {/* Straw — behind the lid, poking through it */}
        <g>
          <rect
            x="112"
            y="12"
            width="13"
            height="80"
            rx="6"
            fill="#F2E7D9"
            opacity="0.9"
            transform="rotate(9 118 52)"
          />
          <rect
            x="112"
            y="12"
            width="5"
            height="80"
            rx="3"
            fill="#fff"
            opacity="0.5"
            transform="rotate(9 118 52)"
          />
        </g>

        <g clipPath="url(#cup-interior)">
          {/* Drink */}
          <motion.rect
            x="20"
            width="160"
            fill={`url(#liquid-${drink.slug})`}
            initial={false}
            animate={{ y: liquidTop, height: CUP.bottom - liquidTop + 4, opacity: sugarMix }}
            transition={spring}
          />

          {/* Foam / mousse cap */}
          {foam && (
            <motion.g
              initial={reduced ? false : { y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={spring}
            >
              <rect
                x="20"
                y={CUP.top + 6}
                width="160"
                height="36"
                fill={foam.colour}
                opacity="0.95"
              />
              <ellipse cx="100" cy={CUP.top + 42} rx="80" ry="9" fill={foam.colour} />
            </motion.g>
          )}

          {/* Ice */}
          {iceCubes.map((_, i) => {
            const y = CUP.top + 46 + (i % 4) * 30 + jitter(i + 11, 12);
            const { centre } = widthAt(y);
            return (
              <motion.rect
                key={`ice-${i}`}
                width="20"
                height="20"
                rx="5"
                fill="#FFFFFF"
                initial={reduced ? false : { opacity: 0, scale: 0.4 }}
                animate={{ opacity: 0.22, scale: 1 }}
                transition={{ ...spring, delay: reduced ? 0 : i * 0.04 }}
                x={centre - 10 + jitter(i + 3, 46)}
                y={y}
                transform={`rotate(${jitter(i + 7, 60)} ${centre} ${y + 10})`}
              />
            );
          })}

          {/* Jelly — cubes suspended through the middle */}
          {jellies.map((jelly, j) =>
            Array.from({ length: 7 }).map((_, i) => {
              const seed = i + j * 17 + 31;
              const y = CUP.bottom - 90 - (i % 4) * 22 + jitter(seed, 10);
              const { centre } = widthAt(y);
              return (
                <motion.rect
                  key={`${jelly.id}-${i}`}
                  width="13"
                  height="13"
                  rx="3"
                  fill={jelly.colour}
                  opacity="0.92"
                  initial={reduced ? false : { y: y - 60, opacity: 0 }}
                  animate={{ y, opacity: 0.92 }}
                  transition={{ ...spring, delay: reduced ? 0 : i * 0.045 }}
                  x={centre - 6.5 + jitter(seed + 2, 40)}
                  transform={`rotate(${jitter(seed + 5, 40)} ${centre} ${y + 6})`}
                />
              );
            }),
          )}

          {/* Pudding — a soft slab that settles above the pearls */}
          {puddings.map((p, j) =>
            Array.from({ length: 4 }).map((_, i) => {
              const seed = i + j * 23 + 61;
              const y = CUP.bottom - 68 - (i % 2) * 20;
              const { centre } = widthAt(y);
              return (
                <motion.rect
                  key={`${p.id}-${i}`}
                  width="22"
                  height="16"
                  rx="4"
                  fill={p.colour}
                  opacity="0.95"
                  initial={reduced ? false : { y: y - 50, opacity: 0 }}
                  animate={{ y, opacity: 0.95 }}
                  transition={{ ...spring, delay: reduced ? 0 : i * 0.06 }}
                  x={centre - 11 + jitter(seed, 34)}
                />
              );
            }),
          )}

          {/* Pearls — pile up at the bottom, drop in with a bounce */}
          {spheres.map((pearl, j) =>
            Array.from({ length: 13 }).map((_, i) => {
              const seed = i + j * 29 + 5;
              const row = Math.floor(i / 5);
              const y = CUP.bottom - 14 - row * 15 + jitter(seed, 5);
              const { centre } = widthAt(y);
              return (
                <motion.circle
                  key={`${pearl.id}-${i}`}
                  r="8"
                  fill={pearl.colour}
                  initial={reduced ? false : { cy: y - 120, opacity: 0 }}
                  animate={{ cy: y, opacity: 1 }}
                  transition={{
                    ...spring,
                    delay: reduced ? 0 : i * 0.035 + j * 0.1,
                  }}
                  cx={centre - 2 + jitter(seed + 1, 44)}
                />
              );
            }),
          )}
        </g>

        {/* Cup wall, gloss and rim sit above the contents */}
        <path
          d={`M ${CUP.leftTop} ${CUP.top}
              L ${CUP.leftBottom} ${CUP.bottom - 8}
              Q ${CUP.leftBottom + 2} ${CUP.bottom} ${CUP.leftBottom + 12} ${CUP.bottom}
              L ${CUP.rightBottom - 12} ${CUP.bottom}
              Q ${CUP.rightBottom - 2} ${CUP.bottom} ${CUP.rightBottom} ${CUP.bottom - 8}
              L ${CUP.rightTop} ${CUP.top} Z`}
          fill="url(#gloss)"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="1.5"
        />

        {/* Domed lid */}
        <path
          d={`M 30 ${CUP.top} L 30 62 Q 30 50 46 48 L 154 48 Q 170 50 170 62 L 170 ${CUP.top} Z`}
          fill="rgba(255,255,255,0.16)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
        />
        <ellipse
          cx="100"
          cy={CUP.top}
          rx="70"
          ry="6"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.22)"
        />

        {/* Sleeve band with the wordmark */}
        <g opacity="0.95">
          <path
            d={`M ${widthAt(150).left - 1} 150 L ${widthAt(196).left - 1} 196
                L ${widthAt(196).right + 1} 196 L ${widthAt(150).right + 1} 150 Z`}
            fill="rgba(253,249,244,0.94)"
          />
          <text
            x="100"
            y="170"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#5B2C8D"
            fontFamily="var(--font-display), system-ui, sans-serif"
            letterSpacing="-0.5"
          >
            Cha
          </text>
          <text
            x="100"
            y="187"
            textAnchor="middle"
            fontSize="15"
            fontWeight="700"
            fill="#5B2C8D"
            fontFamily="var(--font-display), system-ui, sans-serif"
            letterSpacing="-0.5"
          >
            time
          </text>
        </g>
      </motion.svg>
    </div>
  );
}
