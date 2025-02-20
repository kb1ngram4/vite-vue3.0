<template>
  <div class="task-board">
    <!-- 任务列表 -->
    <div class="task-list">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <div class="task-status">{{ task.status }}</div>
        <div class="task-name">{{ task.name }}</div>
        <div class="task-progress">{{ task.progress }}%</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import WebSocketHeartbeat from '@/utils/websocket'

const tasks = ref([])
let ws = null

onMounted(() => {
  // 初始化WebSocket连接
  ws = new WebSocketHeartbeat({
    
    url: 'ws://localhost:3000',
    pingTimeout: 15000,
    pongTimeout: 10000,
    reconnectTimeout: 2000,
    pingMsg: 'heartbeat',
    repeatLimit: 3
  })

  // 监听消息
  ws.onMessage((data) => {
    console.log('Received message:', data);
    return 
    try {
      const taskData = JSON.parse(data)
      tasks.value = taskData
    } catch (error) {
      console.error('Failed to parse task data:', error)
    }
  })

  // 监听错误
  ws.onError(() => {
    console.error('WebSocket connection error')
  })
})

onUnmounted(() => {
  // 组件销毁时关闭连接
  if (ws) {
    ws.close()
  }
})
</script>

<style  scoped>
.task-board {
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .task-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      
      .task-status {
        width: 80px;
      }
      
      .task-name {
        flex: 1;
      }
      
      .task-progress {
        width: 100px;
        text-align: right;
      }
    }
  }
}
</style> 