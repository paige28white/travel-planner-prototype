import { useMemo, useState } from 'react'
import { ArrowRight, CalendarDays, Car, Check, ChevronDown, CircleDollarSign, MapPin, Menu, Mountain, Plane, Search, Sparkles, Star, TentTree, X } from 'lucide-react'

const airports = [
  'Los Angeles, CA — LAX', 'San Francisco, CA — SFO', 'San Diego, CA — SAN',
  'Sacramento, CA — SMF', 'San Jose, CA — SJC', 'Honolulu, HI — HNL',
  'Anchorage, AK — ANC', 'Seattle, WA — SEA', 'Denver, CO — DEN',
  'New York, NY — JFK', 'Portland, OR — PDX', 'Las Vegas, NV — LAS',
]

const activities = [
  'Hiking', 'Scenic drives', 'Wildlife watching', 'National parks', 'Kayaking',
  'Fjords & glaciers', 'Scuba diving', 'Snorkeling', 'Skiing', 'Snowboarding',
  'Surfing', 'Camping', 'Hot springs', 'Museums', 'Food tours', 'Live music',
  'Beaches', 'Fishing', 'Whale watching', 'Photography', 'Stargazing', 'Biking',
]

const itinerary = [
  { day: 'Day 1', title: 'Arrive & settle into Anchorage', detail: 'Pick up your rental car, check in, then walk the Tony Knowles Coastal Trail before dinner downtown.', tag: 'Easy arrival', icon: Plane },
  { day: 'Day 2', title: 'Turnagain Arm road trip', detail: 'Drive one of Alaska’s most scenic highways, stop at Beluga Point and hike the lower Winner Creek trail.', tag: 'Hike + drive', icon: Car },
  { day: 'Day 3', title: 'Kenai Fjords adventure', detail: 'Full-day cruise from Seward for glaciers, sea lions, puffins and possible whale sightings.', tag: 'Top pick', icon: Mountain },
  { day: 'Day 4', title: 'Exit Glacier & return', detail: 'Morning hike near Exit Glacier, coffee in Seward, then a relaxed drive back toward Anchorage.', tag: 'Flexible', icon: TentTree },
]

