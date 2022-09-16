<template>
<div><q-select v-model="item" outlined use-input hide-selected fill-input placeholder="输入名称查询Quasar 组件/指令/插件" input-debounce="0" :options="options" clearable options-dense virtual-scroll-slice-size="50" @filter="filterFn"><template v-slot:prepend><q-icon name="travel_explore"></q-icon></template></q-select><doc-api v-if="item" ref="apiRef" :key="item" :file="item" page-link></doc-api></div>
</template>

<script>
import { ref } from 'vue'
import apiList from 'quasar/dist/transforms/api-list.json'

import DocApi from 'components/DocApi.vue'

export default {
  name: 'DocApiExplorer',

  components: {
    DocApi
  },

  setup () {
    const item = ref('')
    const options = ref(apiList)

    function filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        options.value = apiList.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }

    return {
      item,
      options,
      filterFn
    }
  }
}
</script>
