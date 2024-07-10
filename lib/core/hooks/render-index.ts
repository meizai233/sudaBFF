export default async (app) => {
  const viewConfig = app.config.view;

  app.use(async function (ctx, next) {
    await ctx.render("index");
    // next();
  });
};
