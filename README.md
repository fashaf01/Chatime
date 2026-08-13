# Chatime Sri Lanka

A rebuilt marketing site for Chatime Sri Lanka — Next.js 15, React 19, Tailwind 4,
fully static, zero third-party requests.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploying

The site is a stock static Next.js app, so Vercel needs no configuration:

1. Push this branch to GitHub.
2. On vercel.com → **Add New… → Project** → import `fashaf01/Chatime`.
3. Vercel detects Next.js on its own. Framework preset **Next.js**, build
   `next build`, no environment variables required.
4. Deploy. Every later push to the connected branch redeploys automatically.

## How the drink art works

There are no product photographs in this repo. Every cup on the page is drawn by
`components/DrinkArt.tsx`, which turns the `art` block on each drink in
`lib/drinks.ts` into an inline SVG:

```ts
art: {
  liquidTop: "#D8B48D",     // gradient top
  liquidBottom: "#A97A4C",  // gradient bottom
  crema: "#F6F1E2",         // optional foam cap
  swirl: "#7A4718",         // optional brown sugar streaks
  topping: "brownSugarPearl",
  ice: true,
}
```

That keeps the whole 31-drink menu at zero image requests, sharp on any display,
and instantly re-renderable — which is what makes the live builder in
**Make It Yours** possible.

### Swapping in real photography

Add a `photo` field to any drink and `DrinkArt` renders that instead, with no
other code changes:

```ts
{ id: "taro-milk-tea", name: "Taro Milk Tea", photo: "/drinks/taro.webp", … }
```

Put the files in `public/drinks/`. Mixing photos and generated art is fine — the
two can coexist across the grid while photography is shot store by store.

## Structure

```
app/
  layout.tsx      metadata, JSON-LD store schema, skip link
  page.tsx        section composition
  globals.css     design tokens, animation, reduced-motion
  icon.svg        favicon
components/
  DrinkArt.tsx    parametric cup renderer
  Customiser.tsx  live drink builder
  Menu.tsx        filterable menu grid
  Nav.tsx  Hero.tsx  Story.tsx  Locations.tsx  Franchise.tsx  Footer.tsx
  Marquee.tsx  Reveal.tsx  Logo.tsx
lib/
  drinks.ts       menu data, categories, toppings, LKR formatting
```

## Content that still needs real values

Placeholders are marked here so they are easy to find and replace:

- **Phone** — `+94 76 000 0000` in `components/Locations.tsx` and
  `components/Footer.tsx`
- **Email** — `hello@chatime.lk`, `franchise@chatime.lk`, `careers@chatime.lk`
- **Social links** — currently point at the bare platform domains in
  `components/Footer.tsx`
- **Prices** — plausible Colombo pricing, not confirmed against the till
- **Second/third stores** — One Galle Face and Kandy are listed as
  "coming soon"; remove them if they are not real plans
