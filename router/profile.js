const express = require('express')

const router = express.Router()

// get profile
router.get('/:username', async (req, res, next) => {
  try {
    // TODO 获取指定用户资料
    res.send('get /:username')
  } catch (error) {
    next(error)
  }
})

// follow user
router.post('/:username/follow', async (req, res, next) => {
  try {
    // TODO 关注用户
    res.send('post /:username')
  } catch (error) {
    next(error)
  }
})

// unfollow user
router.delete('/:username/follow', async (req, res, next) => {
  try {
    // TODO 取消关注
    res.send('delete /:username/follow')
  } catch (error) {
    next(error)
  }
})

module.exports = router