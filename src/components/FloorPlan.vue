<template>
  <el-container direction="vertical">
    <el-main>
      <el-row v-for="rowIndex in Number(row)" :key="rowIndex"
      type="flex" justify="space-between">
        <el-col v-for="colIndex in Number(column)" :key="colIndex"
        :span="Math.floor(24/column)">
          <Table :restaurant="restaurant" :position="position"
          :tableId="column*(rowIndex-1)+colIndex"></Table>
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
    id: 1,
    restaurant: '',
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
    async saveCurrentData() {
      this.db.collection('floorplan')
        .update({
          row: this.row,
          column: this.column
        })
      this.db.collection('table')
        .where({
          restaurant: this.db.command.eq(this.restaurant),
        })
        .remove()
      for(var i=1;i<=this.row*this.column;i++){
        await this.db.collection('table')
          .add({
            restaurant: this.restaurant,
            table_id: i,
            state: 'info'
        })
      }
      //location.reload()
    },
  },
  mounted() {
    this.db = this.$app.database()
    this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
  }
}
</script>

<style scoped>
  .el-input {
    width: 100px !important;
  }
  .el-row {
    height: 70px;
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