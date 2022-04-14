import mongoose from 'mongoose'

const SpatialDataSchema = new mongoose.Schema({
  info: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  coords: {
    type: Object || [Object],
    require: true
  },
  type: {
    type: String,
    required: true
  },
  enabled: {
    type: Boolean,
    default: true,
    required: true
  }
})

const SpatialData = mongoose.model('Crowd-sourced-data', SpatialDataSchema)

export default {
  /**
   * Access all the features objects in the database.
   *
   * @returns {Array<Array<FeatureType>|Error>}
   */
  async getAllFeatures () {
    try {
      const allFeatures = await SpatialData.find()
      return [allFeatures, null]
    } catch (err) {
      return [null, err]
    }
  },

  /**
   * @param {string} info
   * @param {CoordinatesType} coordinates
   * @param {string} featureType
   * @returns {Array<Array<FeatureType>|Error>}
   */
  async createNewFeature (info, coordinates, featureType) {
    try {
      const newFeature = new SpatialData({
        info,
        coords: coordinates,
        type: featureType
      })
      const savedFeature = await newFeature.save()
      return [savedFeature, null]
    } catch (err) {
      return [null, err]
    }
  },

  async deleteFeature (property, value) {
    try {
      const query = {
        [property]: value
      }
      const { deletedCount } = await SpatialData.deleteOne(query)
      return [deletedCount, null]
    } catch (err) {
      return [null, err]
    }
  },

  async disableFeature (property, value) {
    try {
      const query = {
        [property]: value
      }
      const featureDisabled = await SpatialData.findOneAndUpdate(query, { enabled: false })
      return [featureDisabled, null]
    } catch (err) {
      return [null, err]
    }
  },

  async find (property, value, many) {
    try {
      const query = {
        [property]: value
      }
      const allFeatures = await SpatialData.find(query)

      if (many) {
        return [allFeatures, null]
      }

      const [firstFeature] = allFeatures
      return [firstFeature, null]
    } catch (err) {
      return [null, err]
    }
  }
}
