---
'@p-j/geocodejson-ban': minor
'@p-j/geocodejson-opencage': minor
'@p-j/geocodejson-googleapis': patch
---

Uses the new types accross all packages

- Opencage & BAN adapters returns more data than the strict GeocodeJSON-spec related ones
- BAN response now contains the geohash as well
- Opencage response doesn't use the confidence score as accuracy anymore as this was a mistake (accuracy is supposed to be a margin of error in meters)
