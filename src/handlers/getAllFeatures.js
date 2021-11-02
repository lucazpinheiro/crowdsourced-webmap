const SpatialModel = require('../models/spatialModel')
const { buildGeoJson, layerParser } = require('../lib/geojson')

module.exports = async (req, res) => {
  try {
    const [spatialData, error] = await SpatialModel.getAllFeatures()

    if (error) {
      res.status(503).json({ message: 'data not available' })
      return
    }

    const geoJson = spatialData.map((doc) => buildGeoJson(layerParser, doc))
    res.status(200).json(geoJson)
  } catch (err) {
    res.status(500).json({ message: 'something went wrong' })
  }
}
