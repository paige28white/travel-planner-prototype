const activityGroups = {
  'Food & drink': [
    'Bakeries', 'Bar hopping', 'Barbecue', 'Beer tasting', 'Bottomless brunch', 'Brewery tours', 'Cafés',
    'Chocolate tasting', 'Cocktail bars', 'Cocktail-making classes', 'Coffee tasting', 'Cooking classes',
    'Dessert tours', 'Distillery tours', 'Farm-to-table dining', 'Farmers markets', 'Fine dining', 'Food halls',
    'Food tours', 'Local food', 'Picnics', 'Rooftop bars', 'Seafood', 'Street food', 'Tea rooms', 'Vineyards',
    'Whiskey tasting', 'Wine bars', 'Wine tasting', 'Winery tours'
  ],
  'Nightlife & entertainment': [
    'Arcades', 'Bars', 'Beach clubs', 'Bingo', 'Bowling', 'Cabaret', 'Casinos', 'Comedy shows', 'Concerts',
    'Country dancing', 'Dance clubs', 'Dancing', 'Drag shows', 'Escape rooms', 'Festivals', 'Jazz clubs',
    'Karaoke', 'Live music', 'Magic shows', 'Movie theaters', 'Night markets', 'Nightclubs', 'Opera',
    'Pool halls', 'Speakeasies', 'Theater', 'Trivia nights'
  ],
  'Wellness & relaxation': [
    'Acupuncture', 'Aromatherapy', 'Beach relaxation', 'Couples massage', 'Day spas', 'Facials', 'Float therapy',
    'Hot springs', 'Meditation', 'Mud baths', 'Nail salons', 'Pilates', 'Reflexology', 'Resort pools', 'Saunas',
    'Sound baths', 'Spa days', 'Steam rooms', 'Sunrise yoga', 'Thai massage', 'Wellness retreats', 'Yoga'
  ],
  'Arts & hands-on classes': [
    'Acting classes', 'Candle-making', 'Ceramics', 'Cooking classes', 'Craft workshops', 'Dance classes',
    'Drawing classes', 'Embroidery', 'Flower arranging', 'Glass blowing', 'Jewelry making', 'Leatherworking',
    'Mosaics', 'Painting classes', 'Photography classes', 'Pottery', 'Printmaking', 'Sewing classes',
    'Soap making', 'Street-art tours', 'Weaving', 'Woodworking', 'Writing workshops'
  ],
  'Outdoor adventure': [
    'ATV tours', 'Backpacking', 'Bouldering', 'Camping', 'Canyoneering', 'Caving', 'Cliff jumping',
    'Dog sledding', 'Dune buggies', 'Geocaching', 'Glacier hiking', 'Hang gliding', 'Hiking', 'Horseback riding',
    'Hot-air ballooning', 'Ice climbing', 'Mountain biking', 'Mountaineering', 'National parks', 'Nature walks',
    'Off-roading', 'Paragliding', 'Parasailing', 'Picnics', 'Rock climbing', 'Ropes courses', 'Sandboarding',
    'Scenic drives', 'Skydiving', 'Stargazing', 'Sunrise viewing', 'Sunset viewing', 'Trail running',
    'Treehouse stays', 'Via ferrata', 'Ziplining'
  ],
  'Ocean, lakes & rivers': [
    'Beaches', 'Boat rentals', 'Canoeing', 'Catamaran cruises', 'Cliffside walks', 'Deep-sea fishing', 'Diving',
    'Fjords & glaciers', 'Fishing', 'Fly fishing', 'Glass-bottom boats', 'Jet skiing', 'Kayaking', 'Kitesurfing',
    'Lake swimming', 'Paddleboarding', 'Rafting', 'River tubing', 'Sailing', 'Scuba diving', 'Snorkeling',
    'Speedboats', 'Surf lessons', 'Surfing', 'Swimming', 'Wakeboarding', 'Water parks', 'Water skiing',
    'Waterfall swimming', 'Whale watching', 'Whitewater rafting', 'Windsurfing', 'Yacht charters'
  ],
  'Winter activities': [
    'Après-ski', 'Cross-country skiing', 'Curling', 'Dog sledding', 'Ice fishing', 'Ice skating', 'Igloo stays',
    'Ski lessons', 'Skiing', 'Sledding', 'Sleigh rides', 'Snow tubing', 'Snowboarding', 'Snowmobiling',
    'Snowshoeing', 'Winter festivals'
  ],
  'Nature & wildlife': [
    'Aquariums', 'Birdwatching', 'Botanical gardens', 'Butterfly gardens', 'Dolphin watching', 'Eco tours',
    'Farm visits', 'Fossil hunting', 'Gardens', 'Marine life tours', 'Northern lights', 'Safari parks',
    'Scenic overlooks', 'Shell collecting', 'Tide pooling', 'Volcano tours', 'Whale watching',
    'Wildflower viewing', 'Wildlife photography', 'Wildlife refuges', 'Wildlife watching', 'Zoos'
  ],
  'Culture & sightseeing': [
    'Architecture tours', 'Art galleries', 'Art museums', 'Cemetery tours', 'City walks', 'Cultural centers',
    'Factory tours', 'Film-location tours', 'Ghost tours', 'Historic homes', 'Historic sites', 'History museums',
    'Indigenous cultural experiences', 'Landmarks', 'Libraries', 'Lighthouse tours', 'Local neighborhoods',
    'Monuments', 'Museums', 'Plantation history tours', 'Public art', 'Religious sites', 'Science museums',
    'Street-art tours', 'Studio tours', 'Train rides', 'Walking tours'
  ],
  'Sports & active fun': [
    'Archery', 'Baseball games', 'Basketball games', 'Batting cages', 'Beach volleyball', 'Bike tours', 'Biking',
    'Boxing classes', 'Climbing gyms', 'Disc golf', 'Driving ranges', 'Football games', 'Golf', 'Go-karts',
    'Gym workouts', 'Hockey games', 'Indoor skydiving', 'Martial arts classes', 'Mini golf', 'Pickleball',
    'Professional sports', 'Roller skating', 'Soccer games', 'Sports stadium tours', 'Tennis', 'Trampoline parks'
  ],
  'Family & kid-friendly': [
    'Amusement parks', 'Aquariums', 'Children’s museums', 'Corn mazes', 'Farms', 'Go-karts', 'Interactive museums',
    'Mini golf', 'Petting zoos', 'Playgrounds', 'Science centers', 'Theme parks', 'Toy stores', 'Train rides',
    'Trampoline parks', 'Water parks', 'Zoos'
  ],
  'Shopping & local finds': [
    'Antique shopping', 'Art markets', 'Bookstores', 'Farmers markets', 'Flea markets', 'Local boutiques',
    'Luxury shopping', 'Malls', 'Outlet shopping', 'Record stores', 'Souvenir shopping', 'Thrift shopping',
    'Vintage shopping'
  ],
  'Tours & transportation': [
    'Airboat tours', 'Bike tours', 'Boat tours', 'Bus tours', 'Food tours', 'Helicopter tours', 'Jeep tours',
    'Motorcycle rentals', 'Scenic flights', 'Segway tours', 'Train rides', 'Trolley tours', 'Walking tours'
  ],
  'Romantic & special occasions': [
    'Anniversary experiences', 'Couples massage', 'Engagement photo sessions', 'Private dinners',
    'Proposal planning', 'Romantic cruises', 'Rooftop dining', 'Sunset cruises', 'Wine tasting'
  ],
  'Unique & unusual': [
    'Animal cafés', 'Axe throwing', 'Dark-sky parks', 'Drive-in movies', 'Dude ranches', 'Escape rooms',
    'Ghost hunting', 'Glamping', 'Goat yoga', 'Murder-mystery dinners', 'Observatories', 'Photo booths',
    'Psychic readings', 'Rage rooms', 'Roadside attractions', 'Themed restaurants', 'Tiny-house stays',
    'Underground tours'
  ]
}

