import { useMemo, useRef, useState } from 'react'
import { ArrowRight, CalendarDays, Car, Check, ChevronDown, CircleDollarSign, MapPin, Menu, Mountain, Plane, Search, Sparkles, Star, TentTree, X } from 'lucide-react'
import { airports } from './data/airports'
import { activities, activityCategories, searchActivities } from './data/activities'
import { createGoogleFlightsUrl } from './utils/googleFlights'

const destinationPlans = {
  ANC: { title: 'Four wild days in Alaska', place: 'Anchorage', route: ['Arrive & explore Anchorage', 'Turnagain Arm scenic drive', 'Kenai Fjords adventure', 'Exit Glacier & return'], details: ['Pick up your car, check in, and walk the Tony Knowles Coastal Trail before dinner downtown.', 'Stop at Beluga Point, explore Girdwood, and choose a forest trail that matches your pace.', 'Head to Seward for glaciers, sea lions, puffins, and possible whale sightings.', 'Take a morning glacier-area hike, have lunch in Seward, and make the relaxed return drive.'], stay: 'Comfort hotel near downtown', experience: 'Kenai Fjords Cruise', base: 1947 },
  SEA: { title: 'A perfect Pacific Northwest escape', place: 'Seattle', route: ['Land, settle in & explore', 'Pike Place & waterfront day', 'Mount Rainier day trip', 'Coffee, views & departure'], details: ['Ride into the city, settle in, and catch sunset from Kerry Park.', 'Explore Pike Place Market, the waterfront, and a neighborhood food stop.', 'Spend the day among waterfalls, forest trails, and mountain viewpoints.', 'Choose a final neighborhood, local coffee, and one last skyline view.'], stay: 'Boutique stay in Belltown', experience: 'Mount Rainier small-group trip', base: 1580 },
  DEN: { title: 'Four elevated days in Colorado', place: 'Denver', route: ['Arrive & explore Denver', 'Red Rocks & foothills', 'Rocky Mountain National Park', 'Golden morning & departure'], details: ['Check in and explore Union Station, RiNo, and a relaxed dinner spot.', 'Walk the Red Rocks trails and take a scenic foothills drive.', 'Choose alpine lakes, wildlife overlooks, and a trail suited to your group.', 'Spend a slow morning in Golden before returning to the airport.'], stay: 'Modern downtown hotel', experience: 'Rocky Mountain day tour', base: 1715 },
  HNL: { title: 'Four sun-soaked days on Oʻahu', place: 'Honolulu', route: ['Arrive & Waikīkī sunset', 'East Oʻahu coast day', 'North Shore adventure', 'Ocean morning & departure'], details: ['Settle in, walk the beach, and enjoy an easy first-night dinner.', 'Drive the windward coast with overlooks, a beach stop, and a waterfall option.', 'Explore surf towns, food trucks, beaches, and seasonal wildlife viewing.', 'Fit in a calm ocean activity or scenic walk before checkout.'], stay: 'Moderate Waikīkī hotel', experience: 'Guided snorkel excursion', base: 2110 },
  JFK: { title: 'Four unforgettable days in New York', place: 'New York City', route: ['Arrive & neighborhood dinner', 'Downtown icons & food', 'Central Park & museums', 'Brooklyn morning & departure'], details: ['Check in, get oriented, and choose a great dinner close to your stay.', 'Build a walkable route through downtown sights with food stops along the way.', 'Pair Central Park with the museum or neighborhood that best fits your interests.', 'Walk the Brooklyn waterfront and enjoy one final local meal.'], stay: 'Well-rated Manhattan hotel', experience: 'Neighborhood food tour', base: 2190 },
  SAN: { title: 'Four easygoing days in San Diego', place: 'San Diego', route: ['Arrive & sunset cliffs', 'La Jolla coast day', 'Balboa Park & neighborhoods', 'Beach morning & departure'], details: ['Check in and start with a coastal sunset and casual dinner.', 'Kayak, snorkel, watch wildlife, or stroll the coves at your own pace.', 'Mix gardens and museums with a neighborhood food crawl.', 'Choose one last beach walk or brunch before heading home.'], stay: 'Coastal midrange hotel', experience: 'La Jolla kayak tour', base: 1460 },
}

