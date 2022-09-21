<template>
  <div class="q-pa-md" style="max-width: 500px">
    <div class="row">
      <div class="offset-1 col-3 column justify-between">
        <p>在父元素上设置样式 - .row</p>
        <div>
          <div class="bg-yellow q-pa-sm">黄色块区域</div>
          <div class="row q-gutter-lg bg-red-4">
            <div class="q-pa-md bg-green-3" v-for="n in 4" :key="n">C</div>
          </div>
        </div>
      </div>
      <div class="offset-1 col-3 column justify-between">
        <p>在包裹元素上设置样式 - .row</p>
        <div>
          <div class="bg-yellow q-pa-sm">黄色块区域</div>
          <div class="bg-red-4 row">
            <div class="row q-gutter-lg">
              <div class="q-pa-md bg-green-3" v-for="n in 4" :key="n">C</div>
            </div>
          </div>
        </div>
      </div>
      <div class="offset-1 col-3 column justify-between">
        <p>在包裹元素上设置样式 - .overflow-auto</p>
        <div>
          <div class="bg-yellow q-pa-sm">黄色块区域</div>
          <div class="bg-red-4 overflow-auto">
            <div class="row q-gutter-lg">
              <div class="q-pa-md bg-green-3" v-for="n in 4" :key="n">C</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
