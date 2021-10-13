/**
 * @module 分类控制器
 */

const Category = require('../model/category.model')
const Article = require('../model/article.model')
const { SORT_TYPE } = require('../core/constant')
const {
  handleSuccess,
  handleError,
  handlePaginationResult
} = require('../core/handle-request')
class CategoryController {

  // 获取分类列表
  async findAll ({ query: { offset = 1, limit = 10 } }, res) {

    [offset, limit] = [offset, limit].map(v => Number(v))

    const total = await Category.countDocuments({})

    const querySuccess = categories => {
      handleSuccess({
        res,
        message: '分类列表获取成功',
        result: handlePaginationResult(limit, offset, total, categories)
      })
    }

    // 聚合查询每个分类下对应的文章数量
    const getArticleNums = categories => {
      Article.aggregate([
        { $unwind: '$category' },
        { $group: {
            _id: '$category',
            num_tutorial: { $sum: 1 }
          }
        }
      ])
      .then(res => {
          categories = categories.map(category => {
          const finded = res.find(v => String(v._id) === String(category._id))
          category.count = finded ? finded.num_tutorial : 0
          return category
        })
        querySuccess(categories)
      })
      .catch(() => querySuccess(categories))
    }

    Category.find({}).sort({ _id: SORT_TYPE.desc }).limit(limit)
      .skip((offset - 1) * limit)
      .then(categories => getArticleNums(JSON.parse(JSON.stringify(categories))))
      .catch(err => handleError({ res, message: '分类列表获取失败', err }))
  }


  // 获取单个分类
  findOne ({ params: { category_id } }, res) {
    Category.findById(category_id)
      .then(result => handleSuccess({res, message: '分类获取成功', result}))
      .catch(err => handleError({res, message: '分类获取失败', err}))
  }

  // 新增分类
  create ({ body: category, body: { name } }, res) {

    if (!name) return handleError({ res, message: '分类名称不能为空' })

    Category.find({ name })
      .then(categories => {
        categories.length
          ? handleError({ res, message: '该分类已存在' })
          : saveCategory()
      })
      .catch(err => handleError({ res, message: '新增分类失败', err }))

    const saveCategory = () => {
      new Category(category).save()
        .then(result => handleSuccess({ res, message: '新增分类成功', result }))
        .catch(err => handleError({ res, message: '新增分类失败', err }))
    }

  }

  // 修改单个分类
  update ({ params: { category_id }, body: category, body: { name } }, res) {

    if (!name) return handleError({ res, message: '分类名称不能为空' })

    Category.findByIdAndUpdate(category_id, category, { new: true })
      .then(result => handleSuccess({ res, message: '分类更新成功', result }))
      .catch(err => handleError({ res, message: '分类更新失败', err }))
  }

  // 删除单个分类
  remove ({ params: { category_id } }, res) {
    Category.findByIdAndRemove(category_id)
    .then(_ => handleSuccess({ res, message: '分类删除成功' }))
    .catch(err => handleError({ res, message: '分类删除失败', err }))
  }
}

module.exports = new CategoryController()

