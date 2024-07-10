// 如果找不到路由 展示通用模板
import views from "koa-views";
import path from "path";

const defaultViewConfig = {
  extension: "ejs",
};

export default async (app) => {
  const viewConfig = app.config.view;
  // join和resolve区别
  // console.log('path.join(app.appPath, "./view")', path.join(app.appPath, "./view"));
  // console.log('path.resolve(app.appPath, "./view")', path.resolve(app.appPath, "./view"));

  app.use(views(path.join(app.appPath, "./view"), Object.assign(defaultViewConfig, viewConfig)));
};
