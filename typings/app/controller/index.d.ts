// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportApiV1Article from '../../../app/controller/api/v1/article';
import ExportApiV1Auth from '../../../app/controller/api/v1/auth';
import ExportApiV1Base from '../../../app/controller/api/v1/base';
import ExportApiV1Category from '../../../app/controller/api/v1/category';
import ExportApiV1Option from '../../../app/controller/api/v1/option';
import ExportApiV1Tag from '../../../app/controller/api/v1/tag';
import ExportApiV1Upload from '../../../app/controller/api/v1/upload';
import ExportApiV1User from '../../../app/controller/api/v1/user';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    api: {
      v1: {
        article: ExportApiV1Article;
        auth: ExportApiV1Auth;
        base: ExportApiV1Base;
        category: ExportApiV1Category;
        option: ExportApiV1Option;
        tag: ExportApiV1Tag;
        upload: ExportApiV1Upload;
        user: ExportApiV1User;
      }
    }
  }
}
