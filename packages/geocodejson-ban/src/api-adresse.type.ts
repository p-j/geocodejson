import type { JSONObject } from '@p-j/geocodejson-types'
import type { Point, FeatureCollection } from 'geojson'

export type BANGeocodeRequestParams = {
  q: string
  limit?: number
  autocomplete?: 0 | 1
  type?: 'housenumber' | 'street' | 'locality' | 'municipality'
  lat?: number
  lon?: number
  citycode?: string
  postcode?: string
}

export interface BANGeocodeResponse extends FeatureCollection<Point, BANProperties> {
  version: string
  attribution: string
  licence: string
  query?: string
  limit?: number
  filters?: Record<string, string>
}

export interface BANProperties extends JSONObject {
  label: string
  score: number
  housenumber?: string
  id: string
  type: string
  name: string
  postcode: string
  citycode: string
  x: number
  y: number
  city: string
  district?: string
  context: string
  importance: number
  street?: string
  population?: number // Returned when matching a municipality
}
