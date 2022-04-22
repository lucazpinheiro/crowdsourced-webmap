import spatialFeatureService from './spatialFeatureService.js'
import spatialFeatureModel from './spatialFeatureModel.js'
import dbClient from '../db.js'

export default {
  async handlerGetSpatialFeature (req, res) {
    const [allFeatures, err] = await spatialFeatureService
      .getSpatialFeatures(spatialFeatureModel, dbClient)
    if (err) {
      return res.status(500).json({
        message: 'Error getting all features'
      })
    }
    res.json({
      features: allFeatures
    })
  },
  async handlerPostSpatialFeature (req, res) {
    // const feature = req.body
    // const [savedFeature, err] = await spatialFeatureService
    //   .createNewFeature(spatialFeatureRepository, feature)
    // if (err) {
    //   console.log(err)
    //   return res.status(500).json({
    //     message: 'Error creating new feature'
    //   })
    // }
    // res.json({
    //   message: 'Successfully created new feature',
    //   savedFeature
    //   // message: `TODO: creating feature of type ${req.body.type}`
    // })
  }
}
