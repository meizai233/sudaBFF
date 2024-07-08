export default (app) => {
  return (ctx, next) => {
    console.log("this is the first middleware");

    return next();
  };
};
