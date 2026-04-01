'use client';

import { useEventsStore } from '@/store/events.store';
import { EventCategory } from '@/types/event';
import { cn } from '@/lib/utils';

const CATEGORIES: { value: EventCategory; label: string; description: string }[] = [
  { value: 'A', label: 'Category A', description: 'Elite Masters' },
  { value: 'B', label: 'Category B', description: 'Challenger Cup' },
];

export function CategoryFilter() {
  const { activeCategories, toggleCategory, filteredEvents, events } = useEventsStore();

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
        Filter by Category
      </p>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(({ value, label, description }) => {
          const isActive = activeCategories.includes(value);
          const count = events.filter((e) => e.category === value).length;

          return (
            <button
              key={value}
              onClick={() => toggleCategory(value)}
              className={cn(
                'group flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-150',
                isActive
                  ? value === 'A'
                    ? 'border-sky-300 bg-sky-50 text-sky-800 shadow-sm'
                    : 'border-amber-300 bg-amber-50 text-amber-800 shadow-sm'
                  : 'border-zinc-200 bg-white text-zinc-400 hover:border-zinc-300 hover:text-zinc-600'
              )}
            >
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  isActive
                    ? value === 'A'
                      ? 'bg-sky-500'
                      : 'bg-amber-500'
                    : 'bg-zinc-300'
                )}
              />
              <span className="font-medium">{label}</span>
              <span className={cn('text-xs', isActive ? 'opacity-70' : 'opacity-50')}>
                {description}
              </span>
              <span
                className={cn(
                  'ml-1 rounded-full px-1.5 py-0.5 text-xs font-bold',
                  isActive
                    ? value === 'A'
                      ? 'bg-sky-200 text-sky-700'
                      : 'bg-amber-200 text-amber-700'
                    : 'bg-zinc-100 text-zinc-400'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-zinc-400">
        Showing <span className="font-semibold text-zinc-600">{filteredEvents.length}</span> of{' '}
        <span className="font-semibold text-zinc-600">{events.length}</span> events
      </p>
    </div>
  );
}
