"use client";

import { useId, useMemo } from "react";
import { darken, lighten } from "@/lib/color";
import { photos } from "@/lib/photos";
import type { Drink, ToppingKind } from "@/lib/drinks";

/**
 * Product renderer.
 *
 * Draws a Chatime cup the way a studio shot would light it: a cylinder with a
 * key light on the left, a rim light on the right, a heat-sealed film top, cold
 * condensation on the glass, and toppings shaded as spheres rather than flat
 * dots. Everything is vector, so a 31-card menu still costs zero image
 * requests and stays sharp on any display.
 *
 * Three details matter for correctness:
 *  - Every gradient and clip id is namespaced with useId(). Without that, cards
 *    on the same page would share ids and every cup would inherit the first
 *    one's fill.
 *  - Placement is seeded from the drink id, never Math.random(), so server and
 *    client render identical markup and hydration stays quiet.
 *  - No SVG filters. Blur and turbulence are the slow path and would be paid
 *    once per card; all of the depth here comes from gradients instead.
 */

/* --------------------------------------------------------------- geometry */

const CX = 110;
const RIM_Y = 74;
const RIM_RX = 76;
const RIM_RY = 12;
const BASE_Y = 268;
const BASE_RX = 52;
const BASE_RY = 9;

/** Half-width of the tapered cup at a given height. */
const rxAt = (y: number) =>
  RIM_RX + ((y - RIM_Y) / (BASE_Y - RIM_Y)) * (BASE_RX - RIM_RX);

/** Depth of the ellipse at a given height — the cup narrows as it drops. */
const ryAt = (y: number) =>
  RIM_RY + ((y - RIM_Y) / (BASE_Y - RIM_Y)) * (BASE_RY - RIM_RY);

/** Cup silhouette: straight tapered walls, curved base, full rim ellipse on top. */
const CUP_PATH =
  `M${CX - RIM_RX} ${RIM_Y}` +
  ` L${CX - BASE_RX} ${BASE_Y}` +
  ` A${BASE_RX} ${BASE_RY} 0 0 0 ${CX + BASE_RX} ${BASE_Y}` +
  ` L${CX + RIM_RX} ${RIM_Y}` +
  ` A${RIM_RX} ${RIM_RY} 0 0 1 ${CX - RIM_RX} ${RIM_Y} Z`;

/* ------------------------------------------------------------------ noise */

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

/* --------------------------------------------------------------- toppings */

type ToppingStyle = {
  base: string;
  light: string;
  dark: string;
  r: number;
  /** Cubed toppings (jelly, pudding, aloe) are drawn as rounded squares. */
  cube?: boolean;
  /** Translucent toppings pick up the liquid behind them. */
  alpha?: number;
};

const TOPPING_STYLES: Record<Exclude<ToppingKind, "none">, ToppingStyle> = {
  pearl: { base: "#3B2416", light: "#8A6040", dark: "#150903", r: 9 },
  brownSugarPearl: { base: "#4C2A11", light: "#A06B28", dark: "#1B0A02", r: 9 },
  grassJelly: { base: "#24202A", light: "#5C5266", dark: "#0B0810", r: 8, cube: true, alpha: 0.94 },
  pudding: { base: "#F3CE68", light: "#FFF3CB", dark: "#B9861F", r: 8.5, cube: true },
  aloe: { base: "#E4F0D2", light: "#FFFFFF", dark: "#A9C486", r: 7.5, cube: true, alpha: 0.7 },
  popping: { base: "#F27059", light: "#FFC4B3", dark: "#A8331F", r: 7.5, alpha: 0.9 },
  redBean: { base: "#712C24", light: "#B0644F", dark: "#340C08", r: 7 },
};

/* ------------------------------------------------------------------ types */

type Detail = "card" | "hero";

