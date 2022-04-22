import express from 'express'
import dotenv from 'dotenv'
import { spatialFeatureController } from './spatialFeature/index.js'
import dbClient from './db.js'

dotenv.config()

const app = express()

dbClient.connection()

// setting json middleware
app.use(express.json())

// routes
app.get('/feature', spatialFeatureController.handlerGetSpatialFeature)
app.post('/feature', spatialFeatureController.handlerPostSpatialFeature)

app.listen(process.env.PORT || 5000, () => console.log('Server Started'))
