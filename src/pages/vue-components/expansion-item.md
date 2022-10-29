---
title: 扩展项/手风琴
desc: QExpansionItem 组件可以隐藏与用户不直接相关的内容。可以把它们想象成手风琴一样，当点击它们时，它们就会展开，这也被称为可折叠面板。
keys: QExpansionItem
related:
  - /vue-components/list-and-list-items
  - /vue-components/slide-item
  - /vue-components/slide-transition
---

QExpansionItem 组件可以隐藏与用户不直接相关的内容。可以把它们想象成手风琴一样，当点击它们时，它们就会展开，这也被称为可折叠面板。

它们基本上是 [QItem](/vue-components/list-and-list-items) 组件的封装。因此，它们可以包含在 QList 中并继承 QItem 组件的属性。


## QExpansionItem API

<doc-api file="QExpansionItem" />

## 用法

### 基础

<doc-example title="基础" file="QExpansionItem/Basic" />

### 控制展开状态

<doc-example title="控制展开状态" file="QExpansionItem/ControlExpansionState" />

### 样式

<doc-example title="紧凑的" file="QExpansionItem/Dense" />

<doc-example title="黑色背景" file="QExpansionItem/Dark" dark />

### 选项

<doc-example title="切换开关位置" file="QExpansionItem/SwitchToggleSide" />

<doc-example title="Header 插槽" file="QExpansionItem/HeaderSlot" />

<doc-example title="处理事件" file="QExpansionItem/HandlingEvents" />

当处理嵌套等级时，一般的经验法则是，使用 `header-inset-level` 会给头部添加一个左内边距，内容部分不会添加边距。但是使用 `content-inset-level` 会给内容添加一个左内边距。

<doc-example title="嵌套的扩展项" file="QExpansionItem/InsetLevels" />

### 行为

::: tip
当将路由附加到 QExpansionItem 的标题时，下面仅通过展开图标切换的行为特别有用。这样以来点击标题，它将激活路由，点击图标，它将展开内容。显然，不能将两个操作都附加到整个头部。
:::

<doc-example title="只通过图标触发开关" file="QExpansionItem/IconToggle" />

<doc-example title="手风琴模式" file="QExpansionItem/Accordion" />

<doc-example title="弹出模式" file="QExpansionItem/Popup" />
