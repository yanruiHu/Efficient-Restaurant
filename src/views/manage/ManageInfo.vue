<template>
  <div>
    <p>个人信息</p>
    <el-avatar :size="80" :src="head">
    </el-avatar><p></p>
    <!-- <el-button size="mini" @click="changeHead">点击切换头像</el-button> -->
    <p></p>
    <el-descriptions>
      <el-descriptions-item label="账号">{{account}}</el-descriptions-item>
      <el-descriptions-item label="餐馆">{{restaurant}}</el-descriptions-item>
      <el-descriptions-item label="餐馆地址">{{address}}</el-descriptions-item>
    </el-descriptions>
    <el-button type="danger" @click="dialogVisible = true">退出登录</el-button>
    <el-dialog :visible.sync="dialogVisible">
      <span>确定退出登录？</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toManageLogin">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ManageInfo",
    data() {
      return {
        head: null,
        address: null,
        account: null,
        dialogVisible: false
      }
    },
    props: {
      restaurant: null
    },
    methods: {
      toManageLogin() {
        this.dialogVisible = false
        this.$router.push('/')
        localStorage.clear()
        location.reload()
      },
      // changeHead(){
      //   this.$db.collection("manage")
      //     .where({
      //       account: this.account,
      //     })
      //     .get()
      //     .then((res) => {
      //       console.log(res.data[0])
      //     })
      // }
    },
    async mounted() {
      if(localStorage.getItem("account")!==null||localStorage.getItem("account")!==undefined){
        this.account = await JSON.parse(localStorage.getItem("account"))
      }
      if(localStorage.getItem("head")!==null || localStorage.getItem("head")!==undefined){
        this.head = await JSON.parse(localStorage.getItem("head"))
      } 
    },
  }
</script>
