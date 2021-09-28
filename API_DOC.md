# API Document

**基本说明**

- 接口根地址（baseUrl）：`http://localhost:8000/api/private/v1`
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
  - `1` 成功
  - `-1` 失败
- `message` 成功或失败描述
- `data`  成功请求返回的数据

## 用户

### 用户注册

#### 请求路径

`/register`

#### 请求方法

`POST`

#### 请求体参数

|   字段   |   描述   |  类型  | 说明 |
| :------: | :------: | :----: | :--: |
| username |  用户名  | String | 必填 |
|  email   |   邮箱   | String | 必填 |
| password |   密码   | String | 必填 |
| rel_name | 确认密码 | String | 必填 |

#### 成功响应示例

```json
{
  "code": 1,
  "message": "用户注册成功"
}
```

#### 成功响应示例

```json
{
  "code": -1,
  "message": "用户注册失败"
}
```

### 用户登录



## 文章

## 分类

## 标签

## 站点信息
