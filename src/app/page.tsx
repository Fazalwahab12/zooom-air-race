import { EventMap } from '@/components/map/EventMap';
import { EventList } from '@/components/events/EventList';
import { CategoryFilter } from '@/components/filters/CategoryFilter';

export default function HomePage() {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white px-4 py-3 shadow-sm sm:px-6 sm:py-4">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600">
              <svg viewBox="0 0 24 24" fill="white" className="h-5 w-5">
                <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold leading-tight tracking-tight text-zinc-900">
                Zooom Air Race
              </h1>
              <p className="text-xs text-zinc-500">Season — Event Explorer</p>
            </div>
          </div>

          <div className="hidden sm:block">
            <CategoryFilter />
          </div>
        </div>
      </header>

      {/* Mobile filter */}
      <div className="border-b border-zinc-200 bg-white px-4 py-3 sm:hidden">
        <CategoryFilter />
      </div>

      {/* Main content */}
      <main className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-5 overflow-y-auto p-5 lg:flex-row lg:overflow-hidden">
        {/* Map — fixed height on mobile, fills remaining space on desktop */}
        <div className="h-64 shrink-0 sm:h-80 lg:h-auto lg:min-h-0 lg:flex-1">
          <EventMap />
        </div>

        {/* Sidebar event list */}
        <aside className="flex w-full flex-col gap-3 lg:w-80 xl:w-96">
          <h2 className="text-sm font-semibold text-zinc-700">Race Locations</h2>
          <div className="event-list-scroll overflow-y-auto rounded-xl pr-1 lg:flex-1">
            <EventList />
          </div>
        </aside>
      </main>
    </div>
  );
}
