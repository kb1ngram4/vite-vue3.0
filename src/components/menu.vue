<template>
    <template v-for="item in menuList" :key="item.path">
      <!-- 多个子路由 -->
      <el-sub-menu :index="item.path" v-if="item.children" >
        <template #title v-if="item.meta.show">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 递归展示子路由 -->
        <Menu :menuList="item.children"></Menu>
      </el-sub-menu>
      <!-- 没有子路由 -->
      <template v-else>
        <el-menu-item :index="item.path" v-if="item.meta.show" @click="goRoute">
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span>{{ item.meta.title }}</span>
          </template>
        </el-menu-item>
      </template>
      
    </template>
  </template>
  
  
  
  <script setup lang="ts" >
  import {useRouter} from 'vue-router'
  defineProps(["menuList"]);
  let $router = useRouter()
  const goRoute = (vc:any) => {
    console.log('123',vc);
    $router.push(vc.index)
  }
  </script>
  