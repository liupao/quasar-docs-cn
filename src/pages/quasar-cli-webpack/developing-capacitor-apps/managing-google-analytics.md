---
title: 管理谷歌分析
desc: (@quasar/app-webpack) 如何在 Quasar 混合型移动应用程序 Capacitor 模式中使用谷歌分析。
---

了解用户和衡量用户行为是应用开发的重要步骤。不幸的是，在用 Capacitor 包装移动应用程序后，要让谷歌分析发挥作用，需要做一些非标准的工作。在纯网络应用程序中设置谷歌分析是相当容易的，但 Capacitor 却以某种方式阻止页面浏览和事件被发送到谷歌分析。

请按照本指南在 Capacitor 模式的 Quasar 应用中实现谷歌分析。

可能还想阅读这个教程：[SPA 网站的谷歌标签管理器和分析设置](https://jannerantala.com/tutorials/quasar-framework-google-tag-manager-and-analytics-setup-for-an-spa-website/)

::: warning 注意
需要在 `/index.html` 中包含一个由谷歌提供的 `<script>` 标签，这将使应用程序依赖于互联网连接！
:::

## 前提条件

* 确保所有路由都有一个指定的名称和路径参数。否则，它们不能被发布到 `ga.logPage` 函数。请参考 [路由](/quasar-cli-webpack/routing) 了解更多关于路由的信息。
* 具备谷歌分析的基本知识

## 准备工作

在开始实施谷歌分析之前，需要一个 [谷歌分析](https://analytics.google.com) 和 [谷歌标签管理](https://tagmanager.google.com/) 账号。按照这篇 [Multiminds article](https://www.multiminds.eu/blog/2016/12/google-analytics-and-tag-manager-with-ionic-and-cordova-apps/) 中的步骤来做。

## 在应用中实现

> 在本指南中，假设有一个固定的 sessionId，并将其发送给谷歌分析。谷歌分析使用 sessionId 来区分不同的用户。如果想创建一个匿名的 sessionId，见 [Cookie 和用户识别](https://developers.google.com/analytics/devguides/collection/analyticsjs/cookies-user-id)。

将标签管理片段放到 `index.html` 文件的头部（如果已经做了这里面的步骤：[Multiminds article](http://www.multiminds.eu/2016/12/06/google-analytics-tag-manager-ionic-cordova/)），新建文件 `analytics.js`，内容如下：

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

为了确保应用程序中的所有页面都自动发布到谷歌分析，创建一个应用程序启动文件：

```bash
$ quasar new boot google-analytics [--format ts]
```

然后编辑新建的文件 `/src/boot/google-analytics.js`：

```js
import ga from 'analytics.js'

export default ({ router }) => {
  router.afterEach((to, from) => {
    ga.logPage(to.path, to.name, sessionId)
  })
}
```

最后在启动文件 `/quasar.config.js` 中注册。如果需要的话，可以只对 Capacitor 包装的应用程序这样做：

```js
boot: [
  ctx.mode.capacitor ? 'google-analytics' : ''
]
```

关于活动的更多信息可在 [事件衡量](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) 中找到。

当运行应用程序时，会看到事件和页面浏览的到来。在实时视图中，通常需要大约 5 到 10 秒的时间来注册一个页面浏览。
