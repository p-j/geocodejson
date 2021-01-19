import { parse, geocode } from './googleapis'
import * as fixtures from '../__fixtures__/googleapis'

describe('geocodejson-googleapis', () => {
  describe('parse', () => {
    it('converts google examples correctly', async () => {
      expect(geocode).toBeDefined()
      expect(parse).toBeDefined()
      // const g = await geocode('3 Passage Saint Pierre Amelot 75011 Paris')
      const p = parse(fixtures.defaultResponse.results)
      console.log(JSON.stringify(p, null, 2))
    })
  })
})
