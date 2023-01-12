---
title: 对话框
desc: QDialog 组件提供了具有定位，样式化，最大化等功能的模态框。
keys: QDialog
related:
  - /quasar-plugins/dialog
  - /vue-directives/close-popup
  - /vue-components/card
  - /vue-components/popup-proxy
---

QDialog 组件提供了一种很棒的交互方式，您可以通过对话框来向用户展示重要信息，或者请求用户做出决策。

从 UI 的角度老看，您可以把对话框看作一种浮动的模态框，它只覆盖屏幕的一部分，也代表着对话框应该只被用于处理用户的快速操作,例如验证密码，简短的应用通知，或者做出快速选择等等。

::: tip
对话框还可以通过更基础的方式来使用，把它当作一个全局的方法来调用，就像原生 js 的 alert(), prompt() 等方法一样。更多信息，请参考 [Dialog 插件](/quasar-plugins/dialog)页面
:::

::: warning 进阶提示
与其将 QDialog 杂揉在您的 .vue 文件的模板中，不如为对话框写一个组件，并用 [Dialog 插件](/quasar-plugins/dialog#invoking-custom-component)使它可以在应用的任何地方都可以被很方便的调用。
:::

## QDialog API

<doc-api file="QDialog" />

## 用法

::: warning 注意
QDialog 最好使用 QCard 作为主要内容。如果您想使用其他的组件或者标签，请确保 QDialog 的直接子元素是 `<div>` 标签（或者手动为他包裹一个 `<div>`）。
:::

### 基础

<doc-example title="基础" file="QDialog/Basic" />

### 样式

<doc-example title="样式" file="QDialog/Style" />

### 定位
<doc-example title="Positions" file="QDialog/Positioning" />

::: tip
不要将  "position" 属性与显示隐藏的动画相混淆。如果您想自定义动画，您可以使用 `transition-show` 和 `transition-hide` 属性，不管 "position" 或 "maximized" 如何设置，它们都会生效。
:::

<doc-example title="最大化" file="QDialog/Maximized" />

### 不同的内容
对话框可以包含任何内容。一些示例：

<doc-example title="不同的内容" file="QDialog/VariousContent" />

<doc-example title="容器化的 QLayout" file="QDialog/Layout" />

::: tip
当您想使用容器化的 QLayout时，如果使用左/右定位，则需要为 QDialog 设置一个宽度，如果使用上/下定位。则需要为 QDialog 设置一个高度。您可以使用 vw 和 vh 单位。
:::

### 处理滚动
<doc-example title="可滚动的对话框" file="QDialog/Scrollable" />

### 不同的模式
用户无法通过 ESCAPE 键或者点击对话框外部来关闭对话框。

<doc-example title="持久的" file="QDialog/Persistent" />

对话框也可以成为页面的一部分，不需要立即聚焦，这就是“无缝”（seamless）模式的作用:

<doc-example title="无缝的" file="QDialog/Seamless" />

### 嵌套
您可以在其他对话框之上打开对话框，没有深度限制。

<doc-example title="嵌套" file="QDialog/Inception" />

### 大小
您可以自定义对话框的大小。请注意，我们要么修改内容的样式，要么使用`full-width` 或 `full-height` 属性：

<doc-example title="大小示例" file="QDialog/Sizing" />

## Cordova/Capacitor 返回按钮

Quasar 默认为您处理返回按钮，所以它会关闭任何打开的对话框，而不是默认返回到前一页(这不是一个很好的用户体验)。

但是，如果您希望禁用此行为，请编辑/quasar.config。js 文件：

```js
// quasar.config.js;
// for Cordova (only!):
return {
  framework: {
    config: {
      cordova: {
         // quasar 处理手机返回键使应用程序退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 下面这个配置开启会完全禁用 quasar 管理手机的返回按钮。
        backButton: true/false
      }
    }
  }
}

// quasar.config.js;
// for Capacitor (only!)
return {
  framework: {
    config: {
      capacitor: {
        // quasar 处理手机返回键使应用程序退出。
        backButtonExit: true/false/'*'/['/login', '/home', '/my-page'],

        // 下面这个配置开启会完全禁用 quasar 管理手机的返回按钮。
        backButton: true/false
      }
    }
  }
}
```
