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
      assignData: ''
    }
  },
  methods: {

  },
  mounted() {
    this.restaurant = JSON.parse(localStorage.getItem('restaurant'))
    this.$db.collection('cook_assign')
      .where({
        restaurant: this.restaurant,
        state: true,
      })
      .get()
      .then((res) => {
        var data = []
        for(var i in res.data){
          data.push(res.data[i].staff_id)
        }
        this.assignData = Array.from(new Set(data))
        console.log(this.assignData)
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