export const activityCategories = Object.entries(activityGroups).map(([name, items]) => ({ name, items }))
export const activities = [...new Set(Object.values(activityGroups).flat())].sort((a, b) => a.localeCompare(b))

const extraActivities = [
  '5K races', 'Adult playgrounds', 'Aerobics classes', 'Afternoon tea', 'Animal sanctuaries', 'Anime conventions',
  'Aqua aerobics', 'Art walks', 'Astrology readings', 'Backyard games', 'Barre classes', 'Bathhouses', 'Beach bonfires',
  'Beach workouts', 'Beekeeping experiences', 'Bicycle rentals', 'Board-game cafés', 'Boat parties', 'Book clubs',
  'Boot-camp workouts', 'Breathwork classes', 'Burlesque shows', 'Card games', 'Car shows', 'Cheese tasting',
  'Chess clubs', 'Circus classes', 'Clam digging', 'Community festivals', 'Competitive eating', 'Crabbing',
  'CrossFit classes', 'Crystal shops', 'Dance workouts', 'Darts', 'DJ classes', 'Dog-friendly activities',
  'Donut tours', 'E-bike rentals', 'Ecstatic dance', 'Farm dinners', 'Fashion shows', 'Fitness classes',
  'Flower farms', 'Foraging classes', 'Free local events', 'Full-moon parties', 'Gaming cafés', 'Gay bars',
  'Gem mining', 'Group workouts', 'Hammocking', 'Henna art', 'High tea', 'Historical reenactments', 'Hookah lounges',
  'Improv classes', 'K-pop dance classes', 'Language exchanges', 'Laser tag', 'Lawn games', 'Line dancing',
  'Local meetups', 'Lumberjack shows', 'Makeup classes', 'Marathons', 'Makers markets', 'Metal detecting',
  'Mobile saunas', 'Mocktail bars', 'Monster truck shows', 'Moonlight kayaking', 'Morning run clubs', 'Open-mic nights',
  'Outdoor gyms', 'Outdoor movies', 'Paddleboard yoga', 'Paint-and-sip classes', 'Park workouts', 'Piano bars',
  'Pole-dancing classes', 'Puppy yoga', 'Quilt shops', 'Running', 'Running tours', 'Salsa dancing', 'Scavenger hunts',
  'Silent discos', 'Skate parks', 'Spin classes', 'Square dancing', 'Stand-up paddleboard fitness', 'Strength training',
  'Tango lessons', 'Tarot readings', 'Tattoo shops', 'Tiki bars', 'Trail races', 'Urban exploring', 'Video-game bars',
  'Volunteering', 'Water aerobics', 'Wine-and-paint nights', 'Zumba classes'
]

