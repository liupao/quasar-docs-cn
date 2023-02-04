<script setup>
import '@docsearch/css'
import {
  defineAsyncComponent,
  onMounted,
  onUnmounted,
  ref
} from 'vue'

const VPAlgoliaSearchBox = defineAsyncComponent(() => import('./AlgoliaSearchBox.vue'))

// to avoid loading the docsearch js upfront (which is more than 1/3 of the
// payload), we delay initializing it until the user has actually clicked or
// hit the hotkey to invoke it.
const loaded = ref(false)

const metaKey = ref('\'Meta\'')
const buttonText = ref('搜索')
const theme = ref({
  algolia: {
    appId: 'QAQ47WD5F3',
    apiKey: '435dce366a16ec195ef828d5831179c5',
    indexName: 'quasar-v2',

    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }

    }
  }
})

onMounted(() => {
  // meta key detect (same logic as in @docsearch/js)
  metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    ? '\'⌘\''
    : '\'Ctrl\''

  const handleSearchHotKey = (e) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      load()
      remove()
    }
  }

  const remove = () => {
    window.removeEventListener('keydown', handleSearchHotKey)
  }

  window.addEventListener('keydown', handleSearchHotKey)

  onUnmounted(remove)
})

function load () {
  if (!loaded.value) {
    loaded.value = true
    setTimeout(poll, 16)
  }
}

function poll () {
  // programmatically open the search box after initialize
  // 弹出搜索框时关闭左侧抽屉
  const e = new Event('keydown')

  e.key = 'k'
  e.metaKey = true

  window.dispatchEvent(e)

  setTimeout(() => {
    if (!document.querySelector('.DocSearch-Modal')) {
      poll()
    }
  }, 16)
}

onMounted(() => {
  const id = 'VPAlgoliaPreconnect'

  const rIC = window.requestIdleCallback || setTimeout
  rIC(() => {
    if (document.head.querySelector(`#${id}`)) return

    const preconnect = document.createElement('link')
    preconnect.id = id
    preconnect.rel = 'preconnect'
    preconnect.href = `https://${theme.value.algolia.appId}-dsn.algolia.net`
    preconnect.crossOrigin = ''
    document.head.appendChild(preconnect)
  })
})
</script>

<template>
  <div class="VPNavBarSearch">
    <VPAlgoliaSearchBox v-if="loaded"  :algolia="theme.algolia" />

    <div  v-else id="docsearch" @click="load">
      <button
        type="button"
        class="DocSearch DocSearch-Button"
        aria-label="Search"
      >
        <span class="DocSearch-Button-Container">
          <svg
            class="DocSearch-Search-Icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M14.386 14.386l4.0877 4.0877-4.0877-4.0877c-2.9418 2.9419-7.7115 2.9419-10.6533 0-2.9419-2.9418-2.9419-7.7115 0-10.6533 2.9418-2.9419 7.7115-2.9419 10.6533 0 2.9419 2.9418 2.9419 7.7115 0 10.6533z"
              stroke="currentColor"
              fill="none"
              fill-rule="evenodd"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <span class="DocSearch-Button-Placeholder">{{ buttonText }}</span>
        </span>
        <span class="DocSearch-Button-Keys">
          <kbd class="DocSearch-Button-Key"></kbd>
          <kbd class="DocSearch-Button-Key">K</kbd>
        </span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
:root{
  --brand-primary:#00B4FF;
  --docsearch-highlight-color:var(--brand-primary);
  // --docsearch-muted-color: var(--brand-primary);
  --vp-c-bg: #ffffff;
  --vp-c-bg-soft: #f6f6f7;
  --vp-c-bg-soft-mute: #e3e3e5;
  --vp-c-bg-alt: #f6f6f7;
  --vp-c-divider: rgba(60, 60, 67, .12);
  --vp-c-text-1: var(--vp-c-text-light-1);
  // --vp-c-brand: var(--brand-primary);
  --vp-c-white: #ffffff;
  --vp-c-text-light-1: rgba(60, 60, 67, .92);
  --vp-c-text-light-2: rgba(60, 60, 67, .7);
  --vp-c-green: #10b981;
}

