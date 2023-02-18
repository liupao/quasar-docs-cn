---
title: 选项卡
desc: QTabs, QTab 和 QRouteTab Vue 组件可以帮助用户在页面或选项面板之间导航。
keys: QTabs,QTab,QRouteTab
related:
  - /vue-components/tab-panels
  - /vue-components/button-toggle
  - /vue-components/icon
  - /vue-components/badge
---

选项卡是一种使用较少窗口空间显示更多信息的方法。本页通过 QTabs、QTab 和 QRouteTab 介绍选项卡选择部分。

该组件的一个常见用例是用于布局的页头/页脚。请参阅[页面布局](/layout/layout)和[页头 & 页脚](/layout/header-and-footer#example--playing-with-qtabs)页面以获取参考。

::: tip
它可以很好的与 [QTabPanels](/vue-components/tab-panels) 组件搭配使用。
:::

## QTabs API

<doc-api file="QTabs" />

## QTab API

<doc-api file="QTab" />

## QRouteTab API

<doc-api file="QRouteTab" />

## 用法

::: tip TIPS
* 当宽度大于容器宽度时，QTabs 可以水平滚动。相应地调整浏览器窗口大小，以查看此操作。
* 在桌面设备上，您会在两侧看到可点击的箭头图标。
* 在移动设备上，您可以使用手指滑动选项卡。
* 如果您想强制箭头图标在移动设备上可见，那么可以使用 `mobile-arrows` 属性。
:::

::: warning
如果您不安装 Vue Router，QRouteTab 将不会也不能与 UMD 版本一起工作。
:::

### 基础

<doc-example title="基础" file="QTabs/Basic" />

### 外置，内置，隐藏箭头图标

<doc-example title="外置，内置，隐藏箭头图标" file="QTabs/ArrowsModifiers" />

### 垂直的

<doc-example title="垂直的 (搭配 QSplitter 示例)" file="QTabs/Vertical" />

### 紧凑的

<doc-example title="紧凑的" file="QTabs/Dense" />

### 独立的颜色

<doc-example title="独立的颜色" file="QTabs/IndividualColor" />

### 波纹动画

<doc-example title="禁用波纹和自定义波纹颜色" file="QTabs/Ripples" />

### 自定义指示器

在下面的示例中，请注意最后两个选项卡：指示器在顶部和禁用指示器。

<doc-example title="自定义指示器" file="QTabs/CustomIndicator" />

### 选项卡通知

有多种展示选项卡通知的方式：使用 QBadge，通过一个小点或者一个图标（可以是任何东西）。

<doc-example title="选项卡通知" file="QTabs/Notifying" />

### 对齐


QTAB 是响应式的，当容器宽度（非窗口宽度）大于配置的断点时，`align` 属性将会生效（见下文）。出于演示的目的，下面的选项卡禁用了断点。

<doc-example title="对齐" file="QTabs/Alignment" />

### 搭配下拉框

下面第四个选项卡中，如果窗口的宽度小于 1024px，那么 "Movies" 和 "Photos" 选项会被替换成一个 "More..." 下拉按钮。

<doc-example title="搭配下拉框" file="QTabs/Dropdown" />

### 在 QToolbar 中

注意，我们需要声明 `shrink` 属性。默认情况下，QTabs 会尝试扩展到所有可用的水平空间，但是在下面的示例中，我们让其作为 QToolbar 的一个子元素，不希望它如此。

<doc-example title="QToolbar 中的选项卡" file="QTabs/TabsInToolbar" />

### 动态更新

<doc-example title="动态选项卡" file="QTabs/DynamicTabs" />

### 搭配 QTabsPanel

::: tip
QTabPanels 也可以独立使用。它们不依赖于 QTabs 的存在。此外，它们可以放置在页面中的任何位置，而不仅仅是 QTabs 附近。
:::

<doc-example title="选项卡搭配选项面板" file="QTabs/TabsWithTabpanels" />

更多信息： [选项面板](/vue-components/tab-panels).

## 关联到 vue Router

您可以通过 `QRouteTab` 组件将选项卡与 vue Router 联系起来。这个组件继承了 QTab 的所有东西，此外，它还绑定了 `router-link` 中的属性，可以监听当前的应用程序路由，并在单击时触发路由行为。

```html
<q-tabs>
  <q-route-tab
    icon="mail"
    to="/mails"
    exact
  />
  <q-route-tab
    icon="alarm"
    to="/alarms"
    exact
  />
</q-tabs>
```

::: warning
QRouteTab 是否变成选中态取决于您的应用程序的路由，而不是 v-model。所以 v-model 的初始值或者改变 v-model 的值不会改变您的应用的路由。
:::

### 处理自定义的导航

```html
<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-tabs
        no-caps
        class="bg-orange text-white shadow-2"
      >
        <q-route-tab :to="{ query: { tab: '1' } }" exact replace label="2s 后选中" @click="navDelay" />
        <q-route-tab :to="{ query: { tab: '2' } }" exact replace label="不做任何事" @click="navCancel" />
        <q-route-tab :to="{ query: { tab: '3' } }" exact replace label="导航去第二个选项卡" @click="navRedirect" />
        <q-route-tab :to="{ query: { tab: '4' } }" exact replace label="立即导航" @click="navPass" />
      </q-tabs>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navDelay (e, go) {
      e.preventDefault() // 取消默认的导航行为

      // console.log('2s后触发导航')
      setTimeout(() => {
        // console.log('按照2秒前的承诺导航')
        go()
      }, 2000)
    },

    navCancel (e) {
      e.preventDefault() //取消默认的导航行为
    },

    navRedirect (e, go) {
      e.preventDefault() // 取消默认的导航行为
      go({ query: { tab: '2', noScroll: true } })
    },

    navPass () {}
  }
}
</script>
```
