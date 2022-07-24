---
title: Bottom Sheet Plugin
desc: 当用户在应用底部窗口底部上划时展示一组操作菜单的Quasar组件。
keys: BottomSheet
related:
  - /quasar-plugins/dialog
  - /vue-components/dialog
---

Bottom Sheets： 从设备的屏幕底部向上滑动时展示一组操作菜单，底部菜单可以作为菜单的代替方案，但是不应该用作导航。

弹出来的底部菜单总是会展示在所有元素的上方，页面的其他部分会产生一个暗色的遮罩，以使得焦点更多的放在弹出的底部菜单上，并且必须将其关闭后才能与其他组件进行交互。

Bottom Sheets可以展示列表、网格、图标、头像或者任意Vue组件。


## BottomSheet API

<doc-api file="BottomSheet" />

## Installation

<doc-installation plugins="BottomSheet" />

## 用法

```js
// 在Vue文件之外
import { BottomSheet } from 'quasar'
BottomSheet.create({ ... }) // returns Object

// 在Vue文件之内
import { useQuasar } from 'quasar'
setup () {
  const $q = useQuasar()
  $q.bottomSheet({ ... }) // returns Object
}
```

::: tip
当用户点击手机/平板电脑的返回按钮（仅适用于Cordova应用程序）时，底部对话框将自动关闭。

同样，在桌面浏览器上，按`ESCAPE`键也会关闭底部对话框。
:::

<doc-example title="列表和网格" file="BottomSheet/Basic" />

<doc-example title="暗色模式" file="BottomSheet/Dark" />

::: tip
完整的选项列表请见api部分
:::
