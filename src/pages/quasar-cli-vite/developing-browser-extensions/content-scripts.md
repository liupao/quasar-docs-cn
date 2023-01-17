---
title: 内容脚本
desc: (@quasar/app-vite) 在 Quasar 浏览器插件中（BEX）中如何使用内容脚本与后台脚本和应用部分通信。
---

`src-bex/my-content-script.js` 是一个标准的[内容脚本](https://developer.chrome.com/extensions/content_scripts)，它能够访问网页的 DOM，因此你能够操纵该网页的内容。

::: tip
可以有多个内容脚本，每当创建一个新的内容脚本，都需要在 `/src-bex/manifest.json` 文件中引用。引用时需要使用 `.js` 后缀，即使你在使用 `.ts`。
:::

此文件的另一个好处是此函数：

```js
export default function (bridge) {
}
```

该函数通过 Quasar BEX 构建链自动调用，并注入一个桥（bridge），该桥在 Quasar 应用和 BEX 的后台脚本之间共享。


例如，假设我们想对 Quasar 应用程序上的一个按钮做出反应，并在底层网页上突出显示一些文本，这将通过如下内容脚本来完成:

```js
// Quasar App, /src

setup () {
  const $q = useQuasar()

  function myButtonClickHandler () {
    $q.bex.send('highlight.content.event', { someData: 'someValue '}).then(r => {
      console.log('Text has been highlighted')
    })
  }

  return { myButtonClickHandler }
}
```

```css
/* src-bex/assets/content.css */

.bex-highlight {
    background-color: red;
}
```

```js
// src-bex/my-content-script.js:

export default function (bridge) {
  bridge.on('highlight.content.event', event => {
    // 找到一个带有 .some-class 类名的元素，并给其添加高亮 CSS 类
    const el = document.querySelector('.some-class')
    if (el !== null) {
      el.classList.add('bex-highlight')
    }

    // 不是必需的，但是 resolve 我们的 promise。
    bridge.send(event.responseKey)
  })
}
```

内容脚本存在于一个[独立的世界](https://developer.chrome.com/extensions/content_scripts#isolated_world),中，允许内容脚本对其 JavaScript 环境进行更改，而不会与页面或其他内容脚本发生冲突。

独立的世界不允许内容脚本、插件和 Web 页面访问其他人创建的任何变量或函数。这也使内容脚本能够启用网页不应该访问的功能。

这就是
<a class="doc-link" href="/quasar-cli-vite/developing-browser-extensions/dom-script">DOM 脚本</a>
的用武之地。
