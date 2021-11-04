<template>
  <div>
    <h2>欢迎来到餐厅管理系统</h2>
    <button @click="manageloginClick">管理员登录</button>
    <button @click="waiterloginClick">服务员登录</button>
    <p></p>
    <router-view></router-view>
    <p></p>
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
