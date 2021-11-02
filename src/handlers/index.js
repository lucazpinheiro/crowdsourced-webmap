const SpatialModel = require('../models/spatialModel')
const { buildGeoJson, layerParser } = require('../lib/geojson')

async function main (req, res) {
  try {
    res.render('index')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function mapData (req, res) {
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

async function post (req, res) {
  try {
    const { info, coords, type } = req.body
    const [newFeature, error] = await SpatialModel.createNewFeature(info, coords, type)

    if (error) {
      throw error
    }

    res.status(201).json({ message: 'new feature added', feature: newFeature })
  } catch (err) {
    res.status(500).json({ message: 'new feature could not be saved' })
  }
}

async function deleteFeat (req, res) {
  try {
    const { featureId } = req.params
    const [deletedCount, error] = await SpatialModel.deleteFeature('_id', featureId)

    if (error) {
      throw error
    }

    res.status(200).json({ message: `${deletedCount} feature was deleted` })
  } catch (err) {
    res.status(500).json({ message: 'feature could not be deleted' })
  }
}

async function filter (req, res) {
  /**
   * TODO
   * - this function needs to be refactored removing duplicated code from lines 73 to 79
   *  probably I will need to change the geojson module.
   */
  try {
    const { featureId } = req.params
    const [filteredData, error] = await SpatialModel.find('_id', featureId, false)

    if (error) {
      res.status(503).json({ message: 'data not available' })
      return
    }

    if (Array.isArray(filteredData)) {
      const geoJson = filteredData.map((doc) => buildGeoJson(layerParser, doc))
      res.status(200).json(geoJson)
      return
    }

    const geoJson = [filteredData].map((doc) => buildGeoJson(layerParser, doc))
    res.status(200).json(geoJson)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  main,
  mapData,
  post,
  deleteFeat,
  filter
}
