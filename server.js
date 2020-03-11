const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  res.render('index');
});

app.listen(process.env.PORT || 5000);
