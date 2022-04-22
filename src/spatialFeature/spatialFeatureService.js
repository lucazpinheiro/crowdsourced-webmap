import promiseHandler from '../utils/promiseHandler.js'

export default {
  async getSpatialFeatures (spatialFeatureModel, dbClient) {
    const [features, error] = await promiseHandler(() => dbClient.read(spatialFeatureModel))
    if (error) {
      return [null, error]
    }
    return [features, null]
  },
  async createNewFeature (spatialFeatureModel, dbClient, newFeature) {
    const [savedFeature, error] = await promiseHandler(() => {
      return dbClient.create(spatialFeatureModel, newFeature)
    })
    if (error) {
      return [null, error]
    }
    return [savedFeature, null]
  }
}
