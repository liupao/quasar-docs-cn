<template>
  <q-page class="doc-page">
    <q-badge class="doc-page__overline" v-if="overline" :label="overline" color="grey-3" text-color="grey-10"></q-badge>
    <div class="doc-h1 row items-start no-wrap">
      <div class="col doc-heading" id="introduction" v-if="title"><span>
        {{ title }}
      </span>
        <q-badge class="q-ml-sm doc-page__badge" v-if="badge" color="brand-primary" :label="badge"></q-badge>
      </div><a class="doc-page__top-link text-brand-primary flex flex-center" v-if="noEdit === false" :href="editHref"
        target="_blank" rel="noopener noreferrer">
        <q-icon :name="mdiPencil"></q-icon>
        <q-tooltip><span>发现了一处错误？ 在此修改</span>
          <q-icon class="q-ml-xs" :name="mdiFlash" size="2em"></q-icon>
        </q-tooltip>
      </a>
    </div>
    <div class="doc-page-nav text-brand-primary" v-if="related !== void 0">
      <div class="q-gutter-md flex">
        <router-link
          class="q-link doc-page-related rounded-borders q-pa-md cursor-pointer column justify-center bg-grey-3"
          v-for="link in related" :key="link.category + link.path" :to="link.path">
          <div class="row no-wrap items-center">
            <div class="col">
              <div class="doc-page-nav__categ text-uppercase">{{ link.category || 'Docs' }}</div>
              <div class="doc-page-nav__name text-weight-bold">{{ link.name }}</div>
            </div>
            <q-icon class="q-ml-lg" :name="mdiLaunch"></q-icon>
          </div>
        </router-link>
      </div>
    </div>
    <slot></slot>
    <div class="doc-page-nav doc-page-nav__footer text-brand-primary q-pb-xl" v-if="nav !== void 0">
      <div class="text-h6 q-pb-md">Ready for more?</div>
      <div class="q-gutter-md flex">
        <router-link
          class="q-link doc-page-related doc-page-related-bordered rounded-borders q-pa-md cursor-pointer column justify-center bg-grey-1"
          v-for="link in nav" :key="link.category + link.path" :to="link.path">
          <div class="row no-wrap items-center">
            <q-icon :name="link.dir === 'left' ? mdiChevronLeft : mdiChevronRight" v-if="link.dir !== void 0"
              :class="link.dir === 'right' ? 'order-last q-ml-md' : 'order-first q-mr-md'"></q-icon>
            <div class="col">
              <div class="doc-page-nav__categ text-uppercase">{{ link.category || 'Docs' }}</div>
              <div class="doc-page-nav__name text-weight-bold">{{ link.name }}</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="doc-page-footer">
      <q-separator class="q-mb-sm"></q-separator>
      <div class="q-mb-md" v-if="noEdit === false"><span>发现了一处错误？</span>
        <doc-link class="q-ml-xs" :to="editHref">类似错别字的小错误可以直接在此修改</doc-link>
        <doc-link class="q-ml-xs" :to="issueHref">发现重大错误或者落后于官方文档可在此提交</doc-link>
      </div>
      <div class="doc-page-footer__icons row items-center q-gutter-sm"><a href="https://github.quasar.dev"
          target="_blank" rel="noopener">
          <q-icon :name="fabGithub"></q-icon>
        </a><a href="https://blog.quasar.dev" target="_blank" rel="noopener">
          <q-icon :name="mdiPost"></q-icon>
        </a><a href="https://chat.quasar.dev" rel="noopener" target="_blank">
          <q-icon :name="mdiChat"></q-icon>
        </a><a href="https://forum.quasar.dev/" rel="noopener" target="_blank">
          <q-icon :name="mdiForum"></q-icon>
        </a><a href="https://twitter.quasar.dev" target="_blank" rel="noopener">
          <q-icon :name="fabTwitter"></q-icon>
        </a><a href="https://facebook.quasar.dev" target="_blank" rel="noopener">
          <q-icon :name="fabFacebook"></q-icon>
        </a><a href="https://donate.quasar.dev" rel="sponsored" target="_blank">
          <q-icon :name="mdiCharity"></q-icon>
        </a></div>
      <div class="q-mt-md">
        <doc-link to="https://github.com/quasarframework/quasar/blob/dev/LICENSE">MIT LICENSE</doc-link> | <doc-link
          to="https://www.iubenda.com/privacy-policy/40685560">Privacy Policy</doc-link> | <doc-link
          to="https://github.com/quasarframework/quasar-art">Quasar Artwork</doc-link>
      </div>
      <div>
        <doc-link to="http://beian.miit.gov.cn/">鄂ICP备2022014971号-1</doc-link>
      </div>
      <div class="flex flex-col">
        版权声明
        本中文文档内容版权为站长个人所有，保留所有权利。
      </div>
    </div>
  </q-page>
