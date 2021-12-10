<template>
  <el-container direction="horizontal">
    <el-main>
      <FloorPlan :currentData="data"></FloorPlan>
    </el-main>
    <el-aside>
      <span class="demo-free">空闲</span>
      <span class="demo-busy">用餐中</span>
      <span class="demo-clean">待清洁</span>
      <span class="demo-ontask">任务</span>
    </el-aside>
  </el-container>
</template>

<script>
import FloorPlan from './FloorPlan.vue'

export default {
  name: 'FloorPlanBar',
  components: {
    FloorPlan
  },
  data() {
    return {
      data: ['', '', ''],
      position: '',
    }
  },
  methods: {
    setData(position){
      this.$db.collection("floorplan")
        .get()
        .then((res)=>{
          this.data.splice(0, 3, position, res.data[0].row, res.data[0].column)
        })
    }
  },
  mounted() {
    this.position = JSON.parse(localStorage.getItem('position'))
    this.setData(this.position)
  }
}
</script>

<style scoped>
  .el-aside {
    display: flex;
    flex-flow: column;
    width: 110px !important;
  }
  .demo-free {
    width: 50px;
    height: 50px;
    background-color: #f4f4f5;
  }
  .demo-busy {
    width: 50px;
    height: 50px;
    background-color: #409EFF;
  }
  .demo-clean {
    width: 50px;
    height: 50px;
    background-color: #E6A23C;
  }
  .demo-ontask {
    width: 50px;
    height: 50px;
    background-color: #F56C6C;
  }
  span {
    border: 1.5px solid dimgray;
    border-radius: 20px;
    font-size: 15px;
    text-align: center;
    line-height: 50px;
    margin: 30px auto 0;
  }
</style>
