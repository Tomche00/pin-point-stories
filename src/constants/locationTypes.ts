export interface LocationTypeConfig {
  color: string;
  icon: string;
  label: string;
}

export const LOCATION_TYPE_ORDER: string[] = [
  // Adjust this list to control sidebar/mobile filter ordering.
  'city',
  'village',
  'monument',
  'monastery',
  'museum',
  'nature',
  'water',
  'viewpoint',
  'hiking',
  'camping',
  'recreation',
  'adventure',
  'restaurant',
  'accommodation',
];

export type LocationTypePresetKey =
  | 'explore'
  | 'outdoors'
  | 'family'
  | 'scenic'
  | 'active'
  | 'food_stay'
  | 'relax';

export const LOCATION_TYPE_PRESETS: Record<
  LocationTypePresetKey,
  { label: string; types: string[]; icon: string; color: string }
> = {
    explore: {
      label: 'Explore',
      types: ['city', 'village', 'monument', 'monastery', 'museum'],
      icon: '🧭',
      color: '#fbbf24',
    },
    outdoors: {
      label: 'Outdoors',
      types: ['nature', 'hiking', 'camping', 'water', 'viewpoint'],
      icon: '🌲',
      color: '#84cc16',
    },
    family: {
      label: 'Family',
      types: ['recreation', 'adventure', 'restaurant'],
      icon: '👨‍👩‍👧‍👦',
      color: '#f97316',
    },
    scenic: {
      label: 'Scenic',
      types: ['viewpoint', 'nature', 'water'],
      icon: '📸',
      color: '#f59e0b',
    },
    active: {
      label: 'Active',
      types: ['hiking', 'adventure', 'recreation', 'camping'],
      icon: '🥾',
      color: '#059669',
    },
    food_stay: {
      label: 'Food & Stay',
      types: ['restaurant', 'accommodation'],
      icon: '🍽️',
      color: '#ef4444',
    },
    relax: {
      label: 'Relax',
      types: ['recreation', 'water', 'viewpoint'],
      icon: '🧘',
      color: '#3b82f6',
    },
  };

export const LOCATION_TYPES: Record<string, LocationTypeConfig> = {
  monument: {
    color: '#fbbf24', // amber-400
    icon: '🏛️',
    label: 'Monuments'
  },
  city: {
    color: '#10b981', // emerald-500
    icon: '🏙️',
    label: 'Cities'
  },
  
  village: {
	  color: '#a16207', // amber-700
	  icon: '🏡',
	  label: 'Villages'
  },
  
  recreation: {
    color: '#f97316', // orange-500
    icon: '🏕️',
    label: 'Recreation'
  },
  nature: {
    color: '#84cc16', // lime-500
    icon: '🌲',
    label: 'Nature'
  },
  camping: {
    color: '#8b5cf6', // violet-500
    icon: '⛺',
    label: 'Camping'
  },
  restaurant: {
    color: '#ef4444', // red-500
    icon: '🍽️',
    label: 'Restaurants'
  },
  accommodation: {
    color: '#06b6d4', // cyan-500
    icon: '🏨',
    label: 'Hotels'
  },
  viewpoint: {
    color: '#f59e0b', // amber-500
    icon: '📸',
    label: 'Viewpoints'
  },
  hiking: {
    color: '#059669', // emerald-600
    icon: '🥾',
    label: 'Hiking'
  },
  water: {
    color: '#3b82f6', // blue-500
    icon: '💧',
    label: 'Lakes & Rivers'
  },
  monastery: {
    color: '#7c3aed', // violet-600
    icon: '⛪',
    label: 'Monasteries'
  },
  museum: {
    color: '#dc2626', // red-600
    icon: '🏛️',
    label: 'Museums'
  },
  adventure: {
    color: '#ea580c', // orange-600
    icon: '🏂',
    label: 'Adventure Sports'
  }
};

export const DEFAULT_VISIBLE_TYPES = new Set(['hiking', 'nature', 'camping']);