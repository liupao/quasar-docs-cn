---
title: LoadingBar
desc: A Quasar plugin that wraps the QAjaxBar component for the easiest way of showing such a loading indicator in an app.
keys: LoadingBar
related:
  - /vue-components/ajax-bar
  - /vue-components/linear-progress
  - /vue-components/skeleton
---
如果你不想使用[QAjaxBar](/vue-components/ajax-bar)组件的话，Quasar 的 LoadingBar 插件提供了一个更简单的方式来为 ajax 请求添加一个进度条。

请转到[QAjaxBar](/vue-components/ajax-bar)组件页面查看示例 demo。

## LoadingBar API

<doc-api file="LoadingBar" />

## 安装

<doc-installation plugins="LoadingBar" config="loadingBar" />

LoadingBar options are same as when configuring a [QAjaxBar](/vue-components/ajax-bar).

::: warning
当使用 UMD 版本的 quasar 时，所有的组件和插件都会默认安装，也包括 LoadingBar。如果你想禁用它，请配置`loadingBar: { skipHijack: true }`（关闭侦听 Ajax 流量）。
:::

## 用法

在 Vue 组件内：
```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.loadingBar.start()
  $q.loadingBar.stop()
  $q.loadingBar.increment(value)
}
```

在 Vue 组件外：

```js
import { LoadingBar } from 'quasar'

LoadingBar.start()
LoadingBar.stop()
LoadingBar.increment(value)
```

### 默认配置

相较于每次调用时都传入配置对象，你可能更希望有一些全局的默认配置，你可以通过 quasar.config.js > framework > config > loadingBar: {...} 对象来为 LoadingBar 插件指定一个全局的默认配置，或者调用`LoadingBar.setDefaults({...})` 或 `$q.loadingBar.setDefaults({...})`函数。配置对象中支持[QAjaxBar](/vue-components/ajax-bar) 中全部的 props 参数。

在 Vue 组件内：

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.loadingBar.setDefaults({
    color: 'purple',
    size: '15px',
    position: 'bottom'
  })
}
```

在 Vue 组件外(包括在 boot 文件中):

```js
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'purple',
  size: '15px',
  position: 'bottom'
})
```

### 过滤部分的 Ajax 请求 <q-badge align="top" color="brand-primary" label="v2.4.5+" />

若你想只为指定部分的 URL 请求触发 LoadingBar 加载进度条，此时可以通过上述的`setDefaults()`函数内配置`hijackFilter`字段：

```js
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  // 返回一个 boolean 值，表示当前 url 是否会触发 LoadingBar
  hijackFilter (url) {
    // 示例： (只捕获 https://my-service.com/* )
    return /^https:\/\/my-service\.com/.test(url)
  }
})
```
