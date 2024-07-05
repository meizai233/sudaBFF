// 请求方法 请求处理逻辑
// controller 可以在这里存放文件路由
export default {
  method: "GET",
  handler: async (ctx) => {
    ctx.body = "this is apple";
  },
};
