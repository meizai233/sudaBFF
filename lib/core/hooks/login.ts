// 进行单点登录 鉴权操作
import { sign, decode } from "jsonwebtoken";

export default async (app) => {
  const loginConfig = app.config.login;
  const { secret } = loginConfig; //密钥
  const { cookieOption } = loginConfig;

  if (loginConfig?.needLogin) {
    // 检查是否已经登陆
    const checkLogin = async (ctx, next) => {
      const token = ctx.cookies.get("suda_token");
      if (!token) {
        // 生成jwt 加密 设置cookie 种在当前域名
        const jwt = login();
        ctx.cookies.set("suda_token", jwt, cookieOption);
        // 302重定向
        ctx.status = 302;
        ctx.redirect(ctx.url);
        return;
      } else {
        const user = decode(token);
        if (user) {
          // 此处可以查询数据库
          ctx.user = user;
        }
        // 需要等后面中间件的异步函数执行完毕 才能执行next后面的语句
        // 如果不加await router中还没有解析完ejs 就已经执行next后面的语句并返回了
        await next();
      }
      console.log("洋葱");
    };
    // 生成jwt
    const login = () => {
      const jwt = sign({ username: "suda" }, secret, { expiresIn: "1h" });
      return jwt;
    };
    app.use(checkLogin);
  }
};
