import mongoose from 'mongoose'

const DB_CREDENTIALS = process.env.DATABASE_URL || 'mongodb://localhost:27017/test'

export default () => {
  console.log(DB_CREDENTIALS)
  mongoose.connect(DB_CREDENTIALS)
  const db = mongoose.connection
  db.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  db.once('open', () => console.log('Connected to Database'))
}
