export interface Location {
  id: string;
  name: string;
  nameMk?: string;
  description: string;
  descriptionMk?: string;
  type: string;
  latitude: number;
  longitude: number;
  coordinates: [number, number];
}
