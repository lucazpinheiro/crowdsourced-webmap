import createError from 'http-errors'
import express from 'express'
import connection from './db.js'
import handlers from './handlers/index.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

connection()

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
