<template>
  <div>
    <div class='input-box' >
      <p>管理员注册</p>
      <el-input v-model="account" placeholder="账号"></el-input>
      <p></p>
      <el-input v-model="password" placeholder="密码" type=password></el-input>
      <p></p>
      <el-input v-model="comfirm" placeholder="验证密码" type=password></el-input>
      <p></p>
      <button @click='Register'>注册</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Manageregister',
    data() {
      return {
        account: null,
        password: null,
        comfirm: null,
        db: null
      }
    },
    methods: {
      Register() {
        if(this.account.length<8||this.account.length>16){
          alert("用户账号必须大于八位小于十六位")
          return
        }
        if(this.password.length<8){
          alert("用户密码必须大于八位")
          return
        }
        if(this.password!==this.comfirm){
          alert("两次输入密码不相同")
        }
        this.db.collection("manage")//查看数据库中申请账号是否已存在。
          .where({
            account: this.account
          })
          .get()
          .then((res) => {
            if(res.data.length!==0){
              alert("用户名已存在")
              return
            }
          })
        this.db.collection("manage")
          .add({
            account: this.account,
            password: this.password
          })
          .then(()=>{
            alert("创建用户成功！")
            this.$router.push('/managelogin')
          })
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
    top:40%;
    transform: translate(-50%,-50%);
    border-color: black;
    background-color: lightslategray;
    padding: 25px;
  }

</style>
