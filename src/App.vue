<template>
  <router-view />
</template>

<script>
import { useMeta } from 'quasar'

import { provideDocStore } from 'assets/doc-store.js'
import getMeta from 'assets/get-meta.js'

export default {
  name: 'App',

  setup () {
    useMeta({
      title: 'Quasar 框架新版中文网站',
      titleTemplate: title => `${title} | Quasar Framework V2 中文文档｜ Quasar 框架 V2 中文文档`,

      meta: getMeta(
        'Quasar 框架 - 帮您在短时间内构建高性能的 vuejs 应用程序',
        '基于 vuejs 的开源前端框架，高性能，内置丰富的 css 和 vue 组件库，响应式支持，一套代码可以编译出 SPA，PWA，SSR，手机应用和桌面应用。明智的人选择 vue，高产的人选择 quasar + vue。'
      )
    })

    provideDocStore()
  }
}
</script>
