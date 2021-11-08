<template>
  <div>
    <button @click="manageloginClick">管理员登录</button>
    <button @click="waiterloginClick">服务员登录</button>
    <p></p>
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
