import { parse, geocode, GeocoderResponse } from './googleapis'
import * as fixtures from './__fixtures__/googleapis'

// const jsonLog = (obj: Object, name?: string) => console.log(name, JSON.stringify(obj, null, 2))

describe('geocodejson-googleapis', () => {
  it('defines parse & geocode', () => {
    expect(geocode).toBeDefined()
    expect(parse).toBeDefined()
  })

  describe('parse', () => {
    it('converts google examples correctly', async () => {
      expect(parse(fixtures.defaultResponse as GeocoderResponse)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            bbox: [-122.0855988802915, 37.4211274197085, -122.0829009197085, 37.4238253802915],
            properties: {
              geocoding: {
                accuracy: 10,
                type: 'house',
                label: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
                geohash: '9q9hvuscw',
                housenumber: '1600',
                street: 'Amphitheatre Pkwy',
                postcode: '94043',
                city: 'Mountain View',
                county: 'Santa Clara County',
                state: 'California',
                country: 'United States',
                locality: undefined,
                district: undefined,
              },
            },
            geometry: {
              type: 'Point',
              coordinates: [-122.0842499, 37.4224764],
            },
          },
        ],
      })

      expect(parse(fixtures.defaultResponse as GeocoderResponse, { short: true })).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            bbox: [-122.0855988802915, 37.4211274197085, -122.0829009197085, 37.4238253802915],
            properties: {
              geocoding: {
                accuracy: 10,
                type: 'house',
                label: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
                geohash: '9q9hvuscw',
                housenumber: '1600',
                street: 'Amphitheatre Pkwy',
                postcode: '94043',
                city: 'Mountain View',
                county: 'Santa Clara County',
                state: 'CA',
                country: 'US',
                locality: undefined,
                district: undefined,
              },
            },
            geometry: {
              type: 'Point',
              coordinates: [-122.0842499, 37.4224764],
            },
          },
        ],
      })

      expect(parse(fixtures.viewportBiasingResponse as GeocoderResponse)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            bbox: [-118.588536, 34.1854649, -118.5534191, 34.2355209],
            properties: {
              geocoding: {
                accuracy: 1000,
                type: 'locality',
                label: 'Winnetka, Los Angeles, CA, USA',
                geohash: '9q5dtfc1d',
                locality: 'Winnetka',
                city: 'Los Angeles',
                county: 'Los Angeles County',
                state: 'California',
                country: 'United States',
                housenumber: undefined,
                postcode: undefined,
                district: undefined,
                street: undefined,
              },
            },
            geometry: {
              type: 'Point',
              coordinates: [-118.5739621, 34.2048586],
            },
          },
        ],
      })

      expect(parse(fixtures.regionBiasingResponse as GeocoderResponse)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            bbox: [-4.0796176, 39.8383676, -3.9192423, 39.88605099999999],
            properties: {
              geocoding: {
                accuracy: 1000,
                type: 'city',
                label: 'Toledo, Spain',
                geohash: 'ezj4u2g3u',
                city: 'Toledo',
                county: 'Toledo',
                state: 'Castile-La Mancha',
                country: 'Spain',
                district: undefined,
                housenumber: undefined,
                locality: undefined,
                street: undefined,
                postcode: undefined,
              },
            },
            geometry: {
              type: 'Point',
              coordinates: [-4.027323099999999, 39.8628316],
            },
          },
        ],
      })

      expect(parse(fixtures.componentFilteringResponse as GeocoderResponse)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            bbox: [-16.3370045, 28.4280248, -16.2356646, 28.487616],
            properties: {
              geocoding: {
                accuracy: 1000,
                type: 'city',
                label: 'Santa Cruz de Tenerife, Spain',
                geohash: 'eth3yjtu8',
                city: 'Santa Cruz de Tenerife',
                county: 'Santa Cruz de Tenerife',
                state: 'Canary Islands',
                country: 'Spain',
                district: undefined,
                housenumber: undefined,
                locality: undefined,
                street: undefined,
                postcode: undefined,
              },
            },
            geometry: {
              type: 'Point',
              coordinates: [-16.2518467, 28.4636296],
            },
          },
        ],
      })

      expect(parse(fixtures.zeroResultResponse as GeocoderResponse)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [],
      })

      expect(parse(fixtures.filterOnlyReponse as GeocoderResponse)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: null,
          attribution: 'Google Geocoding API',
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            bbox: [24.9332897, 60.16226160000001, 24.9433353, 60.168997],
            properties: {
              geocoding: {
                accuracy: 100,
                type: 'street',
                label: 'Annankatu, 00101 Helsinki, Finland',
                geohash: 'ud9wr2zeh',
                street: 'Annankatu',
                postcode: '00101',
                city: 'Helsinki',
                country: 'Finland',
                district: undefined,
                housenumber: undefined,
                locality: undefined,
                state: undefined,
                county: undefined,
              },
            },
            geometry: {
              type: 'Point',
              coordinates: [24.938451, 60.1657808],
            },
          },
        ],
      })
    })
  })

  describe('geocode', () => {
    // TODO: write some tests for the geocode function
  })
})
