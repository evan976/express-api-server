import { Application } from 'egg'

export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const optionSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      required: true
    },
    keywords: [
      {
        type: String
      }
    ],
    description: {
      type: String
    },
    siteUrl: {
      type: String
    },
    siteIcp: {
      type: String
    }
  })
  return mongoose.model('Option', optionSchema)
}
