---
title: SSR 的常见问题
desc: (@quasar/app-webpack)  Quasar 服务端渲染的提示与技巧。
---

## 为什么我获得了一个水化（Hydration）错误?

看一下 [客户端水化](/quasar-cli-webpack/developing-ssr/client-side-hydration) 页面。当您获得一个水化错误时，代表服务端渲染的 HTML 与客户端生成的 HTML 结构不匹配。这个报错只会在开发环境下出现，因此在发布网站之前一定要解决该错误。如果有一些内容只想在客户端渲染，那么可以使用 [QNoSsr](/vue-components/no-ssr) 组件。

## 为什么导入 Platform 和 Cookies 不会生效？
当构建 SSR 只能使用 `$q.platform`/`$q.cookies` 的格式使用相关的 api 。如果您想在服务端渲染时使用 `import { Platform, Cookies } from 'quasar'`  的格式，那么您需要像下面这样做：

```js
//  以 Platform 为列，Cookies 也是类似的
import { Platform } from 'quasar'

// 需要访问 `ssrContext` 对象
function (ssrContext) {
  const platform = process.env.SERVER
    ? Platform.parseSSR(ssrContext)
    : Platform // 否则我们咋客户端可以直接使用

  // 这时 platform 就等价于在非 SSR 模式中导入的 Platform
}
```

可以在以下几个地方访问到它`ssrContext` 对象：[boot 文件](/quasar-cli-webpack/boot-files)的函数参数中、[preFetch](/quasar-cli-webpack/prefetch-feature)的函数参数中。

在客户端渲染的应用中，每个用户都在自己的浏览器上有一个单独的、新的应用实例，在服务端渲染时，我们也希望如此：每个请求可以得到一个新的，独立的应用实例，从而不会发生跨请求状态污染。所以[Platform](/options/platform-detection) 和 [Cookies](/quasar-plugins/cookies) 分别绑定到每个请求中。


更多相关信息请参考 [编写通用的代码](/quasar-cli-webpack/developing-ssr/writing-universal-code) 文档页面。

## 为什么 LocalStorage 和 SessionStorage 不能正常运行？

在代码在服务器端运行时，存储设施无法工作。Web Storage 是一种仅限浏览器中特有的 API。
