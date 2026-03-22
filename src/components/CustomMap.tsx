import React, { useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import macedoniaMap from '@/assets/macedonia-focused-map.jpg';
import { LOCATION_TYPES, DEFAULT_VISIBLE_TYPES } from '@/constants/locationTypes';
import { Eye, EyeOff } from 'lucide-react';

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
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
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
    <div className="w-full min-h-[calc(100vh-3.5rem)] bg-background">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
          Interactive Map
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Explore North Macedonia
        </h1>
        <p className="text-muted-foreground text-sm mt-1.5 max-w-md">
          Discover monuments, cities, and natural wonders across the country.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="badge-pill">
            {filteredLocations.length} locations
          </span>
          {availableTypes.map(type => {
            const config = LOCATION_TYPES[type];
            const count = filteredLocations.filter(l => l.type === type).length;
            if (!visibleTypes.has(type) || count === 0) return null;
            return (
              <span key={type} className="badge-pill">
                <span>{config.icon}</span> {count}
              </span>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex gap-5">
          {/* Sidebar filters */}
          <div className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-20 space-y-1">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground px-2 mb-2">
                Filters
              </p>
              {availableTypes.map(type => {
                const config = LOCATION_TYPES[type];
                const isVisible = visibleTypes.has(type);
                const count = locations.filter(l => l.type === type).length;
                return (
                  <button
                    key={type}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-colors ${
                      isVisible
                        ? 'text-foreground bg-secondary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    }`}
                    onClick={() => toggleLocationType(type)}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-opacity"
                      style={{
                        backgroundColor: config.color,
                        opacity: isVisible ? 1 : 0.3
                      }}
                    />
                    <span className="flex-1 text-left text-[13px]">{config.label}</span>
                    <span className="text-xs text-muted-foreground tabular-nums">{count}</span>
                    {isVisible ? (
                      <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                    ) : (
                      <EyeOff className="w-3.5 h-3.5 text-muted-foreground/50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div className="flex-1 min-w-0">
            <div className="glass-panel overflow-hidden">
              <div className="relative">
                <img
                  src={macedoniaMap}
                  alt="North Macedonia Map"
                  className="w-full h-auto object-contain"
                />

                {/* Pins */}
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
                          className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] border-background transform transition-transform duration-200 group-hover:scale-[1.4]"
                          style={{
                            backgroundColor: getLocationColor(location.type),
                            boxShadow: `0 1px 4px ${getLocationColor(location.type)}40`
                          }}
                        >
                          <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px]">
                            {getLocationIcon(location.type)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Mobile filters */}
            <div className="lg:hidden mt-4">
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground mb-2">
                Filters
              </p>
              <div className="flex flex-wrap gap-1.5">
                {availableTypes.map(type => {
                  const config = LOCATION_TYPES[type];
                  const isVisible = visibleTypes.has(type);
                  return (
                    <button
                      key={type}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-colors border ${
                        isVisible
                          ? 'border-border bg-secondary text-foreground'
                          : 'border-transparent bg-transparent text-muted-foreground'
                      }`}
                      onClick={() => toggleLocationType(type)}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color, opacity: isVisible ? 1 : 0.3 }} />
                      {config.label}
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
