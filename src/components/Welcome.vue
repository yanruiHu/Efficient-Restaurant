<template>
  <div>
    <h1>欢迎来到高效餐厅</h1>
    <el-button @click="manageloginClick">
      管理员登录
    </el-button>
    <el-button @click="waiterloginClick">
      员工登录
    </el-button>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
  props: {
    msg: String
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
  div {
    width: 40%;
    height: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: white;
    opacity: 0.95;
    border-radius: 20px;
  }
  .el-button {
    width: 120px;
    margin: 0 0 20px 0 !important;
  }
</style>
