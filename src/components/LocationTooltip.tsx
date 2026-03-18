import React from 'react';
import { LOCATION_TYPES } from '@/constants/locationTypes';
import { Navigation2 } from 'lucide-react';

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

export const LocationTooltip: React.FC<LocationTooltipProps> = ({ 
  location, 
  position, 
  onNavigate, 
  onMouseEnter, 
  onMouseLeave 
}) => {
  const config = LOCATION_TYPES[location.type];
  const icon = config?.icon || '📍';
  const label = config?.label || location.type;
  const color = config?.color || '#60a5fa';

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
      <div className="glass-panel p-4 max-w-xs animate-in fade-in-0 zoom-in-95 duration-200">
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center text-sm shadow-sm"
            style={{ backgroundColor: `${color}20`, border: `1px solid ${color}30` }}
          >
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground text-base leading-tight">
              {location.name}
            </h3>
            <span 
              className="inline-block px-2 py-0.5 text-[10px] rounded-full font-semibold mt-1 uppercase tracking-wider"
              style={{ backgroundColor: `${color}15`, color }}
            >
              {label}
            </span>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {location.description}
        </p>
        
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground">
          <span>{location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</span>
          <button 
            onClick={() => onNavigate?.(location)}
            className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <Navigation2 className="w-3 h-3" />
            Navigate
          </button>
        </div>
      </div>
    </div>
  );
};
