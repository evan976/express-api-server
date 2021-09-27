const Category = require('../model/category.model')
const HandleResponse = require('../core/response-handler')
const { SORT_TYPE } = require('../core/constant')

class CategoryController {

  findAll (req, res) {

    let limit = parseInt(req.query.limit) || 10
    let offset = parseInt(req.query.offset) || 1

    if (offset < 1) {
      offset = 1
    }

    Category.find({}, '-_id id name slug description').skip((offset - 1) * limit).limit(limit).sort({ _id: SORT_TYPE.desc })
      .then(categoryList => {
        categoryList.length
          ? new HandleResponse({ categoryList }, '分类列表获取成功').success(res)
          : new HandleResponse('分类列表为空').fail(res)
      })
      .catch(err => {
        new HandleResponse('分类列表为空').fail(res)
      })
  }

  findOne ({ params: { category_id } }, res) {
    Category.findById(category_id)
      .then(result => {
        result
          ? new HandleResponse({ result }, '分类获取成功').success(res)
          : new HandleResponse('分类不存在').fail(res)
      })
      .catch(err => {
        new HandleResponse('分类获取失败').fail(res)
      })
  }

  create ({ body: category, body: { name } }, res) {

    if (!name) return new HandleResponse('分类名称不能为空').fail(res)

    Category.find({ name })
      .then(categories => {
        categories.length
          ? new HandleResponse('分类已存在').fail(res)
          : saveCategory()
      })
      .catch(err => {
        new HandleResponse('新增分类失败').fail(res)
      })

    const saveCategory = () => {
      new Category(category).save()
        .then(result => {
          new HandleResponse({ result }, '新增分类成功').success(res)
        })
        .catch(err => {
          new HandleResponse('新增分类失败').fail(res)
        })
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
      .catch(err => {
        new HandleResponse('分类修改失败').fail(res)
      })

    const updateCategory = () => {
      Category.findByIdAndUpdate(category_id, category, { new: true })
        .then(result => {
          result
          ? new HandleResponse({ result }, '分类修改成功').success(res)
          : new HandleResponse('分类不存在').fail(res)
        })
        .catch(err => {
          new HandleResponse('分类修改失败').fail(res)
        })
    }
  }

  remove ({ params: { category_id } }, res) {
    Category.findByIdAndRemove(category_id)
    .then(() => {
      new HandleResponse('分类删除成功').success(res)
    })
    .catch(err => {
      new HandleResponse('分类删除失败').fail(res)
    })
  }

}

module.exports = new CategoryController()
