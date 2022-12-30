---
title: 虚拟滚动
desc: QVirtualScroll Vue 组件可以每次只渲染长列表中用户视图中可见的那一小部分，并在用户滚动容器中更新可见的项目。每次只有可见区域的数据被渲染，最小化渲染 DOM 树的性能和内存开销。
keys: QVirtualScroll
related:
  - /vue-components/select
  - /vue-components/infinite-scroll
---

QVirtualScroll 可以每次只渲染长列表中用户视图中可见的那一小部分，并在用户滚动容器中更新可见的项目。每次只有可见区域的数据被渲染，最小化渲染 DOM 树的性能和内存开销。

目前有两种类型的 QVirtualScroll："list" (使用 QItems) 和 "table" (使用表格样式显示数据行).


## QVirtualScroll API

<doc-api file="QVirtualScroll" />

## 用法

::: tip
* (Composition API) 为了在使用大型列表时获得最好的性能，请不要使用 ref()/computed()/reactive() 等函数包裹传给 `items` 属性的数组，这样可以让 Vue 跳过对此列表的响应式跟踪。 
* (Options API) 为了在使用大型列表时获得最好的性能，请使用 `Object.freeze(items)` 冻结传给 `items` 属性的数组，这样可以让 Vue 跳过对此列表的响应式跟踪。
* 将被渲染的数据数量会基于 `virtual-scroll-item-size` 属性和可滚动区域的大小来计算，但是您可以通过 `virtual-scroll-slice-size` 属性来实现您的需求。
* 使用 `virtual-scroll-item-size` 属性来指定元素的大小（宽或高的像素大小）。当一个元素被渲染在屏幕上后，它的大小是自动更新的，但如果您指定的元素大小接近实际大小，您将获得更好的初始滚动位置。无论您是否使用这个属性，QVirtualScroll 都可以正常工作，但是如果不使用它，您可能会遇到连续滚动时滚动条不跟随鼠标指示位置（在桌面设备上）的问题，或者容器实际滚动的位置与预计的位置稍微偏移一到两个元素的问题（在移动设备上）。
:::

::: warning
每个浏览器都会给滚动容器限制一个最大高度。在 IE11 中，这大约为 1,000,000px，而在其余浏览器中，它的内容更大，但仍然有限。
:::

滚动下面的示例，查看 QVirtualScroll 的运行情况。

### 基础

<doc-example title="基础" file="QVirtualScroll/Basic" />

### 水平的

<doc-example title="水平的" file="QVirtualScroll/BasicHorizontal" />

### 不同的模版

<doc-example title="为列表项使用不同的模版" file="QVirtualScroll/VariousContent" />

<doc-example title="为水平的列表项使用不同的模版" file="QVirtualScroll/VariousContentHorizontal" />

### 表格类型

注意使用的 `type="table"` 属性。

<doc-example title="基础表格" file="QVirtualScroll/TableBasic" />

与内容一起滚动的表头

<doc-example title="与内容一起滚动的表头/表尾" file="QVirtualScroll/TableBasicHeader" />

请注意下面的示例中表头和表尾都使用了 "position: sticky" 相关的 CSS 来使其固定。还需要注意使用了头部和尾部的插槽。

<doc-example title="固定表头" file="QVirtualScroll/TableSticky" />

下面是一个更复杂的例子。

<doc-example title="固定表头" file="QVirtualScroll/TableSticky2" />

### 滚动目标

如果您想指定滚动的目标（自动检测的目标不是您想要的），您可以使用 `scroll-target` 属性并传递一个 CSS 选择器或者一个 DOM 元素。

如果您需要使用整个页面作为虚拟列表的滚动元素，请将滚动目标设置为 `scroll-target="body"`。

::: warning
* 如果您通过 `scroll-target` 属性自定义了滚动目标容器，那么必须确保该元素存在且可以溢出（他必须具有最大高度允许滚动溢出）
* 如果滚动目标容器无法溢出，则会出现整个列表都被渲染的情况。
:::

::: danger
如果您想为 `scroll-target` 使用一个 Vue 引用，那么请在组件完成挂载在后设置，如下所示：
:::

<doc-example title="通过 id 自定义滚动目标容器" file="QVirtualScroll/ScrollTargetId" />

<doc-example title="通过 ref 自定义滚动目标容器" file="QVirtualScroll/ScrollTargetRef" />

<doc-example title="使用 QScrollArea" file="QVirtualScroll/ScrollArea" />

### 滚动到指定位置

<doc-example title="滚动到指定位置" file="QVirtualScroll/ScrollTo" />

### 同步和异步

您还可以使用 `items-fn` 属性生成要在列表上显示的项目。

::: warning
确保使用一个同步函数来返回要显示的项目列表。
:::

如果您需要异步数据，请使用一个检索和渲染数据的组件。

<doc-example title="动态生成项目" file="QVirtualScroll/GenerateItems" />

### 工具 CSS 类

这里有两个工具 CSS 类名可以控制虚滚动的大小计算：

* 使用 `q-virtual-scroll--with-prev` 类可以使被虚拟滚动渲染的元素与上一个元素一起分组（主要用于从同一行数据生成的多个表行）。
* 使用 `q-virtual-scroll--skip` 类可以使被虚拟滚动渲染的元素在计算大小时忽略此元素的大小。

<doc-example title="虚拟滚动加上一个数据渲染多行" file="QTable/VirtscrollMultipleRows" />

<doc-example title="虚拟滚动加上扩展数据" file="QTable/VirtscrollExpandedRow" />
