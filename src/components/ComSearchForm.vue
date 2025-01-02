<template>
  <el-form inline>
    <el-row>
      <el-col :span="6" v-for="(item, index) in searchConfig" :key="index">
        <el-form-item :label="item.label + ':'">
          <!-- Input输入框 -->
          <el-input v-if="item.type === 'input'" v-model="searchForm[item.field]"
            :placeholder="item.placeholder"></el-input>

          <!-- Select选择框 -->
          <el-select v-if="item.type === 'select'" v-model="searchForm[item.field]" :placeholder="item.placeholder"
            style="width: 240px">
            <el-option v-for="option in item.options" :key="option.value" :label="option.label"
              :value="option.value"></el-option>
          </el-select>

          <!-- 日期选择器 -->
          <el-date-picker v-if="item.type === 'date'" v-model="searchForm[item.field]" :type="item.dateType || 'date'"
            :placeholder="item.placeholder"></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button type="warning" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

// 定义props类型
interface SearchConfigItem {
  label: string
  field: string
  type: 'input' | 'select' | 'date'
  placeholder?: string
  options?: Array<{ value: any, label: string }>
  dateType?: string
}

// 组件props定义
const props = defineProps<{
  searchConfig: SearchConfigItem[] // 搜索配置项
}>()

// 组件emits定义
const emits = defineEmits(['search', 'reset'])

// 搜索表单数据
const searchForm = reactive<Record<string, any>>({})

// 查询方法
const handleSearch = () => {
  emits('search', searchForm)
}

// 重置方法
const handleReset = () => {
  // 重置表单数据
  Object.keys(searchForm).forEach(key => {
    searchForm[key] = ''
  })
  emits('reset')
}
</script>

<style scoped>
.el-form {
  width: 100%;
}
</style>
