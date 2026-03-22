# Macedonia Explorer

Interactive map application for exploring North Macedonia — browse monuments, cities, nature spots, camping locations, and more.

**Live:** [pin-point-stories.lovable.app](https://pin-point-stories.lovable.app)

## Features

- **Interactive map** with 250+ curated locations on a custom map
- **Category filters** — Monuments, Cities, Nature, Camping, Recreation, Restaurants, Hotels, and more
- **Auto-detection** — new location types from data appear automatically in the legend
- **Location details** — hover any pin for name, description, coordinates, and Google Maps navigation
- **Responsive** — desktop sidebar filters, mobile-optimized chip filters

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- React Router

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── CustomMap.tsx         # Map with pins and filters
│   ├── LocationTooltip.tsx   # Hover tooltip
│   └── Navigation.tsx        # Top nav bar
├── constants/
│   └── locationTypes.ts      # Category config (color, icon, label)
├── data/
│   └── locations.json        # Location data
├── pages/
│   ├── Index.tsx
│   ├── About.tsx
│   └── Rent.tsx
└── index.css                 # Design tokens
```

## Adding Locations

Add entries to `src/data/locations.json`:

```json
{
  "name": "Location Name",
  "lat": 41.9981,
  "lng": 21.4254,
  "type": "monument",
  "description": "Brief description"
}
```

Register new types in `src/constants/locationTypes.ts` — they appear in the UI automatically.

## License

All rights reserved.
