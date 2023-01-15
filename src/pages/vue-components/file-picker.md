---
title: 文件选择器
desc: QFile是一个处理用户交互以选取文件的Vue 组件。
keys: QFile
related:
  - /vue-components/uploader
  - /vue-components/input
---

QFile 是一个处理用户交互以选取文件的组件。

::: tip
如果您还希望组件也为您处理上传，请考虑改用 [QUploader](/vue-components/uploader)。
:::

## QFile API

<doc-api file="QFile" />

## Design

::: warning
您只能给 QFile 使用一种主要的外观设计款式（`filled`, `outlined`, `standout`, `borderless`），不能使用多个，因为它们是互相排斥的。
:::

<doc-example title="外观设计预览" file="QFile/DesignOverview" />

### 装饰

<doc-example title="Decorators" file="QFile/Decorators" />

### 着色

<doc-example title="Coloring" file="QFile/Coloring" />

### 可清除的
作为辅助，您可以使用 `clearable` 属性，这样用户可以通过附加的图标将数据重置为 `null`。下面第二个示例等价于使用 `clearable`

<doc-example title="Clearable" file="QFile/Clearable" />

### 禁用和只读

<doc-example title="Disable and readonly" file="QFile/DisableReadonly" />

## 用法

::: warning
在底层，QFile 使用原生 input 标签。由于浏览器安全策略，不允许以编程方式使用值填充此类输入。因此，即使您将 v-model 从开始设置为一个值，组件虽然也会显示这些文件，但 input 标签本身不会用该值填充。一定要用户主动交互（单击/点击/ 按下 <kbd>ENTER</kbd>/按下<kbd>SPACE</kbd>），原生 input 标签才能够包含被选中的文件。最好将 model 的初始值设置为 `null` 或 `undefined/void 0`。
:::

### 基础

<doc-example title="单个文件" file="QFile/BasicSingle" />

<doc-example title="多个文件" file="QFile/BasicMultiple" />

### 追加文件

默认情况下，每次用户通过弹出窗口选择任何文件时， QFile 都会替换 model。但是，当您接受多个文件（`multiple` 属性）时，您可以更改此行为并将新选择的文件追加到模型中，而不是替换其旧值。

在下面，您可以多次选取文件，QFile 将继续将它们追加到 model 数据中：

<doc-example title="追加文件" file="QFile/AppendingFiles" />

### 计数器

<doc-example title="基础计数" file="QFile/CounterBasic" />

<doc-example title="计数标签" file="QFile/CounterLabel" />

### 使用 chips

<doc-example title="With chips" file="QFile/WithChips" />

### 使用文件插槽
下面的示例重点介绍如何自定义每个文件的显示，甚至包括上传进度指示器：

<doc-example title="上传进度" file="QFile/WithProgress" />

### 限制文件格式

<doc-example title="基础限制" file="QFile/RestrictionBasic" />

您甚至可以把上面的限制结合起来。

::: tip
在上面的示例中，我们使用的是 `accept` 属性。其值必须是以逗号分隔的唯一文件类型说明符列表。映射到原生input type=file 标签的 'accept' 属性。[更多信息](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers)。
:::

::: warning
`accept` 属性的建议格式为 `<mediatype>/<extension>`。示例："image/png", "image/png"。 QFile 在底层使用了一个 `<input type="file">`，它完全依赖于浏览器来触发文件选择器。如果 `accept` 属性（应用于 input）不正确，则不会在屏幕上显示文件选取器，或者它将出现，但它将接受所有文件类型。
:::

您还可以自定义过滤器（在用户选取文件后执行）：

<doc-example title="过滤" file="QFile/RestrictionFilter" />


## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QFile 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QFile/NativeForm" />
