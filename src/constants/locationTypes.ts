export interface LocationTypeConfig {
  color: string;
  icon: string;
  label: string;
}

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