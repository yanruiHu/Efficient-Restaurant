<template>
  <el-container direction="vertical">
    <el-main>
      <el-row type="flex" justify="start"
      v-for="rowIndex in Number(row)" :key="rowIndex" >
        <el-col v-for="colIndex in Number(column)" :key="colIndex">
          <Table :restaurant="restaurant" 
          :position="position"
          :tableId="column*(rowIndex-1)+colIndex" :busboyAccounts="busboyAccounts"
          :waiterAccounts="waiterAccounts">
          </Table>
        </el-col>
      </el-row>
    </el-main>
    <el-footer v-if="position === 'manager'">
      <el-select v-model="row" placeholder="行数">
        <el-option v-for="num in Number(12)" 
        :key="num" :value="num" :label="num">
        </el-option>
      </el-select>
      <el-select v-model="column" placeholder="列数">
        <el-option v-for="num in Number(12)" 
        :key="num" :value="num" :label="num">
        </el-option>
      </el-select>
      <el-button type="primary" size="small" 
      @click="saveCurrentData()">确认
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
    position: '',
    row: '',
    column: '',
    restaurant: '',
    busboyAccounts: [],
    waiterAccounts: []
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
      this.$db.collection('floorplan')
        .update({
          row: this.row,
          column: this.column
        })
      this.$db.collection('table')
        .where({
          restaurant: this.$db.command.eq(this.restaurant),
        })
        .remove()
      for(var i=1;i<=this.row*this.column;i++){
        this.$db.collection('table')
          .add({
            restaurant: this.restaurant,
            table_id: i,
            state: 'info',
            on_task: ''
        })
      }
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
  },
  mounted() {
    this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
    this.$db.collection('staff')
      .where({
        restaurant: this.restaurant,
        position: 'busboy'
      })
      .get()
      .then((res) => {
        for(var i in res.data){
          this.busboyAccounts.push(res.data[i].account)
        }
      })
    this.$db.collection('staff')
      .where({
        restaurant: this.restaurant,
        position: 'waiter'
      })
      .get()
      .then((res) => {
        for(var i in res.data){
          this.waiterAccounts.push(res.data[i].account)
        }
      })
  }
}
</script>

<style scoped>
  .el-select {
    width: 100px !important;
    margin-right: 20px;
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
</style>
