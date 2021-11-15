# blog-backend

RESTful API server application for my blog, powered by **[EggJS](https://eggjs.org/zh-cn/)**, required **[MongoDB](https://docs.mongoing.com)**

这是 egg.js 版本，使用 egg 和 typescript 重构

说实话 typescript 用了个寂寞，any 大法好啊

完全没体现出 typescript 的优势

删除了一些接口，比如：获取图片列表、删除图片

对于图片模块仅仅提供了一个图片上传接口

近期可能会新增评论模块，但是我太忙了...

## 构建

项目使用的数据库是 MongoDB，请确保你本地是否安装并开启

```bash
npm install
```

```bash
npm run dev
```
