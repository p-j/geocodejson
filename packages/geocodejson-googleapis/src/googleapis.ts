import * as geohash from 'ngeohash'
import { GeocodeType, GeocodeResponse, GeocodeResult } from '@p-j/geocodejson-types'
import { featureCollection, point } from '@turf/helpers'
import { BBox2d, Position } from '@turf/helpers/dist/js/lib/geojson'
import fetch from 'cross-fetch'

// TODO: make a proper global
declare const GOOGLE_API_KEY: string
const DEFAULT_OPTIONS = {
  language: 'en',
  sensor: false,
  short: false,
}

export async function geocode(
  address: string,
  // TODO: handle options
  googleGeocodeOptions?: google.maps.GeocoderRequest,
): Promise<{ results: google.maps.GeocoderResult; status: google.maps.GeocoderStatus }> {
  const searchParams = new URLSearchParams({ address, key: GOOGLE_API_KEY })
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`, { method: 'GET' })
  const json = await response.json()
  return json
}

/**
 * Convert Google results into GeoJSON
 */
export function parse(results: google.maps.GeocoderResult[], options = DEFAULT_OPTIONS): GeocodeResponse {
  const short = options.short || DEFAULT_OPTIONS.short
  const geocodeResults = results.map((result) => parseResult(result, { short }))

  return Object.assign(
    {
      geocoding: {
        version: '0.1.0',
        licence: null,
        attribution: 'Google Geocoding API',
        query: null,
      },
    },
    featureCollection(geocodeResults),
  )
}

/**
 * Turn a Google Geocode result into a GeocodeJSON result
 */
function parseResult(result: google.maps.GeocoderResult, { short }: { short: boolean }): GeocodeResult {
  // Google <-> GeocodeJSON Mapping
  const {
    street_number: housenumber,
    route: street,
    neighborhood: locality,
    postal_code: postcode,
    locality: city,
    administrative_area_level_3: district,
    administrative_area_level_2: county,
    administrative_area_level_1: state,
    country,
  } = parseAddressComponents(result.address_components, short)

  const [lng, lat] = parsePointCoordinates(result)
  const properties = {
    geocoding: {
      accuracy: parseAccuracy(result),
      type: parseType(result),
      label: result.formatted_address,
      geohash: geohash.encode(lat, lng),
      housenumber,
      street,
      locality,
      postcode,
      city,
      district,
      county,
      state,
      country,
    },
  }

  return point([lng, lat], properties, { bbox: parseBBox(result) })
}

/**
 * Parses Address Component into a single layer Object
 */
function parseAddressComponents(components: google.maps.GeocoderAddressComponent[], short = DEFAULT_OPTIONS.short) {
  const results: Record<string, string> = {}
  components.map((component) => {
    if (short) {
      results[component.types[0]] = component.short_name
    } else {
      results[component.types[0]] = component.long_name
    }
  })
  return results
}

/**
 * Extract a BBox from a GeocoderResult
 */
function parseBBox(result: google.maps.GeocoderResult): BBox2d {
  return [
    result.geometry.viewport.southwest.lng,
    result.geometry.viewport.southwest.lat,
    result.geometry.viewport.northeast.lng,
    result.geometry.viewport.northeast.lat,
  ]
}

/**
 * Extract a GeoJSON Point from a GeocoderResult
 */
function parsePointCoordinates(result: google.maps.GeocoderResult): Position {
  return [result.geometry.location.lng, result.geometry.location.lat]
}

/**
 * Extract GeocodeJSON type from a GeocoderResult
 */
function parseType(result: google.maps.GeocoderResult) {
  const types = result.types.map((type) => {
    switch (type as google.maps.AddressTypes | google.maps.AddressComponentTypes) {
      case 'street_number':
      case 'street_address':
        return GeocodeType.house

      case 'route':
      case 'intersection':
        return GeocodeType.street

      case 'neighborhood':
      case 'colloquial_area':
      case 'sublocality':
        return GeocodeType.locality

      case 'locality':
        return GeocodeType.city

      case 'administrative_area_level_1':
      case 'administrative_area_level_2':
        return GeocodeType.region

      case 'country':
        return GeocodeType.country

      default:
        return type
    }
  })

  // By order of priority
  if (types.some((type) => type === GeocodeType.house)) return GeocodeType.house
  if (types.some((type) => type === GeocodeType.street)) return GeocodeType.street
  if (types.some((type) => type === GeocodeType.locality)) return GeocodeType.locality
  if (types.some((type) => type === GeocodeType.city)) return GeocodeType.city
  if (types.some((type) => type === GeocodeType.region)) return GeocodeType.region
  if (types.some((type) => type === GeocodeType.country)) return GeocodeType.country
  return types[0] || 'unknown'
}

/**
 * TODO: do some data analysis... Or get rid of it altogether...
 */
function parseAccuracy(result: google.maps.GeocoderResult): number | undefined {
  switch (result.geometry.location_type as google.maps.GeocoderLocationType) {
    case 'ROOFTOP':
      return 10
    case 'RANGE_INTERPOLATED':
      return 50
    case 'GEOMETRIC_CENTER':
      return 100
    case 'APPROXIMATE':
      return 1000
    default:
      return
  }
}
