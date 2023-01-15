---
title: 分页
desc: QPagination是一个可以在页面中展示分页控件的Vue 组件。
keys: QPagination
---
QPagination 组件可用于任何需要分页系统的地方。它为用户提供了一个简单的UI，用于在项目或页面之间移动。

QPagition 有两种操作模式：按钮或使用输入框。后者允许用户通过点击/轻击输入框，键入页码，然后按 Enter 键进入特定页面。如果新页码在有效范围内，则 QPagination 绑定的 model 值将相应更改。


## QPagination API

<doc-api file="QPagination" />

## 用法

### 标准

<doc-example title="标准" file="QPagination/Standard" />

### 自定义图标

<doc-example title="替换图标" file="QPagination/Icons" />

### 使用输入框

<doc-example title="使用输入框" file="QPagination/Input" />

<doc-example title="自定义输入框的颜色" file="QPagination/InputColor" />

### 控制显示多少页码

<doc-example title="最多能显示几个页码" file="QPagination/MaxPages" />

<doc-example title="删除省略号" file="QPagination/Ellipses" />

### 处理边界

<doc-example title="显示边界数字" file="QPagination/BoundaryNumbers" />

<doc-example title="显示到边界的链接" file="QPagination/BoundaryLinks" />

<doc-example title="上一页下一页" file="QPagination/DirectionLinks" />

### 样式

下面只是一些示例，并不是完整的列表：

<doc-example title="样式" file="QPagination/Styles" />
