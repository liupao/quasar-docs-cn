---
title: 弹出编辑
desc: QPopupEdit 是一个可用于“就地”编辑值，例如 QTable 中的单元格的Vue组件。
keys: QPopupEdit
related:
  - /vue-components/input
  - /vue-components/menu
---

QPopupEdit 组件可用于“就地”编辑值，例如 QTable 中的单元格。默认情况下，单元格显示为字符串，如果您使用 QPopupEdit，当用户单击表格单元格，将弹出一个编辑框，用户可以使用它编辑文本字段。

这个组件会将一个 [QMenu](/vue-components/menu) 注入到它的父 DOM 元素中来实现上述的行为，所以**它可以被用在任何地方**，而不仅仅是在 QTable 中。

## QPopupEdit API

<doc-api file="QPopupEdit" />

## 用法

::: warning
如果用于一个 QTable 中， QPopupEdit 无法在单元格范围的插槽中工作。
:::

### 标准

<doc-example title="点击文本部分" file="QPopupEdit/Standalone" />

### 在 QTable 中使用
点击单元格来查看弹出的编辑器。"Name" 列展示了 `title` 属性的用法。"Calories" 列展示了数字类型数据的用法。"Fat" 列展示了 `disable` 属性的用法。如果您看一下源代码，您会发现 "Fat" 单元格使用了 QPopupEdit，但是当点击该单元格时，弹出窗口并没有显示。

<doc-example title="点击单元格弹出编辑" file="QPopupEdit/WithTable" />

### 自定义

<doc-example title="自定义 QPopupEdit" file="QPopupEdit/Customizing" />

### 保持且带有按钮的
还可以使用 `buttons` 为其添加两个按钮，"Cancel" 和 "Set"（默认标签，但是您可以通过 `label-set` 和 `label-cancel` 属性来自定义它们的标签内容），这有助于用户控制用户的输入。除此之外，您还可以使用 `persistent` 来取消用户使用 escape 键和点击 QPopupEdit 外部可以关闭弹窗的行为。

下面的示例中，"carbs" 列展示了 `persistent` 属性的用法。"Protein" 列展示了 `label-set` 和 `label-cancel` 的用法，注意其中，"Save" 替换了默认的 "Set"，"Close" 替换了默认的 "Cancel"。

<doc-example title="保持编辑并添加按钮" file="QPopupEdit/WithButtons" />

### 默认插槽

默认插槽的参数是：

```js
{ initialValue, value, validate, set, cancel, updatePosition }
```

::: warning
不要破坏槽的参数结构，因为直接对 `value` 使用 `v-model` 时，会产生格式错误。
:::

<doc-example title="默认插槽的参数" file="QPopupEdit/DefaultSlotParameters" />

### Textarea / QEditor
由于 QPopupEdit 封装了 QInput，所以您基本上可以使用任意类型的 QInput。例如，您还可以使用下面的 "Comments"  列中所示的文本域。

::: tip
当使用多行输入控件（textarea、QEditor）时，您还需要在组件上使用 `@keyup.enter.stop`，以阻止回车键关闭弹出窗口。 您还需要添加按钮来控制弹窗。
:::

<doc-example title="QInput 文本域" file="QPopupEdit/TextArea" />

<doc-example title="QEditor" file="QPopupEdit/PopupWithEditor" />

### 验证
QPopupEdit 还允许对输入进行简单的验证。要使用它，您需要以箭头函数的形式为其提供回调函数，并且该函数应返回布尔值。 `(value) => Boolean`。在下面的 "Calories" 列中演示。

::: tip 提示 1
请注意，我们需要使用 `hide` 事件来重新验证输入。如果我们不这样做，QInput 的 error 属性将以无效状态 “挂起”。
:::

::: tip 提示 2
在本例中，我们使用 QInput 的外部错误处理。我们还可以使用 QInput 的验证属性并将值发送到 QPopupEdit 的验证属性。同样的概念也可以在使用 Vuelidate 时实现。换句话说，给 QPopupEdit 的 validate 函数的值可以来自任何地方。
:::

<doc-example title="验证输入" file="QPopupEdit/WithValidation" />
