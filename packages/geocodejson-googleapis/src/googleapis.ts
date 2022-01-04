import * as geohash from 'ngeohash'
import { GeocodeType, GeocodeResponse, GeocodeResult, GeocodeOptions } from '@p-j/geocodejson-types'
import { featureCollection, point } from '@turf/helpers'
import fetch from 'cross-fetch'
import { BBox, Position } from 'geojson'
import type {
  GeocodeRequest as GoogleGeocodeRequest,
  GeocodeResponseData as GoogleGeocodeResponseData,
  GeocodeResult as GoogleGeocodeResult,
  AddressComponent as GoogleAddressComponent,
  ApiKeyParams,
} from '@googlemaps/google-maps-services-js'
import {
  defaultUrl as _googleBaseUrl,
  defaultParamsSerializer as googleParamsSerializer,
} from '@googlemaps/google-maps-services-js/dist/geocode/geocode'

export type GoogleGeocodeRequestParams = Omit<GoogleGeocodeRequest['params'], 'client_id' | 'client_secret'> &
  ApiKeyParams
export type GoogleGeocodeResponse = GoogleGeocodeResponseData & { query?: string }
export type ParseOptions = { short?: boolean; excludePartialMatch?: boolean }

export type GeocodeParams = ({ apiKey: string; key?: string } | { apiKey?: string; key: string }) &
  Omit<GeocodeOptions, 'apiKey'> &
  Omit<GoogleGeocodeRequestParams, 'key'>

export const googleBaseUrl = _googleBaseUrl

/**
 * Geocode an address using Google API and the provided options including optional filter used to bias the search.
 *
 * __Common parameter to all geocoder__
 * @param options.apiKey Google API key (takes precedence over `key`)
 * @param options.language Language in which results should preferably be provided (IETF format: es, pt-BR etc...)
 * @param options.address The street address to geocode (avoiding business names, building names etc...)
 *
 * __Parameters specific to googleapis__
 * @param options.place_id The place_id that you want to geocode. You can retrieve this information from Places API for example. This replaces `address`
 * @param options.bounds Bounds within which to search
 * @param options.region Country code used to bias the search, specified as a Unicode region subtag / CLDR identifier.
 * @param options.components Components are used to restrict results to a specific area. A filter consists of one or more of: route, locality, administrativeArea, postalCode, country. Only the results that match all the filters will be returned. Filter values support the same methods of spelling correction and partial matching as other geocoding requests @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.componentRestrictions
 * @param options.key Google API key (superseded by apiKey if provided)
 *
 * __For more details on Google's options__
 * @see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
 * @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest
 */
export async function geocode({
  apiKey,
  address,
  language = 'en',
  ...providerParams
}: GeocodeParams): Promise<GoogleGeocodeResponse> {
  const key = apiKey || providerParams.key
  if (!key) throw new Error('The Google API Key must be provided either as "apiKey" or "key".') // the type definition prevent this case but the type inference doesn't
  const { url, options } = getFetchArgs({ ...providerParams, address, language, key })
  const response = await fetch(url, options)
  const json = await response.json()
  return Object.assign(json, { query: address })
}

/**
 * Generate fetch argument to successfully geocode the address using the provided options
 * @param options.language Language in which results should preferably be provided @see https://developers.google.com/maps/faq#languagesupport
 * @param options.address The street address to geocode (avoiding business names, building names etc...)
 * @param options.place_id The place_id that you want to geocode. You can retrieve this information from Places API for example. This replaces `address`
 * @param options.bounds Bounds within which to search.
 * @param options.components Components are used to restrict results to a specific area. A filter consists of one or more of: route, locality, administrativeArea, postalCode, country. Only the results that match all the filters will be returned. Filter values support the same methods of spelling correction and partial matching as other geocoding requests @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.componentRestrictions
 * @param options.region Country code used to bias the search, specified as a Unicode region subtag / CLDR identifier.
 * @param options.key Google API key
 * @see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingRequests
 * @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest
 */
export function getFetchArgs(params: GoogleGeocodeRequestParams) {
  const searchParams = new URLSearchParams(googleParamsSerializer(params))
  searchParams.sort()
  return { url: `${googleBaseUrl}?${searchParams}`, options: { method: 'GET' } }
}

/**
 * Convert Google results into GeoJSON
 * @see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingResponses
 */
export function parse(
  response: GoogleGeocodeResponse,
  { short = false, excludePartialMatch = false }: ParseOptions = {},
): GeocodeResponse {
  const { results, query } = response
  const geocodeResults = results
    .filter((result) => !result.partial_match || !excludePartialMatch)
    .map((result) => parseResult(result, { short }))

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
 * @see https://developers.google.com/maps/documentation/geocoding/overview#GeocodingResponses
 */
function parseResult(result: GoogleGeocodeResult, { short = false }: { short?: boolean } = {}): GeocodeResult {
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
function parseAddressComponents(components: GoogleAddressComponent[], { short = false }: { short?: boolean } = {}) {
  return components.reduce((acc, component) => {
    acc[component.types[0]] = short ? component.short_name : component.long_name
    return acc
  }, {} as Record<string, string>)
}

/**
 * Extract a BBox from a GeocoderResult
 */
function parseBBox(result: GoogleGeocodeResult): BBox {
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
function parsePointCoordinates(result: GoogleGeocodeResult): Position {
  return [result.geometry.location.lng, result.geometry.location.lat]
}

/**
 * Extract GeocodeJSON type from a GeocoderResult
 */
function parseType(result: GoogleGeocodeResult): GeocodeType | string {
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
function parseAccuracy(result: GoogleGeocodeResult): number | undefined {
  // @see https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.partial_match
  if (result.partial_match) return 1000
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
