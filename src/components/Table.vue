<template>
  <div>
    <el-button id="button-table" round 
    :type="getState()" :plain="plain"
    @click="showDialog=true">
      {{ tableId }}
    </el-button>
    <el-dialog title="餐桌状态" width="30%" center 
    :visible.sync="showDialog" :append-to-body="true">
      <el-descriptions title="客人信息" border 
      :column="1" v-if="position!=='host'">
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
          结束用餐
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
      staffAccount: '',
      showDialog: false,
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
    busboyAccounts: Array,
    waiterAccounts: Array
  },
  mounted() {
    this.staffAccount = JSON.parse(localStorage.getItem('account'))
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
    // 获取餐桌实时状态
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
            else if(this.staffAccount == mydata.doc.on_task){
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
    // 前台标记某餐桌, 并通知服务员
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
      this.$db.collection('task')
        .add({
          staff_account: this.waiterAccounts[Math.floor(Math.random()*this.waiterAccounts.length)],
          table_id: this.tableId,
          task: '点菜',
          state: true
        })
        .then(()=>{
          this.$message({
            message: '标记成功!',
            type: 'success'
          })
        })
      this.showDialog = false
    },
    // 服务员标记某餐桌用餐结束, 并通知清洁员
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
          end_time: (new Date()).toLocaleTimeString(),
        })
      this.$db.collection('task')
        .add({
          staff_account: this.busboyAccounts[Math.floor(Math.random()*this.busboyAccounts.length)],
          table_id: this.tableId,
          task: '清洁',
          state: true
        })
        .then(()=>{
          this.number = ''
          this.beginTime = ''
          this.$message({
            message: '标记成功!',
            type: 'success'
          })
        })
      this.showDialog = false
    },
    // 清洁员清洁完毕, 更新餐桌状态
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
      this.showDialog = false
    },
    // 服务员接受为某桌点菜或上菜的任务
    goServe() {
      this.$db.collection('task')
        .where({
          staff_account: this.staffAccount,
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
      this.showDialog = false
    },
    // 跳转菜单页面
    goOrder() {
      this.$router.push({
        path: '/staffhome/order',
        query: {
          tableId: this.tableId
        }})
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
