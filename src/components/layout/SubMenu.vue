<template>
  <el-sub-menu v-if="hasChildren" :index="item.path">
    <template #title>
      <el-icon><component :is="item.meta?.icon" /></el-icon>
      <span>{{ item.meta?.title }}</span>
    </template>
    <template v-for="child in item.children" :key="child.path">
      <sub-menu v-if="child.children && child.meta?.show" :item="child" />
      <el-menu-item v-else-if="child.meta?.show" :index="child.path">
        <el-icon><component :is="child.meta?.icon" /></el-icon>
        <span>{{ child.meta?.title }}</span>
      </el-menu-item>
    </template>
  </el-sub-menu>
  <el-menu-item v-else :index="item.path">
    <el-icon><component :is="item.meta?.icon" /></el-icon>
    <span>{{ item.meta?.title }}</span>
  </el-menu-item>
</template>

<script lang="ts">
export default {
  name: 'SubMenu',
  inheritAttrs: true
}
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { RouteRecordRaw } from 'vue-router'

const props = defineProps<{
  item: RouteRecordRaw
}>()

const hasChildren = computed(() => {
  return props.item.children && props.item.children.some(child => child.meta?.show)
})
</script> 