import { BANGeocodeResponse } from '..'

export const streetType: BANGeocodeResponse = {
  type: 'FeatureCollection',
  version: 'draft',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.365475, 48.867039],
      },
      properties: {
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
  ],
  attribution: 'BAN',
  licence: 'ETALAB-2.0',
  query: 'place de la république paris',
  limit: 1,
}

export const houseNumberType: BANGeocodeResponse = {
  type: 'FeatureCollection',
  version: 'draft',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.124989, 48.799456],
      },
      properties: {
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
  ],
  attribution: 'BAN',
  licence: 'ETALAB-2.0',
  query: '4 Rue du Général Leclerc, 78000 Versailles, France',
  limit: 1,
}

export const municipalityType: BANGeocodeResponse = {
  type: 'FeatureCollection',
  version: 'draft',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [2.347, 48.859],
      },
      properties: {
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
  ],
  attribution: 'BAN',
  licence: 'ETALAB-2.0',
  query: 'Paris',
  limit: 1,
}

export const localityType: BANGeocodeResponse = {
  type: 'FeatureCollection',
  version: 'draft',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [6.566823, 44.938617],
      },
      properties: {
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
  ],
  attribution: 'BAN',
  licence: 'ETALAB-2.0',
  query: 'Pré Rura 05240 La Salle-les-Alpes',
  limit: 1,
}
