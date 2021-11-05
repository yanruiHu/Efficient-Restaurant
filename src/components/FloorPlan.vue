<template>
  <el-container>
    <el-main>
      <table ref="table" border="1"></table>
    </el-main>
    <el-footer v-if="this.currentData[0] === 'manager'">
      <input type="number" v-model="row" placeholder="行数">
      <input type="number" v-model="column" placeholder="列数">
      <button type="primary" @click="saveCurrentData">确认</button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
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
      this.db.collection("floorplan")
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

<style>

</style>