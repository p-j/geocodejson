import { parse, geocode, opencageBaseUrl, getFetchArgs } from './opencage'
import * as fixtures from './__fixtures__/opencage'
import { OpenCageGeocodeRequestParams } from './opencage.types'

// const jsonLog = (obj: Object, name?: string) => console.log(name, JSON.stringify(obj, null, 2))

describe('geocodejson-opencage', () => {
  it('defines parse & geocode', () => {
    expect(geocode).toBeDefined()
    expect(parse).toBeDefined()
  })

  describe('parse', () => {
    it('converts OpenCage examples correctly', async () => {
      expect(parse(fixtures.attractionType)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: 'https://www.opendatacommons.org/licenses/odbl',
          attribution: {
            OpenStreetMap: 'Geodata © OpenStreetMap contributors',
            OpenCage: 'Geodata provided by OpenCage',
          },
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              coordinates: [2.36395835522559, 48.86754205],
              type: 'Point',
            },
            properties: {
              geocoding: {
                accuracy: 9,
                type: 'attraction',
                label: 'Place de la République, Rue du Temple, 75003 Paris, France',
                geohash: 'u09wjb16h4p4grph6rtd',
                street: 'Rue du Temple',
                postcode: '75003',
                city: 'Paris',
                district: 'Paris',
                state: 'Ile-de-France',
                country: 'France',
                county: undefined,
                housenumber: undefined,
                locality: undefined,
              },
            },
            type: 'Feature',
          },
        ],
      })

      expect(parse(fixtures.buildingType)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: 'https://www.opendatacommons.org/licenses/odbl',
          attribution: {
            OpenStreetMap: 'Geodata © OpenStreetMap contributors',
            OpenCage: 'Geodata provided by OpenCage',
          },
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              coordinates: [2.1247629, 48.7992254],
              type: 'Point',
            },
            properties: {
              geocoding: {
                accuracy: 10,
                type: 'building',
                label: '4 Rue du Général Leclerc, 78000 Versailles, France',
                geohash: 'u09t87ehndfn3950fhv1',
                housenumber: '4',
                street: 'Rue du Général Leclerc',
                postcode: '78000',
                city: 'Versailles',
                district: 'Saint-Louis',
                county: 'Yvelines',
                state: 'Ile-de-France',
                country: 'France',
                locality: undefined,
              },
            },
            type: 'Feature',
          },
        ],
      })

      expect(parse(fixtures.roadType)).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: 'https://www.opendatacommons.org/licenses/odbl',
          attribution: {
            OpenStreetMap: 'Geodata © OpenStreetMap contributors',
            OpenCage: 'Geodata provided by OpenCage',
          },
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              coordinates: [5.0821572, 45.8504215],
              type: 'Point',
            },
            properties: {
              geocoding: {
                accuracy: 9,
                type: 'road',
                label: 'Chemin de Saint-Maurice-de-Gourdans, 01120 Dagneux, France',
                geohash: 'u05sgdudnf51f70kh05u',
                street: 'Chemin de Saint-Maurice-de-Gourdans',
                postcode: '01120',
                city: 'Dagneux',
                county: 'Ain',
                state: 'Auvergne-Rhône-Alpes',
                country: 'France',
                district: undefined,
                housenumber: undefined,
                locality: undefined,
              },
            },
            type: 'Feature',
          },
        ],
      })

      expect(parse(fixtures.roadType, { annotations: true })).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: 'https://www.opendatacommons.org/licenses/odbl',
          attribution: {
            OpenStreetMap: 'Geodata © OpenStreetMap contributors',
            OpenCage: 'Geodata provided by OpenCage',
          },
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              coordinates: [5.0821572, 45.8504215],
              type: 'Point',
            },
            properties: {
              geocoding: {
                accuracy: 9,
                type: 'road',
                label: 'Chemin de Saint-Maurice-de-Gourdans, 01120 Dagneux, France',
                geohash: 'u05sgdudnf51f70kh05u',
                street: 'Chemin de Saint-Maurice-de-Gourdans',
                postcode: '01120',
                city: 'Dagneux',
                county: 'Ain',
                state: 'Auvergne-Rhône-Alpes',
                country: 'France',
                district: undefined,
                housenumber: undefined,
                locality: undefined,
              },
              annotations: {
                DMS: {
                  lat: "45° 51' 1.51740'' N",
                  lng: "5° 4' 55.76592'' E",
                },
                MGRS: '31TFL6165979536',
                Maidenhead: 'JN25mu94uc',
                Mercator: {
                  x: 565743.152,
                  y: 5725739.607,
                },
                OSM: {
                  edit_url: 'https://www.openstreetmap.org/edit?way=292666708#map=16/45.85042/5.08216',
                  note_url: 'https://www.openstreetmap.org/note/new#map=16/45.85042/5.08216&layers=N',
                  url: 'https://www.openstreetmap.org/?mlat=45.85042&mlon=5.08216#map=16/45.85042/5.08216',
                },
                UN_M49: {
                  regions: {
                    EUROPE: '150',
                    FR: '250',
                    WESTERN_EUROPE: '155',
                    WORLD: '001',
                  },
                  statistical_groupings: ['MEDC'],
                },
                callingcode: 33,
                currency: {
                  alternate_symbols: [],
                  decimal_mark: ',',
                  html_entity: '&#x20AC;',
                  iso_code: 'EUR',
                  iso_numeric: '978',
                  name: 'Euro',
                  smallest_denomination: 1,
                  subunit: 'Cent',
                  subunit_to_unit: 100,
                  symbol: '€',
                  symbol_first: 0,
                  thousands_separator: '.',
                },
                flag: '🇫🇷',
                geohash: 'u05sgdudnf51f70kh05u',
                qibla: 119.03,
                roadinfo: {
                  drive_on: 'right',
                  road: 'Chemin de Saint-Maurice-de-Gourdans',
                  road_type: 'residential',
                  speed_in: 'km/h',
                },
                sun: {
                  rise: {
                    apparent: 1638342060,
                    astronomical: 1638335700,
                    civil: 1638340080,
                    nautical: 1638337860,
                  },
                  set: {
                    apparent: 1638374160,
                    astronomical: 1638380520,
                    civil: 1638376200,
                    nautical: 1638378420,
                  },
                },
                timezone: {
                  name: 'Europe/Paris',
                  now_in_dst: 0,
                  offset_sec: 3600,
                  offset_string: '+0100',
                  short_name: 'CET',
                },
                what3words: {
                  words: 'winters.saga.pelting',
                },
              },
            },
            type: 'Feature',
          },
        ],
      })

      expect(parse(fixtures.roadType, { full: true })).toStrictEqual({
        geocoding: {
          version: '0.1.0',
          licence: 'https://www.opendatacommons.org/licenses/odbl',
          attribution: {
            OpenStreetMap: 'Geodata © OpenStreetMap contributors',
            OpenCage: 'Geodata provided by OpenCage',
          },
          query: null,
        },
        type: 'FeatureCollection',
        features: [
          {
            geometry: {
              coordinates: [5.0821572, 45.8504215],
              type: 'Point',
            },
            properties: {
              geocoding: {
                accuracy: 9,
                type: 'road',
                label: 'Chemin de Saint-Maurice-de-Gourdans, 01120 Dagneux, France',
                geohash: 'u05sgdudnf51f70kh05u',
                street: 'Chemin de Saint-Maurice-de-Gourdans',
                postcode: '01120',
                city: 'Dagneux',
                county: 'Ain',
                state: 'Auvergne-Rhône-Alpes',
                country: 'France',
                district: undefined,
                housenumber: undefined,
                locality: undefined,
              },
              annotations: {
                DMS: {
                  lat: "45° 51' 1.51740'' N",
                  lng: "5° 4' 55.76592'' E",
                },
                MGRS: '31TFL6165979536',
                Maidenhead: 'JN25mu94uc',
                Mercator: {
                  x: 565743.152,
                  y: 5725739.607,
                },
                OSM: {
                  edit_url: 'https://www.openstreetmap.org/edit?way=292666708#map=16/45.85042/5.08216',
                  note_url: 'https://www.openstreetmap.org/note/new#map=16/45.85042/5.08216&layers=N',
                  url: 'https://www.openstreetmap.org/?mlat=45.85042&mlon=5.08216#map=16/45.85042/5.08216',
                },
                UN_M49: {
                  regions: {
                    EUROPE: '150',
                    FR: '250',
                    WESTERN_EUROPE: '155',
                    WORLD: '001',
                  },
                  statistical_groupings: ['MEDC'],
                },
                callingcode: 33,
                currency: {
                  alternate_symbols: [],
                  decimal_mark: ',',
                  html_entity: '&#x20AC;',
                  iso_code: 'EUR',
                  iso_numeric: '978',
                  name: 'Euro',
                  smallest_denomination: 1,
                  subunit: 'Cent',
                  subunit_to_unit: 100,
                  symbol: '€',
                  symbol_first: 0,
                  thousands_separator: '.',
                },
                flag: '🇫🇷',
                geohash: 'u05sgdudnf51f70kh05u',
                qibla: 119.03,
                roadinfo: {
                  drive_on: 'right',
                  road: 'Chemin de Saint-Maurice-de-Gourdans',
                  road_type: 'residential',
                  speed_in: 'km/h',
                },
                sun: {
                  rise: {
                    apparent: 1638342060,
                    astronomical: 1638335700,
                    civil: 1638340080,
                    nautical: 1638337860,
                  },
                  set: {
                    apparent: 1638374160,
                    astronomical: 1638380520,
                    civil: 1638376200,
                    nautical: 1638378420,
                  },
                },
                timezone: {
                  name: 'Europe/Paris',
                  now_in_dst: 0,
                  offset_sec: 3600,
                  offset_string: '+0100',
                  short_name: 'CET',
                },
                what3words: {
                  words: 'winters.saga.pelting',
                },
              },
              bounds: {
                northeast: {
                  lat: 45.8507196,
                  lng: 5.0842104,
                },
                southwest: {
                  lat: 45.8501639,
                  lng: 5.0803967,
                },
              },
              components: {
                'ISO_3166-1_alpha-2': 'FR',
                'ISO_3166-1_alpha-3': 'FRA',
                _category: 'road',
                _type: 'road',
                continent: 'Europe',
                country: 'France',
                country_code: 'fr',
                county: 'Ain',
                municipality: 'Bourg-en-Bresse',
                political_union: 'European Union',
                postcode: '01120',
                region: 'Metropolitan France',
                road: 'Chemin de Saint-Maurice-de-Gourdans',
                road_type: 'residential',
                state: 'Auvergne-Rhône-Alpes',
                state_code: 'ARA',
                village: 'Dagneux',
              },
              confidence: 9,
              formatted: 'Chemin de Saint-Maurice-de-Gourdans, 01120 Dagneux, France',
            },
            type: 'Feature',
          },
        ],
      })
    })
  })

  describe('getFetchArgs', () => {
    it('produce correct argument for a simple search', () => {
      const params: OpenCageGeocodeRequestParams = {
        q: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        key: 'abcabc',
      }

      const searchParams = new URLSearchParams({
        q: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        key: 'abcabc',
      })
      searchParams.sort()

      const { url, options } = getFetchArgs(params)
      expect(options).toStrictEqual({ method: 'GET' })
      expect(url).toEqual(`${opencageBaseUrl}?${searchParams}`)
    })

    it('produce correct argument for a complex search', () => {
      const params: OpenCageGeocodeRequestParams = {
        q: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        key: 'abcabc',
        language: 'fr',

        abbrv: 1,
        bounds: '-6.06445,42.09822,8.61328,51.12421',
      }

      const searchParams = new URLSearchParams({
        q: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        key: 'abcabc',
        language: 'fr',

        abbrv: '1',
        bounds: '-6.06445,42.09822,8.61328,51.12421',
      })
      searchParams.sort()

      const { url, options } = getFetchArgs(params)
      expect(options).toStrictEqual({ method: 'GET' })
      expect(url).toEqual(`${opencageBaseUrl}?${searchParams}`)
    })

    it('converts bounds from an array of points to a valid string value', () => {
      const params: OpenCageGeocodeRequestParams = {
        q: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        key: 'abcabc',
        language: 'fr',

        abbrv: 1,
        bounds: [-6.06445, 42.09822, 8.61328, 51.12421],
      }

      const searchParams = new URLSearchParams({
        q: '1600 Amphitheatre Parkway, Mountain View, CA 94043, USA',
        key: 'abcabc',
        language: 'fr',

        abbrv: '1',
        bounds: '-6.06445,42.09822,8.61328,51.12421',
      })
      searchParams.sort()

      const { url, options } = getFetchArgs(params)
      expect(options).toStrictEqual({ method: 'GET' })
      expect(url).toEqual(`${opencageBaseUrl}?${searchParams}`)
    })
  })

  describe('geocode', () => {
    // TODO: add tests with mocked response
  })
})
