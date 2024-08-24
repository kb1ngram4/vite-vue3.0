<template>
  <div>
    <!-- <el-menu background-color="#000" text-color="white" active-text-color="aqua" :default-active="$route.path"
      class="el-menu-vertical-demo" mode="horizontal" unique-opened>
      <Menu :menuList="routes"></Menu>
    </el-menu> -->
    <h1 class="user" @click="getUser">获取用户信息</h1>
    <el-button @click="getJson"  type="primary" >发送json</el-button>
    <el-divider border-style="dashed" />
    <router-link to="/uploadFile">touploadFile</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import routes from '@/router/routes';
import axiosApi from './utils/api';
import { getUserInfoApi } from './api/userApi';
//  const getUser = async ()=> {
//   let data = await axiosApi({
//       url:'/api/userInfo',
//       method:'post',
//       data:{
//         name:'张三',
//         age:'18',
//         sex:'1'
//       }
//     })
//     console.log('data',data);
// }

const getJson = async()=>{
  let jsonData = {
    name: '张三',
    age: '18',
    sex: '1'
  }
  let data = await axiosApi.post('/api/userJson',jsonData)
  console.log(data);
  
}
</script>

<style scoped>
.user {
  cursor: pointer;
}

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
