const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const routes = require('./routes/index');

const app = express();

mongoose.connect('mongodb://localhost/crowdsourced-spacial-database', {
  useNewUrlParser: true, useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(routes);
// app.use((req, res, next) => {
//   next(createError(404));
// });

// error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(process.env.PORT || 5000);