for (const item of extraActivities) {
  if (!activities.includes(item)) activities.push(item)
}
activities.sort((a, b) => a.localeCompare(b))

const intentAliases = {
  drink: ['bar', 'beer', 'brewery', 'cocktail', 'distillery', 'nightlife', 'rooftop', 'speakeasy', 'tiki', 'whiskey', 'wine'],
  drinking: ['bar', 'beer', 'brewery', 'cocktail', 'distillery', 'nightlife', 'rooftop', 'speakeasy', 'tiki', 'whiskey', 'wine'],
  party: ['bar', 'club', 'dancing', 'disco', 'festival', 'nightlife', 'party'],
  partying: ['bar', 'club', 'dancing', 'disco', 'festival', 'nightlife', 'party'],
  workout: ['aerobics', 'barre', 'boot-camp', 'crossfit', 'fitness', 'gym', 'pilates', 'running', 'spin', 'strength', 'workout', 'yoga', 'zumba'],
  exercise: ['aerobics', 'barre', 'biking', 'crossfit', 'fitness', 'gym', 'hiking', 'pilates', 'running', 'spin', 'strength', 'swimming', 'workout', 'yoga'],
  fitness: ['aerobics', 'barre', 'boot-camp', 'crossfit', 'fitness', 'gym', 'pilates', 'running', 'spin', 'strength', 'workout', 'yoga', 'zumba'],
  relax: ['bathhouse', 'beach relaxation', 'facial', 'float', 'hammocking', 'hot springs', 'massage', 'meditation', 'pool', 'sauna', 'spa', 'steam', 'wellness', 'yoga'],
  relaxing: ['bathhouse', 'beach relaxation', 'facial', 'float', 'hammocking', 'hot springs', 'massage', 'meditation', 'pool', 'sauna', 'spa', 'steam', 'wellness', 'yoga'],
  pamper: ['facial', 'massage', 'nail', 'resort', 'sauna', 'spa', 'wellness'],
  romantic: ['anniversary', 'couples', 'private dinner', 'proposal', 'romantic', 'rooftop dining', 'sunset', 'wine'],
  date: ['arcade', 'bowling', 'cocktail', 'comedy', 'couples', 'dinner', 'mini golf', 'paint-and-sip', 'romantic', 'sunset'],
  art: ['art', 'candle', 'ceramic', 'craft', 'drawing', 'glass', 'jewelry', 'mosaic', 'painting', 'pottery', 'printmaking', 'sewing', 'weaving'],
  crafty: ['candle', 'ceramic', 'craft', 'embroidery', 'flower arranging', 'jewelry', 'painting', 'pottery', 'sewing', 'soap', 'weaving', 'woodworking'],
  water: ['beach', 'boat', 'canoe', 'diving', 'fishing', 'jet ski', 'kayak', 'paddleboard', 'rafting', 'sailing', 'scuba', 'snorkel', 'surf', 'swim', 'water', 'whale'],
  ocean: ['beach', 'boat', 'diving', 'fishing', 'marine', 'sailing', 'scuba', 'snorkel', 'surf', 'tide', 'whale'],
  outdoors: ['backpacking', 'camping', 'canyoneering', 'climbing', 'hiking', 'horseback', 'mountain', 'national park', 'nature', 'outdoor', 'trail', 'zipline'],
  adventure: ['atv', 'canyoneering', 'climbing', 'diving', 'glacier', 'off-road', 'paragliding', 'rafting', 'skydiving', 'surfing', 'ziplining'],
  cheap: ['free', 'garden', 'hiking', 'market', 'museum', 'picnic', 'public art', 'sunrise', 'sunset', 'walking'],
  free: ['free', 'garden', 'hiking', 'market', 'picnic', 'public art', 'sunrise', 'sunset', 'walking'],
  kids: ['amusement', 'aquarium', 'children', 'farm', 'kid', 'mini golf', 'playground', 'science', 'theme park', 'trampoline', 'water park', 'zoo'],
  family: ['amusement', 'aquarium', 'children', 'family', 'farm', 'mini golf', 'museum', 'playground', 'science', 'theme park', 'train', 'zoo'],
  weird: ['animal café', 'axe throwing', 'ghost', 'goat yoga', 'murder-mystery', 'psychic', 'rage room', 'roadside', 'themed', 'underground'],
  random: ['animal café', 'axe throwing', 'circus', 'ghost', 'goat yoga', 'laser tag', 'murder-mystery', 'psychic', 'rage room', 'roadside', 'scavenger', 'themed', 'underground'],
  social: ['bar', 'class', 'club', 'dancing', 'festival', 'karaoke', 'meetup', 'open-mic', 'party', 'trivia'],
  nightlife: ['bar', 'cabaret', 'casino', 'club', 'comedy', 'dancing', 'drag', 'karaoke', 'live music', 'night', 'speakeasy'],
  selfcare: ['bathhouse', 'facial', 'massage', 'meditation', 'nail', 'sauna', 'spa', 'wellness', 'yoga']
}

export function searchActivities(query) {
  const normalized = query.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '')
  if (!normalized) return activities
  const words = normalized.split(/\s+/)
  const expanded = new Set(words)
  for (const word of words) {
    for (const alias of intentAliases[word] || []) expanded.add(alias)
  }
  return activities.filter(activity => {
    const value = activity.toLowerCase()
    return value.includes(normalized) || [...expanded].some(term => value.includes(term))
  })
}
