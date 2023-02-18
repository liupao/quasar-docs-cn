---
title: 选择框
desc: The QSelect Vue component has two types of selection - single or multiple. This component opens up a menu for the selection list and action. A filter can also be used for longer lists.
keys: QSelect
---

QSelect 组件有两种类型的选择框：单选和多选。这个组件可以打开一组可操作的菜单列表。对于较长的列表还可以选择过滤功能。

如果您在找一个下拉按钮而不是输入框，那么使用请使用[下拉按钮](/vue-components/button-dropdown)。


## QSelect API

<doc-api file="QSelect" />

## 外观设计

### Overview

::: warning
您只能给 QSelect 使用一种主要的外观设计款式（`filled`, `outlined`, `standout`, `borderless`），不能使用多个，因为它们是互相排斥的。
:::

<doc-example title="外观设计预览" file="QSelect/DesignOverview" />

### 装饰

<doc-example title="Decorators" file="QSelect/Decorators" />

### 着色

<doc-example title="Coloring" file="QSelect/Coloring" />

### 可清除的

作为辅助，您可以使用 `clearable` 属性，这样用户可以通过附加的图标将数据重置为 `null`。下面第二个示例等价于使用 `clearable`

<doc-example title="Clearable" file="QSelect/Clearable" />

### 禁用和只读

<doc-example title="Disable and readonly" file="QSelect/DisableReadonly" />

### 插槽中使用 "submit" 类型的 QBtn

::: warning
当将类型为 "submit" 的 QBtn 放置在 QField、QInput 或 QSelect 的 "before"、"after" 、"prepend"  或 "append"  插槽中时，您还应该在有问题的 QBtn 上添加 `@click` 事件。该事件应调用提交表单的方法。此类插槽中的所有点击事件均不会传播到其父元素。
:::

### 菜单过渡动画

::: warning
请注意，当使用选项 `options-cover` 属性时，过渡效果不生效。
:::

在下面的示例中，显示部分过渡效果。有关可用过渡效果的完整列表，请转到 [过渡效果](/options/transitions)页面。

<doc-example title="Menu transitions" file="QSelect/MenuTransitions" />

### 选项列表的展示模式
默认情况下，QSelect 在桌面上使用菜单的方式展示选项列表，在手机上使用对话框展示选项列表。但是您可以使用 `behavior` 来强制控制使用某种模式。

::: warning
请注意，在 iOS 上，菜单模式可能会产生问题，尤其是与 `use-input` 属性结合使用时。您可以控制在 IOS 设备上只是用对话框模式，例如：`:behavior="$q.platform.is.ios === true ? 'dialog' : 'menu'"`。
:::

<doc-example title="菜单模式" file="QSelect/BehaviorMenu" />

<doc-example title="对话框模式" file="QSelect/BehaviorDialog" />

## The model

::: danger
model 在单选模式下可以是任意类型（String, Object, ...），但是在多选模式下只能是一个数组。
:::

<doc-example title="单选和多选" file="QSelect/ModelSingleMultiple" />

<doc-example title="多选，计数器和控制最大数量" file="QSelect/ModelMultipleCounter" />

model 的内容可能会受到 `emit-value` 属性的影响，您将在下面的 “选项” 部分中学习。

## 选项

### 选项类型

<doc-example title="字符串选项" file="QSelect/OptionString" />

<doc-example title="对象选项" file="QSelect/OptionObject" />

### Affecting model

当使用 `emit-value` 时，model 会明确的绑定到选项中的 `value` 属性上，而不是整个对象。只有当选项是对象类型时才有意义。

<doc-example title="Emit-value" file="QSelect/OptionEmitValue" />

当使用 `map-options` 时，model 可以只包含 `value`，并且他会根据选项进行映射以确定其 label。这涉及到性能损失，所以只有在绝对必要的情况下才使用它。例如，如果 model 包含整个 Object (因此包含 label 属性) ，就不需要它。

<doc-example title="Map options" file="QSelect/OptionMapOptions" />

### 自定义属性名

默认情况下，QSelect 会寻找并使用每个选项中的 `label`, `value`, `disable` 和 `sanitize` 属性，但是您也可以重写它们：

::: warning
如果您将函数用于自定义 props，请始终检查该选项是否为 null。这些函数既用于列表中的选项，也用于选定的选项。
:::

<doc-example title="自定义 label, value and disable props" file="QSelect/OptionCustomProps" />

### 自定义菜单选项

::: warning
使用虚拟滚动渲染选项列表，因此，如果您为一个选项渲染多个元素，则必须在所有元素上设置 `q-virtual-scroll--with-prev` CSS 类，除了第一个元素。
:::

