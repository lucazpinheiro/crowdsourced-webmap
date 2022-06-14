import mongoose from 'mongoose'

export default class DBClient {
  #credentials
  constructor ({ credentials }) {
    this.#credentials = credentials
  }

  async connect () {
    try {
      await mongoose.connect(this.#credentials, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      return [true, null]
    } catch (error) {
      return [null, error]
    }
  }
  // async read (model, query) {
  //   if (!query) {
  //     return await model.find({}, '-__v')
  //   }
  //   return await model.find(query, '-__v')
  // }
  // async create (model, data) {
  //   return await model.create(data)
  // }
}
