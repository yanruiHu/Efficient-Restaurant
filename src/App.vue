<template>
  <div id='app'>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style scoped>
  #app {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url(./pics/welcome.jpg);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
</style>