</template>

<script>
import { useMeta } from 'quasar'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import {
  fabGithub, fabTwitter, fabFacebook
} from '@quasar/extras/fontawesome-v6'

import {
  mdiPost, mdiForum, mdiChat, mdiCharity,
  mdiPencil, mdiLaunch,
  mdiChevronLeft, mdiChevronRight,
  mdiFlash
} from '@quasar/extras/mdi-v6'

import { copyHeading } from 'assets/page-utils'
import getMeta from 'assets/get-meta'
import { useDocStore } from 'assets/doc-store.js'

const year = (new Date()).getFullYear()

export default {
  name: 'DocPage',

  props: {
    title: String,
    overline: String,
    related: Array,
    nav: Array,
    noEdit: Boolean,
    badge: String,
    metaTitle: String,
    metaDesc: String,
    toc: Array
  },

  setup (props) {
    useMeta(
      props.metaDesc !== void 0
        ? { title: props.metaTitle, meta: getMeta(props.metaTitle + ' | Quasar 中文文档', props.metaDesc) }
        : { title: props.metaTitle }
    )

    const $store = useDocStore()
    $store.toc = props.toc !== void 0 ? props.toc : []

    const $route = useRoute()
    const editHref = computed(() => {
      return `https://github.com/dongwa/quasar-docs-cn/edit/dev/src/pages${$route.path}.md`
    })
    const issueHref = 'https://github.com/dongwa/quasar-docs-cn/issues/new'

    return {
      year,
      editHref,
      issueHref,

      copyIntroductionHeading () {
        copyHeading('introduction')
      },

      fabGithub,
      fabTwitter,
      fabFacebook,

      mdiPost,
      mdiForum,
      mdiChat,
      mdiCharity,
      mdiPencil,
      mdiLaunch,
      mdiChevronLeft,
      mdiChevronRight,
      mdiFlash
    }
  }
}
</script>

<style lang="sass">
.doc-page
  padding: 16px 46px
  max-width: 900px
  margin-left: auto
  margin-right: auto

  > div, > pre
    margin-bottom: 22px

  &__overline
    border: 1px solid rgba(0,0,0,0.1)
    margin-top: .4rem
    margin-bottom: 0 !important

    & + .doc-h1
      padding-top: .4rem !important

  &__top-link
    color: inherit
    text-decoration: none
    outline: 0

  &__badge
    vertical-align: super

@media (max-width: 600px)
  .doc-page
    padding: 16px

.doc-page-related
  color: $grey-9
  transition: color .28s
  border: 1px solid rgba(0,0,0,.1)

  &:hover
    color: $brand-primary

.doc-page-related-bordered
  border: 1px solid $separator-color

.doc-page-footer
  padding: 36px 0 16px

  &__icons
    font-size: 28px

    a
      text-decoration: none
      outline: 0
      color: $brand-primary
      transition: color .28s

      &:hover
        color: $grey-8

.doc-page-nav

  &__footer
    margin: 68px 0 0
    margin-bottom: 0 !important

  .q-link
    position: relative
    &:before
      content: ''
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      background: #000
      opacity: 0
      transition: opacity .28s
    &:focus:before
      opacity: .1

  & + &
    margin-top: 0

  .q-icon
    font-size: 1.75em

  &__categ
    font-size: .8em

  &__name
    font-size: 1em
</style>
