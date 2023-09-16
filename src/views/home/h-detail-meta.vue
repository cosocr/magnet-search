<template>
  <a-card
    size="small"
    title=""
    :headerStyle="{
      backgroundColor: `var(--color-neutral-2)`,
      padding: `5px 16px`,
      height: 'unset'
    }"
    :bodyStyle="{
      padding: `5px 16px`
    }"
  >
    <template #title>
      <div class="flex-row items-center">
        <span class="text-sm">元数据</span>
        <div>
          <a-select v-model="selectIdx" size="small" v-if="metaList.length > 1">
            <a-option v-for="(item, idx) in metaList" :value="idx" :key="idx">{{
              item.name
            }}</a-option>
          </a-select>
        </div>
      </div>
    </template>
    <a-spin :loading="loading" class="w-full">
      <a-descriptions :data="metaDesc" :column="1" align="right">
        <template #value="{ index, value }">
          <a-typography-paragraph copyable v-if="index !== 4">{{ value }}</a-typography-paragraph>
          <a-tag v-else v-for="item in value" :key="item" class="ml-2">{{ item }}</a-tag>
        </template>
      </a-descriptions></a-spin
    >
  </a-card>
</template>
<script setup lang="ts">
import { useConfigStore } from '@/store/config'
import { Meta, defaultMeta } from '@/types/meta'
import { getMetaDetail, searchMeta } from '@/utils/meta'

const configStore = useConfigStore()

const props = defineProps<{
  name: string
}>()
const meta = ref<Meta>(defaultMeta)
const metaDesc = computed<any[]>(() => [
  {
    label: '演员',
    value: meta.value.author
  },
  {
    label: '地址',
    value: meta.value.url
  },
  {
    label: '日期',
    value: meta.value.date
  },
  {
    label: '描述',
    value: meta.value.desc
  },
  {
    label: '标签',
    value: meta.value.tags || []
  }
])

const loading = ref(false)
const metaList = ref<Meta[]>([])
const selectIdx = ref(0)

watch(selectIdx, (idx) => {
  if (idx < 0) {
    return
  }
  // @ts-ignore
  getMetaDetail(metaList.value[idx], metaList.value[idx].config).then((res) => {
    meta.value = res
  })
})
watch(
  () => props.name,
  () => {
    loading.value = true
    metaList.value = []
    meta.value = defaultMeta
    selectIdx.value = -1
    searchMeta(props.name, configStore.metaConfigs[0])
      .then((res: any[]) => {
        metaList.value = res
        if (res && res.length > 0) {
          selectIdx.value = 0
          // eslint-disable-next-line prefer-destructuring
          meta.value = res[0]
        }
      })
      .finally(() => {
        loading.value = false
      })
  }
)
</script>
