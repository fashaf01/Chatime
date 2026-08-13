import type { Metadata, Viewport } from "next";
import "./globals.css";

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
  themeColor: "#4c1d51",
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
    <html lang="en-LK">
      <body>
        <a
          href="#menu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-plum focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cream"
        >
          Skip to menu
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
