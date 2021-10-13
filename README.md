# express-api-server

RESTful API server application for my blog, powered by **[Express](http://expressjs.com/)**, required **[MongoDB](https://docs.mongoing.com)**

## 技术栈

```bash
express + mongodb + jsonwebtoken + crypto
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

## 构建

```bash
# git clone
$ git clone https://github.com/wujihua118/blog-api-express.git

# install
$ npm install

# running
$ npm run dev
```
