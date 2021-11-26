<template>
  <el-container direction="vertical">
    <el-main>
      <el-row v-for="index in Number(row)" :key="index"
      type="flex" justify="space-between">
        <el-col v-for="index in Number(column)" :key="index"
        :span="Math.floor(24/column)">
          <Table :position="position"></Table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer v-if="position === 'manager'">
      <el-input type="number" size="small"
      v-model="row" placeholder="行数">
      </el-input>
      <el-input type="number" size="small" max="24"
      v-model="column" placeholder="列数">
      </el-input>
      <el-button type="primary" size="small" 
      @click="saveCurrentData">确认
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>
import Table from './Table.vue'
export default {
  components: { Table },
  name: 'FloorPlan',
  data() {
   return {
    db: '',
    position: '',
    row: '',
    column: '',
   }
  },
  watch: {
    currentData(){
      this.position = this.currentData[0]
      this.row = this.currentData[1]
      this.column = this.currentData[2]
    }
  },
  props: {
    currentData: Array
  },
  methods: {
    saveCurrentData() {
      this.db.collection('floorplan')
        .update({
          row: this.row,
          column: this.column
        })
    }
  },
  mounted() {
    this.db = this.$app.database()
  }
}
</script>

<style scoped>
  .el-input {
    width: 100px !important;
  }
  .el-row {
    height: 60px;
  }
  .el-col {
    text-align: center;
  }
  .el-footer {
    text-align: center;
  }
  .el-input {
    margin-right: 20px;
  }
</style>