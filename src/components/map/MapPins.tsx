import React from 'react';
import { LOCATION_TYPES } from '@/constants/locationTypes';
import type { Location } from '@/types/location';

const MAP_BOUNDS = {
  north: 42.44,
  south: 40.65,
  west: 19.68,
  east: 23.75,
};

const coordsToPercent = (lng: number, lat: number) => {
  const x = ((lng - MAP_BOUNDS.west) / (MAP_BOUNDS.east - MAP_BOUNDS.west)) * 100;
  const y = ((MAP_BOUNDS.north - lat) / (MAP_BOUNDS.north - MAP_BOUNDS.south)) * 100;
  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
};

interface MapPinsProps {
  locations: Location[];
  onHover: (location: Location, event: React.MouseEvent) => void;
  onLeave: () => void;
  onMove: (event: React.MouseEvent) => void;
  onClick: (location: Location) => void;
}

const MapPins = ({ locations, onHover, onLeave, onMove, onClick }: MapPinsProps) => {
  return (
    <div className="absolute inset-0">
      {locations.map((location) => {
        const { x, y } = coordsToPercent(location.coordinates[0], location.coordinates[1]);
        const color = LOCATION_TYPES[location.type]?.color || '#60a5fa';
        const icon = LOCATION_TYPES[location.type]?.icon || '📍';

        return (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${x}%`, top: `${y}%` }}
            onMouseEnter={(e) => onHover(location, e)}
            onMouseLeave={onLeave}
            onMouseMove={onMove}
            onClick={() => onClick(location)}
          >
            <div
              className="relative w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] border-background transform transition-transform duration-200 group-hover:scale-[1.4]"
              style={{
                backgroundColor: color,
                boxShadow: `0 1px 4px ${color}40`,
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-[8px] sm:text-[10px]">
                {icon}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MapPins;
