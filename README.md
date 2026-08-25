# RoamReady (working name)

An independent, USA-first travel-planning prototype. A traveler enters their origin, destination, dates, budget, preferred lodging style, and searchable activities. The interface then assembles a day-by-day route with suggested flights, lodging, transportation, and experiences.

The current demo uses a four-day September trip from California to Anchorage and the Kenai Fjords. Prices and availability are sample data until live travel APIs are connected.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Current features

- Searchable city and airport selectors
- Searchable, multi-select vacation activity list
- Dates, travelers, stay style, and adjustable trip budget
- Generated sample itinerary and cost summary
- Responsive desktop and mobile layout
- Name isolated in visible copy so it can be replaced later

## Next development steps

1. Replace sample suggestions with live flight, lodging, rental-car, mapping, weather, and activity data.
2. Add itinerary swapping and live budget recalculation.
3. Add saved trips and account authentication.
4. Choose and apply the permanent product name and domain.
