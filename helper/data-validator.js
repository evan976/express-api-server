/**
 * @module 工具函数
 */

// 判断是否为字符串
const isString = string => typeof string === 'string'

// 判断是否为数字
const isNumber = number => typeof number === 'number'

// 判断是否为数组
const isArray = array => Array.isArray(array)

// 数组去重
const arrayUniq = (a, b = []) => [new Set(...a, ...b)]

module.exports = {
  isString,
  isNumber,
  isArray,
  arrayUniq
}
