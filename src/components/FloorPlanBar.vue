<template>
  <!-- <el-tabs :value="position">
    <el-tab-pane label="前台" name="host" v-if="position==='host'"> -->
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
    <!-- </el-tab-pane>
    <el-tab-pane label="服务员" name="waiter" v-if="position==='waiter'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <span class="demo-free">空闲</span>
          <span class="demo-busy">用餐中</span>
          <span class="demo-clean">待清洁</span>
          <span class="demo-ontask">有任务</span>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="清洁员" name="busboy" v-if="position==='busboy'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <span class="demo-free">空闲</span>
          <span class="demo-busy">用餐中</span>
          <span class="demo-clean">待清洁</span>
          <span class="demo-ontask">有任务</span>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="经理" name="manager" v-if="position==='manager'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <span class="demo-free">空闲</span>
          <span class="demo-busy">用餐中</span>
          <span class="demo-clean">待清洁</span>
          <span class="demo-ontask">有任务</span>
        </el-aside>
      </el-container>
    </el-tab-pane> -->
  <!-- </el-tabs> -->
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
      // db: '',
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
    // this.$db = this.$app.database()
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
