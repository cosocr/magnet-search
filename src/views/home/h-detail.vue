<template>
  <a-scrollbar style="overflow-y: auto">
    <div class="detail-box w-full p-2">
      <a-space direction="vertical" fill ref="spaceRef">
        <a-card
          size="small"
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
            <div class="flex-row flex-wrap items-center">
              <span style="font-size: 14px; white-space: pre-wrap">{{ info.name }}</span>
            </div> </template
          ><a-spin :loading="infoLoading" class="w-full">
            <a-descriptions :data="infoDesc" :column="1" align="right">
              <template #value="{ value }">
                <a-typography-paragraph copyable ellipsis>{{ value }}</a-typography-paragraph>
              </template>
            </a-descriptions></a-spin
          >
        </a-card>
        <h-detail-meta :name="info.name"></h-detail-meta>
        <a-card
          size="small"
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
              <span class="mr-1 text-sm">截图</span>
              <a-tooltip content="来自 https://whatslink.info/"
                ><icon-info-circle class="cursor-pointer text-sm" />
              </a-tooltip>
            </div>
          </template>
          <a-scrollbar
            style="overflow: auto"
            :style="{ width: `${width - 32}px` }"
            class="min-h-[23px]"
          >
            <a-spin v-if="previewImgLoading"></a-spin>
            <a-image-preview-group
              infinite
              v-else-if="!previewImgLoading && info.imgList.length > 0"
            >
              <template #actions="{ url }">
                <image-preview-action
                  :name="copyUrl === url ? '已复制' : '复制'"
                  @click="handleCopy(url)"
                  ><icon-copy v-show="copyUrl !== url" /><icon-check-circle-fill
                    :style="{ color: 'rgb(var(--success-6)' }"
                    v-show="copyUrl === url"
                /></image-preview-action>
              </template>

              <a-space>
                <a-image
                  v-for="item in info.imgList"
                  :key="item"
                  :src="item"
                  class="w-[200px] cursor-pointer md:w-[280px] lg:w-[320px] xl:w-[360px]"
                  style="min-height: 112px"
                  crossOrigin="anonymous"
                />
              </a-space>
            </a-image-preview-group>
            <div v-else class="min-h-[23px] flex-row items-center">
              <span>暂无</span
              ><icon-refresh
                class="cursor-pointer"
                @click="getPreviewImgs(info.magnet)"
                v-if="info.magnet"
              />
            </div>
          </a-scrollbar>
        </a-card>
        <a-table :columns="columns" :data="info.fileList" :pagination="false" size="small" />
      </a-space></div
  ></a-scrollbar>
</template>
<script setup lang="ts">
import { TableColumnData, ImagePreviewAction, Message } from '@arco-design/web-vue'
import {
  IconCopy,
  IconCheckCircleFill,
  IconRefresh,
  IconInfoCircle
} from '@arco-design/web-vue/es/icon'
import { useElementSize } from '@vueuse/core'
import { getDetail } from '@/utils/magnet'
import { whatsLinkInfo } from '@/utils/whatslink'
import { Magnet, defaultMagnet } from '@/types/magnet'
import HDetailMeta from './h-detail-meta.vue'

const spaceRef = ref()
const { width } = useElementSize(spaceRef)

const columns: TableColumnData[] = [
  {
    title: '文件',
    dataIndex: 'name'
  },
  {
    title: '大小',
    dataIndex: 'size',
    align: 'right'
  }
]
const props = defineProps<{ data: any }>()
const info = ref<Magnet>(defaultMagnet)
const infoDesc = computed(() => [
  {
    label: '大小',
    value: info.value.size
  },
  {
    label: '磁力链',
    value: info.value.magnet
  }
])

const previewImgLoading = ref(false)
const getPreviewImgs = (url: string) => {
  info.value.imgList = []
  previewImgLoading.value = true
  whatsLinkInfo(url)
    .then((res) => {
      if (url === info.value.magnet) {
        info.value.imgList = res.screenshots.map((item) => item.screenshot)
      }
    })
    .finally(() => {
      previewImgLoading.value = false
    })
}

const infoLoading = ref(false)
watch(
  () => props.data,
  () => {
    info.value.name = props.data.name
    info.value.size = props.data.size
    info.value.magnet = ''
    infoLoading.value = true
    getDetail(props.data, props.data.config)
      .then((res: any) => {
        info.value = res
        getPreviewImgs(info.value.magnet)
      })
      .catch(() => {})
      .finally(() => {
        infoLoading.value = false
      })
  }
)

function handleCopyImg() {
  const testImg = document.querySelector('img.arco-image-preview-img')
  const selection = window.getSelection()
  if (!selection || !testImg) {
    Message.warning('您的系统不支持复制图片')
    return
  }
  if (selection.rangeCount > 0) selection.removeAllRanges()
  if (!document.queryCommandSupported('copy')) {
    Message.warning('您的系统不支持复制图片')
    return
  }
  const range = document.createRange()
  range.selectNode(testImg)
  selection.addRange(range)
  document.execCommand('copy')
  selection.removeAllRanges()
}

const copyUrl = ref('')
const handleCopy = (url: string) => {
  copyUrl.value = url
  handleCopyImg()
  setTimeout(() => {
    copyUrl.value = ''
  }, 2000)
}
</script>
<style>
.arco-descriptions {
  .arco-typography {
    margin-bottom: 0;
  }
}
</style>
<style scoped>
.detail-box {
  .arco-card-header {
    background-color: var(--color-neutral-2);
  }
}
</style>
