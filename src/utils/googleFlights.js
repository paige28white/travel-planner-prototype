// Google Flights stores shareable search state in a compact protobuf-style
// `tfs` value. This encoder creates a normal Google Flights results URL; it
// does not fetch, scrape, or reproduce Google's pricing data.
const textEncoder = new TextEncoder()

function varint(value) {
  if (value === -1) return [255,255,255,255,255,255,255,255,255,1]
  const bytes = []
  let number = value >>> 0
  while (number > 127) { bytes.push((number & 127) | 128); number >>>= 7 }
  bytes.push(number)
  return bytes
}

const fieldVarint = (number, value) => [...varint(number << 3), ...varint(value)]
const fieldBytes = (number, bytes) => [...varint((number << 3) | 2), ...varint(bytes.length), ...bytes]
const fieldString = (number, value) => fieldBytes(number, [...textEncoder.encode(value)])

function location(code) {
  return [...fieldVarint(1, 1), ...fieldString(2, code)]
}

function flight({ date, origin, destination, maxStops, time }) {
  const bytes = [...fieldString(2, date)]
  if (maxStops !== undefined) bytes.push(...fieldVarint(5, maxStops))
  if (time?.start !== undefined) bytes.push(...fieldVarint(8, time.start))
  if (time?.end !== undefined) bytes.push(...fieldVarint(9, time.end))
  bytes.push(...fieldBytes(13, location(origin)), ...fieldBytes(14, location(destination)))
  return bytes
}

function urlSafeBase64(bytes) {
  let binary = ''
  for (const byte of bytes) binary += String.fromCharCode(byte)
  return btoa(binary).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

export function createGoogleFlightsUrl({ origin, destination, departureDate, returnDate, travelers = 1, flightTime, maxStops }) {
  const stopLimit = maxStops === 'Nonstop only' ? 0 : maxStops === '1 stop max' ? 1 : undefined
  const time = flightTime === 'Daytime' ? { start: 8, end: 20 } : flightTime === 'Early morning' ? { start: 5, end: 10 } : undefined
  const outbound = flight({ date: departureDate, origin, destination, maxStops: stopLimit, time })
  const inbound = flight({ date: returnDate, origin: destination, destination: origin, maxStops: stopLimit, time })
  const bytes = [
    ...fieldVarint(1, 28), ...fieldVarint(2, 2),
    ...fieldBytes(3, outbound), ...fieldBytes(3, inbound),
  ]
  for (let i = 0; i < travelers; i++) bytes.push(...fieldVarint(8, 1))
  bytes.push(
    ...fieldVarint(9, 1), ...fieldVarint(14, 1),
    ...fieldBytes(16, fieldVarint(1, -1)), ...fieldVarint(19, 1)
  )
  return `https://www.google.com/travel/flights/search?tfs=${urlSafeBase64(bytes)}&curr=USD&gl=US&hl=en`
}
