import { describe, test, expect } from '@jest/globals'
import geometryParser from '../../src/spatialFeature/geometryParser.js'

describe('geometryParser', () => {
  test('should parse a geometry of type: \'point\'', () => {
    const mockType = 'point'
    const mockCoordinates = {
      lat: -27.35,
      long: -48.32
    }
    const parsedGeometry = geometryParser(mockCoordinates, mockType)
    expect(parsedGeometry).toEqual({
      type: 'Point',
      coordinates: [-48.32, -27.35]
    })
  })

  test('should parse a geometry of type \'polygon\'', () => {
    const mockType = 'polygon'
    const mockCoordinates = [
      { long: -48.52, lat: -27.66 },
      { long: -48.54, lat: -27.67 },
      { long: -48.52, lat: -27.67 }
    ]
    const parsedGeometry = geometryParser(mockCoordinates, mockType)
    expect(parsedGeometry).toEqual({
      type: 'Polygon',
      coordinates: [
        [
          [-48.52, -27.66],
          [-48.54, -27.67],
          [-48.52, -27.67],
          [-48.52, -27.66]
        ]
      ]
    })
  })
})
