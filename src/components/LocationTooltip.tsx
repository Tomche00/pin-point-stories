import React from 'react';
import { LOCATION_TYPES } from '@/constants/locationTypes';
import { Navigation2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { Location } from '@/types/location';

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
  const { language, t } = useLanguage();
  const config = LOCATION_TYPES[location.type];
  const icon = config?.icon || '📍';
  const typeLabels = t.types as Record<string, string>;
  const label = typeLabels[location.type] || config?.label || location.type;
  const color = config?.color || '#60a5fa';

  const displayName = language === 'mk' && location.nameMk ? location.nameMk : location.name;
  const displayDescription = language === 'mk' && location.descriptionMk ? location.descriptionMk : location.description;

  return (
    <div
      className="fixed z-50 pointer-events-auto"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="bg-card border border-border rounded-lg p-3.5 max-w-[260px] shadow-lg animate-in fade-in-0 zoom-in-95 duration-150">
        <div className="flex items-start gap-2.5 mb-2">
          <span className="text-base mt-0.5">{icon}</span>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-foreground text-sm leading-snug">
              {displayName}
            </h3>
            <span
              className="inline-block text-[10px] font-medium mt-0.5 uppercase tracking-wider"
              style={{ color }}
            >
              {label}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-xs leading-relaxed">
          {displayDescription}
        </p>

        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border">
          <span className="text-[11px] text-muted-foreground tabular-nums">
            {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </span>
          <button
            onClick={() => onNavigate?.(location)}
            className="inline-flex items-center gap-1 px-2.5 py-1 bg-foreground text-background text-[11px] rounded-md hover:bg-foreground/90 transition-colors font-medium"
          >
            <Navigation2 className="w-3 h-3" />
            {t.map.navigate}
          </button>
        </div>
      </div>
    </div>
  );
};
