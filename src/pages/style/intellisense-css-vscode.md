---
title: Quasar内置css的代码提示
desc: 如何在vscode中获取quasar内置css的代码提示。
related:
  - /style/typography
  - /style/positioning
  - /style/spacing
---

**注意：本页属于个人经验，并不属于官方文档内容**

## 方式一
直接安装 IntelliSense for CSS class names in HTML 插件，插件ID: Zignd.html-css-class-completion，安装完成后即可以在vscode中获得对quasar的内置css的代码提示

## 方式二
1. 安装 Scss Everywhere 插件，插件ID： `gencer.html-slim-scss-css-class-completion`
2. 将以下代码复制进vscode的配置文件（.vscode/settings.json）中去：
``` json
  "html-css-class-completion.remoteStyleSheets": ["https://cdn.jsdelivr.net/npm/quasar@latest/dist/quasar.prod.css"],
  "html-css-class-completion.includeGlobPattern": "**/*.{css,scss,sass,html,vue}"
```
3. 完成上述步骤后，即可以在vscode中获得对quasar的内置css的代码提示，若没有自动弹出提示，可按快捷键（ctrl+ i)
