import type { Feature, FeatureCollection, GeoJsonProperties, Point } from 'geojson'

export as namespace GeocodeJSON

export type GeocodeType = 'house' | 'street' | 'locality' | 'city' | 'region' | 'country' | string

/**
 * Common parameter to all geocode implementation
 */
export interface GeocodeOptions {
  apiKey?: string
  address?: string
  language?: string
}

/**
 * GeocodeJSON Response interface
 */
export interface GeocodeResponse<P = GeoJsonProperties, G = JSONObject>
  extends FeatureCollection<GeocodeFeature<P, G>['geometry'], GeocodeFeature<P, G>['properties']> {
  // REQUIRED. Namespace.
  geocoding: {
    // REQUIRED. A semver.org compliant version number. Describes the version of
    // the GeocodeJSON spec that is implemented by this instance.
    version: string

    // OPTIONAL. Default: null. The licence of the data. In case of multiple sources,
    // and then multiple licences, can be an object with one key by source.
    licence: string | Record<string, string> | null

    // OPTIONAL. Default: null. The attribution of the data. In case of multiple sources,
    // and then multiple attributions, can be an object with one key by source.
    attribution: string | Record<string, string> | null

    // OPTIONAL. Default: null. The query that has been issued to trigger the search.
    query: string | null
  }
}

export type GeocodeFeature<P = GeoJsonProperties, G = JSONObject> = Feature<Point, GeocodeFeatureProperties<G> & P>

export interface GeocodeFeatureProperties<G> extends JSONObject {
  // REQUIRED. Namespace.
  geocoding: GeocodingProperties & G
}

export interface GeocodingProperties extends JSONObject {
  // REQUIRED. One of "house", "street", "locality", "city", "region", "country" or else...
  type: GeocodeType

  // OPTIONAL. Result accuracy, in meters.
  accuracy?: number

  // RECOMMENDED. Suggested label for the result.
  label?: string

  // OPTIONAL. Name of the place.
  name?: string

  // OPTIONAL. Housenumber of the place.
  housenumber?: string

  // OPTIONAL. Street of the place.
  street?: string

  // OPTIONAL. Locality of the place.
  locality?: string

  // OPTIONAL. Postcode of the place.
  postcode?: string

  // OPTIONAL. City of the place.
  city?: string

  // OPTIONAL. District of the place.
  district?: string

  // OPTIONAL. County of the place.
  county?: string

  // OPTIONAL. State of the place.
  state?: string

  // OPTIONAL. Country of the place.
  country?: string

  // OPTIONAL. Administratives boundaries the feature is included in,
  // as defined in http://wiki.osm.org/wiki/Key:admin_level#admin_level
  // TODO is there some still generic but less OSMish scheme?
  admin?: Record<string, string>

  // OPTIONAL. Geohash encoding of coordinates (see http://geohash.org/site/tips.html).
  geohash?: string
}

/**
 * Utility types
 */
export type Primitive = bigint | boolean | null | number | string | symbol | undefined
export type JSONValue = Primitive | JSONObject | JSONArray
export type JSONArray = Array<JSONValue>
export interface JSONObject {
  [key: string]: JSONValue
}
