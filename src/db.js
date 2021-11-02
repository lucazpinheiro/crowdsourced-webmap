const mongoose = require('mongoose')

const DB_CREDENTIALS = process.env.DATABASE_URL

module.exports = () => {
  mongoose.connect(DB_CREDENTIALS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = mongoose.connection
  db.on('error', (err) => {
    console.error(err)
    process.exit(1)
  })
  db.once('open', () => console.log('Connected to Database'))
}
