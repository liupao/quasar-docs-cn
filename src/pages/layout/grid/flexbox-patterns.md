---
title: Flexbox 技巧
desc:  flexbox CSS 的常见技巧，以及如何在 Quasar app 中使用
related:
  - /layout/grid/introduction-to-flexbox
  - /layout/grid/row
  - /layout/grid/column
  - /layout/grid/gutter
  - /layout/grid/flex-playground
---

下面是一些使用 [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 的常见技巧。更多信息请访问 [Tobias Ahlin Blog](https://tobiasahlin.com/blog/) 博客

## 分栏

您可以定义一个 CSS 类，该类将强制应用它的元素在 flex 布局中创建一个行/列的分栏。

```sass
.flex-break
  flex: 1 0 100% !important
.row
  .flex-break
    height: 0 !important
.column
  .flex-break
    width: 0 !important
```

注意在定义 flex 容器时，不要使用 `no-wrap`，并在有需要的地方插入带有 `flex-break` 类的 `div`。

::: tip
您可以在 `flex-break` 元素上使用  `q-py-##` 或 `q-px-##` 来增加间隔空间。
:::

```html
<div class="row">
  <div>Col 1 / Row 1</div>
  <div>Col 2 / Row 1</div>
  <div class="flex-break"></div>
  <div>Col 1 / Row 2</div>
  <div class="flex-break q-py-md"></div>
  <div>Col 1 / Row 3</div>
  <div>Col 2 / Row 3</div>
  <div>Col 3 / Row 3</div>
</div>
```

<doc-example title="行分栏" file="grid/BreakRow" />

::: warning
使用 `column` 类型的 flex 时，必须定义容器的高度。高度必须足以容纳最长的列。
:::

<doc-example title="列分栏" file="grid/BreakColumn" />

## 瀑布流布局

当对多个列使用 `column` 类型的 flex 时，元素的视觉顺序是垂直布局。有时，您希望它们的顺序跟随布局中的行，可以通过搭配使用自定义顺序的 CSS 样式和上述分栏元素来实现这一点。

::: warning
您必须知道要为布局使用多少列。同样，为了获得最佳视觉效果，布局中的元素应该高度接近其他元素。
:::

`$x` 列数的一般 CSS 公式为：

```scss
$x: 3;

@for $i from 1 through ($x - 1) {
  .item:nth-child(#{$x}n + #{$i}) {
    order: #{$i};
  }
}

.item:nth-child(#{$x}n) {
  order: #{$x};
}
```

例如，如果您想要 4 列布局：

```sass
.item:nth-child(4n+1)
  order: 1
.item:nth-child(4n+2)
  order: 2
.item:nth-child(4n+3)
  order: 3
.item:nth-child(4n)
  order: 4
```

对于 HTML，应遵循以下一些要求：

- flex 列容器必须定义高度
- 元素必须放在起始列
- 分栏元素必须与列的数量相同
- 第一个分栏元素必须隐藏（使用 `hidden` 类或 `display: none` 样式）

例如，如果您想要 4 列布局：

```html
<div class="column">
  <div class="flex-break hidden"></div>
  <div class="flex-break"></div>
  <div class="flex-break"></div>
  <div class="flex-break"></div>

  <div>Cell 1</div>
  <div>Cell 2</div>
  ...
  <div>Cell last</div>
</div>
```

<doc-example title="瀑布流" file="grid/Masonry" />

## 使用伪类选择器来分栏瀑布流

当不容易或不可能插入上述分栏元素，且需要分栏 2 或 3 行/列时，可以使用伪选择器。

```sass
.container-class
  &--2-rows
    :before
      flex: 1 0 100% !important
      height: 0 !important
      order: 1
  &--2-columns
    :before
      flex: 1 0 100% !important
      width: 0 !important
      order: 1
  &--3-rows
    :before,
    :after
      flex: 1 0 100% !important
      height: 0 !important
      order: 2
  &--3-columns
    :before,
    :after
      flex: 1 0 100% !important
      width: 0 !important
      order: 2
```

<doc-example title="表格式的瀑布流" file="grid/MasonryTableGrid" />
