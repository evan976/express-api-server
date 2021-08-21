/**
 * Category Router module
 * @file 分类路由模块
 * @module router/category
 */

const express = require('express')
const categoryCtrl = require('../controller/category.controller')

const router = express.Router()

// get all categories
router.get('/', categoryCtrl.getCategoryLists)

// get a category
router.get('/:category_id', categoryCtrl.getCategory)

// create category
router.post('/', categoryCtrl.createCategory)

// update category
router.put('/:category_id', categoryCtrl.updateCategory)

// delete category
router.delete('/:category_id', categoryCtrl.removeCategory)

module.exports = router
