'use client';

import { useEventsStore } from '@/store/events.store';
import { EventCard } from './EventCard';
import { Wind } from 'lucide-react';

export function EventList() {
  const { filteredEvents } = useEventsStore();

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-200 bg-zinc-50 py-16 text-center">
        <Wind className="h-8 w-8 text-zinc-300" />
        <div>
          <p className="text-sm font-medium text-zinc-600">No events match your filters</p>
          <p className="mt-1 text-xs text-zinc-400">Try enabling more categories</p>
        </div>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2.5" role="list">
      {filteredEvents.map((event) => (
        <li key={event.id}>
          <EventCard event={event} />
        </li>
      ))}
    </ul>
  );
}
