<template>
  <div>
    <div>
      <a-radio-group type="button" class="mb-3" v-model="type">
        <a-radio value="magnet">磁力</a-radio>
        <a-radio value="meta">元数据</a-radio>
      </a-radio-group>
    </div>
    <a-button
      type="primary"
      class="mb-3"
      @click="handleAdd"
      v-if="type === 'magnet' || (type === 'meta' && data.length === 0)"
      >新增</a-button
    >
    <a-alert v-else size="small" class="mb-1">元数据配置只能有一个</a-alert>
    <a-table :columns="columns" :data="data" :pagination="false">
      <template #optional="{ record, rowIndex }">
        <a-link class="select-none" @click="handleEdit(record, rowIndex)">编辑</a-link>
      </template>
    </a-table>

    <a-modal
      v-model:visible="visible"
      :title="idx === data.length ? '新增' : '编辑'"
      :body-style="{
        height: '70vh',
        padding: '5px 10px'
      }"
      @before-ok="handleOk"
    >
      <a-textarea
        v-model="text"
        :auto-size="{
          minRows: 2
        }"
      ></a-textarea>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
import { Message, TableColumnData } from '@arco-design/web-vue'
import { useConfigStore } from '@/store/config'

const columns: TableColumnData[] = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '地址',
    dataIndex: 'host'
  },
  {
    title: '操作',
    width: 70,
    slotName: 'optional'
  }
]

const type = ref<'magnet' | 'meta'>('magnet')
const configStore = useConfigStore()

const data = computed(() =>
  type.value === 'magnet' ? configStore.magnetConfigs : configStore.metaConfigs
)

const visible = ref(false)
const text = ref('')
const idx = ref(0)
const handleAdd = () => {
  text.value = `
  {
    "name":"配置名",
    "host":"https://example.com"
  }
  `
  idx.value = data.value.length
  visible.value = true
}
const handleEdit = (record: any, rowIdx: number) => {
  text.value = JSON.stringify(record, null, 2)
  idx.value = rowIdx
  visible.value = true
}

const handleOk = (done: Function) => {
  try {
    const str = JSON.parse(text.value)
    configStore.reset(type.value, idx.value, str)
    setTimeout(() => {
      done(true)
    }, 300)
  } catch (e: any) {
    Message.warning(`保存失败：${e.message}`)
    setTimeout(() => {
      done(false)
    }, 300)
  }
}
</script>
