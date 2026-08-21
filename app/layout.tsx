import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/* Three faces, each with one job. Outfit carries the headlines, Jakarta does
   every piece of UI text, and Instrument Serif appears only where the page
   wants an editorial voice — pull quotes and section marks. All three are
   self-hosted by next/font, so there is no render-blocking request to Google. */

const display = Outfit({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display-src",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans-src",
  display: "swap",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-editorial-src",
  display: "swap",
});

const SITE = "https://chatime-sri-lanka.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Chatime Sri Lanka — Freshly Brewed Bubble Tea, Colombo",
    template: "%s | Chatime Sri Lanka",
  },
  description:
    "Chatime Sri Lanka brews every cup to order at Havelock City Mall, Colombo. Signature pearl milk tea, hand-cooked brown sugar pearls, and a Ceylon series made with tea grown here.",
  keywords: [
    "Chatime Sri Lanka",
    "bubble tea Colombo",
    "boba Sri Lanka",
    "pearl milk tea",
    "Havelock City Mall",
    "Ceylon tea",
    "brown sugar pearl milk",
  ],
  openGraph: {
    type: "website",
    locale: "en_LK",
    url: SITE,
    siteName: "Chatime Sri Lanka",
    title: "Chatime Sri Lanka — Freshly Brewed Bubble Tea, Colombo",
    description:
      "Every cup shaken to order at Havelock City Mall. Signature milk teas, brown sugar pearls, and a Ceylon series you will not find anywhere else.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatime Sri Lanka",
    description: "Freshly brewed bubble tea in Colombo. Shaken to order.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#5c2d91",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** Rich result for the Havelock City Mall store. */
const storeSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: "Chatime Sri Lanka — Havelock City Mall",
  servesCuisine: "Bubble Tea",
  priceRange: "Rs 790 – Rs 1,650",
  url: SITE,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Havelock City Mall, Level 2, 40 Lauries Road",
    addressLocality: "Colombo 05",
    addressCountry: "LK",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "22:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-LK"
      className={`${display.variable} ${body.variable} ${editorial.variable}`}
    >
      <body>
        <a
          href="#drinks"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-grape focus:px-5 focus:py-3 focus:text-sm focus:font-extrabold focus:text-white"
        >
          Skip to drinks
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }}
        />
      </body>
    </html>
  );
}
