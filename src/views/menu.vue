<template>
  <div class="menu-container">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
    >
      <template v-for="item in menuList" :key="item.path">
        <!-- 有子菜单的情况 -->
        <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
          <template #title>
            <el-icon v-if="item.meta?.icon">
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta?.title }}</span>
          </template>
          <!-- 递归渲染子菜单 -->
          <el-menu-item
            v-for="child in item.children"
            :key="child.path"
            :index="child.path"
          >
            <el-icon v-if="child.meta?.icon">
              <component :is="child.meta.icon" />
            </el-icon>
            <span>{{ child.meta?.title }}</span>
          </el-menu-item>
        </el-sub-menu>

        <!-- 没有子菜单的情况 -->
        <el-menu-item v-else :index="item.path">
          <el-icon v-if="item.meta?.icon">
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ item.meta?.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeIndex = ref('')
const isCollapse = ref(false)

interface MenuItem {
  path: string
  meta?: {
    title?: string
    icon?: string
  }
  children?: MenuItem[]
}

const props = defineProps<{
  menuList: MenuItem[]
}>()

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const handleSelect = (key: string) => {
  router.push(key)
}
</script>

<style scoped>
.menu-container {
  height: 100%;
}

.el-menu-vertical {
  height: 100%;
  border-right: none;
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
}
</style>
