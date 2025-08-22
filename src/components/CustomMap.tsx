import React, { useEffect, useRef, useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import macedoniaMap from '@/assets/macedonia-focused-map.jpg';

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
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(new Set(['monument', 'city', 'camping', 'nature']));

  // Map bounds for North Macedonia focused view (80% Macedonia, 20% surrounding countries)
  const MAP_BOUNDS = {
    north: 42.44,    // 42.5 Include southern Serbia
    south: 40.65,    // 40.8 Include northern Greece  
    west: 19.68,     // 20.2 Include eastern Albania
    east: 23.75      // 23.0 Include western Bulgaria
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
      nature: '#84cc16', // lime
	  monastery: 'ff00ff',
    };
    return colors[type as keyof typeof colors] || '#60a5fa';
  };

  const handlePinHover = (location: Location, event: React.MouseEvent) => {
    setHoveredLocation(location);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  };

  const handleNavigation = (location: Location) => {
    const { latitude, longitude } = location;
    const coords = `${latitude},${longitude}`;
    
    // For mobile devices, try to open native maps app
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Try Google Maps app first, fallback to web
      window.open(`geo:${coords}?q=${coords}(${encodeURIComponent(location.name)})`, '_system');
      // Fallback for iOS
      setTimeout(() => {
        window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
      }, 1000);
    } else {
      // For desktop, open Google Maps in new tab
      window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
    }
  };

  const handlePinClick = (location: Location) => {
    handleNavigation(location);
  };

  const handlePinLeave = () => {
    // Delay hiding tooltip to allow hovering over it
    setTimeout(() => {
      if (!tooltipVisible) {
        setHoveredLocation(null);
      }
    }, 100);
  };

  const handleTooltipMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleTooltipMouseLeave = () => {
    setTooltipVisible(false);
    setHoveredLocation(null);
  };

  const handlePinMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const toggleLocationType = (type: string) => {
    setVisibleTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };

  const filteredLocations = locations.filter(location => visibleTypes.has(location.type));

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Title overlay */}
      <div className="absolute top-6 left-6 z-20">
        <h1 className="text-4xl font-bold text-white drop-shadow-lg">
          Explore North Macedonia
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
            src={macedoniaMap}
            alt="North Macedonia Map"
            className="w-full h-full object-contain rounded-lg shadow-2xl border border-border/20"
            style={{ maxWidth: '95vw', maxHeight: '90vh' }}
          />
          
          {/* Location pins overlay */}
          <div className="absolute inset-0">
            {filteredLocations.map((location: Location) => {
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
                  onClick={() => handlePinClick(location)}
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
          <div 
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-all hover:bg-muted/50 ${
              visibleTypes.has('monument') ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => toggleLocationType('monument')}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#fbbf24' }}></div>
            <span className="text-sm text-muted-foreground">Monuments 🏛️</span>
          </div>
          <div 
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-all hover:bg-muted/50 ${
              visibleTypes.has('city') ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => toggleLocationType('city')}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
            <span className="text-sm text-muted-foreground">Cities 🏙️</span>
          </div>
          <div 
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-all hover:bg-muted/50 ${
              visibleTypes.has('camping') ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => toggleLocationType('camping')}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f97316' }}></div>
            <span className="text-sm text-muted-foreground">Recreation 🏕️</span>
          </div>
          <div 
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-md transition-all hover:bg-muted/50 ${
              visibleTypes.has('nature') ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => toggleLocationType('nature')}
          >
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#84cc16' }}></div>
            <span className="text-sm text-muted-foreground">Nature 🌲</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="absolute top-6 right-6 z-20 map-tooltip">
        <h3 className="font-semibold text-foreground mb-2">Showing {filteredLocations.length} Locations</h3>
        <div className="text-sm text-muted-foreground space-y-1">
          {visibleTypes.has('monument') && <div>🏛️ {filteredLocations.filter(l => l.type === 'monument').length} Monuments</div>}
          {visibleTypes.has('city') && <div>🏙️ {filteredLocations.filter(l => l.type === 'city').length} Cities</div>}
          {visibleTypes.has('camping') && <div>🏕️ {filteredLocations.filter(l => l.type === 'camping').length} Recreation</div>}
          {visibleTypes.has('nature') && <div>🌲 {filteredLocations.filter(l => l.type === 'nature').length} Nature</div>}
        </div>
      </div>

      {/* Tooltip */}
      {hoveredLocation && (
        <LocationTooltip
          location={hoveredLocation}
          position={tooltipPosition}
          onNavigate={handleNavigation}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        />
      )}
    </div>
  );
};

export default CustomMap;