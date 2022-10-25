---
title: 加载插件 Loading
desc: 这个 Quasar 插件可以通过旋转器和消息为你的应用程序展示加载状态。
keys: Loading
related:
  - /vue-components/linear-progress
  - /vue-components/circular-progress
  - /vue-components/inner-loading
  - /vue-components/spinners
  - /vue-components/skeleton
  - /quasar-plugins/loading-bar
  - /vue-components/ajax-bar
---
Loading（加载） 插件可以在你的页面上产生一个遮罩，并展示一个旋转的加载态，通知用户等待某个操作完成，避免在页面中添加复杂的加载逻辑。

## Loading API

<doc-api file="Loading" />

## 安装

<doc-installation plugins="Loading" config="loading" />

##  用法
触发 Loading 后会延迟（500ms）再显示，保证了快速操作不会使屏幕闪烁。这是因为显示然后迅速隐藏进度条使得用户没有机会看到发生了什么。显示之前的延迟消除了混乱。

在 vue 组件之内:

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.loading.show({
    delay: 400 // ms
  })

  $q.loading.hide()
}
```

在 vue 组件之外:

```js
import {
  Loading,

  // 下面的引入是可选的，是为了自定义加载样式
  QSpinnerGears
} from 'quasar'

// 默认配置
Loading.show()

// 自定义加载样式
Loading.show({
  spinner: QSpinnerGears,
  // 其他的属性
})

Loading.hide()
```

<doc-example title="默认配置" file="Loading/Default" />

<doc-example title="加上提示信息" file="Loading/WithMessage" />

<doc-example title="自定义容器" file="Loading/WithBox" />

<doc-example title="With unsafe message, but sanitized" file="Loading/WithMessageSanitized" />

<doc-example title="自定义" file="Loading/Customized" />

<doc-example title="展示之后切换加载画面" file="Loading/ShowAndChange" />

### 设置默认值
相较于每次使用时重新指定配置，你可能想为它们设置一些默认值，你可以通过 quasar.config.js > framework > config > loading: {...} 来配置全局的默认值，或者调用 `Loading.setDefaults({...})` 或 `$q.loading.setDefaults({...})`来配置。
