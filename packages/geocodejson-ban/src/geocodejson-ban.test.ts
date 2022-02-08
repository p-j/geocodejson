import type { BANGeocodeRequestParams } from './api-adresse.type'
import * as fixtures from './__fixtures__/ban'
import { parse, geocode, getFetchArgs, BANBaseUrl } from './geocodejson-ban'

describe('@p-j/geocodejson-ban', () => {
  it('defines parse, geocode & getFetchArgs', () => {
    expect(geocode).toBeDefined()
    expect(parse).toBeDefined()
    expect(getFetchArgs).toBeDefined()
  })

  describe('parse', () => {
    it('converts BAN results correctly', async () => {
      expect(parse(fixtures.houseNumberType)).toStrictEqual({
        type: 'FeatureCollection',
        geocoding: {
          version: 'draft',
          attribution: 'BAN',
          licence: 'ETALAB-2.0',
          query: '4 Rue du Général Leclerc, 78000 Versailles, France',
        },
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [2.124989, 48.799456],
            },
            properties: {
              geocoding: {
                city: 'Versailles',
                citycode: '78646',
                context: '78, Yvelines, Île-de-France',
                geohash: 'u09t87em7',
                confidence: 0.7592313152804641,
                housenumber: '4',
                id: '78646_1145_00004',
                importance: 0.69197,
                label: '4 Rue du Général Leclerc 78000 Versailles',
                name: '4 Rue du Général Leclerc',
                postcode: '78000',
                score: 0.7592313152804641,
                street: 'Rue du Général Leclerc',
                type: 'housenumber',
                x: 635728.07,
                y: 6855842.44,
              },
            },
          },
        ],
        limit: 1,
      })
    })

    expect(parse(fixtures.streetType)).toStrictEqual({
      type: 'FeatureCollection',
      geocoding: {
        version: 'draft',
        attribution: 'BAN',
        licence: 'ETALAB-2.0',
        query: 'place de la république paris',
      },
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [2.365475, 48.867039],
          },
          properties: {
            geocoding: {
              city: 'Paris',
              citycode: '75111',
              confidence: 0.9670254545454545,
              context: '75, Paris, Île-de-France',
              district: 'Paris 11e Arrondissement',
              geohash: 'u09tvzfrp',
              id: '75111_8159',
              importance: 0.63728,
              label: 'Place de la République 75011 Paris',
              name: 'Place de la République',
              postcode: '75011',
              score: 0.9670254545454545,
              type: 'street',
              x: 653452.35,
              y: 6863188.08,
            },
          },
        },
      ],
      limit: 1,
    })

    expect(parse(fixtures.municipalityType)).toStrictEqual({
      type: 'FeatureCollection',
      geocoding: {
        version: 'draft',

        attribution: 'BAN',
        licence: 'ETALAB-2.0',
        query: 'Paris',
      },
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [2.347, 48.859],
          },
          properties: {
            geocoding: {
              city: 'Paris',
              citycode: '75056',
              confidence: 0.9704590909090908,
              context: '75, Paris, Île-de-France',
              geohash: 'u09tvqt03',
              id: '75056',
              importance: 0.67505,
              label: 'Paris',
              name: 'Paris',
              population: 2190327,
              postcode: '75001',
              score: 0.9704590909090908,
              type: 'municipality',
              x: 652089.7,
              y: 6862305.26,
            },
          },
        },
      ],
      limit: 1,
    })

    expect(parse(fixtures.localityType)).toStrictEqual({
      type: 'FeatureCollection',
      geocoding: {
        version: 'draft',
        attribution: 'BAN',
        licence: 'ETALAB-2.0',
        query: 'Pré Rura 05240 La Salle-les-Alpes',
      },
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [6.566823, 44.938617],
          },
          properties: {
            geocoding: {
              city: 'La Salle-les-Alpes',
              citycode: '05161',
              confidence: 0.9387145454545454,
              context: "05, Hautes-Alpes, Provence-Alpes-Côte d'Azur",
              geohash: 'spuxtkvf6',
              id: '05161_B193',
              importance: 0.32586,
              label: 'Pré Rura 05240 La Salle-les-Alpes',
              name: 'Pré Rura',
              postcode: '05240',
              score: 0.9387145454545454,
              type: 'locality',
              x: 981275.7,
              y: 6432955.28,
            },
          },
        },
      ],
      limit: 1,
    })
  })
  describe('getFetchArgs', () => {
    it('produce correct argument for a simple search', () => {
      const params: BANGeocodeRequestParams = {
        q: '4 Rue du Général Leclerc, 78000 Versailles, France',
      }

      const searchParams = new URLSearchParams({
        q: '4 Rue du Général Leclerc, 78000 Versailles, France',
      })
      searchParams.sort()

      const { url, options } = getFetchArgs(params)
      expect(options).toStrictEqual({ method: 'GET' })
      expect(url).toEqual(`${BANBaseUrl}?${searchParams}`)
    })

    it('produce correct argument for a complex search', () => {
      const params: BANGeocodeRequestParams = {
        q: '4 Rue du Général Leclerc, 78000 Versailles, France',
        autocomplete: 1,
        limit: 1,
        type: 'housenumber',
        postcode: '78000',
        lon: 2.124989,
        lat: 48.799456,
      }

      const searchParams = new URLSearchParams({
        q: '4 Rue du Général Leclerc, 78000 Versailles, France',
        autocomplete: '1',
        limit: '1',
        type: 'housenumber',
        postcode: '78000',
        lon: '2.124989',
        lat: '48.799456',
      })
      searchParams.sort()

      const { url, options } = getFetchArgs(params)

      expect(options).toStrictEqual({ method: 'GET' })
      expect(url).toEqual(`${BANBaseUrl}?${searchParams}`)
    })
  })
  describe('geocode', () => {
    // TODO: add tests with mocked response
  })
})