export default function DrinkArt({
  drink,
  className,
  priority = false,
  detail = "card",
}: {
  drink: Drink;
  className?: string;
  priority?: boolean;
  /** "hero" adds condensation and a floor reflection for large presentations. */
  detail?: Detail;
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const { art } = drink;

  // Photography wins over the generated art whenever it exists: an explicit
  // `photo` on the drink first, otherwise whatever scripts/sync-photos.mjs
  // found in public/drinks/. Drinks with neither keep their vector render, so
  // the menu still works while a shoot is only half done.
  const photo = drink.photo ?? photos[drink.id];

  const scene = useMemo(
    () => buildScene(drink.id, art, detail),
    [drink.id, art, detail]
  );

  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={drink.name}
        className={className}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        // Same 11:16 as the vector viewBox, so the layout reserves the right
        // box before the file lands and nothing shifts on load.
        width={660}
        height={960}
        style={{ objectFit: "contain" }}
      />
    );
  }

  const {
    liquidTopY,
    cremaTopY,
    toppings,
    ice,
    droplets,
    topping,
    style,
  } = scene;

  const surfaceRx = rxAt(liquidTopY);
  const surfaceRy = ryAt(liquidTopY);

  const id = (name: string) => `${name}-${uid}`;
  const url = (name: string) => `url(#${id(name)})`;

  return (
    <svg
      viewBox="0 0 220 320"
      className={className}
      role="img"
      aria-label={`${drink.name} in a Chatime cup`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Liquid depth: brighter where light enters the surface, deeper at the base. */}
        <linearGradient id={id("liq")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lighten(art.liquidTop, 0.16)} />
          <stop offset="38%" stopColor={art.liquidTop} />
          <stop offset="82%" stopColor={art.liquidBottom} />
          <stop offset="100%" stopColor={darken(art.liquidBottom, 0.28)} />
        </linearGradient>

        {/* The liquid surface catches the light almost flat-on. */}
        <radialGradient id={id("surface")} cx="0.36" cy="0.3" r="0.85">
          <stop offset="0%" stopColor={lighten(art.liquidTop, 0.55)} />
          <stop offset="55%" stopColor={lighten(art.liquidTop, 0.2)} />
          <stop offset="100%" stopColor={darken(art.liquidTop, 0.12)} />
        </radialGradient>

        {/* Cylinder shading — the single thing that stops a cup reading as a
            flat trapezoid. Key light left of centre, core shadow right, thin
            rim light on the far edge. */}
        <linearGradient id={id("cyl")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2A1420" stopOpacity="0.34" />
          <stop offset="7%" stopColor="#2A1420" stopOpacity="0.12" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="33%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="58%" stopColor="#2A1420" stopOpacity="0.05" />
          <stop offset="84%" stopColor="#2A1420" stopOpacity="0.24" />
          <stop offset="95%" stopColor="#ffffff" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#2A1420" stopOpacity="0.22" />
        </linearGradient>

        {/* Soft vertical specular running down the key-light side. */}
        <linearGradient id={id("spec")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="24%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Heat-sealed film: taut, slightly milky, brightest where it bows. */}
        <radialGradient id={id("film")} cx="0.36" cy="0.32" r="0.78">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.94" />
          <stop offset="58%" stopColor="#F4EFF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#D8CCE6" stopOpacity="0.88" />
        </radialGradient>

        {/* Contact shadow falls off fast; the cup sits on the surface. */}
        <radialGradient id={id("shadow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2A1420" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#2A1420" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#2A1420" stopOpacity="0" />
        </radialGradient>

        {style && (
          <radialGradient id={id("pearl")} cx="0.33" cy="0.28" r="0.78">
            <stop offset="0%" stopColor={style.light} />
            <stop offset="42%" stopColor={style.base} />
            <stop offset="100%" stopColor={style.dark} />
          </radialGradient>
        )}

        <linearGradient id={id("straw")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#B01048" />
          <stop offset="26%" stopColor="#FF5C9E" />
          <stop offset="46%" stopColor="#E5187E" />
          <stop offset="78%" stopColor="#A80F45" />
          <stop offset="100%" stopColor="#7A0A31" />
        </linearGradient>

        {art.crema && (
          <linearGradient id={id("crema")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={lighten(art.crema, 0.3)} />
            <stop offset="60%" stopColor={art.crema} />
            <stop offset="100%" stopColor={darken(art.crema, 0.16)} />
          </linearGradient>
        )}

        {art.swirl && (
          <linearGradient id={id("syrup")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={art.swirl} stopOpacity="0.15" />
            <stop offset="45%" stopColor={art.swirl} stopOpacity="0.72" />
            <stop offset="100%" stopColor={darken(art.swirl, 0.25)} stopOpacity="0.92" />
          </linearGradient>
        )}

        <clipPath id={id("cup")}>
          <path d={CUP_PATH} />
        </clipPath>

        {/* Everything above the film — the straw only. */}
        <clipPath id={id("abovefilm")}>
          <rect x="0" y="0" width="220" height="78" />
        </clipPath>
      </defs>

      {/* ------------------------------------------------------------ floor */}
      <ellipse cx={CX} cy={BASE_Y + 12} rx="78" ry="17" fill={url("shadow")} />
      <ellipse cx={CX} cy={BASE_Y + 6} rx="48" ry="7" fill="#2A1420" opacity="0.2" />

      {/* --------------------------------------------------------- cup body */}
      {/* Frosted PET, seen empty above the liquid line. */}
      <path d={CUP_PATH} fill="#F6F3F0" />
      <path d={CUP_PATH} fill="#EAE3ED" opacity="0.55" />

      <g clipPath={url("cup")}>
        {/* Inner back wall, visible in the air gap under the lid. */}
        <ellipse
          cx={CX}
          cy={RIM_Y}
          rx={RIM_RX - 3}
          ry={RIM_RY - 1}
          fill="#CFC5D6"
          opacity="0.5"
        />

        {/* liquid column */}
        <rect
          x="0"
          y={liquidTopY}
          width="220"
          height={320 - liquidTopY}
          fill={url("liq")}
        />

        {/* Brown sugar clinging to the inside of the glass. Tapered ribbons —
            syrup runs thick at the bottom and thins as it climbs, which an
            even-width stroke cannot show. */}
        {art.swirl && (
          <g fill={url("syrup")}>
            {/* syrup pooled in the base */}
            <path d="M46 244 C 80 232, 142 240, 174 230 L174 274 L46 274 Z" opacity="0.42" />
            {/* left wall run — thin at the top, widening as it drops */}
            <path
              d="M68 124 C 63 166, 74 200, 67 256 L73.5 256 C 79 200, 69 168, 71.5 124.6 Z"
              opacity="0.62"
            />
            {/* right wall run, longer and more broken */}
            <path
              d="M147 102 C 155 150, 139 190, 148 256 L153.5 256 C 146 190, 161 150, 150 102.8 Z"
              opacity="0.5"
            />
            {/* short centre drip that never reaches the base */}
            <path
              d="M109 150 C 105 180, 114 206, 108 238 L112.5 238 C 118 206, 110 182, 112 150.6 Z"
              opacity="0.4"
            />
            <ellipse cx="92" cy="180" rx="2.4" ry="4.6" opacity="0.36" />
            <ellipse cx="133" cy="140" rx="2" ry="3.8" opacity="0.32" />
            <ellipse cx="126" cy="212" rx="1.8" ry="3.4" opacity="0.28" />
            <ellipse cx="80" cy="146" rx="1.6" ry="3" opacity="0.26" />
          </g>
        )}

        {/* ice — translucent, with one bright facet each */}
        {ice.map((c, i) => (
          <g key={`ice-${i}`} transform={`rotate(${c.rot} ${c.x} ${c.y})`}>
            <rect
              x={c.x - c.s / 2}
              y={c.y - c.s / 2}
              width={c.s}
              height={c.s}
              rx="4"
              fill="#ffffff"
              opacity="0.26"
            />
            <rect
              x={c.x - c.s / 2}
              y={c.y - c.s / 2}
              width={c.s}
              height={c.s}
              rx="4"
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <rect
              x={c.x - c.s / 2 + 2.5}
              y={c.y - c.s / 2 + 2.5}
              width={c.s * 0.34}
              height={c.s * 0.34}
              rx="2"
              fill="#ffffff"
              opacity="0.5"
            />
          </g>
        ))}

        {/* liquid surface — a real ellipse, so the cup reads as open volume */}
        <ellipse
          cx={CX}
          cy={liquidTopY}
          rx={surfaceRx}
          ry={surfaceRy}
          fill={url("surface")}
        />
        <ellipse
          cx={CX}
          cy={liquidTopY}
          rx={surfaceRx}
          ry={surfaceRy}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.34"
          strokeWidth="1.4"
        />

        {/* cheese-foam / mousse cap sitting on the liquid */}
        {art.crema && (
          <>
            <rect
              x="0"
              y={cremaTopY}
              width="220"
              height={liquidTopY - cremaTopY}
              fill={url("crema")}
            />
            <ellipse
              cx={CX}
              cy={liquidTopY}
              rx={rxAt(liquidTopY)}
              ry={ryAt(liquidTopY)}
              fill={darken(art.crema, 0.18)}
              opacity="0.75"
            />
            <ellipse
              cx={CX}
              cy={cremaTopY}
              rx={rxAt(cremaTopY)}
              ry={ryAt(cremaTopY)}
              fill={lighten(art.crema, 0.4)}
            />
            <ellipse
              cx={CX - 16}
              cy={cremaTopY - 1}
              rx="34"
              ry="5"
              fill="#ffffff"
              opacity="0.45"
            />
          </>
        )}

        {/* The submerged length of the straw. Drawn before the pile so the
            toppings sit in front of it, and knocked well back — liquid this
            opaque swallows most of the colour. */}
        <g transform="rotate(12 138 78)" opacity="0.3">
          <rect x="131" y="60" width="14" height="170" rx="7" fill={url("straw")} />
          <rect x="134" y="60" width="3" height="170" rx="1.5" fill="#ffffff" opacity="0.3" />
        </g>

        {/* toppings, settled into the taper */}
        {style &&
          toppings.map((p, i) => {
            const r = p.r;
            return (
              <g key={`t-${i}`} opacity={p.back ? 0.82 : 1}>
                {/* contact shadow, so the pile has weight */}
                <ellipse
                  cx={p.x}
                  cy={p.y + r * 0.72}
                  rx={r * 0.86}
                  ry={r * 0.34}
                  fill="#12060A"
                  opacity="0.32"
                />
                {style.cube ? (
                  <g transform={`rotate(${p.rot} ${p.x} ${p.y})`}>
                    <rect
                      x={p.x - r}
                      y={p.y - r}
                      width={r * 2}
                      height={r * 2}
                      rx={r * 0.3}
                      fill={url("pearl")}
                      opacity={style.alpha ?? 1}
                    />
                    <rect
                      x={p.x - r}
                      y={p.y - r}
                      width={r * 2}
                      height={r * 2}
                      rx={r * 0.3}
                      fill="none"
                      stroke={style.dark}
                      strokeOpacity="0.5"
                      strokeWidth="0.9"
                    />
                    <rect
                      x={p.x - r * 0.62}
                      y={p.y - r * 0.66}
                      width={r * 0.66}
                      height={r * 0.42}
                      rx={r * 0.16}
                      fill="#ffffff"
                      opacity="0.42"
                    />
                  </g>
                ) : (
                  <>
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={r}
                      fill={url("pearl")}
                      opacity={style.alpha ?? 1}
                    />
                    {/* wet specular highlight */}
                    <ellipse
                      cx={p.x - r * 0.34}
                      cy={p.y - r * 0.42}
                      rx={r * 0.3}
                      ry={r * 0.21}
                      fill="#ffffff"
                      opacity="0.62"
                      transform={`rotate(-28 ${p.x - r * 0.34} ${p.y - r * 0.42})`}
                    />
                    {/* bounce light off the neighbour below */}
                    <ellipse
                      cx={p.x + r * 0.3}
                      cy={p.y + r * 0.5}
                      rx={r * 0.34}
                      ry={r * 0.18}
                      fill={style.light}
                      opacity="0.28"
                    />
                  </>
                )}
              </g>
            );
          })}

        {/* cylinder shading over the contents */}
        <rect x="0" y="0" width="220" height="320" fill={url("cyl")} />

        {/* key-light streak on the PET */}
        <ellipse cx={CX - 46} cy="176" rx="9" ry="76" fill={url("spec")} opacity="0.5" />
        <ellipse cx={CX + 58} cy="182" rx="3.6" ry="62" fill={url("spec")} opacity="0.34" />

        {/* printed band — the brand mark, pressed into the cup */}
        <g opacity="0.2" fill="none" stroke="#ffffff" strokeWidth="1.6">
          <path d={`M${CX - 40} 214 L${CX + 40} 214`} strokeOpacity="0.7" />
          <path d={`M${CX - 34} 228 L${CX + 34} 228`} strokeOpacity="0.4" />
        </g>
        <g opacity="0.26" fill="#ffffff">
          <circle cx={CX - 9} cy="221" r="2.4" />
          <circle cx={CX} cy="221" r="2.4" />
          <circle cx={CX + 9} cy="221" r="2.4" />
        </g>

        {/* cold condensation beading on the outside of the cup */}
        {droplets.map((d, i) => (
          <g key={`d-${i}`}>
            <ellipse cx={d.x} cy={d.y} rx={d.r} ry={d.r * 1.18} fill="#ffffff" opacity={d.o} />
            <ellipse
              cx={d.x - d.r * 0.3}
              cy={d.y - d.r * 0.4}
              rx={d.r * 0.34}
              ry={d.r * 0.3}
              fill="#ffffff"
              opacity={Math.min(0.9, d.o + 0.35)}
            />
            <ellipse
              cx={d.x + d.r * 0.2}
              cy={d.y + d.r * 0.6}
              rx={d.r * 0.4}
              ry={d.r * 0.24}
              fill="#2A1420"
              opacity={d.o * 0.35}
            />
          </g>
        ))}
      </g>

      {/* --------------------------------------------------------- cup edge */}
      <path
        d={CUP_PATH}
        fill="none"
        stroke="#2A1420"
        strokeOpacity="0.16"
        strokeWidth="1.6"
      />
      {/* thicker moulded base ring */}
      <path
        d={`M${CX - BASE_RX + 1} ${BASE_Y - 4} A${BASE_RX} ${BASE_RY} 0 0 0 ${CX + BASE_RX - 1} ${BASE_Y - 4}`}
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.4"
        strokeWidth="1.6"
      />

      {/* ------------------------------------------------------------- film */}
      <g>
        <ellipse cx={CX} cy={RIM_Y} rx={RIM_RX} ry={RIM_RY} fill={url("film")} />
        <ellipse
          cx={CX}
          cy={RIM_Y}
          rx={RIM_RX}
          ry={RIM_RY}
          fill="none"
          stroke="#2A1420"
          strokeOpacity="0.16"
          strokeWidth="1.4"
        />
        {/* printed ring on the seal */}
        <ellipse
          cx={CX}
          cy={RIM_Y}
          rx={RIM_RX - 15}
          ry={RIM_RY - 2.4}
          fill="none"
          stroke="#5C2D91"
          strokeOpacity="0.4"
          strokeWidth="1.6"
        />
        <ellipse
          cx={CX}
          cy={RIM_Y}
          rx={RIM_RX - 26}
          ry={RIM_RY - 4.4}
          fill="none"
          stroke="#E5187E"
          strokeOpacity="0.35"
          strokeWidth="1.2"
        />
        {/* the film bows under the straw, catching a highlight */}
        <ellipse
          cx={CX - 22}
          cy={RIM_Y - 3}
          rx="26"
          ry="4.6"
          fill="#ffffff"
          opacity="0.62"
        />
        {/* rolled rim of the cup, proud of the seal */}
        <ellipse
          cx={CX}
          cy={RIM_Y}
          rx={RIM_RX}
          ry={RIM_RY}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.75"
          strokeWidth="2.6"
          strokeDasharray="150 400"
          strokeDashoffset="88"
        />
        {/* punched hole where the straw went through */}
        <ellipse cx="138" cy="77" rx="9.5" ry="4.6" fill="#3A2334" opacity="0.5" />
      </g>

      {/* ------------------------------------------------------------ straw */}
      <g clipPath={url("abovefilm")}>
        <g transform="rotate(12 138 78)">
          <rect x="131" y="22" width="14" height="70" rx="7" fill={url("straw")} />
          {/* stripe */}
          <rect x="134.6" y="22" width="3" height="70" rx="1.5" fill="#ffffff" opacity="0.42" />
          {/* open end, cut on the bias like a boba straw */}
          <ellipse cx="138" cy="23" rx="7" ry="2.9" fill="#7A0A31" />
          <ellipse cx="138" cy="23.4" rx="4.6" ry="1.7" fill="#43041B" />
        </g>
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ scene */

type Placed = { x: number; y: number; r: number; rot: number; back: boolean };
type Cube = { x: number; y: number; s: number; rot: number };
type Drop = { x: number; y: number; r: number; o: number };

function buildScene(seed: string, art: Drink["art"], detail: Detail) {
  const rand = seeded(seed);
  const hasCrema = Boolean(art.crema);

  // With foam on top the liquid starts lower, so the cap has room to sit.
  const cremaTopY = 96;
  const liquidTopY = hasCrema ? 122 : 100;

  const topping = art.topping;
  const style = topping === "none" ? null : TOPPING_STYLES[topping];

  /* Toppings settle from the base upward. Each row is packed to whatever the
     cup is wide at that height, so the pile follows the taper instead of
     sitting in a rectangle. */
  const toppings: Placed[] = [];
  if (style) {
    const rows = 4;
    for (let row = 0; row < rows; row += 1) {
      const rowY = 256 - row * (style.r * 1.58);
      const halfWidth = rxAt(rowY) - style.r - 6;
      const capacity = Math.max(2, Math.floor((halfWidth * 2) / (style.r * 2.04)));
      // The top row is deliberately short, so the pile reads as settled
      // rather than as a solid block of pearls.
      const inRow = row === rows - 1 ? Math.max(2, capacity - 2) : capacity;
      // Alternate rows sit half a pearl across, the way spheres actually
      // nest when they settle.
      const stagger = row % 2 === 0 ? 0 : style.r * 0.55;
      for (let col = 0; col < inRow; col += 1) {
        const spread = ((col + 0.5) / inRow) * 2 - 1;
        const back = rand() > 0.62;
        toppings.push({
          x: CX + spread * halfWidth + stagger + (rand() - 0.5) * 5,
          // Per-pearl drop, so the rows never line up as a grid.
          y: rowY + (rand() - 0.5) * style.r * 0.85,
          // Pearls sitting further back read smaller.
          r: style.r * (back ? 0.86 : 1) * (0.92 + rand() * 0.16),
          rot: rand() * 90,
          back,
        });
      }
    }
    // Back rows first, so the front of the pile overlaps them.
    toppings.sort((a, b) => Number(b.back) - Number(a.back));
  }

  const ice: Cube[] = [];
  if (art.ice) {
    const count = detail === "hero" ? 6 : 5;
    for (let i = 0; i < count; i += 1) {
      const y = liquidTopY + 16 + rand() * 84;
      const halfWidth = rxAt(y) - 20;
      ice.push({
        x: CX + (rand() * 2 - 1) * halfWidth,
        y,
        rot: rand() * 60 - 30,
        s: 16 + rand() * 8,
      });
    }
  }

  /* Condensation beads on the cold side of the cup. They avoid the key-light
     streak, which would otherwise look speckled rather than wet. */
  const droplets: Drop[] = [];
  const dropCount = detail === "hero" ? 34 : 18;
  for (let i = 0; i < dropCount; i += 1) {
    const y = 92 + rand() * 158;
    const halfWidth = rxAt(y) - 8;
    const x = CX + (rand() * 2 - 1) * halfWidth;
    droplets.push({
      x,
      y,
      r: 0.9 + rand() * 1.5,
      o: 0.2 + rand() * 0.3,
    });
  }

  return { liquidTopY, cremaTopY, toppings, ice, droplets, topping, style };
}
