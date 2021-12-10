<template>
  <el-card :body-style="{ padding: '0' }">
    <el-image :src="url"></el-image>
    <div class="content">
      <span class="dish-name">{{ name }}</span>
      <div class="clearfix">
        <span class="price">单价:{{ price }}元</span>
        <el-popover
          placement="bottom"
          title="菜品介绍"
          width="200"
          trigger="hover"
          :content="info">
          <el-button slot="reference" type="text">详情</el-button>
        </el-popover>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'Dish',
  data() {
    return{
      url: '',
      name: '',
      info: '',
      price: '',
      restaurant: ''
    }
  },
  props: {
    id: String
  },
  mounted() {
    this.$db.collection('dish_list')
      .doc(this.id)
      .get()
      .then((res) => {
        this.$app
          .getTempFileURL({
            fileList: [res.data[0].image]
          })
          .then((res) => {
            this.url = res.fileList[0].tempFileURL
          })
        this.name = res.data[0].name
        this.price = res.data[0].price
        this.info = res.data[0].info
        this.restaurant = res.data[0].restaurant
      })
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .el-image {
    width: 150px;
    height: 90px;
  }
  .el-card {
    padding: 0;
    width: 150px;
  }
  .dish-name {
    font-size: 16px;
  }
  .price {
    font-size: 13px;
    margin-right: 15px;
  }
  .content {
    text-align: center;
  }
  .clearfix {
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>