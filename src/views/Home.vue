<template>
  <div class="home" @click="routeC">
    <tableCom v-if="dataReady" :tableData="tableData" :tableTitle="tableTitle" :operation="operation"></tableCom>
    <pagination></pagination>
    <!-- <Cube /> -->
  </div>
</template>
<script lang="ts" setup>
// import Cube from '@/components/cube.vue';
import { getUserInfoApi } from '@/api/userApi';
import router from '@/router';
import { onBeforeMount, onMounted, reactive, Ref, ref } from 'vue';
// const demo = ref('demo')

// 计算数组中最大数值

let array = [12, 23, 7, 6, 5, 100, 111]
// function maxVal(arr: Array<number>) {
//   return Math.max.apply(Math, arr)
// }
// maxVal(array)
const tableTitle= reactive(
  [
    { prop: 'username', label: '用户名称' },
    { prop: 'age', label: '年龄' },
    { prop: 'sex', label: '性别' },
    { prop: 'phone', label: '联系电话' },
    { prop: 'address', label: '地址' },
    { prop: 'role', label: '角色' },
    { prop: 'status', label: '状态' },

  ]


)
let tableData:[] = []
onBeforeMount(async()=>{
  getUser()
})

let dataReady:Ref<boolean> = ref(false)
const getUser = async () => {

let obj = {
  name: '张三',
  age: '19',
  sex: '1'
}
let body = await getUserInfoApi(obj)
console.log('data',body);
 tableData = body.data
 dataReady.value = true
console.log(tableData);


}

const routeC = () => {
  router.push('/tableCar')
}

const operation = reactive(
  [
    {
      clickType: 1,
      clickName: 'detail',
      isDetail: true,
      name: '详情',
      type: 'primary',
      size: 'small',
    },
    {
      clickType: 2,
      clickName: 'edit',
      isEdit: true,
      name: '编辑',
      type: 'info',
      size: 'small',
    },
    {
      clickType: 3,
      clickName: 'del',
      isDel: true,
      name: '删除',
      type: 'danger',
      size: 'small',
    },
  ]
)
</script>
<style scoped></style>