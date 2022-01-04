import type { GeocodeOptions, GeocodeResult, GeocodeResponse } from '@p-j/geocodejson-types'
import type {
  OpenCageGeocodeRequestParams,
  OpenCageGeoJSONResponse,
  OpenCageGeoJSONFeatureProperties,
} from './opencage.types'
import { Feature, Point } from 'geojson'
import fetch from 'cross-fetch'
import * as geohash from 'ngeohash'
import { featureCollection } from '@turf/helpers'

export const opencageBaseUrl = 'https://api.opencagedata.com/geocode/v1/geojson'

/**
 * Geocode an address using OpenCage Forward Geocoding GeoJSON API
 *
 * __Common parameter to all geocoder__
 * @param options.apiKey Google API key (takes precedence over `key`)
 * @param options.language Language in which results should preferably be provided (IETF format: es, pt-BR etc...)
 * @param options.address The street address to geocode (avoiding business names, building names etc...)
 *
 * __Parameters specific to OpenCage__
 * @param options.q the query string to be geocoded: a latitude, longitude or a placename/address. This is superseded by options.address.
 * @param options.abbrv When set to 1 we attempt to abbreviate and shorten the formatted string we return. Learn more about formatted placenames.
 * @param options.add_request When set to 1 the various request parameters are added to the response for ease of debugging.
 * @param options.bounds Used only for forward geocoding. This value will restrict the possible results to a defined bounding box.
 *                       The value of the bounds parameter should be specified as two coordinate points forming the south-west and north-east corners of a bounding box (min lon, min lat, max lon, max lat).
 * @param options.countrycode ISO 3166-1 Alpha 2 Used only for forward geocoding. Restricts results to the specified country/territory or countries. You can specify multiple country codes by supplying a comma separated list.
 * @param options.jsonp Wraps the returned JSON with a function name.
 * @param options.limit The maximum number of results we should return. Default is 10. Maximum allowable value is 100.
 * @param options.min_confidence An integer from 1-10. Only results with at least this confidence will be returned. Learn more about our confidence score on API documentation.
 * @param options.no_annotations When set to 1 results will not contain annotations.
 * @param options.no_dedupe When set to 1 results will not be deduplicated.
 * @param options.no_record When set to 1 the query contents are not logged. Please use this parameter if you have concerns about privacy and want us to have no record of your query.
 * @param options.pretty When set to 1 results are 'pretty' printed for easier reading. Useful for debugging.
 * @param options.proximity Used only for forward geocoding. Provides the geocoder with a hint to bias results in favour of those closer to the specified location. Please note though, this is just one of many factors in the internal scoring we use for ranking results.
 *                          The value is a point with latitude, longitude coordinates in decimal format.
 * @param options.roadinfo When set to 1 the behaviour of the geocoder is changed to attempt to match the nearest road (as opposed to address). If possible we also fill additional information in the roadinfo annotation. Please see details API Documentation.
 * @see https://opencagedata.com/api#forward
 */
export async function geocode(params: GeocodeOptions & OpenCageGeocodeRequestParams): Promise<OpenCageGeoJSONResponse> {
  const { url, options } = getFetchArgs({ q: params.address, ...params })
  const response = await fetch(url, options)
  const json = await response.json()
  return Object.assign(json, { query: params.address ?? params.q })
}

/**
 * Generate fetch argument to successfully geocode the address using the provided options
 * @param options.q the query string to be geocoded: a latitude, longitude or a placename/address. This is superseded by options.address.
 * @param options.abbrv When set to 1 we attempt to abbreviate and shorten the formatted string we return. Learn more about formatted placenames.
 * @param options.add_request When set to 1 the various request parameters are added to the response for ease of debugging.
 * @param options.bounds Used only for forward geocoding. This value will restrict the possible results to a defined bounding box.
 *                       The value of the bounds parameter should be specified as two coordinate points forming the south-west and north-east corners of a bounding box (min lon, min lat, max lon, max lat).
 * @param options.countrycode ISO 3166-1 Alpha 2 Used only for forward geocoding. Restricts results to the specified country/territory or countries. You can specify multiple country codes by supplying a comma separated list.
 * @param options.jsonp Wraps the returned JSON with a function name.
 * @param options.language An IETF format language code (such as es for Spanish or pt-BR for Brazilian Portuguese), or native in which case OpenCage will attempt to return the response in the local language(s).
 * @param options.limit The maximum number of results we should return. Default is 10. Maximum allowable value is 100.
 * @param options.min_confidence An integer from 1-10. Only results with at least this confidence will be returned. Learn more about our confidence score on API documentation.
 * @param options.no_annotations When set to 1 results will not contain annotations.
 * @param options.no_dedupe When set to 1 results will not be deduplicated.
 * @param options.no_record When set to 1 the query contents are not logged. Please use this parameter if you have concerns about privacy and want us to have no record of your query.
 * @param options.pretty When set to 1 results are 'pretty' printed for easier reading. Useful for debugging.
 * @param options.proximity Used only for forward geocoding. Provides the geocoder with a hint to bias results in favour of those closer to the specified location. Please note though, this is just one of many factors in the internal scoring we use for ranking results.
 *                          The value is a point with latitude, longitude coordinates in decimal format.
 * @param options.roadinfo When set to 1 the behaviour of the geocoder is changed to attempt to match the nearest road (as opposed to address). If possible we also fill additional information in the roadinfo annotation. Please see details API Documentation.
 * @see https://opencagedata.com/api#forward
 */
