# express-api-server

<img align="center" src="https://static.evanone.site/1634472820157" style="zoom:40%;" />

RESTful API server application for my blog, powered by **[Express](http://expressjs.com/)**, required **[MongoDB](https://docs.mongoing.com)**

一个很简单的 NodeJS 服务端博客项目，主要为博客前台和后台提供 API 接口，代码写的很拉🤣

博客后台管理系统在这 [vue-admin-client](https://github.com/wujihua118/vue-admin-client) ，基本完成，但还有很多地方实现的不够优雅，会持续更新

前台个人网站在这 [nuxt-web-app](https://github.com/wujihua118/nuxt-web-app)，还没写完，也会持续更新

## 开发环境

```bash
Node v14.16.0 + npm v7.23.0 + MongoDB v5.0.2
```

## 项目结构

```js
+-- bin/
|   --- www                                 ---项目启动文件
+-- config/
|   --- config.default.js                   ---项目全局配置文件
+-- node_modules/                           ---项目依赖文件目录
+-- controller/                             ---核心业务逻辑（CRUD）
+-- core/
|   --- constant.js                         ---数据常量
|   --- handle-requset.js                   ---请求处理函数
|   --- mongodb.js                          ---数据库配置文件
+-- model/                                  ---数据模型
+-- router/                                 ---路由
+-- utils/                                  ---工具函数
--- app.js                                  ---主入口文件
--- enviroment.js                           ---环境配置
--- .editorconfig                           ---代码规范
--- package.json
```

## 实现功能

- [x] 用户登录
- [x] 用户注册
- [x] 获取/修改个人信息
- [x] 文章新增/修改/列表/删除
- [x] 分类新增/修改/列表/删除
- [x] 标签新增/修改/列表/删除
- [x] 图片上传/列表/删除
- [x] 站点配置/修改
- [ ] 评论模块
- [ ] 音乐模块
- [ ] 公告模块

由于时间有限，评论、音乐和公告模块就暂且搁置了，后面时间充裕的话会完善

**特别注意：图片是直接上传到七牛云存储，请自行修改 `config/config.default.js` 里面的相关配置**

```js
QINIU: {
  accessKey: '你的 ACCESS_KEY',
  secretKey: '你的 SECRET_KEY',
  scope: '你的空间名称',
  url: '你的外链地址'
}
```

以上这些不会的话请自行百度或 Google，有很多教程

## API 说明

**基本说明**

- 接口根地址：http://localhost:8000/api/private/v1
- 服务端已开启 CORS 跨域支持
- 需要授权的 API ，必须在请求头（`headers`）中使用 `Authorization` 字段提供 `token` 令牌
- 数据返回格式统一使用 JSON

**HTTP 状态码**

- `200` 成功
- `401` 未授权
- `403` 权限不足
- `404` 资源不存在
- `500` 服务器内部错误

**请求方法**

- `GET` 获取（一项或多项）
- `POST` 创建
- `PUT` 更新
- `DELETE` 删除

**接口数据返回字段**

- `code`
  - `0` 成功
  - `1` 失败
- `message` 成功或失败描述
- `result` 返回结果

具体可以看接口文档（还没写😆），在这 [API Document](https://github.com/wujihua118/express-api-server/blob/master/API_DOC.md)

## 构建

项目使用的数据库是 MongoDB，请确保你本地是否安装并开启

- 将项目克隆到本地

```bash
git clone https://github.com/wujihua118/blog-api-express.git
```

- 安装相关依赖

```bash
npm install
```

- 跑起来

```bash
npm run dev
```

好啦，现在你可以折腾了，祝折腾愉快～

欢迎 Star，如有问题请 Issues 
