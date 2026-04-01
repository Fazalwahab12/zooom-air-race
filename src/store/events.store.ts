import { create } from 'zustand';
import { AirRaceEvent, EventCategory } from '@/types/event';
import eventsData from '@/data/events.json';

interface EventsState {
  events: AirRaceEvent[];
  filteredEvents: AirRaceEvent[];
  activeCategories: EventCategory[];
  hoveredEventId: string | null;
  selectedEventId: string | null;

  setHoveredEvent: (id: string | null) => void;
  setSelectedEvent: (id: string | null) => void;
  toggleCategory: (category: EventCategory) => void;
  resetFilters: () => void;
}

const ALL_CATEGORIES: EventCategory[] = ['A', 'B'];

function applyFilters(
  events: AirRaceEvent[],
  activeCategories: EventCategory[]
): AirRaceEvent[] {
  if (activeCategories.length === 0) return [];
  if (activeCategories.length === ALL_CATEGORIES.length) return events;
  return events.filter((e) => activeCategories.includes(e.category));
}

export const useEventsStore = create<EventsState>((set, get) => ({
  events: eventsData as AirRaceEvent[],
  filteredEvents: eventsData as AirRaceEvent[],
  activeCategories: [...ALL_CATEGORIES],
  hoveredEventId: null,
  selectedEventId: null,

  setHoveredEvent: (id) => set({ hoveredEventId: id }),

  setSelectedEvent: (id) =>
    set((state) => ({
      selectedEventId: state.selectedEventId === id ? null : id,
    })),

  toggleCategory: (category) => {
    const { activeCategories, events } = get();
    const next = activeCategories.includes(category)
      ? activeCategories.filter((c) => c !== category)
      : [...activeCategories, category];
    set({ activeCategories: next, filteredEvents: applyFilters(events, next) });
  },

  resetFilters: () => {
    const { events } = get();
    set({ activeCategories: [...ALL_CATEGORIES], filteredEvents: events });
  },
}));
