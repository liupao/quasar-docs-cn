<template>
  <div>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch :label="`v${$q.version}`" auto-close>
      <q-list dense padding>
        <q-item-label header>最新版本 (v{{ $q.version }})</q-item-label>
        <q-item clickable to="/start/release-notes">
          <q-item-section class="text-teal" avatar>
            <q-icon :name="mdiClipboardText"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">发行说明</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework/quasar/issues" target="_blank" rel="noopener">
          <q-item-section class="text-purple" avatar>
            <q-icon :name="mdiBugCheck"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">报告 bug</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework/quasar" target="_blank" rel="noopener">
          <q-item-section avatar>
            <q-icon :name="fabGithub"></q-icon>
          </q-item-section>
          <q-item-section>仓库</q-item-section>
        </q-item>
        <q-separator class="q-mb-sm q-mt-md"></q-separator>
        <q-item-label header>历史版本</q-item-label>
        <q-item key="v1-link" clickable href="https://v1.quasar.dev/" target="_blank" rel="noopener">
          <q-item-section>v1 文档</q-item-section>
        </q-item>
        <q-item v-for="version in ['17', '16', '15', '14', '13']" :key="version" clickable
          :href="`https://v0-${version}.quasar-framework.org/`" target="_blank" rel="noopener">
          <q-item-section>{{ `v0.${version}` }} 文档</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch label="工具" auto-close>
      <q-list dense padding>
        <q-item clickable href="https://www.bilibili.com/video/BV1pA4y197Zc" rel="noopener" target="_blank">
          <q-item-section class="text-yellow-9" avatar>
            <q-icon name="img:/imgs/svg/bilibili.svg"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">视频教程</q-item-section>
        </q-item>
        <q-item clickable href="https://awesome.quasar.dev" rel="noopener" target="_blank">
          <q-item-section class="text-yellow-9" avatar>
            <q-icon :name="mdiFlare"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">优秀作品</q-item-section>
        </q-item>
        <q-item to="/app-extensions/discover">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiFilePlus"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">应用扩展</q-item-section>
        </q-item>
        <q-item-label class="q-mt-md" header>辅助</q-item-label>
        <q-item clickable to="/icongenie">
          <q-item-section class="text-red" avatar>
            <q-icon :name="mdiStarCircle"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            <div class="row no-wrap items-center">
              <span>应用图标生成器</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable to="/style/theme-builder">
          <q-item-section class="text-teal" avatar>
            <q-icon :name="mdiPaletteSwatch"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">主题构建器</q-item-section>
        </q-item>
        <q-item clickable to="/style/dark-mode">
          <q-item-section avatar>
            <q-icon :name="mdiInvertColors"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">黑色模式</q-item-section>
        </q-item>
        <q-item clickable href="/layout-builder" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiViewDashboard"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">布局构建器</q-item-section>
        </q-item>
        <q-item clickable to="/layout/gallery">
          <q-item-section class="text-grey-8" avatar>
            <q-icon :name="mdiShoppingMusic"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">布局模板</q-item-section>
        </q-item>
        <q-item clickable to="/layout/grid/flex-playground">
          <q-item-section class="text-orange" avatar>
            <q-icon :name="fasFlask"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            <div class="row no-wrap items-center">
              <span>在线体验 FLex</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable href="https://quasarcast.com" target="_blank">
          <q-item-section class="text-red" avatar>
            <q-icon :name="mdiPlayBox"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            <div class="row no-wrap items-center">
              <span>QuasarCast.com</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item-label class="q-mt-md" header>在线体验</q-item-label>
        <q-item clickable href="https://codepen.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-brown-5" avatar>
            <q-icon :name="fabCodepen"></q-icon>
          </q-item-section>
          <q-item-section>Codepen</q-item-section>
        </q-item>
        <q-item clickable href="https://jsfiddle.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="fabJsfiddle"></q-icon>
          </q-item-section>
          <q-item-section>jsFiddle</q-item-section>
        </q-item>
        <q-item clickable href="https://stackblitz.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="fasBolt"></q-icon>
          </q-item-section>
          <q-item-section>StackBlitz (Vite)</q-item-section>
        </q-item>
        <q-item clickable href="https://stackblitz-webpack.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="fasBolt"></q-icon>
          </q-item-section>
          <q-item-section>StackBlitz (Webpack)</q-item-section>
        </q-item>
        <q-item clickable href="https://codesandbox.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-black" avatar>
            <q-icon :name="fasCubes"></q-icon>
          </q-item-section>
          <q-item-section>Codesandbox</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch label="交流群" auto-close>
      <q-list dense padding>
        <q-item clickable href="https://jq.qq.com/?_wv=1027&k=qhsWWkID" rel="noopener" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon name="img:/imgs/svg/qq.svg"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">601944959｜进群问题答案：尤雨溪</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch label="支持" auto-close>
      <q-list dense padding>
        <q-item clickable href="https://chat.quasar.dev" rel="noopener" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiChat"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Discord 聊天</q-item-section>
        </q-item>
        <q-item clickable href="https://forum.quasar.dev/" rel="noopener" target="_blank">
          <q-item-section class="text-secondary" avatar>
            <q-icon :name="mdiForum"></q-icon>
          </q-item-section>
          <q-item-section>论坛</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework" rel="noopener" target="_blank">
          <q-item-section avatar>
            <q-icon :name="fabGithub"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            GitHub 仓库
          </q-item-section>
        </q-item>
        <q-item-label class="q-mt-md" header>社区</q-item-label>
        <q-item clickable href="https://blog.quasar.dev" rel="noopener" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiPost"></q-icon>
          </q-item-section>
          <q-item-section>博客</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework/quasar/discussions/categories/announcements"
          target="_blank" rel="noopener">
          <q-item-section class="text-purple" avatar>
            <q-icon :name="mdiBullhorn"></q-icon>
          </q-item-section>
          <q-item-section>公告</q-item-section>
        </q-item>
        <q-item clickable href="https://twitter.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-blue" avatar>
            <q-icon :name="fabTwitter"></q-icon>
          </q-item-section>
          <q-item-section>Twitter</q-item-section>
        </q-item>
        <q-item clickable href="https://facebook.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-blue-8" avatar>
            <q-icon :name="fabFacebook"></q-icon>
          </q-item-section>
          <q-item-section>
            <div class="row no-wrap items-center"><span>Facebook</span></div>
          </q-item-section>
        </q-item>
        <q-item-label class="q-mt-md" header>捐赠</q-item-label>
        <q-item clickable href="https://donate.quasar.dev" target="_blank" rel="noopener">
          <q-item-section avatar>
            <q-icon :name="mdiCharity"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            GitHub 赞助
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-icon class="self-center q-mx-sm" size="sm"  :name="isDark ? farLightbulb : fasMoon"   @click="toggleDark"/>
  </div>
</template>

<script setup>
import {
  fabGithub,
  fasFlask,
  fabCodepen,
  fabJsfiddle,
  fasBolt,
  fasCubes,
  fabTwitter,
  fabFacebook,
  fasMoon,
  farLightbulb
} from '@quasar/extras/fontawesome-v6'

import {
  mdiPost,
  mdiForum,
  mdiChat,
  mdiBullhorn,
  mdiViewDashboard,
  mdiShoppingMusic,
  mdiClipboardText,
  mdiBugCheck,
  mdiFlare,
  mdiFilePlus,
  mdiPaletteSwatch,
  mdiInvertColors,
  mdiCharity,
  mdiStarCircle,
  mdiPlayBox
} from '@quasar/extras/mdi-v6'
import { useDark } from '../composables/useDark'

defineProps(['align'])

const { toggleDark, isDark } = useDark()

</script>
