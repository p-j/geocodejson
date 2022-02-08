# @p-j/geocodejson-ban

## 1.2.0

### Minor Changes

- [#82](https://github.com/p-j/geocodejson/pull/82) [`c4c006c`](https://github.com/p-j/geocodejson/commit/c4c006c5d7012406557d21c51be46bab7bfbb039) Thanks [@p-j](https://github.com/p-j)! - # Changelog

  Adding `confidence` as an optional member of the `geocoding` namespace

  ## @p-j/geocodejson-googleapis

  **BREAKING:** The `accuracy` member of the `geocoding` namespace has been removed from the parsed result.
  It is replaced by a loosly mapped `confidence` based on the result type.

  ## @p-j/geocodejson-opencage

  - `opencage.parse` return type now provide types for Opencage's specific properties.
  - the confidence is derived from Opencage's confidence score and mapped to a 0-1 interval.

  ## @p-j/geocodejson-ban

  - the confidence is derived from BAN's score.

  ## @p-j/geocodejson-types

  - added the `confidence` optional member to the `geocoding` namespace

### Patch Changes

- [#84](https://github.com/p-j/geocodejson/pull/84) [`5c121d6`](https://github.com/p-j/geocodejson/commit/5c121d67d76e885b4bb16200a8a6b633c0c3af22) Thanks [@p-j](https://github.com/p-j)! - Update dependencies

## 1.1.1

### Patch Changes

- [`c2f7389`](https://github.com/p-j/geocodejson/commit/c2f7389c3a199f1e187e23fa1450587181edad1a) Thanks [@p-j](https://github.com/p-j)! - Upgrade dependencies

## 1.1.0

### Minor Changes

- [#78](https://github.com/p-j/geocodejson/pull/78) [`d8eefc5`](https://github.com/p-j/geocodejson/commit/d8eefc5ec3d03ee6ea0f7b94daf7c28abc2e2813) Thanks [@p-j](https://github.com/p-j)! - Uses the new types accross all packages

  - Opencage & BAN adapters returns more data than the strict GeocodeJSON-spec related ones
  - BAN response now contains the geohash as well
  - Opencage response doesn't use the confidence score as accuracy anymore as this was a mistake (accuracy is supposed to be a margin of error in meters)

## 1.0.0

### Major Changes

- [#74](https://github.com/p-j/geocodejson/pull/74) [`f907fe2`](https://github.com/p-j/geocodejson/commit/f907fe2c097678f9dac744f39a0eac2ecb0b03bd) Thanks [@p-j](https://github.com/p-j)! - Adapter for the french "Base Adresse Nationale" API

  Initial release
