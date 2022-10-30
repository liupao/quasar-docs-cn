---
title: 浏览器兼容性
desc: (@quasar/app-webpack) 如何处理Quasar CLI 项目的浏览器兼容性。
related:
  - /quasar-cli-webpack/quasar-config-js
---

## 配置兼容性
您的 `/package.json` 文件中应该包含一个 `browserslist` 字段。这会告诉 Quasar 应用兼容的浏览器范围。Babel 和 Autoprefixer 会使用这个字段来决定如何转译 JS 代码（如果转译开关被打开）以及哪些 CSS 兼容性前缀会被添加到您的 CSS 代码中。

Babel 将精确地寻找需要转译的 JS 特性（基于配置的浏览器）并应用它们。不过，要注意这一点，因为在选项列表中添加一个 "bad apple" 就足够了，这将使您的代码转译到 ES5。

以下是创建 Quasar 项目时默认的  "browserslist"：

```js
// package.json

"browserslist": [
  "last 10 Chrome versions",
  "last 10 Firefox versions",
  "last 4 Edge versions",
  "last 7 Safari versions",
  "last 8 Android versions",
  "last 8 ChromeAndroid versions",
  "last 8 FirefoxAndroid versions",
  "last 10 iOS versions",
  "last 5 Opera versions"
]
```
更多关于 `autoprefixer` 的设置范围[请参考 browserslist](https://github.com/browserslist/browserslist)。
