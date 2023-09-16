<template>
  <div>
    <a-form :model="form" @submit="handleSubmit">
      <a-form-item label="用户代理">
        <a-input
          placeholder="请输入用户代理"
          help="例如：http://127.0.0.1:7890"
          v-model="form.proxy"
        ></a-input>
      </a-form-item>
      <a-form-item label="视频页地址">
        <a-input placeholder="请输入观看页面地址" v-model="form.videoUrl"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary">保存</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { useConfigStore } from '@/store/config'

const configStore = useConfigStore()

const form = ref({
  proxy: configStore.proxy,
  videoUrl: configStore.videoUrl
})
const handleSubmit = () => {
  if (form.value.proxy) {
    ipcRenderer.send('set-proxy', form.value.proxy)
  } else {
    ipcRenderer.send('set-proxy', '')
  }
  configStore.setProxy(form.value.proxy)
  configStore.setVideoUrl(form.value.videoUrl)
}
</script>
