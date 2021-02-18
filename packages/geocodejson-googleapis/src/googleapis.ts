/// <reference types="@p-j/geocodejson-types/google.maps" />

import * as geohash from 'ngeohash'
import { GeocodeType, GeocodeResponse, GeocodeResult } from '@p-j/geocodejson-types'
import { featureCollection, point } from '@turf/helpers'
import fetch from 'cross-fetch'
import { BBox, Position } from 'geojson'

export interface GoogleAPIResponse extends google.maps.GeocoderResponse {
  query?: string
}

/**
 * Geocode an address using Google API and the provided options including optional filter used to bias the search.
 * @param options.apiKey Google API key
 * @param options.language Language in which results should preferably be provided
 * @param options.address The address to geocode
 * @param filters Optional filters used to bias the search
 * @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest
 */
export async function geocode(
  { apiKey, address, language = 'en' }: { apiKey: string; address: string; language?: string },
  filters: Pick<google.maps.GeocoderRequest, 'bounds' | 'componentRestrictions' | 'region'> = {},
): Promise<GoogleAPIResponse> {
  const { url, options } = getFetchArgs({ apiKey, address, language, ...filters })
  const response = await fetch(url, options)
  const json = await response.json()
  return Object.assign(json, { query: address })
}

/**
 * Generate fetch argument to successfully geocode the address using the provided options
 * @param options.apiKey Google API Key
 * @param options.language Language in which results should preferably be provided
 * @param options.address Address to geocode
 * @param options.bounds Bounds within which to search.
 * @param options.componentRestrictions Components are used to restrict results to a specific area. A filter consists of one or more of: route, locality, administrativeArea, postalCode, country. Only the results that match all the filters will be returned. Filter values support the same methods of spelling correction and partial matching as other geocoding requests @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.componentRestrictions
 * @param options.region Country code used to bias the search, specified as a Unicode region subtag / CLDR identifier.
 * @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest
 */
export function getFetchArgs({
  apiKey,
  address,
  language = 'en',
  bounds,
  componentRestrictions = {},
  region,
}: Pick<google.maps.GeocoderRequest, 'bounds' | 'componentRestrictions' | 'region'> & {
  apiKey: string
  address: string
  language?: string
}) {
  const boundsArg =
    bounds &&
    [[bounds.northeast.lat, bounds.northeast.lng].join(), [bounds.southwest.lat, bounds.southwest.lng].join()].join('|')

  const components = Object.entries(componentRestrictions)
    .map(([key, value]) => [`${key}:${value}`])
    .join('|')

  const searchParams = new URLSearchParams(
    Object.assign(
      { language, address, key: apiKey },
      boundsArg && { bounds: boundsArg },
      region && { region },
      components && { components },
    ),
  )
  searchParams.sort()

  return { url: `https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`, options: { method: 'GET' } }
}

/**
 * Convert Google results into GeoJSON
 */
export function parse(response: GoogleAPIResponse, { short = false }: { short?: boolean } = {}): GeocodeResponse {
  const { results, query } = response
  const geocodeResults = results.map((result) => parseResult(result, { short }))

  return Object.assign(
    {
      geocoding: {
        version: '0.1.0',
        licence: 'https://cloud.google.com/maps-platform/terms/#3.-license.',
        attribution: 'Powered by Google',
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
  return components.reduce((acc, component) => {
    acc[component.types[0]] = short ? component.short_name : component.long_name
    return acc
  }, {} as Record<string, string>)
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
    switch (type) {
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
  switch (result.geometry.location_type) {
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
