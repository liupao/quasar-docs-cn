---
title: 后台脚本
desc: (@quasar/app-webpack) 在 Quasar 浏览器插件中（BEX）中如何使用后台脚本与其他部分通信。
---

`src-bex/background-hooks.js` 是一个标准的[后台脚本](https://developer.chrome.com/extensions/background_pages)，它可以与 BEX 的**所有**部分进行通信。

此文件需要导出一个函数：

```js
import { bexBackground } from 'quasar/wrappers'

export default bexBackground((bridge, activeConnections) => {
  //
})
```

该函数通过 Quasar BEX 构建链自动调用，并注入一个桥（bridge），该桥在 BEX 的所有部分之间共享，这意味着您可以与 BEX 的任何部分进行通信。

`bridge` 参数是用于通信的桥梁。`activeConnections` 参数提供了通过桥注册的所有 BEX 连接的数组，即同一个 Quasar 应用使用的所有 BEX 部分（网页，开发者工具、右键菜单选项页或弹出式菜单）。

例如，假设我们想在 web 浏览器中监听正在打开的新选项卡，然后在 Quasar 应用中对其做出反应。首先，我们需要监听正在打开的新选项卡，并发出一个新事件，告诉 Quasar 应用这已经发生了：

```js
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  bridge.send('bex.tab.opened', { url: tab.url })
})
```

然后在 Quasar 应用程序中，在一个组件生命周期钩子中监听它，如下所示：

```js
import { useQuasar } from 'quasar'
import { onBeforeUnmount } from 'vue'

export default {
  setup () {
    const $q = useQuasar()

    // 接收后台脚本发送的 URL 的函数。
    function doOnTabOpened (url) {
      console.log('New Browser Tab Openend: ', url)
    }

    // 监听事件
    $q.bex.on('bex.tab.opened', doOnTabOpened)

    // 不要忘记清除事件
    onBeforeUnmount(() => {
      $q.bex.off('bex.tab.opened', doOnTabOpened)
    })

    return {}
  }
}
```

浏览器插件的后台脚本有各种各样的事件，如果你想在这方面做点什么，谷歌是你的朋友。

如果您想以某种方式修改基础网页内容，该怎么办？这就是我们需要使用
<a class="doc-link" href="/quasar-cli-webpack/developing-browser-extensions/content-hooks">内容脚本</a>
（例如 `my-content-scripts.js`）的地方。
