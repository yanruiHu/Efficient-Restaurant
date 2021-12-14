<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col v-for="(dish, index) in dishList"
        :key="index" :span="7">
          <Dish :id="dish._id"></Dish>
          <span>
            <el-input-number size="mini" 
            :min="0" :max="10" v-model="dishOrder[index].num">
            </el-input-number>
            <el-button size="mini"
            @click="addRemark(index)">
              备注
            </el-button>
          </span>
        </el-col>
      </el-row>
    </el-main>
    <el-footer>
      <el-button type="primary"
      @click="showDialog = true">
        提交点单
      </el-button>
      <el-dialog title="确认点单" width="50%"
      :visible.sync="showDialog">
        <el-row type="flex" justify="space-around" :gutter="30">
          <el-col :span="6">菜品名</el-col>
          <el-col :span="6">数量</el-col>
          <el-col :span="6">备注</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row type="flex" justify="space-around" :gutter="30"
        v-for="(order, index) in dishOrder" :key="index">
          <el-col v-if="order.num!==0" :span="6">
            {{ order.title }}
          </el-col>
          <el-col v-if="order.num!==0" :span="6">
            {{ order.num }}
          </el-col>
          <el-col v-if="order.num!==0" :span="6">
            {{ order.remark }}
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button 
          @click="showDialog = false">
            取消
          </el-button>
          <el-button type="primary"
          @click="addDishOrder()">
            确定
          </el-button>
        </span>
      </el-dialog>
    </el-footer>
  </el-container>
</template>

<script>
import Dish from './Dish.vue'
export default {
  name: 'Order',
  components: { Dish },
  data() {
    return {
      tableId: '',
      number: '',
      dishList: [],
      dishOrder: [],
      restaruant: '',
      showDialog: false,
      staffAccounts: []
    }
  },
  async mounted() {
    this.restaruant = JSON.parse(localStorage.getItem('restaurant'))
    this.tableId = this.$route.query.tableId
    await this.$db.collection('dish_list')
      .where({
        restaurant: this.restaruant
      })
      .get()
      .then((res) => {
        this.dishList = res.data
        for(var i in this.dishList){
          this.dishOrder.push({
            dishId: this.dishList[i]._id,
            title: this.dishList[i].name,
            num: 0,
            remark: '',
          })
        }
      })
    this.$db.collection('staff')
      .where({
        restaurant: this.restaruant,
        position: 'cook'
      })
      .get()
      .then((res) => {
        for(var i in res.data){
          this.staffAccounts.push(res.data[i].account)
        }
      })
  },
  methods: {
    async addDishOrder() {
      for(var i in this.dishOrder){
        for(var j=0; j<this.dishOrder[i].num; j++){
          await this.$db.collection('cook_assign')
            .add({
              dish_id: this.dishOrder[i].dishId,
              restaurant: this.restaruant,
              table_id: this.tableId,
              state: true,
              // 暂时根据餐厅厨师数随机分配
              staff_account: this.staffAccounts[Math.floor(Math.random()*this.staffAccounts.length)],
              remark: this.dishOrder[i].remark
          })
        }
      }
      this.$message({
        message: '点单成功!',
        type: 'success'
      })
      this.showDialog = false
    },
    addRemark(index) {
      this.$prompt('请输入具体信息', '备注', {
        inputPlaceholder: this.dishOrder[index].remark,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      .then(({ value }) => {
        this.$message({
          type: 'success',
          message: '备注成功!'
        })
        this.dishOrder[index].remark = value
      })
    },
    getDishOrder() {
      console.log(this.dishOrder)
    }
  }
}
</script>

<style scoped>
  .el-main {
    max-height: 400px;
  }
  .el-footer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-main .el-row {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    row-gap: 20px;
  }
  .el-main .el-col {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
  .el-input-number {
    width: 100px;
  }
  .el-divider {
    margin: 8px 0;
  }
</style>