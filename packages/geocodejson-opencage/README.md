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
[![Build Status](https://img.shields.io/github/workflow/status/p-j/geocodejson/Build?style=flat-square)](https://github.com/p-j/geocodejson/actions?query=workflow%3ABuild)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson?ref=badge_shield)

## `@p-j/geocodejson-opencage`

[![version](https://img.shields.io/npm/v/@p-j/geocodejson-opencage?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-opencage) [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-opencage)

> Geocode & format to GeocodeJSON using OpenCage

### Usage

```ts
import { geocode, parse, getFetchArgs } from '@p-j/geocodejson-opencage'

// if you want to use your own fetch wrapper / http library
const { url, options } = getFetchArgs({
  apiKey: 'YOUR-OPENCAGE-API-KEY-HERE',
  address: 'Place de la République, Paris, France',
  language: 'fr',
  bounds: [2.3622065, 48.8662754697085, 2.3657448, 48.8689734302915],
  countrycode: 'FR',
})
// url = 'https://api.opencagedata.com/geocode/v1/geojson?address=Place+de+la+R%C3%A9publique%2C+Paris%2C+France&apiKey=YOUR-OPENCAGE-API-KEY-HERE&bounds=2.3622065%2C48.8662754697085%2C2.3657448%2C48.8689734302915&countrycode=FR&language=fr'
// options = { method: 'GET' }

// using cross-fetch; also adds the "query" property to the response
const rawResponseFromGoogleApis = await geocode({
  apiKey: 'YOUR-GOOGLE-API-KEY-HERE',
  address: 'Place de la République, Paris, France',
  language: 'fr',
  bounds: [2.3622065, 48.8662754697085, 2.3657448, 48.8689734302915],
  countrycode: 'FR',
  limit: 1,
  no_annotations: 1,
  pretty: 1,
})
// {
//   "documentation": "https://opencagedata.com/api",
//   "features": [
//     {
//       "geometry": {
//         "coordinates": [
//           2.36395835522559,
//           48.86754205
//         ],
//         "type": "Point"
//       },
//       "properties": {
//         "bounds": {
//           "northeast": {
//             "lat": 48.8684016,
//             "lng": 2.3653731
//           },
//           "southwest": {
//             "lat": 48.8666808,
//             "lng": 2.3626022
//           }
//         },
//         "components": {
//           "ISO_3166-1_alpha-2": "FR",
//           "ISO_3166-1_alpha-3": "FRA",
//           "_category": "travel/tourism",
//           "_type": "attraction",
//           "attraction": "Place de la République",
//           "city": "Paris",
//           "city_block": "Quartier de la Porte-Saint-Martin",
//           "city_district": "Paris",
//           "continent": "Europe",
//           "country": "France",
//           "country_code": "fr",
//           "political_union": "European Union",
//           "postcode": "75010",
//           "region": "France métropolitaine",
//           "road": "Rue Yves Toudic",
//           "state": "Île-de-France",
//           "state_code": "IDF",
//           "suburb": "Paris 10e Arrondissement"
//         },
//         "confidence": 9,
//         "formatted": "Place de la République, Rue Yves Toudic, 75010 Paris, France"
//       },
//       "type": "Feature"
//     }
//   ],
//   "licenses": [
//     {
//       "name": "see attribution guide",
//       "url": "https://opencagedata.com/credits"
//     }
//   ],
//   "status": {
//     "code": 200,
//     "message": "OK"
//   },
//   "stay_informed": {
//     "blog": "https://blog.opencagedata.com",
//     "twitter": "https://twitter.com/OpenCage"
//   },
//   "thanks": "For using an OpenCage API",
//   "timestamp": {
//     "created_http": "Fri, 03 Dec 2021 16:45:14 GMT",
//     "created_unix": 1638549914
//   },
//   "total_results": 1,
//   "type": "FeatureCollection",
//   "query": "Place de la République, Paris, France"
// }

const geocodeJSONFormatedResults = parse(rawResponseFromGoogleApis)
// {
//   "geocoding": {
//     "version": "0.1.0",
//     "licence": "https://www.opendatacommons.org/licenses/odbl",
//     "attribution": {
//       "OpenStreetMap": "Geodata © OpenStreetMap contributors",
//       "OpenCage": "Geodata provided by OpenCage"
//     },
//     "query": "Place de la République, Paris, France"
//   },
//   "type": "FeatureCollection",
//   "features": [
//     {
//       "geometry": {
//         "coordinates": [
//           2.36395835522559,
//           48.86754205
//         ],
//         "type": "Point"
//       },
//       "properties": {
//         "geocoding": {
//           "accuracy": 9,
//           "type": "attraction",
//           "label": "Place de la République, Rue Yves Toudic, 75010 Paris, France",
//           "geohash": "u09wjb16h",
//           "street": "Rue Yves Toudic",
//           "postcode": "75010",
//           "city": "Paris",
//           "district": "Paris",
//           "state": "Île-de-France",
//           "country": "France"
//         }
//       },
//       "type": "Feature"
//     }
//   ]
// }
```
