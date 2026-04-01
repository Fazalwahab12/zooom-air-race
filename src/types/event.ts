export type EventCategory = 'A' | 'B';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface AirRaceEvent {
  id: string;
  title: string;
  description: string;
  address: string;
  country: string;
  coordinates: Coordinates;
  category: EventCategory;
  date?: string;
  imageUrl?: string;
}

export type FilterState = {
  categories: EventCategory[];
  searchQuery: string;
};
