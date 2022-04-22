
function geometryParser (coordinates, type) {
  if (['point', 'marker'].includes(type.toLowerCase())) {
    const { lat, lng } = coordinates
    return {
      type,
      coordinates: [lng, lat]
    }
  }

  const polygonCoordinates = coordinates.map(point => [point.lng, point.lat])
  const [initialPoint] = polygonCoordinates
  polygonCoordinates.push(initialPoint)

  return {
    type,
    coordinates: [polygonCoordinates]
  }
}

export default (doc) => {
  return {
    type: 'Feature',
    properties: {
      enabled: doc.enabled,
      popupContent: doc.info,
      featId: doc._id
    },
    geometry: geometryParser(doc.coords, doc.type)
  }
}
