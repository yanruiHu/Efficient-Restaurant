<template>
  <div>
    <el-row v-for="(dish, i) in data" 
    :key="i">
      <el-button @click="finish()">
        <Dish :id="dish.dish_id"></Dish>
        <span>{{ dish.table_id }}号桌</span>
        <span> {{ dish.remark }}</span>
      </el-button>
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
    }
  },
  props: {
    staffId: String
  },
  mounted() {
    this.$db.collection('cook_assign')
      .where({
        staff_id: this.staffId,
        state: true
      })
      .get()
      .then((res) => {
        this.data = res.data
      })
  },
  methods: {
    finish() {
      
    }
  }
}
</script>

<style scoped>
  .el-button {
    padding: 2px 2px 2px 2px !important;
    align-items: center;
    margin-top: 10px;
  }
  span {
    font-size: 16px;
    margin: 0 auto;
  }
</style>