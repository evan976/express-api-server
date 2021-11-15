import { Service } from 'egg'

export default class HomeService extends Service {
  public async info() {
    return {
      userUrl: 'https://api.evanone.site/users/{name}',
      articleUrl: 'https://api.evanone.site/articles',
      categoryUrl: 'https://api.evanone.site/categories',
      tagUrl: 'https://api.evanone.site/tags'
    }
  }
}
