---
title: 列表和列表项
desc: How to use the QList, QItem, QItemSection and QItemLabel Vue components.
keys: QList,QItem,QItemSection,QItemLabel
related:
  - /vue-components/expansion-item
  - /vue-components/slide-item
  - /vue-components/separator
---

QList 和 QItem 是一组组件，它们可以一起工作，将多个行项目垂直显示为单个连续元素。它们最适合显示与信息行类似的数据类型，例如联系人列表、播放列表或菜单。每行称为一个项目。QItem 也可以在 QList 之外使用。

列表还可以封住，类似于列表项的组件，例如 [QExpansionItem](/vue-components/expansion-item) 或 [QSlideItem](/vue-components/slide-item)。如果需要，还可以使用 [QSeparator](/vue-components/separator) 组件来进行区域分割。

列表项具有以下预设子组件：

* **QItemSection** - 一个列表项部分可以针对特定内容有多种不同的用法，通过 `avatar`, `thumbnail` 和 `side` 属性来控制。如果未使用上述属性，它将作为 QItem 的主要部分渲染（会占用最大的可用空间）。
* **QItemLabel** - 一个标签对于类似标题的内容很有用。

## QList API
<doc-api file="QList" />

## QItem API
<doc-api file="QItem" />

## QItemSection API
<doc-api file="QItemSection" />

## QItemLabel API
<doc-api file="QItemLabel" />

## 用法

### 基础

<doc-example title="基础" file="QItem/Basic" />

<doc-example title="在黑色背景上" file="QItem/Dark" dark />

<doc-example title="紧凑" file="QItem/Dense" />

### QItemSection

<doc-example title="左边的头像/略缩图 QItemSection" file="QItem/AvatarLeft" />

<doc-example title="右边的头像/略缩图 QItemSection" file="QItem/AvatarRight" />

::: tip
当您有多行项目时，可以使用 QItemSection 的 `top` 属性将各部分与顶部对齐，从而覆盖默认的中间对齐方式。
:::

<doc-example title="Side QItemSection" file="QItem/SideSection" />

### Active state

<doc-example title="Active prop" file="QItem/ActiveState" />

### QItemLabel

::: warning
注意，您可以使用 `lines` 属性处理标签溢出，告诉它可以占用多少行。但是，此功能使用依赖于 Webkit 的 CSS，因此无法在 IE/老版本 Edge 中使用。
:::

<doc-example title="项标签" file="QItem/ItemLabel" />

### 更多示例

<doc-example title="联系人列表" file="QItem/ExampleContacts" />

<doc-example title="设置" file="QItem/ExampleSettings" />

<doc-example title="邮件" file="QItem/ExampleEmails" />

<doc-example title="文件夹列表" file="QItem/ExampleFolders" />

在下面的示例中，出于演示目的，我们使用 `active` 属性代替 QItem 的 路由管理器属性（`to`, `exact`）。 UMD 没有 Vue Router，因此您将无法在 Codepen/jsFiddle 中使用它。

<doc-example title="菜单" file="QItem/ExampleMenu" />

::: tip
对于更复杂的菜单，请考虑同时使用 [QExpansionItem](/vue-components/expansion-item)。
:::

### 连接到 Vue Router

您可以在 QItems 上使用 `<router-link>` 拥有的属性来将 QItems 与 Vue Router 联系在一起。这允许监听当前的应用路由，并在点击时触发路由。

```html
<q-item to="/inbox" exact>
  <q-item-section avatar>
    <q-icon name="inbox" />
  </q-item-section>

  <q-item-section>
    Inbox
  </q-item-section>
</q-item>
```

您也可以延迟、取消或重定向导航，如下所示。关于下面使用的 `@click` 事件的更深入描述，请参考页面顶部的 QItem API 卡。

<doc-example title="延迟、取消或重定向导航 (v2.9+)" file="QItem/LinksWithGo" no-edit />
