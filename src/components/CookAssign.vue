<template>
  <el-row>
    <el-col v-for="item in assignData"
    :key="item" :span="4">
      <span>工号:{{ item }}</span>
      <Assign :cookAccount="item" :waiterAccounts="waiterAccounts"></Assign>
    </el-col>
  </el-row>
</template>

<script>
import Assign from './Assign.vue'
export default {
  name: 'CookAssign',
  components: { Assign },
  data() {
    return {
      restaurant: '',
      assignData: [],
      waiterAccounts: []
    }
  },
  methods: {

  },
  mounted() {
    this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
    this.$db.collection('staff')
      .where({
        restaurant: this.restaurant,
        position: 'cook'
      })
      .get()
      .then((res) => {
        for(var i in res.data){
          this.assignData.push(res.data[i].account)
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
  .el-row {
    margin: 20px 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
</style>
