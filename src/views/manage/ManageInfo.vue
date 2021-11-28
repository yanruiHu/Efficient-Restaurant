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
    <el-button @click='logOut'>退出登录</el-button>
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
      if(localStorage.getItem("account")!==null||localStorage.getItem("account")!==undefined){
        this.account = await JSON.parse(localStorage.getItem("account"))
      }
      // if(localStorage.getItem("head")!==null || localStorage.getItem("head")!==undefined){
      //   this.head = await JSON.parse(localStorage.getItem("head"))
      // } 
    },
    methods: {
      logOut(){
        this.$router.push('/')
        localStorage.clear()
        location.reload()
      }
    },
  }
</script>