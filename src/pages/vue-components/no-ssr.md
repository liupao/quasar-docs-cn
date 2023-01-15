---
title: No SSR
desc: QNoSsr是一个可以控制其内容只在SSR应用的客户端或服务端渲染的Vue 组件。
keys: QNoSsr
related:
  - /quasar-cli-vite/developing-ssr/introduction
  - /quasar-cli-webpack/developing-ssr/introduction
---
QNoSsr 组件只在您创建 SSR 应用时有用。

他可以避免它的内容在服务端被渲染，而只在客户端渲染。当您的代码不是同构的并且只能在浏览器中允许时特别有用。

或者，您也可以使用它仅在服务器端渲染某些内容，在浏览器客户端中它会自动删除相关内容。

## QNoSsr API

<doc-api file="QNoSsr" />

## 用法

### 基础

```html
<q-no-ssr>
  <div>这个标签不会服务端渲染</div>
</q-no-ssr>
```

### Multiple client nodes

```html
<q-no-ssr>
  <div>这个标签不会服务端渲染</div>
  <div>这个也不会。</div>
</q-no-ssr>
```

### 多个客户端节点

```html
<q-no-ssr tag="blockquote">
  <div>这个标签不会服务端渲染</div>
  <div>这个也不会。</div>
</q-no-ssr>
```

### Placeholder 属性

```html
<q-no-ssr placeholder="Rendered on server">
  <div>这个标签不会服务端渲染/div>
</q-no-ssr>
```

### Placeholder 插槽

```html
<q-no-ssr>
  <div>这个标签不会服务端渲染/div>
  <template v-slot:placeholder>
    <div>Rendered on server</div>
  </template>
</q-no-ssr>
```

### placeholder 插槽中多个节点

```html
<q-no-ssr>
  <div>这个标签不会服务端渲染/div>
  <template v-slot:placeholder>
    <div>Rendered on server (1/2)</div>
    <div>Rendered on server (2/2)</div>
  </template>
</q-no-ssr>
```

### 只有 placeholder 插槽

```html
<q-no-ssr>
  <template v-slot:placeholder>
    <div>Rendered on server</div>
  </template>
</q-no-ssr>
```
