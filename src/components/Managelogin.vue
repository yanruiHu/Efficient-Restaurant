<template>
  <div>
    <div class='input-box'>
      <p>管理员登录</p>
      <el-input v-model="account" placeholder="账号"></el-input>
      <p></p>
      <el-input v-model="password" placeholder="密码"></el-input>
      <p></p>
      <button @click="Login" type=password>登录</button>
      <button @click="toRegister">注册</button>
    </div>
    <div>
      <button @click="VIP">vip通道</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ManageLogin',
    data() {
      return {
        account: null,
        password: null,
        db: null,
      }
    },
    methods: {
      toRegister() {
        this.$router.push('/manageregister')
      },
      Login() {
        this.db.collection("manage")
          .where({
            account: this.account,
            password: this.password
          })
          .get()
          .then((res) => {
            console.log(res)
            if(res.data.length==1){
              this.$router.push('./managehome')
            }
            else{
              alert("账号或密码错误")
            }
          })
      },
      VIP() {
        this.$router.push('./managehome')
      }
    },
    mounted() {
      this.db = this.$app.database();
    },
  }
</script>

<style>
  body {
    background-color: whitesmoke;
  }

  .input-box {
    width: 180px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    border-color: black;
    background-color: lightslategray;
    padding: 25px;
  }
</style>