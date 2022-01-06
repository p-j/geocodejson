import type { OpenCageGeoJSONResponse } from '../opencage.types'

export const attractionType: OpenCageGeoJSONResponse = {
  documentation: 'https://opencagedata.com/api',
  features: [
    {
      geometry: {
        coordinates: [2.36395835522559, 48.86754205],
        type: 'Point',
      },
      properties: {
        bounds: {
          northeast: {
            lat: 48.8684016,
            lng: 2.3653731,
          },
          southwest: {
            lat: 48.8666808,
            lng: 2.3626022,
          },
        },
        components: {
          'ISO_3166-1_alpha-2': 'FR',
          'ISO_3166-1_alpha-3': 'FRA',
          _category: 'travel/tourism',
          _type: 'attraction',
          attraction: 'Place de la République',
          city: 'Paris',
          city_block: 'Quartier des Enfants-Rouges',
          city_district: 'Paris',
          continent: 'Europe',
          country: 'France',
          country_code: 'fr',
          political_union: 'European Union',
          postcode: '75003',
          region: 'Metropolitan France',
          road: 'Rue du Temple',
          state: 'Ile-de-France',
          state_code: 'IDF',
          suburb: '3rd Arrondissement',
        },
        confidence: 9,
        formatted: 'Place de la République, Rue du Temple, 75003 Paris, France',
      },
      type: 'Feature',
    },
  ],
  licenses: [
    {
      name: 'see attribution guide',
      url: 'https://opencagedata.com/credits',
    },
  ],
  rate: {
    limit: 2500,
    remaining: 2496,
    reset: 1638403200,
  },
  status: {
    code: 200,
    message: 'OK',
  },
  stay_informed: {
    blog: 'https://blog.opencagedata.com',
    twitter: 'https://twitter.com/OpenCage',
  },
  thanks: 'For using an OpenCage API',
  timestamp: {
    created_http: 'Wed, 01 Dec 2021 15:00:37 GMT',
    created_unix: 1638370837,
  },
  total_results: 1,
  type: 'FeatureCollection',
}

export const buildingType: OpenCageGeoJSONResponse = {
  documentation: 'https://opencagedata.com/api',
  features: [
    {
      geometry: {
        coordinates: [2.1247629, 48.7992254],
        type: 'Point',
      },
      properties: {
        bounds: {
          northeast: {
            lat: 48.7992754,
            lng: 2.1248129,
          },
          southwest: {
            lat: 48.7991754,
            lng: 2.1247129,
          },
        },
        components: {
          'ISO_3166-1_alpha-2': 'FR',
          'ISO_3166-1_alpha-3': 'FRA',
          _category: 'building',
          _type: 'building',
          continent: 'Europe',
          country: 'France',
          country_code: 'fr',
          county: 'Yvelines',
          house_number: '4',
          municipality: 'Versailles',
          political_union: 'European Union',
          postcode: '78000',
          region: 'Metropolitan France',
          road: 'Rue du Général Leclerc',
          state: 'Ile-de-France',
          state_code: 'IDF',
          suburb: 'Saint-Louis',
          town: 'Versailles',
        },
        confidence: 10,
        formatted: '4 Rue du Général Leclerc, 78000 Versailles, France',
      },
      type: 'Feature',
    },
  ],
  licenses: [
    {
      name: 'see attribution guide',
      url: 'https://opencagedata.com/credits',
    },
  ],
  rate: {
    limit: 2500,
    remaining: 2492,
    reset: 1638403200,
  },
  status: {
    code: 200,
    message: 'OK',
  },
  stay_informed: {
    blog: 'https://blog.opencagedata.com',
    twitter: 'https://twitter.com/OpenCage',
  },
  thanks: 'For using an OpenCage API',
  timestamp: {
    created_http: 'Wed, 01 Dec 2021 15:21:30 GMT',
    created_unix: 1638372090,
  },
  total_results: 1,
  type: 'FeatureCollection',
}

export const roadType: OpenCageGeoJSONResponse = {
  documentation: 'https://opencagedata.com/api',
  features: [
    {
      geometry: {
        coordinates: [5.0821572, 45.8504215],
        type: 'Point',
      },
      properties: {
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
  licenses: [
    {
      name: 'see attribution guide',
      url: 'https://opencagedata.com/credits',
    },
  ],
  rate: {
    limit: 2500,
    remaining: 2491,
    reset: 1638403200,
  },
  status: {
    code: 200,
    message: 'OK',
  },
  stay_informed: {
    blog: 'https://blog.opencagedata.com',
    twitter: 'https://twitter.com/OpenCage',
  },
  thanks: 'For using an OpenCage API',
  timestamp: {
    created_http: 'Wed, 01 Dec 2021 15:33:53 GMT',
    created_unix: 1638372833,
  },
  total_results: 1,
  type: 'FeatureCollection',
}