function buildSamplePlan(destination, origin, selected, budget, preferences = {}) {
  const code = destination.match(/—\s*([A-Z]{3})/)?.[1] || 'ANC'
  const template = destinationPlans[code] || { title: `Four days around ${destination.split(',')[0] || 'your destination'}`, place: destination.split(',')[0] || 'Your destination', route: ['Arrive & get oriented', 'Local highlights day', 'Signature adventure', 'Slow morning & departure'], details: ['Check in, explore nearby, and begin with an easy local favorite.', 'Combine the area’s most-loved sights with food and time to wander.', `Build today around ${selected.slice(0, 2).join(' and ') || 'your favorite activities'}.`, 'Keep the final morning flexible before heading home.'], stay: 'Top-rated moderate stay', experience: selected[0] ? `Highly rated ${selected[0].toLowerCase()} experience` : 'Traveler-favorite excursion', base: 1650 }
  const target = Math.max(780, Math.min(template.base, budget - 75))
  const flight = Math.round(target * .25)
  const stay = Math.round(target * .36)
  const car = Math.round(target * .17)
  const experience = target - flight - stay - car
  const originCode = origin.match(/—\s*([A-Z]{3})/)?.[1] || 'USA'
  const checkIn = preferences.checkIn || '2026-09-12'
  const checkOut = preferences.checkOut || '2026-09-15'
  const travelers = preferences.travelers || 2
  const stayQuery = `${(preferences.stayTypes || []).join(' or ') || 'hotels'} in ${template.place} from ${checkIn} to ${checkOut} for ${travelers} guests`
  const transportationQuery = `${(preferences.transportModes || []).join(' or ') || 'transportation'} in ${template.place}`
  const experienceQuery = `${template.experience} near ${template.place}`
  const wantsAnyStay = (preferences.stayTypes || []).includes('Anything under budget')
  const wantsHotel = wantsAnyStay || (preferences.stayTypes || []).some(type => ['Hotel', 'Hostel', 'Resort'].includes(type))
  const wantsRental = wantsAnyStay || (preferences.stayTypes || []).some(type => ['Vacation rental', 'Cabin'].includes(type))
  const stayLinks = [
    ...(wantsHotel ? [{ label: 'Google Hotels', url: `https://www.google.com/travel/hotels?q=${encodeURIComponent(stayQuery)}&checkin=${checkIn}&checkout=${checkOut}` }] : []),
    ...(wantsRental ? [
      { label: 'Airbnb', url: `https://www.airbnb.com/s/${encodeURIComponent(template.place)}/homes?checkin=${checkIn}&checkout=${checkOut}&adults=${travelers}` },
      { label: 'Vrbo', url: `https://www.vrbo.com/search?destination=${encodeURIComponent(template.place)}&startDate=${checkIn}&endDate=${checkOut}&adults=${travelers}` }
    ] : [])
  ]
  return {
    ...template,
    total: target,
    itinerary: template.route.map((title, i) => ({ day: `Day ${i + 1}`, title, detail: template.details[i], tag: i === 2 ? 'Top pick' : i === 0 ? 'Easy arrival' : i === 3 ? 'Flexible' : selected[i - 1] || 'Explore', icon: [Plane, Car, Mountain, TentTree][i] })),
    preferences,
    picks: [
      { type: 'Flight', name: `${originCode} → ${code}`, meta: `Round trip · ${travelers} travelers`, price: `$${flight}`, note: `${preferences.flightTime} · ${preferences.maxStops}`, icon: Plane, links: [{ label: 'Search live on Google Flights', url: createGoogleFlightsUrl({ origin: originCode, destination: code, departureDate: checkIn, returnDate: checkOut, travelers, flightTime: preferences.flightTime, maxStops: preferences.maxStops }) }] },
      { type: 'Stay', name: template.stay, meta: `${checkIn} → ${checkOut}`, price: `$${stay}`, note: 'Matches your selected stay types', icon: MapPin, links: stayLinks.length ? stayLinks : [{ label: 'Search stays', url: `https://www.google.com/travel/search?q=${encodeURIComponent(stayQuery)}` }] },
      { type: 'Transportation', name: code === 'JFK' ? 'Transit + rideshare plan' : 'Compact crossover', meta: 'Trip transportation estimate', price: `$${car}`, note: 'Fits this route', icon: Car, links: [{ label: 'Compare transportation', url: `https://www.google.com/search?q=${encodeURIComponent(transportationQuery)}` }] },
      { type: 'Experience', name: template.experience, meta: 'Highly rated sample option', price: `$${experience}`, note: 'Matches your interests', icon: Mountain, links: [{ label: 'Find live options', url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(experienceQuery)}` }] },
    ],
  }
}

function Autocomplete({ label, value, onChange, options, placeholder, icon: Icon }) {
  const [open, setOpen] = useState(false)
  const filtered = options.filter(item => item.toLowerCase().includes(value.toLowerCase())).slice(0, 6)
  return <label className="field">
    <span>{label}</span>
    <div className="input-shell"><Icon size={18}/><input value={value} placeholder={placeholder} onFocus={() => setOpen(true)} onChange={e => { onChange(e.target.value); setOpen(true) }} /><ChevronDown size={17}/></div>
    {open && filtered.length > 0 && <div className="dropdown">
      {filtered.map(item => <button type="button" key={item} onMouseDown={() => { onChange(item); setOpen(false) }}><MapPin size={15}/>{item}</button>)}
    </div>}
  </label>
}

export default function App() {
  const [origin, setOrigin] = useState('Los Angeles, CA — LAX · Los Angeles International')
  const [destination, setDestination] = useState('Anchorage, AK — ANC · Ted Stevens Anchorage International')
  const [budget, setBudget] = useState(2200)
  const [checkIn, setCheckIn] = useState('2026-09-12')
  const [checkOut, setCheckOut] = useState('2026-09-15')
  const [travelers, setTravelers] = useState(2)
  const [selected, setSelected] = useState(['Hiking', 'Fjords & glaciers', 'Wildlife watching'])
  const [activitySearch, setActivitySearch] = useState('')
  const [showActivities, setShowActivities] = useState(false)
  const [flightTime, setFlightTime] = useState('Daytime')
  const [maxStops, setMaxStops] = useState('1 stop max')
  const [stayTypes, setStayTypes] = useState(['Hotel', 'Vacation rental'])
  const [locationPriority, setLocationPriority] = useState('Close to activities')
  const [transportModes, setTransportModes] = useState(['Rental car', 'Walking'])
  const [maxDrive, setMaxDrive] = useState(3)
  const [generated, setGenerated] = useState(true)
  const [plan, setPlan] = useState(null)
  const [view, setView] = useState('planner')
  const [mobileNav, setMobileNav] = useState(false)
  const resultsRef = useRef(null)
  const visibleActivities = useMemo(() => searchActivities(activitySearch), [activitySearch])
  const toggleActivity = activity => setSelected(current => current.includes(activity) ? current.filter(a => a !== activity) : [...current, activity])
  const toggleChoice = (value, setter) => setter(current => current.includes(value) ? current.filter(item => item !== value) : [...current, value])
  const showPlanner = () => { setView('planner'); window.location.hash = 'planner'; setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 20) }
  const submitTrip = event => {
    event.preventDefault()
    setGenerated(false)
    setTimeout(() => {
      setPlan(buildSamplePlan(destination, origin, selected, budget, { flightTime, maxStops, stayTypes, locationPriority, transportModes, maxDrive, checkIn, checkOut, travelers }))
      setGenerated(true)
      setView('results')
      window.location.hash = 'trip-results'
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 20)
    }, 900)
  }

  return <main>
    <nav>
      <a className="brand" href="#top" onClick={showPlanner}><span className="brand-mark"><Mountain size={20}/></span><span>RoamReady<small>working name</small></span></a>
      <div className={`nav-links ${mobileNav ? 'open' : ''}`}><a href="#planner" onClick={showPlanner}>Plan a trip</a>{view === 'planner' && <a href="#how">How it works</a>}{view === 'results' && <a href="#trip-results">Your trip</a>}</div>
      <button className="nav-cta">My trips</button>
      <button className="menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X/> : <Menu/>}</button>
    </nav>

    {view === 'planner' && <><section className="hero" id="top">
      <div className="hero-copy">
        <div className="eyebrow"><Sparkles size={15}/> One search. Your whole trip.</div>
        <h1>Tell us what you love.<br/><em>We’ll map the adventure.</em></h1>
        <p>Build a personalized USA getaway around your budget, interests and pace—without opening twenty different tabs.</p>
        <div className="hero-points"><span><Check/> Flexible picks</span><span><Check/> Real budget view</span><span><Check/> Day-by-day route</span></div>
      </div>
      <div className="route-art" aria-label="Illustrated route from California to Alaska">
        <div className="route-label start"><span>01</span>California<small>Your starting point</small></div>
        <div className="route-line"><Plane/></div>
        <div className="route-label finish"><span>02</span>Alaska<small>The wild north</small></div>
        <div className="art-card"><Mountain/><div><b>Kenai Fjords</b><small>Glaciers · Wildlife · Trails</small></div></div>
      </div>
    </section>

    <section className="planner-wrap" id="planner">
      <div className="section-heading"><div><span className="step">01</span><h2>Start with the basics</h2></div><p>Change anything—this sample is ready to explore.</p></div>
      <form className="planner" onSubmit={submitTrip}>
        <div className="grid two">
          <Autocomplete label="Leaving from" value={origin} onChange={setOrigin} options={airports} placeholder="City or airport" icon={Plane}/>
          <Autocomplete label="Going to" value={destination} onChange={setDestination} options={airports} placeholder="City or airport" icon={MapPin}/>
        </div>
        <div className="grid three">
          <label className="field"><span>Dates</span><div className="input-shell date-pair"><CalendarDays size={18}/><input aria-label="Check-in date" type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)}/><b>to</b><input aria-label="Check-out date" type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)}/></div></label>
          <label className="field"><span>Travelers</span><div className="input-shell"><span className="person">●</span><select value={travelers} onChange={e => setTravelers(Number(e.target.value))}><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option><option>6</option><option>7</option><option>8</option></select><span>people</span></div></label>
          <label className="field"><span>Stay style</span><div className="input-shell"><TentTree size={18}/><select defaultValue="Moderate"><option>Budget</option><option>Moderate</option><option>Comfort</option><option>Luxury</option></select></div></label>
        </div>

        <div className="interest-block">
          <div className="interest-title"><div><span className="step">02</span><h2>I want to…</h2></div><span>Choose as many as you like</span></div>
          <button type="button" className="activity-search" onClick={() => setShowActivities(!showActivities)}><Search size={18}/><span>{selected.length ? `${selected.length} activities selected` : 'Search hundreds of things to do'}</span><ChevronDown size={18}/></button>
          <div className="chips">{selected.map(a => <button type="button" key={a} onClick={() => toggleActivity(a)}>{a}<X size={14}/></button>)}</div>
          {showActivities && <div className="activity-panel"><div className="panel-search"><Search size={16}/><input autoFocus value={activitySearch} onChange={e => setActivitySearch(e.target.value)} placeholder="Try dancing, pottery, massage, hiking…"/></div><div className="activity-summary">{activitySearch ? `${visibleActivities.length} matching ideas` : `${activities.length} ideas across ${activityCategories.length} categories`}</div><div className="activity-grid">{visibleActivities.map(a => <button type="button" className={selected.includes(a) ? 'selected' : ''} onClick={() => toggleActivity(a)} key={a}>{selected.includes(a) && <Check size={14}/>} {a}</button>)}</div></div>}
        </div>

        <div className="preference-block">
          <div className="interest-title"><div><span className="step">03</span><h2>How do you like to travel?</h2></div><span>These help us choose—not just find—the best options</span></div>
          <div className="preference-grid">
            <div className="preference-group"><b>Flight timing</b><div className="choice-row">{['Daytime', 'Red-eye is okay', 'Early morning', 'Cheapest time'].map(item => <button type="button" className={flightTime === item ? 'active' : ''} onClick={() => setFlightTime(item)} key={item}>{item}</button>)}</div></div>
            <label className="preference-group"><b>Flight stops</b><select value={maxStops} onChange={e => setMaxStops(e.target.value)}><option>Nonstop only</option><option>1 stop max</option><option>Any number of stops</option></select></label>
            <div className="preference-group wide"><b>Where would you stay?</b><div className="choice-row">{['Hotel', 'Vacation rental', 'Hostel', 'Resort', 'Cabin', 'Camping / glamping', 'Anything under budget'].map(item => <button type="button" className={stayTypes.includes(item) ? 'active' : ''} onClick={() => toggleChoice(item, setStayTypes)} key={item}>{item}</button>)}</div></div>
            <label className="preference-group"><b>Location priority</b><select value={locationPriority} onChange={e => setLocationPriority(e.target.value)}><option>Close to activities</option><option>Walkable neighborhood</option><option>Near nightlife & food</option><option>Near public transit</option><option>Scenic & quiet</option><option>Cheapest reasonable option</option></select></label>
            <div className="preference-group wide"><b>Getting around</b><div className="choice-row">{['Rental car', 'Public transit', 'Rideshare', 'Walking', 'Biking', 'Avoid driving'].map(item => <button type="button" className={transportModes.includes(item) ? 'active' : ''} onClick={() => toggleChoice(item, setTransportModes)} key={item}>{item}</button>)}</div></div>
            <div className="preference-group drive-limit"><b>Maximum driving per day <span>{maxDrive} {maxDrive === 1 ? 'hour' : 'hours'}</span></b><input aria-label="Maximum driving time per day" type="range" min="1" max="6" value={maxDrive} onChange={e => setMaxDrive(Number(e.target.value))}/></div>
          </div>
        </div>

        <div className="budget-row">
          <div><span className="step">04</span><div><h2>Your total trip budget</h2><p>For flights, stay, transportation and activities</p></div></div>
          <output>${budget.toLocaleString()}</output>
          <input aria-label="Trip budget" type="range" min="800" max="5000" step="100" value={budget} onChange={e => setBudget(Number(e.target.value))}/>
          <div className="range-labels"><span>$800</span><span>$5,000+</span></div>
        </div>
        <button className="build-button" type="submit"><Sparkles size={19}/>{generated ? 'Build my trip' : 'Finding your best route…'}<ArrowRight size={19}/></button>
      </form>
    </section>

    <section className="how" id="how"><span className="eyebrow"><CircleDollarSign size={15}/> Built around real choices</span><h2>A tour-company level plan.<br/>Still completely yours.</h2><div className="how-grid"><article><b>01</b><h3>Share your trip style</h3><p>Choose your route, dates, budget, comfort level and anything you’d love to do.</p></article><article><b>02</b><h3>Get a complete match</h3><p>See flights, lodging, transportation and highly rated experiences in one plan.</p></article><article><b>03</b><h3>Make it your own</h3><p>Swap any suggestion, adjust your pace and watch the trip budget update.</p></article></div></section></>}

    {view === 'results' && plan && <div className="trip-page" id="trip-results">
      <div className="trip-toolbar"><button type="button" onClick={showPlanner}>← Edit trip details</button><span><Sparkles size={14}/> Your custom trip workspace</span></div>
    <section ref={resultsRef} className={`results ${generated ? 'visible' : ''}`}>
      <div className="results-head"><div><div className="eyebrow light"><Sparkles size={14}/> Newly built sample plan</div><h2>{plan.title}</h2><p>{origin.split('—')[0]} to {plan.place} · {checkIn} to {checkOut} · {travelers} travelers</p></div><div className="budget-card"><small>Estimated trip total</small><b>${plan.total.toLocaleString()}</b><span>${Math.max(budget - plan.total, 0).toLocaleString()} under your ${budget.toLocaleString()} limit</span></div></div>
      <div className="route-overview">
        <div className="route-map" aria-label="Prototype map of the suggested trip stops">
          <div className="map-note">Prototype route map · live geography coming next</div>
          <svg viewBox="0 0 700 330" role="img" aria-label="Suggested route connecting four itinerary stops"><path className="map-route-shadow" d="M95 246 C180 175 235 220 315 150 S470 90 610 75"/><path className="map-route" d="M95 246 C180 175 235 220 315 150 S470 90 610 75"/></svg>
          {plan.itinerary.map((item, index) => { const points = [{left:'12%',top:'69%'},{left:'38%',top:'53%'},{left:'61%',top:'28%'},{left:'84%',top:'16%'}]; return <div className="map-stop" style={points[index]} key={item.day}><span>{index + 1}</span><small>{item.title}</small></div> })}
          <div className="map-legend"><span><i className="car-dot"/> Suggested route</span><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(plan.place)}`} target="_blank" rel="noreferrer">Open destination in Google Maps ↗</a></div>
        </div>
        <div className="travel-summary"><span className="eyebrow light">Your travel style</span><h3>Built around your preferences</h3><dl><div><dt>Flight</dt><dd>{plan.preferences.flightTime} · {plan.preferences.maxStops}</dd></div><div><dt>Stay</dt><dd>{plan.preferences.stayTypes.join(' or ') || 'Any stay type'}<small>{plan.preferences.locationPriority}</small></dd></div><div><dt>Transportation</dt><dd>{plan.preferences.transportModes.join(' + ') || 'Best available option'}<small>Up to {plan.preferences.maxDrive} hours driving per day</small></dd></div></dl></div>
      </div>
      <div className="leg-strip">{['Airport → stay', 'Stay → local highlights', 'Highlights → main excursion'].map((leg, i) => <div key={leg}><span>{i + 1}</span><b>{leg}</b><small>{i === 0 ? '20 min transit · 11 min drive' : i === 1 ? '0.8 mi · 17 min walk' : '42 mi · 55 min drive'}</small></div>)}</div>
      <div className="results-grid">
        <div className="timeline"><h3>Your day-by-day route</h3>{plan.itinerary.map((item, i) => { const Icon = item.icon; return <article key={item.day}><div className="day-dot">{i+1}</div><div className="day-copy"><small>{item.day}</small><h4>{item.title}</h4><p>{item.detail}</p><span>{item.tag}</span></div><Icon className="day-icon"/></article>})}</div>
        <aside><h3>Best-fit estimates</h3>{plan.picks.map(p => { const Icon=p.icon; return <div className="pick" key={p.type}><div className="pick-icon"><Icon/></div><div><small>{p.type}</small><b>{p.name}</b><span>{p.meta}</span><em><Star size={12} fill="currentColor"/> {p.note}</em><div className="pick-links">{p.links.map(link => <a className="pick-link" href={link.url} target="_blank" rel="noreferrer" key={link.label}>{link.label} <ArrowRight size={11}/></a>)}</div></div><strong>{p.price}</strong></div>})}<p className="disclaimer"><b>Prices shown here are still planning estimates.</b> External links open current searches with your trip details. Licensed APIs will bring live prices into these cards later.</p></aside>
      </div>
    </section></div>}
    <footer><div className="brand"><span className="brand-mark"><Mountain size={19}/></span><span>RoamReady<small>temporary project name</small></span></div><p>Independent USA travel-planning prototype.</p><span>Made for the road ahead.</span></footer>
  </main>
}
