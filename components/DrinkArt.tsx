"use client";

import { useId } from "react";
import type { Drink, ToppingKind } from "@/lib/drinks";

/**
 * Parametric cup illustration.
 *
 * Renders a Chatime-style tapered cup filled according to the drink's `art`
 * block. Everything is vector, so a full menu grid costs zero image requests
 * and stays sharp at any density.
 *
 * Two details matter for correctness:
 *  - All gradient/clip ids are namespaced with useId(). Without that, several
 *    cards on one page would share ids and every cup would inherit the first
 *    one's fill.
 *  - Topping placement uses a hash of the drink id, never Math.random(), so the
 *    server and client render identical markup and hydration stays quiet.
 */

const CUP_PATH =
  "M30 68 L170 68 L149 250 Q148 260 138 260 L62 260 Q52 260 51 250 Z";

/** Deterministic 0..1 sequence seeded from a string. */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ToppingStyle = { fill: string; stroke: string; r: number; square?: boolean };

const TOPPING_STYLES: Record<Exclude<ToppingKind, "none">, ToppingStyle> = {
  pearl: { fill: "#3A2418", stroke: "#241009", r: 8.5 },
  brownSugarPearl: { fill: "#4A2A12", stroke: "#2B1607", r: 8.5 },
  grassJelly: { fill: "#241F26", stroke: "#120F14", r: 7.5, square: true },
  pudding: { fill: "#F2CE6B", stroke: "#D2A73F", r: 8, square: true },
  aloe: { fill: "#E8F2D8", stroke: "#C3D9A6", r: 7, square: true },
  popping: { fill: "#F2725C", stroke: "#C9503C", r: 7 },
  redBean: { fill: "#6E2B24", stroke: "#471813", r: 6.5 },
};

