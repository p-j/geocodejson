import type { GeocodeOptions, GeocodeFeature, GeocodeResponse } from '@p-j/geocodejson-types'
import type { BANGeocodeRequestParams, BANGeocodeResponse, BANProperties } from './api-adresse.type'
import fetch from 'cross-fetch'
import * as geohash from 'ngeohash'

export type GeocodeParams = ({ address: string; q?: string } | { address?: string; q: string }) &
  Omit<GeocodeOptions, 'address'> &
  Omit<BANGeocodeRequestParams, 'q'>

export const BANBaseUrl = 'https://api-adresse.data.gouv.fr/search'

/**
 * Geocode an address using the French Base Adresse Nationale API
 *
 * __Common parameter to all geocoder__
 * @param options.address The street address to geocode (avoiding business names, building names etc...)
 *
 * __Parameters specific to BAN API__
 * @param options.q The query string to be geocoded: a placename/address. This is superseded by options.address.
 * @param options.limit The maximum number of results to be returned.
 * @param options.autocomplete Toggle the autocomplete behavior.
 * @param options.type The expected return type (one of: `housenumber`, `street`, `locality`, `municipality`)
 * @param options.lat Latitude in degree, together with `lon` they can skew results toward a specific location
 * @param options.lon Longitude in degree
 * @param options.citycode Restrain the search to a given city (uses INSEE city code)
 * @param options.postcode Restrain the search to a given postal code
 * @see https://adresse.data.gouv.fr/api-doc/adresse#search
 */
export async function geocode(params: GeocodeParams): Promise<BANGeocodeResponse> {
  const q = params.address || params.q
  if (!q) throw new Error('The search input must be provided either as "address" or "q".') // the type definition prevent this case but the type inference doesn't
  const { url, options } = getFetchArgs({
    ...params,
    q,
  })
  const response = await fetch(url, options)
  const json = await response.json()
  return Object.assign(json, { query: q })
}

/**
 * Generate fetch argument to successfully geocode the address using the provided options
 * @param options.q The query string to be geocoded: a placename/address.
 * @param options.limit The maximum number of results to be returned.
 * @param options.autocomplete Toggle the autocomplete behavior.
 * @param options.type The expected return type (one of: `housenumber`, `street`, `locality`, `municipality`)
 * @param options.lat Latitude in degree, together with `lon` they can skew results toward a specific location
 * @param options.lon Longitude in degree
 * @param options.citycode Restrain the search to a given city (uses INSEE city code)
 * @param options.postcode Restrain the search to a given postal code
 * @see https://adresse.data.gouv.fr/api-doc/adresse#search
 */
export function getFetchArgs(params: BANGeocodeRequestParams) {
  const searchParams = new URLSearchParams(
    Object.entries(params).reduce((acc, [k, v]) => Object.assign(acc, { [k]: String(v) }), {}),
  )
  searchParams.sort()

  return { url: `${BANBaseUrl}?${searchParams}`, options: { method: 'GET' } }
}

export function parse(response: BANGeocodeResponse): GeocodeResponse<{}, BANProperties> {
  const { version, features, query = null, attribution = null, licence = null, ...rest } = response
  return {
    geocoding: {
      version,
      licence,
      attribution,
      query,
    },
    features: features.map(parseResult),
    ...rest,
  }
}

/**
 * Convert BAN GeoJSON feature to a GeocodeJSON one
 */
export function parseResult(result: BANGeocodeResponse['features'][number]): GeocodeFeature<{}, BANProperties> {
  const { properties, ...rest } = result
  return {
    ...rest,
    properties: {
      geocoding: { ...properties, geohash: geohash.encode(rest.geometry.coordinates[1], rest.geometry.coordinates[0]) },
    },
  }
}
