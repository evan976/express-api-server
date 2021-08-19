exports.login = async (req, res, next) => {
  try {
    // TODO 用户登录
    res.send('post /users/login')
  } catch (error) {
    next(error)
  }
}

exports.register = async (req, res, next) => {
  try {
    // TODO 用户注册
    res.send('post /users/register')
  } catch (error) {
    next(error)
  }
}

exports.getCurrentUser = async (req, res, next) => {
  try {
    // TODO 获取当前登录用户
    res.send('get /user')
  } catch (error) {
    next(error)
  }
}

exports.updateCurrentUser = async (req, res, next) => {
  try {
    // TODO 更新当前登录用户
    res.send('put /user')
  } catch (error) {
    next(error)
  }
}