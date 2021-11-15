import { Application } from 'egg'

export default (app: Application) => {
  const { controller, router, middleware } = app

  const auth = middleware.jwtErr(app.config.jwt)

  router.get('/', controller.home.index)

  router.post('/api/v1/register', controller.api.v1.auth.register)
  router.post('/api/v1/login', controller.api.v1.auth.login)

  router.resources(
    'articles',
    '/api/v1/articles',
    auth,
    controller.api.v1.article
  )

  router.resources(
    'categories',
    '/api/v1/categories',
    auth,
    controller.api.v1.category
  )

  router.resources('tags', '/api/v1/tags', auth, controller.api.v1.tag)

  router.resources('users', '/api/v1/users', auth, controller.api.v1.user)

  router.resources('options', '/api/v1/options', controller.api.v1.option)

  router.delete('/api/v1/articles', auth, controller.api.v1.article.destroyMany)

  router.delete(
    '/api/v1/categories',
    auth,
    controller.api.v1.category.destroyMany
  )

  router.delete('/api/v1/tags', auth, controller.api.v1.tag.destroyMany)

  // 文件上传
  router.post('/api/v1/upload', controller.api.v1.upload.index)
}
