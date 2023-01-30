# @p-j/geocodejson-types

## 4.1.0

### Minor Changes

- [#82](https://github.com/p-j/geocodejson/pull/82) [`c4c006c`](https://github.com/p-j/geocodejson/commit/c4c006c5d7012406557d21c51be46bab7bfbb039) Thanks [@p-j](https://github.com/p-j)! - # Changelog

  Adding `confidence` as an optional member of the `geocoding` namespace

## 4.0.1

### Patch Changes

- [`c2f7389`](https://github.com/p-j/geocodejson/commit/c2f7389c3a199f1e187e23fa1450587181edad1a) Thanks [@p-j](https://github.com/p-j)! - Upgrade dependencies

## 4.0.0

### Major Changes

- [#76](https://github.com/p-j/geocodejson/pull/76) [`a4b0aae`](https://github.com/p-j/geocodejson/commit/a4b0aae23c23c67a4eec8bb4e930d2d75a09338b) Thanks [@p-j](https://github.com/p-j)! - open ended types

  types are more composable
  the geocoder response may contain extra data provided by the original source while preserving a subset of common properties

## 3.0.1

### Patch Changes

- [#58](https://github.com/p-j/geocodejson/pull/58) [`7c8d0a7`](https://github.com/p-j/geocodejson/commit/7c8d0a799d6b7de4bbacbf0d073aa04df840e9ac) Thanks [@p-j](https://github.com/p-j)! - Googleapis Provider v3

  - use official types & serializer
  - handle all native options
  - upgrade to @p-j/geocodejson-types v3
  - remove obsolete google.maps.d.ts

## 3.0.0

### Major Changes

- [#60](https://github.com/p-j/geocodejson/pull/60) [`1737aca`](https://github.com/p-j/geocodejson/commit/1737acad66a30946e9476b6522a78fc1f1579d5f) Thanks [@p-j](https://github.com/p-j)! - Update Shared Types

  - make all GeocodeOptions members optional
  - better follow the geocodejson spec by allowing multiple licence & attribution

## 2.0.1

### Patch Changes

- [#53](https://github.com/p-j/geocodejson/pull/53) [`ae9aa39`](https://github.com/p-j/geocodejson/commit/ae9aa39f0a769babc3ea9bcb5016dcca125cd1f3) Thanks [@p-j](https://github.com/p-j)! - feat(types): export parameter types

* [#55](https://github.com/p-j/geocodejson/pull/55) [`d0a36b6`](https://github.com/p-j/geocodejson/commit/d0a36b6426e9c41bc2f9b209e388290cd1fd1f1c) Thanks [@p-j](https://github.com/p-j)! - chore(deps): upgrade dependencies

## 2.0.0

### Major Changes

- [`f1bf20e`](https://github.com/p-j/geocodejson/commit/f1bf20e4f8a248ddbbfb28ac229a73b030e3c376) [#20](https://github.com/p-j/geocodejson/pull/20) Thanks [@p-j](https://github.com/p-j)! - BREAKING: changing GeocodeResult.properties.geocoding.housenumber type from string | number to string

## 1.0.0

### Major Changes

- [`b15c904`](https://github.com/p-j/geocodejson/commit/b15c90478e876d34c05cd0cddf0635d07d30f0a0) [#1](https://github.com/p-j/geocodejson/pull/1) Thanks [@p-j](https://github.com/p-j)! - GeocodeJSON Types first release including types according to the [spec draft](https://github.com/geocoders/geocodejson-spec/tree/master/draft) and a type interface for Google Geocoding API
