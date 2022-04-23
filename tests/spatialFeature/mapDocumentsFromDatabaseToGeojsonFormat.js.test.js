import { describe, test, expect } from '@jest/globals'
import mapDocumentsFromDatabaseToGeojsonFormat from '../../src/spatialFeature/mapDocumentsFromDatabaseToGeojsonFormat.js'

describe('geometryParser', () => {
  test('mapDocumentsFromDatabaseToGeojsonFormat', () => {
    const documentMock = [{
      enabled: true,
      _id: '112233',
      description: 'aaaa bbbb cccc dddd',
      coordinates: {
        lat: -27.35,
        long: -48.32
      },
      type: 'point'
    }]

    const mockGeometryParser = (coordinates, type) => {
      return {
        type: 'Point',
        coordinates: [
          -48.32,
          -27.35
        ]
      }
    }

    expect(mapDocumentsFromDatabaseToGeojsonFormat(documentMock, mockGeometryParser))
      .toEqual([{
        type: 'Feature',
        properties: {
          id: '112233',
          description: 'aaaa bbbb cccc dddd',
          enabled: true
        },
        geometry: {
          type: 'Point',
          coordinates: [
            -48.32,
            -27.35
          ]
        }
      }])
  })
})
