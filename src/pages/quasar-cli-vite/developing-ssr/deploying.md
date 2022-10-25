---
title: 部署 SSR
desc: (@quasar/app-vite) 如何部署一个 Quasar 服务端渲染的应用。
---

当部署一个 SPA 或者 PWA 时,将 Quasar CLI 打包生成的整个产物目录放在服务端的静态目录下即可。然而这种方式针对 SSR 构建的产物却行不通。因为需要部署的内容还包括从 `/src-ssr` 目录中构建出来的服务端。

默认请求下，SSR 服务端使用 [Express](https://expressjs.com/)，但是也可以换成您选择的。

## Serverless

如果您需要将 SSR 部署到一个 Serverless 服务上，请参考  [SSR Production Export](/quasar-cli-vite/developing-ssr/ssr-webserver) 页面如何做为其一些准备工作。

## 产物目录

在 SSR 模式下构建应用程序后（`$ quasar build -m ssr`），生成的文件夹（默认为 `dist/ssr` ）中包含一个独立的 Web 服务器以提供 SSR 服务。

您会发现打包出来的产物中有一个自己的 `package.json` 文件，其中定义了启动服务的脚本 "start" :

```js
"scripts": {
  "start": "node index.js"
}
```
所以当部署时您需要将整个打包出来的文件夹复制到您的服务器上，然后为其安装依赖，然后运行 `$ yarn start`，该命令会启动 webserver 服务然后监听一个端口。

::: tip 提示
打包生成的文件夹是独立的，运行时不需要项目源代码，也不依赖于 `@quasar/cli`。
:::

## 优化性能
默认情况下，该 webserver 仅会利用服务器的一个 CPU 核心。如果您想它利用多个 cpu 核心，推荐使用 [PM2](http://pm2.keymetrics.io/) 作为解决方案。

先在您的服务器上安装 PM2 ，然后将 websever 的启动脚本修改为：
```js
"scripts": {
  "start": "pm2 start index.js"
}
```

## 部署到 Cleavr

您可以使用 [Cleavr](https://cleavr.io) 将 Quasar SSR 应用程序部署到几个流行的 VPS 提供商。Cleavr 将自动为您的应用程序启用群集模式的 PM2。

在 Cleavr 上创建一个新的 **NodeJS SSR** 项目，然后使用以下配置：

- **Entry point:** index.js
- **Build command:** npx quasar build --mode ssr
- **Artifact path:** dist/ssr

## 部署到 Vercel

::: tip
注意：以下内容不属于官方文档内容，属于夹带私货
:::

由于上面的 Cleavr 在国内无法访问，您可以使用由我个人开发的 [node-vercel](https://github.com/dongwa/vercel-quasar) 将您的 Quasar SSR 应用免费部署到 [vercel](https://vercel.com/) 上，它免费而且在国内不墙。

>（2022 年 9 月更新，“不墙”已经成为过去式了，不过您仍然可以将您的网站部署到 vercel 上，同时将自己的域名指向 vercel 给出的 IP 来提供服务，目前您访问的文档就是部署在其上。）

详细使用文档见仓库 [README](https://github.com/dongwa/vercel-quasar)

简单使用步骤：

1. 将 `src-ssr/server.js` 中的 `listen` 函数修改为同步函数，即移除所有的 async 和 await，例如：

``` js
/**
 * You need to make the server listen to the indicated port
 * and return the listening instance or whatever you need to
 * close the server with.
 *
 * The "listenResult" param for the "close()" definition below
 * is what you return here.
 *
 * For production, you can instead export your
 * handler for serverless use or whatever else fits your needs.
 */
export function listen({ app, port, isReady, ssrHandler }) {
  if (process.env.DEV) {
    await isReady();
    return app.listen(port, () => {
      if (process.env.PROD) {
        console.log('Server listening at port ' + port);
      }
    });
  } else {
    // in production
    // "ssrHandler" is a prebuilt handler which already
    // waits for all the middlewares to run before serving clients

    // whatever you return here is equivalent to module.exports.<key> = <value>
    return { handler: ssrHandler };
  }
}
```

2. 配置 node-vercel 为部署工具。注意，您不需要安装 node-vercel 依赖，只需要在项目根目录新建`vercel.json`文件，复制下面的内容即可：

  ``` json
  {
    "version": 2,
    "builds": [
      {
        "src": "package.json",
        "use": "vercel-quasar"
      }
    ]
  }
  ```

3. 打开[vercel](https://vercel.com/)官网，注册/登录账号，将您项目上传即可，vercel 会下载您的代码，使用 node-vercel 来部署。

4. node-vercel 打包构建项目时使用默认的 `npx quasar build -m ssr` 命令，如果您想自定义打包命令，只需要在 `package.json` 中配置 `build:ssr` 或者 `build` script 即可。`build:ssr` 的优先级大于 `build` ，如果两者同时存在，node-vercel 只会调用 `build:ssr` ，所以您可以使用 `build:ssr` 构建 SSR，使用 `build` 构建别的模式。

示例：
``` json
{
  "name": "quasar-example",
  "version": "1.0.0",
  "productName": "quasar-example",
  "scripts": {
    "dev": "quasar dev",
    "dev:ssr": "quasar dev -m ssr",
    "build:ssr":"node build/index.js && quasar build -m ssr",
  },
  "dependencies": {

  },
  "devDependencies": {

  },
}
```

5. 如果好用记得点个 [star](https://github.com/dongwa/vercel-quasar)，遇到问题可以提交 issue。
