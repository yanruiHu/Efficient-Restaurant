<template>
  <el-tabs @tab-click="setData">
    <el-tab-pane label="前台" name="host">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>绿：空闲</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="服务员" name="waiter">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>绿：空闲</div>
          <div>红：忙碌</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="清洁员" name="busboy">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>黄：待清洁</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
    <el-tab-pane label="经理" name="manager">
      <el-container>
        <el-main>
          <FloorPlan :currentData="data"></FloorPlan>
        </el-main>
        <el-aside>
          <div>绿：空闲</div>
          <div>红：忙碌</div>
          <div>黄：待清洁</div>
        </el-aside>
      </el-container>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import FloorPlan from './FloorPlan.vue'
// var db = this.connectDatabase.database()

export default {
  components: {
    FloorPlan
  },
  data() {
    return {
      db: '',
      data: ['', '', '']
    }
  },
  methods: {
    setData(tab){
      var db_data = []
      this.db.collection("floorplan")
        .get()
        .then((res)=>{
          db_data[0] = res.data[0].row
          db_data[1] = res.data[0].column
          this.data.splice(0, 3, tab.name, db_data[0], db_data[1])
        })
    }
  },
  mounted() {
    this.db = this.$app.database()
  }
}

</script>