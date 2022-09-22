<template lang="pug">
q-page.doc-page

  q-badge.doc-page__overline(
    v-if="overline"
    :label="overline"
    color="grey-3"
    text-color="grey-10"
  )

  .doc-h1.row.items-start.no-wrap
    .col.doc-heading#introduction(v-if="title" @click="copyIntroductionHeading")
      span {{ title }}
      q-badge.q-ml-sm.doc-page__badge(v-if="badge" color="brand-primary" :label="badge")
    a.doc-page__top-link.text-brand-primary.flex.flex-center(v-if="noEdit === false", :href="editHref", target="_blank", rel="noopener noreferrer")
      q-icon(:name="mdiPencil")
      q-tooltip
        span 发现了一处错误？ 在此修改
        q-icon.q-ml-xs(:name="mdiFlash" size="2em")

  .doc-page-nav.text-brand-primary(v-if="related !== void 0")
    .q-gutter-md.flex
      router-link.q-link.doc-page-related.rounded-borders.q-pa-md.cursor-pointer.column.justify-center.bg-grey-3(
        v-for="link in related"
        :key="link.category + link.path"
        :to="link.path"
      )
        .row.no-wrap.items-center
          .col
            .doc-page-nav__categ.text-uppercase {{ link.category || 'Docs' }}
            .doc-page-nav__name.text-weight-bold {{ link.name }}

          q-icon.q-ml-lg(:name="mdiLaunch")

  slot

  .doc-page-nav.doc-page-nav__footer.text-brand-primary.q-pb-xl(v-if="nav !== void 0")
    .text-h6.q-pb-md Ready for more?
    .q-gutter-md.flex
      router-link.q-link.doc-page-related.doc-page-related-bordered.rounded-borders.q-pa-md.cursor-pointer.column.justify-center.bg-grey-1(
        v-for="link in nav"
        :key="link.category + link.path"
        :to="link.path"
      )
        .row.no-wrap.items-center
          q-icon(
            :name="link.dir === 'left' ? mdiChevronLeft : mdiChevronRight"
            v-if="link.dir !== void 0"
            :class="link.dir === 'right' ? 'order-last q-ml-md' : 'order-first q-mr-md'"
          )

          .col
            .doc-page-nav__categ.text-uppercase {{ link.category || 'Docs' }}
            .doc-page-nav__name.text-weight-bold {{ link.name }}

  .doc-page-footer
    q-separator.q-mb-sm

    .q-mb-md(v-if="noEdit === false")
      span 发现了一处错误？
      doc-link.q-ml-xs(:to="editHref") 类似错别字的小错误可以直接在此修改
      doc-link.q-ml-xs(:to="issueHref") 发现重大错误或者落后于官方文档可在此提交

    .doc-page-footer__icons.row.items-center.q-gutter-sm
      a(href="https://github.quasar.dev", target="_blank", rel="noopener")
        q-icon(:name="fabGithub")

      a(href="https://blog.quasar.dev", target="_blank", rel="noopener")
        q-icon(:name="mdiPost")

      a(href="https://chat.quasar.dev", rel="noopener", target="_blank")
        q-icon(:name="mdiChat")

      a(href="https://forum.quasar.dev/", rel="noopener", target="_blank")
        q-icon(:name="mdiForum")

      a(href="https://twitter.quasar.dev", target="_blank", rel="noopener")
        q-icon(:name="fabTwitter")

      a(href="https://facebook.quasar.dev", target="_blank", rel="noopener")
        q-icon(:name="fabFacebook")

      a(href="https://donate.quasar.dev", rel="sponsored", target="_blank")
        q-icon(:name="mdiCharity")

    div.q-mt-md
      | <doc-link to="https://github.com/quasarframework/quasar/blob/dev/LICENSE">MIT LICENSE</doc-link> | <doc-link to="https://www.iubenda.com/privacy-policy/40685560">Privacy Policy</doc-link> | <doc-link to="https://github.com/quasarframework/quasar-art">Quasar Artwork</doc-link>

    div <doc-link to="http://beian.miit.gov.cn/">鄂ICP备2022014971号-1</doc-link>
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
