const express = require('express');

const router = express.Router();

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
