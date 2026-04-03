import { LOCATION_TYPES } from '@/constants/locationTypes';
import { Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import locations from '@/data/locations.json';

interface MapFiltersProps {
  availableTypes: string[];
  visibleTypes: Set<string>;
  onToggle: (type: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

const MapFilters = ({
  availableTypes,
  visibleTypes,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: MapFiltersProps) => {
  const { t } = useLanguage();
  const typeLabels = t.types as Record<string, string>;
  const allSelected = availableTypes.length > 0 && availableTypes.every(t => visibleTypes.has(t));
  const noneSelected = availableTypes.every(t => !visibleTypes.has(t));

  return (
    <div className="hidden lg:block w-52 flex-shrink-0">
      <div className="sticky top-20 space-y-1">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground px-2 mb-2">
          {t.map.filters}
        </p>
        <div className="flex items-center justify-between px-2 mb-2">
          <button
            type="button"
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
            onClick={onSelectAll}
            disabled={allSelected}
          >
            Select all
          </button>
          <button
            type="button"
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
            onClick={onDeselectAll}
            disabled={noneSelected}
          >
            Deselect all
          </button>
        </div>
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
              onClick={() => onToggle(type)}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-opacity"
                style={{ backgroundColor: config.color, opacity: isVisible ? 1 : 0.3 }}
              />
              <span className="flex-1 text-left text-[13px]">{typeLabels[type] || config.label}</span>
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
  );
};

export const MobileFilters = ({
  availableTypes,
  visibleTypes,
  onToggle,
  onSelectAll,
  onDeselectAll,
}: MapFiltersProps) => {
  const { t } = useLanguage();
  const typeLabels = t.types as Record<string, string>;
  const allSelected = availableTypes.length > 0 && availableTypes.every(t => visibleTypes.has(t));
  const noneSelected = availableTypes.every(t => !visibleTypes.has(t));

  return (
    <div className="lg:hidden mt-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
          {t.map.filters}
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
            onClick={onSelectAll}
            disabled={allSelected}
          >
            Select all
          </button>
          <button
            type="button"
            className="text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground"
            onClick={onDeselectAll}
            disabled={noneSelected}
          >
            None
          </button>
        </div>
      </div>
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
              onClick={() => onToggle(type)}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: config.color, opacity: isVisible ? 1 : 0.3 }} />
              {typeLabels[type] || config.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MapFilters;
