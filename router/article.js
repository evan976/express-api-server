/**
 * Article router module
 * @file 文章路由模块
 * @module router/article
 */

const express = require('express')
const articleCtrl = require('../controller/article.controller')

const router = express.Router()

// list articles
router.get('/', articleCtrl.getArticleLists)

// feed articles
router.get('/feed', articleCtrl.getArticleListsBySpecifiedUser)

// // get article
router.get('/:slug', articleCtrl.getArticle)

// create article
router.post('/', articleCtrl.createArticle)

// update article
router.put('/:slug', articleCtrl.updateArticle)

// delete article
router.delete('/:slug', articleCtrl.removeArticle)

// add comments to an article
router.post('/:slug/comments', articleCtrl.addComments)

// get comments from an article
router.get('/:slug/comments', articleCtrl.getComments)

// delete comment
router.delete('/:slug/comments/:id', articleCtrl.removeComment)

// favorite article
router.post('/:slug/favorite', articleCtrl.favoriteArticle)

module.exports = router