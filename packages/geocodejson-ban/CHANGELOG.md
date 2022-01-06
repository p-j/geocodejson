# @p-j/geocodejson-ban

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
