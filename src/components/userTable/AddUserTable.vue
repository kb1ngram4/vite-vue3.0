<template>
    <div class="add_table">
        <el-dialog v-model="isDialog.value" :title="title" width="50%"  @close="resetForm(ruleFormRef)" :rules="rules" align="left" >
            <el-form label-width="90px" :model="form" v-model="form" label-position="right" ref="ruleFormRef" >
                <el-row :gutter="10">
                    <el-col :span="12" >
                        <el-form-item  label="用户名：" prop="username" >
                            <el-input :disabled="isDisable" v-model="form.username" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="年龄：" prop="age" >
                            <el-input :disabled="isDisable" v-model="form.age" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="性别：" prop="sex" >
                            <!-- <el-input v-model="form.sex" v-if="title=='详情'" ></el-input> -->
                            <el-select :disabled="isDisable" v-model="form.sex" placeholder="请选择性别" >
                                <el-option :value="0" :label="'女'" ></el-option>
                                <el-option :value="1" :label="'男'" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="联系电话：" prop="phone" >
                            <el-input :disabled="isDisable" v-model="form.phone" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="地址：" prop="address" >
                            <el-input :disabled="isDisable" v-model="form.address" ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                        <el-form-item label="角色：" prop="role" >
                            <el-select :disabled="isDisable" placeholder="请选择角色" v-model="form.role" >
                                <el-option v-for="item in roleList" :value="item.value" :label="item.label" ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12"  >
                        <el-form-item label="状态：" prop="status" >
                            <!-- <el-input v-model="form.status" v-if="title=='详情'" ></el-input> -->
                            <el-select :disabled="isDisable" v-model="form.status" placeholder="请选择状态" >
                                <el-option :value="0" label="在职" ></el-option>
                                <el-option :value="1" label="调休" ></el-option>
                            </el-select>
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
import {computed, onMounted, reactive, Ref, ref,watch } from 'vue';
const props = defineProps(['isShow','title','detailForm'])
const emits = defineEmits(['closeAdd'])
const ruleFormRef = ref<FormInstance>()
 let isDialog = reactive({value:false})
 let title = ''
 let form = ref({
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

 const isDisable = computed(()=>{
    return props.title=='详情'?true:false
 })

 watch(
    ()=>props.isShow,(val:any)=>{
        isDialog.value = val
    },{immediate:true},

)
watch(
    ()=>props.detailForm,(val)=>{
        if(props.title =='新增'){
            return
        }
        form.value = JSON.parse(JSON.stringify(val))
        console.log(form);
        
    },{immediate:true}
)
watch(
    ()=>props.title,(val)=>{
        val=='新增'?form.value = JSON.parse(JSON.stringify({})):''
        title = val
    }
)
 const roleList = reactive([
    {label:'超管',value:0},
    {label:'管理员',value:1},
    {label:'员工',value:2},
 ])
 const resetForm = (formEl:FormInstance | undefined)=>{
    form.value = JSON.parse(JSON.stringify({}))
    formEl?.resetFields()
    isDialog.value = false
    emits('closeAdd',false)
    
 }
 const submit = ()=>{
    isDialog.value= false
    console.log(form.value);
    emits('closeAdd',false,form.value)
    
 }
</script>
<style scoped >
.btn{
    display: flex;
    justify-content: center;
    align-items: center
}
</style>