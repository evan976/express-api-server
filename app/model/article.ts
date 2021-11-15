import { Application } from 'egg'

export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const articleSchema = new Schema(
    {
      id: {
        type: Number,
        unique: true,
        default: new Date().valueOf()
      },
      title: {
        type: String,
        required: true
      },
      description: {
        type: String
      },
      keywords: [
        {
          type: String
        }
      ],
      thumb: {
        type: String,
        default: ''
      },
      state: {
        type: Number,
        enum: [0, 1],
        default: 1
      },
      origin: {
        type: Number,
        enum: [0, 1],
        default: 1
      },
      hot: {
        type: Boolean,
        default: false
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
      tags: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Tag'
        }
      ],
      content: {
        type: String,
        required: true
      },
      meta: {
        views: { type: Number, default: 0 },
        comments: { type: Number, default: 0 }
      }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('Article', articleSchema)
}
