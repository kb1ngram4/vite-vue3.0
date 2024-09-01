<template>
  <el-table :data="tableData" border style="width: 100%;"  >
    <el-table-column v-for="item in  tableTitle" :prop="item.prop" :label="item.label" :align="'center'"  ></el-table-column>\
    <el-table-column align="center" label="操作" v-if="props.operation.length" width="210" >
      <template #default="scope">
          <el-button v-for="_item in props.operation" :type="_item.type" :size="_item.size" @click="handleC(_item,scope.row)" >{{_item.name}}</el-button>
      </template>   
    </el-table-column>
    <template #empty>
      <div>
        暂无数据
      </div>
    </template>
  </el-table>
</template>
<script setup lang='ts'>
import { defineProps,watch,defineEmits } from 'vue'

const props = defineProps(['tableTitle','tableData','operation'])

// 描述tableTitle内部数据  定义类型
interface Title {
  prop:string,
  label:string
}
interface User {
  id:number,
  userName: string
  age:number
  sex:number
  phone:string
  address: string
  role:number
  status:number
}
interface Oper{
  clickType:number
  clickName:string,
  isDel: boolean,
  name:string,
  type:string,
  size: string ,
}
const tableTitle:Title [] = props.tableTitle
let tableData:User[] = props.tableData

const handleC=(item:Oper, val:User)=>{
  item.clickType==1?detail(val):item.clickType==2?edit(val):del(val)
}
const emits = defineEmits(['toDetail','delete'])

const detail=(val:User)=>{
  emits('toDetail',val.id,'详情')

}
const edit=(val:User)=>{}
const del = (val:User)=>{
  emits('delete',val.id)
}
</script>
<style scoped>
/* button:focus{
  outline: none;
} */
</style>