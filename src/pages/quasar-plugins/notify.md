---
title: Notify 通知
desc: 一个可以给用户展示带有动画的信息的 Quasar 插件，例如提示，通知，警告等。
keys: Notify
---

Notify 是一个 Quasar 插件，它以通知的形式向用户展示带动画的消息(浮动在页面的所有内容之上)。对于提醒用户某个事件非常有用，甚至可以通过操作按钮吸引用户交互。也被称为 toast 或者 snackbar。

## Notify API

<doc-api file="Notify" />

## 安装

<doc-installation plugins="Notify" config="notify" />

##  用法

###  基础

```js
// 在 Vue 文件之外
import { Notify } from 'quasar'

Notify.create('Danger, Will Robinson! Danger!')
// 或者带有配置对象:
Notify.create({
  message: 'Danger, Will Robinson! Danger!'
})

// 在 Vue 文件之内
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.notify('Message')
  // 或者带有配置对象:
  $q.notify({...})
}
```

<doc-example title="Basic" file="Notify/Basic" />

::: tip 提示
如果定义了任何的操作按钮，则在用户选择该操作时，该通知将自动删除。
:::

### 带有副标题

<doc-example title="Caption" file="Notify/Caption" />

### 带有图标，头像或者加载动画

<doc-example title="带有图标" file="Notify/Icon" />

<doc-example title="带有头像" file="Notify/Avatar" />

<doc-example title="带有加载动画" file="Notify/Spinner" />

### 带有操作按钮

<doc-example title="带有操作按钮" file="Notify/Actions" />

### 多行信息

<doc-example title="多行信息" file="Notify/Multiline" />

### 出现的位置

<doc-example title="在不同的位置出现" file="Notify/Positioning" />

::: tip 提示
关于完整的配置列表，请查看 API 卡片部分

:::

### 分组

每个通知都会按照内容（message + caption + multiLine + actions labels + position）被自动划分到一个组中。也可以使用 group 字段手动分组。

当多个被划分到同组中的提示相继被触发时，屏幕上只会显示一个通知，后面触发的会替换前面的，并且带有一个角标，角标的内容是被触发的通知个数。

然而，如果您想禁用此行为，可以设置`group: false`。
下面的示例中，第一个按钮触发的两个内容相同的提示，它们被划分到同一组中，屏幕上只会显示一个通知，角标为 2。
第二个按钮触发了两个相同内容的通知，但是配置了`group: false`，所以屏幕上显示了两个通知。
第三个按钮触发了两个内容不同的通知，但是它们被手动划分到同一个组中，所以屏幕上只有一个通知，内容为后触发的，角标为 2。

<doc-example title="分组" file="Notify/Grouping" />

<doc-example title="自定义角标" file="Notify/GroupingCustomBadge" />

### 倒计时进度条
如果您希望，可以告知用户这个通知什么时候会消失，可以看看下面的列子，只需要设置：`progress: true` 即可。

<doc-example title="Timeout progress" file="Notify/TimeoutProgress" />

### 更新通知的内容

如果您有一个正在进行的工作，并且希望在不阻止用户当前正在做的事情的情况下通知其进度，那么您可以生成一个可更新的通知。此时显示一个加载动画也是很有用的。

请注意在下面的示例中，设置了`group: false`(因为只有不分组的通知才能更新)和`timeout: 0`(因为我们想完全控制此通知的关闭)

<doc-example title="可更新的" file="Notify/Updatable" />

### 预设的通知类型

我们预设了四种开箱即用的通知类型： "positive", "negative", "warning" 和 "info":

<doc-example title="Out of the box types" file="Notify/PredefinedTypesDefault" />

此外，您也可以注册自己的通知类型或者修改上述的预设类型，最好的方式是在一个 boot 文件中做此事，[@quasar/app-vite Boot File](/quasar-cli-vite/boot-files) 或 [@quasar/app-webpack Boot File](/quasar-cli-webpack/boot-files).

<doc-example title="自定义通知类型" file="Notify/PredefinedTypesCustom" />

```js
// 如何在一个 boot 文件中注册类型：

import { Notify } from 'quasar'

Notify.registerType('my-notif', {
  icon: 'announcement',
  progress: true,
  color: 'brown',
  textColor: 'white',
  classes: 'glossy'
})
```

### 使用 HTML
若设置了`html: true`字段，也可以使用 html 作为 message，**一定要注意这样做可能导致 XSS 攻击**，所以一定要自己保证 message 的安全。

<doc-example title="Unsafe HTML message" file="Notify/UnsafeHtml" />

### 设置属性

也可以通过设置`attrs`对象字段为通知的 DOM 或者它的子元素操作按钮（actions）的 DOM 自定义 HTML 属性：

```js
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.notify({
    ...

    attrs: {
      // 为通知的 DOM 本身设置属性:
      role: 'alertdialog'
    },

    actions: [
      {
        icon: 'close',
        // 为通知的操作按钮 DOM 设置属性:
        attrs: {
          'aria-label': 'Dismiss'
        }
      }
    ]
  })
}
```

### 通过编程关闭通知

通知只能由用户关闭，但在特殊情况下，您可以通过代码关闭它。在设置了`timeout:0`时尤其有用。

```js
const dismiss = $q.notify({...})
...
dismiss()
```

### 设置默认值
有两种方式设置全局的默认配置：通过 quasar.config.js > framework > config > notify 对象配置（配置对象见 API 卡片部分），或者：

通过一个 boot 文件（[@quasar/app-vite Boot File](/quasar-cli-vite/boot-files) 或 [@quasar/app-webpack Boot File](/quasar-cli-webpack/boot-files)）来设置全局的默认配置。

首先，我们创建一个 boot 文件，示例取名为："notify-defaults.js".

```bash
$ quasar new boot notify-defaults [--format ts]
```
将其文件名添加至`quasar.config.js`的 boot 数组中：

```js
module.exports = function(ctx) {
  return {
    // ...
    boot: ['notify-defaults'],
    // ...
  }
```

编辑 `/src/boot/notify-defaults.js`，如:

```js
import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'top-right',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})
```

::: warning 警告
我们只能通过这种方式设置默认的`actions`，通过 quasar.config.js 设置的 actions 不会生效。
:::

也可以在 Vue 文件中设置默认配置：

```js
// inside of a Vue component
import { useQuasar } from 'quasar'

setup () {
  const $q = useQuasar()

  $q.notify.setDefaults({
    position: 'top-right',
    timeout: 2500,
    textColor: 'white',
    actions: [{ icon: 'close', color: 'white' }]
  })
}
```
