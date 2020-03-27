const express = require('express');

const router = express.Router();

const DataSchema = require('../models/spatialModel');

function buildGeoJson(parser, doc) {
  return {
    type: 'Feature',
    properties: {
      popupContent: doc.content.info,
    },
    geometry: parser(doc.layer),
  };
}


function layerParser(layer) {
  const geometry = {};
  if (layer.type === 'polygon') {
    const coordsArr = layer.coords.flat().map((point) => [point.lng, point.lat]);
    coordsArr.push(coordsArr[0]);
    geometry.coordinates = [[...coordsArr]];
    geometry.type = 'Polygon';
  } else {
    geometry.coordinates = [layer.coords.lng, layer.coords.lat];
    geometry.type = 'Point';
  }
  return geometry;
}


router.get('/', async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    res.render('error');
    console.log(err);
  }
});

router.get('/mapData', async (req, res) => {
  try {
    const spatialData = await DataSchema.find();
    const geoJson = spatialData.map((doc) => buildGeoJson(layerParser, doc));
    res.json(geoJson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/post', async (req, res) => {
  const obj = new DataSchema({
    content: req.body.content,
    layer: req.body.layer,
  });
  console.log(obj);
  try {
    await obj.save();
    res.status(201).json(obj);
  } catch (err) {
    res.render('error');
  }
});

module.exports = router;