.DocSearch-Container{
  z-index: 3001;
}

.DocSearch {
  // --docsearch-primary-color: var(--brand-primary);
  --docsearch-text-color: var(--vp-c-text-1);
  --docsearch-searchbox-shadow: none;
  --docsearch-searchbox-focus-background: transparent;
  --docsearch-key-gradient: transparent;
  --docsearch-key-shadow: none;
  --docsearch-modal-background: var(--vp-c-bg-soft);
  --docsearch-footer-background: var(--vp-c-bg);
}

.dark .DocSearch {
  --docsearch-modal-shadow: none;
  --docsearch-footer-shadow: none;
  --docsearch-logo-color: var(--brand-primary) !important;
  --docsearch-hit-background: var(--vp-c-bg-soft-mute);
  --docsearch-hit-color: var(--vp-c-text-2);
  --docsearch-hit-shadow: none;
}

.DocSearch-Button {
  width: 100%;
  height: 51px;
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  background: transparent;
  transition: border-color 0.25s;
}

.DocSearch-Button:hover {
  background: transparent;
  border-radius: 0px;
}

.DocSearch-Button:focus {
  outline: 1px dotted;
  outline: 5px auto -webkit-focus-ring-color;
}

.DocSearch-Button:focus:not(:focus-visible) {
  outline: none !important;
}

.DocSearch-Button .DocSearch-Button-Container {
  display: flex;
  align-items: center;
}

.DocSearch-Button .DocSearch-Search-Icon {
  position: relative;
  width: 16px;
  height: 16px;
  color: var(--vp-c-text-1);
  fill: currentColor;
  transition: color 0.5s;
}

.DocSearch-Button-Keys, .DocSearch-Button-Placeholder {
    display: flex;
}

.DocSearch-Button-Placeholder{
  padding: 0 6px 0 6px;
}

.DocSearch-Button:hover .DocSearch-Button-Placeholder {
  color: var(--vp-c-text-1);
}

.DocSearch-Button:hover .DocSearch-Button-Key, .DocSearch-Button:hover .DocSearch-Button-Key:first-child:after {
    border-color: var(--brand-primary) !important;
    color: var(--brand-primary) !important;
}

.DocSearch-Button .DocSearch-Button-Key {
  display: block;
  margin: 2px 0 0 0;
  /*rtl:begin:ignore*/
  border-radius: 4px 0 0 4px;
  padding-left: 6px;
  /*rtl:end:ignore*/
  min-width: 0;
  width: auto;
  height: 22px;
  line-height: 22px;
  font-family: $font-family;
  font-size: 12px;
  font-weight: 500;
  transition: color 0.5s, border-color 0.5s;
}

.DocSearch-Button .DocSearch-Button-Key + .DocSearch-Button-Key {
  /*rtl:begin:ignore*/
  border: 1px solid var(--vp-c-divider);
  border-left: none;
  border-radius: 0 4px 4px 0;
  padding-left: 2px;
  padding-right: 6px;
  /*rtl:end:ignore*/
}

.DocSearch-Button .DocSearch-Button-Key:first-child {
  font-size: 1px;
  border: 1px solid var(--vp-c-divider);
  border-right: none;
  letter-spacing: -12px;
  color: transparent;
}

.DocSearch-Button .DocSearch-Button-Key:first-child:after {
  content: v-bind(metaKey);
  font-size: 12px;
  letter-spacing: normal;
  color: var(--docsearch-muted-color);
}

.dark .DocSearch-Footer {
  border-top: 1px solid var(--vp-c-divider);
}

.DocSearch-Form {
  border: 1px solid var(--vp-c-brand);
  background-color: var(--vp-c-white);
}

.dark .DocSearch-Form {
  background-color: var(--vp-c-bg-soft-mute);
}
</style>
