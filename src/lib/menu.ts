/**
 * THE MENU FILE — the only file you need to edit to correct the menu.
 *
 * ⚠️  PRICES BELOW ARE PLACEHOLDERS. Replace every `prices` value with the real
 *     LKR figures from the in-store menu board, then set
 *     PRICES_ARE_PLACEHOLDER to false. That one flag removes the on-page
 *     notice AND opens the site to search engines (see app/layout.tsx).
 *
 * ℹ️  For reference, Bing Chun Sri Lanka — a direct Colombo competitor — prices
 *     its bubble tea at Rs 200–650. The placeholders here sit at Rs 650–1,390
 *     on the assumption Chatime is positioned above them. If that assumption is
 *     wrong the whole range needs to come down, so check before launch.
 *
 * Images in `public/products/` are Chatime's own product photography, taken
 * from the asset server the global sites use (portal.chatime.com.au). Every
 * drink here has a real photo of that drink — no placeholders, no stand-ins.
 */

export const PRICES_ARE_PLACEHOLDER = true;

export type CategoryId =
  | 'signature'
  | 'milk-tea'
  | 'fruit-tea'
  | 'chocolate'
  | 'fresh-tea'
  | 'frozen';

export type Category = {
  id: CategoryId;
  name: string;
  tagline: string;
  /** Brand accent used for this category's chip and card wash. */
  accent: string;
};

export const categories: Category[] = [
  { id: 'signature', name: 'Signatures', tagline: 'The ones we are known for', accent: '#500778' },
  { id: 'milk-tea', name: 'Milk Tea', tagline: 'Brewed, shaken, softened with milk', accent: '#812990' },
  { id: 'fruit-tea', name: 'Fruit Tea', tagline: 'Real fruit, cold and bright', accent: '#F47929' },
  { id: 'chocolate', name: 'Chocolate', tagline: 'Rich, cocoa-forward, indulgent', accent: '#8B5E34' },
  { id: 'fresh-tea', name: 'Fresh Tea', tagline: 'Pure leaf, nothing hiding', accent: '#00A664' },
  { id: 'frozen', name: 'Frozen', tagline: 'Blended with ice, built for 30°C', accent: '#19BECF' },
];

export type Drink = {
  slug: string;
  name: string;
  category: CategoryId;
  description: string;
  /** LKR. `large` omitted = single size only. */
  prices: { regular: number; large?: number };
  /** Official Chatime product photograph in public/products/. */
  image: string;
  /** Tint behind the photo on cards. */
  colour: [string, string];
  bestseller?: boolean;
  isNew?: boolean;
  caffeineFree?: boolean;
  dairyFree?: boolean;
  servedHot?: boolean;
  defaultToppings?: string[];
};

