---
title: 颜色选择器
desc: QColor Vue 组件提供了一种输入颜色的方式。
keys: QColorPicker
related:
  - /quasar-utils/color-utils
---
QColor 组件提供了一种输入颜色的方式。

::: tip
有关处理颜色，也请查看 [Quasar 颜色工具](/quasar-utils/color-utils).
:::


## QColor API

<doc-api file="QColor" />

## 用法

### 基础

<doc-example title="基础" file="QColor/Basic" />

### 与 QInput 一起使用

<doc-example title="Input" file="QColor/Input" />

这里有一些可以用在 QInput 的 `rules` 中的工具：[完整列表](https://github.com/quasarframework/quasar/blob/dev/ui/src/utils/patterns.js)。
为了方便起见，您可以使用它们，也可以编写指定[自定义需求的字符串](/vue-components/input#internal-validation)。

示例： "hexColor", "rgbOrRgbaColor", "anyColor".

更多信息： [QInput](/vue-components/input).

### 不要头部或底部

你可以选择不渲染头部或底部，比如下面的例子:

<doc-example title="No header/footer" file="QColor/NoHeaderFooter" />

### 自定义默认视图

您还可以选择默认视图，如下面的示例所示，在这里我们还指定不希望渲染头部和底部。最终结果生成了一个漂亮的调色板，用户可以从中选择：

<doc-example title="自定义默认视图" file="QColor/CustomDefaultView" />

### 自定义调色盘

<doc-example title="自定义调色盘" file="QColor/CustomPalette" />

### 暗色模式

<doc-example title="暗色版本" file="QColor/Dark" />

### 默认值

<doc-example title="默认值" file="QColor/DefaultValue" />

### 懒更新

<doc-example title="懒更新" file="QColor/LazyModel" />

### 禁用或只读

<doc-example title="禁用或只读" file="QColor/DisableReadonly" />

### 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QColor 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QColor/NativeForm" />
