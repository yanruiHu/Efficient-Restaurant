<template>
  <div>
    <template>
      <el-table
        :data="staffData"
        style="width: 100%">
        <el-table-column
          prop="position"
          label="职位"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="right"
          label="权限">
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'StaffList',
    props: {
      restaurant: String,
      staffData: Array
    },
    data() {
      return {
        
      }
    },
    mounted() {
    },
  }
</script>