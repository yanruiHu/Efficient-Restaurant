<template>
  <el-tabs @tab-click="setRole">
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
          <FloorPlan :currentData="['manager', row, column]" @changeRowAndColumn="changeData"></FloorPlan>
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

export default {
  components: {
    FloorPlan
  },
  data() {
    return {
      role: '',
      row: '',
      column: '',
      data: ['','','']
    }
  },
  methods: {
    setRole(tab){
      this.data.slice(0, 1, tab.name)
    },
    changeData(data) {
      this.data.splice(1, 2, data[0], data[1])
    }
  }
}
</script>