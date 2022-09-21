<template>
  <div class="q-px-xl q-py-md" style="max-width: 500px">
    <p>.q-gutter 和未指定大小的子元素</p>
    <div class="row">
      <div class="col bg-red-4">
        <div class="row q-gutter-lg">
          <div :class="`bg-green-${n+1}`" v-for="n in 7" :key="n">
            Child
          </div>
        </div>
      </div>
    </div>

    <q-separator class="q-my-md" />

    <p>.q-col-gutter 和未指定大小的子元素</p>
    <div class="row">
      <div class="col bg-red-4 q-mt-lg">
        <div class="row q-col-gutter-lg">
          <div class="semi-transparent" :class="`bg-green-${n+1}`" v-for="n in 7" :key="n">
            Child
          </div>
        </div>
      </div>
    </div>

    <q-separator class="q-my-md" />

    <p>.q-gutter 大小为 .col-6 的子元素 - 两个 .col-6 加起来会 <strong>超过 100%</strong></p>
    <div class="row">
      <div class="col bg-red-4">
        <div class="row q-gutter-lg">
          <div class="col-6" :class="`bg-green-${n+1}`" v-for="n in 5" :key="n">
            Child
          </div>
        </div>
      </div>
    </div>

    <q-separator class="q-my-md" />

    <p>.q-col-gutter 大小为 .col-6 的子元素 - 两个 .col-6 加起来会 <strong>100%</strong></p>
    <div class="row">
      <div class="col bg-red-4 q-mt-lg">
        <div class="row q-col-gutter-lg">
          <div class="semi-transparent col-6" :class="`bg-green-${n+1}`" v-for="n in 5" :key="n">
            Child
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
.semi-transparent
  opacity: .7
</style>
