import type { Metadata, Viewport } from 'next';
import {
  Noto_Sans_Sinhala,
  Noto_Sans_Tamil,
  Outfit,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/site/Footer';
import { Header } from '@/components/site/Header';
import { LocaleProvider } from '@/lib/i18n/LocaleProvider';
import { PRICES_ARE_PLACEHOLDER } from '@/lib/menu';
import { outlets } from '@/lib/outlets';

const display = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const sinhala = Noto_Sans_Sinhala({
  subsets: ['sinhala'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sinhala',
  display: 'swap',
});

const tamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-tamil',
  display: 'swap',
});

const SITE_URL = 'https://chatime.lk';

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
  themeColor: '#150720',
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
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${sinhala.variable} ${tamil.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        <LocaleProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
