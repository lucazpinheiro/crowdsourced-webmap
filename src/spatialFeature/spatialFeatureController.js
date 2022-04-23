import spatialFeatureService from './spatialFeatureService.js'
import spatialFeatureModel from './spatialFeatureModel.js'
import dbClient from '../db.js'
import geometryParser from './geometryParser.js'
import mapDocumentsFromDatabaseToGeojsonFormat from './mapDocumentsFromDatabaseToGeojsonFormat.js'
import promiseHandler from '../utils/promiseHandler.js'

const services = spatialFeatureService({
  model: spatialFeatureModel,
  dbClient,
  promiseHandler
})

export default {
  async handlerGetSpatialFeatures (req, res) {
    const [allFeatures, err] = await services
      .getSpatialFeatures(
        mapDocumentsFromDatabaseToGeojsonFormat,
        geometryParser
      )
    if (err) {
      return res.status(500).json({
        message: 'Error getting all features'
      })
    }
    res.json({
      features: allFeatures
    })
  },
  async handlerPostSpatialFeatures (req, res) {
    const feature = req.body
    const [savedFeature, err] = await services
      .createNewFeature(feature)
    if (err) {
      console.log(err)
      return res.status(500).json({
        message: 'Error creating new feature'
      })
    }
    res.json({
      message: 'Successfully created new feature',
      savedFeature
      // message: `TODO: creating feature of type ${req.body.type}`
    })
  }
}
