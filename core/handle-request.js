/**
 * @module 请求处理模块
 */

const handleSuccess = ({ res, message = '请求成功', result = null }) => {
  res.json({ code: 0, message, result })
}

const handleError = ({ res, message = '请求失败', err = null }) => {
  res.json({ code: 1, message, err })
}

const handlePaginationResult = (limit, offset, total, result) => ({
  result,
  pagination: {
    limit,
    offset,
    total
  }
})

module.exports = {
  handleSuccess,
  handleError,
  handlePaginationResult
}
