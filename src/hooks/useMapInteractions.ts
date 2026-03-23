import { useState } from 'react';
import type { Location } from '@/types/location';

export const useMapInteractions = () => {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handlePinHover = (location: Location, event: React.MouseEvent) => {
    setHoveredLocation(location);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
    setTooltipVisible(true);
  };

  const handlePinLeave = () => {
    setTimeout(() => {
      if (!tooltipVisible) setHoveredLocation(null);
    }, 100);
  };

  const handlePinMove = (event: React.MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  const handleTooltipMouseEnter = () => setTooltipVisible(true);
  const handleTooltipMouseLeave = () => {
    setTooltipVisible(false);
    setHoveredLocation(null);
  };

  const handleNavigation = (location: Location) => {
    const { latitude, longitude } = location;
    const coords = `${latitude},${longitude}`;
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      window.open(`geo:${coords}?q=${coords}(${encodeURIComponent(location.name)})`, '_system');
      setTimeout(() => {
        window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
      }, 1000);
    } else {
      window.open(`https://maps.google.com/maps?q=${coords}&z=15`, '_blank');
    }
  };

  return {
    hoveredLocation,
    tooltipPosition,
    handlePinHover,
    handlePinLeave,
    handlePinMove,
    handleNavigation,
    handleTooltipMouseEnter,
    handleTooltipMouseLeave,
  };
};
