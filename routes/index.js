const express = require('express');

const data = require('../data');

const router = express.Router();


function buildGeoJson(parser, doc) {
  return {
    type: 'Feature',
    properties: doc.content,
    geometry: parser(doc.layer),
  };
}

function layerParser(layer) {
  const geometry = {};
  if (layer.type === 'polygon') {
    geometry.coordinates = layer.coords.map((point) => [point.lng, point.lat]);
    geometry.coordinates.push(geometry.coordinates[0]);
    geometry.type = 'Polygon';
  } else {
    geometry.coordinates = [layer.coords.lng, layer.coords.lat];
    geometry.type = 'Point';
  }
  return geometry;
}

function test(y) {
  return y.map((doc) => buildGeoJson(layerParser, doc));
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
    // const x = data.map((doc) => buildGeoJson(layerParser, doc));
    const x = test(data);
    res.json(x);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/post', async (req, res) => {
  console.log('content =>', req.body.content);
  console.log('layer =>', req.body.layer);
  try {
    res.redirect('/');
  } catch (err) {
    res.render('error');
  }
});

module.exports = router;
