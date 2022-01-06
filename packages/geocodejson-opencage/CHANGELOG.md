# @p-j/geocodejson-opencage

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
