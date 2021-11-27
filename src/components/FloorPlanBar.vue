<template>
  <el-tabs :value="position">
    <el-tab-pane label="前台" name="host" v-if="position==='host'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>灰：空闲</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="服务员" name="waiter" v-if="position==='waiter'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>灰：空闲</div>
          <div>蓝：忙碌</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="清洁员" name="busboy" v-if="position==='busboy'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>黄：待清洁</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="经理" name="manager" v-if="position==='manager'">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>灰：空闲</div>
          <div>蓝：忙碌</div>
          <div>黄：待清洁</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
  </el-tabs>
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
      db: '',
      data: ['', '', ''],
      position: '',
    }
  },
  methods: {
    setData(position){
      this.db.collection("floorplan")
        .get()
        .then((res)=>{
          this.data.splice(0, 3, position, res.data[0].row, res.data[0].column)
        })
    }
  },
  mounted() {
    this.db = this.$app.database()
    this.position = JSON.parse(localStorage.getItem('position'))
    this.setData(this.position)
  }
}
</script>

<style scoped>
  .el-aside {
    width: 100px !important;
  }
</style>