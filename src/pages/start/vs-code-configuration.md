---
title: 配置 VS Code
desc: 配置 VS Code，以便更好地使用 Quasar。
---

::: tip 提示
假设您已安装了 VS Code（Visual Studio Code）。
:::

## VS Code 扩展

### 核心扩展插件（自动补全、代码检查、代码格式）

- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

### 推荐插件

- [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
- [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [npm](https://marketplace.visualstudio.com/items?itemName=eg2.vscode-npm-script)
- [VS Code Icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)

## Quasar CLI

Quasar CLI 在创建项目时已经配置好了 VS Code 的推荐选项。💪

用 VS Code 打开项目时，如果还没有安装推荐的扩展插件， VS Code 会弹出安装提示。安装所需插件后，重启 VS Code 即可开始开发。🚀

## Vite、Vue CLI 及 UMD

在 `.vscode/settings.json` 中添加使用的功能与预设内容的配置项。

### 常见配置

```json
{
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": true
}
```

### ESLint

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": [
    "source.fixAll.eslint"
  ],
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "vue"]
}
```

#### 不使用 Prettier

```json
{
  "editor.defaultFormatter": "dbaeumer.vscode-eslint"
}
```

#### 使用 Prettier

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### TypeScript

```json
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 在 VSCode 中调试 Quasar 项目

建议您在浏览器打开本页，一边阅读本页的内容，一边按照本页中的指引调试您的项目。

调试的第一步是启用 source map 功能。开发模式下，Quasar 会自动启用 source map 功能。这里有[一篇文章](https://blog.scottlogic.com/2017/11/01/webpack-source-map-options-quick-guide.html)，详细介绍了 [Webpack 的开发工具设置](https://webpack.js.org/configuration/devtool/)（控制 source maps 的设置）。

Quasar 默认使用的是 `eval-cheap-module-source-map`。使用 `eval-cheap-module-source-map` 时，构建速度较慢，但并不是最慢的；不过，重构速度相对较快，但也不是最快的；并且这种方式会保存源行代码，但却不是最佳质量。如要放弃精准度以获得更快的构建速度，或要放弃构建速度以获得更高的精准度，请使用其他值。

`devtool` 中最慢但最精准的值是 `source-map`。使用这个值时，因为 Chrome 的内置调试器使用的是 Vue 的完整源代码，VS Code 可以正常工作，并且使用 `source-map` 查找源代码及定位断点所在的代码行更容易。在 [`quasar.config.js > build > devtool`](/quasar-cli-webpack/quasar-config-js#property-build) 项下添加以下内容，即可启用 `source-map` 调试方式。

```js
// quasar.config.js
build: {
  // ...

  // 在此向 Webpack 传递配置
  devtool: 'source-map'
}
```

接下来，要为 VS Code 调试器添加配置。点击 VS Code 侧边栏（Activity Bar）上的调试图标（Run and Debug），并弹出调试面板。点击调试面板上方的齿轮图标，打开 `launch.json`。在这里输入应用启动时要使用的调试配置项。下文是在 Chrome 中启动 Quasar 应用时的设置内容。使用 Firefox 时，请参阅 [Vue Cookbook](https://v2.vuejs.org/v2/cookbook/debugging-in-vscode.html#Launching-the-Application-from-VS-Code) 中的内容，但该内容是针对 Vue 2.x 的，可能已经过时了。

下例中，用 `name` 属性替换了 `package.json` 中的 `package-name`：

```json
{
  "type": "chrome",
  "request": "launch",
  "name": "Quasar App: chrome",
  "url": "http://localhost:8080",
  "webRoot": "${workspaceFolder}/src",
  "breakOnLoad": true,
  "sourceMapPathOverrides": {
    "webpack://package-name/./src/*": "${webRoot}/*"
  }
}
```

保存 `launch.json`，然后在调试面板标题栏的下拉菜单中选择配置项。在启动调试器前，必须要先运行应用。在终端（Terminal）中输入 `quasar dev` 命令，启动开发服务器。接着，点击调试面板标题栏上绿色的**开始调试**（Start Debugging）按钮（或按 F5 键），启动调试会话，监测已运行的应用。致此，就可以设置断点，并控制代码的步进执行等操作，所有这些都是在 VS Code 中进行的。您还可以启动 Chrome 内置的调试器，该调试器可以与 VS Code 同步执行调试。最后，强烈建议安装 [Vue devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 插件，该插件在调试时的用处也很大。

::: tip 提示
如果只想使用 Chrome 或 Firefox 的调试器，但又觉得在浏览器的源代码（source）标签页中定位正确的源码文件太难，则可在代码中使用调试状态，强制调试器在断点所在的代码行停止执行，并指向源代码所在的正确位置。
:::
