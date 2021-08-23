/**
 * Profile Controller module
 * @file 用户资料控制器
 * @module controller/profile
 */

exports.getProfile = async (req, res, next) => {
  try {
    // TODO 获取指定用户资料
    res.send('getProfile')
  } catch (error) {
    next(error)
  }
}

exports.followUser = async (req, res, next) => {
  try {
    // TODO 关注用户
    res.send('followUser')
  } catch (error) {
    next(error)
  }
}

exports.unfollowUser = async (req, res, next) => {
  try {
    // TODO 取消关注
    res.send('unfollowUser')
  } catch (error) {
    next(error)
  }
}
