# AI Engineer Portfolio

React + TypeScript + Tailwind + Framer Motion. Two scroll-driven set pieces:

1. **Hero shatter portrait** — your photo is sliced into a grid and each
   tile flies outward as you scroll, like glass breaking apart.
2. **Projects orbit** — your projects sit on a ring and swing into focus
   one at a time, growing larger and sharper as each one reaches the
   front, as you scroll through the section.

## Run it

```bash
npm install
npm run dev
```

Open the printed local URL. `npm run build` produces a static `dist/`
folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, etc).

## Make it yours

**Your photo** — replace `public/portrait.jpg` with your own image (same
filename, or update `PORTRAIT_SRC` in
`src/components/ShatterPortrait.tsx`). A portrait-oriented photo, roughly
centered, with a plain or dark background shatters most cleanly. If your
photo is much wider or narrower than 4:5, adjust the `object-fit`-style
`backgroundSize` math in `src/components/ShatterTile.tsx` if tiles look
stretched.

**Your projects** — edit the array in `src/data/projects.ts`. Each entry
becomes one node on the orbit; add or remove entries freely, the ring
resizes itself automatically. Keep `summary` short — it has to read while
the card is mid-motion.

**Copy & links** — hero headline/subhead live in
`src/components/ShatterPortrait.tsx`; about copy and stack tags in
`src/components/About.tsx`; timeline in `src/components/Experience.tsx`;
email/social links in `src/components/Contact.tsx`.

**Colors & type** — the palette and fonts are tokenized in
`tailwind.config.ts` (`signal`, `amber`, `wire`, `void`, `panel`, etc.) and
`index.html` (Google Fonts: Space Grotesk, Inter, JetBrains Mono). Change
the hex values in one place to re-theme the whole site.

**Shatter grid density** — `ROWS`/`COLS` constants at the top of
`ShatterPortrait.tsx`. More tiles = finer shatter, slightly more DOM nodes.

**Orbit size** — `useOrbitRadius` in `ProjectsOrbit.tsx` controls how wide
and tall the ellipse is; tweak the multipliers to make the orbit tighter
or wider.

Motion is reduced automatically for users with `prefers-reduced-motion`
set at the OS level (see `src/index.css`).
