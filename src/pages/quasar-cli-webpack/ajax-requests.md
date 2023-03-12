---
title: Ajax 请求
desc: (@quasar/app-webpack) 在 Quasar 应用中使用 Axios 请求数据。
---

> 推荐在创建项目时就勾选 Axios。

如果在创建项目时未勾选 Axios，需要创建一个新的启动文件 `axios.js`（可帮助 axios 添加配置）：

```js
// src/boot/axios.js

import { boot } from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({ baseURL: 'https://api.example.com' })

export default boot(({ app }) => {
  // 在选项式 API 的 Vue 文件中通过 this.$axios 和 this.$api 访问

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ 这样就可以在选项式 API 的 Vue 文件中使用 this.$axios 访问 axios，不再需要在每个 vue 文件中导入 axios

  app.config.globalProperties.$api = api
  // ^ ^ ^ 这样可以在选项式 API 的 Vue 文件中使用 this.$api，轻松地针对应用程序执行 API 请求
})

export { axios, api }
```

当然也需要确保安装 `axios` 包：

``` shell
npm i axios
// 或
yarn add axios
// 或
pnpm i axios
```

::: tip
如果您使用 Quasar CLI，请务必查看[数据预取功能](/quasar-cli-webpack/prefetch-feature)。
:::

在单文件组件中的用法如下。请注意，在下面的示例中，我们使用了 Quasar 的 [Notify plugin](/quasar-plugins/notify) 插件（通过 `$q = useQuasar()` 和 `$q.notify`），您需要安装该插件（按照前面的链接）。


```js
import { ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()
  const data = ref(null)

  function loadData () {
    api.get('/api/backend')
      .then((response) => {
        data.value = response.data
      })
      .catch(() => {
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
  }

  return { data, loadData }
}
```

在 Vuex Actions 中向 axios 添加全局的请求头（例如用于身份验证）的用法：

```js
import { api } from 'boot/axios'

export function register ({ commit }, form) {
  return api.post('/auth/register', form)
    .then(response => {
      api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token
      commit('login', {token: response.data.token, user: response.data.user})
    })
}
```

更多信息参考 [Axios 文档](https://github.com/axios/axios)。
