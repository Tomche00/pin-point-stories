import { useLanguage } from '@/i18n/LanguageContext';
import { LOCATION_TYPES } from '@/constants/locationTypes';
import type { Location } from '@/types/location';

interface MapHeaderProps {
  filteredLocations: Location[];
  visibleTypes: Set<string>;
  availableTypes: string[];
}

const MapHeader = ({ filteredLocations, visibleTypes, availableTypes }: MapHeaderProps) => {
  const { t } = useLanguage();
  const typeLabels = t.types as Record<string, string>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 pb-6">
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-2">
        {t.map.subtitle}
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
        {t.map.title}
      </h1>
      <p className="text-muted-foreground text-sm mt-1.5 max-w-md">
        {t.map.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="badge-pill">
          {filteredLocations.length} {t.map.locations}
        </span>
        {availableTypes.map(type => {
          const count = filteredLocations.filter(l => l.type === type).length;
          if (!visibleTypes.has(type) || count === 0) return null;
          const config = LOCATION_TYPES[type];
          const color = config?.color || '#60a5fa';
          return (
            <span
              key={type}
              className="badge-pill inline-flex items-center gap-1.5"
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              {count} {typeLabels[type] || type}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default MapHeader;
