<template>
  <el-container direction="vertical">
    <el-main>
      <table ref="table" border="1"></table>
    </el-main>
    <el-footer v-if="this.currentData[0] === 'manager'">
      <el-input type="number" size="small"
      v-model="row" placeholder="行数">
      </el-input>
      <el-input type="number" size="small"
      v-model="column" placeholder="列数">
      </el-input>
      <el-button type="primary" size="small" 
      @click="saveCurrentData">确认
      </el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'FloorPlan',
  data() {
   return {
     db: '',
     row: '',
     column: ''
   }
  },
  watch: {
    row(){
      this.commitRowAndColumn()
    },
    column(){
      this.commitRowAndColumn()
    },
    currentData(){
      this.row = this.currentData[1]
      this.column = this.currentData[2]
    }
  },
  props: {
    currentData: Array
  },
  methods: {
    commitRowAndColumn: function() {
      let row = this.row,
          column = this.column,
          table = this.$refs.table
      if(!row) return
      if(!column) return
      if(row*column > 1000){
        alert('数据过大，请调整！')
        this.row = 0
        this.column = 0
        table.innerHTML = ''
        return
      }
      let cArr = ''
      for(let i=0;i<column;i++){
        cArr += '<th>6</th>'
      }
      let rArr = ''
      for(let i=0;i<row;i++){
        rArr += '<tr>' + cArr + '</tr>'
      }
      table.innerHTML = rArr
    },
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
</style>