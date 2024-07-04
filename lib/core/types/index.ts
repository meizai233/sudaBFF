import Koa from "koa";

export interface Hook {
  default: (app: any) => void;
}

export interface App extends Koa {
  appPath: string; //这啥
  extName: string; //前缀
  config: any;
}
