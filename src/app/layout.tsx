import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { PRICES_ARE_PLACEHOLDER } from '@/lib/menu';
import { outlets } from '@/lib/outlets';

/**
 * Chatime's own typeface is Lasiver, which is commercially licensed. Figtree is
 * the closest free geometric-humanist match and carries the same friendly,
 * round-bowled character across both display and body sizes.
 */
const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const figtreeBody = Figtree({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = 'https://chatime-sri-lanka.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Chatime Sri Lanka · Authentic Taiwanese Bubble Tea in Colombo',
    template: '%s · Chatime Sri Lanka',
  },
  description:
    'Chatime is a globally recognised Taiwanese bubble tea chain serving an authentic bubble tea experience. Build your cup exactly how you like it — Havelock City Mall, Level 2, Colombo 05.',
  keywords: [
    'bubble tea Colombo',
    'Chatime Sri Lanka',
    'boba Colombo',
    'milk tea Sri Lanka',
    'Havelock City Mall',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    url: SITE_URL,
    siteName: 'Chatime Sri Lanka',
    title: 'Chatime Sri Lanka · Cups of Joy',
    description:
      'Authentic Taiwanese bubble tea, brewed fresh in Colombo. Build your cup, your way.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chatime Sri Lanka · Cups of Joy',
    description: 'Authentic Taiwanese bubble tea, brewed fresh in Colombo.',
  },
  icons: { icon: '/chatime-stacked-purple.svg' },
  // Search engines are kept out while the menu prices are placeholders — an
  // indexed page quoting invented prices under the Chatime name would send real
  // customers to the store expecting the wrong figure. Flipping
  // PRICES_ARE_PLACEHOLDER to false in lib/menu.ts opens indexing and removes
  // the on-page notice together, so the two can never disagree.
  robots: PRICES_ARE_PLACEHOLDER
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#500778',
};

/** Google understands this; it is what puts hours and the map pin in search. */
function structuredData() {
  const outlet = outlets[0];
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: 'Chatime Sri Lanka',
    description:
      'Globally recognised Taiwanese bubble tea chain serving an authentic bubble tea experience.',
    url: SITE_URL,
    servesCuisine: 'Bubble Tea',
    priceRange: 'Rs 650 – Rs 1,400',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '21 Havelock Drive',
      addressLocality: 'Colombo',
      postalCode: '00500',
      addressCountry: 'LK',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: outlet.coords.lat,
      longitude: outlet.coords.lng,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '10:00',
        closes: '22:00',
      },
    ],
    sameAs: ['https://www.instagram.com/chatimesrilanka/'],
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${figtreeBody.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
