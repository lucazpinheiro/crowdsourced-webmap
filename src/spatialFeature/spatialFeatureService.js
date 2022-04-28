export default ({
  model,
  dbClient,
  promiseHandler
}) => {
  return {
    async getSpatialFeatures (
      featureMapper,
      geometryParser
    ) {
      const [features, error] = await promiseHandler(() => dbClient.read(model))
      if (error) {
        return [null, error]
      }
      const featureCollection = {
        type: 'FeatureCollection',
        features: featureMapper(features, geometryParser)
      }
      return [featureCollection, null]
    },
    async createNewFeature (newFeature) {
      const [savedFeature, error] = await promiseHandler(() => {
        return dbClient.create(model, newFeature)
      })
      if (error) {
        return [null, error]
      }
      return [savedFeature, null]
    }
  }
}
