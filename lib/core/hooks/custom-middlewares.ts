import path from "path";

// 在dev文件配置
// 作用 加载自定义的中间件 按顺序
export default async (app) => {
  const { middlewares } = app.config;

  for (let m of middlewares) {
    const curMidPath = path.resolve(app.appPath, "./middleware", `${m}${app.extName}`);
    const curMid = await import(curMidPath);
    app.use(curMid.default(app));
  }
};
