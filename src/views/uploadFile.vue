<template>
  <Upload :url="'/api/file/upload'"></Upload>

  <h3 class="upbtn" @click="handleUpload">下载</h3>
  <ComEditor />
</template>
<script lang="ts" setup>
import axiosApi from '@/utils/api';

const handleUpload = () => {
  axiosApi.get('/api/getFile')
    .then(res => {
      console.log('下载文件', res);

    })
}
</script>
<style>
.upbtn {
  cursor: pointer;
}
</style>