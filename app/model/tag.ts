import { Application } from 'egg'

export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const tagSchema = new Schema(
    {
      id: {
        type: Number,
        unique: true,
        default: new Date().valueOf()
      },
      name: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      extends: [
        {
          name: String,
          value: String
        }
      ]
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('Tag', tagSchema)
}
