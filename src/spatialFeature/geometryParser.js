/**
 * @param {CoordinatesType|CoordinatesType[]} coordinates
 * @param {string} featureType
 * @returns {GeometryType}
 */
export default function geometryParser (coordinates, featureType) {
  if (String(featureType).toLocaleLowerCase() === 'point') {
    const { lat, long } = coordinates
    return {
      type: 'Point',
      coordinates: [long, lat]
    }
  }

  const polygonCoordinates = coordinates.map(point => [point.long, point.lat])
  const [initialPoint] = polygonCoordinates
  polygonCoordinates.push(initialPoint)

  return {
    type: 'Polygon',
    coordinates: [polygonCoordinates]
  }
}
