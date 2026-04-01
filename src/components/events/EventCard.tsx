'use client';

import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import { AirRaceEvent } from '@/types/event';
import { Badge } from '@/components/ui/Badge';
import { useEventsStore } from '@/store/events.store';
import { cn, formatDate } from '@/lib/utils';

interface EventCardProps {
  event: AirRaceEvent;
}

export function EventCard({ event }: EventCardProps) {
  const { hoveredEventId, selectedEventId, setHoveredEvent, setSelectedEvent } = useEventsStore();

  const isHovered = hoveredEventId === event.id;
  const isSelected = selectedEventId === event.id;
  const isHighlighted = isHovered || isSelected;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => setSelectedEvent(event.id)}
      onMouseEnter={() => setHoveredEvent(event.id)}
      onMouseLeave={() => setHoveredEvent(null)}
      onKeyDown={(e) => e.key === 'Enter' && setSelectedEvent(event.id)}
      aria-pressed={isSelected}
      className={cn(
        'group relative cursor-pointer rounded-xl border bg-white p-4 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
        isSelected
          ? 'border-sky-400 shadow-md shadow-sky-100 ring-1 ring-sky-300'
          : isHovered
          ? 'border-zinc-300 shadow-sm'
          : 'border-zinc-200 hover:border-zinc-300 hover:shadow-sm'
      )}
    >
      {isSelected && (
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-xl bg-sky-500" />
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex items-center gap-2">
            <Badge category={event.category} />
            {event.date && (
              <span className="flex items-center gap-1 text-xs text-zinc-400">
                <Calendar className="h-3 w-3" />
                {formatDate(event.date)}
              </span>
            )}
          </div>

          <h3
            className={cn(
              'truncate text-sm font-semibold leading-snug transition-colors',
              isHighlighted ? 'text-sky-700' : 'text-zinc-800 group-hover:text-zinc-900'
            )}
          >
            {event.title}
          </h3>

          <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <MapPin className="h-3 w-3 shrink-0" />
            <span className="truncate">
              {event.address}, {event.country}
            </span>
          </div>
        </div>

        <ChevronRight
          className={cn(
            'mt-1 h-4 w-4 shrink-0 transition-all',
            isHighlighted ? 'translate-x-0.5 text-sky-500' : 'text-zinc-300 group-hover:text-zinc-400'
          )}
        />
      </div>

      {isSelected && (
        <p className="mt-3 border-t border-zinc-100 pt-3 text-xs leading-relaxed text-zinc-500">
          {event.description}
        </p>
      )}
    </article>
  );
}
