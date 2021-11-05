<template>
  <div>
    <div>
      <button @click="employeeManagement">员工管理</button>
      <p></p>
      <button @click="interfaceSettings">餐厅界面设置</button>
      <p></p>
      <button @click='setupMenu'>菜品设置</button>
      <p></p>
      <button @click='personalInformation'>个人信息</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ManageHome',
    methods: {
      employeeManagement() {
        
      },
      interfaceSettings() {
        this.$router.push('/floorplanbar')
      },
      setupMenu() {

      },
      personalInformation() {

      }
    },
  }
</script>