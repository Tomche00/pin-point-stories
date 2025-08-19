import React, { useEffect, useRef, useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import balkansMap from '@/assets/balkans-map.jpg';

interface Location {
  id: string;
  name: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
  coordinates: [number, number];
}

const CustomMap = () => {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Map bounds for the Balkans region
  const MAP_BOUNDS = {
    north: 43.5,
    south: 41.5,
    west: 19.5,
    east: 22.5
  };

  // Convert lat/lng to percentage coordinates
  const coordsToPercent = (lng: number, lat: number) => {
    const x = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
    const y = ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const getLocationColor = (type: string) => {
    const colors = {
      monument: '#fbbf24', // yellow
      city: '#10b981', // emerald
      camping: '#f97316', // orange
      nature: '#84cc16' // lime
    };
    return colors[type as keyof typeof colors] || '#60a5fa';
  };

  const handlePinHover = (location: Location, event: React.MouseEvent) => {
    setHoveredLocation(location);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handlePinLeave = () => {
    setHoveredLocation(null);
  };

  const handlePinMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Explore the Balkans
        </h1>
        <p className="text-white/80 text-lg drop-shadow-md">
          Discover monuments, cities, and natural wonders
        </p>
      </div>

      {/* Map container */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative max-w-full max-h-full">
          {/* Background map image */}
          <img 
            src={balkansMap}
            alt="Balkans Map"
            className="w-full h-full object-contain rounded-lg shadow-2xl border border-border/20"
            style={{ maxWidth: '95vw', maxHeight: '90vh' }}
          />
          
          {/* Location pins overlay */}
          <div className="absolute inset-0">
            {locations.map((location: Location) => {
              const { x, y } = coordsToPercent(location.coordinates[0], location.coordinates[1]);
              
              return (
                <div
                  key={location.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ 
                    left: `${x}%`, 
                    top: `${y}%`,
                  }}
                  onMouseEnter={(e) => handlePinHover(location, e)}
                  onMouseLeave={handlePinLeave}
                  onMouseMove={handlePinMove}
                >
                  {/* Glow effect */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-300 transform scale-150"
                    style={{ 
                      backgroundColor: getLocationColor(location.type),
                      filter: 'blur(8px)'
                    }}
                  />
                  
                  {/* Main pin */}
                  <div 
                    className="relative w-6 h-6 rounded-full border-2 border-white shadow-lg transform transition-all duration-300 group-hover:scale-125"
                    style={{ 
                      backgroundColor: getLocationColor(location.type),
                      boxShadow: `0 0 20px ${getLocationColor(location.type)}40`
                    }}
                  >
                    {/* Type icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">
                      {location.type === 'monument' && '🏛️'}
                      {location.type === 'city' && '🏙️'}
                      {location.type === 'camping' && '🏕️'}
                      {location.type === 'nature' && '🌲'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Gradient overlays */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background/30 to-transparent rounded-t-lg" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background/30 to-transparent rounded-b-lg" />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-20 map-tooltip">
        <h3 className="font-semibold text-foreground mb-3">Location Types</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#fbbf24' }}></div>
            <span className="text-sm text-muted-foreground">Monuments 🏛️</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
            <span className="text-sm text-muted-foreground">Cities 🏙️</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
            <span className="text-sm text-muted-foreground">Recreation 🏕️</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#84cc16' }}></div>
            <span className="text-sm text-muted-foreground">Nature 🌲</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="absolute top-6 right-6 z-20 map-tooltip">
        <h3 className="font-semibold text-foreground mb-2">Explore {locations.length} Locations</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          <div>🏛️ {locations.filter(l => l.type === 'monument').length} Monuments</div>
          <div>🏙️ {locations.filter(l => l.type === 'city').length} Cities</div>
          <div>🏕️ {locations.filter(l => l.type === 'camping').length} Recreation</div>
          <div>🌲 {locations.filter(l => l.type === 'nature').length} Nature</div>
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

export default CustomMap;