<template>
  <div id='app' class='front'>
    <header>
      <h2>欢迎来到餐厅管理系统</h2>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App',
  }
</script>

<style scoped>
  header {
    text-align: center;
  }

</style>