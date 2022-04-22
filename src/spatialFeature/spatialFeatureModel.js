import mongoose from 'mongoose'

const SpatialFeatureSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  coordinates: {
    type: Object || [Object],
    require: true
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  }
})

const SpatialFeatureModel = mongoose.model('gis-tool', SpatialFeatureSchema)

export default SpatialFeatureModel
