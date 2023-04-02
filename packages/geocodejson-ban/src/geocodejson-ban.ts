import type { GeocodeFeature, GeocodeOptions, GeocodeResponse } from '@p-j/geocodejson-types'
import fetch from 'cross-fetch'
import * as geohash from 'ngeohash'
import type { BANGeocodeRequestParams, BANGeocodeResponse, BANProperties } from './api-adresse.type'

export type GeocodeParams = ({ address: string; q?: string } | { address?: string; q: string }) &
  Omit<GeocodeOptions, 'address'> &
  Omit<BANGeocodeRequestParams, 'q'>

export const BANBaseUrl = 'https://api-adresse.data.gouv.fr/search'

/**
 * Geocode an address using the French Base Adresse Nationale API
 *
 * __Common parameter to all geocoder__
 * @param params.address The street address to geocode (avoiding business names, building names etc...)
 *
 * __Parameters specific to BAN API__
 * @param params.q The query string to be geocoded: a placename/address. This is superseded by params.address.
 * @param params.limit The maximum number of results to be returned.
 * @param params.autocomplete Toggle the autocomplete behavior.
 * @param params.type The expected return type (one of: `housenumber`, `street`, `locality`, `municipality`)
 * @param params.lat Latitude in degree, together with `lon` they can skew results toward a specific location
 * @param params.lon Longitude in degree
 * @param params.citycode Restrain the search to a given city (uses INSEE city code)
 * @param params.postcode Restrain the search to a given postal code
 * @see https://adresse.data.gouv.fr/api-doc/adresse#search
 */
export async function geocode(params: GeocodeParams): Promise<BANGeocodeResponse> {
  const q = params.address || params.q
  if (!q) throw new Error('The search input must be provided either as "address" or "q".') // the type definition prevent this case but the type inference doesn't
  const { url, options } = getFetchArgs({ ...params, q })
  const response = await fetch(url, options)
  const json = await response.json()
  return Object.assign(json, { query: q })
}

/**
 * Generate fetch argument to successfully geocode the address using the provided options
 * @param params.q The query string to be geocoded: a placename/address.
 * @param params.limit The maximum number of results to be returned.
 * @param params.autocomplete Toggle the autocomplete behavior.
 * @param params.type The expected return type (one of: `housenumber`, `street`, `locality`, `municipality`)
 * @param params.lat Latitude in degree, together with `lon` they can skew results toward a specific location
 * @param params.lon Longitude in degree
 * @param params.citycode Restrain the search to a given city (uses INSEE city code)
 * @param params.postcode Restrain the search to a given postal code
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
      geocoding: {
        ...properties,
        country: 'France', // BAN covers France only and this field isn't returned by the original response
        confidence: properties.score,
        geohash: geohash.encode(result.geometry.coordinates[1], result.geometry.coordinates[0]),
      },
    },
  }
}
