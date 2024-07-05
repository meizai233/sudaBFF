import Router from "koa-router";
const router = new Router();

router.prefix("/user");
router.get("/getInfo", (ctx, next) => {
  ctx.body = "my name is suda, this is koa-router";
});

export default router;
