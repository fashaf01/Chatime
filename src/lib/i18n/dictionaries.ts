/**
 * EN / SI / TA copy.
 *
 * ⚠️  The Sinhala and Tamil strings are a first pass and MUST be reviewed by a
 *     native speaker before launch. Anything unreviewed is marked `// review`.
 *     Drink names are deliberately left in English across all three languages —
 *     that is how they are ordered in-store and how the menu board reads.
 */

export const locales = ['en', 'si', 'ta'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, { label: string; native: string }> = {
  en: { label: 'English', native: 'English' },
  si: { label: 'Sinhala', native: 'සිංහල' },
  ta: { label: 'Tamil', native: 'தமிழ்' },
};

/**
 * Menu category labels, keyed by the `CategoryId` values in `lib/menu.ts`.
 * These are navigation, so they translate — unlike drink names, which stay in
 * English in all three languages because that is how they are ordered in store.
 */
export type CategoryLabels = Record<
  'signature' | 'milk-tea' | 'fruit-tea' | 'chocolate' | 'fresh-tea' | 'slush',
  string
>;

export type Dictionary = {
  categories: CategoryLabels;
  nav: { menu: string; locations: string; about: string; order: string };
  hero: {
    eyebrow: string;
    titleLead: string;
    titleAccent: string;
    body: string;
    ctaMenu: string;
    ctaFind: string;
    scroll: string;
  };
  stats: { stores: string; countries: string; since: string; drinks: string };
  featured: { eyebrow: string; title: string; body: string; viewAll: string };
  story: { eyebrow: string; title: string; body1: string; body2: string };
  build: {
    eyebrow: string;
    title: string;
    body: string;
    cta: string;
    size: string;
    regular: string;
    large: string;
    sugar: string;
    ice: string;
    milk: string;
    toppings: string;
    total: string;
    orderWhatsapp: string;
    orderDelivery: string;
    close: string;
    customise: string;
    noIce: string;
    lessIce: string;
    regularIce: string;
    extraIce: string;
  };
  menu: {
    eyebrow: string;
    title: string;
    body: string;
    all: string;
    filters: string;
    caffeineFree: string;
    dairyFree: string;
    bestseller: string;
    isNew: string;
    hot: string;
    from: string;
    empty: string;
    placeholderNotice: string;
  };
  /** Sunday first, matching JavaScript's `Date.getDay()`. */
  days: [string, string, string, string, string, string, string];
  locations: {
    eyebrow: string;
    title: string;
    body: string;
    directions: string;
    delivery: string;
    openNow: string;
    closed: string;
    comingSoon: string;
    hours: string;
    everyDay: string;
    /** `{time}` and `{day}` are substituted at render time. */
    closesAt: string;
    closesInMinutes: string;
    opensAt: string;
    opensOn: string;
    watchThisSpace: string;
    nextTitle: string;
    nextBody: string;
    nextCta: string;
  };
  about: {
    eyebrow: string;
    title: string;
    lead: string;
    pillars: { title: string; body: string }[];
  };
  footer: {
    tagline: string;
    explore: string;
    visit: string;
    follow: string;
    rights: string;
    built: string;
  };
};

const en: Dictionary = {
  categories: {
    signature: 'Signatures',
    'milk-tea': 'Milk Tea',
    'fruit-tea': 'Fruit Tea',
    chocolate: 'Chocolate',
    'fresh-tea': 'Fresh Tea',
    slush: 'Slush',
  },
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
    noIce: 'No ice',
    lessIce: 'Less',
    regularIce: 'Regular',
    extraIce: 'Extra',
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
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
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
    everyDay: 'Every day',
    closesAt: 'Closes {time}',
    closesInMinutes: 'Closes in {minutes} min',
    opensAt: 'Opens {time}',
    opensOn: 'Opens {time} {day}',
    watchThisSpace: 'Watch this space',
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
  },
  footer: {
    tagline: 'Bringing you the finest authentic bubble tea.',
    explore: 'Explore',
    visit: 'Visit',
    follow: 'Follow',
    rights: 'All rights reserved.',
    built: 'Havelock City Mall, Level 2 · Colombo 05',
  },
};

