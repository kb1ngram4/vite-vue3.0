<template>
  <el-menu 
    :default-active="activeMenu"
    class="el-menu-vertical"
    :collapse="isCollapse"
    router>
    <template v-for="route in menuList" :key="route.path">
      <sub-menu v-if="route.meta?.show" :item="route" />
    </template>
  </el-menu>
</template>

<script lang="ts">
export default { name: 'Menu' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue'
import routes from '@/router/routes'

defineProps<{
  isCollapse: boolean
}>()

const route = useRoute()
const activeMenu = ref(route.path)
const menuList = ref(routes)

watch(() => route.path, (newPath) => {
  activeMenu.value = newPath
})
</script>

<style scoped>
.el-menu-vertical {
  height: 100vh;
  border-right: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style> 