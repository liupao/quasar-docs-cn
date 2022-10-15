---
title: 使用 Pinia 管理状态
desc: (@quasar/app-vite) 在Quasar项目中如何使用 Pinia。
---

在大型应用程序中，由于多个组件都有自己的状态并且相互依赖，使得状态管理变得很复杂。

如果组件之间想要共享同一个状态，我们推荐您使用 Pinia。开始之前我们希望您已经了解了 [Pinia 的文档](https://pinia.vuejs.org/)。[Vue dev-tools](https://github.com/vuejs/vue-devtools) 还对 pinia 作了特性支持。

我们不会详细讨论如何配置或使用 Pinia，因为它有很棒的文档。相反，我们将向您展示在 Quasar 项目中使用它时，目录结构是什么样子的：

```bash
.
└── src/
    └── stores/       # Pinia
        ├── index.js  # Pinia initialization
        ├── <store>   # Pinia store...
        └── <store>   # Pinia store...
```

当您使用 Quasar CLI 创建项目时，它会询问是否要添加 Pinia 并为您准备好所有必要的配置，包括帮您创建好上述的 `src/stores` 目录结构，在其中包括了与 Pinia 相关的必要的代码。

如果您在创建项目时未选择添加 Pinia，但想要为已有项目添加 Pinia 支持，那么您需要做的只是参考下一节中的步骤并创建 `src/stores/index.[js|ts]` 文件。

## 添加一个 Pinia store
您可以使用 Quasar CLI 提供的 `$ quasar new` 命令快捷的添加一个 Pinia store：

```bash
$ quasar new store <store_name> [--format ts]
```

上面的命令将会在 `/src/stores` 目录下创建一个名为  "store_name" 的文件，它将包含您需要的所有模板文件。

我们来示例如何创建一个名为 "counter" 的 Pinia store。您需要运行 `quasar new store counter` 命令。它会帮您创建 `/src/stores/counter.[js|ts]` 文件：

```bash
.
└── src/
    └── stores/
        ├── index.js     # Pinia initialization
        └── counter.js   # Pinia store
```

Pinia store 示例：

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
})
```

我们创建了一个新的 Pinia store，但是我们还未在项目中使用它，在一个 Vue 中这样使用它：

```html
<template>
  <div>
    <q-toggle v-model="store.counter" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCounterStore } from 'stores/counter'

export default {
  setup () {
    const store = useCounterStore()

    return {
      // 你可以将整个 strore 实例返回供  template 使用
      store
    }
  }
}
</script>
```

[关于定义一个 Pinia store 的更多参考](https://pinia.vuejs.org/core-concepts/).
