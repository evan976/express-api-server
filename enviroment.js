/**
 * Enviroment module
 * @file 环境配置
 * @module enviroment
 */

const enviroment = process.env.NODE_ENV

const isDev = Object.is(enviroment, 'development')
const isProd = Object.is(enviroment, 'production')

module.exports = {
  isDev,
  isProd,
  enviroment
}