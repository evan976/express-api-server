/**
 * @module 标签控制器
 */

const Tag = require('../model/tag.model')
const HandleResponse = require('../core/response-handler')

class TagController {

  findAll (req, res) {
    Tag.find({}, 'name slug description')
    .then(tagList => {
      tagList.length
        ? new HandleResponse({ tagList }, '标签列表获取成功').success(res)
        : new HandleResponse('空空如也～').fail(res)
    })
    .catch(err => new HandleResponse('标签列表获取失败').fail(res))
  }

  findOne ({ params: { tag_id } }, res) {
    Tag.findById(tag_id)
      .then(result => {
        result
          ? new HandleResponse({ result }, '标签获取成功').success(res)
          : new HandleResponse('没有这个标签啊～').fail(res)
      })
      .catch(err => new HandleResponse('标签获取失败').fail(res))
  }

  create ({ body: tag, body: { name } }, res) {

    if (!name) return new HandleResponse('标签名称不能为空').fail(res)

    Tag.find({ name })
      .then(tags => {
        tags.length
          ? new HandleResponse('标签已存在，换个名称吧～')
          : saveTag()
      })
      .catch(err => new HandleResponse('新增标签失败').fail(res))

    const saveTag = () => {
      new Tag(tag).save()
        .then(result => new HandleResponse({ result }, '新增标签成功').success(res))
        .catch(err => new HandleResponse('新增标签失败').fail(res))
    }
  }

  update ({ params: { tag_id }, body: tag, body: { name } }, res) {

    if (!name) return new HandleResponse('标签名称不能为空').fail(res)

    Tag.find({ name })
      .then(result => {
        result.length
          ? new HandleResponse('标签已存在').fail(res)
          : updateTag()
      })
      .catch(err => new HandleResponse('标签更新失败').fail(res))


    const updateTag = () => {
      Tag.findByIdAndUpdate(tag_id, tag, { new: true })
        .then(result => {
          result
           ? new HandleResponse({ result }, '标签更新成功').success(res)
           : new HandleResponse('标签不存在').fail(res)
        })
        .catch(err => new HandleResponse('标签更新失败').fail(res))
    }
  }

  remove ({ params: { tag_id } }, res) {
    Tag.findByIdAndRemove(tag_id)
      .then(() => new HandleResponse('标签删除成功').success(res))
      .catch(err => new HandleResponse('标签删除失败').fail(res))
  }
}

module.exports = new TagController()
