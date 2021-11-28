<template>
  <div>
    <el-button id="button-table" :type="state" round :plain="plain"
    @click="showInfo=true">{{ tableId }}
    </el-button>
    <el-dialog title="餐桌状态" :visible.sync="showInfo" width="30%" center>
      <el-descriptions title="客人信息" :column="1" border
      v-if="position==='waiter'">
        <el-descriptions-item label="落座时间" size="mini"> {{ beginTime }} </el-descriptions-item>
        <el-descriptions-item label="人数"> {{ number }} </el-descriptions-item>
      </el-descriptions>
      <div v-if="position==='host'">
        <span class="customer-info"></span>
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-input v-model="number"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button id="button-order" type="primary" plain
        v-if="position==='host'" @click="markBegin">标记用餐</el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='waiter'" @click="goServe">前往服务</el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='waiter'">点餐</el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='waiter'" @click="markEnd">标记结束</el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='busboy'" @click="goClean">前往清理</el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='busboy'" @click="markCleaned">清理完毕</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      showInfo: false,
      db: '',
      beginTime: '',
      number: '',
      state: '',
      plain: false
    }
  },
  props: {
    tableId: Number,
    restaurant: String,
    position: String,
  },
  mounted() {
    this.db = this.$app.database()
    this.db.collection('table')
      .where({
        restaurant: this.restaurant,
        table_id: this.tableId
      })
      .get()
      .then((res) => {
        this.state = res.data[0].state
        this.number = res.data[0].number
        this.beginTime = res.data[0].begin_time
        if(this.state=='info') {
          this.plain = true
        }
      })
  },
  methods: {
    async markBegin() {
      this.state = 'primary'
      this.plain = false
      await this.db.collection('table')
        .where({
          restaurant: this.restaurant,
          table_id: this.tableId
        })
        .update({
          number: this.number,
          state: this.state,
          begin_time: (new Date()).toLocaleTimeString()
        })
        .then(()=>{
          this.$message({
            message: '标记成功！',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    async markEnd() {
      this.state = 'warning'
      this.plain = false
      await this.db.collection('table')
        .where({
          restaurant: this.restaurant,
          table_id: this.tableId
        })
        .update({
          state: this.state,
          end_time: (new Date()).toLocaleTimeString()
        })
        .then(()=>{
          this.$message({
            message: '标记成功！',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    async markCleaned() {
      this.state = 'info'
      await this.db.collection('table')
        .where({
          restaurant: this.restaurant,
          table_id: this.tableId
        })
        .update({
          state: this.state,
        })
        .then(()=>{
          this.$message({
            message: '标记成功！',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    async goServe() {
      
    },
    async goClean() {

    }
  }
}
</script>

<style scoped>
  #button-table {
    padding: 0;
    width: 60px;
    height: 60px;
    border-color: dimgray;
    border-width: 1.5px;
  }
</style>