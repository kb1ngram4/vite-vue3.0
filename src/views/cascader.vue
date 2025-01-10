<template>
  <div>
    <el-cascader v-model="selectedOptions" :options="options" :props="cascaderProps" placeholder="请选择" clearable
      :default-checked-keys="treeIds" @change="handleChange" @expand-change="expandChange" />
    <el-button @click="handleSelectAll">全选</el-button>
    <input type="range">
    <a href="tel:+1234567890"> 联系我们 </a>
    <a href="mailto:1318937727@qq.com"> 联系我们 </a>
    <details>
      <summary>点击展开</summary>
      <p>此内容可以展开或折叠。</p>
    </details>
    <p>
      H<sub>2</sub>O
    </p>
  </div>
</template>

<script setup>
import { getChildren, getTree } from '@/api/userApi';
import { ref } from 'vue';
const selectedOptions = ref([]);
const options = ref([]);
const cascaderProps = ref({
  value: 'id',
  label: 'name',
  children: 'children',
  lazy: true,
  multiple: true,
  checkStrictly: true,
  leaf: 'leaf',
  lazyLoad: (node, resolve) => {
    console.log(node);

    if (node.level === 0) {
      fetchParentOptions().then((data) => {
        node.data.children = data;
        console.log(data);

        resolve(data);
      });
    } else {
      fetchChildOptions(node.value).then((data) => {
        node.data.children = data;
        resolve(data);
      });
    }
    // if (!node.children) { return }
  }
});
//展开节点发生变化
const expandChange = (val) => {
  console.log(val);
}

const handleChange = (val) => {
  console.log(val);
};

const handleSelectAll = () => {
  if (!cascaderProps.value.multiple) return;
  console.log(1111111);

  const allOption = { id: 'all', name: '全选', children: [] };
  options.value.unshift(allOption);

  const allData = getAllData();
  selectedOptions.value = allData;

  handleChange(allData, [{ id: 'all', name: '全选' }]);
};

const getAllData = () => {
  console.log('getAllData', options.value);

  let allData = [];
  function fetchData(options) {
    options.forEach(item => {
      allData.push(item.id);
      if (item.children) {
        fetchData(item.children);
      }
    });
  }
  fetchData(options.value);
  return allData;
};

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




</script>