/**
 * @module 环境配置
 */

const enviroment = process.env.NODE_ENV

const isDev = Object.is(enviroment, 'development')
const isProd = Object.is(enviroment, 'production')

module.exports = {
  isDev,
  isProd,
  enviroment
}
