<template>
  <div class="drag-container">
    <!-- 拖拽源区域 -->
    <div class="source-container">
      <div 
        v-for="item in sourceItems" 
        :key="item.id"
        class="drag-item"
        draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragend="handleDragEnd"
      >
        {{ item.name }}
      </div>
    </div>

    <!-- 拖拽目标区域 -->
    <div 
      class="target-container"
      @dragover.prevent
      @drop="handleDrop"
      @dragenter.prevent
      @dragleave="handleDragLeave"
      :class="{ 'drag-over': isDragOver }"
    >
      <template v-if="targetItems.length">
        <div 
          v-for="item in targetItems" 
          :key="item.id"
          class="target-item"
          draggable="true"
          @dragstart="handleDragStart($event, item, true)"
        >
          {{ item.name }}
          <el-icon class="delete-icon" @click="removeItem(item)">
            <Delete />
          </el-icon>
        </div>
      </template>
      <div v-else class="placeholder">
        拖拽项目到这里
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

interface DragItem {
  id: number
  name: string
}

// 源数据
const sourceItems = ref<DragItem[]>([
  { id: 1, name: '项目 1' },
  { id: 2, name: '项目 2' },
  { id: 3, name: '项目 3' },
  { id: 4, name: '项目 4' }
])

// 目标区域数据
const targetItems = ref<DragItem[]>([])

// 拖拽状态
const isDragOver = ref(false)
const currentDragItem = ref<DragItem | null>(null)
const isFromTarget = ref(false)

// 开始拖拽
const handleDragStart = (event: DragEvent, item: DragItem, fromTarget = false) => {
  console.log('handleDragStart', event.dataTransfer, item, fromTarget);
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    currentDragItem.value = item
    isFromTarget.value = fromTarget
  }
}

// 拖拽结束
const handleDragEnd = () => {
  currentDragItem.value = null
  isFromTarget.value = false
}

// 拖拽进入目标区域
const handleDragEnter = () => {
  isDragOver.value = true
}

// 拖拽离开目标区域
const handleDragLeave = () => {
  isDragOver.value = false
}

// 放置到目标区域
const handleDrop = () => {
  isDragOver.value = false
  console.log('handleDrop', currentDragItem.value, isFromTarget.value);
  if (!currentDragItem.value) return
  
  if (!isFromTarget.value) {
    // Check if item already exists
    const exists = targetItems.value.some(item => item.id === currentDragItem.value!.id)
    if (!exists) {
      targetItems.value.push({ ...currentDragItem.value })
    }else{
      console.log('已经存在',exists,currentDragItem.value);
      ElMessage.warning(currentDragItem.value.name + '已经存在')
      
    }
  } else {
    // 在目标区域内部排序
    const index = targetItems.value.findIndex(item => item.id === currentDragItem.value?.id)
    if (index > -1) {
      const [removed] = targetItems.value.splice(index, 1)
      targetItems.value.push(removed)
    }
  }
  
  currentDragItem.value = null
}

// 从目标区域移除
const removeItem = (item: DragItem) => {
  const index = targetItems.value.findIndex(i => i.id === item.id)
  if (index > -1) {
    targetItems.value.splice(index, 1)
  }
}
</script>

<style scoped>
.drag-container {
  display: flex;
  gap: 20px;
  padding: 20px;
}

.source-container,
.target-container {
  flex: 1;
  min-height: 300px;
  padding: 15px;
  border: 2px dashed #dcdfe6;
  border-radius: 4px;
}

.target-container {
  background: #f5f7fa;
}

.target-container.drag-over {
  border-color: #409eff;
  background: #ecf5ff;
}

.drag-item,
.target-item {
  margin: 8px 0;
  padding: 10px;
  background: white;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: move;
  user-select: none;
}

.drag-item:hover,
.target-item:hover {
  border-color: #409eff;
}

.target-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-icon {
  cursor: pointer;
  color: #f56c6c;
}

.delete-icon:hover {
  color: #f89898;
}

.placeholder {
  color: #909399;
  text-align: center;
  padding: 20px;
}
</style> 