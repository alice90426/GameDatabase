# GAME DATABASE

Next.js App Router + Tailwind CSS + TypeScript game database website.

## Structure

- `src/app` - App Router pages, layouts, sitemap, robots
- `src/app/[locale]` - localized zh/en site routes
- `src/components` - shared UI components
- `src/data/games.json` - game records and feature fields
- `src/lib` - i18n, routes, and data helpers
- `src/types` - shared TypeScript types

## Current Game Fields

- `id` - unique game identifier, also used as the display name
- `genre` - category list used by the genre filter
- `hitRate` - 中獎率 number, displayed with `%`
- `volatility` - raw volatility number, displayed as a `1` to `5` level
- `rtp` - RTP number, displayed with `%`
- `boardSize` - 盤面大小
- `lineMechanic` - 連線方式
- `tags` - searchable detail tags

## Pages

- `/zh` and `/en` - homepage
- `/zh/games` and `/en/games` - filterable game database
- `/zh/about` and `/en/about` - database notes/about page

## Commands

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/zh`.
