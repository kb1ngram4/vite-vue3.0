<template>
  <div class="home" @click="routeC">
    <tableCom :datas="data" :operation="operation"></tableCom>
    <pagination></pagination>
    <!-- <Cube /> -->
  </div>
</template>
<script lang="ts" setup>
// import Cube from '@/components/cube.vue';
import router from '@/router';
import { reactive,ref } from 'vue';
const demo = ref('demo')

// 计算数组中最大数值

let array = [12,23,7,6,5,100,111]
function maxVal(arr:Array<number>) {
  return Math.max.apply(Math,arr)
}
maxVal(array)

const routeC=()=>{
  router.push('/tableCar')
}
const data = reactive({
  tableTitle: [
    { prop: 'userName', label: '用户名称' },
    { prop: 'phone', label: '联系电话' },
    { prop: 'sex', label: '性别' },
    { prop: 'address', label: '地址' },
    { prop: 'status', label: '状态' },

  ],
  tableData: [
    {
      userName: "Tom",
      phone: '17756767654',
      sex: 1,
      address: "No. 189, Grove St, Los Angeles",
      status: 1
    },
  ]


})
const operation = reactive(
  [
    {
      clickType:1,
      clickName:'detail',
      isDetail: true,
      name:'详情',
      type:'primary',
      size: 'small',
    },
    {
      clickType:2,
      clickName:'edit',
      isEdit: true,
      name:'编辑',
      type:'info',
      size: 'small',
    },
    {
      clickType:3,
      clickName:'del',
      isDel: true,
      name:'删除',
      type:'danger',
      size: 'small',
    },
  ]
)
</script>
<style scoped>
</style>