import express from 'express'
import dotenv from 'dotenv'
import router from './routes.js'
import DBClient from './db.js'
import SpatialFeatureModel from './spatialFeature/spatialFeatureModel.js'

dotenv.config()
const DB_CREDENTIALS = process.env.DATABASE_URI
const PORT = process.env.PORT

const app = express()

function settingUpMiddleware(app) {
  app.use(express.json())
}

function settingUpRoutes(app, router) {
  app.use('/', router)
}

const dbClient = new DBClient({
  credentials: DB_CREDENTIALS
})

async function appStart() {
  const [connected, connectionError] = await dbClient.connect()
  if (connectionError) {
    console.log(connectionError)
    console.log('Could not connect to database')
    return
  }

  settingUpMiddleware(app)
  settingUpRoutes(app, router)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

appStart()