const data = [
  {
    type: 'Feature',
    properties: {
      date: 'some day',
      popupContent: 'somethin to say',
      // content: 'somethin to say',
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
