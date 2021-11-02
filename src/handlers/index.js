const getAllFeatures = require('./getAllFeatures')
const createNewFeature = require('./createNewFeature')
const deleteFeature = require('./deleteFeature')
const disableFeature = require('./disableFeature')

async function main (req, res) {
  try {
    res.render('index')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// async function filter (req, res) {
//   /**
//    * TODO
//    * - this function needs to be refactored removing duplicated code from lines 73 to 79
//    *  probably I will need to change the geojson module.
//    */
//   try {
//     const { featureId } = req.params
//     const [filteredData, error] = await SpatialModel.find('_id', featureId, false)

//     if (error) {
//       res.status(503).json({ message: 'data not available' })
//       return
//     }

//     if (Array.isArray(filteredData)) {
//       const geoJson = filteredData.map((doc) => buildGeoJson(layerParser, doc))
//       res.status(200).json(geoJson)
//       return
//     }

//     const geoJson = [filteredData].map((doc) => buildGeoJson(layerParser, doc))
//     res.status(200).json(geoJson)
//   } catch (err) {
//     console.log(err)
//   }
// }

module.exports = {
  main,
  getAllFeatures,
  createNewFeature,
  disableFeature,
  deleteFeature
  // filter,
}
