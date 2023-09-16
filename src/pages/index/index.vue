<template>
  <div class="h-full flex-row">
    <my-menu></my-menu>
    <div class="h-full w-full bg-slate-200 p-2 md:p-4 xl:p-6">
      <div
        class="h-full w-full"
        :class="{
          'bg-slate-50 p-2 md:p-3 xl:p-4': !isVideo
        }"
      >
        <router-view v-slot="{ Component }">
          <keep-alive v-show="!isVideo">
            <component :is="Component" />
          </keep-alive>
          <component :is="Video" v-show="isVideo" />
        </router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import MyMenu from './my-menu.vue'
import Video from '@/views/video/index.vue'

const route = useRoute()

const isVideo = computed(() => route.path === '/video')
</script>
