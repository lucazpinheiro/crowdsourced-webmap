import express from 'express'
import createError from 'http-errors'

import './environment.js'

import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'
import routes from './routes/index.js'

// this two line are necessary to make __dirname work with es modules, it will be removed soon
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

// routes
app.use(express.json())
app.use(routes)

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
