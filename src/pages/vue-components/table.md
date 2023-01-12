---
title: 表格
desc: QTable 是一个可以以表格的形式展示数据的vue组件，通常被称为数据表。
keys: QTable,QTh,QTr,QTd
related:
  - /vue-components/markup-table
  - /vue-components/pagination
---

QTable 组件可以以表格的形式展示数据，通常被称为数据表，包含以下主要功能：

* 筛选
* 排序
* 对单行/多行数据进行自定义操作
* 分页（包括服务端排序）
* 网格模式（例如您可以使用 QCard 以非表格的形式展示数据）
* 通过作用域槽对某行或某个单元格进行自定义
* 能够在数据行的顶部或底部添加额外的行
* 选择某列（通过 QTableColumns 组件）
* 自定义表格顶部或底部的控件
* 响应式设计

::: tip
如果您不需要分页、排序、筛选等功能，可以考虑使用 [QMarkupTable](/vue-components/markup-table) 组件代替。
:::

## QTable API
<doc-api file="QTable" />

## QTh API
<doc-api file="QTh" />

## QTr API
<doc-api file="QTr" />

## QTd API
<doc-api file="QTd" />

## 定义数据

我们来看一个示例来学习配置 `columns` 属性。我们会告诉 QTable `row-key` 是 "name" 且**必须**唯一，如果数据来自于数据库，我们通常会使用 **id** 作为 `row-key`。


```js
columns: [ // 一个对象数组
  // column 对象定义
  {
    // 唯一的 id
    // 某列数据的标识
    // 会在 pagination.sortBy，"body-cell-[name]，slot 等地方使用。
    name: 'desc',

    // 头部的标签
    label: 'Dessert (100g serving)',

    // 决定此列数据使用对象中的哪个字段
    field: 'name',
    // 或者 field: row => row.some.nested.prop,

    // (可选的)  如果我们使用 visible-columns 属性，那么这个列将始终可见
    required: true,

    // (可选的) 对齐方式
    align: 'left',

    // (可选的) 告诉 QTable，您想要这个列是可排序的。
    sortable: true,

    // (可选的) 自定义排序函数
    sort: (a, b, rowA, rowB) => parseInt(a, 10) - parseInt(b, 10),
    // 函数返回值：
    //   * 小于 0 表示 a 小于 b，排序时 a 在 b 前面。
    //   * 等于 0，则 a 和 b 的位置保持不变，对其他不同的元素进行排序。
    //   * 大于 0 表示 a 大于 b，排序时 a 在 b 后面。

    // (可选的) 重写 'column-sort-order' 属性;
    // 设置排序顺序:
    // 'ad' (ascending-descending)表示升序降序
    // 'da' (descending-ascending)表示降序排序
    sortOrder: 'ad', // 或者 'da'

    // (可选的) 您可以使用一个函数来格式化数据
    format: (val, row) => `${val}%`,
    // 另一个格式化示例：
    // format: val => val
    //   ? /* val 值为 true 则使用勾选状态的 Unicode 字符：☑ */ "\u2611"
    //   : /* 否则使用未选中状态的 Unicode 字符：☐ */ "\u2610",

    // body td:
    style: 'width: 500px',
    // 或者使用一个函数 --> style: row => ... (return String/Array/Object)
    classes: 'my-special-class',
    // 或者使用一个函数 --> classes: row => ... (return String)

    // header th:
    headerStyle: 'width: 500px',
    headerClasses: 'my-special-class'
  },
  { name: 'calories', label: 'Calories', field: 'calories', sortable: true },
  { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
  { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
  { name: 'protein', label: 'Protein (g)', field: 'protein' },
  { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
  { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
  { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]
```

## 基础用法

<doc-example title="基础" file="QTable/Basic" />

<doc-example title="黑色模式" file="QTable/Dark" />

<doc-example title="紧凑的" file="QTable/Dense" />

::: tip
您可以将 `dense` 属性与 `$q.screen` 搭配使用来实现响应式的效果。例如：`:dense="$q.screen.lt.md"`，更多信息请参考：[Screen Plugin](/options/screen-plugin)。
:::

## 省略列定义

您可以省略定义列 `columns`，QTable 会根据数据中的第一列进行推断。需要注意的是，标题会自动转为大写，并且排序会自动开启。

<doc-example title="从数据中推断列定义" file="QTable/InferColumns" />

## 固定表头/行

