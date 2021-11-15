<template>
  <div>
    <header>
      <el-button @click="manageloginClick">管理员登录</el-button>
      <el-button @click="waiterloginClick">服务员登录</el-button>
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
      this.$router.push('/waiterlogin');
    }
  },
}
</script>

<style scoped>
</style>
