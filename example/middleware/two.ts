export default (app) => {
  return (ctx, next) => {
    console.log("this is the second middleware");

    return next();
  };
};
