# @p-j/geocodejson-opencage

## 1.2.4

### Patch Changes

- [`9a7a413`](https://github.com/p-j/geocodejson/commit/9a7a4139459aa7ff092a965b4ded115ceabd33d6) Thanks [@p-j](https://github.com/p-j)! - Depencies upgrade

- Updated dependencies [[`9a7a413`](https://github.com/p-j/geocodejson/commit/9a7a4139459aa7ff092a965b4ded115ceabd33d6)]:
  - @p-j/geocodejson-types@4.1.3

## 1.2.3

### Patch Changes

- [#103](https://github.com/p-j/geocodejson/pull/103) [`3fbe5b6`](https://github.com/p-j/geocodejson/commit/3fbe5b6f0d9445b239bf352c3cced979685ac4ca) Thanks [@p-j](https://github.com/p-j)! - dependencies upgrade

- Updated dependencies [[`3fbe5b6`](https://github.com/p-j/geocodejson/commit/3fbe5b6f0d9445b239bf352c3cced979685ac4ca)]:
  - @p-j/geocodejson-types@4.1.2

## 1.2.2

### Patch Changes

- [#95](https://github.com/p-j/geocodejson/pull/95) [`7a499aa`](https://github.com/p-j/geocodejson/commit/7a499aa00a3559a0db28ab056f8de9e0351497e9) Thanks [@p-j](https://github.com/p-j)! - Make `@p-j/geocodejson-types` a dependency.

- Updated dependencies [[`7a499aa`](https://github.com/p-j/geocodejson/commit/7a499aa00a3559a0db28ab056f8de9e0351497e9)]:
  - @p-j/geocodejson-types@4.1.1

## 1.2.1

### Patch Changes

- [#87](https://github.com/p-j/geocodejson/pull/87) [`3e5f744`](https://github.com/p-j/geocodejson/commit/3e5f7442c978a4ca643b439f225c6bc48107318b) Thanks [@renovate](https://github.com/apps/renovate)! - Dependencies upgrade

## 1.2.0

### Minor Changes

- [#82](https://github.com/p-j/geocodejson/pull/82) [`c4c006c`](https://github.com/p-j/geocodejson/commit/c4c006c5d7012406557d21c51be46bab7bfbb039) Thanks [@p-j](https://github.com/p-j)! - # Changelog

  Adding `confidence` as an optional member of the `geocoding` namespace

  - `opencage.parse` return type now provide types for Opencage's specific properties.
  - the confidence is derived from Opencage's confidence score and mapped to a 0-1 interval.

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

## 1.0.1

### Patch Changes

- [#72](https://github.com/p-j/geocodejson/pull/72) [`a44ec1d`](https://github.com/p-j/geocodejson/commit/a44ec1da062fa5075a8f8240c35784ab3d5c9301) Thanks [@p-j](https://github.com/p-j)! - - ensure proper parameter priority in the geocode function
  - fix type to ensure an API Key is provided

## 1.0.0

### Major Changes

- [#59](https://github.com/p-j/geocodejson/pull/59) [`acba29d`](https://github.com/p-j/geocodejson/commit/acba29da14baa00dc3ee8c098e5e442b47e49bf1) Thanks [@p-j](https://github.com/p-j)! - OpenCage Provider

### Patch Changes

- [#57](https://github.com/p-j/geocodejson/pull/57) [`67c61e7`](https://github.com/p-j/geocodejson/commit/67c61e73081910a282f5068d56ccf4e9ac556a05) Thanks [@renovate](https://github.com/apps/renovate)! - chore(deps): update all dependencies
