import { EggPlugin } from 'egg'

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt'
  },
  cors: {
    enable: true,
    package: 'egg-cors'
  }
}

export default plugin
