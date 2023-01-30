# GeocodeJSON

> GeocodeJSON packages are a collection of small utility to work with geocoding API such as _Google Geocoding API_, _HERE Geocoding API_, _Opencage_, etc... As well as self hosted solution like [Mimirsbrunn](https://github.com/CanalTP/mimirsbrunn).
>
> These packages provide a simple inteface for geocoding addresses exposing the underlying APIs filtering capabilities while returning all response in a standard format: [GeocodeJSON](https://github.com/geocoders/geocodejson-spec/tree/master/draft),
> a [GeoJSON](https://tools.ietf.org/html/rfc7946) extension.
>
> These packages leverage [`cross-fetch`](https://github.com/lquixada/cross-fetch) to work on both backend & frontend

[![lerna](https://img.shields.io/badge/build%20with-lerna-cc00ff?style=flat-square)](https://lerna.js.org/)
[![lerna](https://img.shields.io/badge/released%20with-changeset-blue?style=flat-square)](https://github.com/atlassian/changesets/)
[![codecov](https://img.shields.io/codecov/c/github/p-j/geocodejson?style=flat-square)](https://codecov.io/gh/p-j/geocodejson)
[![Build Status](https://img.shields.io/github/actions/workflow/status/p-j/geocodejson/build.yml?branch=main&style=flat-square)](https://github.com/p-j/geocodejson/actions?query=workflow%3ABuild)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson?ref=badge_shield)

## `@p-j/geocodejson-googleapis`

[![version](https://img.shields.io/npm/v/@p-j/geocodejson-googleapis?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-googleapis) [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-googleapis)

> Geocode & format to GeocodeJSON using Google Geocoding API

### Usage

```ts
import { geocode, parse, getFetchArgs } from '@p-j/geocodejson-googleapis'

// if you want to use your own fetch wrapper / http library
const { url, options } = getFetchArgs({
  apiKey: 'YOUR-GOOGLE-API-KEY-HERE',
  address: 'Place de la République, Paris, France',
  language: 'fr',
  bounds: {
    northeast: { lat: 48.8689734302915, lng: 2.3657448 },
    southwest: { lat: 48.8662754697085, lng: 2.3622065 },
  },
  componentRestrictions: { locality: 'Paris', country: 'FR' },
})
// url = 'https://maps.googleapis.com/maps/api/geocode/json?address=Place+de+la+R%C3%A9publique%2C+Paris%2C+France&bounds=48.8689734302915%2C2.3657448%7C48.8662754697085%2C2.3622065&components=locality%3AParis%7Ccountry%3AFR&key=YOUR-GOOGLE-API-KEY-HERE&language=fr'
// options = { method: 'GET' }

// using cross-fetch; also adds the "query" property to the response
const rawResponseFromGoogleApis = await geocode({
  apiKey: 'YOUR-GOOGLE-API-KEY-HERE',
  address: 'Place de la République, Paris, France',
  language: 'fr',
  filters: {
    bounds: {
      northeast: { lat: 48.8689734302915, lng: 2.3657448 },
      southwest: { lat: 48.8662754697085, lng: 2.3622065 },
    },
    componentRestrictions: { locality: 'Paris', country: 'FR' },
  },
})
// {
//   "results": [
//     {
//       "address_components": [
//         {
//           "long_name": "Place de la République",
//           "short_name": "Place de la République",
//           "types": ["route"]
//         },
//         {
//           "long_name": "Paris",
//           "short_name": "Paris",
//           "types": ["locality", "political"]
//         },
//         {
//           "long_name": "Département de Paris",
//           "short_name": "Département de Paris",
//           "types": ["administrative_area_level_2", "political"]
//         },
//         {
//           "long_name": "Île-de-France",
//           "short_name": "IDF",
//           "types": ["administrative_area_level_1", "political"]
//         },
//         {
//           "long_name": "France",
//           "short_name": "FR",
//           "types": ["country", "political"]
//         }
//       ],
//       "formatted_address": "Place de la République, Paris, France",
//       "geometry": {
//         "bounds": { "northeast": { "lat": 48.8687564, "lng": 2.3657448 }, "southwest": { "lat": 48.8664925, "lng": 2.3622065 } },
//         "location": { "lat": 48.8673936, "lng": 2.3634144 },
//         "location_type": "GEOMETRIC_CENTER",
//         "viewport": { "northeast": { "lat": 48.8689734302915, "lng": 2.3657448 }, "southwest": { "lat": 48.8662754697085, "lng": 2.3622065 } }
//       },
//       "place_id": "ChIJVVCk6Qhu5kcRAWZzEPRM3Kg",
//       "types": ["route"]
//     }
//   ],
//   "status": "OK",
//   "query": "Place de la République, Paris, France"
// }

const geocodeJSONFormatedResults = parse(rawResponseFromGoogleApis)
// {
//   "geocoding": {
//     "version": "0.1.0",
//     "licence": "https://cloud.google.com/maps-platform/terms/#3.-license.",
//     "attribution": "Powered by Google",
//     "query": "Place de la République, Paris, France"
//   },
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "type": "Feature",
//       "bbox": [2.3622065, 48.8662754697085, 2.3657448, 48.8689734302915],
//       "properties": {
//         "geocoding": {
//           "accuracy": 100,
//           "type": "street",
//           "label": "Place de la République, Paris, France",
//           "geohash": "u09wjb0cp",
//           "street": "Place de la République",
//           "city": "Paris",
//           "county": "Département de Paris",
//           "state": "Île-de-France",
//           "country": "France"
//         }
//       },
//       "geometry": {
//         "type": "Point",
//         "coordinates": [2.3634144, 48.8673936]
//       }
//     }
//   ]
// }
```
