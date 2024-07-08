export default (app) => {
  return {
    // 开发环境配置
    devServer: {
      port: 8888,
    },
    router: "file",
    // router: "koa-router",
    // 静态服务器配置
    static: {},
    // cors配置
    cors: {
      // origin: "http://127.0.0.1:4000",
      origin: "*",
      maxAge: 0,
    },
    middlewares: ["one", "two"],
  };
};
