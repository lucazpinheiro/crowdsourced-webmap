const data = [
  {
    content: {
      date: 'some day',
      popupContent: 'something to say',
    },
    layer: {
      type: 'point',
      coords: { lat: -27.594717707186042, lng: -48.54961395263671 },
    },
  },
  {
    content: {
      popupContent: 'hora da verdade',
    },
    layer: {
      type: 'polygon',
      coords: [
        { lng: -48.50017547607422, lat: -27.586502149431414 },
        { lng: -48.509788513183594, lat: -27.60627930099381 },
        { lng: -48.487815856933594, lat: -27.59745608962857 },
        { lng: -48.50017547607422, lat: -27.586502149431414 },
      ],
    },
  },
];


const test = [
  {
    type: 'Feature',
    properties: {
      date: 'some day',
      popupContent: 'something to say',
    },
    geometry: {
      type: 'Point',
      coordinates: [
        -48.54961395263671,
        -27.594717707186042,
      ],
    },
  },
  {
    type: 'Feature',
    properties: {
      popupContent: 'test',
    },
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [
            -48.50017547607422,
            -27.586502149431414,
          ],
          [
            -48.509788513183594,
            -27.60627930099381,
          ],
          [
            -48.487815856933594,
            -27.59745608962857,
          ],
          [
            -48.50017547607422,
            -27.586502149431414,
          ],
        ],
      ],
    },
  },
];


module.exports.data = data;
module.exports.test = test;
