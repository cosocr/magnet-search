<template>
  <a-spin class="w-full" :loading="loading"
    ><a-input-group class="w-full">
      <a-select :style="{ width: '180px' }" v-model="configIdx">
        <a-option v-for="(item, index) in configStore.magnetConfigs" :key="index" :value="index">{{
          item.name
        }}</a-option>
      </a-select>
      <a-input-search
        v-model="searchKey"
        placeholder="请输入要搜索的关键字"
        search-button
        @press-enter="handleSearch"
        @search="handleSearch"
      >
        <template #button-icon>
          <icon-search />
        </template>
        <template #button-default>搜索</template>
      </a-input-search>
    </a-input-group></a-spin
  >
</template>
<script setup lang="ts">
import { IconSearch } from '@arco-design/web-vue/es/icon'
import { Message } from '@arco-design/web-vue'
import { search } from '@/utils/magnet'
import { useConfigStore } from '@/store/config'

const emit = defineEmits<{
  (event: 'load', p: any[]): void
}>()
const configStore = useConfigStore()
const configIdx = ref(0)
const searchKey = ref('')
const loading = ref(false)
const handleSearch = () => {
  if (configStore.magnetConfigs.length <= 0) {
    Message.warning('请先导入配置源')
    return
  }
  loading.value = true
  search(searchKey.value, configStore.magnetConfigs[configIdx.value])
    .then((res) => {
      emit('load', res)
    })
    .catch(() => {
      Message.error('搜索失败，若搜索源被屏蔽，请设置中配置用户代理，或启用全局代理')
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
