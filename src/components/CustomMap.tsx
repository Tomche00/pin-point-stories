import React, { useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import macedoniaMap from '@/assets/macedonia-focused-map.jpg';
import { LOCATION_TYPES, DEFAULT_VISIBLE_TYPES } from '@/constants/locationTypes';
import { MapPin, Eye, EyeOff, Compass } from 'lucide-react';

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
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(DEFAULT_VISIBLE_TYPES);

  const availableTypes = Array.from(new Set(locations.map(location => location.type)))
    .filter(type => LOCATION_TYPES[type]);

  const MAP_BOUNDS = {
    north: 42.44,
    south: 40.65,
    west: 19.68,
    east: 23.75
  };

  const coordsToPercent = (lng: number, lat: number) => {
    const x = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
    const y = ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  };

  const getLocationColor = (type: string) => LOCATION_TYPES[type]?.color || '#60a5fa';
  const getLocationIcon = (type: string) => LOCATION_TYPES[type]?.icon || '📍';

  const handlePinHover = (location: Location, event: React.MouseEvent) => {
    setHoveredLocation(location);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  };

  const handleNavigation = (location: Location) => {
    const { latitude, longitude } = location;
    const coords = `${latitude},${longitude}`;
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.open(`geo:${coords}?q=${coords}(${encodeURIComponent(location.name)})`, '_system');
      setTimeout(() => {
        window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
      }, 1000);
    } else {
      window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
    }
  };

  const handlePinClick = (location: Location) => handleNavigation(location);

  const handlePinLeave = () => {
    setTimeout(() => {
      if (!tooltipVisible) setHoveredLocation(null);
    }, 100);
  };

  const handleTooltipMouseEnter = () => setTooltipVisible(true);
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
      if (newSet.has(type)) newSet.delete(type);
      else newSet.add(type);
      return newSet;
    });
  };

  const filteredLocations = locations.filter(location => visibleTypes.has(location.type));

  return (
    <div className="relative w-full min-h-[calc(100vh-3.5rem)] bg-gradient-to-b from-background via-background to-secondary overflow-hidden">
      
      {/* Hero Title Section */}
      <div className="relative z-20 px-4 sm:px-8 pt-6 pb-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Compass className="w-5 h-5 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-accent">Interactive Map</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              <span className="gradient-text">Explore North Macedonia</span>
            </h1>
            <p className="text-muted-foreground text-base sm:text-lg mt-2 max-w-lg">
              Discover monuments, cities, and natural wonders across the country
            </p>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              {filteredLocations.length} locations
            </div>
            {availableTypes.map(type => {
              const config = LOCATION_TYPES[type];
              const count = filteredLocations.filter(l => l.type === type).length;
              if (!visibleTypes.has(type) || count === 0) return null;
              return (
                <div key={type} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                  <span>{config.icon}</span> {count}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 px-4 sm:px-8 pb-6">
        <div className="max-w-7xl mx-auto flex gap-4">
          
          {/* Legend sidebar */}
          <div className="hidden lg:block w-56 flex-shrink-0">
            <div className="glass-panel p-4 sticky top-20">
              <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Filters</h3>
              <div className="space-y-1">
                {availableTypes.map(type => {
                  const config = LOCATION_TYPES[type];
                  const isVisible = visibleTypes.has(type);
                  const count = locations.filter(l => l.type === type).length;
                  return (
                    <button
                      key={type}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200 ${
                        isVisible 
                          ? 'bg-primary/8 text-foreground font-medium' 
                          : 'text-muted-foreground hover:bg-muted/50 opacity-50'
                      }`}
                      onClick={() => toggleLocationType(type)}
                    >
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-200"
                        style={{ 
                          backgroundColor: config.color,
                          transform: isVisible ? 'scale(1)' : 'scale(0.7)',
                          opacity: isVisible ? 1 : 0.4
                        }}
                      />
                      <span className="flex-1 text-left">{config.label}</span>
                      <span className="text-xs text-muted-foreground">{count}</span>
                      {isVisible ? (
                        <Eye className="w-3.5 h-3.5 text-primary" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Map area */}
          <div className="flex-1 min-w-0">
            <div className="glass-panel overflow-hidden">
              <div className="relative">
                <img 
                  src={macedoniaMap}
                  alt="North Macedonia Map"
                  className="w-full h-auto object-contain"
                />
                
                {/* Pins overlay */}
                <div className="absolute inset-0">
                  {filteredLocations.map((location: Location) => {
                    const { x, y } = coordsToPercent(location.coordinates[0], location.coordinates[1]);
                    return (
                      <div
                        key={location.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                        style={{ left: `${x}%`, top: `${y}%` }}
                        onMouseEnter={(e) => handlePinHover(location, e)}
                        onMouseLeave={handlePinLeave}
                        onMouseMove={handlePinMove}
                        onClick={() => handlePinClick(location)}
                      >
                        <div 
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-all duration-300 transform scale-[2]"
                          style={{ backgroundColor: getLocationColor(location.type), filter: 'blur(8px)' }}
                        />
                        <div 
                          className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md transform transition-all duration-300 group-hover:scale-150 group-hover:z-10"
                          style={{ 
                            backgroundColor: getLocationColor(location.type),
                            boxShadow: `0 2px 8px ${getLocationColor(location.type)}50`
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px]">
                            {getLocationIcon(location.type)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Subtle gradient edges */}
                <div className="absolute inset-0 pointer-events-none rounded-2xl">
                  <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-card/20 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-card/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Mobile legend */}
            <div className="lg:hidden mt-4 glass-panel p-4">
              <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wider">Filters</h3>
              <div className="flex flex-wrap gap-2">
                {availableTypes.map(type => {
                  const config = LOCATION_TYPES[type];
                  const isVisible = visibleTypes.has(type);
                  return (
                    <button
                      key={type}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                        isVisible
                          ? 'border-primary/30 bg-primary/10 text-foreground'
                          : 'border-border bg-muted/50 text-muted-foreground opacity-60'
                      }`}
                      onClick={() => toggleLocationType(type)}
                    >
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: config.color }} />
                      {config.label} {config.icon}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
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
