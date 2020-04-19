# vuecli3

## 安装包

> npm install
> cnpm install

## 启动项目

> npm run serve

## 打包

> npm run build

## 新增插件方法

> 终端命令： vue add name
> 可以自动更改界面内容，通常ui库使用

## 目录结构

1. node_modules - 包文件
2. public - indx.html 和 favicon.icon
3. src - 路径文件
   3.1 assets - 静态文件（img,js,css）
   3.2 components - 组件
   3.3 router - 路由文件
   3.4 views - 视图文件
   3.5 App.vue - 根路径
   3.6 main.js - 入口文件
4. .gitignore - git 忽略文件
5. babel.config.js - webpack 语法转换文件
6. package-lock.json - 所有包
7. package.json - 环境包和开发包,启动指令等（重要）
8. README.md - markdom 文件
9. vue.config.js - webpack配置文件

## 环境变量

自定义时需要在 package.json 的 scrips 中加入：
"name" : "vue-cli-service server/build --mode name"

| 模式        | 对应 npm 命令 | 对应文件名       |
| ----------- | ------------- | ---------------- |
| 空 | 任意        | .env 不匹配时调用|
| development | server        | .env.development |
| production  | build         | .env.production  |
| test        | test          | .env.test        |
| 自定义      | 自定义        | .env.自定义      |

## 独立运行vue文件
> 终端指令：vue serve name.vue


