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

## `@p-j/geocodejson-ban`

[![version](https://img.shields.io/npm/v/@p-j/geocodejson-ban?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-ban) [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-ban)

> Geocode & format to GeocodeJSON using the French "Base Adresse Nationale" API

### Usage

```ts
import { geocode, parse, getFetchArgs } from '@p-j/geocodejson-ban'

// if you want to use your own fetch wrapper / http library
const { url, options } = getFetchArgs({
  q: 'Place de la République, Paris, France',
  limit: 1,
  postcode: '75011',
})
// url = 'https://api-adresse.data.gouv.fr/search?limit=1&postcode=75011&q=Place+de+la+R%C3%A9publique,+Paris,+France'
// options = { method: 'GET' }

// using cross-fetch; also adds the "query" property to the response
const rawResponseFromBANApi = await geocode({
  address: 'Place de la République, Paris, France',
  limit: 1,
})
// {
//   type: 'FeatureCollection',
//   version: 'draft',
//   attribution: 'BAN',
//   licence: 'ETALAB-2.0',
//   query: 'Place de la République, Paris, France',
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.365475, 48.867039],
//       },
//       properties: {
//         label: 'Place de la République 75011 Paris',
//         score: 0.9670254545454545,
//         id: '75111_8159',
//         name: 'Place de la République',
//         postcode: '75011',
//         citycode: '75111',
//         x: 653452.35,
//         y: 6863188.08,
//         city: 'Paris',
//         district: 'Paris 11e Arrondissement',
//         context: '75, Paris, Île-de-France',
//         type: 'street',
//         importance: 0.63728,
//       },
//     },
//   ],
//   limit: 1,
// }

const geocodeJSONFormatedResults = parse(rawResponseFromOpenCageApis)
// {
//   type: 'FeatureCollection',
//   geocoding: {
//     version: 'draft',
//     attribution: 'BAN',
//     licence: 'ETALAB-2.0',
//     query: 'place de la république paris',
//   },
//   features: [
//     {
//       type: 'Feature',
//       geometry: {
//         type: 'Point',
//         coordinates: [2.365475, 48.867039],
//       },
//       properties: {
//         geocoding: {
//           label: 'Place de la République 75011 Paris',
//           score: 0.9670254545454545,
//           id: '75111_8159',
//           name: 'Place de la République',
//           postcode: '75011',
//           citycode: '75111',
//           x: 653452.35,
//           y: 6863188.08,
//           city: 'Paris',
//           district: 'Paris 11e Arrondissement',
//           context: '75, Paris, Île-de-France',
//           type: 'street',
//           importance: 0.63728,
//         },
//       },
//     },
//   ],
//   limit: 1,
// }
```
