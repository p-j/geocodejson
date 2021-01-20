import { parse, geocode, GoogleGeocoderResponse } from './googleapis'
import * as fixtures from './__fixtures__/googleapis'

const jsonLog = (obj: Object, name?: string) => console.log(name, JSON.stringify(obj, null, 2))

describe('geocodejson-googleapis', () => {
  describe('parse', () => {
    it('converts google examples correctly', async () => {
      expect(geocode).toBeDefined()
      expect(parse).toBeDefined()

      // const g = await geocode("6 rue de l'Abbé Grégoire 92130 Issy les moulineaux", {
      //   bounds: { northeast: { lat: 48.83, lng: 2.28 }, southwest: { lat: 48.81, lng: 2.26 } },
      //   componentRestrictions: { postalCode: '92130' },
      //   region: 'fr',
      // })

      // jsonLog(g)
      // jsonLog(parse(g.results))

      Object.entries(fixtures).map(([key, value]) => {
        const p = parse(value as GoogleGeocoderResponse)
        jsonLog(p, key)
      })
    })
  })
})
