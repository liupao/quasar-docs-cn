<template>
  <div>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch :label="`v${$q.version}`" auto-close>
      <q-list dense padding>
        <q-item-label header>Latest (v{{ $q.version }})</q-item-label>
        <q-item clickable to="/start/release-notes">
          <q-item-section class="text-teal" avatar>
            <q-icon :name="mdiClipboardText"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Release notes</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework/quasar/issues" target="_blank" rel="noopener">
          <q-item-section class="text-purple" avatar>
            <q-icon :name="mdiBugCheck"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Report a bug</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework/quasar" target="_blank" rel="noopener">
          <q-item-section avatar>
            <q-icon :name="fabGithub"></q-icon>
          </q-item-section>
          <q-item-section>Repository</q-item-section>
        </q-item>
        <q-separator class="q-mb-sm q-mt-md"></q-separator>
        <q-item-label header>Older Releases</q-item-label>
        <q-item key="v1-link" clickable href="https://v1.quasar.dev/" target="_blank" rel="noopener">
          <q-item-section>v1 docs</q-item-section>
        </q-item>
        <q-item v-for="version in ['17', '16', '15', '14', '13']" :key="version" clickable
          :href="`https://v0-${version}.quasar-framework.org/`" target="_blank" rel="noopener">
          <q-item-section>{{ `v0.${version}` }} docs</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch label="Tools" auto-close>
      <q-list dense padding>
        <q-item clickable href="https://awesome.quasar.dev" rel="noopener" target="_blank">
          <q-item-section class="text-yellow-9" avatar>
            <q-icon :name="mdiFlare"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Awesome List</q-item-section>
        </q-item>
        <q-item to="/app-extensions/discover">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiFilePlus"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">App Extensions</q-item-section>
        </q-item>
        <q-item-label class="q-mt-md" header>Helpers</q-item-label>
        <q-item clickable to="/icongenie">
          <q-item-section class="text-red" avatar>
            <q-icon :name="mdiStarCircle"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            <div class="row no-wrap items-center">
              <span>Icon Genie CLI</span>
            </div>
          </q-item-section>
        </q-item>
        <q-item clickable to="/style/theme-builder">
          <q-item-section class="text-teal" avatar>
            <q-icon :name="mdiPaletteSwatch"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Theme Builder</q-item-section>
        </q-item>
        <q-item clickable to="/style/dark-mode">
          <q-item-section avatar>
            <q-icon :name="mdiInvertColors"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Dark Mode</q-item-section>
        </q-item>
        <q-item clickable href="/layout-builder" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiViewDashboard"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Layout Builder</q-item-section>
        </q-item>
        <q-item clickable to="/layout/gallery">
          <q-item-section class="text-grey-8" avatar>
            <q-icon :name="mdiShoppingMusic"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Layout Gallery</q-item-section>
        </q-item>
        <q-item clickable to="/layout/grid/flex-playground">
          <q-item-section class="text-orange" avatar>
            <q-icon :name="fasFlask"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            <div class="row no-wrap items-center">
              <span>Flex Playground</span>
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
        <q-item-label class="q-mt-md" header>Playground</q-item-label>
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
        <q-item clickable href="https://codesandbox.quasar.dev" target="_blank" rel="noopener">
          <q-item-section class="text-black" avatar>
            <q-icon :name="fasCubes"></q-icon>
          </q-item-section>
          <q-item-section>Codesandbox</q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn-dropdown class="text-bold" :align="align" flat no-caps stretch label="Support" auto-close>
      <q-list dense padding>
        <q-item clickable href="https://chat.quasar.dev" rel="noopener" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiChat"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">Discord Chat</q-item-section>
        </q-item>
        <q-item clickable href="https://forum.quasar.dev/" rel="noopener" target="_blank">
          <q-item-section class="text-secondary" avatar>
            <q-icon :name="mdiForum"></q-icon>
          </q-item-section>
          <q-item-section>Forum</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework" rel="noopener" target="_blank">
          <q-item-section avatar>
            <q-icon :name="fabGithub"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            GitHub Repositories
          </q-item-section>
        </q-item>
        <q-item-label class="q-mt-md" header>Social</q-item-label>
        <q-item clickable href="https://blog.quasar.dev" rel="noopener" target="_blank">
          <q-item-section class="text-brand-primary" avatar>
            <q-icon :name="mdiPost"></q-icon>
          </q-item-section>
          <q-item-section>Blog</q-item-section>
        </q-item>
        <q-item clickable href="https://github.com/quasarframework/quasar/discussions/categories/announcements"
          target="_blank" rel="noopener">
          <q-item-section class="text-purple" avatar>
            <q-icon :name="mdiBullhorn"></q-icon>
          </q-item-section>
          <q-item-section>Announcements</q-item-section>
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
        <q-item-label class="q-mt-md" header>Donate</q-item-label>
        <q-item clickable href="https://donate.quasar.dev" target="_blank" rel="noopener">
          <q-item-section avatar>
            <q-icon :name="mdiCharity"></q-icon>
          </q-item-section>
          <q-item-section class="text-no-wrap">
            GitHub Sponsorship
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import {
  fabGithub,
  fasFlask,
  fabCodepen,
  fabJsfiddle,
  fasCubes,
  fabTwitter,
  fabFacebook
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

export default {
  name: 'HeaderMenu',

  props: {
    align: String
  },

  setup () {
    return {
      fabGithub,
      fasFlask,
      fabCodepen,
      fabJsfiddle,
      fasCubes,
      fabTwitter,
      fabFacebook,

      mdiPost,
      mdiChat,
      mdiForum,
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
    }
  }
}
</script>
