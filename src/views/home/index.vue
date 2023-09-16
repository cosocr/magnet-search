<template>
  <div class="h-full flex-col">
    <h-search @load="(res) => (list = res)"></h-search>
    <div class="mt-4 flex-1">
      <a-split
        ref="splitRef"
        :style="{
          height: '100%',
          width: '100%',
          border: '1px solid var(--color-border)'
        }"
        v-model:size="size"
        min="80px"
      >
        <template #first>
          <h-list
            :list="list"
            :height="height"
            :style="{ height: `${height}px` }"
            @change="handleChange"
          ></h-list>
        </template>
        <template #second>
          <h-detail :data="data" :style="{ height: `${height}px` }"></h-detail>
        </template>
      </a-split>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import HList from './h-list.vue'
import HSearch from './h-search.vue'
import HDetail from './h-detail.vue'

const splitRef = ref()
const { height } = useElementSize(splitRef)
const list = ref<any[]>([])
const data = ref<any>()
const size = ref('200px')

const handleChange = (item: any) => {
  data.value = item
}
</script>

<style>
.arco-split-pane {
  height: 100%;
}
</style>
