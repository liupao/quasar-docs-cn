---
title: Dropdown Button
desc: QBtnDropdown Vue 组件是一个点击显示下拉内容的按钮。
keys: QBtnDropdown
related:
  - /vue-components/button
  - /vue-components/button-group
---
QBtnDropdown 组件是一个非常方便的下拉式按钮。与 [QList](/vue-components/list-and-list-items) 组件搭配起来非常好用，但不局限于此。

如果您在找一个下拉输入而不是按钮的组件，请看 [QSelect](/vue-components/select) 组件。

## QBtnDropdown API

<doc-api file="QBtnDropdown" />

## 用法

<doc-example title="基础用法" file="QBtnDropdown/Basic" />

<doc-example title="各种内容" file="QBtnDropdown/VariousContent" />

<doc-example title="分割按钮" file="QBtnDropdown/Split" />

<doc-example title="自定义按钮" file="QBtnDropdown/CustomButton" />

<doc-example title="自定义下拉图标" file="QBtnDropdown/CustomDropdownIcon" />

<doc-example title="文本标签插槽" file="QBtnDropdown/LabelSlot" />

<doc-example title="使用 v-model" file="QBtnDropdown/Model" />

<doc-example title="禁用" file="QBtnDropdown/Disable" />

下面的示例在 UMD 中不可使用，因为它依赖 Vue Router（所以在 Codepen/jsFiddle 中也不能正常运行）。

<doc-example title="分割按钮，并且在主按钮上进行路由跳转" file="QBtnDropdown/Link" no-edit />
