const DataSchema = require('../models/spatialModel')
const { buildGeoJson, layerParser } = require('../lib/geojson')

async function main (req, res) {
  try {
    res.render('index')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function mapData (req, res) {
  try {
    const spatialData = await DataSchema.find()
    console.log(spatialData)
    const geoJson = spatialData.map((doc) => buildGeoJson(layerParser, doc))
    res.json(geoJson)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

async function post (req, res) {
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
}

module.exports = {
  main,
  mapData,
  post
}
