---
title: 支持 TypeScript
desc: (@quasar/app-webpack) 如何为一个 Quasar 项目开启 TypeScript 支持。
related:
  - /quasar-cli-webpack/quasar-config-js
---
 
如果在创建项目时未勾选 TS 选项，则 Typescript 支持不会默认添加到项目中，但是跟随本页的指南，可以很轻松的将其添加。

::: tip
本页指南只针在创建项目时**未勾选** TS 选项时的情况，如果您当时勾选了 TS 选项，则 TypeScript 支持默认开启。
:::

## 配置 TypeScript 支持

为了支持 TypeScript，需要编辑 `/quasar.config.js`：

```js
module.exports = function (ctx) {
  return {
    supportTS: true,
    ....
  }
}
```
然后，创建一个 `/tsconfig.json` 文件并复制如下内容：

```json
{
  "extends": "@quasar/app-webpack/tsconfig-preset",
  "compilerOptions": {
    "baseUrl": "."
  }
}
```

这样，就可以在项目中使用 TypeScript 了。

::: tip
编写 TypeScript 代码时记得将 JavaScript 文件扩展名修改为 `.ts`。如果要在 Vue 组件中编写 TypeScript 代码，则需要修改 script 标签为 `<script lang="ts">`.
:::

::: warning
如果开启了 `supportTS` 选项，但是没有正确添加 `tsconfig.json` 文件，则编译时会出错。
:::

## 处理 TS 的 Webpack loader
在 Quasar 底层使用了 `ts-loader` 和 `fork-ts-checker-webpack-plugin` （由 `@quasar/app-webpack`  包提供） 来管理 TS 文件。如果您需要为这些库提供自定义的配置项，则需要修改 `supportTS` 属性，如下：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    supportTS: {
      tsLoaderConfig: {
        // `appendTsSuffixTo: [/\.vue$/]` 和 `transpileOnly: true` 配置是默认被添加的，并且不能被修改
        ...
      },
      tsCheckerConfig: {
        // `vue: true` 配置是默认被添加的，并且不能被修改
        ...
      }
    },
    ....
  }
}
```

### 代码检查（Linting） 

首先，添加所需的依赖：

```bash
yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

然后更新 ESLint 配置，例如：

```js
// .eslintrc.js
const { resolve } = require('path');

module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,

  // https://eslint.vuejs.org/user-guide/#how-to-use-custom-parser
  // Must use parserOptions instead of "parser" to allow vue-eslint-parser to keep working
  // `parser: 'vue-eslint-parser'` is already included with any 'plugin:vue/**' config and should be omitted
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/parser#configuration
    // https://github.com/TypeStrong/fork-ts-checker-webpack-plugin#eslint
    // Needed to make the parser take into account 'vue' files
    extraFileExtensions: ['.vue'],
    parser: '@typescript-eslint/parser',
    project: resolve(__dirname, './tsconfig.json'),
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },

  // Rules order is important, please avoid shuffling them
  extends: [
    // Base ESLint recommended rules
    'eslint:recommended',

    // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage
    // ESLint typescript rules
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    // consider disabling this class of rules if linting takes too long
    'plugin:@typescript-eslint/recommended-requiring-type-checking',

    // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules
    'plugin:vue/essential',

    // --- ONLY WHEN USING PRETTIER ---
    // https://github.com/prettier/eslint-config-prettier#installation
    // usage with Prettier, provided by 'eslint-config-prettier'.
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],

  plugins: [
    // required to apply rules which need type information
    '@typescript-eslint',

    // https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-file
    // required to lint *.vue files
    'vue',
  ],

  // add your custom rules here
  rules: {
    // others rules...

    // TypeScript
    'quotes': ['warn', 'single'],
    '@typescript-eslint/explicit-function-return-type': 'off',
  }
}
```

如果遇到了问题，请参考 [typescript-eslint guide](https://github.com/typescript-eslint/typescript-eslint/blob/master/docs/getting-started/linting/README.md)，本示例也来源于此。

最后，更新 `package.json` 中的 `yarn lint` 命令，让其也检查 `.ts` 文件。

::: tip
由于类型检查的高性能开销，TypeScript 的代码检查真的很慢，建议在开发时在 `quasar.config.js` 中将 Webpack 的 lint 扩展禁用。
:::

如果您需要开启 TypeScript 的检查，并且希望 `fork-ts-checker-webpack-plugin` 也将其考虑在内，则需要修改  `tsCheckerConfig` 字段：

```js
// quasar.config.js
module.exports = function (ctx) {
  return {
    supportTS: {
      tsCheckerConfig: {
        eslint: {
          enabled: true,
          files: './src/**/*.{ts,tsx,js,jsx,vue}'
        }
      }
    },
    ....
  }
}
```
