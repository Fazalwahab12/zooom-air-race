# Zooom Air Race — Event Explorer

An interactive map-and-list interface for exploring international Air Race events. Built as a full-stack demo project for Zooom Productions.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables or API keys required — the map uses OpenStreetMap tiles via CARTO (free, no auth).

## Technical Decisions

### Framework — Next.js 15 (App Router)
Chosen for its first-class TypeScript support, file-based routing, and production-grade optimizations out of the box. The App Router cleanly separates server and client concerns.

### Map — React-Leaflet + OpenStreetMap/CARTO
Leaflet is battle-tested, lightweight, and requires no API key — making the project immediately runnable without account setup. CARTO's light tile style complements the clean UI. For production I'd consider Mapbox GL JS for smoother WebGL rendering and vector tiles.

### State — Zustand
A single flat store manages all shared UI state (hover, selection, filters). Zustand avoids Redux boilerplate while being more predictable than `useContext + useReducer` for cross-component state. The store owns filter logic (derived `filteredEvents`) so components stay pure and focused.

### Data — Static JSON
Defined in `src/data/events.json` with the exact schema from the brief. The `AirRaceEvent` TypeScript type mirrors this structure — swapping for a real API or headless CMS (Sanity, Contentful) only requires changing the data-fetching layer, not the UI.

### CMS-Readiness
The data model is flat and extendable. Adding `imageUrl`, `ticketUrl`, or `pilots` requires only a type extension and a JSON field. A CMS integration would replace the static import with `fetch()` inside a Server Component — zero changes to the UI layer.

### Component Architecture

```
src/
  app/             # Next.js App Router (layout, page)
  components/
    map/           # EventMap (SSR wrapper) + EventMapInner (client, Leaflet)
    events/        # EventCard, EventList
    filters/       # CategoryFilter
    ui/            # Shared primitives (Badge)
  store/           # Zustand store — single source of truth for UI state
  types/           # Shared TypeScript interfaces
  data/            # Static JSON dataset
  lib/             # Pure utilities (cn, formatDate)
```

The map is dynamically imported (`next/dynamic` with `ssr: false`) to prevent Leaflet's `window` references from breaking SSR.

## What I Would Improve With More Time

- **Location search** — geocoding input (Nominatim / Mapbox) to fly the map to any city
- **Event detail page** — `/events/[id]` with full info using Next.js dynamic routes
- **Skeleton loading** — proper skeleton cards instead of a simple pulse placeholder
- **Animations** — `framer-motion` for list entrance and panel transitions
- **Testing** — unit tests for the Zustand store, Playwright e2e for filter + map sync
- **CMS integration** — connect to Sanity with ISR (`revalidate`) so events update without redeployment
- **Accessibility** — full keyboard navigation for map markers, ARIA live regions for filter counts
