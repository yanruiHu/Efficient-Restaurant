<template>
  <div>
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-container>
        <el-aside width="200px">
          <el-tabs :tab-position="tabPosition" style="height: 200px;" @tab-click="tabEvent">
            <el-tab-pane label="员工管理">员工管理</el-tab-pane>
            <el-tab-pane label="餐厅界面设置" @click="interfaceSettings">
            </el-tab-pane>
            <el-tab-pane label="菜品设置" @click='setupMenu'>菜品设置</el-tab-pane>
            <el-tab-pane label="个人信息" @click='personalInformation'>个人信息</el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ManageHome',
    data() {
      return {
        tabPosition: 'left'
      }
    },
    methods: {
      employeeManagement() {
        this.$router.push('/waiterlist')
      },
      interfaceSettings() {
        this.$router.push('/floorplanbar')
      },
      setupMenu() {
        this.$router.push('/waiterlist')
      },
      personalInformation() {
        this.$router.push('/waiterlist')
      },
      tabEvent(tab){
        if(tab.label==="员工管理"){
          this.employeeManagement()
        }
        else if(tab.label==="餐厅界面设置"){
          this.interfaceSettings()
        }
        else if(tab.label==="菜品设置"){
          this.setupMenu()
        }
        else{
          this.personalInformation()
        }
      }
    },
  }
</script>