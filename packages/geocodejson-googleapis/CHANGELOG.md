# @p-j/geocodejson-googleapis

## 4.0.3

### Patch Changes

- [#103](https://github.com/p-j/geocodejson/pull/103) [`3fbe5b6`](https://github.com/p-j/geocodejson/commit/3fbe5b6f0d9445b239bf352c3cced979685ac4ca) Thanks [@p-j](https://github.com/p-j)! - dependencies upgrade

- Updated dependencies [[`3fbe5b6`](https://github.com/p-j/geocodejson/commit/3fbe5b6f0d9445b239bf352c3cced979685ac4ca)]:
  - @p-j/geocodejson-types@4.1.2

## 4.0.2

### Patch Changes

- [#95](https://github.com/p-j/geocodejson/pull/95) [`7a499aa`](https://github.com/p-j/geocodejson/commit/7a499aa00a3559a0db28ab056f8de9e0351497e9) Thanks [@p-j](https://github.com/p-j)! - Make `@p-j/geocodejson-types` a dependency.

- Updated dependencies [[`7a499aa`](https://github.com/p-j/geocodejson/commit/7a499aa00a3559a0db28ab056f8de9e0351497e9)]:
  - @p-j/geocodejson-types@4.1.1

## 4.0.1

### Patch Changes

- [#87](https://github.com/p-j/geocodejson/pull/87) [`3e5f744`](https://github.com/p-j/geocodejson/commit/3e5f7442c978a4ca643b439f225c6bc48107318b) Thanks [@renovate](https://github.com/apps/renovate)! - Dependencies upgrade

## 4.0.0

### Major Changes

- [#82](https://github.com/p-j/geocodejson/pull/82) [`c4c006c`](https://github.com/p-j/geocodejson/commit/c4c006c5d7012406557d21c51be46bab7bfbb039) Thanks [@p-j](https://github.com/p-j)! - # Changelog

  Adding `confidence` as an optional member of the `geocoding` namespace

  **BREAKING:** The `accuracy` member of the `geocoding` namespace has been removed from the parsed result.
  It is replaced by a loosly mapped `confidence` based on the result type.

### Patch Changes

- [#84](https://github.com/p-j/geocodejson/pull/84) [`5c121d6`](https://github.com/p-j/geocodejson/commit/5c121d67d76e885b4bb16200a8a6b633c0c3af22) Thanks [@p-j](https://github.com/p-j)! - Update dependencies

## 3.1.3

### Patch Changes

- [`c2f7389`](https://github.com/p-j/geocodejson/commit/c2f7389c3a199f1e187e23fa1450587181edad1a) Thanks [@p-j](https://github.com/p-j)! - Upgrade dependencies

## 3.1.2

### Patch Changes

- [#78](https://github.com/p-j/geocodejson/pull/78) [`d8eefc5`](https://github.com/p-j/geocodejson/commit/d8eefc5ec3d03ee6ea0f7b94daf7c28abc2e2813) Thanks [@p-j](https://github.com/p-j)! - Uses the new types accross all packages

  - Opencage & BAN adapters returns more data than the strict GeocodeJSON-spec related ones
  - BAN response now contains the geohash as well
  - Opencage response doesn't use the confidence score as accuracy anymore as this was a mistake (accuracy is supposed to be a margin of error in meters)

## 3.1.1

### Patch Changes

- [#70](https://github.com/p-j/geocodejson/pull/70) [`ef981ef`](https://github.com/p-j/geocodejson/commit/ef981efbffc2c509f568921e8bb3a90c57a64372) Thanks [@p-j](https://github.com/p-j)! - Recognize the key parameters for getFetchArgs
  Ensure at least one of apiKey and key is given to geocode

## 3.1.0

### Minor Changes

- [#68](https://github.com/p-j/geocodejson/pull/68) [`239d610`](https://github.com/p-j/geocodejson/commit/239d61029e19f845165847510c32b9e2c23498db) Thanks [@p-j](https://github.com/p-j)! - Allow for filtering out partial match returned by Google API

## 3.0.2

### Patch Changes

- [#65](https://github.com/p-j/geocodejson/pull/65) [`e6b2051`](https://github.com/p-j/geocodejson/commit/e6b2051d28a457509784f007b3ea7dc20276fd04) Thanks [@p-j](https://github.com/p-j)! - fix type conflict by omiting the deprecated PremiumPlan type from Google Maps Services types

## 3.0.1

### Patch Changes

- [#57](https://github.com/p-j/geocodejson/pull/57) [`67c61e7`](https://github.com/p-j/geocodejson/commit/67c61e73081910a282f5068d56ccf4e9ac556a05) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies

## 3.0.0

### Major Changes

- [#58](https://github.com/p-j/geocodejson/pull/58) [`7c8d0a7`](https://github.com/p-j/geocodejson/commit/7c8d0a799d6b7de4bbacbf0d073aa04df840e9ac) Thanks [@p-j](https://github.com/p-j)! - Googleapis Provider v3

  - use official types & serializer
  - handle all native options
  - upgrade to @p-j/geocodejson-types v3
  - remove obsolete google.maps.d.ts

## 2.0.2

### Patch Changes

- [#53](https://github.com/p-j/geocodejson/pull/53) [`ae9aa39`](https://github.com/p-j/geocodejson/commit/ae9aa39f0a769babc3ea9bcb5016dcca125cd1f3) Thanks [@p-j](https://github.com/p-j)! - feat(types): export parameter types

* [#55](https://github.com/p-j/geocodejson/pull/55) [`d0a36b6`](https://github.com/p-j/geocodejson/commit/d0a36b6426e9c41bc2f9b209e388290cd1fd1f1c) Thanks [@p-j](https://github.com/p-j)! - chore(deps): upgrade dependencies

## 2.0.1

### Patch Changes

- [`60c1934`](https://github.com/p-j/geocodejson/commit/60c193428c95412ac6f0b77d92f3a9a20735d96d) Thanks [@p-j](https://github.com/p-j)! - Change @p-j/geocodejson-types version range

## 2.0.0

### Major Changes

- [`9c7cb25`](https://github.com/p-j/geocodejson/commit/9c7cb25121ce03aae0b7a249ca5e70be3e468fd4) [#18](https://github.com/p-j/geocodejson/pull/18) Thanks [@p-j](https://github.com/p-j)! - BREAKING: Changed exposed type from GeocoderResponse to GoogleAPIResponse to disambiguate
  NEW: added getFetchArgs function to expose fetch parameters
  DOC: added documentation for @p-j/geocodejson-googleapis

## 1.0.0

### Major Changes

- [`b15c904`](https://github.com/p-j/geocodejson/commit/b15c90478e876d34c05cd0cddf0635d07d30f0a0) [#1](https://github.com/p-j/geocodejson/pull/1) Thanks [@p-j](https://github.com/p-j)! - First release of the GeocodeJSON adapter for Google Geocoding API
