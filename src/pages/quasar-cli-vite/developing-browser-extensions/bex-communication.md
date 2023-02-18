---
title: BEX 通信
desc: (@quasar/app-vite) Quasar 浏览器插件（BEX）的不同部分之间如何通信。
---

允许 Quasar 应用与 BEX 的不同部分之间的通信至关重要，Quasar 使用一个 `bridge` 来实现这一点。

BEX 中有 4 个需要通信层的区域：

1. Quasar 应用本身 - 适用于所有类型的 BEX，即弹出菜单、选项页、开发工具或网页。
2. 后台脚本
3. 内容脚本
4. 运行 BEX 的网页。

## 通信规则

Quasar 的通信桥梁有一个基本的规则需要了解。

**不是所有的 BEX 类型都有内容脚本** - 只有在网页上下文中运行的 BEX 才会有内容脚本。这意味着，如果您在内容脚本上为事件添加侦听器，并试图从作为开发者工具、右键菜单选项页或弹出式菜单中运行的 Quasar BEX 触发事件，**则无法工作**。

如需开发者工具、右键菜单选项页或弹出式菜单中运行的 BEX 与网页通信，需要后台脚本作为代理。步骤如下：

1. 在后台脚本上添加侦听器，该侦听器又会发出另一个事件
2. 在运行在网页上下文中的 Quasar 应用中监听后台脚本发出的事件。
2. 在开发者工具、右键菜单选项页或弹出式菜单的页面中触发后台脚本的事件。

一旦你理解了这个概念，BEX 如何与每个部件交流就没有限制了。

## 通信桥梁（Bridge）

该桥是一个基于 Promise 的事件系统，在 BEX 的所有部分之间共享，允许您在 Quasar 应用程序中监听事件，从其他部分发出事件，反之亦然。这就是 Quasar BEX 模式的强大之处。

在 Quasar 应用中，可以通过 `$q.bex` 访问该桥梁，在其他区域，`bridge` 通过各自的钩子函数的参数提供。

来看看他是如何工作的。

### 触发一个事件并等待响应

```js
bridge.send('some.event', { someKey: 'aValue' }).then(response => {
  console.log('Some response from the other side')
})
```

### 监听一个事件并发出响应

```js
bridge.on('some.event', event => {
  console.log('Event Receieved, responding ...')
  bridge.send(event.eventResponseKey)
})
```

### 清除监听器

```js
bridge.off('some.event', this.someFunction)
```

等等，`bridge.send(event.eventResponseKey)` 是什么？

Quasar Bridge 在幕后进行了一些工作，以将基于正常事件的通信转换为 Promise，因此，为了释放（resolve） Promise，我们需要发送一个**新**事件，该事件被捕获并释放上述 Promise。

::: warning
如果遗漏了 `bridge.send(event.eventResponseKey)`，那么 promise 将不会被释放（resolve）。
:::

::: tip
由于浏览器插件限制了数据传输的大小最大为 60mb，该桥还做了一些工作来拆分大数据，这些数据太大，无法一次性传输。为了实现这一点，有效载荷必须是一个数组。
:::
