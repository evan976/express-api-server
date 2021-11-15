import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg'

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>

  config.keys = appInfo.name + '_1636767368643_4234'

  config.middleware = ['errorHandler']

  config.errorHandler = {
    match: '/api/v1'
  }

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: ['*']
  }

  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH, OPTIONS'
  }

  config.mongoose = {
    url: 'mongodb://127.0.0.1:27017/blog-backend',
    options: {
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  }

  config.jwt = {
    secret: '3ff82d880794'
  }

  config.multipart = {
    mode: 'stream'
  }

  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  }

  return {
    ...config,
    ...bizConfig
  }
}
