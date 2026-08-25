# RoamReady (working name)

An independent, USA-first travel-planning product. The permanent name will be chosen later.

## Product vision

The planner should feel nearly endless while remaining simple: enter any U.S. origin airport, destination, dates, travelers, interests, comfort level, and maximum total budget. The site searches across the trip instead of making the traveler research each part separately.

It will eventually suggest:

- Flights and flight times, with current prices and links to an external booking or comparison page
- Airbnb-style rentals and hotels
- Rental cars and other local transportation
- Activities, excursions, outdoor recreation, and attractions
- Restaurants and other food options
- A mapped, day-by-day itinerary
- A running trip total that keeps the combined suggestions under the traveler's budget
- Alternatives that can be swapped without rebuilding the whole trip

The site recommends and organizes options. Bookings remain on trusted external provider websites.

## Current prototype

The current interactive demo uses a four-day September trip from California to Anchorage and the Kenai Fjords. It includes:

- Searchable city and airport selectors
- Searchable, multi-select vacation activities
- Dates, travelers, stay style, and adjustable budget
- Generated sample itinerary and cost summary
- Suggested flight, lodging, car, and experience cards
- Responsive desktop and mobile layouts
- A temporary name that can be replaced later

Prices and availability in this version are sample data.

## Development phases

1. **Publish the interactive prototype.** Validate the planning flow and visual design.
2. **Expand the U.S. search experience.** Add complete airport and activity datasets, destination discovery, and map-based planning.
3. **Connect live travel data.** Evaluate permitted APIs and affiliate/search partners for flights, hotels, rentals, cars, activities, restaurants, maps, and weather.
4. **Build the budget engine.** Combine fees and estimates, filter plans under the maximum budget, and recalculate when an item is swapped.
5. **Add saved trips and accounts.** Let travelers return to, share, and compare plans.
6. **Choose the permanent brand and domain.**

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Publishing

The repository includes a GitHub Actions workflow that builds and publishes the site through GitHub Pages whenever the `main` branch changes. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
