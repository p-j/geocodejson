/**
 * Largely inspirared by/copied from
 * - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/googlemaps/reference/coordinates.d.ts
 * - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/googlemaps/reference/geocoder.d.ts
 * Those type def cannot be reused as-is as we are dealing with the API response directly and thus LatLng classes do not exists
 */

declare namespace google.maps {
  /**
   * LatLng as communicated in the JSON Response of the Geocoding API
   */
  interface LatLng {
    /**
     * Latitude in degrees. Values will be clamped to the range [-90, 90]. This means that if the value specified is
     * less than -90, it will be set to -90. And if the value is greater than 90, it will be set to 90.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral.lat Maps JavaScript API}
     */
    lat: number

    /**
     * Longitude in degrees. Values outside the range [-180, 180] will be wrapped so that they fall within the
     * range. For example, a value of -190 will be converted to 170. A value of 190 will be converted to -170. This
     * reflects the fact that longitudes wrap around the globe.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngLiteral.lng Maps JavaScript API}
     */
    lng: number
  }

  /**
   * LatLngBounds as communicated in the JSON Response of the Geocoding API
   */
  interface LatLngBounds {
    northeast: LatLng
    southwest: LatLng
  }

  enum AddressTypes {
    street_address = 'street_address', // indicates a precise street address.
    route = 'route', // indicates a named route (such as "US 101").
    intersection = 'intersection', // indicates a major intersection, usually of two major roads.
    political = 'political', // indicates a political entity. Usually, this type indicates a polygon of some civil administration.
    country = 'country', // indicates the national political entity, and is typically the highest order type returned by the Geocoder.
    administrative_area_level_1 = 'administrative_area_level_1', // indicates a first-order civil entity below the country level. Within the United States, these administrative levels are states. Not all nations exhibit these administrative levels. In most cases, administrative_area_level_1 short names will closely match ISO 3166-2 subdivisions and other widely circulated lists; however this is not guaranteed as our geocoding results are based on a variety of signals and location data.
    administrative_area_level_2 = 'administrative_area_level_2', // indicates a second-order civil entity below the country level. Within the United States, these administrative levels are counties. Not all nations exhibit these administrative levels.
    administrative_area_level_3 = 'administrative_area_level_3', // indicates a third-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
    administrative_area_level_4 = 'administrative_area_level_4', // indicates a fourth-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
    administrative_area_level_5 = 'administrative_area_level_5', // indicates a fifth-order civil entity below the country level. This type indicates a minor civil division. Not all nations exhibit these administrative levels.
    colloquial_area = 'colloquial_area', // indicates a commonly-used alternative name for the entity.
    locality = 'locality', // indicates an incorporated city or town political entity.
    sublocality = 'sublocality', // indicates a first-order civil entity below a locality.
    sublocality_level_1 = 'sublocality_level_1', // For some locations may receive one of the additional types: sublocality_level_1 to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.
    sublocality_level_2 = 'sublocality_level_2', // For some locations may receive one of the additional types: sublocality_level_1 to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.
    sublocality_level_3 = 'sublocality_level_3', // For some locations may receive one of the additional types: sublocality_level_1 to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.
    sublocality_level_4 = 'sublocality_level_4', // For some locations may receive one of the additional types: sublocality_level_1 to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.
    sublocality_level_5 = 'sublocality_level_5', // For some locations may receive one of the additional types: sublocality_level_1 to sublocality_level_5. Each sublocality level is a civil entity. Larger numbers indicate a smaller geographic area.
    neighborhood = 'neighborhood', // indicates a named neighborhood
    premise = 'premise', // indicates a named location, usually a building or collection of buildings with a common name
    subpremise = 'subpremise', // indicates a first-order entity below a named location, usually a singular building within a collection of buildings with a common name
    plus_code = 'plus_code', // indicates an encoded location reference, derived from latitude and longitude. Plus codes can be used as a replacement for street addresses in places where they do not exist (where buildings are not numbered or streets are not named). See https://plus.codes for details.
    postal_code = 'postal_code', // indicates a postal code as used to address postal mail within the country.
    natural_feature = 'natural_feature', // indicates a prominent natural feature.
    airport = 'airport', // indicates an airport.
    park = 'park', // indicates a named park.
    point_of_interest = 'point_of_interest', // indicates a named point of interest. Typically, these "POI"s are prominent local entities that don't easily fit in another category, such as "Empire State Building" or "Eiffel Tower".
  }

  enum AddressComponentTypes {
    floor = 'floor', // indicates the floor of a building address.
    establishment = 'establishment', // typically indicates a place that has not yet been categorized.
    landmark = 'landmark', // indicates a nearby place that is used as a reference, to aid navigation.
    point_of_interest = 'point_of_interest', // indicates a named point of interest.
    parking = 'parking', // indicates a parking lot or parking structure.
    post_box = 'post_box', // indicates a specific postal box.
    postal_town = 'postal_town', // indicates a grouping of geographic areas, such as locality and sublocality, used for mailing addresses in some countries.
    room = 'room', // indicates the room of a building address.
    street_number = 'street_number', // indicates the precise street number.
    bus_station = 'bus_station', // indicate the location of a bus stop.
    train_station = 'train_station', // indicate the location of a train stop.
    transit_station = 'transit_station', // indicate the location of a public transit stop.
  }

