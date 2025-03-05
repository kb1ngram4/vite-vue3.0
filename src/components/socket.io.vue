<template>
  <div class="socket">
    <el-button @click="stop" type="primary" >断开连接</el-button>
    <!-- 渲染富文本 -->
     <div>
       <div v-html="renderContent"></div>
     </div>
  </div>
</template>
<script setup >
  import { onMounted } from 'vue'
  import socket from '@/utils/socket'
  import DOMPurify from 'dompurify';
  const htmlStr = '<h2 style=\"text-align: center;\">测试</h2><p style=\"color: red;\" >1.</p><p>2。</p><p>3</p>'
  const renderContent = DOMPurify.sanitize(htmlStr);
  onMounted(() => {
    // socket.on('connect', () => {
    //   console.log('connected')
    // })
    stop()
  })
  const stop = () => {
    socket.disconnect()
  }
</script>
<style scoped lang='scss'>
</style>