// review — Sinhala pass 1, needs a native speaker before launch
const si: Dictionary = {
  categories: {
    signature: 'විශේෂ',
    'milk-tea': 'කිරි තේ',
    'fruit-tea': 'පලතුරු තේ',
    chocolate: 'චොකලට්',
    'fresh-tea': 'නැවුම් තේ',
    slush: 'අයිස් බීම',
  },
  nav: { menu: 'මෙනුව', locations: 'ස්ථාන', about: 'අප ගැන', order: 'දැන් ඇණවුම් කරන්න' },
  hero: {
    eyebrow: 'හැව්ලොක් සිටි මෝල් · කොළඹ',
    titleLead: 'සතුටේ',
    titleAccent: 'කෝප්ප',
    body:
      'තායිවානයේ මුල් බබල් ටී, කොළඹදී අලුතින් සාදනු ලැබේ. සැබෑ තේ දළු, දවස පුරා පිසින මුතු, සහ ඔබට අවශ්‍ය ආකාරයටම සාදන ලද කෝප්පයක්.',
    ctaMenu: 'මෙනුව බලන්න',
    ctaFind: 'අප සොයාගන්න',
    scroll: 'පහළට',
  },
  stats: {
    stores: 'ලොව පුරා වෙළඳසැල්',
    countries: 'රටවල්',
    since: 'සිට සාදනු ලැබේ',
    drinks: 'කෝප්පයක් සෑදීමට ක්‍රම',
  },
  featured: {
    eyebrow: 'වැඩිපුරම ඇණවුම් කරන',
    title: 'මෙතැනින් පටන් ගන්න',
    body: 'කොළඹ නැවත නැවතත් පැමිණෙන කෝප්ප හතර.',
    viewAll: 'සම්පූර්ණ මෙනුව බලන්න',
  },
  story: {
    eyebrow: 'අපගේ කතාව',
    title: 'තේ, බැරෑරුම් ලෙස',
    body1:
      'චාටයිම් 2005 දී තායිවානයේ ආරම්භ වූයේ එක් අදහසකින්: බබල් ටී සෑදිය යුත්තේ නිසි ලෙස සාදන ලද තේ වලින් මිස කුඩු වලින් නොවේ. වසර විස්සකට සහ වෙළඳසැල් තුන් දහසකට පසුවත් එය වෙනස් වී නැත.',
    body2:
      'කොළඹදී අපි දවස පුරා කුඩා කාණ්ඩ වශයෙන් තේ සාදන අතර ටැපියෝකා අලුතින් පිසිනවා, මන්ද මුතු වලට ඇත්තේ පැය හතරක කවුළුවක් නිසා.',
  },
  build: {
    eyebrow: 'ඔබේ කෝප්පය සාදන්න',
    title: 'හරියටම ඔබට අවශ්‍ය ලෙස',
    body:
      'පැණි රස, අයිස්, කිරි, ටොපිං — එක් වරක් සකසන්න. සෑම වෙනසක්ම මිල වහාම යාවත්කාලීන කරයි.',
    cta: 'මෙය සකසන්න',
    size: 'ප්‍රමාණය',
    regular: 'සාමාන්‍ය',
    large: 'විශාල',
    sugar: 'සීනි',
    ice: 'අයිස්',
    milk: 'කිරි',
    toppings: 'ටොපිං',
    total: 'එකතුව',
    orderWhatsapp: 'WhatsApp හරහා ඇණවුම් කරන්න',
    orderDelivery: 'ගෙන්වා ගැනීමට ඇණවුම් කරන්න',
    close: 'වසන්න',
    customise: 'සකසන්න',
    noIce: 'අයිස් නැත',
    lessIce: 'අඩුවෙන්',
    regularIce: 'සාමාන්‍ය',
    extraIce: 'වැඩියෙන්',
  },
  menu: {
    eyebrow: 'මෙනුව',
    title: 'අප සාදන සෑම කෝප්පයක්ම',
    body: 'ඔබට අවශ්‍ය ලෙස සාදා මිල දැක ගැනීමට ඕනෑම බීමක් තට්ටු කරන්න.',
    all: 'සියලුම බීම',
    filters: 'පෙරහන',
    caffeineFree: 'කැෆේන් රහිත',
    dairyFree: 'කිරි රහිත',
    bestseller: 'වැඩියෙන්ම අලෙවි වන',
    isNew: 'නවතම',
    hot: 'උණුසුම්',
    from: 'සිට',
    empty: 'එම පෙරහන් වලට කිසිවක් නොගැලපේ.',
    placeholderNotice: 'පෙන්වා ඇති මිල ගණන් තාවකාලික වන අතර වෙළඳසැලෙන් තහවුරු කිරීමට ඇත.',
  },
  days: ['ඉරිදා', 'සඳුදා', 'අඟහරුවාදා', 'බදාදා', 'බ්‍රහස්පතින්දා', 'සිකුරාදා', 'සෙනසුරාදා'],
  locations: {
    eyebrow: 'අප සොයාගන්න',
    title: 'කොහේද බොන්නේ',
    body: 'කොළඹ තුළ එක් නිවහනක්, තවත් ඉදිරියේදී.',
    directions: 'දිශාවන් ලබාගන්න',
    delivery: 'ගෙන්වා ගන්න',
    openNow: 'දැන් විවෘතයි',
    closed: 'වසා ඇත',
    comingSoon: 'ඉක්මනින් විවෘත වේ',
    hours: 'වේලාවන්',
    everyDay: 'සෑම දිනකම',
    closesAt: '{time} ට වැසේ',
    closesInMinutes: 'තව මිනිත්තු {minutes} කින් වැසේ',
    opensAt: '{time} ට විවෘත වේ',
    opensOn: '{day} {time} ට විවෘත වේ',
    watchThisSpace: 'නැරඹීමට රැඳී සිටින්න',
    nextTitle: 'අපි ඊළඟට විවෘත කළ යුත්තේ කොහේද?',
    nextBody: 'චාටයිම් ඊළඟට තිබිය යුත්තේ කොහේද කියා අපි අසමු. Instagram හි කියන්න.',
    nextCta: 'ඔබේ අදහස කියන්න',
  },
  about: {
    eyebrow: 'අප ගැන',
    title: 'අව්‍යාජයි, ඇත්තටම',
    lead:
      'චාටයිම් යනු ලොව පිළිගත් තායිවාන බබල් ටී දාමයකි — දැන් හැව්ලොක් සිටි මෝල් හි 2 වන මහලේ.',
    pillars: [
      {
        title: 'සාදනු ලැබේ, කුඩු නොවේ',
        body: 'ලූස්-ලීෆ් තේ, දවස පුරා අලුතින් සාදා පැය හතරකට පසු ඉවත් කරනු ලැබේ. මුළු වෙනසම එයයි.',
      },
      {
        title: 'අද පිසූ මුතු',
        body: 'ටැපියෝකා ස්ථානයේදීම කුඩා කාණ්ඩ වශයෙන් පිසිනු ලැබේ. මධ්‍යයේ මෘදු, හපන්නට හොඳයි.',
      },
      {
        title: 'ඔබේ කෝප්පය, ඔබේ නීති',
        body: 'සීනි මට්ටම් පහක්, අයිස් මට්ටම් හතරක්, ටොපිං දහයක්, කිරි වර්ග පහක්.',
      },
    ],
  },
  footer: {
    tagline: 'ඔබට හොඳම අව්‍යාජ බබල් ටී ගෙන එයි.',
    explore: 'ගවේෂණය',
    visit: 'පැමිණෙන්න',
    follow: 'අනුගමනය කරන්න',
    rights: 'සියලු හිමිකම් ඇවිරිණි.',
    built: 'හැව්ලොක් සිටි මෝල්, 2 වන මහල · කොළඹ 05',
  },
};

