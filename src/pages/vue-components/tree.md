---
title: Tree
desc: QTree 是一个高度可定制的用于展示带层级数据的 Vue 组件，例如树状结构的目录。
---
QTree 是一个高度可定制的用于展示带层级数据的组件，例如树状结构的目录。

## QTree API

<doc-api file="QTree" />

## 用法

### 基础

<doc-example title="基础" file="QTree/Basic" />

### 没有连接线

<doc-example title="没有连接线" file="QTree/NoConnectors" />

### 紧凑的 <q-badge align="top" color="brand-primary" label="v2.2.4+" />

<doc-example title="紧凑的" file="QTree/DenseTree" />

### 黑色模式

<doc-example title="黑色模式" file="QTree/Dark" dark />

### 集成示例

<doc-example title="搭配 QSplitter 和 QTabPanels" file="QTree/Splitter" />

更多信息：[QSplitter](/vue-components/splitter)， [QTabPanels](/vue-components/tab-panels)。

### 自定义内容

注意下面的示例中，使用 header 和 body 的默认插槽实现了自定义内容。

<doc-example title="header 和 body 的默认插槽" file="QTree/SlotsDefault" />

注意下面的示例中，使用 header 和 body 插槽实现了自定义内容。


<doc-example title="自定义节点" file="QTree/SlotsCustomized" />

::: warning
在自定义头部上点击或按下 `SPACE` 或 `ENTER` 会选中树的选项，并且自定义头部会失焦。

如果您不想要这个行为，只需要使用 `<div @click.stop @keypress.stop>` 包裹自定义头部的内容即可（或者添加监听事件到相应的组件/元素）。
:::

### 手风琴，筛选和可选中的

在下面的示例中，当一个节点扩展时，兄弟姐妹节点会收缩。

<doc-example title="手风琴模式" file="QTree/Accordion" />

<doc-example title="筛选节点" file="QTree/FilterDefault" />

<doc-example title="可选择的节点" file="QTree/Selectable" />

### 懒加载

<doc-example title="懒加载节点" file="QTree/LazyLoad" />

### 选中 vs 打勾，展开

* 选中 (QTree 的 `selected` 属性) 指向当前选中的节点，在背景颜色上会有不同的区分。
* 打勾 (QTree 的 `ticked` 属性) 指向与每个节点关联的复选框
* 展开 (QTree 的 `expanded` 属性) 指向已经展开的节点。

为了保证组件正确工作，上述属性都需要使用 `v-model:<prop_name>` 指令进行动态绑定，(示例：`v-model:expanded`)。

<doc-example title="同步节点属性" file="QTree/Sync" />

### 勾选策略

有三种勾选策略：'leaf', 'leaf-filtered', 'strict'，另外一个（默认）'none' 将禁用勾选。

| 策略 | 描述 |
| --- | --- |
| leaf | 勾选得到的数据中只会包含叶子节点，勾选一个节点会影响其父节点和子节点（父节点会变成部分勾选或者勾选状态，所有的子节点都会变成勾选状态） |
| leaf-filtered |  与 `leaf` 策略一样，但是此策略只会应用于筛选后的节点（筛选后仍然显示的节点）。 |
| strict | 勾选节点不会影响它的父节点或者子节点。 |

您可以为 QTree 应用一个全局的勾选策略，也可以在 `nodes` 的 model 中声明 `tickStrategy` 属性来修改某个特殊节点的勾选策略。

<doc-example title="勾选策略" file="QTree/TickStrategy" />

### 自定义筛选方法
您可以通过 `filter-method` 属性来自定义筛选方法。下面的示例中，使用输入框中的数据和节点标签中的 '(*)' 作为筛选条件：

<doc-example title="自定义筛选方法" file="QTree/FilterCustom" />

### 节点的模型结构
以下描述了 QTree 的 v-model 所考虑的节点的属性。

| 属性 | 类型 | 不存在时的行为 | 描述 |
| --- | --- | --- | --- |
| \<nodeKey\> | String, Number | 生成一个错误 | 节点的 key，key 将会从 `nodeKey` 属性声明的字段中获取 |
| label | String | 该项没有标签 | 节点的标签，如果设置了 `labelKey` 属性，那么将使用对应的字段。 |
| icon | String | 使用默认图标 | 节点的图标。 |
| iconColor | String | 使用继承来的颜色 |节点图标的颜色，是 Quasar 调色盘其中之一。 |
| img | String | 不展示图片 | 节点的图片，使用 /public 目录下的图片，例如：'mountains.png'。 |
| avatar | String | 不显示头像 | 节点的头像，使用 /public 目录下的图片，例如：'boy-avatar.png'。 |
| children | Array | 这个节点不会有子节点 | 一组节点作为子节点。 |
| disabled | Boolean | 这个节点会被启用 | 是否禁用此节点？ |
| expandable | Boolean | 此节点可展开 | 节点是否可展开？ |
| selectable | Boolean | 此节点可选择 | 节点是否可选？ |
| handler | Function |不会调用额外的函数 | 当点击节点时会被调用的函数。接受 `node` 作为参数 |
| tickable | Boolean | 此节点是否可勾选按照勾选策略来定 | 当使用一个勾选策略时，每个节点都会显示一个勾选框，是否禁用此节点的勾选框？ |
| noTick | Boolean | 节点会显示一个勾选框 | 当使用一个勾选策略时，此节点是否显示勾选框？ |
| tickStrategy | String | 勾选策略使用 'none' | 为此节点重写全局的勾选策略，可选值为 'leaf'，'leaf-filtered'，'strict'，'none'。 |
| lazy | Boolean | 子节点不会懒加载 | 子节点是否懒加载？此用例不要声明 'children' 属性。 |
| header | String |  'default-header' 插槽会被使用 | 此节点头部插槽的名称，不需要 'header-' 前缀。示例：'story' 指向 'header-story' 插槽。 |
| body | String |  'default-body' 会被使用 | 此节点 body 插槽的名称，不需要 'body-' 前缀。示例：'story' 指向 'body-story' 插槽。 |
