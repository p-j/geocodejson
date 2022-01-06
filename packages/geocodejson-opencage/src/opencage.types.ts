import type { JSONObject } from '@p-j/geocodejson-types'
import type { BBox, FeatureCollection, Point } from 'geojson'

/**
 * Interface Largely inspired/copied from https://github.com/tsamaya/opencage-api-client/blob/master/index.d.ts
 * © Arnaud Ferrand
 */
export interface OpenCageGeocodeRequestParams {
  /**
   * a 30 character long, alphanumeric string.
   */
  key?: string
  /**
   * the query string to be geocoded: a latitude, longitude or a placename/address.
   */
  q?: string
  /**
   * When set to 1 we attempt to abbreviate and shorten the formatted string we return. Learn more about formatted placenames.
   */
  abbrv?: number
  /**
   * When set to 1 the various request parameters are added to the response for ease of debugging.
   */
  add_request?: number
  /**
   * Used only for forward geocoding. This value will restrict the possible results to a defined bounding box.
   * The value of the bounds parameter should be specified as two coordinate points forming the south-west and north-east corners of a bounding box (min lon, min lat, max lon, max lat).
   *
   * Example usage:
   * bounds=-0.563160,51.280430,0.278970,51.683979
   */
  bounds?: string | BBox
  /**
   * Used only for forward geocoding. Restricts results to the specified country/territory or countries.
   *
   * Example usage:
   * countrycode=de
   *
   * The country code is a two letter code as defined by the ISO 3166-1 Alpha 2 standard. E.g. gb for the United Kingdom, fr for France, us for United States.
   * Non-two letter country codes are ignored.
   * You can specify multiple country codes by supplying a comma separated list. For example countrycode=ca,us would limit results to either the United States or Canada.
   */
  countrycode?: string
  /**
   * Wraps the returned JSON with a function name.
   */
  jsonp?: string
  /**
   * An IETF format language code (such as es for Spanish or pt-BR for Brazilian Portuguese), or native in which case we will attempt to return the response in the local language(s).
   *
   * Example usage:
   * language=de
   *
   * If no language is explicitly specified, we will then look for an HTTP Accept-Language header like those sent by a browser and use highest quality language specified (please see RFC 4647 for details). If the request did not specify a valid header, then en (English) will be assumed.
   */
  language?: string
  /**
   * The maximum number of results we should return. Default is 10. Maximum allowable value is 100.
   *
   * Example usage:
   * limit=1
   */
  limit?: number
  /**
   * An integer from 1-10. Only results with at least this confidence will be returned. Learn more about our confidence score on API documentation.
   *
   * Example usage:
   * min_confidence=3
   */
  min_confidence?: number
  /**
   * When set to 1 results will not contain annotations.
   *
   * Example usage:
   * no_annotations=1
   *
   * The only exception is if the optional roadinfo parameter is set (see below).
   */
  no_annotations?: number
  /**
   * When set to 1 results will not be deduplicated.
   */
  no_dedupe?: number
  /**
   * When set to 1 the query contents are not logged. Please use this parameter if you have concerns about privacy and want us to have no record of your query.
   */
  no_record?: number
  /**
   * When set to 1 results are 'pretty' printed for easier reading. Useful for debugging.
   */
  pretty?: number
  /**
   * Used only for forward geocoding. Provides the geocoder with a hint to bias results in favour of those closer to the specified location. Please note though, this is just one of many factors in the internal scoring we use for ranking results.
   * The value is a point with latitude, longitude coordinates in decimal format.
   *
   * Example usage:
   * proximity=51.952659,7.632473
   *
   * Values that are not valid coordinates are ignored.
   */
  proximity?: string
  /**
   * When set to 1 the behaviour of the geocoder is changed to attempt to match the nearest road (as opposed to address). If possible we also fill additional information in the roadinfo annotation. Please see details API Documentation.
   */
  roadinfo?: number
}

/**
 * OpenCage GeoJSON Response
 * @see https://opencagedata.com/api#forward-resp
 */
export interface OpenCageGeoJSONResponse extends FeatureCollection<Point, OpenCageGeoJSONFeatureProperties> {
  documentation?: string
  /**
   *
   */
  licenses: { name?: string; url?: string }[]
  /**
   * Only for free account
   */
  rate?: { limit: number; remaining: number; reset: number }

  status: { code: 200 | 400 | 401 | 402 | 403 | 404 | 405 | 408 | 410 | 426 | 429 | 503; message: string }
  stay_informed?: Record<string, string>
  thanks?: string
  timestamp: { created_http: string; created_unix: number }
  total_results: number
  /**
   * Added by the geocode function
   */
  query?: string
}

/**
 * OpenCage GeoJSON Feature
 * @see https://opencagedata.com/api#forward-resp
 */
export interface OpenCageGeoJSONFeatureProperties extends JSONObject {
  annotations?: Record<string, any>
  bounds?: { northeast: { lat: number; lng: number }; southwest: { lat: number; lng: number } }
  // Non exauhstive list of possible keys
  // Based on https://opencagedata.com/api#forward-resp
  // And https://github.com/OpenCageData/address-formatting/blob/master/conf/components.yaml
  components?: Record<string, any> & {
    'ISO_3166-1_alpha-2'?: string
    'ISO_3166-1_alpha-3'?: string
    _category?: string
    _type?: string
    continent?: string
    country?: string
    country_code?: string
    county?: string
    house_number?: string
    municipality?: string
    local_administrative_area?: string
    political_union?: string
    postcode?: string
    region?: string
    road?: string
    state?: string
    state_code?: string
    suburb?: string
    town?: string
    city?: string
    city_district?: string
    road_type?: string
    state_district?: string
    street_number?: string
    house?: string
    building?: string
    public_building?: string
    isolated_dwelling?: string
    farmland?: string
    allotments?: string
    footway?: string
    street?: string
    street_name?: string
    residential?: string
    path?: string
    pedestrian?: string
    road_reference?: string
    road_reference_intl?: string
    square?: string
    place?: string
    hamlet?: string
    locality?: string
    croft?: string
    village?: string
    neighbourhood?: string
    district?: string
    quarter?: string
    borough?: string
    city_block?: string
    commercial?: string
    industrial?: string
    houses?: string
    subdistrict?: string
    subdivision?: string
    ward?: string
    postal_city?: string
    township?: string
    subcounty?: string
    county_code?: string
    department?: string
    postal_code?: string
    partial_postcode?: string
    province?: string
    island?: string
    archipelago?: string
    country_name?: string
  }
  confidence?: number
  formatted?: string
}