// review — Tamil pass 1, needs a native speaker before launch
const ta: Dictionary = {
  categories: {
    signature: 'சிறப்பு',
    'milk-tea': 'பால் தேநீர்',
    'fruit-tea': 'பழ தேநீர்',
    chocolate: 'சாக்லேட்',
    'fresh-tea': 'புதிய தேநீர்',
    slush: 'ஐஸ் பானம்',
  },
  nav: { menu: 'மெனு', locations: 'இடங்கள்', about: 'எங்களைப் பற்றி', order: 'இப்போது ஆர்டர் செய்' },
  hero: {
    eyebrow: 'ஹேவ்லாக் சிட்டி மால் · கொழும்பு',
    titleLead: 'மகிழ்ச்சியின்',
    titleAccent: 'கோப்பைகள்',
    body:
      'தைவானின் மூல பபிள் டீ, கொழும்பில் புதிதாக தயாரிக்கப்படுகிறது. உண்மையான தேயிலை, நாள் முழுவதும் சமைக்கப்படும் முத்துக்கள், நீங்கள் விரும்பியபடி உருவாக்கப்பட்ட கோப்பை.',
    ctaMenu: 'மெனுவைப் பாருங்கள்',
    ctaFind: 'எங்களைக் கண்டறியுங்கள்',
    scroll: 'கீழே',
  },
  stats: {
    stores: 'உலகளாவிய கடைகள்',
    countries: 'நாடுகள்',
    since: 'முதல் தயாரிக்கிறோம்',
    drinks: 'கோப்பையை உருவாக்கும் வழிகள்',
  },
  featured: {
    eyebrow: 'அதிகம் ஆர்டர் செய்யப்படுபவை',
    title: 'இங்கே தொடங்குங்கள்',
    body: 'கொழும்பு திரும்பத் திரும்ப வரும் நான்கு கோப்பைகள்.',
    viewAll: 'முழு மெனுவைப் பாருங்கள்',
  },
  story: {
    eyebrow: 'எங்கள் கதை',
    title: 'தேநீர், தீவிரமாக',
    body1:
      'சாட்டைம் 2005 இல் தைவானில் ஒரு பிடிவாதமான எண்ணத்துடன் தொடங்கியது: பபிள் டீ தூளில் இருந்து அல்ல, சரியாக தயாரிக்கப்பட்ட தேநீரில் இருந்து செய்யப்பட வேண்டும். இருபது ஆண்டுகள் மற்றும் மூவாயிரம் கடைகளுக்குப் பிறகும் அது மாறவில்லை.',
    body2:
      'கொழும்பில் நாங்கள் நாள் முழுவதும் சிறிய அளவில் தயாரிக்கிறோம், டேபியோக்காவை புதிதாக சமைக்கிறோம் — ஏனெனில் முத்துக்களுக்கு நான்கு மணி நேர கால அவகாசமே உண்டு.',
  },
  build: {
    eyebrow: 'உங்கள் கோப்பையை உருவாக்குங்கள்',
    title: 'சரியாக உங்களுடையது',
    body:
      'இனிப்பு, ஐஸ், பால், டாப்பிங்ஸ் — ஒரு முறை அமைத்தால் போதும். ஒவ்வொரு மாற்றமும் விலையை உடனே புதுப்பிக்கும்.',
    cta: 'இதை தனிப்பயனாக்கு',
    size: 'அளவு',
    regular: 'சாதாரண',
    large: 'பெரிய',
    sugar: 'சர்க்கரை',
    ice: 'ஐஸ்',
    milk: 'பால்',
    toppings: 'டாப்பிங்ஸ்',
    total: 'மொத்தம்',
    orderWhatsapp: 'WhatsApp இல் ஆர்டர் அனுப்பு',
    orderDelivery: 'டெலிவரிக்கு ஆர்டர் செய்',
    close: 'மூடு',
    customise: 'தனிப்பயனாக்கு',
    noIce: 'ஐஸ் இல்லை',
    lessIce: 'குறைவாக',
    regularIce: 'சாதாரண',
    extraIce: 'கூடுதலாக',
  },
  menu: {
    eyebrow: 'மெனு',
    title: 'நாங்கள் தயாரிக்கும் ஒவ்வொரு கோப்பையும்',
    body: 'உங்கள் விருப்பப்படி உருவாக்கி விலையைக் காண எந்த பானத்தையும் தட்டவும்.',
    all: 'அனைத்து பானங்கள்',
    filters: 'வடிகட்டி',
    caffeineFree: 'காஃபின் இல்லாத',
    dairyFree: 'பால் இல்லாத',
    bestseller: 'அதிகம் விற்பனையாகும்',
    isNew: 'புதியது',
    hot: 'சூடானது',
    from: 'முதல்',
    empty: 'அந்த வடிகட்டிகளுக்கு எதுவும் பொருந்தவில்லை.',
    placeholderNotice: 'காட்டப்படும் விலைகள் தற்காலிகமானவை, கடையிடமிருந்து உறுதிப்படுத்தப்பட வேண்டும்.',
  },
  days: ['ஞாயிறு', 'திங்கள்', 'செவ்வாய்', 'புதன்', 'வியாழன்', 'வெள்ளி', 'சனி'],
  locations: {
    eyebrow: 'எங்களைக் கண்டறியுங்கள்',
    title: 'எங்கே குடிப்பது',
    body: 'கொழும்பில் ஒரு இல்லம், மேலும் வரவிருக்கின்றன.',
    directions: 'வழிகாட்டுதல்கள்',
    delivery: 'டெலிவரி ஆர்டர்',
    openNow: 'இப்போது திறந்திருக்கிறது',
    closed: 'மூடப்பட்டுள்ளது',
    comingSoon: 'விரைவில் திறக்கிறது',
    hours: 'நேரம்',
    everyDay: 'தினமும்',
    closesAt: '{time} க்கு மூடப்படும்',
    closesInMinutes: '{minutes} நிமிடங்களில் மூடப்படும்',
    opensAt: '{time} க்கு திறக்கும்',
    opensOn: '{day} {time} க்கு திறக்கும்',
    watchThisSpace: 'விரைவில் அறிவிக்கப்படும்',
    nextTitle: 'அடுத்து எங்கே திறக்க வேண்டும்?',
    nextBody: 'சாட்டைம் அடுத்து எங்கே வர வேண்டும் என்று கேட்கிறோம். Instagram இல் சொல்லுங்கள்.',
    nextCta: 'உங்கள் கருத்தைச் சொல்லுங்கள்',
  },
  about: {
    eyebrow: 'எங்களைப் பற்றி',
    title: 'உண்மையானது, நிஜமாகவே',
    lead:
      'சாட்டைம் என்பது உலகளவில் அறியப்பட்ட தைவான் பபிள் டீ சங்கிலி — இப்போது ஹேவ்லாக் சிட்டி மாலின் நிலை 2 இல்.',
    pillars: [
      {
        title: 'தயாரிக்கப்படுகிறது, தூள் அல்ல',
        body: 'தளர்வான தேயிலை, நாள் முழுவதும் புதிதாக தயாரிக்கப்பட்டு நான்கு மணி நேரத்திற்குப் பிறகு அகற்றப்படுகிறது.',
      },
      {
        title: 'இன்று சமைத்த முத்துக்கள்',
        body: 'டேபியோக்கா இடத்திலேயே சிறிய அளவில் சமைக்கப்படுகிறது. உள்ளே மென்மையாக, நல்ல மென்று சுவையுடன்.',
      },
      {
        title: 'உங்கள் கோப்பை, உங்கள் விதிகள்',
        body: 'ஐந்து சர்க்கரை நிலைகள், நான்கு ஐஸ் நிலைகள், பத்து டாப்பிங்ஸ், ஐந்து பால் வகைகள்.',
      },
    ],
  },
  footer: {
    tagline: 'சிறந்த உண்மையான பபிள் டீயை உங்களுக்கு வழங்குகிறோம்.',
    explore: 'ஆராயுங்கள்',
    visit: 'வருகை',
    follow: 'பின்தொடரவும்',
    rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    built: 'ஹேவ்லாக் சிட்டி மால், நிலை 2 · கொழும்பு 05',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, si, ta };
