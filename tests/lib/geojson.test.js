const geojson = require('../../src/lib/geojson')

describe('geojson module', () => {
  const pointMock = {
    _id: '6178a8ca961f4224f1513438',
    info: 's',
    coords: {
      lat: -27.59471770,
      lng: -48.53382110
    },
    type: 'Point',
    date: '2021-10-27T01:18:02.926Z',
    __v: 0,
    enabled: true
  }

  const polygonMock = {
    _id: '6179ec9767176f3453dc70dc',
    info: 'asa',
    coords: [
      {
        lat: -27.61327651,
        lng: -48.75801086
      },
      {
        lat: -27.64673527,
        lng: -48.76213073
      },
      {
        lat: -27.63943605,
        lng: -48.70994567
      }
    ],
    type: 'Polygon',
    date: '2021-10-28T00:19:35.007Z',
    __v: 0,
    enabled: true
  }

  test('should return a geojson with Point type geometry', () => {
    expect(geojson(pointMock)).toEqual({
      type: 'Feature',
      properties: {
        enabled: true,
        popupContent: 's',
        featId: '6178a8ca961f4224f1513438'
      },
      geometry: {
        coordinates: [
          -48.53382110,
          -27.59471770
        ],
        type: 'Point'
      }
    })
  })

  test('should return a geojson with Polygon type geometry', () => {
    expect(geojson(polygonMock)).toEqual({
      type: 'Feature',
      properties: {
        enabled: true,
        popupContent: 'asa',
        featId: '6179ec9767176f3453dc70dc'
      },
      geometry: {
        coordinates: [
          [
            [
              -48.75801086,
              -27.61327651
            ],
            [
              -48.76213073,
              -27.64673527
            ],
            [
              -48.70994567,
              -27.63943605
            ],
            [
              -48.75801086,
              -27.61327651
            ]
          ]
        ],
        type: 'Polygon'
      }
    })
  })
})
