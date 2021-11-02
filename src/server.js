if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const createError = require('http-errors')
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const handler = require('./handlers')

const app = express()

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

// set ejs as template
app.set('view engine', 'ejs')

// set path to ejs files public files
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// setting json middleware
app.use(express.json())

// routes
app.get('/', handler.main)
app.get('/mapData', handler.mapData)
app.get('/mapData/:featureId', handler.filter)
app.post('/post', handler.post)
app.delete('/mapData/:featureId', handler.deleteFeat)

// error handler
app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

app.listen(process.env.PORT || 5000, () => console.log('Server Started'))
