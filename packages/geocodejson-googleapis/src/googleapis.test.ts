import { parse, geocode } from './googleapis'
import * as fixtures from './__fixtures__/googleapis'

describe('geocodejson-googleapis', () => {
  describe('parse', () => {
    it('converts google examples correctly', async () => {
      expect(geocode).toBeDefined()
      expect(parse).toBeDefined()
      Object.entries(fixtures).map(([key, value]) => {
        const p = parse(value.results as google.maps.GeocoderResult[])
        console.log(key, JSON.stringify(p, null, 2))
      })
    })
  })
})