export const drinks: Drink[] = [
  // ── Signatures ───────────────────────────────────────────────────────────
  {
    slug: 'signature-milk-tea',
    name: 'Chatime Signature Milk Tea',
    category: 'signature',
    description:
      'The original. Black tea brewed fresh every four hours, shaken with milk until it turns silk.',
    prices: { regular: 890, large: 1090 },
    image: '/products/signature-milk-tea.png',
    colour: ['#E8D5BC', '#B98A5E'],
    bestseller: true,
    defaultToppings: ['pearls'],
  },
  {
    slug: 'brown-sugar-pearl-milk',
    name: 'Brown Sugar Pearl Fresh Milk',
    category: 'signature',
    description: 'Pearls simmered in brown sugar syrup, striped down a cup of cold fresh milk.',
    prices: { regular: 1090, large: 1290 },
    image: '/products/brown-sugar-pearl-milk.png',
    colour: ['#F0E2CE', '#8B5E34'],
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
    image: '/products/roasted-milk-tea.png',
    colour: ['#E4CBAA', '#8A5A2B'],
    defaultToppings: ['pearls'],
  },
  {
    slug: 'taro-milk-tea',
    name: 'Taro Milk Tea',
    category: 'signature',
    description: 'Stone-ground taro, nutty and vanilla-sweet, blended thick.',
    prices: { regular: 990, large: 1190 },
    image: '/products/taro-milk-tea.png',
    colour: ['#E7DAF3', '#9B7BC4'],
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
    image: '/products/jasmine-green-milk-tea.png',
    colour: ['#E6EDD6', '#9CB177'],
  },
  {
    slug: 'earl-grey-milk-tea',
    name: 'Earl Grey Milk Tea',
    category: 'milk-tea',
    description: 'Bergamot-forward Earl Grey with a citrus lift.',
    prices: { regular: 890, large: 1090 },
    image: '/products/earl-grey-milk-tea.png',
    colour: ['#E7D2B6', '#8A5F35'],
  },
  {
    slug: 'oolong-milk-tea',
    name: 'Oolong Milk Tea',
    category: 'milk-tea',
    description: 'Semi-oxidised oolong — orchid on the nose, clean on the finish.',
    prices: { regular: 890, large: 1090 },
    image: '/products/oolong-milk-tea.png',
    colour: ['#E9D6B4', '#93703C'],
  },
  {
    slug: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'milk-tea',
    description: 'Ceremonial-grade matcha whisked to a fine foam.',
    prices: { regular: 1090, large: 1290 },
    image: '/products/matcha-latte.png',
    colour: ['#D8E8C2', '#6E8F4A'],
  },
  {
    slug: 'thai-pearl-milk-tea',
    name: 'Thai Pearl Milk Tea',
    category: 'milk-tea',
    description: 'Spiced Thai tea, sweet and unmistakably orange.',
    prices: { regular: 990, large: 1190 },
    image: '/products/thai-pearl-milk-tea.png',
    colour: ['#FBD9B4', '#C46A24'],
    defaultToppings: ['pearls'],
  },
  {
    slug: 'coconut-milk-tea',
    name: 'Coconut Milk Tea',
    category: 'milk-tea',
    description: 'Black tea and coconut — the most Sri Lankan thing on the menu.',
    prices: { regular: 950, large: 1150 },
    image: '/products/coconut-milk-tea.png',
    colour: ['#F5EDE0', '#C4A67E'],
    dairyFree: true,
  },
  {
    slug: 'honeydew-milk-tea',
    name: 'Honeydew Milk Tea',
    category: 'milk-tea',
    description: 'Melon-sweet and pale green, a gentle one.',
    prices: { regular: 950, large: 1150 },
    image: '/products/honeydew-milk-tea.png',
    colour: ['#E4F0D5', '#8FB064'],
  },
  {
    slug: 'cookies-cream',
    name: 'Cookies & Cream',
    category: 'milk-tea',
    description: 'Crushed biscuit blended through cold milk. The dessert of the menu.',
    prices: { regular: 1150, large: 1350 },
    image: '/products/cookies-cream.png',
    colour: ['#EFEAE4', '#6D625A'],
    caffeineFree: true,
    bestseller: true,
  },

  // ── Fruit Tea ────────────────────────────────────────────────────────────
  {
    slug: 'passionfruit-green-tea',
    name: 'Passion Fruit Green Tea',
    category: 'fruit-tea',
    description: 'Sharp passion fruit over cold-steeped green tea.',
    prices: { regular: 850, large: 1050 },
    image: '/products/passionfruit-green-tea.png',
    colour: ['#FDE9A9', '#E08A1E'],
    dairyFree: true,
  },
  {
    slug: 'mango-green-tea',
    name: 'Mango Green Tea',
    category: 'fruit-tea',
    description: 'Ripe mango pulp, no syrup shortcuts.',
    prices: { regular: 890, large: 1090 },
    image: '/products/mango-green-tea.png',
    colour: ['#FFE3A6', '#EF9A1B'],
    dairyFree: true,
    bestseller: true,
  },
  {
    slug: 'lychee-black-tea',
    name: 'Lychee Black Tea',
    category: 'fruit-tea',
    description: 'Perfumed lychee cut with a firm black tea base.',
    prices: { regular: 890, large: 1090 },
    image: '/products/lychee-black-tea.png',
    colour: ['#FAE6EA', '#D98BA0'],
    dairyFree: true,
  },
  {
    slug: 'strawberry-fruit-tea',
    name: 'Strawberry Fruit Tea',
    category: 'fruit-tea',
    description: 'Crushed strawberry, lightly tart.',
    prices: { regular: 950, large: 1150 },
    image: '/products/strawberry-fruit-tea.png',
    colour: ['#FBC7D1', '#D24E6B'],
    dairyFree: true,
  },
  {
    slug: 'guava-grapefruit-tea',
    name: 'Guava Grapefruit Green Tea',
    category: 'fruit-tea',
    description: 'Tropical guava against a bitter grapefruit edge.',
    prices: { regular: 950, large: 1150 },
    image: '/products/guava-cooler.png',
    colour: ['#FBD9D0', '#D2653F'],
    dairyFree: true,
    isNew: true,
  },
  {
    slug: 'watermelon-tea',
    name: 'Watermelon Green Tea',
    category: 'fruit-tea',
    description: 'Fresh watermelon, barely sweetened. The hot-afternoon order.',
    prices: { regular: 950, large: 1150 },
    image: '/products/watermelon-tea.png',
    colour: ['#FBCBCB', '#DB4B54'],
    dairyFree: true,
  },

  // ── Chocolate ────────────────────────────────────────────────────────────
  {
    slug: 'milky-hazelnut-chocolate',
    name: 'Milky Hazelnut Chocolate Delight', // ✅ confirmed on @chatimesrilanka
    category: 'chocolate',
    description: 'Hazelnut and cocoa folded through cold fresh milk.',
    prices: { regular: 1150, large: 1350 },
    image: '/products/milky-hazelnut-chocolate.png',
    colour: ['#E2C6AA', '#5B3720'],
    isNew: true,
    caffeineFree: true,
  },
  {
    slug: 'chocolate-mousse',
    name: 'Chocolate Mousse', // ✅ confirmed on @chatimesrilanka
    category: 'chocolate',
    description: 'Dark cocoa under a thick cap of salted milk mousse.',
    prices: { regular: 1190, large: 1390 },
    image: '/products/iced-chocolate.png',
    colour: ['#DCC1AA', '#43220F'],
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
    image: '/products/chocolate-mousse.png',
    colour: ['#D8B594', '#3E2110'],
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
    image: '/products/ceylon-black-tea.png',
    colour: ['#EFCFA4', '#96501C'],
    dairyFree: true,
  },
  {
    slug: 'jasmine-green-tea',
    name: 'Jasmine Green Tea',
    category: 'fresh-tea',
    description: 'Green tea scented with fresh jasmine blossom.',
    prices: { regular: 650, large: 800 },
    image: '/products/jasmine-green-tea.png',
    colour: ['#E7F0D8', '#A2B87C'],
    dairyFree: true,
  },

  // ── Frozen ───────────────────────────────────────────────────────────────
  {
    slug: 'mango-slush',
    name: 'Mango Frozen',
    category: 'frozen',
    description: 'Mango blended to a snow with a mousse cap.',
    prices: { regular: 1090, large: 1290 },
    image: '/products/mango-slush.png',
    colour: ['#FFE7B0', '#F0A428'],
    dairyFree: true,
    bestseller: true,
  },
  {
    slug: 'passionfruit-slush',
    name: 'Passion Fruit Frozen',
    category: 'frozen',
    description: 'Tart, icy and bright yellow.',
    prices: { regular: 1090, large: 1290 },
    image: '/products/passionfruit-slush.png',
    colour: ['#FDEBA6', '#E28A12'],
    dairyFree: true,
  },
  {
    slug: 'matcha-frozen',
    name: 'Matcha Frozen',
    category: 'frozen',
    description: 'Matcha blended with ice into something close to soft-serve.',
    prices: { regular: 1150, large: 1350 },
    image: '/products/matcha-frozen.png',
    colour: ['#DCEBC4', '#7C9C52'],
  },
];

