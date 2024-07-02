```{
"name": "diudiu-core",
"version": "0.0.1",
"description": "diudiu core",
"main": "./dist/core/index.js",
"scripts": {
"build": "rm -rf ./dist && npx tsc"
},
"author": "liujianghong",
"license": "ISC"
}
```

- 为什么 main 用 dist 里的
- "build": "rm -rf ./dist && npx tsc" 这一段啥意思
- tsc 是啥
- lerna 的功能 以及痛点 还是很抽象
  - 大意是管理多个包共享的依赖包
- NODE_ENV=development nodemon -e ts,ejs --exec ts-node -T ./example/app.ts 这句话啥意思
- npx lerna bootstrap 什么时候需要用到这条命令
- 为什么 app.ts 的 es module 语法可以用在 node？
  - ts-node 应该做了兼容

## 项目目录
