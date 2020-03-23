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
    const coordsArr = layer.coords.map((point) => [point.lng, point.lat]);
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
    //this must be changed with data coming from a db
    const x = data.data.map((doc) => buildGeoJson(layerParser, doc));
    console.log('x =>', x);
    // console.log('test', test);
    res.json(x);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/post', async (req, res) => {
  console.log('content =>', req.body.content);
  console.log('layer =>', req.body.layer);
  try {
    res.status(201).json({ message: 'registro criado com sucesso' });
    // res.redirect('/');
  } catch (err) {
    res.render('error');
  }
});

module.exports = router;
