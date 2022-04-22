import mongoose from 'mongoose'

const DB_CREDENTIALS = process.env.DATABASE_URL || 'mongodb://localhost:27017/dev'

export default {
  connection () {
    mongoose.connect(DB_CREDENTIALS)
    const db = mongoose.connection
    db.on('error', (err) => {
      console.error(err)
      process.exit(1)
    })
    db.once('open', () => console.log('Connected to Database'))
  },
  async read (model, query) {
    if (!query) {
      return await model.find({}, '-__v')
    }
    return await model.find(query, '-__v')
  },
  async create (model, data) {
    return await model.create(data)
  }
}
