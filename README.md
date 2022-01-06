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

## GeocodeJSON packages

| Package                                                                                                       | Version                                                                                                                                         | Changelog                                                                                                                                  |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@p-j/geocodejson-googleapis`](https://github.com/p-j/geocodejson/tree/main/packages/geocodejson-googleapis) | [![version](https://img.shields.io/npm/v/@p-j/geocodejson-googleapis?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-googleapis) | [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-googleapis) |
| [`@p-j/geocodejson-here`](#)                                                                                  | _Coming soon_                                                                                                                                   |                                                                                                                                            |
| [`@p-j/geocodejson-opencage`](https://github.com/p-j/geocodejson/tree/main/packages/geocodejson-opencage)     | [![version](https://img.shields.io/npm/v/@p-j/geocodejson-opencage?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-opencage)     | [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-opencage)   |
| [`@p-j/geocodejson-ban`](https://github.com/p-j/geocodejson/tree/main/packages/geocodejson-ban)               | [![version](https://img.shields.io/npm/v/@p-j/geocodejson-ban?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-ban)               | [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-ban)        |
| [`@p-j/geocodejson-mimirsbrunn`](#)                                                                           | _Coming soon_                                                                                                                                   |                                                                                                                                            |
| [`@p-j/geocodejson-types`](https://github.com/p-j/geocodejson/tree/main/packages/geocodejson-types)           | [![version](https://img.shields.io/npm/v/@p-j/geocodejson-types?style=flat-square)](https://npmjs.com/package/@p-j/geocodejson-types)           | [![changelog](https://img.shields.io/badge/changelog-%2B-lightgrey?style=flat-square)](https://changelogs.xyz/@p-j/geocodejson-types)      |

## Usage

Each provider package export 2 main functions:

- `geocode`: call the API with your input and options and get the raw response from the API
- `parse`: parse the rew response from the API and returned a properly formatted GeocodeJSON response equivalent

Refer to each packages README for a list of options linked to the underlying API capabilities.

## Roadmap

_aka: TODO_

- Implement more providers (Here & Mimirsbrunn are top priorities)
- Define a unified format for options for all suppoerted providers (eg: filtering, biasing, language etc...)
- Add reverse geocoding
- Add autocomplete
- Add feature details endpoint (aka: place details)

## Inpiration

This package was inspired by the [`geocodejson-spec`](https://github.com/geocoders/geocodejson-spec/tree/master/draft), [`geocoder-geojson`](https://github.com/DenisCarriere/geocoder-geojson#readme), [`geo-coder`](https://github.com/allenhwkim/geo-coder) and [`node-geocoder`](https://github.com/nchaulet/node-geocoder)

## Why another geocoder then?

The list or prerequisite for this project was as follow:

- Work as closely as possible with standard format (GeoJSON / GeocodeJSON) for interoperability and compatibility with other tools
- Make it extensible, avoid packaging everything in one big package
- Make it composable, expose raw output from geocoding API to allow manipulation, data extraction or caching, expose prepared query arguments to be used with any fetch/http library
- Make it fully typed to help with coding & documentation
- Make it isomorphic: usable in the browser, on the server or in environment like Cloudflare Workers

None of the projects I've found allowed for all those options, and none had an easy way of being built upon to propose the same added value, so here we are.

## License

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fp-j%2Fgeocodejson?ref=badge_large)
