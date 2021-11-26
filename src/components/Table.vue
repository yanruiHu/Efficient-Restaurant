<template>
  <div>
    <el-button id="button-table" type="info" round
    @click="showInfo=true" plain>{{ id }}
    </el-button>
    <el-dialog title="餐桌状态" :visible.sync="showInfo" width="30%" center>
      <el-descriptions title="客人信息" :column="1" border
      v-if="position!='host'">
        <el-descriptions-item label="落座时间" size="mini"> {{ Date() }} </el-descriptions-item>
        <el-descriptions-item label="人数"> {{ number }} </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button id="button-order" type="primary" plain>前往点餐</el-button>
        <el-button id="button-order" type="primary" plain>标记用餐</el-button>
        <el-button id="button-order" type="primary" plain>点餐</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data() {
    return {
      showInfo: false,
      db: '',
      id: 5,
      number: '3',
    }
  },
  props: {
    position: String
  },
  mounted() {
    this.db = this.$app.database()
  },
  methods: {
    
  }
}
</script>

<style scoped>
  #button-table{
    width: 50px;
    height: 50px;
  }
</style>