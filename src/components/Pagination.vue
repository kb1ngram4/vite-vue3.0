<template>
    <div class="page">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[100,200,300,400]"
            :size="size"
            :disabled="disabeld"
            layout="total,sizes,prev,pager,next,jumper"
            :total="400"
        ></el-pagination>
    </div>
</template>
<script setup lang="ts" >
import type { ComponentSize } from 'element-plus';
import { ref } from 'vue';

    const currentPage = ref(1)
    const pageSize = ref(100)
    const size = ref<ComponentSize>('default')
    const disabeld = ref(false)
</script>
<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.page{
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: center;
    align-items: center;
}
</style>