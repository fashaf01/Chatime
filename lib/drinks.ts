/**
 * Menu data for Chatime Sri Lanka.
 *
 * Every drink carries an `art` block instead of an image URL. The illustration
 * engine in components/DrinkArt.tsx turns those parameters into an inline SVG,
 * so a menu of any size costs zero network requests. If real product
 * photography is added later, give a drink a `photo` path and DrinkArt will
 * render that instead — no other code has to change.
 */

export type ToppingKind =
  | "pearl"
  | "brownSugarPearl"
  | "grassJelly"
  | "pudding"
  | "aloe"
  | "popping"
  | "redBean"
  | "none";

export type CategoryId =
  | "signature"
  | "brown-sugar"
  | "ceylon"
  | "fruity"
  | "mousse"
  | "fresh-tea";

export type Badge = "signature" | "new" | "ceylon" | "bestseller";

export type Drink = {
  id: string;
  name: string;
  category: CategoryId;
  blurb: string;
  /** Regular size, Sri Lankan rupees. */
  price: number;
  priceLarge: number;
  badge?: Badge;
  dairy: boolean;
  caffeine: "none" | "low" | "medium" | "high";
  /** Optional real photograph. When present it replaces the generated art. */
  photo?: string;
  art: {
    /** Liquid gradient, top to bottom. */
    liquidTop: string;
    liquidBottom: string;
    /** Foam / crema cap floating on the surface. */
    crema?: string;
    /** Caramel streaks down the inside of the cup. */
    swirl?: string;
    topping: ToppingKind;
    ice?: boolean;
  };
};

export type Category = {
  id: CategoryId;
  label: string;
  tagline: string;
  /** Card background for the category tiles. */
  accent: string;
  /** Drink shown on the category card. */
  heroId: string;
};

export const categories: Category[] = [
  {
    id: "signature",
    label: "Signature Milk Tea",
    tagline: "The originals. Shaken to order, every single cup.",
    accent: "#5C2D91",
    heroId: "chatime-milk-tea",
  },
  {
    id: "brown-sugar",
    label: "Brown Sugar",
    tagline: "Hand-cooked pearls, caramel streaked down the glass.",
    accent: "#8A5321",
    heroId: "brown-sugar-pearl",
  },
  {
    id: "ceylon",
    label: "Ceylon Series",
    tagline: "Made only in Sri Lanka, from tea grown up the road.",
    accent: "#4C6B3C",
    heroId: "king-coconut",
  },
  {
    id: "fruity",
    label: "Fruity Tea",
    tagline: "Real fruit, cold-shaken, no syrup shortcuts.",
    accent: "#E5751B",
    heroId: "mango-green-tea",
  },
  {
    id: "mousse",
    label: "Mousse & Crema",
    tagline: "A salted cheese cloud on top. Drink it lid-off.",
    accent: "#3F7A55",
    heroId: "matcha-crema",
  },
  {
    id: "fresh-tea",
    label: "Fresh Tea",
    tagline: "Just leaf and water. Brewed in small batches all day.",
    accent: "#35A0C0",
    heroId: "jasmine-green",
  },
];

