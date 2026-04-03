import { useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import macedoniaMap from '@/assets/macedonia-map-modern.jpg';
import { LOCATION_TYPES, DEFAULT_VISIBLE_TYPES, LOCATION_TYPE_ORDER } from '@/constants/locationTypes';
import { useMapInteractions } from '@/hooks/useMapInteractions';
import MapHeader from './map/MapHeader';
import MapFilters, { MobileFilters } from './map/MapFilters';
import MapPins from './map/MapPins';
import type { Location } from '@/types/location';

const CustomMap = () => {
  const [visibleTypes, setVisibleTypes] = useState<Set<string>>(DEFAULT_VISIBLE_TYPES);
  const {
    hoveredLocation,
    tooltipPosition,
    handlePinHover,
    handlePinLeave,
    handlePinMove,
    handleNavigation,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  } = useMapInteractions();

  const availableTypes = Array.from(new Set(locations.map(l => l.type)))
    .filter(type => LOCATION_TYPES[type])
    .sort((a, b) => {
      const ai = LOCATION_TYPE_ORDER.indexOf(a);
      const bi = LOCATION_TYPE_ORDER.indexOf(b);
      const aRank = ai === -1 ? Number.POSITIVE_INFINITY : ai;
      const bRank = bi === -1 ? Number.POSITIVE_INFINITY : bi;
      if (aRank !== bRank) return aRank - bRank;
      return (LOCATION_TYPES[a]?.label || a).localeCompare(LOCATION_TYPES[b]?.label || b);
    });

  const selectAllTypes = () => setVisibleTypes(new Set(availableTypes));
  const deselectAllTypes = () => setVisibleTypes(new Set());
  const applyPreset = (types: string[]) => {
    const next = new Set(types.filter(t => availableTypes.includes(t)));
    setVisibleTypes(next);
  };

  const toggleLocationType = (type: string) => {
    setVisibleTypes(prev => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  const filteredLocations = locations.filter(l => visibleTypes.has(l.type)) as Location[];

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] bg-background">
      <MapHeader
        filteredLocations={filteredLocations}
        visibleTypes={visibleTypes}
        availableTypes={availableTypes}
        onApplyPreset={applyPreset}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex gap-5">
          <MapFilters
            availableTypes={availableTypes}
            visibleTypes={visibleTypes}
            onToggle={toggleLocationType}
            onSelectAll={selectAllTypes}
            onDeselectAll={deselectAllTypes}
          />

          <div className="flex-1 min-w-0">
            <div className="glass-panel overflow-hidden">
              <div className="relative">
                <img
                  src={macedoniaMap}
                  alt="North Macedonia Map"
                  className="w-full h-auto object-contain"
                />
                <MapPins
                  locations={filteredLocations}
                  onHover={handlePinHover}
                  onLeave={handlePinLeave}
                  onMove={handlePinMove}
                  onClick={handleNavigation}
                />
              </div>
            </div>

            <MobileFilters
              availableTypes={availableTypes}
              visibleTypes={visibleTypes}
              onToggle={toggleLocationType}
              onSelectAll={selectAllTypes}
              onDeselectAll={deselectAllTypes}
            />
          </div>
        </div>
      </div>

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
