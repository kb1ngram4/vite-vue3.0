<template>
  <div class="home">
    <ComSearchForm :searchConfig="searchConfig" @search="search" @reset="reset"></ComSearchForm>
    <!-- <h1 class="shark-txt">asdlsadlsadjaldjaldjaldjsaldsajldjaldaj</h1> -->
    <div class="addIcon">
      <el-button :icon="Plus" type="primary" @click="handleAdd">新增</el-button>
    </div>
    <tableCom v-if="dataReady" :tableData="tableData" :tableTitle="tableTitle" :operation="operation"
      @toDetail="toDetail" @delete="deleteUser"></tableCom>
    <pagination></pagination>
    <el-button @click="$router.push('/cascader')">级联懒加载</el-button>
    <el-button @click="$router.push('/tree')" to="/tree">tree懒加载</el-button>
    <!-- <Cube /> -->
    <!-- <add :isShow="isshowDialog" ></add> -->
    <add-user-table :isShow="showDialog.value" @closeAdd="close" :title="title"
      :detailForm="detailForm"></add-user-table>
  </div>
</template>
<script lang="ts" setup>
import AddUserTable from '@/components/userTable/AddUserTable.vue';
import { addUserApi, deleteUserApi, getUserInfoApi, getUserListApi } from '@/api/userApi';
import { onBeforeMount, reactive, Ref, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'

const roleList = ref([
  { value: 0, label: '超管' },
  { value: 1, label: '管理员' },
  { value: 2, label: '员工' }
])

let searchForm = reactive({
  username: '',
  age: '',
  role: '',
  page: 1,
  pageSize: 10
})

const searchConfig = reactive([
  { label: '用户名', field: 'username', type: 'input', placeholder: '请输入用户名' },
  { label: '年龄', field: 'age', type: 'input', placeholder: '请输入年龄' },
  { label: '角色', field: 'role', type: 'select', placeholder: '请选择角色', options: roleList.value }
])

interface DetailForm {
  username: string,
  age: number,
  sex: any,
  phone: number,
  address: string,
  role: any,
  status: number
}

let detailForm: DetailForm
let showDialog = reactive({ value: false })
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
  showDialog.value = false
  getUser()

})
interface itemObj {
  sex: any,
  role: any,
  status: any
}
let dataReady: Ref<boolean> = ref(false)
const getUser = async () => {
  dataReady.value = false
  let body = await getUserListApi(searchForm)
  tableData = body.data
  tableData.map((item: itemObj, index) => {
    item.sex == 1 ? item.sex = '男' : item.sex = '女'
    item.status == 1 ? item.status = '在职' : item.status = '调休'
    item.role == 0 ? item.role = '超管' : item.role == 1 ? item.role = '管理员' : item.role = '员工'
  })
  dataReady.value = true
}
const search = (form: any) => {
  Object.assign(searchForm, form)
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

const handleAdd = () => {
  title.value = '新增'
  showDialog.value = true

}
const close = async (val: any, item: object) => {
  console.log(item);


  if (item) {
    let data = await addUserApi(item)
    console.log(data);

    if (data.code == 200) {
      console.log('新增成功');
      showDialog.value = val

      getUser()

    }
  } else {
    showDialog.value = val
  }




}

const toDetail = async (val: number, tName: string) => {
  let res = await getUserInfoApi(val)
  detailForm = res.data
  title.value = tName
  showDialog.value = true

}
const deleteUser = async (val: number) => {
  let res = await deleteUserApi({ id: val })
  console.log(res);


  getUser()
}
</script>
<style scoped>
.addIcon {
  display: flex;
  margin-bottom: 10px;
}

.shark-txt {
  background: hotpink linear-gradient(to left, transparent, #fff, transparent) no-repeat 0 0;
  background-size: 20% 100%;
  background-position: 0 0;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: shark-txt 3s infinite;
}

@keyframes shark-txt {
  from {
    background-position: -100%;
  }

  to {
    background-position: 200%;
  }
}
</style>