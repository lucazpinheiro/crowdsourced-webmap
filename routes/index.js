const express = require('express');

const data = require('./../data');

const router = express.Router();


router.get('/mapData', async (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    res.render('error');
    console.log(err);
  }
});

router.post('/post', async (req, res) => {
  console.log(req);
  console.log(req.params);
  try {
    res.redirect('/');
  } catch (err) {
    res.render('error');
  }
});

module.exports = router;
