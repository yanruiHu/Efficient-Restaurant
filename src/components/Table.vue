<template>
  <div>
    <el-button id="button-table" :type="getState()" round :plain="plain"
    @click="showInfo=true">
      {{ tableId }}
    </el-button>
    <el-dialog title="餐桌状态" width="30%" center 
    :visible.sync="showInfo">
      <el-descriptions title="客人信息" :column="1" border
      v-if="position!=='host'">
        <el-descriptions-item label="落座时间" size="mini"> 
          {{ beginTime }} 
        </el-descriptions-item>
        <el-descriptions-item label="人数"> 
          {{ number }} 
        </el-descriptions-item>
      </el-descriptions>
      <div v-if="position==='host'">
        <span class="customer-info"></span>
        <el-form :inline="true">
          <el-form-item label="人数">
            <el-select v-model="number">
              <el-option v-for="num in Number(8)" 
              :key="num" :value="num" :label="num">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button id="button-order" type="primary" plain
        v-if="position==='host'" @click="markBegin()">
          标记用餐
        </el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='waiter'" @click="goServe()">
          前往服务
        </el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='waiter'" @click="goOrder()">
          点餐
        </el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='waiter'" @click="markEnd()">
          标记结束用餐
        </el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='busboy'" @click="goServe()">
          前往清理
        </el-button>
        <el-button id="button-order" type="primary" plain
        v-if="position==='busboy'" @click="markCleaned()">
          清理完毕
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      staffId: '',
      showInfo: false,
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
    this.staffId = JSON.parse(localStorage.getItem('account'))
    this.$db.collection('table')
      .where({
        restaurant: this.restaurant,
        table_id: this.tableId
      })
      .get()
      .then((res) => {
        this.state = res.data[0].state
        this.number = res.data[0].number
        this.beginTime = res.data[0].begin_time
        if(this.state==='info') {
          this.plain = true
        }
      })
  },
  methods: {
    getState() {
      this.$db.collection('table')
        .where({
          restaurant: this.restaurant,
          table_id: this.tableId
        })
        .watch({
          onChange: (snapshot) => {
            var mydata = snapshot.docChanges[0]
            if(mydata==null){
              return
            }
            else if(this.staffId == mydata.doc.on_task){
                this.state = 'danger'
                this.plain = false
            }
            else if(mydata.dataType == 'update'){
              this.state = mydata.doc.state
              if(this.state!=='info'){
                this.plain = false
              }
              else{
                this.plain = true
              }
            }
          },
          onError: () => {
            console.log('watch error!')
          }
        })
      return this.state
    },
    markBegin() {
      this.state = 'primary'
      this.plain = false
      this.$db.collection('table')
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
            message: '标记成功!',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    markEnd() {
      this.state = 'warning'
      this.plain = false
      this.$db.collection('table')
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
            message: '标记成功!',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    markCleaned() {
      this.state = 'info'
      this.$db.collection('table')
        .where({
          restaurant: this.restaurant,
          table_id: this.tableId
        })
        .update({
          state: this.state,
        })
        .then(()=>{
          this.$message({
            message: '标记成功!',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    goServe() {
      this.$db.collection('task')
        .where({
          staff_id: this.staffId,
          state: true
        })
        .update({
          state: false
        })
      this.$db.collection('table')
        .where({
          restaurant: this.restaurant,
          table_id: this.tableId
        })
        .update({
          on_task: ''
        })
        .then((res) => {
          this.state = res.data[0].state
          this.$message({
            message: '已接受任务!',
            type: 'success'
          })
        })
      this.showInfo = false
    },
    goOrder() {
      
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
    font-size: 18px;
  }
</style>
