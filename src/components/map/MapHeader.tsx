import { useLanguage } from '@/i18n/LanguageContext';
import { LOCATION_TYPES, LOCATION_TYPE_PRESETS } from '@/constants/locationTypes';
import type { Location } from '@/types/location';

interface MapHeaderProps {
  filteredLocations: Location[];
  visibleTypes: Set<string>;
  availableTypes: string[];
  onApplyPreset: (types: string[]) => void;
}

const MapHeader = ({ filteredLocations, visibleTypes, availableTypes, onApplyPreset }: MapHeaderProps) => {
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

      <div className="mt-4 flex flex-wrap gap-1.5">
        {Object.values(LOCATION_TYPE_PRESETS).map(preset => {
          const applicableTypes = preset.types.filter(t => availableTypes.includes(t));
          const selectedTypes = availableTypes.filter(t => visibleTypes.has(t));
          const isActive =
            applicableTypes.length > 0 &&
            selectedTypes.length === applicableTypes.length &&
            applicableTypes.every(t => visibleTypes.has(t));

          return (
            <button
              key={preset.label}
              type="button"
              className={`text-[11px] px-2.5 py-1.5 rounded-md border transition-colors inline-flex items-center gap-1.5 ${
                isActive
                  ? 'border-border bg-secondary text-foreground'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-secondary/60'
              }`}
              onClick={() => onApplyPreset(preset.types)}
            >
              <span className="leading-none">{preset.icon}</span>
              <span>{preset.label}</span>
            </button>
          );
        })}
      </div>

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
