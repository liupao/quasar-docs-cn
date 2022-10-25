---
title: 管理 Google Analytics
desc: (@quasar/app-vite) How to use analytics in a Quasar hybrid mobile app with Cordova.
---

了解用户和衡量用户行为是 App 开发中的重要一步。不幸的是，在使用 Cordova 包装移动应用程序后，需要一些非标准工作才能使 Google Analytics 工作。在纯 Web 应用程序中设置 Google Analytics 非常容易，但 Cordova 会以某种方式阻止将浏览量和事件发送到 Google Analytics。

遵循本指南将 Google Analytics 应用到 Cordova 包装的 Quasar 应用程序中。

您可能还想阅读这些实用的教程：

- [Google Tag Manager and Analytics Setup for an SPA Website](https://jannerantala.com/tutorials/quasar-framework-google-tag-manager-and-analytics-setup-for-an-spa-website/)
- [Google Analytics Setup for a Cordova App](https://jannerantala.com/tutorials/quasar-framework-google-analytics-setup-for-cordova-app/)

::: warning
您需要在 `/src/index.template.html` 中包含 Google 提供的 `<script>` 标记，这会使您的应用程序依赖于网络连接！
:::

## 前提条件

* 确保所有路由都有明确的名称和路径参数。否则，它们不能被发布到 `ga.logPage` 函数。有关路由的更多信息，请参阅[Routing](/quasar-cli-vite/routing)。
* 了解 Google Analytics 的基本知识

## 准备

在我们开始将 Google Analytics 应用于您的应用程序之前，您需要有 [Google Analytics](https://analytics.google.com) 和 [Google Tagmanager](https://tagmanager.google.com/) 的帐户 。所以我们首先注册帐户。当您拥有这些帐户时，是时候配置标签管理器了。按照 [Multiminds 文章](https://www.multiminds.eu/blog/2016/12/google-analytics-and-tag-manager-with-ionic-and-cordova-apps/)中的步骤操作。

## 将其实施到项目中
> 对于本指南，我们假设您拥有发送给 Google Analytics 的固定 sessionId。 Google Analytics 使用 sessionId 来区分不同的用户。如果要创建匿名 sessionId，请参阅[用户 ID 分析文档](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id)。

将标签管理器代码片段放置到您的 `index.html` 文件的头部（如果您已按照[Multiminds 文章](http://www.multiminds.eu/2016/12/06/google-analytics-tag-manager-ionic-cordova/)做了，你已经有了这个。）在你的代码库中创建一个名为 `analytics.js` 的新文件，内容如下：

```javascript
export default {
  logEvent(category, action, label, sessionId = null) {
    window.dataLayer.push({
      appEventCategory: category,
      appEventAction: action,
      appEventLabel: label,
      sessionId: sessionId
    })
    window.dataLayer.push({ 'event': 'appEvent' })
  },

  logPage(path, name, sessionId = null) {
    window.dataLayer.push({
      screenPath: path,
      screenName: name,
      sessionId: sessionId
    })
    window.dataLayer.push({ 'event': 'appScreenView' })
  }
}
```

为确保您的应用中的所有网页都自动发布到 Google Analytics，我们创建了一个 boot 文件：

```bash
$ quasar new boot google-analytics [--format ts]
```

然后我们编辑新创建的文件： `/src/boot/google-analytics.js`:

```js
import ga from 'analytics.js'

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, sessionId)
  })
}
```
最后，我们在 `/quasar.config.js` 中注册 app 启动文件。 我们可以控制只在 Cordova 的应用程序里这样做：

```js
boot: [
  ctx.mode.cordova ? 'google-analytics' : ''
]
```

关于事件的更多信息可以在 [Analytics documentation on events](https://developers.google.com/analytics/devguides/collection/analyticsjs/events)中找到。

运行应用时，您会看到事件和浏览量。 在实时视图中注册浏览量通常需要大约 5 到 10 秒的时间。
