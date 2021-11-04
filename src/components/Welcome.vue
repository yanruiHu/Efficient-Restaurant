<template>
  <div>
    <button @click="manageloginClick">管理员登录</button>
    <button @click="waiterloginClick">服务员登录</button>
    <h2>欢迎来到餐厅管理系统</h2>
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
      this.$router.replace('/managelogin');
    },
    waiterloginClick() {
      this.$router.push('/waiterlogin');
    }
  },
}
</script>

<style scoped>
</style>
