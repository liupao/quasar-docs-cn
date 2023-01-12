---
title: 全屏插件
desc: 一个可以切换全屏状态的 Quasar 插件。
keys: AppFullScreen
---
有些时候，您可能希望您的网站/app，运行在全屏状态下。Quasar 通过封装[Web Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API)提供了一个全屏插件。


::: warning 警告
请注意，由于 Web Fullscreen API 没有还固定的标准，所以在不同的平台上，这个全屏行为不一致。
:::

## AppFullscreen API

<doc-api file="AppFullscreen" />

## 安装
<doc-installation plugins="AppFullscreen" />

##  用法
::: tip 提示
关于完整的属性和方法，请查看 API 部分。
:::

```js
// 在 Vue 文件之外这样使用
import { AppFullscreen } from 'quasar'

//请求进入全屏模式:
AppFullscreen.request()
  .then(() => {
    // 成功!
  })
  .catch(err => {
    // oh, no!!!
  })

// 退出全屏模式:
AppFullscreen.exit()
  .then(() => {
    // 成功!
  })
  .catch(err => {
    // oh, no!!!
  })
```

```js
// 在 Vue 文件之内这样使用

import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  //请求进入全屏模式:
  $q.fullscreen.request()
    .then(() => {
      // success!
    })
    .catch(err => {
      // oh, no!!!
    })

  // 退出全屏模式:
  $q.fullscreen.exit()
    .then(() => {
      // success!
    })
    .catch(err => {
      // oh, no!!!
    })
}
```

<doc-example title="基础" file="AppFullscreen/Basic" />

<doc-example title="在一个指定的元素上全屏" file="AppFullscreen/Targeted" />

::: warning 警告
在一些手机上，可能会有一些小影响：
* 例如在三星 S4 上，当 App 进入全屏模式后，顶部栏会向上滑动，然后保留在屏幕上。
* 在 Nexus 手机上，例如 Nexus 5，安卓导航键和顶部状态栏会完全消失。
这完全取决于 Web Fullscreen API 在代码运行的平台上的支持程度。
:::

## 监听全屏状态的变化

```vue
<template>...</template>

<script>
import { useQuasar } from 'quasar'
import { watch } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    watch(() => $q.fullscreen.isActive, val => {
      console.log(val ? '目前是全屏' : '已退出全屏')
    })
  }
}
</script>
```
