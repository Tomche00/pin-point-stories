import { useState } from 'react';
import locations from '@/data/locations.json';
import { LocationTooltip } from './LocationTooltip';
import macedoniaMap from '@/assets/macedonia-map-modern.jpg';
import { LOCATION_TYPES, DEFAULT_VISIBLE_TYPES } from '@/constants/locationTypes';
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
    .filter(type => LOCATION_TYPES[type]);

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
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <div className="flex gap-5">
          <MapFilters
            availableTypes={availableTypes}
            visibleTypes={visibleTypes}
            onToggle={toggleLocationType}
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
