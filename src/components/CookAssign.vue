<template>
  <div>
    <el-row v-for="(assign, rindex) in assignData" 
    :key="rindex" type="flex">
      {{ assign.cooker }}
      <el-col v-for="(dish, cindex) in assign.dishes" 
      :key="cindex">
        {{ dish.id }}
      </el-col>
  </el-row>
  </div>
</template>

<script>
export default {
  name: 'CookAssign',
  data() {
    return {
      db: '',
      restaurant: ''
    }
  },
  methods: {

  },
  mounted() {
    this.db = this.$app.database()
  }
}
</script>

<style>

</style>