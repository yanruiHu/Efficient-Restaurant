<template>
  <el-tabs type="card" value="2" :stretch="true">
    <el-tab-pane label="经理登录" name="1">
      <Managelogin></Managelogin>
    </el-tab-pane>
    <el-tab-pane label="员工登录" name="2">
      <Stafflogin></Stafflogin>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Managelogin from './Managelogin.vue'
import Stafflogin from './Stafflogin.vue'
export default {
  name: 'Welcome',
  props: {
    msg: String
  },
  components: {
    Managelogin,
    Stafflogin
  },
  methods: {
    manageloginClick() {
      this.$router.push('/managelogin');
    },
    waiterloginClick() {
      this.$router.push('/stafflogin');
    }
  },
}
</script>

<style scoped>
  .el-tabs {
    width: 350px;
    height: 300px;
    background-color: white;
    opacity: 0.95;
    border: 0;
    border-radius: 20px;
  }
  .el-tabs >>> .el-tabs__header {
    margin-bottom: 5px;
  }
  .el-tabs >>> .el-tabs__header .el-tabs__nav {
    border: 0;
    border-radius: 20px 20px 0 0;
    background-color: bisque;
  }
  .el-tabs >>> .el-tabs__header .is-active#tab-1 {
    border: 0;
    background-color: white;
    border-radius: 20px 0 0 0;
  }
  .el-tabs >>> .el-tabs__header .is-active#tab-2 {
    border: 0;
    background-color: white;
    border-radius: 0 20px 0 0;
  }
</style>
