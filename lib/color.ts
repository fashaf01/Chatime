/** Small colour helpers shared by the product art and the cards behind it. */

export function toRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function mix(hex: string, target: [number, number, number], amount: number) {
  const [r, g, b] = toRgb(hex);
  const c = (a: number, t: number) => Math.round(a + (t - a) * amount);
  const v = (c(r, target[0]) << 16) | (c(g, target[1]) << 8) | c(b, target[2]);
  return `#${v.toString(16).padStart(6, "0")}`;
}

export const lighten = (hex: string, amount: number) => mix(hex, [255, 255, 255], amount);
export const darken = (hex: string, amount: number) => mix(hex, [0, 0, 0], amount);

export const rgba = (hex: string, alpha: number) => {
  const [r, g, b] = toRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * The tinted stage a product sits on. Each card picks up its own drink's
 * colour, so a grid of 31 cards reads as a palette rather than 31 grey boxes.
 */
export const stageTint = (top: string, bottom: string) =>
  `radial-gradient(120% 90% at 50% 12%, ${rgba(lighten(top, 0.62), 0.95)} 0%, ${rgba(
    lighten(top, 0.34),
    0.85
  )} 45%, ${rgba(lighten(bottom, 0.2), 0.7)} 100%)`;
