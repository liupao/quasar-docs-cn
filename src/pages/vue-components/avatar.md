---
title: Avatar
desc: The QAvatar Vue component creates an element that can embed a letter, an icon or an image within its shape.
keys: QAvatar
---
QAvatar（头像）组件创建了一个可伸缩的、可着色的元素，可以在其元素内包含文本、图标或图像。默认情况下，它是圆形的，但它也可以是正方形，或者带有圆角的矩形。

它通常和别的组件的插槽搭配使用。

## QAvatar API

<doc-api file="QAvatar" />

## 用法

::: tip
使用 `size` 属性来定义 Avatar 组件的长和宽。`font-size`属性可以设置 Avatar 组件内使用的文字的大小，同时也会作用到字母和图标上面。
:::

<doc-example title="基础用法" file="QAvatar/Basic" />

<doc-example title="标准尺寸" file="QAvatar/StandardSizes" />

<doc-example title="方形" file="QAvatar/Square" />

<doc-example title="圆角边框" file="QAvatar/Rounded" />

<doc-example title="搭配其他组件" file="QAvatar/Integrated" />
