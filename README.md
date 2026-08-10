# Chatime Sri Lanka

Marketing site for Chatime Sri Lanka — Havelock City Mall, Level 2, Colombo 05.

Next.js 15 · React 19 · Tailwind · Framer Motion. Static output, no database, no
backend. `npm run dev`, `npm run build`.

**Live:** https://chatime-sri-lanka.vercel.app

## Brand

Colours and assets were sampled from the official sites rather than invented.
chatime.com and chatime.com.au run the same global design system and ship the
identical logo file, so these are the real brand values:

| Role | Hex |
|---|---|
| Primary purple | `#500778` |
| Secondary purple / magenta | `#5C2D91` · `#812990` |
| Lilac / section tint | `#B296C8` · `#F0EAF4` |
| Accents | `#19BECF` cyan · `#00A664` green · `#F47929` orange · `#F16776` coral |
| Logo leaf | `#75B743` |

The logo in `public/` is the official stacked mark taken from the asset the
global sites serve. `chatime-stacked-white.svg` is the original (white badge, for
purple backgrounds); `chatime-stacked-purple.svg` is the same artwork with the
circle and lettering swapped so it reads on white.

Chatime's own typeface is **Lasiver**, which is commercially licensed. The site
uses **Figtree** — the closest free geometric-humanist match, same tall x-height
and circular bowls — so it reads as Chatime without licensing the original.

The site is white-first with purple as the brand act, matching how the official
sites are laid out: purple full-bleed panels for the hero and mobile menu, white
everywhere else.

## What makes this different from the other Chatime sites

Every other Chatime country site was reviewed before this was built. All 17 share
the same four gaps, and this site closes them:

| | Elsewhere | Here |
|---|---|---|
| Prices | Only the UK shows any | Every drink, in LKR, per size |
| Customisation | No site on earth offers it | Full cup builder with live pricing |
| Ordering | Dead-ends into a portal or nothing | Hands off to WhatsApp / Uber Eats |
| Locator | A search box and a flat list | Hours, open-now status, directions |

The cup builder is the centrepiece. The SVG cup in `components/menu/CupVisual`
redraws as you change size, sugar, ice and toppings — pearls drop in, jelly
suspends, mousse caps the top, the liquid pales as you drop the sugar.

## ⚠️ Before this goes live

### 1. Prices — `src/lib/menu.ts`

**Every price in this file is a placeholder.** They are plausible Colombo
bubble-tea prices, not Chatime Sri Lanka's real ones. No price list is published
anywhere online — the Uber Eats listing sits behind a bot check.

Replace every `prices` value with the real figures from the in-store menu board,
then set `PRICES_ARE_PLACEHOLDER = false`. That one flag does three things at
once: removes the amber "indicative pricing" notice from the menu page, and opens
the site to search engines (see `app/layout.tsx`). Until it is flipped the site
sends `noindex` — an indexed page quoting invented prices under the Chatime name
would send real customers to the store expecting the wrong figure.

Drink names marked `// ✅ confirmed` were seen on @chatimesrilanka. The rest are
standard Chatime range items — delete any the Havelock store does not carry.

### 2. Outlet details — `src/lib/outlets.ts`

- ✅ `WHATSAPP_NUMBER` is set to `94783011543` (local 078 301 1543). Online
  ordering is live: checkout sends an itemised order to that number.
- `phone` is empty. Google lists no number for the store; add one when it exists.
- `rating` is set to 4.2 from 247 reviews. The Google listing was given as
  "4.247 Google reviews", which is ambiguous — confirm on Google Maps, or delete
  the `rating` field to stop showing it.

## Handover checklist

Someone should sit with a phone and confirm each of these before sign-off. They
all pass here.

- [x] Order a drink end to end — the WhatsApp message arrives itemised, with the
      size, sugar, ice, milk, toppings and total.
- [x] Open the customiser, add to order, close the cart, repeat several times.
      Buttons keep working. (They did not before: see `lib/useScrollLock.ts` for
      why two drawers overlapping used to pin the page and kill every click.)
- [x] Swipe either sheet down by its handle to dismiss it.
- [x] Scroll inside a drawer — the list moves, the page behind it does not.
- [ ] Real prices in `lib/menu.ts`, then flip `PRICES_ARE_PLACEHOLDER`.
- [ ] Point a domain at it (Vercel → Settings → Domains).

## Structure

```
public/                   official Chatime logo, both variants
src/
  app/                    home, /menu, /locations, /about
  components/
    menu/CupVisual        the SVG cup — reads size/sugar/ice/toppings
    menu/Customiser       the drawer that drives it
    menu/DrinkCard        tilting card, one per drink
    motion/               Reveal, RevealWords, Marquee, MagneticButton
    home/                 Hero, Stats, Featured, BuildTeaser, Story, LocationTeaser
    site/                 Header, Footer, Wordmark, LocationsView, AboutView
  lib/
    menu.ts               ← the menu. Prices live here.
    outlets.ts            ← stores, hours, open-now logic
    copy.ts               ← all site copy, English
```

## Notes for whoever picks this up

- **Open/closed is computed in Asia/Colombo explicitly** (`colomboNow`), not from
  the visitor's clock — someone browsing from London sees whether the store is
  open *in Colombo*.
- **Above-the-fold headings pass `immediate` to `RevealWords`.** They must not
  depend on IntersectionObserver: the words start translated outside a clipping
  wrapper, so an observer that never fires would leave the heading permanently
  invisible.
- **`RevealWords` puts the inter-word space between the clipped wrappers, not
  inside them.** Inside, it collapses and the heading reads "Cupsof Joy" to
  screen readers and search engines.
- **`CupVisual` takes an `onPurple` prop.** The cup is drawn in translucent
  white, which vanishes on a white page; the prop switches the outline to a tint
  of the brand purple.
- **Muted text is never lighter than `ink/65`.** Over white that is the point
  where it clears 4.5:1 for WCAG AA. `ink/40`, which looked fine, measured 2.5:1.
- The locator map is decorative SVG, not a real map. A real one needs a Google
  Maps API key and a billing account; "Get directions" already opens the real
  thing.

## Not built (out of scope for v1)

Franchise page, careers, loyalty/rewards, online checkout, and non-English
languages. The customiser was built to hand off rather than take payment, so
adding real checkout later does not require redesigning it.
