function capitalizeFirstLetter (string) {
  if (!string.length) {
    return string
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function setFloatingPrecision (number, precision) {
  return Number(number.toFixed(precision))
}

function formatCoordinates (coordinates) {
  const precision = 8
  if (Array.isArray(coordinates)) {
    return coordinates.map(elem => ({
      lat: setFloatingPrecision(elem.lat, precision),
      lng: setFloatingPrecision(elem.lng, precision)
    }))
  }
  return {
    lat: setFloatingPrecision(coordinates.lat, precision),
    lng: setFloatingPrecision(coordinates.lng, precision)
  }
}

module.exports = {
  capitalizeFirstLetter,
  formatCoordinates
}