<doc-example title="选项插槽" file="QSelect/OptionSlot" />

这里是另一个例子，我们为每个选项添加一个 QToggle 。可能性是无穷的。

<doc-example title="对象选项" file="QSelect/OptionQToggle" />

默认情况下，如果没有选项，则不会出现菜单。但是您可以自定义此情况并指定菜单应显示的内容。

<doc-example title="无数据插槽" file="QSelect/OptionNoneSlot" />

### 懒加载

下面的示例展示了如何使用懒加载选项。这意味着，第一次渲染时不需要 `options` 属性。

<doc-example title="Lazy load options" file="QSelect/OptionLazyLoad" />

当滚动到达终点时，您可以动态加载新选项:

<doc-example title="动态加载" file="QSelect/OptionsDynamic" />

### 覆盖模式

<doc-example title="菜单覆盖在组件之上" file="QSelect/OptionCover" />

## 展示的值

<doc-example title="自定义展示的值" file="QSelect/DisplayCustomValue" />

<doc-example title="使用 Chips 展示值" file="QSelect/DisplayChips" />

<doc-example title="选中项插槽" file="QSelect/DisplaySelectedItemSlot" />

## 过滤和自动补全

### `use-input` 和原生属性

所有给 QSelect 设置的属性，如果未在 **API** 卡片中的 `props` 部分列出，那么它将会被传递给底层的原生`input` 标签（请先检查 `use-input` 属性描述以了解它的作用）以完成过滤/指定补全/添加新选项。例如： autocomplete，placeholder。

