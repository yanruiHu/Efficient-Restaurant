<template>
  <div id='app'>
    <Welcome />
    <FloorPlanBar />
  </div>
</template>

<script>
import FloorPlanBar from './components/FloorPlanBar.vue'
import Welcome from './components/Welcome.vue'

export default {
  name: 'App',
  components: {

    Welcome,
    FloorPlanBar
  },
  data() {
    return {
      ms: "hello"
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
