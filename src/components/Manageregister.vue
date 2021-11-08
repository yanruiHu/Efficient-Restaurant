<template>
  <div>
    <div>
      <el-form class="login-box">
        <h3 class="login-title">管理员注册</h3>

        <el-form-item label="账号" prop="name">
          <el-input type="text" placeholder="请输入用户名" v-model="account"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type=password placeholder="请输入密码" v-model="password"></el-input>
        </el-form-item>

        <el-form-item label="验证密码" prop="confirm">
          <el-input type=password placeholder="请再次输入密码" v-model="confirm"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="Register">注册</el-button>
        </el-form-item>
      </el-form>
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
        confirm: null,
        db: null
      }
    },
    methods: {
      async Register() {
        if(this.account.length<8||this.account.length>16){
          this.$message.error("用户账号必须大于八位小于十六位")
          return
        }
        if(this.password.length<8){
          this.$message.error("用户密码必须大于八位")
          return
        }
        if(this.password!==this.confirm){
          this.$message.error("两次输入密码不相同")
        }
        let isAccountExist=false
        await this.db.collection("manage")//查看数据库中申请账号是否已存在。
          .where({
            account: this.account
          })
          .get()
          .then((res) => {
            if(res.data.length!==0){
              // alert("用户名已存在")
              isAccountExist=true
              this.$message.error("用户名已存在！")
            }
          })
        if(isAccountExist===true){
          return
        }
        this.db.collection("manage")
          .add({
            account: this.account,
            password: this.password
          })
          .then(()=>{
            this.$message({
              message: "创建用户成功！",
              type: 'success'
            });
            this.$router.push('/managelogin')
          })
      }
    },
    mounted() {
      this.db = this.$app.database();
    },
  }
</script>

<style scoped>
  .login-box{
    width: 250px;
    margin: 100px auto;
    border:1px solid #DCDFE6;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 30px #DCDFE6;
  }
  .login-title{
    text-align: center;
  }
</style>
