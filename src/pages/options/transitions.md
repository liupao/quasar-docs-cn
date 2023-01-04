---
title: Quasar 组件的过渡效果
desc: 开箱即用的 Quasar 组件过渡效果
components:
  - transitions/TransitionList
---

一些 Quasar 组件可以通过`transition-show`/`transition-hide` 或 `transition-prev`/`transition-next` 或 `transition` 等属性来控制过渡效果:

- `transition-show`/`transition-hide`
  - [QBtnDropdown](/vue-components/button-dropdown)
  - [QInnerLoading](/vue-components/inner-loading)
  - [QTooltip](/vue-components/tooltip)
  - [QMenu](/vue-components/menu)
  - [QDialog](/vue-components/dialog)
  - [QSelect](/vue-components/select) (通过 QMenu 和 QDialog)
  - [QPopupProxy](/vue-components/popup-proxy) (通过 QMenu 和 QDialog)

- `transition-prev`/`transition-next`
  - [QCarousel](/vue-components/carousel)
  - [QTabPanels](/vue-components/tab-panels)
  - [QStepper](/vue-components/stepper)

- `transition`
  - [QIntersection](/vue-components/intersection)

我们将在这里展示这些过渡。

<transition-list />

将上表的过渡名称加到组件的属性中去，例如：

```html
<q-menu
  transition-show="jump-down"
  transition-hide="jump-up"
/>
```
