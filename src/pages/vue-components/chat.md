---
title: 聊天消息
desc: QChatMessage Vue 组件可以显示包含一个或多个用户消息的聊天条目。
keys: QChatMessage
---
Quasar 提供了一个名为 QChatMessage 的聊天组件，用于呈现 props 提供的数据。

::: tip
当消息和头像一起使用但是缺少头像时，使用一个头像占位符。
To mix messages with avatar and without avatar in the same thread, use a placeholder avatar image.
:::

## QChatMessage API

<doc-api file="QChatMessage" />

## 用法

### 基础

::: tip
使用 `sent` 属性指定作为发送一端的消息，另一端是接收方。
:::

<doc-example title="基础" file="QChatMessage/Basic" />

<doc-example title="昵称" file="QChatMessage/Name" />

<doc-example title="头像" file="QChatMessage/Avatar" />

<doc-example title="时间" file="QChatMessage/Stamp" />

<doc-example title="标签" file="QChatMessage/Label" />

### 自定义

<doc-example title="文字和背景的颜色" file="QChatMessage/Color" />

<doc-example title="大小" file="QChatMessage/Size" />

### 插槽

<doc-example title="默认插槽" file="QChatMessage/SlotDefault" />

<doc-example title="头像/时间/昵称 插槽" file="QChatMessage/SlotAvatarStampName" />

### 消毒

::: warning
如果数据来自用户的输入，一定要对不信任的数据进行消毒处理。
:::

<doc-example title="对内容消毒" file="QChatMessage/Sanitize" />