const picks = [
  { type: 'Flight', name: 'LAX → ANC', meta: '1 stop · 7h 40m', price: '$428', note: 'Best overall value', icon: Plane },
  { type: 'Stay', name: 'The Lakefront Anchorage', meta: '3 nights · 4.2 ★', price: '$546', note: 'Comfort + location', icon: MapPin },
  { type: 'Car', name: 'Compact SUV', meta: 'Airport pickup · 4 days', price: '$284', note: 'Best for the route', icon: Car },
  { type: 'Experience', name: 'Kenai Fjords Cruise', meta: '8.5 hours · 4.8 ★', price: '$259', note: 'Traveler favorite', icon: Mountain },
]

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
  const [origin, setOrigin] = useState('Los Angeles, CA — LAX')
  const [destination, setDestination] = useState('Anchorage, AK — ANC')
  const [budget, setBudget] = useState(2200)
  const [selected, setSelected] = useState(['Hiking', 'Fjords & glaciers', 'Wildlife watching'])
  const [activitySearch, setActivitySearch] = useState('')
  const [showActivities, setShowActivities] = useState(false)
  const [generated, setGenerated] = useState(true)
  const [mobileNav, setMobileNav] = useState(false)
  const visibleActivities = useMemo(() => activities.filter(a => a.toLowerCase().includes(activitySearch.toLowerCase())), [activitySearch])
  const toggleActivity = activity => setSelected(current => current.includes(activity) ? current.filter(a => a !== activity) : [...current, activity])

  return <main>
    <nav>
      <a className="brand" href="#top"><span className="brand-mark"><Mountain size={20}/></span><span>RoamReady<small>working name</small></span></a>
      <div className={`nav-links ${mobileNav ? 'open' : ''}`}><a href="#planner">Plan a trip</a><a href="#results">Sample itinerary</a><a href="#how">How it works</a></div>
      <button className="nav-cta">My trips</button>
      <button className="menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X/> : <Menu/>}</button>
    </nav>

    <section className="hero" id="top">
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
      <form className="planner" onSubmit={e => { e.preventDefault(); setGenerated(false); setTimeout(() => setGenerated(true), 650) }}>
        <div className="grid two">
          <Autocomplete label="Leaving from" value={origin} onChange={setOrigin} options={airports} placeholder="City or airport" icon={Plane}/>
          <Autocomplete label="Going to" value={destination} onChange={setDestination} options={airports} placeholder="City or airport" icon={MapPin}/>
        </div>
        <div className="grid three">
          <label className="field"><span>Dates</span><div className="input-shell"><CalendarDays size={18}/><input defaultValue="Sep 12 – Sep 15, 2026"/></div></label>
          <label className="field"><span>Travelers</span><div className="input-shell"><span className="person">●</span><select defaultValue="2"><option>1</option><option>2</option><option>3</option><option>4</option></select><span>people</span></div></label>
          <label className="field"><span>Stay style</span><div className="input-shell"><TentTree size={18}/><select defaultValue="Moderate"><option>Budget</option><option>Moderate</option><option>Comfort</option><option>Luxury</option></select></div></label>
        </div>

        <div className="interest-block">
          <div className="interest-title"><div><span className="step">02</span><h2>I want to…</h2></div><span>Choose as many as you like</span></div>
          <button type="button" className="activity-search" onClick={() => setShowActivities(!showActivities)}><Search size={18}/><span>{selected.length ? `${selected.length} activities selected` : 'Search hundreds of things to do'}</span><ChevronDown size={18}/></button>
          <div className="chips">{selected.map(a => <button type="button" key={a} onClick={() => toggleActivity(a)}>{a}<X size={14}/></button>)}</div>
          {showActivities && <div className="activity-panel"><div className="panel-search"><Search size={16}/><input autoFocus value={activitySearch} onChange={e => setActivitySearch(e.target.value)} placeholder="Try hiking, food tours, skiing…"/></div><div className="activity-grid">{visibleActivities.map(a => <button type="button" className={selected.includes(a) ? 'selected' : ''} onClick={() => toggleActivity(a)} key={a}>{selected.includes(a) && <Check size={14}/>} {a}</button>)}</div></div>}
        </div>

        <div className="budget-row">
          <div><span className="step">03</span><div><h2>Your total trip budget</h2><p>For flights, stay, car and activities</p></div></div>
          <output>${budget.toLocaleString()}</output>
          <input aria-label="Trip budget" type="range" min="800" max="5000" step="100" value={budget} onChange={e => setBudget(Number(e.target.value))}/>
          <div className="range-labels"><span>$800</span><span>$5,000+</span></div>
        </div>
        <button className="build-button" type="submit"><Sparkles size={19}/>{generated ? 'Build my trip' : 'Finding your best route…'}<ArrowRight size={19}/></button>
      </form>
    </section>

    <section className={`results ${generated ? 'visible' : ''}`} id="results">
      <div className="results-head"><div><div className="eyebrow light"><Sparkles size={14}/> Your sample plan</div><h2>Four wild days in Alaska</h2><p>{origin.split('—')[0]} to {destination.split('—')[0]} · September · 2 travelers</p></div><div className="budget-card"><small>Estimated total</small><b>$1,947</b><span>${Math.max(budget - 1947, 0).toLocaleString()} under budget</span></div></div>
      <div className="results-grid">
        <div className="timeline"><h3>Your day-by-day route</h3>{itinerary.map((item, i) => { const Icon = item.icon; return <article key={item.day}><div className="day-dot">{i+1}</div><div className="day-copy"><small>{item.day}</small><h4>{item.title}</h4><p>{item.detail}</p><span>{item.tag}</span></div><Icon className="day-icon"/></article>})}</div>
        <aside><h3>Best-fit bookings</h3>{picks.map(p => { const Icon=p.icon; return <div className="pick" key={p.type}><div className="pick-icon"><Icon/></div><div><small>{p.type}</small><b>{p.name}</b><span>{p.meta}</span><em><Star size={12} fill="currentColor"/> {p.note}</em></div><strong>{p.price}</strong></div>})}<button>Compare all options <ArrowRight size={16}/></button><p className="disclaimer">Prototype estimates only. Live prices will be added through travel data partners.</p></aside>
      </div>
    </section>

    <section className="how" id="how"><span className="eyebrow"><CircleDollarSign size={15}/> Built around real choices</span><h2>A tour-company level plan.<br/>Still completely yours.</h2><div className="how-grid"><article><b>01</b><h3>Share your trip style</h3><p>Choose your route, dates, budget, comfort level and anything you’d love to do.</p></article><article><b>02</b><h3>Get a complete match</h3><p>See flights, lodging, transportation and highly rated experiences in one plan.</p></article><article><b>03</b><h3>Make it your own</h3><p>Swap any suggestion, adjust your pace and watch the trip budget update.</p></article></div></section>
    <footer><div className="brand"><span className="brand-mark"><Mountain size={19}/></span><span>RoamReady<small>temporary project name</small></span></div><p>Independent USA travel-planning prototype.</p><span>Made for the road ahead.</span></footer>
  </main>
}
