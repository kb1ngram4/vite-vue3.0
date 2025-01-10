<template>
  <div class="worker-demo">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>Web Worker Demo</span>
        </div>
      </template>
      
      <div class="demo-section">
        <h3>耗时计算示例</h3>
        <el-input-number v-model="calculateNum" :min="1" :max="100000000" />
        <el-button type="primary" @click="startCalculate" :loading="calculating">
          开始计算
        </el-button>
        <div class="result" v-if="calculateResult !== null">
          计算结果: {{ calculateResult }}
        </div>
      </div>

      <div class="demo-section">
        <h3>大数据排序示例</h3>
        <el-input-number v-model="arrayLength" :min="1000" :max="1000000" />
        <el-button type="primary" @click="startSort" :loading="sorting">
          开始排序
        </el-button>
        <div class="result" v-if="sortResult.length">
          已排序 {{ sortResult.length }} 个数字
          <el-button type="text" @click="showSortResult = !showSortResult">
            {{ showSortResult ? '隐藏' : '显示' }}结果
          </el-button>
          <div v-if="showSortResult" class="sort-result">
            {{ sortResult.join(', ') }}
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 创建 Worker 实例
const worker = new Worker(new URL('../worker.ts', import.meta.url))

// 计算相关
const calculateNum = ref(10000000)
const calculating = ref(false)
const calculateResult = ref<number | null>(null)

// 排序相关
const arrayLength = ref(10000)
const sorting = ref(false)
const sortResult = ref<number[]>([])
const showSortResult = ref(false)

// 监听 Worker 消息
worker.onmessage = (event) => {
  const { type, data } = event.data
  
  switch (type) {
    case 'calculate_result':
      calculateResult.value = data
      calculating.value = false
      break
      
    case 'sort_result':
      sortResult.value = data
      sorting.value = false
      break
  }
}

// 开始计算
const startCalculate = () => {
  calculating.value = true
  calculateResult.value = null
  worker.postMessage({ 
    type: 'calculate', 
    data: calculateNum.value 
  })
}

// 开始排序
const startSort = () => {
  sorting.value = true
  sortResult.value = []
  // 生成随机数组
  const arr = Array.from(
    { length: arrayLength.value }, 
    () => Math.floor(Math.random() * arrayLength.value)
  )
  worker.postMessage({ 
    type: 'sort', 
    data: arr 
  })
}
</script>

<style scoped>
.worker-demo {
  padding: 20px;
}

.demo-section {
  margin-bottom: 20px;
}

.demo-section h3 {
  margin-bottom: 15px;
}

.el-input-number {
  margin-right: 15px;
}

.result {
  margin-top: 15px;
}

.sort-result {
  margin-top: 10px;
  padding: 10px;
  background: #f5f7fa;
  border-radius: 4px;
  max-height: 200px;
  overflow: auto;
}
</style> 