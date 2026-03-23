import { LOCATION_TYPES } from '@/constants/locationTypes';
import type { Location } from '@/types/location';

interface MapHeaderProps {
  filteredLocations: Location[];
  visibleTypes: Set<string>;
  availableTypes: string[];
}

const MapHeader = ({ filteredLocations, visibleTypes, availableTypes }: MapHeaderProps) => {
  return (
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
  );
};

export default MapHeader;
