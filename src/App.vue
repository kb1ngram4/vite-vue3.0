<template>
  <div class="app-container">
    <div class="sidebar">
      <Menu :is-collapse="isCollapse" />
    </div>
    <div class="main">
      <div class="header">
        <el-icon class="collapse-btn" @click="toggleCollapse">
          <Fold v-if="isCollapse" />
          <Expand v-else />
        </el-icon>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@/components/layout/Menu.vue'
import { Fold, Expand } from '@element-plus/icons-vue'

const isCollapse = ref(false)

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value
}
</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  background-color: #304156;
  transition: width 0.3s;
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 15px;
  background: white;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
}

.collapse-btn {
  font-size: 20px;
  cursor: pointer;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
  background: #f0f2f5;
}
</style>
