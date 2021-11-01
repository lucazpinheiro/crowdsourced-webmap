function layerParser (coords, featureType) {
  const geometry = {}
  if (featureType === 'polygon') {
    const coordsArr = coords.flat().map((point) => [point.lng, point.lat])
    coordsArr.push(coordsArr[0])
    geometry.coordinates = [[...coordsArr]]
    geometry.type = 'Polygon'
  } else {
    geometry.coordinates = [coords.lng, coords.lat]
    geometry.type = 'Point'
  }
  return geometry
}

function buildGeoJson (parser, doc) {
  return {
    type: 'Feature',
    properties: {
      popupContent: doc.info,
      featId: doc._id
    },
    geometry: parser(doc.coords, doc.type)
  }
}

module.exports = {
  buildGeoJson,
  layerParser
}
