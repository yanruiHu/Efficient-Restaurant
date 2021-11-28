<template>
  <div>
    <header>
      <el-button @click="manageloginClick">管理员登录</el-button>
      <el-button @click="waiterloginClick">员工登录</el-button>
    </header>
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
  header {
    text-align: center;
  }
</style>
