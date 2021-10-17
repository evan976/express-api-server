# API Document

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
  "code": 0,
  "message": "用户注册成功",
  "result": null
}
```

#### 失败响应示例

```json
{
  "code": 1,
  "message": "用户注册失败",
  "err": null
}
```

### 用户登录

## 文章

## 分类

## 标签

## 站点信息
