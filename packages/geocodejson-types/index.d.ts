import { Feature, FeatureCollection, Point } from 'geojson'

export as namespace GeocodeJSON

export type GeocodeType = 'house' | 'street' | 'locality' | 'city' | 'region' | 'country' | string

export interface GeocodeOptions {
  apiKey: string
  address: string
  language?: string
}

export interface GeocodeResponse extends FeatureCollection {
  // REQUIRED. GeocodeJSON result is a FeatureCollection.
  type: 'FeatureCollection'

  // REQUIRED. Namespace.
  geocoding: {
    // REQUIRED. A semver.org compliant version number. Describes the version of
    // the GeocodeJSON spec that is implemented by this instance.
    version: string

    // OPTIONAL. Default: null. The licence of the data. In case of multiple sources,
    // and then multiple licences, can be an object with one key by source.
    licence: string | null

    // OPTIONAL. Default: null. The attribution of the data. In case of multiple sources,
    // and then multiple attributions, can be an object with one key by source.
    attribution: string | null

    // OPTIONAL. Default: null. The query that has been issued to trigger the search.
    query: string | null
  }

  // REQUIRED. As per GeoJSON spec.
  features: GeocodeResult[]
}

interface GeocodeResult extends Feature {
  // REQUIRED. As per GeoJSON spec.
  properties: {
    // REQUIRED. Namespace.
    geocoding: {
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
  }

  // REQUIRED. As per GeoJSON spec.
  type: 'Feature'

  // REQUIRED. As per GeoJSON spec.
  geometry: Point
}
