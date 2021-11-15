import { Application } from 'egg'
import { hashSync } from 'bcrypt'

export default (app: Application) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const userSchema = new Schema(
    {
      id: {
        type: Number,
        unique: true,
        default: new Date().valueOf()
      },
      username: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        select: false,
        set(val) {
          return hashSync(val, 10)
        }
      },
      avatarUrl: {
        type: String,
        default: null
      },
      blogUrl: {
        type: String,
        default: ''
      },
      nickname: {
        type: String,
        default: null
      },
      type: {
        type: String,
        enum: ['Admin', 'User'],
        default: 'User'
      },
      position: {
        type: String,
        default: null
      },
      bio: {
        type: String,
        default: ''
      },
      email: {
        type: String,
        default: null
      },
      company: {
        type: String,
        default: null
      },
      location: {
        type: String,
        default: ''
      }
    },
    {
      timestamps: true
    }
  )
  return mongoose.model('User', userSchema)
}
