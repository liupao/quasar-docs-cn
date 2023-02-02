<script setup>
import docsearch from '@docsearch/js'
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps(['algolia'])

const router = useRouter()
const route = useRoute()

const docsearch$ = docsearch.default ?? docsearch

onMounted(update)

function update () {
  const options = {
    ...props.algolia
  }
  const rawFacetFilters = options.searchParameters?.facetFilters ?? []
  const facetFilters = [
    ...(Array.isArray(rawFacetFilters)
      ? rawFacetFilters
      : [rawFacetFilters]
    ).filter((f) => !f.startsWith('lang:'))
  ]
  initialize({
    ...options,
    searchParameters: {
      ...options.searchParameters,
      facetFilters
    }
  })
}

function initialize (userOptions) {
  const options = Object.assign({}, userOptions, {
    container: '#docsearch',

    navigator: {
      navigate ({ itemUrl }) {
        const { pathname: hitPathname } = new URL(
          window.location.origin + itemUrl
        )

        // router doesn't handle same-page navigation so we use the native
        // browser location API for anchor navigation
        if (route.path === hitPathname) {
          window.location.assign(window.location.origin + itemUrl)
        } else {
          router.go(itemUrl)
        }
      }
    },

    transformItems (items) {
      console.log('items', items)
      return items.map((item) => {
        return Object.assign({}, item, {
          url: getRelativePath(item.url)
        })
      })
    },

    hitComponent ({ hit, children }) {
      return {
        __v: null,
        type: 'a',
        ref: undefined,
        constructor: undefined,
        key: undefined,
        props: { href: hit.url, children }
      }
    }
  })

  docsearch$(options)
}

function getRelativePath (absoluteUrl) {
  const { pathname, hash } = new URL(absoluteUrl)
  return (
    pathname + hash
  )
}
</script>

<template>
  <div id="docsearch" />
</template>