export default function DrinkArt({
  drink,
  className,
  priority = false,
}: {
  drink: Drink;
  className?: string;
  priority?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const { art } = drink;

  // If real photography is supplied later, it wins over the generated art.
  if (drink.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={drink.photo}
        alt={drink.name}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={200}
        height={280}
      />
    );
  }

  const rand = seeded(drink.id);
  const hasCrema = Boolean(art.crema);
  // Crema sits as a band at the top of the liquid, so the liquid starts lower.
  const liquidTopY = hasCrema ? 108 : 92;

  const toppingKind = art.topping;
  const style =
    toppingKind === "none" ? null : TOPPING_STYLES[toppingKind];

  // Toppings settle in the lower third of the cup, which narrows as it drops.
  const toppings = [];
  if (style) {
    const perRow = 4;
    const rows = 4;
    for (let row = 0; row < rows; row += 1) {
      // Top row is deliberately short, so the pile reads as settled rather
      // than as a solid rectangle of pearls.
      const inRow = row === rows - 1 ? 2 : perRow;
      const y = 246 - row * (style.r * 1.62) - rand() * 5;
      // Cup half-width at this height, minus the topping radius and wall.
      const t = (y - 68) / (260 - 68);
      const halfWidth = (70 - t * 21) - style.r - 3;
      for (let col = 0; col < inRow; col += 1) {
        // Even spread across the row, then a small jitter, so pearls sit
        // side by side instead of clumping on one wall.
        const spread = ((col + 0.5) / inRow) * 2 - 1;
        const x = 100 + spread * halfWidth + (rand() - 0.5) * 7;
        toppings.push({ x, y, rot: rand() * 90 });
      }
    }
  }

  const iceCubes = [];
  if (art.ice) {
    for (let i = 0; i < 5; i += 1) {
      const y = liquidTopY + 14 + rand() * 90;
      const t = (y - 68) / (260 - 68);
      const halfWidth = (70 - t * 21) - 16;
      const x = 100 + (rand() * 2 - 1) * halfWidth;
      iceCubes.push({ x, y, rot: rand() * 60 - 30, s: 15 + rand() * 6 });
    }
  }

  return (
    <svg
      viewBox="0 0 200 300"
      className={className}
      role="img"
      aria-label={`Illustration of ${drink.name}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`liq-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={art.liquidTop} />
          <stop offset="100%" stopColor={art.liquidBottom} />
        </linearGradient>
        <linearGradient id={`cup-${uid}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42" />
          <stop offset="22%" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="72%" stopColor="#000000" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.14" />
        </linearGradient>
        <clipPath id={`clip-${uid}`}>
          <path d={CUP_PATH} />
        </clipPath>
      </defs>

      {/* soft ground shadow */}
      <ellipse cx="100" cy="272" rx="54" ry="8" fill="#000" opacity="0.13" />

      {/* cup body */}
      <path d={CUP_PATH} fill="#F7F5F2" opacity="0.5" />

      <g clipPath={`url(#clip-${uid})`}>
        {/* liquid */}
        <rect
          x="0"
          y={liquidTopY}
          width="200"
          height={300 - liquidTopY}
          fill={`url(#liq-${uid})`}
        />

        {/* Brown sugar clinging to the inside of the glass. Tapered filled
            ribbons rather than even strokes — syrup runs thick at the bottom
            and thins as it climbs, which a uniform stroke cannot show. */}
        {art.swirl && (
          <g fill={art.swirl}>
            {/* syrup pooled at the base */}
            <path
              d="M40 236 C 70 226, 130 232, 160 224 L160 262 L40 262 Z"
              opacity="0.55"
            />
            {/* left wall run */}
            <path
              d="M57 128 C 53 168, 66 200, 59 252 L71 252 C 76 200, 63 170, 66 130 Z"
              opacity="0.7"
            />
            {/* right wall run, longer and thinner */}
            <path
              d="M136 106 C 143 152, 130 190, 138 252 L146 252 C 140 190, 152 150, 143 108 Z"
              opacity="0.6"
            />
            {/* short centre drip */}
            <path
              d="M99 150 C 95 182, 105 208, 99 246 L107 246 C 112 208, 102 184, 105 152 Z"
              opacity="0.45"
            />
            {/* stray droplets */}
            <ellipse cx="82" cy="176" rx="3.5" ry="6" opacity="0.4" />
            <ellipse cx="122" cy="142" rx="3" ry="5" opacity="0.35" />
            <ellipse cx="115" cy="206" rx="2.5" ry="4.5" opacity="0.3" />
          </g>
        )}

        {/* ice */}
        {iceCubes.map((c, i) => (
          <rect
            key={`ice-${i}`}
            x={c.x - c.s / 2}
            y={c.y - c.s / 2}
            width={c.s}
            height={c.s}
            rx="3.5"
            fill="#ffffff"
            opacity="0.2"
            transform={`rotate(${c.rot} ${c.x} ${c.y})`}
          />
        ))}

        {/* crema / mousse cap */}
        {hasCrema && (
          <>
            <rect x="0" y="86" width="200" height="26" fill={art.crema} />
            <ellipse cx="100" cy="112" rx="72" ry="8" fill={art.crema} />
            <ellipse cx="100" cy="87" rx="72" ry="8" fill="#fff" opacity="0.5" />
          </>
        )}

        {/* toppings */}
        {style &&
          toppings.map((p, i) =>
            style.square ? (
              <rect
                key={`t-${i}`}
                x={p.x - style.r}
                y={p.y - style.r}
                width={style.r * 2}
                height={style.r * 2}
                rx="2.5"
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="1"
                transform={`rotate(${p.rot} ${p.x} ${p.y})`}
              />
            ) : (
              <circle
                key={`t-${i}`}
                cx={p.x}
                cy={p.y}
                r={style.r}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth="1"
              />
            )
          )}

        {/* glass shine over everything inside the cup */}
        <rect x="0" y="0" width="200" height="300" fill={`url(#cup-${uid})`} />
      </g>

      {/* cup outline */}
      <path
        d={CUP_PATH}
        fill="none"
        stroke="#2A1B22"
        strokeOpacity="0.18"
        strokeWidth="2"
      />

      {/* straw */}
      <g>
        <rect
          x="112"
          y="18"
          width="14"
          height="80"
          rx="7"
          fill="#E8465F"
          transform="rotate(11 119 58)"
        />
        <rect
          x="112"
          y="18"
          width="5"
          height="80"
          rx="2.5"
          fill="#fff"
          opacity="0.35"
          transform="rotate(11 119 58)"
        />
      </g>

      {/* lid */}
      <g>
        <ellipse cx="100" cy="68" rx="72" ry="11" fill="#F3EFEA" />
        <ellipse cx="100" cy="65" rx="72" ry="11" fill="#FBF8F5" />
        <ellipse cx="100" cy="65" rx="72" ry="11" fill="none" stroke="#2A1B22" strokeOpacity="0.15" strokeWidth="1.5" />
        <ellipse cx="100" cy="65" rx="52" ry="6" fill="#000" opacity="0.05" />
      </g>
    </svg>
  );
}
