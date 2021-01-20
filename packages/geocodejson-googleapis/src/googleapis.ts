/// <reference types="@p-j/geocodejson-types/google.maps" />

import * as geohash from 'ngeohash'
import { GeocodeType, GeocodeResponse, GeocodeResult } from '@p-j/geocodejson-types'
import { featureCollection, point } from '@turf/helpers'
import fetch from 'cross-fetch'
import { BBox, Position } from 'geojson'

export interface GeocoderResponse extends google.maps.GeocoderResponse {
  query?: string
}

export async function geocode(
  { apiKey, address, language = 'en' }: { apiKey: string; address: string; language: string },
  {
    bounds,
    componentRestrictions = {},
    region,
  }: Pick<google.maps.GeocoderRequest, 'bounds' | 'componentRestrictions' | 'region'> = {},
): Promise<GeocoderResponse> {
  const boundsArg =
    bounds &&
    [[bounds.northeast.lat, bounds.northeast.lng].join(), [bounds.southwest.lat, bounds.southwest.lng].join()].join('|')

  const components = Object.entries(componentRestrictions)
    .map(([key, value]) => [`${key}:${value}`])
    .join('|')

  const searchParams = new URLSearchParams(
    Object.assign(
      {
        address,
        key: apiKey,
      },
      language,
      bounds && { bounds: boundsArg },
      region && { region },
      components && { components },
    ),
  )

  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`, { method: 'GET' })
  const json = await response.json()
  return Object.assign(json, { query: address })
}

/**
 * Convert Google results into GeoJSON
 */
export function parse(response: GeocoderResponse, { short = false }: { short?: boolean } = {}): GeocodeResponse {
  const { results, query } = response
  const geocodeResults = results.map((result) => parseResult(result, { short }))

  return Object.assign(
    {
      geocoding: {
        version: '0.1.0',
        licence: null,
        attribution: 'Google Geocoding API',
        query: query || null,
      },
    },
    featureCollection(geocodeResults),
  )
}

/**
 * Turn a Google Geocode result into a GeocodeJSON result
 */
function parseResult(result: google.maps.GeocoderResult, { short = false }: { short?: boolean } = {}): GeocodeResult {
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
  } = parseAddressComponents(result.address_components, { short })

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
function parseAddressComponents(
  components: google.maps.GeocoderAddressComponent[],
  { short = false }: { short?: boolean } = {},
) {
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
function parseBBox(result: google.maps.GeocoderResult): BBox {
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
function parseType(result: google.maps.GeocoderResult): GeocodeType | string {
  const types = result.types.map((type) => {
    switch (type as google.maps.AddressTypes | google.maps.AddressComponentTypes) {
      case 'premise':
      case 'street_number':
      case 'street_address':
        return 'house'

      case 'route':
      case 'intersection':
        return 'street'

      case 'neighborhood':
      case 'colloquial_area':
      case 'sublocality':
        return 'locality'

      case 'locality':
        return 'city'

      case 'administrative_area_level_1':
      case 'administrative_area_level_2':
        return 'region'

      case 'country':
        return 'country'

      default:
        return type
    }
  })

  // By order of priority
  if (types.some((type) => type === 'house')) return 'house'
  if (types.some((type) => type === 'street')) return 'street'
  if (types.some((type) => type === 'locality')) return 'locality'
  if (types.some((type) => type === 'city')) return 'city'
  if (types.some((type) => type === 'region')) return 'region'
  if (types.some((type) => type === 'country')) return 'country'
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
