<template>
  <div class="home">
    <el-form inline>
      <el-row >
        <el-col :span="6">
          <el-form-item label="用户名:">
            <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="年龄:">
            <el-input v-model="searchForm.age" placeholder="请输入年龄" ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="角色:">
            <el-select v-model="searchForm.role" style="width: 240px" placeholder="请选择角色">
              <el-option v-for="item in roleList" :label="item.label" :value="item.value" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button type="warning" @click="reset" >重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="addIcon">
      <el-button :icon="Plus" type="primary" @click="handleAdd" >新增</el-button>
    </div>
    <tableCom 
      v-if="dataReady" 
      :tableData="tableData" 
      :tableTitle="tableTitle" 
      :operation="operation"
      @toDetail="toDetail"
      @delete="deleteUser"
      ></tableCom>
    <pagination></pagination>
    <!-- <Cube /> -->
     <!-- <add :isShow="isshowDialog" ></add> -->
      <add-user-table :isShow="showDialog.value" @closeAdd="close" :title="title" :detailForm="detailForm"  ></add-user-table>
  </div>
</template>
<script lang="ts" setup>
import AddUserTable from '@/components/userTable/AddUserTable.vue';
import { addUserApi, deleteUserApi, getUserInfoApi, getUserListApi } from '@/api/userApi';
import { onBeforeMount, reactive, Ref, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'

let searchForm = reactive({
  username: '',
  age: '',
  role: '',
  page:'',
  pageSize:''
})
interface DetailForm {
  username:string,
  age:number,
  sex:any,
  phone:number,
  address:string,
  role:any,
  status:number
}

let detailForm:DetailForm
const roleList = ref([
  { value:0, label:'超管' },
  { value:1, label:'管理员' },
  { value:2, label:'员工' }
])

let showDialog = reactive({value:false})
let title = ref('新增')
const tableTitle = reactive(
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
let tableData: [] = []
onBeforeMount(async () => {
  console.log('2222222');
  
  showDialog.value = false
  getUser()
  
})
interface itemObj  {
  sex:any,
  role:any
}
let dataReady: Ref<boolean> = ref(false)
const getUser = async () => {
  dataReady.value = false
  let body = await getUserListApi(searchForm)
  tableData = body.data
  tableData.map((item:itemObj,index)=>{
    item.sex==1?item.sex='男':item.sex='女'
    item.role == 0? item.role='超管':item.role==1? item.role = '管理员':item.role='员工'
  })
  dataReady.value = true
}
const search = () => {
  getUser()
}

const reset = () => {
  searchForm.age = ''
  searchForm.role = ''
  searchForm.username = ''
  getUser()
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

const handleAdd = ()=>{
  showDialog.value = true
  title.value = '新增'
}
const close = async (val:any,item:object)=>{

  if(item){
    let data = await addUserApi(item)
    console.log(data);
    
    if(data.code == 200){
      console.log('新增成功');
      showDialog.value = val

      getUser()
      
    }
  }else{
    showDialog.value = val
  }
  
  
  
  
}

const toDetail = async (val:number,tName:string)=>{
  let res = await getUserInfoApi(val)
   detailForm = res.data
  detailForm.sex==1?detailForm.sex='男':detailForm.sex='女'
  detailForm.role == 0? detailForm.role='超管':detailForm.role==1? detailForm.role = '管理员':detailForm.role='员工'
  title.value = tName
  showDialog.value = true
  
}
const deleteUser = async(val:number)=>{
  let res =  await deleteUserApi({id:val})
  console.log(res);
  

  getUser()
}
</script>
<style scoped>
.addIcon{
  display: flex;
  margin-bottom: 10px;
}
</style>