import SpatialModel from '../models/spatialModel.js'
import { capitalizeFirstLetter, formatCoordinates } from '../lib/formatData.js'

export default async (req, res) => {
  try {
    const { info, coords, type } = req.body
    const [newFeature, error] = await SpatialModel.createNewFeature(
      info,
      formatCoordinates(coords),
      capitalizeFirstLetter(type)
    )

    if (error) {
      throw error
    }

    res.status(201).json({ message: 'new feature added', feature: newFeature })
  } catch (err) {
    res.status(500).json({ message: 'new feature could not be saved' })
  }
}
