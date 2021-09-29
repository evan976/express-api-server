/**
 * @module 分类控制器
 */

const Category = require('../model/category.model')
const HandleResponse = require('../core/response-handler')
const { SORT_TYPE } = require('../core/constant')

class CategoryController {

  findAll ({ query: { limit = 10, offset = 1 } }, res) {

    if (offset < 1) {
      offset = 1
    }

    Category.find({}, '-_id id name slug description')
      .skip((parseInt(offset) - 1) * parseInt(limit))
      .limit(parseInt(limit))
      .sort({ _id: SORT_TYPE.desc })
      .then(categoryList => {
        categoryList.length
          ? res.json({ code: 1, message: '分类列表获取成功', data: { categoryList, pagination: { limit, offset } } })
          : new HandleResponse('空空如也～').fail(res)
      })
      .catch(err => new HandleResponse('分类列表获取失败').fail(res))
  }

  findOne ({ params: { category_id } }, res) {
    Category.findById(category_id)
      .then(result => {
        result
          ? new HandleResponse({ result }, '分类获取成功').success(res)
          : new HandleResponse('没有这个分类啊～').fail(res)
      })
      .catch(err => new HandleResponse('分类获取失败').fail(res))
  }

  create ({ body: category, body: { name } }, res) {

    if (!name) return new HandleResponse('分类名称不能为空').fail(res)

    Category.find({ name })
      .then(categories => {
        categories.length
          ? new HandleResponse('分类已存在').fail(res)
          : saveCategory()
      })
      .catch(err => new HandleResponse('新增分类失败').fail(res))

    const saveCategory = () => {
      new Category(category).save()
        .then(result => new HandleResponse({ result }, '新增分类成功').success(res))
        .catch(err => new HandleResponse('新增分类失败').fail(res))
    }

  }

  update ({ params: { category_id }, body: category, body: { name } }, res) {

    if (!name) return new HandleResponse('分类名称不能为空').fail(res)

    Category.find({ name })
      .then(result => {
        result.length
          ? new HandleResponse('分类已存在').fail(res)
          : updateCategory()
      })
      .catch(err => new HandleResponse('分类修改失败').fail(res))

    const updateCategory = () => {
      Category.findByIdAndUpdate(category_id, category, { new: true })
        .then(result => {
          result
          ? new HandleResponse({ result }, '分类更新成功').success(res)
          : new HandleResponse('没有这个分类啊～').fail(res)
        })
        .catch(err => new HandleResponse('分类更新失败').fail(res))
    }
  }

  remove ({ params: { category_id } }, res) {
    Category.findByIdAndRemove(category_id)
    .then(() => new HandleResponse('分类删除成功').success(res))
    .catch(err => new HandleResponse('分类删除失败').fail(res))
  }

}

module.exports = new CategoryController()