export function getFetchArgs(params: OpenCageGeocodeRequestParams) {
  // Con
  if (params.bounds && typeof params.bounds !== 'string') {
    // const minlon = Math.min(params.bounds[0]['coordinates'][0], params.bounds[1]['coordinates'][0])
    // const minlat = Math.min(params.bounds[0]['coordinates'][1], params.bounds[1]['coordinates'][1])
    // const maxlon = Math.max(params.bounds[0]['coordinates'][0], params.bounds[1]['coordinates'][0])
    // const maxlat = Math.max(params.bounds[0]['coordinates'][1], params.bounds[1]['coordinates'][1])
    // params.bounds = [minlon, minlat, maxlon, maxlat].join(',')
    params.bounds = params.bounds.join(',')
  }
  const searchParams = new URLSearchParams(
    Object.entries(params).reduce((acc, [k, v]) => Object.assign(acc, { [k]: String(v) }), {}),
  )
  searchParams.sort()
  return { url: `${opencageBaseUrl}?${searchParams}`, options: { method: 'GET' } }
}

export type ParseOptions = { annotations?: boolean; full?: boolean }
/**
 * Convert OpenCage GeoJSON response to a GeocodeJSON one
 */
export function parse(response: OpenCageGeoJSONResponse, options?: ParseOptions): GeocodeResponse {
  const { query } = response
  return Object.assign(
    {
      geocoding: {
        version: '0.1.0',
        licence: 'https://www.opendatacommons.org/licenses/odbl',
        attribution: {
          OpenStreetMap: 'Geodata © OpenStreetMap contributors',
          OpenCage: 'Geodata provided by OpenCage',
        },
        query: query || null,
      },
    },
    featureCollection(response.features.map((result) => parseResult(result, options))),
  )
}

/**
 * Convert OpenCage GeoJSON feature to a GeocodeJSON one, returning only the necessary properties
 */
export function parseResult(
  result: Feature<Point, OpenCageGeoJSONFeatureProperties>,
  options?: ParseOptions,
): GeocodeResult {
  const geocoding: GeocodeResult['properties']['geocoding'] = {
    accuracy: result.properties?.confidence,
    type: result.properties?.components?._type ?? 'unknown',
    label: result.properties?.formatted,
    geohash:
      result.properties?.annotations?.geohash ??
      geohash.encode(result.geometry.coordinates[1], result.geometry.coordinates[0]),
    housenumber: result.properties.components?.house_number ?? result.properties.components?.street_number,
    street: getFirstMatchingKey(ALIASES['street'], result.properties.components),
    locality: getFirstMatchingKey(ALIASES['locality'], result.properties.components),
    postcode: getFirstMatchingKey(ALIASES['postcode'], result.properties.components),
    city: getFirstMatchingKey(ALIASES['city'], result.properties.components),
    district: getFirstMatchingKey(ALIASES['district'], result.properties.components),
    county: getFirstMatchingKey(ALIASES['county'], result.properties.components),
    state: getFirstMatchingKey(ALIASES['state'], result.properties.components),
    country: getFirstMatchingKey(ALIASES['country'], result.properties.components),
  }

  const properties: OpenCageGeoJSONFeatureProperties & GeocodeResult['properties'] = { geocoding }
  if (options?.annotations) Object.assign(properties, { annotations: result.properties.annotations })
  if (options?.full) Object.assign(properties, result.properties)

  return Object.assign({}, result, { properties })
}

export function getFirstMatchingKey(keys: string[], obj?: Record<string, string>): string | undefined {
  if (!obj) return
  const matchingKey = keys.find((key) => !!obj[key])
  return matchingKey ? obj[matchingKey] : undefined
}

/**
 * Mapping based on https://github.com/OpenCageData/address-formatting/blob/eacd0c215f175574e7c68dfbcad7ac8ca51e464b/conf/components.yaml
 * Aliases are ordered in what I believe to be from the closest match to the loosest one for any given key
 */
export const ALIASES = {
  street: [
    'street',
    'street_name',
    'road',
    'footway',
    'residential',
    'path',
    'pedestrian',
    'square',
    'place',
    'road_reference',
    'road_reference_intl',
  ],
  locality: ['locality', 'hamlet', 'croft'],
  postcode: ['postcode', 'postal_code'],
  city: ['city', 'town', 'township', 'village'],
  district: [
    'district',
    'city_district',
    'suburb',
    'neighbourhood',
    'quarter',
    'borough',
    'city_block',
    'residential',
    'commercial',
    'industrial',
    'houses',
    'subdistrict',
    'subdivision',
    'ward',
  ],
  county: ['county', 'department', 'municipality', 'local_administrative_area', 'subcounty'],
  state: ['state', 'province', 'state_code', 'state_district'],
  country: ['country', 'country_name', 'country_code'],
}