  /**
   * A service for converting between an address and a {@link LatLng}.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#Geocoder Maps JavaScript API}
   */
  class Geocoder {
    /**
     * Creates a new instance of a Geocoder that sends geocode requests to Google servers.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#Geocoder.constructor Maps JavaScript API}
     */
    constructor()

    /**
     * Geocode a request.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#Geocoder.geocode Maps JavaScript API}
     */
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void
  }

  /**
   * The specification for a geocoding request to be sent to the {@link Geocoder}.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest Maps JavaScript API}
   */
  interface GeocoderRequest {
    /**
     * Address to geocode. One, and only one, of {@link address}, {@link location} and {@link placeId} must be
     * supplied.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.address Maps JavaScript API}
     */
    address?: string

    /**
     * {@link LatLngBounds} within which to search.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.bounds Maps JavaScript API}
     */
    bounds?: LatLngBounds

    /**
     * Components are used to restrict results to a specific area. A filter consists of one or more of:
     * {@link GeocoderComponentRestrictions#route route}, {@link GeocoderComponentRestrictions#locality locality},
     * {@link GeocoderComponentRestrictions#administrativeArea administrativeArea},
     * {@link GeocoderComponentRestrictions#postalCode postalCode},
     * {@link GeocoderComponentRestrictions#country country}. Only the results that match all the filters will be
     * returned. Filter values support the same methods of spelling correction and partial matching as other
     * geocoding requests.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.componentRestrictions Maps JavaScript API}
     */
    componentRestrictions?: GeocoderComponentRestrictions

    /**
     * {@link LatLng} for which to search. The geocoder performs a reverse geocode. See
     * {@link https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding Reverse Geocoding}
     * for more information. One, and only one, of {@link address}, {@link location} and {@link placeId} must be
     * supplied.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.location Maps JavaScript API}
     */
    location?: LatLng

    /**
     * The place ID associated with the location. Place IDs uniquely identify a place in the Google Places database
     * and on Google Maps. Learn more about {@link https://developers.google.com/places/place-id place IDs} in the
     * Places API developer guide. The geocoder performs a reverse geocode. See
     * {@link https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding Reverse Geocoding}
     * for more information. One, and only one, of {@link address}, {@link location} and {@link placeId} must be
     * supplied.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.placeId Maps JavaScript API}
     */
    placeId?: string

    /**
     * Country code used to bias the search, specified as a Unicode region subtag / CLDR identifier.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderRequest.region Maps JavaScript API}
     */
    region?: string
  }

  /**
   * `GeocoderComponentRestrictions` represents a set of filters that resolve to a specific area. For details on how
   * this works, see
   * {@link https://developers.google.com/maps/documentation/javascript/geocoding#ComponentFiltering Geocoding Component Filtering}.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderComponentRestrictions Maps JavaScript API}
   */
  interface GeocoderComponentRestrictions {
    /**
     * Matches all the `administrative_area levels`.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderComponentRestrictions.administrativeArea Maps JavaScript API}
     */
    administrativeArea?: string

    /**
     * Matches a country name or a two letter ISO 3166-1 country code.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderComponentRestrictions.country Maps JavaScript API}
     */
    country?: string | string[]

    /**
     * Matches against both `locality` and `sublocality` types.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderComponentRestrictions.locality Maps JavaScript API}
     */
    locality?: string

    /**
     * Matches `postal_code` and `postal_code_prefix`.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderComponentRestrictions.postalCode Maps JavaScript API}
     */
    postalCode?: string

    /**
     * Matches the long or short name of a `route`.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderComponentRestrictions.route Maps JavaScript API}
     */
    route?: string
  }

  /**
   * The status returned by the {@link Geocoder} on the completion of a call to {@link Geocoder#geocode geocode()}.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus Maps JavaScript API}
   */
  enum GeocoderStatus {
    /**
     * There was a problem contacting the Google servers.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.ERROR Maps JavaScript API}
     */
    ERROR = 'ERROR',

    /**
     * This {@link GeocoderRequest} was invalid.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.INVALID_REQUEST Maps JavaScript API}
     */
    INVALID_REQUEST = 'INVALID_REQUEST',

    /**
     * The response contains a valid {@link GeocoderResult}.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.OK Maps JavaScript API}
     */
    OK = 'OK',

    /**
     * The webpage has gone over the requests limit in too short a period of time.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.OVER_QUERY_LIMIT Maps JavaScript API}
     */
    OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',

