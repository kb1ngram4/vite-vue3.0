<template>
  <el-table :data="tableData" border style="width: 100%;" >
    <el-table-column prop="date" label="date" align="center" ></el-table-column>
    <el-table-column prop="name" label="name" align="center"></el-table-column>
    <el-table-column prop="address" label="address" align="center"></el-table-column>
    <el-table-column align="center">
      <template #default="scope">
        <div>
          <el-button type="primary">提交</el-button>
        </div>
      </template>   
    </el-table-column>
  </el-table>
</template>
<script setup lang='ts'>
interface User {
  date: string;
  name: string;
  address: string;
}
const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
</script>
<style scoped></style>