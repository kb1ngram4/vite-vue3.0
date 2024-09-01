<template>
    <div class="add_table">
        <el-dialog v-model="isDialog.value" :title="title" width="50%"  @close="resetForm(ruleFormRef)" :rules="rules" align="left" >
            <el-form label-width="90px" :model="form" v-model="form" label-position="right" ref="ruleFormRef" >
                <el-row :gutter="10">
                    <el-col :span="12" >
                        <el-form-item label="用户名：" prop="username" >
                            <el-input v-model="form.username" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="年龄：">
                            <el-input v-model="form.age" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="性别：">
                            <el-input v-model="form.sex" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="联系电话：">
                            <el-input v-model="form.phone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="地址：">
                            <el-input v-model="form.address" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="角色：">
                            <el-select placeholder="请选择角色" v-model="form.role" >
                                <el-option v-for="item in roleList" :value="item.value" :label="item.label" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"  >
                        <el-form-item label="状态：">
                            <el-input v-model="form.status" ></el-input>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <template #footer >
                <div class="btn" v-show="title!=='详情'">
                    <el-button @click="resetForm(ruleFormRef)" >取消</el-button>    
                    <el-button @click="submit" >提交</el-button>    
                </div>
            </template>
        </el-dialog>
    </div>
</template>
<script lang="ts" setup>
import { FormInstance, FormRules } from 'element-plus';
import {onMounted, reactive, Ref, ref,watch } from 'vue';
const props = defineProps(['isShow','title','detailForm'])
const emits = defineEmits(['closeAdd'])
const ruleFormRef = ref<FormInstance>()
 let isDialog = reactive({value:false})
 let title = ref('新增')
 let form = reactive({
    username:'',
    age:'',
    sex:'',
    phone:'',
    address:'',
    role:'',
    status:''

 })
 const  rules = reactive<FormRules> ({
    
 })

 onMounted(() => {
    console.log(111111111111111);
    
    console.log(form);
    
 })
 watch(
    ()=>props.isShow,(val:any)=>{
        isDialog.value = val
    },{immediate:true},

)
watch(
    ()=>props.detailForm,(val)=>{
        form = val
        console.log(form);
        
    },{immediate:true}
)
watch(
    ()=>props.title,(val)=>{
        title = val
    }
)
 const roleList = reactive([
    {label:'超管',value:0},
    {label:'管理员',value:1},
    {label:'员工',value:2},
 ])
 const resetForm = (formEl:FormInstance | undefined)=>{
    console.log(formEl);
    
    formEl?.resetFields()
    isDialog.value = false
    emits('closeAdd',false)
    
 }
 const submit = ()=>{
    isDialog.value= false
    emits('closeAdd',false,form)
    
 }
</script>
<style scoped >
.btn{
    display: flex;
    justify-content: center;
    align-items: center
}
</style>