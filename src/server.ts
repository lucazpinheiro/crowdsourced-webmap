import express, { Express, Router } from 'express'
import dotenv from 'dotenv'
import router from './routes'
import connectToDatabase from './db'

dotenv.config()

const DATABASE_URI = process.env.DATABASE_URI || ''
const PORT = process.env.PORT

const app = express()

function middlewareSetup(app: Express) {
  app.use(express.json())
}

function routesSetup(app: Express, router: Router) {
  app.use('/', router)
}

async function start() {
  const [connection, connectionErrors] = await connectToDatabase(DATABASE_URI)
  if (connectionErrors) {
    console.warn('Something went wrong trying to connect to DB.')
    console.error(connectionErrors)
    return
  }

  middlewareSetup(app)
  routesSetup(app, router)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

start()