---
title: CSS Shadows (Elevation)
desc: Quasar 提供了 css 工具类帮助给 DOM 添加阴影
---
Quasar 提供了 css 工具类帮助给 DOM 添加阴影，使用起来简单又高效，并且这些阴影遵循 Material Design 的设计规范（将阴影分为 24 个等级，数字越大，阴影越深）

## 用法

| CSS 类名 | 描述 |
| --- | --- |
| `no-shadow` | 移除阴影 |
| `inset-shadow` | 在 DOM 的上方添加嵌入式风格的阴影  |
| `inset-shadow-down` | 在 DOM 的下方添加嵌入式风格的阴影  |
| `shadow-1` | 1 级阴影 |
| `shadow-2` | 2 级阴影 |
| `shadow-N` |  `N`可以被替换为 1 到 24 之间的整数，表示阴影的等级，数字越大，阴影越深 |
| `shadow-transition` | 给 CSS 阴影添加默认的过渡效果 |

<doc-example title="标准的阴影" file="shadows/Standard" scrollable />

上面的示例中，阴影都被添加到了元素的下方，若您想把阴影添加到元素的上方，可以通过在数字前加上`up`来实现。例如：

| CSS 类名 | 描述 |
| --- | --- |
| `shadow-up-1` | 1 级阴影 |
| `shadow-up-2` | 2 级阴影 |
| `shadow-up-N` |`N`可以被替换为 1 到 24 之间的整数，表示阴影的等级，数字越大，阴影越深 |

<doc-example title="在元素上方的阴影" file="shadows/PointingUp" scrollable />

<doc-example title="内嵌的阴影" file="shadows/Inset" />