更多信息： [native input attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

<doc-example title="过滤选项" file="QSelect/InputFilterOptions" />

<doc-example title="基础的过滤" file="QSelect/BasicFiltering" />

<doc-example title="超过两个字符才开始过滤" file="QSelect/InputFilterMin" />

<doc-example title="文本自动补全" file="QSelect/TextAutocomplete" />

<doc-example title="懒过滤" file="QSelect/InputFilterLazy" />

<doc-example title="过滤后的选择" file="QSelect/InputFilterAfter" />

## 创建新的值

::: tip
以下只是一些示例，帮助您开始创建自己的 QSelect。这不是 QSelect 可以提供的全部可能性。
将此功能与 `use-input` 属性一起使用是很有意义的。
:::

为了创建新的值，您可以使用`new-value-mode` 属性，或者监听 `@new-value` 事件，如果您同时使用两者，那么在您的自定义场景中，`@new-value` 事件应该只用于覆盖 `new-value-mode`。

### new-value-mode 属性

`new-value-mode` 属性指定创建的新值应该怎么样被添加到数据中，可以有以下三种取值：

1. `add` 即使数据中已经存在了相同的值仍然添加；
2. `add-unique` 不会添加重复数据；
3. `toggle` 如果数据中之前没有此数据那么添加它，否则将其删除。

使用这个属性时不必监听 `@new-value`  事件，除非您有特殊的场景需要重写它的行为。

<doc-example title="添加新的数据" file="QSelect/CreateNewValueMode" />

### @new-value 事件
`@new-value` 事件中带有被添加的新数据和一个 `done` 回调函数。`done` 函数有两个可选的参数：
 - 被添加的数据
 - 添加数据的行为（与 `new-value-mode` 可设置的值一样，并且会覆盖它）
    - 默认行为（如果未设置 `new-value-mode` 的话）是即使数据中已经有重复的数据也会添加

不带参数调用 `done()` 只会清空输入框的值，而不会以任何方式修改 model。

<doc-example title="监听 @new-value" file="QSelect/CreateListener" />

<doc-example title="不添加重复的值" file="QSelect/CreateListenerUnique" />

### 使用菜单和过滤

过滤和给菜单中添加新的值一起使用：

<doc-example title="过滤和菜单中添加新的值" file="QSelect/FilteringAddsToMenu" />

过滤但不给菜单添加新的值（下面三个示例中，要添加的值至少需要 3 个字符才能通过）：

<doc-example title="过滤但不给菜单添加新的值" file="QSelect/FilteringNoAddToMenu" />

从输入生成多个值：

<doc-example title="使用分号隔开生成多个值" file="QSelect/FilteringAddMultiple" />

## 安全处理

**默认情况下，所有选项（包括选定的选项）都是经过安全处理的**。这意味着以 HTML 格式显示它们是无效的。然而，如果您需要在您的选项上显示 HTML，并且您信任它们的内容，那么有几种方法可以做到这一点。

您可以通过以下方式强制使用菜单选项的 HTML 形式：
  - 将受信任的选项的 `html` 键设置为 `true`（用于特定的受信任的选项生效）
  - 或通过设置 QSelect 的 `options-html` 属性（对于所有选项生效）

QSelect 的显示值会以 HTML 形式显示，如果：
  - 设置了 QSelect 的 `display-value-html`属性
  - 或者您不使用 `display-value` 和
    - 设置了 QSelect 的 `options-html` 属性
    - 所有被选定的选项的 `html` 键都被设置为 `true`

::: warning
如果您使用了 `selected` 或 `selected-item` 插槽，那么您需要自行对展示的值进行安全处理。`display-value-html` 属性不会被应用。
:::

<doc-example title="HTML 格式的选项" file="QSelect/HtmlOptions" />

<doc-example title="HTML 格式的显示值" file="QSelect/HtmlDisplayValue" />

## 渲染性能

渲染性能不会受到选项数量的影响，除非在大的集合中使用 `map-options`。请注意，当用户在列表中滚动时，虚拟无限滚动将渲染其他选项。

::: tip
* (Composition API) 为了在使用大量选项时获得最佳性能，不要用 `ref()/computed()/reactive()/etc`来包裹您传递给 `options` 属性中的数组。这允许 Vue 跳过对列表进行响应式改变。
* (Options API) 为了在使用大量选项的同时获得最佳性能，请使用 `Object.freeze(items)` 冻结您传递给 `options` 属性中的数组。这允许 Vue 跳过对列表进行响应式改变。
:::

<doc-example title="100k 个选项" file="QSelect/RenderPerf" />

## 键盘导航

当 QSelect 聚焦时：
  - 按下 <kbd>ENTER</kbd>, <kbd>ARROW DOWN</kbd> （或者 <kbd>SPACE</kbd> 如果没有设置 `use-input`的话） 将会打开选项列表。
  - 如果设置了 `use-chips`：
    - 按下 <kbd>SHIFT</kbd> + <kbd>TAB</kbd> 将在 QChips 中向后导航 （如果选择了一个 QChip <kbd>TAB</kbd>  键将会在 QChips 中向前导航）
    - 当一个 QChip 被选中时，按下 <kbd>ENTER</kbd> 会取消选中该选项。
    - 按下 <kbd>BACKSPACE</kbd> 会删除选中列表中的最后一个（如果设置了 `use-input` 输入应该为空）
  - 按下 <kbd>TAB</kbd> 将导航至下一个或页面上的上一个可聚焦元素（如果未设置  `use-chips` 或选择了第一个 QChip，则按 <kbd>SHIFT</kbd> + <kbd>TAB</kbd>）
  - 如果未设置 `use-input`，则输入文字（<kbd>0</kbd> - <kbd>9</kbd> or <kbd>A</kbd> - <kbd>Z</kbd>）将会：
    - 创建一个搜索缓冲区（当在 1.5 秒内未输入新键时将重置），该缓冲区将用于在选项标签中进行搜索
    - 如果多次输入缓冲区中的第一个键，则选择以该字母开头的下一个选项（在当前焦点之后）
    - 选择与键入的文本匹配的下一个选项（从当前的焦点开始）（匹配是模糊的-选项标签应以第一个字母开头并包含所有字母）

当选项列表打开时：
  - 按下 <kbd>ARROW UP</kbd> 或 <kbd>ARROW DOWN</kbd>将在选项列表中向上或向下导航
  - 按下 <kbd>PAGE UP</kbd> 或 <kbd>PAGE DOWN</kbd> 将在选项列表中向上或向下导航一页
  - 按下 <kbd>HOME</kbd> 或 <kbd>END</kbd> 将导航到选项列表的开头或结尾（仅当您未使用 `use-input` 或输入为空时）
  - 使用箭头键进行导航时，导航将在到达列表的开头或结尾时结束
  - 选项在列表中被选中时按下 <kbd>ENTER</kbd> （如果未设置 `use-input`，则按 <kbd>SPACE</kbd>；如果未设置 `multiple`，则按 <kbd>TAB</kbd>）将会：
    - 选择选项，并且如果未设置 `multiple` 则关闭选项列表。
    - 如果设置了 `multiple`，则切换选项。

## 原生表单提交

当处理一个带有 `action` 和 `method` 的原生表单时（如：使用 Quasar 和 ASP.NET 控制器时），您需要为 QSelect 声明 `name` 属性，否则表单数据中不会包含它：

<doc-example title="原生表单" file="QSelect/NativeForm" />
