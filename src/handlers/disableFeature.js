import SpatialModel from '../models/spatialModel.js'

export default async (req, res) => {
  try {
    const { featureId } = req.params
    const [deletedCount, error] = await SpatialModel.disableFeature('_id', featureId)

    if (error) {
      throw error
    }

    res.status(200).json({ message: `${deletedCount} feature was disabled` })
  } catch (err) {
    res.status(500).json({ message: 'feature could not be disabled' })
  }
}
