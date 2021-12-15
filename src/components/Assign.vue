<template>
  <div>
    <el-row v-for="assign in data"
    :key="assign._id">
      <el-button class="assign" v-if="assign.state"
      @click="showDialog=true, assignId=assign._id, tableId=assign.table_id">
        <Dish :id="assign.dish_id"></Dish>
        <span>{{ assign.table_id }}号桌</span>
        <span> {{ assign.remark }}</span>
      </el-button>
      <el-dialog title="确认完成" width="30%"
      :visible.sync="showDialog">
        <span>是否准备出餐？</span>
        <span slot="footer" class="dialog-footer">
          <el-button
          @click="showDialog = false">
            取 消
          </el-button>
          <el-button type="primary" 
          @click="finish()">
            确 定
          </el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import Dish from './Dish.vue'
export default {
  name: 'Assign',
  components: { Dish },
  data() {
    return{
      data: [],
      showDialog: false,
      assignId: '',
      tableId: '',
      timer: ''
    }
  },
  props: {
    cookAccount: String,
    waiterAccounts: Array
  },
  mounted() {
    this.timer = setInterval(() => {
      this.$db.collection('cook_assign')
        .where({
          staff_account: this.cookAccount,
          state: true
        })
        .get()
          .then((res) => {
          this.data = res.data
        })
    }, 2000)
  },
  methods: {
    finish() {
      this.$db.collection('cook_assign')
        .doc(this.assignId)
        .update({
          state: false
        })
        .then(() => {
          this.$db.collection('task')
            .add({
            // 根据餐厅当前服务员数随机分配任务
              staff_account: this.waiterAccounts[Math.floor(Math.random()*this.waiterAccounts.length)],
              table_id: this.tableId,
              task: 'serve',
              state: true
            })
          this.$message({
            message: '出餐成功!',
            type: 'success'
          })
        })
      this.showDialog = false
    },
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
  .assign {
    padding: 2px 2px 2px 2px !important;
    align-items: center;
    margin-top: 5px;
  }
  span {
    font-size: 16px;
    margin: 0 auto;
  }
</style>
