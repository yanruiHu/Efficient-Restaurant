<template>
  <div>
    <p>个人信息</p>
    <el-avatar :size="80" src="https://empty">
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </el-avatar>
    <p></p>
    <el-descriptions>
      <el-descriptions-item label="账号">{{account}}</el-descriptions-item>
      <el-descriptions-item label="餐馆">{{restaurant}}</el-descriptions-item>
      <el-descriptions-item label="餐馆地址">{{address}}</el-descriptions-item>
    </el-descriptions>
    <el-button>退出登录</el-button>
  </div>
</template>

<script>
  export default {
    name: "ManageInfo",
    data() {
      return {
        head: null,
        address: null,
        account: null
      }
    },
    props: {
      restaurant: null
    },
    async mounted() {
      if(localStorage.getItem("head")!==null){
        this.head = await JSON.parse(localStorage.getItem("head"))
      } 
      if(localStorage.getItem("address")!==null){
        this.address = await JSON.parse(localStorage.getItem("address"))
      }
      if(localStorage.getItem("account")!==null){
        this.account = await JSON.parse(localStorage.getItem("account"))
      }
    },
  }
</script>