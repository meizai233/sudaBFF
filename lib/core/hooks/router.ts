// 参考
import { globSync } from "glob";
import path from "path";

const getRouterMap = async (app) => {
  try {
    const { router } = app.config;
    const routerMap = {};

    // 解析根目录 -> 相对路径 -> 通配符
    const fileList = globSync(path.resolve(app.appPath, "./controller", `**/*${app.extName}`));

    for (let item of fileList) {
      // 遍历导入
      const controller = await import(item);
      const { method, handler } = controller.default;

      // 组装方法和handle
      // 获取相对路径
      const relative = path.relative(`${app.appPath}/controller/`, item);

      const extname = path.extname(item);
      // /goods/getInfo
      const fileRouter = "/" + relative.split(extname)[0];
      const key = "_" + method + "_" + fileRouter;

      routerMap[key] = handler;
    }

    return routerMap;
  } catch (e) {
    console.log(e);
  } finally {
  }
};

export default async (app) => {
  const routerMap = await getRouterMap(app);

  app.use(async (ctx, next) => {
    // ctx包含请求的方法和路径

    const { path, method } = ctx;
    const key = "_" + method + "_" + path;

    // 如果匹配到 则执行

    if (routerMap[key]) {
      await routerMap[key](ctx);
    }
  });
};