    /**
     * The webpage is not allowed to use the geocoder.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.REQUEST_DENIED Maps JavaScript API}
     */
    REQUEST_DENIED = 'REQUEST_DENIED',

    /**
     * A geocoding request could not be processed due to a server error. The request may succeed if you try again.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.UNKNOWN_ERROR Maps JavaScript API}
     */
    UNKNOWN_ERROR = 'UNKNOWN_ERROR',

    /**
     * No result was found for this {@link GeocoderRequest}.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderStatus.ZERO_RESULTS Maps JavaScript API}
     */
    ZERO_RESULTS = 'ZERO_RESULTS',
  }

  /**
   * A single geocoder result retrieved from the geocode server. A geocode request may return multiple result objects.
   * Note that though this result is "JSON-like," it is not strictly JSON, as it indirectly includes a
   * {@link LatLng} object.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult Maps JavaScript API}
   */
  interface GeocoderResult {
    /**
     * An array of {@link GeocoderAddressComponent}s
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.address_components Maps JavaScript API}
     */
    address_components: GeocoderAddressComponent[]

    /**
     * A string containing the human-readable address of this location.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.formatted_address Maps JavaScript API}
     */
    formatted_address: string

    /**
     * A {@link GeocoderGeometry} object
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.geometry Maps JavaScript API}
     */
    geometry: GeocoderGeometry

    /**
     * Whether the geocoder did not return an exact match for the original request, though it was able to match part
     * of the requested address.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.partial_match Maps JavaScript API}
     */
    partial_match: boolean

    /**
     * The place ID associated with the location. Place IDs uniquely identify a place in the Google Places database
     * and on Google Maps. Learn more about {@link https://developers.google.com/places/place-id Place IDs} in the
     * Places API developer guide.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.place_id Maps JavaScript API}
     */
    place_id: string

    /**
     * An array of strings denoting all the localities contained in a postal code. This is only present when the
     * result is a postal code that contains multiple localities. This array can contain up to 10 localities.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.postcode_localities Maps JavaScript API}
     */
    postcode_localities: string[]

    /**
     * An array of strings denoting the type of the returned geocoded element. For a list of possible strings, refer
     * to the
     * {@link https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes Address Component Types}
     * section of the Developer's Guide.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderResult.types Maps JavaScript API}
     */
    types: (AddressTypes | AddressComponentTypes)[]
  }

  /**
   * A single address component within a {@link GeocoderResult}. A full address may consist of multiple address
   * components.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderAddressComponent Maps JavaScript API}
   */
  interface GeocoderAddressComponent {
    /**
     * The full text of the address component
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderAddressComponent.long_name Maps JavaScript API}
     */
    long_name: string

    /**
     * The abbreviated, short text of the given address component
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderAddressComponent.short_name Maps JavaScript API}
     */
    short_name: string

    /**
     * An array of strings denoting the type of this address component. A list of valid types can be found
     * {@link https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes here}
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderAddressComponent.types Maps JavaScript API}
     */
    types: (AddressTypes | AddressComponentTypes)[]
  }

  /**
   * Geometry information about this {@link GeocoderResult}
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderGeometry Maps JavaScript API}
   */
  interface GeocoderGeometry {
    /**
     * The precise bounds of this {@link GeocoderResult}, if applicable
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderGeometry.bounds Maps JavaScript API}
     */
    bounds: LatLngBounds

    /**
     * The latitude/longitude coordinates of this result
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderGeometry.location Maps JavaScript API}
     */
    location: LatLng

    /**
     * The type of location returned in {@link location}
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderGeometry.location_type Maps JavaScript API}
     */
    location_type: GeocoderLocationType

    /**
     * The bounds of the recommended viewport for displaying this {@link GeocoderResult}
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderGeometry.viewport Maps JavaScript API}
     */
    viewport: LatLngBounds
  }

  /**
   * Describes the type of location returned from a geocode.
   * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderLocationType Maps JavaScript API}
   */
  enum GeocoderLocationType {
    /**
     * The returned result is approximate.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderLocationType.APPROXIMATE Maps JavaScript API}
     */
    APPROXIMATE = 'APPROXIMATE',

    /**
     * The returned result is the geometric center of a result such a line (e.g. street) or polygon (region).
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderLocationType.GEOMETRIC_CENTER Maps JavaScript API}
     */
    GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',

    /**
     * The returned result reflects an approximation (usually on a road) interpolated between two precise points
     * (such as intersections). Interpolated results are generally returned when rooftop geocodes are unavailable
     * for a street address.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderLocationType.RANGE_INTERPOLATED Maps JavaScript API}
     */
    RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',

    /**
     * The returned result reflects a precise geocode.
     * @see {@link https://developers.google.com/maps/documentation/javascript/reference/geocoder#GeocoderLocationType.ROOFTOP Maps JavaScript API}
     */
    ROOFTOP = 'ROOFTOP',
  }
}
