<template>
  <div>
    <h2>餐厅管理系统</h2>
    <router-link to='/managelogin'>管理端</router-link>
    <p></p>
    <router-link to='/waiterlogin'>服务端</router-link>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  props: {
    msg: String
  }
}
</script>

<style scoped>
</style>
