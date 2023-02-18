---
title: 富文本编辑器 (WYSIWYG)
desc: QEditor Vue 组件是一个 WYSIWYG 编辑器，可以将编辑的内容转化成 HTML。
keys: QEditor
---
QEditor 组件是一个 WYSIWYG （“what you see is what you get”——所见即所得） 富文本编辑器，它可以将用户输入的内容转化成 HTML。它使用了浏览器的 `contentEditable` 和 `designMode` 接口。这里有一些关于所使用到的底层技术的文档：

- [Making content editable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content)
- [Design Mode](https://developer.mozilla.org/en-US/docs/Web/API/Document/designMode)
- [execCommand() reference](https://developer.mozilla.org/en-US/docs/Web/API/document/execCommand)
- [contentEditable spec](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)

## QEditor API

<doc-api file="QEditor" />

## 示例
<doc-example title="默认编辑器" file="QEditor/Basic" />

::: warning
在第一个示例中，编辑器下面有两张卡片。第一个使用双大括号语法直接显示未解析 html 结果，而第二个使用 `v-html="editor" `显示解析后的渲染版本。但是这样使用 v-html 会使您的用户容易受到跨网站脚本攻击。如果内容是用户生成的，请确保在渲染端或服务器端（或两者）对其进行消毒清理。
:::

默认情况下，QEditor 提供了 WYSIWYG 编辑器中所需的大部分功能：粗体、斜体、删除线、下划线、无序列表、有序列表、下标、上标、链接、全屏、引号、左对齐、居中对齐、右对齐、对齐、打印、输出、缩进、删除格式、hr、撤消、重做、h1 到 h6、段落、代码段、字体大小 1 到大小 7。

每个功能都预先配置了图标和国际化文案提示。但是，如果您想重写它们的某些设置，可以修改 definitions 配置对象。

```html
:definitions="{
  bold: {label: 'Bold', icon: null, tip: 'My bold tooltip'}
}"
```

<doc-example title="重定义加粗功能" file="QEditor/NewBold" />

下面是一些添加自定义功能的示例，在这种情况下，请确保您不会重叠默认功能：

<doc-example title="添加新的功能" file="QEditor/NewCommands" />

<doc-example title="Kitchen sink" file="QEditor/KitchenSink" />

<doc-example title="自定义样式" file="QEditor/Custom" />

<doc-example title="使用 toolbar 插槽" file="QEditor/ToolbarSlot" />

## 下拉框

### 下拉框的类型

```html
<q-editor
  v-model="model"
  :toolbar="[
    [
      {
        label: '图标 & 标签',
        icon: 'filter_1',
        fixedLabel: true,
        fixedIcon: true,
        options: ['bold', 'italic', 'strike', 'underline']
      }
    ],
    [
      {
        label: '只有标签',
        icon: 'filter_2',
        fixedLabel: true,
        fixedIcon: true,
        list: 'no-icons',
        options: ['bold', 'italic', 'strike', 'underline']
      }
    ],
    [
      {
        label: '只有图标',
        icon: 'filter_3',
        fixedLabel: true,
        fixedIcon: true,
        list: 'only-icons',
        options: ['bold', 'italic', 'strike', 'underline']
      }
    ]
  ]"
/>
```
### 带有唯一选项的下拉菜单
用户只能从每个下拉菜单中选择一个选项。

* 第一个配置的图标和标签会随着当前选择改变
* 第二个配置有固定的标签和动态的图标
* 第三个配置有固定的图标和动态的标签

```html
<q-editor
  v-model="model"
  :toolbar="[
    [
      {
        label: 'Dynamic label',
        icon: 'help_outline',
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    [
      {
        label: 'Static label',
        fixedLabel: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ],
    [
      {
        label: 'Some label',
        icon: 'account_balance',
        fixedIcon: true,
        options: ['left', 'center', 'right', 'justify']
      }
    ]
  ]"
/>
```

## 注意事项

### 自动纠错 & 拼写检查

在某些情况下，您可能想关闭许多现代浏览器提供的自动纠错、自动补全、自动大写和拼写纠错“功能”。您可以简单的给  `<q-editor>` 组件包裹在一个 `<form>` 标签中，并设置以下属性：

```html
<form
  autocorrect="off"
  autocapitalize="off"
  autocomplete="off"
  spellcheck="false"
>
  <q-editor model="editor" />
</form>
```

### 图像
不幸的是，从缓冲区粘贴图像和将图像拖放到编辑器中在不同的浏览器中是不同的，这也取决于图像最初是如何进入缓冲区的。在使用 Firefox 时，您甚至可以调整 ContentEditable 中的图像大小。如果您想允许粘贴/放置图像，我们强烈建议您编写自己的方法。

```html
<q-editor
  model="editor"
  @paste.native="evt => pasteCapture(evt)"
  @drop.native="evt => dropCapture(evt)"
 />
```

### 粘贴纯文本
如果粘贴事件内容类型是文本，浏览器可能会根据文本的来源，自动解析可满足的标签。如果您只想粘贴“干净，无标签”纯文本，则可以使用在此示例中的方法（该方法也会关闭上述拼写校正）：

<doc-example title="重写粘贴事件" file="QEditor/Pasting" />

### 打印
如果您没有设置字体（或者用户没有选择字体），打印对话框中将使用系统默认字体，根据浏览器和底层操作系统的不同而不同。一定要考虑到这一点。

### 国际化
QEditor 的工具提示文案内容由 [Quasar 语言包提供](/options/quasar-language-packs)，因此仅更改语言也会更改界面。如果缺少所需的语言包，或者发现错误，请考虑以 PR 形式提供更新。
