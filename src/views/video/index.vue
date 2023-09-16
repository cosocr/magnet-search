<template>
  <iframe
    v-if="show"
    :src="configStore.videoUrl"
    class="h-full w-full"
    allowfullscreen="true"
  ></iframe>
</template>
<script setup lang="ts">
import { useConfigStore } from '@/store/config'

const configStore = useConfigStore()
const show = ref(true)
watch(
  () => configStore.videoUrl,
  () => {
    show.value = false
    setTimeout(() => {
      show.value = true
    }, 100)
  }
)
</script>
