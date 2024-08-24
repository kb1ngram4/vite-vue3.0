<template>
    <el-upload v-model:fileList="fileList" :action="url" class="upload-demo" drag multiple
        :before-upload="beforeUpload">
        <el-icon class="el-icon--upload">
            <!-- <upload-filled /> -->
        </el-icon>
        <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
            <div class="el-upload__tip">
                jpg/png files with a size less than 500kb
            </div>
        </template>
    </el-upload>
    <el-button type="primary" >上传</el-button>
</template>

<!-- <script setup lang="ts">
  import { UploadFilled } from '@element-plus/icons-vue'
  </script> -->

<script lang="ts" setup>

import { UploadFile, UploadFiles, UploadRawFile, UploadUserFile } from 'element-plus';
import { ref } from 'vue';
const fileList = ref<UploadUserFile[]>([])
const props = defineProps(['url'])

const beforeUpload = (rawFile: UploadRawFile) => {
    console.log(rawFile);

}
</script>
<style></style>