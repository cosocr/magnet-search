<template>
  <a-scrollbar style="overflow: auto" class="home-list">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="home-item px-4 py-2"
      :class="{
        'home-item-selected': selectIdx === index
      }"
      @click="handleSelect(item, index)"
    >
      <div>
        <a-typography-text :ellipsis="{ showTooltip: true }">{{ item.name }}</a-typography-text>
      </div>
      <div>
        <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{
          item.size
        }}</a-typography-text>
      </div>
    </div>
  </a-scrollbar>
  <!-- <a-list
    :virtualListProps="{
      height: `${height}px`
    }"
    scrollbar
    :data="list"
    hoverable
    class="home-list"
  >
    <template #item="{ item, index }">
      <a-list-item :key="index">
        <div>
          <a-typography-text :ellipsis="{ showTooltip: true }"> {{ item.name }}</a-typography-text>
        </div>
        <div>
          <a-typography-text type="secondary" :style="{ fontSize: '12px' }">{{
            item.size
          }}</a-typography-text>
        </div>
      </a-list-item>
    </template>
  </a-list> -->
</template>
<script setup lang="ts">
defineProps<{
  list: any[]
  height: number
}>()
const emit = defineEmits<{
  (event: 'change', item: any): void
}>()
const selectIdx = ref(-1)
const handleSelect = (item: any, idx: number) => {
  selectIdx.value = idx
  emit('change', item)
}
</script>
<style>
.home-list {
  user-select: none;
  .arco-typography {
    margin-bottom: 0;
  }
  .home-item {
    border-bottom: 1px solid var(--color-border);
    &:hover {
      background-color: var(--color-fill-2);
      cursor: pointer;
    }
    &.home-item-selected {
      background-color: var(--color-fill-2);
      .arco-typography {
        color: rgb(var(--primary-6));
      }
    }
  }
}
</style>
