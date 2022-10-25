---
title: App 可见性
desc: 这个 Quasar 插件封装了 Page Visibility API，让你可以知道你的 App 当前是否可见。
keys: AppVisibility
---
Quasar 插件封装了 [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) 让你可以知道你的 App 当前是否可见。

## AppVisibility API

<doc-api file="AppVisibility" />

## 安装

<doc-installation plugins="AppVisibility" scrollable />

## 用法

```js
// 在 Vue 文件之外
import { AppVisibility } from 'quasar'
AppVisibility.appVisible // Boolean

// 在 Vue 文件之内
import { useQuasar } from 'quasar'
setup () {
  const $q = useQuasar()
  // now use $q.appVisible (Boolean)
}
```

<doc-example title="AppVisibility" file="AppVisibility/Basic" />

## 监听状态的变化

```vue
<template>...</template>

<script>
import { useQuasar } from 'quasar'
import { watch } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    watch(() => $q.appVisible, val => {
      console.log(val ? 'App 变得可见' : 'App 进入后台')
    })
  }
}
</script>
```
