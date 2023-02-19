---
title: 目录结构
desc: (@quasar/app-vite) Quasa 项目的目录结构详解。
---

下面是安装了所有 Quasar 模式的项目的目录结构，不过不用担心！
::: tip
如果您是一个初学者，那么您只需要关系那么几个文件即可，`/quasar.config.js` （Quasar 项目配置文件）, `/src/router`, `/src/layouts`, `/src/pages` 和可选的 `/src/assets`。
:::

``` bash
.
├── public/                  # 纯静态资源 （会被直接复制到产物目录中）
├── src/
│   ├── assets/              # 动态的静态资源（会被 vite 进行处理打包）
│   ├── components/          # 可用于 pages & layoute 中的 .vue 文件组件
│   ├── css/                 # CSS/Sass/... 样式文件
|   |   ├── app.sass
|   │   └── quasar.variables.sass # Quasar SASS 变量供您调整
│   ├── layouts/             # 布局页面文件
│   ├── pages/               # .vue 页面文件
│   ├── boot/                # boot 启动文件（项目初始化时会被执行的代码）
│   ├── router/              # Vue Router
|   |   ├── index.js         # Vue Router 初始化
|   │   └── routes.js        # 定义路由
│   ├── stores/              # Pinia Stores (全局状态管理库 Pinia 和 Vuex 二选一即可)
|   |   ├── index.js         # Pinia 初始化
|   │   ├── <store>          # Pinia stores...
|   │   └── <store>...
│   ├── store/               # Vuex Store (全局状态管理库 Pinia 和 Vuex 二选一即可)
|   |   ├── index.js         # Vuex Store 定义
|   │   ├── <folder>         # Vuex Store 模块...
|   │   └── <folder>         # Vuex Store 模块...
│   └── App.vue              # 项目的 Vue 根组件
├── index.html               # index.html 模板文件
├── src-ssr/                 # SSR 模式专属文件 (例如生产环境的 Node web 服务器)
├── src-pwa/                 # PWA 模式专属文件 (例如 Service Worker)
├── src-cordova/             # Cordova 生成的用于构建手机应用的目录
├── src-electron/            # Electron 模式专属文件 (例如主进程文件)
├── src-bex/                 # BEX (浏览器插件) 模式专属文件 (like "main" thread)
├── dist/                    # 打包构建产物目录
│   ├── spa/                 # 例如构建 SPA 时
│   ├── ssr/                 # 例如构建 SSR 时
│   ├── electron/            # 例如构建 Electron 时
│   └── ....
├── quasar.config.js         # Quasar 项目配置文件
├── .gitignore               # GIT 忽略配置文件
├── .editorconfig            # editor 配置文件
├── .eslintignore            # ESlint 忽略配置文件
├── .eslintrc.js             # ESlint 配置文件
├── postcss.配置文件.js        # PostCSS 配置文件
├── js 配置文件.json            # Editor 配置文件 (如果没有使用 ts 的话)
├── ts 配置文件.json            # Typescript 配置文件
├── package.json             # npm 脚本或者依赖管理
└── README.md                # 您的网站/App 的 readme 文件
```