export const drinks: Drink[] = [
  // ---------------------------------------------------------------- signature
  {
    id: "chatime-milk-tea",
    name: "Chatime Pearl Milk Tea",
    category: "signature",
    blurb:
      "The one that started everything. Black tea shaken with milk over warm tapioca pearls.",
    price: 990,
    priceLarge: 1190,
    badge: "signature",
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#C8A17E",
      liquidBottom: "#9A6F4F",
      topping: "pearl",
      ice: true,
    },
  },
  {
    id: "roasted-milk-tea",
    name: "Roasted Milk Tea",
    category: "signature",
    blurb:
      "Double-roasted leaf. Toasted grain and a woody finish that lingers past the last sip.",
    price: 1050,
    priceLarge: 1250,
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#B98A63",
      liquidBottom: "#7E5335",
      topping: "pearl",
      ice: true,
    },
  },
  {
    id: "taro-milk-tea",
    name: "Taro Milk Tea",
    category: "signature",
    blurb:
      "Stone-ground taro whipped into fresh milk. Nutty, vanilla-sweet, impossibly smooth.",
    price: 1150,
    priceLarge: 1350,
    badge: "bestseller",
    dairy: true,
    caffeine: "none",
    art: {
      liquidTop: "#CDBBE4",
      liquidBottom: "#9C82C4",
      topping: "pearl",
    },
  },
  {
    id: "hokkaido-milk-tea",
    name: "Hokkaido Milk Tea",
    category: "signature",
    blurb:
      "Caramelised milk tea with a butterscotch edge. Comes with pudding, and it should.",
    price: 1190,
    priceLarge: 1390,
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#DBA96A",
      liquidBottom: "#A9713A",
      topping: "pudding",
      ice: true,
    },
  },
  {
    id: "matcha-milk-tea",
    name: "Matcha Red Bean",
    category: "signature",
    blurb:
      "Ceremonial-grade Uji matcha, fresh milk, and slow-simmered red bean at the bottom.",
    price: 1290,
    priceLarge: 1490,
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#A8C48A",
      liquidBottom: "#6E9150",
      topping: "redBean",
    },
  },
  {
    id: "thai-milk-tea",
    name: "Thai Milk Tea",
    category: "signature",
    blurb:
      "Spiced orange-hued tea, condensed milk, star anise warmth. Sweet and unapologetic.",
    price: 1090,
    priceLarge: 1290,
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#F0A552",
      liquidBottom: "#C56A22",
      topping: "pearl",
      ice: true,
    },
  },
  {
    id: "chocolate-milk-tea",
    name: "Dark Chocolate Milk Tea",
    category: "signature",
    blurb:
      "Single-origin cocoa folded through black tea. Bitter enough to stay interesting.",
    price: 1150,
    priceLarge: 1350,
    dairy: true,
    caffeine: "low",
    art: {
      liquidTop: "#8A6248",
      liquidBottom: "#4E3324",
      topping: "pearl",
    },
  },
  {
    id: "coffee-milk-tea",
    name: "Coffee Milk Tea",
    category: "signature",
    blurb:
      "Espresso pulled into assam milk tea. The 3pm drink that actually works.",
    price: 1150,
    priceLarge: 1350,
    dairy: true,
    caffeine: "high",
    art: {
      liquidTop: "#A07C5B",
      liquidBottom: "#5E3F2A",
      topping: "pearl",
      ice: true,
    },
  },

  // ------------------------------------------------------------- brown sugar
  {
    id: "brown-sugar-pearl",
    name: "Brown Sugar Pearl Milk",
    category: "brown-sugar",
    blurb:
      "Pearls cooked in muscovado for three hours, streaked down cold fresh milk. No tea, all texture.",
    price: 1290,
    priceLarge: 1490,
    badge: "bestseller",
    dairy: true,
    caffeine: "none",
    art: {
      liquidTop: "#F4EBE0",
      liquidBottom: "#E4D3C0",
      swirl: "#8A5321",
      topping: "brownSugarPearl",
      ice: true,
    },
  },
  {
    id: "brown-sugar-milk-tea",
    name: "Brown Sugar Pearl Milk Tea",
    category: "brown-sugar",
    blurb:
      "Same hand-cooked pearls, now with a black tea backbone to cut the sweetness.",
    price: 1350,
    priceLarge: 1550,
    badge: "signature",
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#D8B48D",
      liquidBottom: "#A97A4C",
      swirl: "#7A4718",
      topping: "brownSugarPearl",
      ice: true,
    },
  },
  {
    id: "brown-sugar-oat",
    name: "Brown Sugar Oat Latte",
    category: "brown-sugar",
    blurb:
      "Barista oat milk instead of dairy. Creamier than you expect, and fully plant-based.",
    price: 1390,
    priceLarge: 1590,
    badge: "new",
    dairy: false,
    caffeine: "none",
    art: {
      liquidTop: "#EFE2CE",
      liquidBottom: "#D6BF9F",
      swirl: "#8A5321",
      topping: "brownSugarPearl",
      ice: true,
    },
  },
  {
    id: "brown-sugar-taro",
    name: "Brown Sugar Taro",
    category: "brown-sugar",
    blurb: "Taro paste and caramel pearls layered in the same cup. Purple, striped, ridiculous.",
    price: 1390,
    priceLarge: 1590,
    dairy: true,
    caffeine: "none",
    art: {
      liquidTop: "#D3C0E8",
      liquidBottom: "#A98BCE",
      swirl: "#7A4718",
      topping: "brownSugarPearl",
    },
  },

  // ------------------------------------------------------------------ ceylon
  {
    id: "ceylon-highland",
    name: "Nuwara Eliya Highland Milk Tea",
    category: "ceylon",
    blurb:
      "High-grown Ceylon leaf from 1,900m, brewed strong and shaken with milk. Brisk, bright, ours.",
    price: 1190,
    priceLarge: 1390,
    badge: "ceylon",
    dairy: true,
    caffeine: "high",
    art: {
      liquidTop: "#C99A6E",
      liquidBottom: "#8E5F39",
      topping: "pearl",
      ice: true,
    },
  },
  {
    id: "king-coconut",
    name: "King Coconut Green Tea",
    category: "ceylon",
    blurb:
      "Thambili pressed the morning it is served, over jasmine green tea and coconut jelly.",
    price: 1250,
    priceLarge: 1450,
    badge: "ceylon",
    dairy: false,
    caffeine: "low",
    art: {
      liquidTop: "#F5EFC8",
      liquidBottom: "#D9CE86",
      topping: "aloe",
      ice: true,
    },
  },
  {
    id: "wood-apple",
    name: "Wood Apple Cream",
    category: "ceylon",
    blurb:
      "Divul pulp whisked with fresh milk and a pinch of jaggery. The childhood one.",
    price: 1290,
    priceLarge: 1490,
    badge: "new",
    dairy: true,
    caffeine: "none",
    art: {
      liquidTop: "#C6A98A",
      liquidBottom: "#8E7050",
      crema: "#F2E6D5",
      topping: "none",
    },
  },
  {
    id: "faluda-shake",
    name: "Faluda Pearl Shake",
    category: "ceylon",
    blurb:
      "Rose syrup, basil seed, vanilla ice cream and pearls. Colombo in a cup, done properly.",
    price: 1450,
    priceLarge: 1650,
    badge: "ceylon",
    dairy: true,
    caffeine: "none",
    art: {
      liquidTop: "#F4B6C8",
      liquidBottom: "#D2647F",
      crema: "#FBEEF2",
      topping: "popping",
    },
  },
  {
    id: "ceylon-ginger",
    name: "Ceylon Ginger Black Tea",
    category: "ceylon",
    blurb:
      "Low-country leaf with fresh ginger and a twist of lime. Served hot or over ice.",
    price: 950,
    priceLarge: 1150,
    dairy: false,
    caffeine: "high",
    art: {
      liquidTop: "#D9A962",
      liquidBottom: "#9C5F28",
      topping: "none",
      ice: true,
    },
  },

  // ------------------------------------------------------------------ fruity
  {
    id: "mango-green-tea",
    name: "Mango Green Tea",
    category: "fruity",
    blurb:
      "Karthakolomban mango purée against floral jasmine green. Peak-season fruit only.",
    price: 1090,
    priceLarge: 1290,
    badge: "bestseller",
    dairy: false,
    caffeine: "low",
    art: {
      liquidTop: "#FFD166",
      liquidBottom: "#F0913A",
      topping: "popping",
      ice: true,
    },
  },
  {
    id: "passionfruit",
    name: "Passionfruit Green Tea",
    category: "fruity",
    blurb: "Sharp, seedy, properly sour. The one people order twice.",
    price: 1050,
    priceLarge: 1250,
    dairy: false,
    caffeine: "low",
    art: {
      liquidTop: "#FFC94D",
      liquidBottom: "#E8792B",
      topping: "aloe",
      ice: true,
    },
  },
  {
    id: "lychee",
    name: "Lychee Black Tea",
    category: "fruity",
    blurb: "Floral lychee over a clean black tea base. Light enough to drink fast.",
    price: 1050,
    priceLarge: 1250,
    dairy: false,
    caffeine: "medium",
    art: {
      liquidTop: "#F7DCE4",
      liquidBottom: "#E2A9BC",
      topping: "popping",
      ice: true,
    },
  },
  {
    id: "peach-oolong",
    name: "Peach Oolong",
    category: "fruity",
    blurb: "Roasted oolong with white peach. Stone fruit and smoke, somehow.",
    price: 1150,
    priceLarge: 1350,
    dairy: false,
    caffeine: "medium",
    art: {
      liquidTop: "#FFCBA8",
      liquidBottom: "#E89264",
      topping: "aloe",
      ice: true,
    },
  },
  {
    id: "wildberry",
    name: "Wildberry Mojito",
    category: "fruity",
    blurb: "Mixed berries, mint leaf, soda. Zero tea, maximum refresh.",
    price: 1190,
    priceLarge: 1390,
    badge: "new",
    dairy: false,
    caffeine: "none",
    art: {
      liquidTop: "#D488C8",
      liquidBottom: "#8E3E86",
      topping: "popping",
      ice: true,
    },
  },
  {
    id: "winter-melon",
    name: "Winter Melon Tea",
    category: "fruity",
    blurb: "Caramelised gourd, brewed down slow. Tastes like toffee and hay.",
    price: 950,
    priceLarge: 1150,
    dairy: false,
    caffeine: "none",
    art: {
      liquidTop: "#D7B879",
      liquidBottom: "#A57F43",
      topping: "pearl",
      ice: true,
    },
  },

  // ------------------------------------------------------------------ mousse
  {
    id: "grass-jelly-sencha",
    name: "Grass Jelly Sencha",
    category: "mousse",
    blurb:
      "Toasted sencha with silky grass jelly and a salted crema cap. The quiet favourite.",
    price: 1250,
    priceLarge: 1450,
    badge: "bestseller",
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#A9BE84",
      liquidBottom: "#6F8A4E",
      crema: "#F6F1E2",
      topping: "grassJelly",
    },
  },
  {
    id: "jasmine-mousse",
    name: "Jasmine Green Mousse",
    category: "mousse",
    blurb: "Jasmine green tea under a salted cheese cloud. Sip it through the foam.",
    price: 1250,
    priceLarge: 1450,
    dairy: true,
    caffeine: "low",
    art: {
      liquidTop: "#C9DBA6",
      liquidBottom: "#8FAE6B",
      crema: "#FAF6EA",
      topping: "none",
      ice: true,
    },
  },
  {
    id: "matcha-crema",
    name: "Matcha Crema Cloud",
    category: "mousse",
    blurb:
      "Layered matcha, matcha pudding, and a matcha crema on top. Green all the way down.",
    price: 1390,
    priceLarge: 1590,
    badge: "signature",
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#9FC17E",
      liquidBottom: "#5F8544",
      crema: "#EDF3DF",
      topping: "pudding",
    },
  },
  {
    id: "oolong-mousse",
    name: "Roasted Oolong Mousse",
    category: "mousse",
    blurb: "Charcoal-roasted oolong, salted crema, no sugar needed. Order it zero.",
    price: 1250,
    priceLarge: 1450,
    dairy: true,
    caffeine: "medium",
    art: {
      liquidTop: "#C79A6B",
      liquidBottom: "#8B5E36",
      crema: "#F7F0E4",
      topping: "none",
      ice: true,
    },
  },

  // --------------------------------------------------------------- fresh tea
  {
    id: "jasmine-green",
    name: "Jasmine Green Tea",
    category: "fresh-tea",
    blurb: "Small-batch brewed every two hours. Nothing added unless you ask.",
    price: 790,
    priceLarge: 950,
    dairy: false,
    caffeine: "low",
    art: {
      liquidTop: "#E4EFC4",
      liquidBottom: "#B9CF85",
      topping: "none",
      ice: true,
    },
  },
  {
    id: "ceylon-black",
    name: "Pure Ceylon Black",
    category: "fresh-tea",
    blurb: "Single-estate Dimbula leaf. Astringent, clean, and best taken plain.",
    price: 790,
    priceLarge: 950,
    badge: "ceylon",
    dairy: false,
    caffeine: "high",
    art: {
      liquidTop: "#C08A4E",
      liquidBottom: "#87511F",
      topping: "none",
      ice: true,
    },
  },
  {
    id: "roasted-oolong",
    name: "Roasted Oolong",
    category: "fresh-tea",
    blurb: "Charcoal-fired and nutty. The one the tea people order.",
    price: 850,
    priceLarge: 1050,
    dairy: false,
    caffeine: "medium",
    art: {
      liquidTop: "#D2A470",
      liquidBottom: "#96683A",
      topping: "none",
      ice: true,
    },
  },
  {
    id: "lemon-ceylon",
    name: "Lemon Ceylon Ice Tea",
    category: "fresh-tea",
    blurb: "Black tea, pressed lemon, a little cane sugar. The house pour.",
    price: 850,
    priceLarge: 1050,
    dairy: false,
    caffeine: "medium",
    art: {
      liquidTop: "#F2D98A",
      liquidBottom: "#C99A3E",
      topping: "none",
      ice: true,
    },
  },
];

export type ToppingOption = {
  id: ToppingKind;
  label: string;
  price: number;
};

export const toppingOptions: ToppingOption[] = [
  { id: "pearl", label: "Tapioca Pearls", price: 150 },
  { id: "brownSugarPearl", label: "Brown Sugar Pearls", price: 200 },
  { id: "grassJelly", label: "Grass Jelly", price: 150 },
  { id: "pudding", label: "Egg Pudding", price: 180 },
  { id: "aloe", label: "Aloe Vera", price: 180 },
  { id: "popping", label: "Popping Pearls", price: 200 },
  { id: "redBean", label: "Red Bean", price: 180 },
];

export const sugarLevels = ["0%", "30%", "50%", "70%", "100%"] as const;
export const iceLevels = ["No Ice", "Less Ice", "Regular", "Extra Ice"] as const;

export const formatLKR = (value: number) =>
  `Rs ${value.toLocaleString("en-LK")}`;
