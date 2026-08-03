/**
 * THE MENU FILE — this is the only file you need to edit to correct the menu.
 *
 * ⚠️  PRICES BELOW ARE PLACEHOLDERS. They are plausible Colombo bubble-tea prices,
 *     not Chatime Sri Lanka's real ones. Replace every `prices` value with the real
 *     LKR figures from the in-store menu board, then set PRICES_ARE_PLACEHOLDER to
 *     false to remove the "indicative pricing" notice from the menu page.
 *
 * Drink names marked `// ✅ confirmed` were seen on @chatimesrilanka. The rest are
 * standard Chatime range items — delete any the Havelock City store doesn't carry.
 */

export const PRICES_ARE_PLACEHOLDER = true;

export type CategoryId =
  | 'signature'
  | 'milk-tea'
  | 'fruit-tea'
  | 'chocolate'
  | 'fresh-tea'
  | 'slush';

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
};

export const categories: Category[] = [
  { id: 'signature', name: 'Signatures', tagline: 'The ones we are known for' },
  { id: 'milk-tea', name: 'Milk Tea', tagline: 'Brewed, shaken, softened with milk' },
  { id: 'fruit-tea', name: 'Fruit Tea', tagline: 'Real fruit, cold and bright' },
  { id: 'chocolate', name: 'Chocolate', tagline: 'Rich, cocoa-forward, indulgent' },
  { id: 'fresh-tea', name: 'Fresh Tea', tagline: 'Pure leaf, nothing hiding' },
  { id: 'slush', name: 'Slush', tagline: 'Blended with ice, built for 30°C' },
];

export type Drink = {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  /** LKR. `large` omitted = single size only. */
  prices: { regular: number; large?: number };
  /** Drives the liquid gradient in the cup visual. */
  colour: [string, string];
  bestseller?: boolean;
  isNew?: boolean;
  caffeineFree?: boolean;
  dairyFree?: boolean;
  servedHot?: boolean;
  /** Toppings pre-selected when you open the customiser. */
  defaultToppings?: string[];
};

