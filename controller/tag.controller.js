/**
 * @module 标签控制器
 */

const Tag = require('../model/tag.model')
const Article = require('../model/article.model')
const { handleSuccess, handleError } = require('../core/handle-request')

class TagController {

  // 获取标签列表
  findAll (req, res) {

    // 聚合查询每个标签下对应的文章总数
    const getArticleNums = tags => {
      Article.aggregate([
        { $unwind: '$tags' },
        { $group: {
            _id: '$tags',
            num_tutorial: { $sum: 1 }
          }
        }
      ])
      .then(counts => {
          tags = tags.map(tag => {
          const finded = counts.find(v => String(v._id) === String(tag._id))
          tag.count = finded ? finded.num_tutorial : 0
          return tag
        })
        handleSuccess({ res, message: '标签列表获取成功', result: tags })
      })
      .catch(() => handleSuccess({ res, message: '标签列表获取成功' }))
    }

    // 标签查询
    Tag.find({})
    .then(tags => getArticleNums(JSON.parse(JSON.stringify(tags))))
    .catch(err => handleError({ res, message: '标签列表获取失败', err }))
  }

  // 获取单个标签
  findOne ({ params: { tag_id } }, res) {
    Tag.findById(tag_id)
      .then(result => handleSuccess({ res, message: '标签获取成功', result }))
      .catch(err => handleError({ res, message: '标签获取失败', err }))
  }

  // 新增标签
  create ({ body: tag, body: { name, slug } }, res) {

    if (!name) return handleError({ res, message: '标签名称不能为空' })

    if (!slug) return handleError({ res, message: '标签别名不能为空' })

    Tag.find({ name })
      .then(tags => {
        tags.length
          ? handleError({ res, message: '标签已存在，换个名称吧～' })
          : saveTag()
      })
      .catch(err => handleError({ res, message: '新增标签失败', err }))

    const saveTag = () => {
      new Tag(tag).save()
        .then(result => handleSuccess({ res, message: '新增标签成功', result }))
        .catch(err => handleError({ res, message: '新增标签失败', err }))
    }
  }

  // 修改标签
  update ({ params: { tag_id }, body: tag, body: { name, slug } }, res) {

    if (!name) return handleError({ res, message: '标签名称不能为空' })

    if (!slug) return handleError({ res, message: '标签别名不能为空' })

    Tag.findByIdAndUpdate(tag_id, tag, { new: true })
      .then(result => handleSuccess({ res, message: '标签更新成功', result }))
      .catch(err => handleError({ res, message: '标签更新失败', err }))
  }

  // 删除标签
  remove ({ params: { tag_id } }, res) {
    Tag.findByIdAndRemove(tag_id)
      .then(() => handleSuccess({ res, message: '标签删除成功' }))
      .catch(err => handleError({ res, message: '标签删除失败', err }))
  }
}

module.exports = new TagController()
