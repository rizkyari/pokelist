# Pokémon List — Next.js (App Router) + Tailwind

A small, clean, and test-focused implementation that lists Pokémon from **PokeAPI** with **pagination (offset/limit)**, responsive cards, loading skeletons via **Suspense**, and a tidy folder structure.

---

## Features

* **Pagination** using `offset` & `limit` query params.
* **Pokémon cards**: image + name (capitalized), hover transition.
* **Responsive grid** with Tailwind breakpoints.
* **Loading states**: `app/loading.tsx` (segment-level) **and** local `<Suspense fallback>` with a Skeleton grid.
* **Error state** via `app/error.tsx`.
* **Image optimization** using `next/image` with remote domain allowlist.
* **Clean structure**: separated `lib/`, `components/`, and `types/`.

---

## Tech Stack

* **Next.js (App Router)** — Server Components first
* **React 18**, **TypeScript**, **Tailwind CSS**
* **PokeAPI** as data source

---

## Project Structure

```
src/
 ├─ app/
 │   ├─ page.tsx                 # reads searchParams, renders Suspense boundary
 │   ├─ loading.tsx              # route-segment fallback (skeleton)
 │   └─ error.tsx                # route-segment error UI
 ├─ components/
 │   ├─ PokemonCard.tsx          # reusable card (uses next/image)
 │   ├─ PokemonGrid.tsx          # grid that maps results → cards
 │   ├─ Pagination.tsx           # prev/next links, accessible buttons
 │   ├─ SkeletonCard.tsx         # skeleton placeholder card
 │   ├─ SkeletonSection.tsx      # composed skeleton for whole section
 │   └─ PokemonListSection.tsx   # **Server Component** that fetches + renders grid & pagination
 ├─ lib/
 │   ├─ api.ts                   # apiFetch: fetch wrapper (no-store)
 │   └─ pokemon.ts               # getPokemonList, helpers (id, sprite url, capitalize)
 └─ types/
     └─ pokemon.ts               # API response types
```

---

## Getting Started

### Prerequisites

* Node.js **>= 18**
* npm / pnpm / yarn

### Install & Run

```bash
# 1) Install 
npm install

# 2) Configure next/image remote host (required)
# next.config.js should include: images: { domains: ["raw.githubusercontent.com"] }

# 3) Dev server
npm run dev
# open http://localhost:3000
```

**next.config.js** example:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};
module.exports = nextConfig;
```

---


## Loading Strategy

Using **two** layers:

1. **Segment-level** `app/loading.tsx`: automatic fallback when the route segment is pending.
2. **Local Suspense boundary** in `page.tsx` that wraps `PokemonListSection` with a `fallback` (`SkeletonSection`). The boundary has a `key` derived from `offset-limit` so it **remounts** on query changes → skeleton consistently appears.

```tsx
// app/page.tsx (excerpt)
import { Suspense } from "react";
import SkeletonSection from "@/components/SkeletonSection";
import PokemonListSection from "@/components/PokemonListSection";

export default async function Page({ searchParams }: { searchParams?: Promise<{ offset?: string; limit?: string }>; }) {
  const sp = await searchParams;
  const limit = Number(sp?.limit ?? 12);
  const offset = Number(sp?.offset ?? 0);
  const suspenseKey = `${offset}-${limit}`;

  return (
    <main className="p-6 space-y-6">
      <Suspense key={suspenseKey} fallback={<SkeletonSection limit={limit} />}>
        <PokemonListSection offset={offset} limit={limit} />
      </Suspense>
    </main>
  );
}
```

> We also set `<Link prefetch={false}>` in `Pagination` so the navigation doesn’t pre-warm data; this showcases the loading skeleton during the test.

---

## Pagination (offset/limit)

* URL contract: `/?offset=0&limit=12`
* `offset` is 0-based index; `limit` is items per page.
* Header range uses `(offset + 1) … (offset + results.length)` and clamps to `count`.

```ts
const page = Math.floor(offset / limit) + 1;
const totalPages = Math.ceil(count / limit);
const start = count === 0 ? 0 : offset + 1;
const end = Math.min(offset + results.length, count);
```

---

## Accessibility & Responsiveness

* Grid adapts across breakpoints (`grid-cols-2 sm:3 md:4 xl:6`).
* Pagination buttons include `aria-label`, `rel`, focus rings, and disabled states.
* Images have `alt` text; names are capitalized for readability.

---

## Scripts

```bash
npm run dev      # start development server
npm run build    # production build
npm run start    # start production server
npm run lint     # lint codebase
```

---

## Possible Enhancements

* Page-size selector (10/20/50) wired to `limit`.
* Detail page `/pokemon/[id]` (types, height/weight).
* Retry & toast notification on fetch errors.
* Unit tests for helpers (`getPokemonIdFromUrl`).

---

## License

MIT (or follow the instructions from the hiring test if a specific license is required).

## Author

Developed by Rizky Ari

[Linkedin](https://www.linkedin.com/in/rizkyarihar/) | [GitHub](https://github.com/rizkyari)