export const drinks: Drink[] = [
  // ── Signatures ───────────────────────────────────────────────────────────
  {
    slug: 'chatime-signature-milk-tea',
    name: 'Chatime Signature Milk Tea',
    category: 'signature',
    description:
      'The original. Black tea brewed fresh every four hours, shaken with milk until it turns silk.',
    prices: { regular: 890, large: 1090 },
    colour: ['#C89B6A', '#9A6B3F'],
    bestseller: true,
    defaultToppings: ['pearls'],
  },
  {
    slug: 'brown-sugar-pearl-milk',
    name: 'Brown Sugar Pearl Fresh Milk',
    category: 'signature',
    description:
      'Pearls simmered in brown sugar syrup, striped down a cup of cold fresh milk.',
    prices: { regular: 1090, large: 1290 },
    colour: ['#E8D5BC', '#8B5E34'],
    bestseller: true,
    caffeineFree: true,
    defaultToppings: ['brown-sugar-pearls'],
  },
  {
    slug: 'roasted-milk-tea',
    name: 'Roasted Milk Tea',
    category: 'signature',
    description: 'Deep-roasted oolong with a toasted, almost smoky finish.',
    prices: { regular: 930, large: 1130 },
    colour: ['#B98A5E', '#6F4522'],
    defaultToppings: ['pearls'],
  },
  {
    slug: 'taro-milk-tea',
    name: 'Taro Milk Tea',
    category: 'signature',
    description: 'Stone-ground taro, nutty and vanilla-sweet, blended thick.',
    prices: { regular: 990, large: 1190 },
    colour: ['#D8C6EC', '#9B7BC4'],
    bestseller: true,
    defaultToppings: ['pearls'],
  },

  // ── Milk Tea ─────────────────────────────────────────────────────────────
  {
    slug: 'jasmine-green-milk-tea',
    name: 'Jasmine Green Milk Tea',
    category: 'milk-tea',
    description: 'Jasmine-scented green tea, floral against the milk.',
    prices: { regular: 890, large: 1090 },
    colour: ['#D9E4C4', '#9CB177'],
  },
  {
    slug: 'earl-grey-milk-tea',
    name: 'Earl Grey Milk Tea',
    category: 'milk-tea',
    description: 'Bergamot-forward Earl Grey with a citrus lift.',
    prices: { regular: 890, large: 1090 },
    colour: ['#CBA983', '#8A5F35'],
  },
  {
    slug: 'oolong-milk-tea',
    name: 'Oolong Milk Tea',
    category: 'milk-tea',
    description: 'Semi-oxidised oolong — orchid on the nose, clean on the finish.',
    prices: { regular: 890, large: 1090 },
    colour: ['#D3B98D', '#93703C'],
  },
  {
    slug: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'milk-tea',
    description: 'Ceremonial-grade matcha whisked to a fine foam.',
    prices: { regular: 1090, large: 1290 },
    colour: ['#BFD8A4', '#6E8F4A'],
  },
  {
    slug: 'thai-pearl-milk-tea',
    name: 'Thai Pearl Milk Tea',
    category: 'milk-tea',
    description: 'Spiced Thai tea, sweet and unmistakably orange.',
    prices: { regular: 990, large: 1190 },
    colour: ['#F0A868', '#C46A24'],
    defaultToppings: ['pearls'],
  },
  {
    slug: 'coconut-milk-tea',
    name: 'Coconut Milk Tea',
    category: 'milk-tea',
    description: 'Black tea and coconut — the most Sri Lankan thing on the menu.',
    prices: { regular: 950, large: 1150 },
    colour: ['#F2E8D8', '#C4A67E'],
    dairyFree: true,
  },

  // ── Fruit Tea ────────────────────────────────────────────────────────────
  {
    slug: 'passionfruit-green-tea',
    name: 'Passion Fruit Green Tea',
    category: 'fruit-tea',
    description: 'Sharp passion fruit over cold-steeped green tea.',
    prices: { regular: 850, large: 1050 },
    colour: ['#FBD46D', '#E08A1E'],
    dairyFree: true,
  },
  {
    slug: 'mango-green-tea',
    name: 'Mango Green Tea',
    category: 'fruit-tea',
    description: 'Ripe mango pulp, no syrup shortcuts.',
    prices: { regular: 890, large: 1090 },
    colour: ['#FFD277', '#EF9A1B'],
    dairyFree: true,
    bestseller: true,
  },
  {
    slug: 'lychee-black-tea',
    name: 'Lychee Black Tea',
    category: 'fruit-tea',
    description: 'Perfumed lychee cut with a firm black tea base.',
    prices: { regular: 890, large: 1090 },
    colour: ['#F7DCE2', '#D98BA0'],
    dairyFree: true,
  },
  {
    slug: 'strawberry-fruit-tea',
    name: 'Strawberry Fruit Tea',
    category: 'fruit-tea',
    description: 'Crushed strawberry, lightly tart.',
    prices: { regular: 950, large: 1150 },
    colour: ['#F8B4C0', '#D24E6B'],
    dairyFree: true,
  },
  {
    slug: 'wood-apple-cooler',
    name: 'Wood Apple Cooler',
    category: 'fruit-tea',
    description:
      'A Sri Lanka exclusive — divul pulp shaken with jasmine tea and a squeeze of lime.',
    prices: { regular: 950, large: 1150 },
    colour: ['#E6C79A', '#A9793F'],
    dairyFree: true,
    isNew: true,
  },

  // ── Chocolate ────────────────────────────────────────────────────────────
  {
    slug: 'milky-hazelnut-chocolate-delight',
    name: 'Milky Hazelnut Chocolate Delight', // ✅ confirmed on @chatimesrilanka
    category: 'chocolate',
    description: 'Hazelnut and cocoa folded through cold fresh milk.',
    prices: { regular: 1150, large: 1350 },
    colour: ['#C99B72', '#5B3720'],
    isNew: true,
    caffeineFree: true,
  },
  {
    slug: 'chocolate-mousse',
    name: 'Chocolate Mousse', // ✅ confirmed on @chatimesrilanka
    category: 'chocolate',
    description: 'Dark cocoa under a thick cap of salted milk mousse.',
    prices: { regular: 1190, large: 1390 },
    colour: ['#B98A62', '#43220F'],
    isNew: true,
    caffeineFree: true,
    defaultToppings: ['mousse'],
  },
  {
    slug: 'hot-chocolate',
    name: 'Hot Chocolate',
    category: 'chocolate',
    description: 'Steamed, spoon-thick, for the hill-country weather.',
    prices: { regular: 1050 },
    colour: ['#A8794F', '#3E2110'],
    servedHot: true,
    caffeineFree: true,
  },

  // ── Fresh Tea ────────────────────────────────────────────────────────────
  {
    slug: 'ceylon-black-tea',
    name: 'Ceylon Black Tea',
    category: 'fresh-tea',
    description: 'Single-origin high-grown Ceylon, brewed and served plain.',
    prices: { regular: 650, large: 800 },
    colour: ['#D9A05B', '#96501C'],
    dairyFree: true,
  },
  {
    slug: 'jasmine-green-tea',
    name: 'Jasmine Green Tea',
    category: 'fresh-tea',
    description: 'Green tea scented with fresh jasmine blossom.',
    prices: { regular: 650, large: 800 },
    colour: ['#DCE8C6', '#A2B87C'],
    dairyFree: true,
  },
  {
    slug: 'roasted-oolong-tea',
    name: 'Roasted Oolong Tea',
    category: 'fresh-tea',
    description: 'Charcoal-roasted oolong, no sugar needed.',
    prices: { regular: 650, large: 800 },
    colour: ['#D2AE79', '#8C5F2C'],
    dairyFree: true,
  },

  // ── Slush ────────────────────────────────────────────────────────────────
  {
    slug: 'mango-slush',
    name: 'Mango Slush',
    category: 'slush',
    description: 'Mango blended to a snow with a mousse cap.',
    prices: { regular: 1090, large: 1290 },
    colour: ['#FFDE95', '#F0A428'],
    dairyFree: true,
    bestseller: true,
  },
  {
    slug: 'passionfruit-slush',
    name: 'Passion Fruit Slush',
    category: 'slush',
    description: 'Tart, icy and bright yellow.',
    prices: { regular: 1090, large: 1290 },
    colour: ['#FCE08A', '#E28A12'],
    dairyFree: true,
  },
  {
    slug: 'taro-slush',
    name: 'Taro Slush',
    category: 'slush',
    description: 'Taro blended with ice into something close to soft-serve.',
    prices: { regular: 1150, large: 1350 },
    colour: ['#E0D2F0', '#A583CE'],
  },
];

