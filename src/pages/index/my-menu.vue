<template>
  <div class="h-full w-[120px] sm:w-[160px] md:w-[200px] xl:w-[240px]">
    <a-menu class="my-menu h-full" v-model:selected-keys="selectKey" @menu-item-click="handleClick">
      <a-menu-item
        key=""
        disabled
        :style="{
          padding: '0',
          cursor: 'default',
          textAlign: 'center',
          color: 'var(--color-text-1)'
        }"
      >
        <div class="title">MagnetSearch</div>
      </a-menu-item>
      <a-menu-item key="home"><icon-search />搜索</a-menu-item>
      <a-menu-item key="video"><icon-file-video />视频</a-menu-item>
      <a-menu-item key="config"><icon-storage />配置</a-menu-item>
      <a-menu-item key="setting"><icon-settings />设置</a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { IconSearch, IconStorage, IconSettings, IconFileVideo } from '@arco-design/web-vue/es/icon'

const selectKey = ref(['home'])

const router = useRouter()
const handleClick = (key: string) => {
  router.push(key)
}
</script>
<style scoped>
.my-menu {
  & .title {
    color: rgb(var(--color-text-1));
  }
  /* background-color: rgba(var(--primary-1),0.9) !important; */
  & .arco-menu-item {
    /* color: var(--color-text-1); */
    border: 2px solid rgba(0, 0, 0, 0);
    /* background-color: rgba(var(--primary-1),0.1) !important; */
    border-radius: 4px;
    & .arco-icon {
      color: inherit;
      margin-right: 8px;
    }
  }
  & .arco-menu-selected {
    border: 2px solid rgb(var(--primary-6));
  }
}
</style>