::: warning
请注意，固定表头或行是通过 CSS 中的 `position: sticky` 属性实现的，并不是所有的浏览器都支持它。使用前，请检查 [caniuse.com](https://caniuse.com/#search=sticky)。
:::

<doc-example title="固定表头" file="QTable/StickyHeader" />

<doc-example title="固定行" file="QTable/StickyColumn" />

<doc-example title="固定表头和行" file="QTable/StickyHeaderAndColumn" />

## 分割线

<doc-example title="分割线" file="QTable/Separators" />

## 样式

<doc-example title="自定义行" file="QTable/CustomColumn" />

<doc-example title="自定义颜色" file="QTable/CustomColor" />

<doc-example title="取消头/脚" file="QTable/NoHeaderFooter" />

## 虚拟滚动

当使用虚拟滚动时，您需要使用 `table-style`  属性声明一个最大高度。在下面的示例中，我们还强制一次性显示了所有的列（注意 `pagination` 和 `rows-per-page-options`）。

<doc-example title="基础虚拟滚动" file="QTable/VirtscrollBasic" />

您可以在滚动到底部时动态加载新数据：

<doc-example title="动态加载的虚拟滚动" file="QTable/VirtscrollDynamic" />

您可以同时使用虚拟滚动和分页：

<doc-example title="虚拟滚动和分页" file="QTable/VirtscrollPagination" />

下面的示例展示了如何将虚拟滚动与固定表头同时使用，请注意其中 `virtual-scroll-sticky-start` 属性被设置为了表头的高度。

<doc-example title="虚拟滚动和固定表头" file="QTable/VirtscrollSticky" />

这里有两个工具 CSS 类名可以控制虚滚动的大小计算：

* 使用 `q-virtual-scroll--with-prev` 类可以使被虚拟滚动渲染的元素与上一个元素一起分组（主要用于从同一行数据生成的多个表行）。
* 使用 `q-virtual-scroll--skip` 类可以使被虚拟滚动渲染的元素在计算大小时忽略此元素的大小。

<doc-example title="虚拟滚动加上一个数据渲染多行" file="QTable/VirtscrollMultipleRows" />

## 选择

::: warning 警告
为了使选中功能生效，必须设置 `row-key` 属性。
:::

<doc-example title="单选" file="QTable/SingleSelection" />

<doc-example title="多选" file="QTable/MultipleSelection" />

<doc-example title="选择单元格插槽" file="QTable/SelectionSlots" />

<doc-example title="自定义多选" file="QTable/CustomSelection" />

## 隐藏列，自定义头部，全屏

请注意在列定义中被标记了 `required` 的列无法被隐藏，始终可见。

<doc-example title="隐藏列，自定义头部，全屏" file="QTable/VisibleColumns" />

<doc-example title="隐藏列" file="QTable/VisibleColumns2" />

## 弹出编辑

::: tip
下面的示例中，我们利用 **QPopupEdit** 组件实现了就地编辑数据的功能。请注意，我们使用的是 `body` 类型的插槽，如果使用单元格类型的插槽，**QPopupEdit** 无法生效。
:::

<doc-example title="弹出编辑" file="QTable/PopupEditing" />

## 网格样式

::: tip
您可以将 `grid` 属性与 `$q.screen` 搭配使用以实现响应式的效果。例如：`:grid="$q.screen.lt.md"`. 更多信息请参考： [屏幕插件](/options/screen-plugin)。
:::

下面的示例中，我们让 QTable 以网格模式展示（不使用特殊的插槽）：

<doc-example title="网格样式" file="QTable/GridStyle" />

<doc-example title="网格加头部" file="QTable/GridHeader" />

<doc-example title="网格样式着色" file="QTable/GridStyleColored" />

<doc-example title="砌体状网格" file="QTable/GridMasonry" />

然而，如果您想完全自定义内容，请看下面的示例，其中：

* 我们使用一个 Vue 作用域范围的插槽，叫做 `item` 来定义每个记录应该如何展示（相当于非网格模式下的行），这样您就可以自由发挥了。
* 我们开启多选

<doc-example title="网格样式加上插槽" file="QTable/GridStyleSlot" />

## 展开行

::: warning
如果您为一行数据生成了多个 QTr，请为每个 QTr 设置一个唯一的 `key`。
:::

<doc-example title="内部展开模式" file="QTable/ExpandedRowInternal" />

还可以采用外部扩张模式:

<doc-example title="外部展开模式" file="QTable/ExpandedRowExternal" />

如果您在 QTable 中使用虚拟滚动功能，您应该知道，有两个工具 CSS 类名可以控制虚滚动的大小计算：

* 使用 `q-virtual-scroll--with-prev` 类可以使被虚拟滚动渲染的元素与上一个元素一起分组（主要用于从同一行数据生成的多个表行）。
* 使用 `q-virtual-scroll--skip` 类可以使被虚拟滚动渲染的元素在计算大小时忽略此元素的大小。

<doc-example title="虚拟滚动加扩展模式" file="QTable/VirtscrollExpandedRow" />

## 前/后插槽

<doc-example title="前/后插槽 (头部/脚部)" file="QTable/BeforeAfterHeaderFooter" />

## 分页

::: tip
如果 `pagination` 声明了一个 `rowsNumber` 属性，那么就代表您为 Table 配置了**服务端**分页（& 排序 & 筛选）。请参考 *服务端分页，排序和筛选* 部分。
:::

下面是两个处理分页（以及每页的排序和行数）的示例。

第一个示例强调如何配置基础分页功能：

<doc-example title="基础分页功能" file="QTable/PaginationInitial" />

第二个示例使用 "v-model:pagination" 指令，因为我们希望随时访问它的当前值。以下技术的一个用例是从 QTable 外部控制分页

<doc-example title="同步分页" file="QTable/PaginationSync" />

## 分页插槽

出于学习目的，我们将使用一些基础的控件来实现自定义分页功能，以帮助您开始实现自己的分页控件。

<doc-example title="分页插槽" file="QTable/PaginationSlot" />

## 加载状态

<doc-example title="默认加载态" file="QTable/Loading" />

<doc-example title="自定义加载状态" file="QTable/CustomLoading" />

## 自定义头部

<doc-example title="自定义头部 - 增加/删除行" file="QTable/CustomTop" />

## Body 插槽


下面的示例显示了如何使用插槽自定义整个行：

<doc-example title="Body 插槽" file="QTable/SlotBody" />

下面我们使用一个会被应用到每个单元格的插槽:

<doc-example title="Body-cell 插槽" file="QTable/SlotBodyCell" />

我们也可以指定自定义某些特殊的列。这种插槽的写法是 `body-cell-[name]`，其中 `[name]` 应该被替换成行中用作 row-key 的属性。

<doc-example title="Body-cell-[name] 插槽" file="QTable/SlotBodyCellName" />

## Header 插槽

下面的示例显示了如何使用槽自定义整个标题行

<doc-example title="Header 插槽" file="QTable/SlotHeader" />

下面我们使用一个会被应用于每个表头单元格的插槽:

<doc-example title="Header-cell 插槽" file="QTable/SlotHeaderCell" />

我们也可以指定自定义某些特殊的表头单元格。这种插槽的写法是 `header-cell-[name]`，其中 `[name]` 应该被替换成行中用作 row-key 的属性。

<doc-example title="Header-cell-[name] 插槽" file="QTable/SlotHeaderCellName" />

## 空数据

<doc-example title="空数据标签" file="QTable/NoData" />

当表格没有数据可以展示时，您也可以使用空数据插槽 ("no-data") 来自定义要展示的消息。也可以在 "Search" 输入框中输入一些数据。

<doc-example title="No Data 插槽" file="QTable/NoDataSlot" />

## 处理底层

有一些属性可以用于隐藏底部区域的一些部分，下面有一些示例：

<doc-example title="隐藏底部区域" file="QTable/HideBottom" />

## 自定义排序

<doc-example title="自定义排序" file="QTable/CustomSorting" />

## 响应式表格

为了实现响应式表格，我们有两个工具可以使用：`dense` 和 `grid` 属性。我们还可以将其与 `$q.screen` 搭配使用，更多信息请参考：[屏幕插件](/options/screen-plugin)。

下面的第一个示例使用了 `$q.screen.lt.md` 来开启紧凑模式，第二个示例使用了 `$q.screen.xs` 来开启网格模式，所以您需要调整浏览器的窗口大小来查看它们的变化。

<doc-example title="使用紧凑属性" file="QTable/ResponsiveDense" />

<doc-example title="使用网格属性" file="QTable/ResponsiveGrid" />

## 服务端分页，排序和筛选

当您的数据库中拥有大量的数据时，出于内存，UI 渲染性能等原因，很明显不能一次性全部加载它们。您可以一次只加载表格的一页数据，当用户想要访问下一页数据，或者想要重新排序/筛选时，再去**服务端**重新**请求**对应的数据。

1. 要开启这个行为的第一步是声明 `pagination` 属性，并且其中必须包括 `rowsNumber` 字段。QTable 需要知道可用的行总数，以便正确渲染分页控件。如果筛选导致 `rowsNumber` 更改，则必须动态修改它。

2. 第二步是监听 QTable 的 `@request` 事件。如果因为页码，筛选或者排序的改变需要重新去**服务端**重新请求数据时，这个事件会被触发。

3. 最好声明 `loading` 属性来告知用户，后台正在请求数据。

::: tip
在下面的示例中，模拟了使用 ajax 对服务器进行请求的步骤。虽然概念相似，但如果您要使用此代码，还需要进行适当的更改以连接到您自己的数据源。
:::

<doc-example title="与服务器同步" file="QTable/Synchronizing" />

## 导出数据

下面是一个简单的 csv 编码示例，然后使用 Quasar 提供的 [exportFile](/quasar-utils/other-utils#export-file) 工具函数导出表格数据，浏览器应该会触发一个文件下载。对于更专业的编码方法，我们建议使用 [csv-parse](https://csv.js.org/parse/) 和 [csv-stringify](https://csv.js.org/stringify/) 包。


::: tip 提示
如果要导出用户筛选 + 排序的数据，还可以使用 QTable 内部的 `filteredSortedRows` 计算属性。
:::

<doc-example title="导出为 CSV" file="QTable/ExportCsv" />

## 键盘导航

下面是一个使用键盘在表格所选行中导航的示例。使用 `ArrowUp`，`ArrowDown`，`PageUp`，`PageDown`，`Home` 和 `End` 键进行导航。

<doc-example title="键盘导航" file="QTable/KeyboardNavigation" />
