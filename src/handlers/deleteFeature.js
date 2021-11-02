const SpatialModel = require('../models/spatialModel')

module.exports = async (req, res) => {
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
