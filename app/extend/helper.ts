exports.success = ({ ctx, data, message = 'success', code = 0 }) => {
  ctx.body = {
    code,
    message,
    data
  }
  ctx.status = 200
}

exports.error = ({ ctx, message = 'failed', code = 1 }) => {
  ctx.body = {
    code,
    message
  }
}
