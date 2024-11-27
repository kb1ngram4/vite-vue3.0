<template>
    <div>
        <el-tree ref="treeRef" node-key="id" style="max-width: 600px" :props="props" :load="loadNode" lazy show-checkbox
            :default-checked-keys="checkedKeys" :default-expanded-keys="expandedKeys" v-model="selectedOptions"
            :getCheckedKeys="getCheckedKeys" :getCurrentKey="getCurrentKey" @check="checkChange" />
    </div>
</template>

<script setup>
import { getChildren, getTree } from '@/api/userApi';
import { ref } from 'vue';
const checkedKeys = ref([]); // 需要回显的选中节点的 key 数组
const expandedKeys = ref([]); // 需要回显的展开节点的 key 数组


const treeRef = ref(null);
const props = {
    id: 'id',
    label: 'name',
    children: 'children',
    // isLeaf: 'leaf',
}
const checkChange = (data, checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) => {
    console.log('checkChange', data, checkedNodes, checkedKeys, treeRef.value);
    // 获取选中的节点
    // const checkedKeys = treeRef.value.getCheckedKeys();
    //   const halfCheckedKeys = treeRef.value.getHalfCheckedKeys();
}
const getCurrentKey = (val) => {
    console.log('getCurrentKey', val);
}
const getCheckedKeys = (val) => {
    console.log('getCheckedKeys', val);
}
const loadNode = (node, resolve) => {

    if (node.level === 0) {
        fetchParentOptions().then((data) => {
            node.data.children = data;
            console.log(data);

            resolve(data);
        });
    } else {
        fetchChildOptions(node.data.id).then((data) => {
            node.data.children = data;
            resolve(data);
        });
    }


}
// 懒加载接口
const fetchParentOptions = () => {
    return new Promise((resolve) => {
        getTree().then((res) => {
            resolve(res)
        })
    });
};

const fetchChildOptions = (parentId) => {
    return new Promise((resolve) => {
        getChildren(parentId).then((res) => {
            resolve(res)
        })
    });
};

// 假设从后端获取的选中和展开节点的 key 数组
const backendCheckedKeys = ['all', '1-1'];
const backendExpandedKeys = ['all'];

// 设置回显
// setTimeout(() => {
checkedKeys.value = backendCheckedKeys;
expandedKeys.value = backendExpandedKeys;
// }, 1000)


</script>