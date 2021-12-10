<template>
  <el-row>
    <el-col v-for="item in assignData"
    :key="item" :span="4">
      <span>工号:{{ item }}</span>
      <Assign :staffId="item"></Assign>
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
      assignData: []
    }
  },
  methods: {

  },
  mounted() {
    this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
    this.$db.collection('staff')
      .where({
        restaurant: this.restaurant,
        position: "cooker"
      })
      .get()
      .then((res) => {
        console.log(res)
        for(var i in res.data){
          this.assignData.push(res.data[i].account)
        }
      })
  }
}
</script>

<style scoped>
  .el-row {
    display: flex;
    flex-direction: row;
  }
</style>