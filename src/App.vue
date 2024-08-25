<template>
  <div>
    <!-- <el-menu background-color="#000" text-color="white" active-text-color="aqua" :default-active="$route.path"
      class="el-menu-vertical-demo" mode="horizontal" unique-opened>
      <Menu :menuList="routes"></Menu>
    </el-menu> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
