if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const connection = require('./db')
const handlers = require('./handlers')

const app = express()

connection()

// set ejs as template
app.set('view engine', 'ejs')

// set path to ejs files public files
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

// setting json middleware
app.use(express.json())

// routes
app.get('/', handlers.main)
app.get('/feature/all', handlers.getAllFeatures)
app.post('/feature/new', handlers.createNewFeature)
app.patch('/feature/disable/:featureId', handlers.disableFeature)
app.delete('/feature/delete/:featureId', handlers.deleteFeature)
// app.get('/feature/filter/:featureId', handlers.filter)

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
