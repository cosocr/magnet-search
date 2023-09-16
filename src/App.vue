<template>
  <router-view></router-view>
</template>
<script setup lang="ts">
import { ipcRenderer } from 'electron'
import { useConfigStore } from './store/config'

const configStore = useConfigStore()
if (configStore.proxy) {
  ipcRenderer.send('set-proxy', configStore.proxy)
}
</script>
<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
</style>