// ── Customisation ──────────────────────────────────────────────────────────

export type Topping = {
  id: string;
  name: string;
  price: number;
  /**
   * How the topping is drawn in the live cup preview. Product photographs
   * cannot show a cup at 25% sugar with grass jelly, so the customiser keeps a
   * drawn cup that reacts to the options; the photos do the selling everywhere
   * else.
   */
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

export function categoryById(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}

export type Selection = {
  drink: Drink;
  size: 'regular' | 'large';
  sugar: SugarLevel;
  ice: IceLevelId;
  milk: string;
  toppings: string[];
};

/** Price for one cup with the given options. */
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

/** Human-readable one-line summary of the options, for the cart and the order. */
export function describeSelection(s: Selection): string {
  const parts = [
    s.size === 'large' ? 'Large' : 'Regular',
    `${s.sugar}% sugar`,
    iceLevels.find((i) => i.id === s.ice)?.name ?? '',
  ];
  const milk = milkOptions.find((m) => m.id === s.milk);
  if (milk && milk.price > 0) parts.push(milk.name);
  const tops = s.toppings
    .map((id) => toppings.find((t) => t.id === id)?.name)
    .filter(Boolean) as string[];
  if (tops.length) parts.push(tops.join(', '));
  return parts.filter(Boolean).join(' · ');
}
