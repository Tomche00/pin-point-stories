import React from 'react';

interface Location {
  id: string;
  name: string;
  description: string;
  type: string;
  latitude: number;
  longitude: number;
  coordinates: [number, number];
}

interface LocationTooltipProps {
  location: Location;
  position: { x: number; y: number };
  onNavigate?: (location: Location) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const typeLabels: Record<string, string> = {
  monument: 'Historical Monument',
  city: 'City',
  camping: 'Recreation Area',
  nature: 'Natural Site'
};

const typeIcons: Record<string, string> = {
  monument: '🏛️',
  city: '🏙️',
  camping: '🏕️',
  nature: '🌲'
};

export const LocationTooltip: React.FC<LocationTooltipProps> = ({ 
  location, 
  position, 
  onNavigate, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const handleNavigateClick = () => {
    if (onNavigate) {
      onNavigate(location);
    }
  };

  return (
    <div
      className="fixed z-50 pointer-events-auto transition-all duration-200"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="map-tooltip max-w-sm animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-start gap-3 mb-3">
          <div className={`map-pin location-type-${location.type} flex-shrink-0 flex items-center justify-center text-sm`}>
            {typeIcons[location.type] || '📍'}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-lg leading-tight">
              {location.name}
            </h3>
            <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium mt-1">
              {typeLabels[location.type] || location.type}
            </span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {location.description}
        </p>
        
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <span className="text-primary">📍</span>
            <span>{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
          </div>
          <button 
            onClick={handleNavigateClick}
            className="ml-auto px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full hover:bg-primary/90 transition-colors font-medium"
          >
            Navigate 🗺️
          </button>
        </div>
      </div>
    </div>
  );
};