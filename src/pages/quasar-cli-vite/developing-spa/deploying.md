---
title: 部署 SPA
desc: (@quasar/app-webpack) 如何部署 Quasar CLI 打包出来的单页应用（SPA）。
---

有许多服务可以轻松部署应用程序。将其全部列出是不可能的，因此我们将专注于一般部署过程和一些普通服务的细节。

如果缺少您最喜欢的部署工具，请在 GitHub 上创建一个拉取请求，将其添加到列表中。


## 通用部署

部署 Quasar SPA 的第一步总是打包一个用于生产环境的构建产物，这样可以去掉开发语句并缩小源代码。

要生成这样的构建产物，请使用 Quasar CLI 和以下命令：

```bash
$ quasar build
```

该命令会以 SPA 模式打包项目，构建产物默认输出在 `/dist/spa` 目录下。

要为生产环境下的构建产物提供服务，需要使用一个 web 服务器，以便通过 http(s):// 协议提供服务。简单地从浏览器中打开 `index.html` 文件是行不通的，因为它使用的是 file:// 协议。

常用的 web 服务器有 [nginx](https://www.nginx.com/), [Caddy](https://caddyserver.com/), [Apache](https://httpd.apache.org/), [Express](https://expressjs.com/) 等。但是您可以选择任何您想要的 web 服务器。

该 web 服务器不需要特殊设置（除非您在 `quasar.config.js` 中配置了使用 "history" 模式的 Vue 路由）。主要要求是能够从一个目录中提供静态文件，因此请查阅 web 服务器的文档，了解如何设置静态文件服务。

拿 nginx 举例：

```
server {
    listen 80 http2;
    server_name quasar.myapp.com;

    root /home/user/quasar.myapp.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/quasar.myapp.com-error.log error;

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

## 重要的部署机器配置

有一点很重要，不要允许浏览器缓存 `index.html` 文件，应用的更新可能因为浏览器从缓存中加载 `index.html` 而被忽略。

所以在部署的主机上，必须为 `index.html` 文件添加 `"Cache-Control": "no-cache"` 响应头。

例如，使用 Google Firebase 部署时，需要在 `firebase.json` 中添加如下配置：

```json
{
  "hosting": {
    "headers": [
      {
        "source": "/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-cache, no-store, must-revalidate"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp|js|css|eot|otf|ttf|ttc|woff|woff2|font.css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=604800"
          }
        ]
      }
    ]
  }
}
```

## 使用 Vercel 部署
部署 Quasar 单页应用到 [Vercel](https://vercel.com/) 非常简单。只需要安装 [vercel-cli](https://vercel.com/download#now-cli) 然后登陆：
```bash
$ vercel login
```

然后继续使用<a class="doc-link" href='#通用部署'>通用部署</a>部分中描述的步骤来打包您的 Quasar 应用程序。

打包成功后，进入部署根目录中（例如：`/dist/spa`），然后运行：
```bash
# from /dist/spa (or your distDir)
$ vercel
```

Vercel CLI 现在应该显示相关部署的信息，如 URL。就这样，已经成功了。

### Vercel 配置

在部署时给项目添加一些配置。

* 重要：Vercel 希望构建产物位于 `/public` 目录，但是 Quasar 的构建产物默认位于 `/dist/spa`。所以您可以在您的 Vercel 项目中将 `Output Directory` 设置为 `dist/spa`，访问 Vercel 的网页控制台，转到您的项目 > settings > Build & Development Settings。


* 由于 Vercel 还期望一个打包脚本，可以在 `package.json` 中提供以下脚本：
```json
  {
    ..
    "scripts": {
      ...
      "build": "quasar build",
      "deploy": "vercel"
    }
  }
```

* 为了在部署的应用程序中支持 SPA 路由，请考虑在根文件夹中添加 `vercel.json` 文件：
```json
{
  "routes": [
    { "handle": "filesystem" },
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```
## 使用 Heroku 部署

不幸的是，Heroku 不支持开箱即用的静态站点。但是不用担心，只需要在项目中添加一个 HTTP 服务器，这样 Heroku 就可以为我们的 Quasar 应用程序提供服务了。

在本例中，我们将使用 [Express](https://expressjs.com/)  创建 Heroku 可以使用的最小服务器

首先，为项目安装所需的依赖项：project:
```bash
$ yarn add express serve-static connect-history-api-fallback
```

然后添加服务器，在项目的根目录中创建一个名为 `server.js` 的文件。
```js
const
  express = require('express'),
  serveStatic = require('serve-static'),
  history = require('connect-history-api-fallback'),
  port = process.env.PORT || 5000

const app = express()

app.use(history())
app.use(serveStatic(__dirname + '/dist/spa'))
app.listen(port)
```

Heroku 期望有一组 npm 脚本可用，因此需要修改 `package.json` 并在 `script` 部分下面添加以下内容:

```js
"build": "quasar build",
"start": "node server.js",
"heroku-postbuild": "yarn && yarn build"
```

现在是时候在 Heroku 上通过运行以下命令创建一个应用程序了:

```bash
$ heroku create
```

并使用以下方法部署到 Heroku：

```bash
$ git init
$ heroku git:remote -a <heroku app name>

$ git add .
$ git commit -am "make it better"
$ git push heroku master
```

对于现有的 Git 仓库，只需添加 heroku 远程:

```bash
$ heroku git:remote -a <heroku app name>
```

## 使用 Surge 部署

[Surge](https://surge.sh/) 是托管和部署静态站点的流行工具。

如果要使用 Surge 部署应用程序，首先需要安装 Surge CLI 工具：

```bash
$ npm install -g surge
```

接下来，使用 Quasar CLI 构建应用程序：

```bash
$ quasar build
```

通过调用以下命令使用 Surge 部署应用程序：

```bash
$ surge dist/spa
```
现在，您的应用程序应成功地使用 Surge 部署。您应该能够使本指南适应任何其他静态站点部署工具。

## 使用 GitHub Pages 部署

要将 Quasar 应用程序部署到 GitHub Pages，第一步是在 GitHub 上创建一个名为 `<username>.github.io` 的特殊仓库，并将此存储库克隆到本地。

接下来，像
<a class="doc-link" href='#通用部署'>通用部署</a>
中所描述的那样打包 Quasar 应用，构建产物将会在 `/dist/spa` 中。将此文件夹的内容复制到刚才克隆的仓库中。

最后一步是在该仓库中添加提交并推送到 GitHub。不久之后，应该就可以访问 `https://<username>.github.io/` 上的 Quasar 应用程序。

### 给 GitHub pages 添加一个自定义域名

有关如何设置自定义域的详细说明，请参阅 [GitHub 页面指南](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)。

### 通过 push-dir 自动部署到 GitHub pages

手动将所有文件复制到 GitHub Pages 仓库可能是一项繁琐的任务。使用 [push-dir](https://github.com/L33T-KR3W/push-dir) 包可以自动执行此步骤。

第一步，安装：

```js
$ yarn add --dev push-dir
```

然后在 `package.json` 添加一个 `deploy` 脚本：

```json
"scripts": {
  "deploy": "push-dir --dir=dist/spa --remote=gh-pages --branch=master"
}
```

添加您的 GitHub Pages 仓库作为一个远程仓库，命名为 `gh-pages`：

```bash
$ git remote add gh-pages git@github.com:<username>/<username>.github.io.git
```

现在，您可以使用以下方法构建和部署应用程序：

```bash
$ quasar build
$ yarn deploy
```

它将把构建目录的内容推送到 GitHub Pages 仓库的主分支。
