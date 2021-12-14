<template>
  <div>
    <div id='app' class='front'>
      <header>
        <h2>欢迎来到餐厅管理系统</h2>
      </header>
      <router-view></router-view>
    </div>
    <div class='background'>
      <img src="" width="100%" height="100%" alt="">
    </div>
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

  .background {
    width: 100%;
    height: 100%;
    /**宽高100%是为了图片铺满屏幕 */
    z-index: -1;
    position: absolute;
  }

  .front {
    z-index: 1;
    position: absolute;
  }
</style>