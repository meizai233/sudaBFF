// 实现匹配路由
import { globSync } from "glob";
import path from "path";
import compose from "koa-compose";

const getRouterMap = async (app) => {
  try {
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

const getRouterFiles = (app) => {
  const routerFiles = globSync(path.resolve(app.appPath, "./routers", `**/*${app.extName}`));
  return routerFiles;
};

// 注册路由
// 可以单独开一个中间件目录
const registerRouter = async (routerFiles) => {
  try {
    let routers: any[] = [];
    for (let file of routerFiles) {
      const router = await import(file);

      // 返回一个中间件 routes()
      routers.push(router.default.routes());
    }
    // compose返回的是一个函数（也可以理解为中间件 该函数逐个调用组装的中间件函数）
    return compose(routers);
  } catch (e) {
    console.log(e);
  } finally {
  }
};

export default async (app) => {
  const { router } = app.config;
  if (router === "file") {
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
  } else if (router === "koa-router") {
    // 如果是koa-router
    const routerFiles = getRouterFiles(app);

    app.use(await registerRouter(routerFiles));
  }
};
