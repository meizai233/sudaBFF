// 为什么可以用import: tsconfig - 配置es6支持
import Koa from "koa";
import path from "path";
// import * as path from "path";
import { deepMerge, getHooks } from "./utils";
import { Hook, App } from "./types";
const hooks = ["cors", "lift", "router", "static"];

// parmas 环境
type Parmas = {
  appPath: string;
};
// 获取不同环境下的config
// 把特性config合并到base config
export default async function Suda(params: Parmas) {
  // new一个app
  const app: App = new Koa();
  const { appPath } = params;
  app.appPath = appPath;

  // 查找文件 拿到所有的config
  const env = process.env.NODE_ENV;
  // 此处应该是后缀名
  // 开发环境时是ts，其他环境被打包成js
  // 待办 此处有点抽象
  const extName = (app.extName = env === "development" ? ".ts" : ".js");
  const baseConfig = await import(path.join(appPath, `config/config.base${extName}`));
  const curConfig = await import(path.join(appPath, `config/config.${env}${extName}`));
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));

  // 获取所有hooks
  const allHooks: Hook[] = await getHooks(hooks);
  for (const hook of allHooks) {
    try {
      // 调用hooks
      await hook.default(app);
    } catch (err) {}
  }

  app.on("error", (err) => {});
}
