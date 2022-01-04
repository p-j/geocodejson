# @p-j/geocodejson-googleapis

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
