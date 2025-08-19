import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';

interface Location {
  id: string;
  name: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
  coordinates: [number, number];
}

// Note: You'll need to add your Mapbox token here
// Get it from https://mapbox.com/ after creating an account
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE';

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTokenInput, setShowTokenInput] = useState(!MAPBOX_TOKEN || MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN_HERE');
  const [tempToken, setTempToken] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [21.0, 42.5], // Centered on Kosovo region
      zoom: 8,
      pitch: 45,
      bearing: 0
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    // Add locations after map loads
    map.current.on('load', () => {
      addLocationMarkers();
    });
  };

  const addLocationMarkers = () => {
    if (!map.current) return;

    locations.forEach((location: Location) => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = `map-pin location-type-${location.type}`;
      markerElement.style.cursor = 'pointer';

      // Add hover events
      markerElement.addEventListener('mouseenter', (e) => {
        setHoveredLocation(location);
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      });

      markerElement.addEventListener('mouseleave', () => {
        setHoveredLocation(null);
      });

      markerElement.addEventListener('mousemove', (e) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY });
      });

      // Create marker
      new mapboxgl.Marker(markerElement)
        .setLngLat(location.coordinates)
        .addTo(map.current!);
    });
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempToken.trim()) {
      setShowTokenInput(false);
      initializeMap(tempToken.trim());
    }
  };

  useEffect(() => {
    if (!showTokenInput) {
      initializeMap(MAPBOX_TOKEN);
    }

    return () => {
      map.current?.remove();
    };
  }, []);

  if (showTokenInput) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center p-6">
        <div className="map-tooltip max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-4">Setup Required</h2>
          <p className="text-muted-foreground mb-6">
            To display the interactive map, please enter your Mapbox public token. 
            Get one free at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-glow underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <input
              type="text"
              value={tempToken}
              onChange={(e) => setTempToken(e.target.value)}
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIiwi..."
              className="w-full p-3 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Gradient overlays for better UI integration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background/20 to-transparent" />
      </div>

      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-10">
        <h1 className="text-3xl font-bold text-white drop-shadow-lg">
          Explore the Balkans
        </h1>
        <p className="text-white/80 text-lg drop-shadow-md">
          Discover monuments, cities, and natural wonders
        </p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-10 map-tooltip">
        <h3 className="font-semibold text-foreground mb-3">Location Types</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full location-type-monument"></div>
            <span className="text-sm text-muted-foreground">Monuments</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full location-type-city"></div>
            <span className="text-sm text-muted-foreground">Cities</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full location-type-camping"></div>
            <span className="text-sm text-muted-foreground">Camping & Recreation</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full location-type-nature"></div>
            <span className="text-sm text-muted-foreground">Natural Sites</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredLocation && (
        <LocationTooltip
          location={hoveredLocation}
          position={tooltipPosition}
        />
      )}
    </div>
  );
};

export default InteractiveMap;