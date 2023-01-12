---
title: Quaasr 中的$q 对象
desc: 如何使用 Quaasr 中的$q 对象。
related:
  - /vue-composables/use-quasar
---
Quasar 提供了一个名为$q 的对象，可以通过它来实现各种需求，本文档的很多地方都会用到它。

下面是这个对象的详细属性：
| 属性 | 类型 | 描述 |
| --- | --- | --- |
| `$q.version` | String | Quasar 版本 |
| `$q.platform` | Object | 与平台信息相关的对象，详见[Platform](/options/platform-detection) |
| `$q.screen` | Object | 与屏幕插件相关的对象，详见[Screen Plugin](/options/screen-plugin). |
| `$q.lang` | Object | Quasar 语言包管理相关,  ([全部语言包列表](https://github.com/quasarframework/quasar/tree/dev/ui/lang))，是为 Quasar 组件设计的，但您也可以将其用到自己的项目中。更多信息请看: [Quasar Language Packs](/options/quasar-language-packs). |
| `$q.iconSet` | Object | Quasar 图标管理 ( [全部图标列表](https://github.com/quasarframework/quasar/tree/dev/ui/icon-set))。 更多信息请看: [Quasar Icon Sets](/options/quasar-icon-sets). |
| `$q.cordova` | Object | Cordova 全局对象的引用，只有在 Cordova 平台下才能访问。 |
| `$q.capacitor` | Object | Capacitor 全局对象的引用，只有在 Capacitor 平台下才能访问。 |

## 用法

下面分别演示如何在 vue 文件之中和 vue 文件之外使用它（包括组合式 API 和 选项式 API）
### 组合式 API

在 vue 文件中:

```html
<template>
  <div>
    <div v-if="$q.platform.is.ios">
      这个元素只会在 iOS 平台下被渲染
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'

export default {
  setup () {
    const $q = useQuasar()

    console.log($q.platform.is.ios)

    // 这里只是演示在函数中使用
    // 但其实它可以在 vue script 中的任何地方都可以访问
    function show () {
      // 打印 Quasar 的版本
      console.log($q.version)
    }

    return {
      show
    }
  }
}
</script>
```

### 选项式 API

在 vue 文件中:

```html
<template>
  <div>
    <div v-if="$q.platform.is.ios">
      Gets rendered only on iOS platform.
    </div>
  </div>
</template>

<script>
// 选项式 api 的 export 之外无法访问到$q

export default {
  // 在 vue 组件之内
  ...,

  // 这里只是演示在函数中使用
  // 但其实它可以在 vue script 的 export 中的任何地方都可以访问
  methods: {
    show () {
      // 打印 Quasar 的版本
      console.log(this.$q.version)
    }
  }
}
</script>
```

### 在 vue 文件外:

```js
import { Quasar } from 'quasar'

console.log(Quasar.platform.is.ios)
```