// ── Customisation ──────────────────────────────────────────────────────────

export type Topping = {
  id: string;
  name: string;
  price: number;
  /** Rendered as sinking spheres / layers in the cup visual. */
  visual: 'pearl' | 'jelly' | 'foam' | 'pudding';
  colour: string;
};

export const toppings: Topping[] = [
  { id: 'pearls', name: 'Tapioca Pearls', price: 120, visual: 'pearl', colour: '#3A2416' },
  { id: 'brown-sugar-pearls', name: 'Brown Sugar Pearls', price: 160, visual: 'pearl', colour: '#5C3617' },
  { id: 'pudding', name: 'Egg Pudding', price: 150, visual: 'pudding', colour: '#F4D58A' },
  { id: 'grass-jelly', name: 'Grass Jelly', price: 150, visual: 'jelly', colour: '#241E24' }, // ✅ confirmed
  { id: 'coconut-jelly', name: 'Coconut Jelly', price: 150, visual: 'jelly', colour: '#F6F1E7' }, // ✅ confirmed
  { id: 'rainbow-jelly', name: 'Rainbow Jelly', price: 180, visual: 'jelly', colour: '#E86FA8' }, // ✅ confirmed
  { id: 'mango-popping', name: 'Mango Popping Pearls', price: 180, visual: 'pearl', colour: '#F2A825' },
  { id: 'lychee-popping', name: 'Lychee Popping Pearls', price: 180, visual: 'pearl', colour: '#F0BFCE' },
  { id: 'mousse', name: 'Salted Milk Mousse', price: 200, visual: 'foam', colour: '#FBF3E4' },
  { id: 'aloe-vera', name: 'Aloe Vera', price: 160, visual: 'jelly', colour: '#DCEBD2' },
];

export type MilkOption = { id: string; name: string; price: number };

export const milkOptions: MilkOption[] = [
  { id: 'dairy', name: 'Fresh Dairy Milk', price: 0 },
  { id: 'oat', name: 'Oat Milk', price: 150 },
  { id: 'almond', name: 'Almond Milk', price: 150 },
  { id: 'soy', name: 'Soy Milk', price: 120 },
  { id: 'coconut', name: 'Coconut Milk', price: 120 },
];

export const sugarLevels = [0, 25, 50, 75, 100] as const;
export type SugarLevel = (typeof sugarLevels)[number];

export const iceLevels = [
  { id: 'none', name: 'No Ice' },
  { id: 'less', name: 'Less Ice' },
  { id: 'regular', name: 'Regular Ice' },
  { id: 'extra', name: 'Extra Ice' },
] as const;
export type IceLevelId = (typeof iceLevels)[number]['id'];

/** Upcharge for the large size when a drink has no explicit `large` price. */
export const LARGE_UPCHARGE = 200;

// ── Helpers ────────────────────────────────────────────────────────────────

export function formatLKR(amount: number): string {
  return `Rs ${amount.toLocaleString('en-LK')}`;
}

export function drinkBySlug(slug: string): Drink | undefined {
  return drinks.find((d) => d.slug === slug);
}

export function drinksByCategory(id: CategoryId): Drink[] {
  return drinks.filter((d) => d.category === id);
}

export type Selection = {
  drink: Drink;
  size: 'regular' | 'large';
  sugar: SugarLevel;
  ice: IceLevelId;
  milk: string;
  toppings: string[];
};

export function priceOf(selection: Selection): number {
  const { drink, size, milk, toppings: chosen } = selection;
  const base =
    size === 'large'
      ? drink.prices.large ?? drink.prices.regular + LARGE_UPCHARGE
      : drink.prices.regular;
  const milkPrice = milkOptions.find((m) => m.id === milk)?.price ?? 0;
  const toppingsPrice = chosen.reduce(
    (sum, id) => sum + (toppings.find((t) => t.id === id)?.price ?? 0),
    0,
  );
  return base + milkPrice + toppingsPrice;
}
