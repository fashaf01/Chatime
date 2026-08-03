/**
 * All site copy, in one place. English only.
 *
 * Kept as a single object (rather than inlined into components) so wording can
 * be reviewed and changed without touching layout.
 */

export const copy = {
  nav: { menu: 'Menu', locations: 'Locations', about: 'About', order: 'Order Now' },

  hero: {
    eyebrow: 'Havelock City Mall · Colombo',
    titleLead: 'Cups of',
    titleAccent: 'Joy',
    body:
      'Taiwan’s original bubble tea, brewed fresh in Colombo. Real leaf tea, pearls cooked through the day, and a cup built exactly the way you want it.',
    ctaMenu: 'Explore the menu',
    ctaFind: 'Find us',
    scroll: 'Scroll',
  },

  stats: {
    stores: 'stores worldwide',
    countries: 'countries',
    since: 'brewing since',
    drinks: 'ways to build a cup',
  },

  featured: {
    eyebrow: 'Most ordered',
    title: 'Start here',
    body: 'The four cups Colombo keeps coming back for.',
    viewAll: 'See the full menu',
  },

  story: {
    eyebrow: 'Our story',
    title: 'Tea, taken seriously',
    body1:
      'Chatime began in Taiwan in 2005 with a stubborn idea: bubble tea should be made from properly brewed tea, not powder. Twenty years and three thousand stores later, that has not changed.',
    body2:
      'In Colombo we brew in small batches through the day and cook our tapioca fresh, because pearls have a four-hour window and we would rather throw them out than serve them hard.',
  },

  build: {
    eyebrow: 'Build your cup',
    title: 'Yours, exactly',
    body:
      'Sweetness, ice, milk, toppings — set it once and you have your order for life. Every change updates the price as you go.',
    cta: 'Customise this',
    size: 'Size',
    regular: 'Regular',
    large: 'Large',
    sugar: 'Sugar',
    ice: 'Ice',
    milk: 'Milk',
    toppings: 'Toppings',
    total: 'Total',
    orderWhatsapp: 'Send order on WhatsApp',
    orderDelivery: 'Order for delivery',
    close: 'Close',
    customise: 'Customise',
  },

  menu: {
    eyebrow: 'The menu',
    title: 'Every cup we make',
    body: 'Tap any drink to build it your way and see the price update live.',
    all: 'All drinks',
    filters: 'Filter',
    caffeineFree: 'Caffeine free',
    dairyFree: 'Dairy free',
    bestseller: 'Bestseller',
    isNew: 'New',
    hot: 'Hot',
    from: 'from',
    empty: 'Nothing matches those filters yet.',
    placeholderNotice:
      'Prices shown are indicative and pending confirmation from the store.',
  },

  locations: {
    eyebrow: 'Find us',
    title: 'Where to drink',
    body: 'One home in Colombo, with more on the way.',
    directions: 'Get directions',
    delivery: 'Order delivery',
    openNow: 'Open now',
    closed: 'Closed',
    comingSoon: 'Opening soon',
    hours: 'Hours',
    nextTitle: 'Where should we open next?',
    nextBody:
      'We are asking Sri Lanka where Chatime should land next. Tell us on Instagram.',
    nextCta: 'Make your case',
  },

  about: {
    eyebrow: 'About',
    title: 'Authentic, and we mean it',
    lead:
      'Chatime is a globally recognised Taiwanese bubble tea chain serving an authentic bubble tea experience — now brewing on Level 2 at Havelock City Mall.',
    pillars: [
      {
        title: 'Brewed, never powdered',
        body:
          'Loose-leaf tea, brewed fresh through the day and discarded after four hours. It is the whole difference.',
      },
      {
        title: 'Pearls cooked today',
        body:
          'Tapioca is cooked in small batches on site. Soft in the middle, with a chew that holds.',
      },
      {
        title: 'Your cup, your rules',
        body:
          'Five sugar levels, four ice levels, ten toppings, five milks. Nobody else in Colombo gives you the dial.',
      },
    ],
    process: 'Leaf to cup',
  },

  footer: {
    tagline: 'Bringing you the finest authentic bubble tea.',
    explore: 'Explore',
    visit: 'Visit',
    follow: 'Follow',
    rights: 'All rights reserved.',
    built: 'Havelock City Mall, Level 2 · Colombo 05',
  },
} as const;

export type Copy = typeof copy;
