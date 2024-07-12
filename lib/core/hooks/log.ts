import log4js from "log4js";
import path from "path";
export default async (app) => {
  const logConfig = app.config.log;
  const dir = logConfig.dir;

  log4js.configure({
    appenders: {
      out: { type: "stdout" },
      access: {
        type: "dateFile",
        filename: path.join(dir, "access"),
        alwaysIncludePattern: true,
        pattern: "yyyy-MM-dd-hh.log",
      },
      error: {
        type: "dateFile",
        filename: path.join(dir, "error"),
        alwaysIncludePattern: true,
        pattern: "yyyy-MM-dd-hh.log",
      },
      application: {
        type: "dateFile",
        filename: path.join(dir, "application"),
        alwaysIncludePattern: true,
        pattern: "yyyy-MM-dd-hh.log",
      },
    },
    categories: {
      default: { appenders: ["out"], level: "info" },
      access: { appenders: ["access"], level: "info" },
      error: { appenders: ["error"], level: "error" },
      application: { appenders: ["application"], level: "info" },
    },
  });

  // 订阅事件
  process.on("access", (msg) => {
    debugger;
    const accessLog = log4js.getLogger("access");
    accessLog.info(msg);
  });

  process.on("error", (msg) => {
    debugger;
    const errorLog = log4js.getLogger("error");
    errorLog.info(msg);
  });

  process.on("application", (msg) => {
    const applicationLog = log4js.getLogger("application");
    applicationLog.info(msg);
  });

  app.use((ctx, next) => {
    // 记录access日志
    process.emit("access", JSON.stringify(ctx));

    // 在ctx上挂在用户自定义日志
    ctx.log = (...arg) => {
      process.emit("application", arg);
    };

    // ctx上挂在error日志
    // ctx上手动触发日志保存
    ctx.error = (...arg) => {
      process.emit("error", arg);
    };

    return next();
  });
};
