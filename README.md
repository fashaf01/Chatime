# Chatime Sri Lanka

Marketing site for Chatime Sri Lanka — Havelock City Mall, Level 2, Colombo 05.

Next.js 15 · React 19 · Tailwind · Framer Motion. Static output, no database, no
backend. `npm run dev`, `npm run build`.

## What makes this different from the other Chatime sites

Every other Chatime country site was reviewed before this was built. All 17 of
them share the same four gaps, and this site closes them:

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

Three things must be corrected. They are all in two files.

### 1. Prices — `src/lib/menu.ts`

**Every price in this file is a placeholder.** They are plausible Colombo
bubble-tea prices, not Chatime Sri Lanka's real ones. No price list is published
anywhere online — the Uber Eats listing sits behind a bot check.

Replace every `prices` value with the real figures from the in-store menu board,
then set `PRICES_ARE_PLACEHOLDER = false` to remove the amber "indicative
pricing" notice from the menu page. The notice is deliberately hard to miss so
this cannot ship by accident.

While you are in there: drink names marked `// ✅ confirmed` were seen on
@chatimesrilanka. The rest are standard Chatime range items — delete any the
Havelock store does not carry, and add the ones it does.

### 2. Sinhala and Tamil copy — `src/lib/i18n/dictionaries.ts`

A first pass, marked `// review`. **It needs a native speaker before launch.**
A bad Sinhala menu reads worse to the people it is meant to serve than English
would. The English is final; the other two are not.

Drink names stay in English in all three languages, deliberately — that is how
they are ordered in store and printed on the board. Category names, navigation
and all UI copy do translate.

### 3. Outlet details — `src/lib/outlets.ts`

- `phone` is empty. Google lists no number for the store; add one when it exists.
- `rating` is set to 4.2 from 247 reviews. The Google listing was given as
  "4.247 Google reviews", which is ambiguous — confirm on Google Maps, or
  delete the `rating` field to stop showing it.
- `WHATSAPP_NUMBER` is empty. Set it to e.g. `'94771234567'` and the customiser
  gains a "Send order on WhatsApp" button that arrives pre-filled with the exact
  build and price. Until then it promotes the Uber Eats link instead — there is
  no dead button either way.

## Structure

```
src/
  app/                    home, /menu, /locations, /about
  components/
    menu/CupVisual        the SVG cup — reads size/sugar/ice/toppings
    menu/Customiser       the drawer that drives it
    menu/DrinkCard        tilting card, one per drink
    motion/               Reveal, RevealWords, Marquee, MagneticButton
    home/                 Hero, Stats, Featured, BuildTeaser, Story, LocationTeaser
    site/                 Header, Footer, LanguageSwitcher, LocationsView, AboutView
  lib/
    menu.ts               ← the menu. Prices live here.
    outlets.ts            ← stores, hours, open-now logic
    i18n/                 dictionaries, provider, outlet formatters
```

## Notes for whoever picks this up

- **Language choice persists to `localStorage`,** and is read after mount so the
  server and first client render agree. Do not move it into the initial render
  or React will throw a hydration mismatch.
- **Open/closed is computed in Asia/Colombo explicitly** (`colomboNow`), not from
  the visitor's clock — someone browsing from London sees whether the store is
  open *in Colombo*.
- **`openState` returns a structured descriptor, not a sentence.** Wording comes
  from the dictionary at render time via `lib/i18n/formatOutlet`. Do not move
  English prose back into `outlets.ts`.
- **Sinhala and Tamil fonts are fallbacks in the Tailwind font stack,** not a
  per-locale class. Outfit has no Sinhala glyphs, so the browser falls through to
  Noto for exactly those characters and keeps the brand face for Latin. This is
  what lets an English drink name sit inside a Sinhala sentence and look right.
- **Above-the-fold headings pass `immediate` to `RevealWords`.** They must not
  depend on IntersectionObserver: the words start translated outside a clipping
  wrapper, and an observer that never fires would leave the heading permanently
  invisible.
- The locator map is decorative SVG, not a real map. A real one needs a Google
  Maps API key and a billing account; the "Get directions" button already opens
  the real thing.

## Not built (out of scope for v1)

Franchise page, careers, loyalty/rewards, and online checkout. The customiser
was built to hand off rather than take payment, so adding real checkout later
does not require redesigning it.
