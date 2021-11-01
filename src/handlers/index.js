const { getAllFeatures, createNewFeature, deleteFeature } = require('../models/spatialModel')
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
    const [spatialData, error] = await getAllFeatures()

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
    const [newFeature, error] = await createNewFeature(info, coords, type)

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
    const [deletedCount, error] = await deleteFeature('_id', featureId)

    if (error) {
      throw error
    }

    res.status(200).json({ message: `${deletedCount} feature was deleted` })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  main,
  mapData,
  post,
  deleteFeat
}
