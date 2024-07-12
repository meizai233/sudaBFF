// 请求方法 请求处理逻辑
export default {
  method: "POST",
  handler: async (ctx) => {
    console.log("ctx.req.body", ctx.request.body);

    const { username } = ctx.user;
    ctx.body = "my name is " + username;
    // throw Error("Error!!!!!");
  },
};
