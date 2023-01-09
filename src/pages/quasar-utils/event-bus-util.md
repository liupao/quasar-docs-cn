---
title: 事件总线工具
desc: Quasar 提供了一个全局的事件总线工具
keys: EventBus,bus,event
badge: v2.8.4+
---

Quasar 提供了一个全局的事件总线工具，从 Quasar V1 升级时特别有用，因为 vue 2 中的一些原生接口被删除了。

### 方法

```js
class EventBus {
  on (event: string, callback: Function, ctx?: any): this;
  once (event: string, callback: Function, ctx?: any): this;
  emit (event: string, ...args: any[]): this;
  off (event: string, callback?: Function): this;
}
```

### 用法

```js
import { EventBus } from 'quasar'

const bus = new EventBus()

bus.on('some-event', (arg1, arg2, arg3) => {
 // do some work
})

bus.emit('some-event', 'arg1 value', 'arg2 value', 'arg3 value')
```

### 方便的用法

在应用程序中创建一个文件，实例化并导出新的事件总线，然后在整个应用程序中导入并使用它。

或者，在 Quasar CLI 项目中，为了方便（所以不是必须的），您可以创建一个启动文件并提供一个事件总线（确保在 quasar.config.js>boot 中注册它）：

```js
// 一个 Quasar 启动文件 (让我们命名为 /src/boot/bus.js)

import { EventBus } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  const bus = new EventBus()

  // for Options API
  app.config.globalProperties.$bus = bus

  // for Composition API
  app.provide('bus', bus)
})
```

然后，在您的任何组件中，您都可以使用：

```js
// Options API
this.$bus

// Composition API
import { inject } from 'vue'

const bus = inject('bus') // 在 setup() 中
```
