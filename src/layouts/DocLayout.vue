<template>
  <q-layout class="doc-layout" view="lHh LpR lff" @scroll="onScroll">

    <q-header :class="['header',$q.dark.isActive ? '' :'text-dark' ]" bordered>
      <q-toolbar class="q-px-none">
        <q-btn
          class="q-mx-sm lt-md"
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          :icon="mdiMenu"
        ></q-btn>
        <q-btn
          class="quasar-logo text-bold"
          key="logo"
          flat
          no-caps
          no-wrap
          stretch
          to="/"
        >
        <img
          class="doc-header__logo-img"
          :src="logo.img"
          alt="Quasar Logo"
          width="48"
          height="48"
        >
        <img
          class="doc-header__logo-text q-ml-md"
          :src="logo.text"
          alt="Quasar Logo"
          width="150"
          height="20"
        >
        </q-btn>
        <q-space />
        <header-menu
          class="self-stretch row no-wrap"
          v-if="$q.screen.gt.xs"
        ></header-menu>
        <q-btn
          class="q-mx-xs"
          v-show="showRightDrawerToggler"
          flat
          dense
          round
          @click="toggleRightDrawer"
          aria-label="Menu"
          :icon="mdiClipboardText"
        />

      </q-toolbar>
    </q-header>
    <q-drawer
      class="doc-left-drawer"
      side="left"
      v-model="leftDrawerState"
      show-if-above
      bordered
    >
      <q-scroll-area style="height: calc(100% - 51px); margin-top: 51px">
        <template v-if="searchResults !== null">
          <component
            v-if="searchResults.masterComponent !== void 0"
            :is="searchResults.masterComponent"
          ></component>
          <app-search-results
            v-else
            :results="searchResults"
            :search-has-focus="searchHasFocus"
            :search-active-id="searchActiveId"
          ></app-search-results>
        </template>
        <template v-else>
          <div class="row justify-center q-gutter-sm q-my-sm">
            <q-btn
              class="doc-layout__main-btn"
              to="/contact"
              color="brand-primary"
              outline
              :icon="mdiHeart"
              label="支持站点"
              no-wrap
              no-caps
            />
            <q-btn
              class="doc-layout__main-btn"
              href="https://www.bilibili.com/video/BV1pA4y197Zc"
              target="_blank"
              rel="noopener"
              color="brand-primary"
              outline
              icon="img:/imgs/svg/bilibili.svg"
              label="Quasar 视频教程"
              no-wrap
              no-caps
            />
            <q-btn
              class="doc-layout__main-btn"
              href="https://donate.quasar.dev"
              target="_blank"
              rel="noopener"
              color="brand-primary"
              outline
              :icon="mdiHeart"
              label="捐赠 Quasar"
              no-wrap
              no-caps
            />
          </div>
          <app-menu class="q-mb-lg"></app-menu>
        </template>
      </q-scroll-area>
      <div class="absolute-top header">
        <NavBarSearch />
      </div>
    </q-drawer>
    <q-drawer
      v-if="hasRightDrawer"
      side="right"
      v-model="rightDrawerState"
      show-if-above
      :width="220"
      @on-layout="updateRightDrawerOnLayout"
    >
      <q-scroll-area class="fit">
        <header-menu
          class="q-mt-sm text-brand-primary column"
          v-if="$q.screen.lt.sm"
          align="right"
        ></header-menu>
        <q-list class="doc-toc q-my-sm text-grey-8">
          <q-item
            v-for="tocItem in tocList"
            :key="tocItem.id"
            :id="'toc--' + tocItem.id"
            clickable
            v-ripple
            dense
            @click="scrollTo(tocItem.id)"
            :active="activeToc === tocItem.id"
          >
            <q-item-section v-if="tocItem.sub === true" side>»</q-item-section>
            <q-item-section>{{ tocItem.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-scroller>
      <q-btn fab-mini color="brand-primary" glossy :icon="mdiChevronUp"></q-btn>
    </q-page-scroller>
  </q-layout>
</template>

<script>
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'
import { defineComponent, computed } from 'vue'

import {
  mdiMenu,
  mdiClipboardText,
  mdiHeart,
  mdiMagnify,
  mdiChevronUp
} from '@quasar/extras/mdi-v6'
import AppMenu from 'components/AppMenu.js'
import AppSearchResults from 'components/AppSearchResults.vue'
// import SurveyCountdown from 'components/SurveyCountdown.vue'
import HeaderMenu from 'components/HeaderMenu.vue'

import useToc from './doc-layout/use-toc'
import useDrawers from './doc-layout/use-drawers'
import useScroll from './doc-layout/use-scroll'
import useSearch from './doc-layout/use-search'
import NavBarSearch from '../components/NavBarSearch.vue'

export default defineComponent({
  name: 'DocLayout',

  components: {
    AppMenu,
    AppSearchResults,
    // SurveyCountdown,
    HeaderMenu,
    NavBarSearch
  },

  setup () {
    const $q = useQuasar()
    const $route = useRoute()
    const logo = computed(() => {
      const opt = $q.dark.isActive === true ? '-dark' : ''
      return {
        img: `https://cdn.quasar.dev/logo-v2/svg/logo${opt}.svg`,
        text: `https://cdn.quasar.dev/logo-v2/svg/logotype${opt}.svg`
      }
    })
    const scope = {
      mdiMenu,
      mdiClipboardText,
      mdiHeart,
      mdiMagnify,
      mdiChevronUp,
      logo
    }

    useToc(scope, $route)
    useDrawers(scope, $q, $route)
    useScroll(scope, $route)
    useSearch(scope, $q, $route)

    return scope
  }
})
</script>

<style lang="sass">
@supports (backdrop-filter: none)
  .header
    background-color: rgba(0,0,0,.1)
    backdrop-filter: blur(7px)

@supports not (backdrop-filter: none)
  .header
    background-color: $grey-4

.doc-layout__main-btn
  width: 200px

.q-drawer--mobile
  .doc-toc
    .q-item
      margin-left: 3px
    .q-item--active
      font-weight: 600

.doc-toc .q-item
  border-radius: 10px 0 0 10px
  margin-top: 1px
  margin-bottom: 1px
  font-size: 12px

  .q-item__section--side
    padding-right: 8px

  &.q-item--active
    background: scale-color($primary, $lightness: 90%)

.doc-left-drawer
  overflow: inherit !important

.quasar-logo
  &__img
    transform: rotate(0deg)
    transition: transform .8s ease-in-out
    width: 38px
    height: 38px
    margin-right: 8px
    border-radius: 50%

  &:hover &__img
    transform: rotate(-360deg)

  &__logotype
    height: 19px
    vertical-align: middle

.q-page-container :target
  scroll-margin-top: ($toolbar-min-height + 16px)

// keep the button on top of sticky in examples
.q-page-scroller > .q-page-sticky
  z-index: 1

.doc-layout
  .countdown
    .heading
      font-size: 18px
    .time
      font-size: 38px

.app-search-input,
.app-search-input .q-field__control
  height: 50px

.app-search-input
  .q-field__control
    padding: 0 18px 0 16px !important
  input
    line-height: 38px
  .q-field__prepend,
  .q-field__append
    height: 100%
    cursor: text !important
  kbd
    font-size: .6em !important
    min-width: 1.6em
    min-height: 1.5em
    font-weight: bold

body.mobile .app-search-input kbd
  display: none

.layout-countdown
  background: linear-gradient(45deg, #e6f1fc 25%, #c3e0ff 25%, #c3e0ff 50%, #e6f1fc 50%, #e6f1fc 75%, #c3e0ff 75%, #c3e0ff)
  background-size: 40px 40px
</style>
