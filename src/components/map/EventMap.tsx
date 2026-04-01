'use client';

import dynamic from 'next/dynamic';

// Leaflet requires the browser DOM — disable SSR for the entire map subtree.
const EventMapInner = dynamic(
  () => import('./EventMapInner').then((m) => m.EventMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full animate-pulse items-center justify-center rounded-xl bg-zinc-100">
        <p className="text-sm text-zinc-400">Loading map…</p>
      </div>
    ),
  }
);

export function EventMap() {
  return (
    <div className="h-full w-full overflow-hidden rounded-xl shadow-sm ring-1 ring-zinc-200">
      <EventMapInner />
    </div>
  );
}
