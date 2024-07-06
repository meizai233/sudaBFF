export default (app) => {
  return {
    // 开发环境配置
    devServer: {
      port: 8888,
    },
    // router: "file",
    router: "koa-router",
    // 静态服务器配置
    static: {},
  };
};
