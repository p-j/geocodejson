import * as fixtures from './__fixtures__/ban'
import { parse, geocode, getFetchArgs } from './geocodejson-ban'
import { BANBaseUrl, BANGeocodeRequestParams } from '.'

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
                label: '4 Rue du Général Leclerc 78000 Versailles',
                score: 0.7592313152804641,
                housenumber: '4',
                id: '78646_1145_00004',
                name: '4 Rue du Général Leclerc',
                postcode: '78000',
                citycode: '78646',
                x: 635728.07,
                y: 6855842.44,
                city: 'Versailles',
                context: '78, Yvelines, Île-de-France',
                type: 'housenumber',
                importance: 0.69197,
                street: 'Rue du Général Leclerc',
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
              label: 'Place de la République 75011 Paris',
              score: 0.9670254545454545,
              id: '75111_8159',
              name: 'Place de la République',
              postcode: '75011',
              citycode: '75111',
              x: 653452.35,
              y: 6863188.08,
              city: 'Paris',
              district: 'Paris 11e Arrondissement',
              context: '75, Paris, Île-de-France',
              type: 'street',
              importance: 0.63728,
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
              label: 'Paris',
              score: 0.9704590909090908,
              id: '75056',
              type: 'municipality',
              name: 'Paris',
              postcode: '75001',
              citycode: '75056',
              x: 652089.7,
              y: 6862305.26,
              population: 2190327,
              city: 'Paris',
              context: '75, Paris, Île-de-France',
              importance: 0.67505,
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
              label: 'Pré Rura 05240 La Salle-les-Alpes',
              score: 0.9387145454545454,
              type: 'locality',
              importance: 0.32586,
              id: '05161_B193',
              name: 'Pré Rura',
              postcode: '05240',
              citycode: '05161',
              x: 981275.7,
              y: 6432955.28,
              city: 'La Salle-les-Alpes',
              context: "05, Hautes-Alpes, Provence-Alpes-Côte d'Azur",
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
