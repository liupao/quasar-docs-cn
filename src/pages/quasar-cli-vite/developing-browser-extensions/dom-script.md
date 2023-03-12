---
title: DOM 脚本
desc: (@quasar/app-vite) 在 Quasar 浏览器插件中（BEX）中如何使用 DOM 脚本的钩子函数与网页通信。
---

`src-bex/dom-script.js` 是一个由 Quasar 自动注入到底层网页的文件，和所有其他钩子文件一样，可以通过以下方式访问通信桥梁（bridge）:

```js
import { bexDom } from 'quasar/wrappers'

export default bexDom((bridge) => {
  //
})
```

如果您发现自己需要将一个 JS 文件注入到底层网页中，那么您可以使用 DOM 脚本，因为它意味着您可以在 BEX 中维护通信链。

例如，假设你想编写一个 BEX 来检测一个 Quasar 应用是否在页面上运行，唯一的方法就是在网页的上下文中运行一些 javascript。

```js
// We create a new folder + file:
// src-bex/dom/detect-quasar.js

function initQuasar (bridge, quasarInstance) {
  bridge.send('quasar.detect', {
    version: quasarInstance.version,
    dark: {
      isActive: quasarInstance.dark ? quasarInstance.dark.isActive : void 0
    },
    umd: quasarInstance.umd,
    iconSet: {
      name: quasarInstance.iconSet.name,
      __installed: quasarInstance.iconSet.__installed
    },
    lang: {
      rtl: quasarInstance.lang.rtl
    }
  })
  window.__QUASAR_DEVTOOLS__ = {
    Quasar: quasarInstance
  }
}

export default function detectQuasar (bridge) {
  if (window.Quasar) { // UMD
    initQuasar(bridge, {
      version: window.Quasar.version,
      dark: window.Quasar.Dark,
      ...window.Quasar,
      umd: true
    })
  }
  else { // CLI
    let isVue3 = false
    setTimeout(() => {
      const all = document.querySelectorAll('*')
      let el
      for (let i = 0; i < all.length; i++) {
        if (all[i].__vue__ || all[i].__vue_app__) {
          el = all[i]
          isVue3 = all[i].__vue_app__ !== void 0
          break
        }
      }

      if (el) {
        const Vue = isVue3 ? el.__vue_app__ : Object.getPrototypeOf(el.__vue__).constructor

        const quasar = isVue3 ? Vue.config.globalProperties.$q : Vue.prototype.$q
        if (quasar) {
          initQuasar(bridge, quasar, Vue)
        }
      }
    }, 100)
  }
}
```

```js
// src-bex/dom-script.js:

import { bexDom } from 'quasar/wrappers'
import detectQuasar from './dom/detect-quasar'

export default bexDom((bridge) => {
  detectQuasar(bridge)
})
```

上面的网桥（bridge）将通知 BEX 中的所有侦听器 Quasar 已经找到，并发送实例信息。
