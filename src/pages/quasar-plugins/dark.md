---
title: Dark Plugin
desc: 一个可以切换应用暗色模式开关的Quasar插件。
keys: Dark
related:
  - /style/dark-mode
  - /style/theme-builder
---

::: tip 提示
为了更好的理解这个插件的工作原理，请先阅读[Dark Mode](/style/dark-mode)页面。
:::

## Dark API

<doc-api file="Dark" />

## 安装
这个插件会自动被安装，不需要做额外的配置就可以直接使用。

##  用法

::: warning 警告
不要手动给下面的`isActive` 或 `mode` 赋值，而是使用`set(val)`函数去改变他们
:::

### 在Vue文件之内

```js
import { useQuasar } from 'quasar'
setup () {
  const $q = useQuasar()

  // 查询暗色模式是否被开启
  console.log($q.dark.isActive) // true, false

  // 查询配置信息
  console.log($q.dark.mode) // "auto", true, false

  // 设置暗色模式状态
  $q.dark.set(true) // or false or "auto"

  // 切换暗色模式开关
  $q.dark.toggle()
}
```

构建 **SSR** 时，需要在`/src/App.vue`文件中通过下述方式实现:

```js
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    // 在这里调用等价于组件的 onCreated声明周期
    $q.dark.set(true)
  }
}
```

### 在Vue文件之外

```js
// 警告！这个函数在SRR中不可用

import { Dark } from 'quasar'

// 查询暗色模式是否被开启
console.log(Dark.isActive)

// 查询配置信息
console.log(Dark.mode) // "auto", true, false

// 设置暗色模式状态
Dark.set(true) // or false or "auto"

// 切换暗色模式开关
Dark.toggle()
```

### 通过 quasar.config.js

你也可以通过`/quasar.config.js`来设置暗色模式的状态：

```js
framework: {
  config: {
    dark: 'auto' // or Boolean true/false
  }
}
```

## 开发SSR时注意

当开发**SSR**时:

* `import { Dark } from 'quasar'`
这种方式使用暗色模式不会报错，但是也不会成功运行（它不会在ssr模式中做任何事情），你可以通过另外两种方式实现，我们推荐使用quasar.config.js
* 最好避免在开发SSR中将Dark的mode设置为'auto'，这是因为在server端无法推断客户端的暗模式首选项，因此server端将始终在亮模式下渲染，然后当客户端接管时，它将切换到暗模式（如果是这种情况）。因此，屏幕将快速闪烁。

## 监听状态的变化

```vue
<template>...</template>

<script>
import { useQuasar } from 'quasar'
import { watch } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    watch(() => $q.dark.isActive, val => {
      console.log(val ? 'On dark mode' : 'On light mode')
    })
  }
}
</script>
```
