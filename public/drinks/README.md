# Product photography

Drop a file in here named after the drink id and it replaces that drink's
vector illustration everywhere on the site — menu grid, best-seller rail,
category tiles, hero showcase and the builder preview.

```
public/drinks/brown-sugar-milk-tea.webp   ->  "Brown Sugar Pearl Milk Tea"
public/drinks/king-coconut.webp           ->  "King Coconut Green Tea"
```

Then run:

```bash
npm run sync-photos
```

Valid ids are the `id:` fields in `lib/drinks.ts`. Any drink without a file
keeps its vector render, so the menu never ends up half-photo, half-broken.

## What the shot needs

- **Portrait, 11:16** (the vector art is 220x320). 660x960 or larger.
- **Cut out, transparent background.** Cards sit the cup on a colour stage
  tinted from that drink's own liquid colours; a photo with a white box around
  it will fight the stage. WebP or PNG with alpha.
- Keep the cup roughly centred with a little headroom for the straw.

## Rights

Only put files here that this store is licensed to use — the official Chatime
brand asset pack, or photography commissioned for this store. Images taken
from another market's website are that market's licensed assets, not ours.
