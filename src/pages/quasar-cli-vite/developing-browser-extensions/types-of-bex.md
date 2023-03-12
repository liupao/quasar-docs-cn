---
title: BEX 的类型
desc: (@quasar/app-vite) How to configure each type of Browser Extensions in Quasar.
---

如前所述，Quasar 可以处理各种位置的浏览器插件，即新选项卡、网页、开发者工具，右键菜单选项或弹窗。不需要为每一种插件都提供一个单独的 Quasar 应用，使用路由器即可。

## 新选项卡

这是 BEX 默认的运行方式。点击浏览器中的 BEX 图标即可访问。Quasar 应用将在新的（空白）选项卡中运行。

## 开发者工具，右键菜单选项或弹窗

这些都遵循相同的模式，设置一个路由并配置 `manifest.json` 文件，以便在尝试打开其中一种类型的插件时显示该路由对应的界面。例如：

```js
// routes.js:

const routes = [
  { path: '/options', component: () => import('pages/OptionsPage.vue') },
  { path: '/popup', component: () => import('pages/PopupPage.vue') },
  { path: '/devtools', component: () => import('pages/DevToolsPage.vue') }
]
```

您可以使用下面的内容配置 `manifest.json` 文件，以便从该路由加载页面:

#### manifest v2

```json
{
  "manifest_version": 2,

  "options_page": "www/index.html#/options", // 右键选项菜单
  "browser_action": {
    "default_popup": "www/index.html#/popup" // 弹窗
  },
  "devtools_page": "www/index.html#/devtools", // 开发者工具
}
```

#### manifest v3

```json
{
  "manifest_version": 3,

  "action": {
    "default_popup": "www/index.html#/popup" // 弹窗
  },
  "options_page": "www/index.html#/options", // 右键选项菜单
  "devtools_page": "www/index.html#/devtools", // 开发者工具
}
```

## Web 页面

真正厉害的是，我们可以使用一些简单的技巧，将 Quasar 应用注入到页面中，使其成为页面的一部分。

下面是一个简单的示例：

* `src-bex/my-content-script.js`

思路是创建一个 IFrame，并将我们的 Quasar 应用添加到其中，然后注入到网页中。

考虑到我们的 Quasar 应用可能会占据窗口的全部高度（从而阻挡与底层页面的任何交互），我们需要有一个事件来处理 IFrame 的高度设置。默认情况下，IFrame 高度刚好高到可以显示 Quasar 工具栏（进而允许与页面的其他部分交互）。

```js
// src-bex/my-content-script.js

// 这里添加的钩子为 BEX 内容脚本和 Quasar 应用程序之间的通信搭建了一个桥梁。
// 更多信息: https://www.quasar-cn.cm/quasar-cli-vite/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers'

const
  iFrame = document.createElement('iframe'),
  defaultFrameHeight = '62px'

/**
 * 设置 iframe 容纳 BEX 的高度
 * @param height
 */
const setIFrameHeight = height => {
  iFrame.height = height
}

/**
 * 将 iframe 重置为默认高度，例如顶部栏的高度。
 */
const resetIFrameHeight = () => {
  setIFrameHeight(defaultFrameHeight)
}

/**
 * 下面的代码将使一切顺利进行。用默认设置初始化 iframe，然后将其添加到页面上
 * @type {string}
 */
iFrame.id = 'bex-app-iframe'
iFrame.width = '100%'
resetIFrameHeight()

// 应用一些样式，使其看起来更像一个整体
Object.assign(iFrame.style, {
  position: 'fixed',
  top: '0',
  right: '0',
  bottom: '0',
  left: '0',
  border: '0',
  zIndex: '9999999', // 确保它在最顶层
  overflow: 'visible'
})

;(function () {
  // 当页面加载时，插入我们的浏览器插件应用程序。
  iFrame.src = chrome.runtime.getURL(`www/index.html`)
  document.body.prepend(iFrame)
})()

export default function (bridge) {
  /**
   * 切换抽屉时，将 iFrame 高度设置为占据整个页面。
   * 当抽屉关闭时重置高度。
   */
  bridge.on('wb.drawer.toggle',  ({ data, respond }) => {
    if (data.open) {
      setIFrameHeight('100%')
    } else {
      resetIFrameHeight()
    }
    respond()
  })
}
```

我们可以在任何时候从 Quasar 应用程序调用此事件，因为我们知道正在打开抽屉，因此可以更改 IFrame 的高度，以使整个绘图可见。

* `src-bex/assets/content.css`

在文档的顶部添加一个边距，这样我们的 Quasar 工具栏就不会与实际的页面内容重叠。

```css
.target-some-header-class {
  margin-top: 62px;
}
```

* `Quasar App (/src)`

然后在我们的 Quasar 应用程序 （/src）中，我们有一个函数来切换抽屉，并向内容脚本发送一个事件，告诉它调整 IFrame 的大小，从而使我们的整个应用程序可见:

```html
<q-drawer :model-value="drawerIsOpen" @update:model-value="drawerToggled">
  Some Content
</q-drawer>
```

```js
import { useQuasar } from 'quasar'
import { ref } from 'vue'

setup () {
  const $q = useQuasar()
  const drawerIsOpen = ref(true)

  async function drawerToggled () {
    await $q.bex
      .send('wb.drawer.toggle', {
        open: drawerIsOpen.value // 所以它知道要变得更大 / 更小
      })

      // 只有在 Promise 解决后才设置此选项，这样我们才能看到整个幻灯片动画。
      drawerIsOpen.value = !drawerIsOpen.value
  }

  return { drawerToggled }
}
```

现在你有一个 Quasar 应用程序在网页上运行。您可以从 Quasar 应用程序触发其他事件，内容脚本可以侦听这些事件并与底层页面进行交互。

::: warning 警告
一定要检查 manifest 文件，尤其是对  `my-content-script.js` 的引用。请注意，**您可以拥有多个内容脚本**。每当创建新的时，都需要在清单文件中引用它。
:::
