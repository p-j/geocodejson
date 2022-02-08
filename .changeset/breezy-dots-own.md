---
'@p-j/geocodejson-googleapis': major
'@p-j/geocodejson-ban': minor
'@p-j/geocodejson-opencage': minor
'@p-j/geocodejson-types': minor
---

# Changelog

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
