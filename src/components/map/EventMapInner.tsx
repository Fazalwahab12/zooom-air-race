'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { useEventsStore } from '@/store/events.store';
import { AirRaceEvent, EventCategory } from '@/types/event';
import { formatDate } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Custom SVG marker factory
// ---------------------------------------------------------------------------
function createMarkerIcon(category: EventCategory, active: boolean): L.DivIcon {
  const color = active
    ? '#0ea5e9'
    : category === 'A'
    ? '#6366f1'
    : '#f59e0b';

  const shadow = active ? 'drop-shadow(0 0 6px rgba(14,165,233,0.8))' : 'none';

  return L.divIcon({
    className: '',
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
    html: `
      <div style="filter:${shadow}; transition: filter 0.2s;">
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 10 16 24 16 24S32 26 32 16C32 7.163 24.837 0 16 0Z"
            fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
          <text x="16" y="20" text-anchor="middle" fill="${color}"
            font-size="9" font-family="system-ui,sans-serif" font-weight="700">${category}</text>
        </svg>
      </div>`,
    iconSize: [32, 40],
  });
}

// ---------------------------------------------------------------------------
// Sub-component: auto-fly to selected event
// ---------------------------------------------------------------------------
function MapController() {
  const { selectedEventId, filteredEvents } = useEventsStore();
  const map = useMap();

  useEffect(() => {
    if (!selectedEventId) return;
    const event = filteredEvents.find((e) => e.id === selectedEventId);
    if (!event) return;
    map.flyTo([event.coordinates.lat, event.coordinates.lng], 10, {
      duration: 1.2,
    });
  }, [selectedEventId, filteredEvents, map]);

  return null;
}

// ---------------------------------------------------------------------------
// Sub-component: individual marker
// ---------------------------------------------------------------------------
function EventMarker({ event }: { event: AirRaceEvent }) {
  const { hoveredEventId, selectedEventId, setHoveredEvent, setSelectedEvent } = useEventsStore();
  const markerRef = useRef<L.Marker>(null);

  const isActive = hoveredEventId === event.id || selectedEventId === event.id;
  const icon = createMarkerIcon(event.category, isActive);

  // Re-open popup when event becomes selected via list click
  useEffect(() => {
    if (selectedEventId === event.id && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [selectedEventId, event.id]);

  return (
    <Marker
      ref={markerRef}
      position={[event.coordinates.lat, event.coordinates.lng]}
      icon={icon}
      eventHandlers={{
        mouseover: () => setHoveredEvent(event.id),
        mouseout: () => setHoveredEvent(null),
        click: () => setSelectedEvent(event.id),
      }}
    >
      <Popup closeButton={false} className="zooom-popup">
        <div className="min-w-[180px]">
          <div className="mb-1 flex items-center gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                event.category === 'A'
                  ? 'bg-sky-100 text-sky-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              Cat. {event.category}
            </span>
            {event.date && (
              <span className="text-xs text-gray-400">{formatDate(event.date)}</span>
            )}
          </div>
          <p className="font-semibold text-gray-800">{event.title}</p>
          <p className="mt-0.5 text-xs text-gray-500">
            {event.address}, {event.country}
          </p>
          <p className="mt-1.5 text-xs leading-relaxed text-gray-600">{event.description}</p>
        </div>
      </Popup>
    </Marker>
  );
}

// ---------------------------------------------------------------------------
// Main map component
// ---------------------------------------------------------------------------
export function EventMapInner() {
  const { filteredEvents } = useEventsStore();

  return (
    <MapContainer
      center={[30, 10]}
      zoom={2}
      className="h-full w-full rounded-xl"
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
        maxZoom={19}
      />
      <MapController />
      {filteredEvents.map((event) => (
        <EventMarker key={event.id} event={event} />
      ))}
    </MapContainer>
  );
}
