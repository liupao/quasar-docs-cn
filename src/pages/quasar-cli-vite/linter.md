---
title: ESLint
desc: (@quasar/app-vite) 如何为Quasar项目配置ESLint。
---

强烈推荐您使用一个代码检查工具（linter） （例如  [ESLint](https://eslint.org/)）来保证您的代码的可读性。它也可以帮助您在代码运行前检查代码中的一些错误。

当您使用 Quasar CLI 创建项目时，它会询问是否要添加代码检查工具（linter）以及选择哪一种风格的 ESlint 配置：

* [Prettier](https://github.com/prettier/prettier)
* [Standard](https://github.com/standard/standard)
* [Airbnb](https://github.com/airbnb/javascript)
* .. 或者您可以自定义

会创建两个文件：

* .eslintrc.js -- ESLint 配置文件，包括了代码检查规则
* .eslintignore -- 代码检查时忽略项

可以进一步扩展上述 ESLint 设置。您的项目会默认使用 `eslint-plugin-vue` 来处理 Vue 文件，快速看一下`/.eslintrc.js`：

```js
extends: [
  // https://eslint.vuejs.org/rules/#priority-a-essential-error-prevention-for-vue-js-3-x
  // 考虑切换为 `plugin:vue/strongly-recommended` 或 `plugin:vue/recommended` 以使用更严格的规则
  'plugin:vue/strongly-recommended'
]
```

如果您在创建项目时勾选了 ESLint，那么在您的 `/quasar.config.js` 会被添加一个 `eslint` 属性：

```js
// quasar.config.js

eslint: {
  // fix: true,
  // include = [],
  // exclude = [],
  // rawOptions = {},
  warnings: true,
  errors: true
},
```

## 代码检查规则

代码检查规则被可以删除，修改，添加。但是注意：

* 一些规则属于 Standard, Airbnb 或 Prettier （创建时选择的）的标准。例如：'brace-style'。
* 一些规则属于 eslint-plugin-vue。 例如: 'vue/max-attributes-per-line'.

您可以删除/修改/添加代码检查规则，参考[https://eslint.org/docs/rules/](https://eslint.org/docs/rules/) 或 [https://eslint.vuejs.org/rules](https://eslint.vuejs.org/rules)：。

一些示例的 ESLint  规则如下：

```js
// .eslintrc.js

'rules': {
  'brace-style': [2, 'stroustrup', { 'allowSingleLine': true }],

  'vue/max-attributes-per-line': 0,
  'vue/valid-v-for': 0,

  // allow async-await
  'generator-star-spacing': 'off',

  // allow paren-less arrow functions
  'arrow-parens': 0,
  'one-var': 0,

  'import/first': 0,
  'import/named': 2,
  'import/namespace': 2,
  'import/default': 2,
  'import/export': 2,
  'import/extensions': 0,
  'import/no-unresolved': 0,
  'import/no-extraneous-dependencies': 0,

  // allow debugger during development
  'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
}
```

## 禁用 ESLint

为了禁用 ESLint，您只需要操作：

1. 注释或删除下面的属性:

  ```js
  // quasar.config.js
  eslint: { /* ... */ }
  ```

2. 或者，将 `warnings` 和 `errors` 设置为 `false`：

  ```js
  // quasar.config.js
  eslint: {
    warnings: false,
    errors: false
  }
  ```
