import express from 'express'
import DataSchema from '../models/spatialModel.js'

const router = express.Router()

function buildGeoJson (parser, doc) {
  return {
    type: 'Feature',
    properties: {
      popupContent: doc.info
    },
    geometry: parser(doc.coords, doc.type)

  }
}

function layerParser (coords, featureType) {
  const geometry = {}
  if (featureType === 'polygon') {
    const coordsArr = coords.flat().map((point) => [point.lng, point.lat])
    coordsArr.push(coordsArr[0])
    geometry.coordinates = [[...coordsArr]]
    geometry.type = 'Polygon'
  } else {
    geometry.coordinates = [coords.lng, coords.lat]
    geometry.type = 'Point'
  }
  return geometry
}

router.get('/', async (req, res) => {
  try {
    res.render('index')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/mapData', async (req, res) => {
  try {
    const spatialData = await DataSchema.find()
    console.log(spatialData)
    const geoJson = spatialData.map((doc) => buildGeoJson(layerParser, doc))
    res.json(geoJson)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post('/post', async (req, res) => {
  const obj = new DataSchema({
    info: req.body.info,
    coords: req.body.coords,
    type: req.body.type
  })
  console.log(obj)
  try {
    await obj.save()
    res.status(201).json(obj)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
